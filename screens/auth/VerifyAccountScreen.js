import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
const { height, width } = Dimensions.get("screen");
import client from "../../api/client";
import { StackActions, useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OTP from "../../components/otp";


const VerifyAccountScreen = ({ route }) => {
  return <VerifyLogic route={route} />;
};

const VerifyLogic = (props) => {
  const { email, password } = props.route.params;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userRefreshToken, setUserRefreshToken] = useState(null);

  const { theme } = useContext(ThemeContext);

  // const verify = async (value) => {
  //   if (value.token !== "" && value.token !== null) {
  //     setIsLoading(true);

  //     try {
  //       const res = await client.post(`/verifyToken`, {
  //         ...value,
  //       });

  //       if (res.status === 200) {
  //         //  run the login function
  //         const signin = await client.post("/signin", {
  //           email: email,
  //           password: password,
  //         });
  //         if (signin.status === 200) {
  //           // also store the users values as an object and pass it round
  //           let userInfo = signin.data.user;

  //           setUserInfo(userInfo);
  //           let token = signin.data.token;
  //           setUserToken(token);

  //           let refreshToken = signin.data.refreshToken;
  //           setUserRefreshToken(refreshToken);

  //           try {
  //             // axios.defaults.headers.common.Authorization = `Bearer ${token}`
  //             // stringify the user object
  //             await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));

  //             // save the user access token
  //             await AsyncStorage.setItem("userToken", token);

  //             //save the user refresh token
  //             await AsyncStorage.setItem("userRefreshToken", refreshToken);

  //             // const expirationTime = new Date().getTime() + 3 * 60 * 1000; // expiresIn is the token expiration time received from the backend which is 21 days in milliseconds
  //             // await AsyncStorage.setItem(
  //             //   "refreshTokenExpiration",
  //             //   expirationTime.toString()
  //             // );

  //             navigation.dispatch(StackActions.replace("Sign-up2"));
  //           } catch (e) {
  //             setError(true);
  //             setErrorMessage("Oops! Something went wrong. Please try again.");
  //           }
  //         }

  //         // maybe there's need for an else s
  //       }
  //     } catch (e) {
  //       setError(true);
  //       setErrorMessage(
  //         e.response.data
  //           ? e.response.data
  //           : "Oops! Something went wrong. Please try again later."
  //       );
  //       setIsLoading(false);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  // };

  const verify = async (value) => {
    // //(value);
    if (value.token !== "" && value.token !== null) {
      setIsLoading(true);
      // //(value.token);
      try {
        await client
          .post("/verifyToken", {
            ...value,
          })
          .then((res) => {
            // //(res);
            if (res.status === 200) {
              //   since the response was succesful, then email and password is valid
              //   get the refreshtoken and run the login function

              //  run the login function
              client
                .post("/signin", {
                  email: email,
                  password: password,
                })
                .then(async (res) => {
                  // //(res);
                  if (res.status === 200) {
                    // also store the users values as an object and pass it round
                    // //(res.data);
                    let userInfo = res.data.user;
                    // //(userInfo);

                    setUserInfo(userInfo);
                    let token = res.data.token;
                    setUserToken(token);

                    let refreshToken = res.data.refreshToken;
                    setUserRefreshToken(refreshToken);

                    try {
                      // axios.defaults.headers.common.Authorization = `Bearer ${token}`
                      // stringify the user object
                      await AsyncStorage.setItem(
                        "userInfo",
                        JSON.stringify(userInfo)
                      );

                      // get the user token
                      await AsyncStorage.setItem("userToken", token);
                    } catch (e) {
                      // //(`Async Storage error: ${e}`);
                    }

                    navigation.dispatch(StackActions.replace("Sign-up2",{
                      level:res.data.user.level
                    }));
                  }
                })
                .catch((e) => {
                  setError(true);
                  setErrorMessage(
                    "Oops! Something went wrong. Please try again later."
                  );
                });
            }
          });
      } catch (e) {
        setError(true);
        setErrorMessage(
          e.response.data
            ? e.response.data
            : "Oops! Something went wrong. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }

    
    }
  };

  const resendCode = async () => {
    if (!disabled) {
      setDisabled(true); // Disable the button
      setTimeRemaining(90); // Set the initial time remaining to 30 seconds

      setTimeout(() => {
        setDisabled(false); // Enable the button after 30 seconds
        setTimeRemaining(0); // Reset the time remaining
      }, 30000); // 30 seconds = 30000 milliseconds

      // Perform other actions on button click
      // ...

      try {
        const formData = new FormData();
        formData.append("email", email);
        const res = await client.post(`/resendcode`, formData);

        if (res.status === 200) {
        }
      } catch (e) {
        setError(true);
        setErrorMessage(
          e.message
            ? e.message
            : "Oops! Something went wrong. Please try again later."
        );
      }
    }
  };
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    let timer;

    if (disabled && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((time) => time - 1); // Decrement the time remaining by 1 second
      }, 1000); // 1 second = 1000 milliseconds
    }

    return () => {
      clearInterval(timer);
    };
  }, [disabled, timeRemaining]);

  const styles = StyleSheet.create({
    text: {
      fontSize: 15,
    },
    textInput: {
      backgroundColor: theme.lightblue,
      borderRadius: 5,
      height: 35,
      marginBottom: 10,
      paddingLeft: 5,
      fontSize: 15,
    },
    container: {
      flex: 1.5,
      // 		backgroundColor:
      // "linear-gradient(168deg, rgba(60.30, 171.77, 234.47, 1), rgba(63.88, 132.68, 235.88, 1) 23%, rgba(68, 132, 228, 1) 38%, rgba(54, 59, 232, 1) 80%)",
      backgroundColor: theme.white,
    },
  });

  return (
    <View style={styles.container}>
      {/* <StatusBar hidden /> */}
      <KeyboardAvoidingView
        enabled
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <TouchableWithoutFeedback>
            <View>
              <Text
                style={{
                  color: theme.primary,
                  textAlign: "center",
                  fontWeight: "600",
                  fontSize: 33,
                  top: 96,
                  fontFamily: "Poppins-SemiBold",
                }}
              >
                Verify Account
              </Text>
              <LottieView
                source={require("../../assets/animations/email-verification.json")}
                style={{
                  width: 300,
                  height: 300,
                  resizeMode: "cover",
                  alignSelf: "center",
                  top: 30,
                }}
                loop={true}
                autoPlay
              />

              <View style={{ height: height }}>
                <OTP
                  codeCount={5}
                  containerStyle={{ borderRadius: 10 }}
                  otpStyles={{}}
                  isLoading={isLoading}
                  onFinish={(value) => verify(value)}
                />
                <View style={{ marginTop: 50 }}>
                  <Text
                    style={{
                      textAlign: "center",
                      fontWeight: "600",
                      fontSize: 13,
                      color: theme.black,
                      fontFamily: "Poppins-SemiBold",
                    }}
                  >
                    Didn't receive a code?
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={resendCode}
                    disabled={disabled}
                  >
                    <Text
                      style={{
                        alignItems: "center",
                        fontWeight: "600",
                        fontSize: 14,
                        textAlign: "center",
                        color: theme.primary,
                        textDecorationLine: "underline",
                        fontFamily: "Poppins-SemiBold",
                      }}
                    >
                      {disabled ? formatTime(timeRemaining) : "Resend code"}
                    </Text>
                  </TouchableOpacity>

                  {error && (
                    <Text
                      style={{
                        alignItems: "center",
                        fontWeight: "600",
                        fontSize: 13,
                        textAlign: "center",
                        color: theme.red,
                        // textDecorationLine: "underline",
                        fontFamily: "Poppins-SemiBold",
                        paddingTop: 10,
                      }}
                    >
                      {errorMessage}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default VerifyAccountScreen;
