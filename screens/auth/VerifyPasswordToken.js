import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Alert
} from "react-native";
import OTP from "../Components/otp";
const { height, width } = Dimensions.get("screen");
import client from "../api/client";
import { StackActions, useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import LottieView from "lottie-react-native";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";


const VerifyPasswordToken = ({ route }) => {
  return <VerifyTokenLogic route={route} />;
};

const VerifyTokenLogic = (props) => {
  const email = props.route.params;
  
	const {theme} = useContext(ThemeContext)

  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false)
   const [disabled, setDisabled] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const verify = async (value) => {
    if (value.token !== "" && value.token !== null) {
      setIsLoading(true);
      setError(false)
      try {
        await client
          .post("/verifyToken", {
            ...value,
          })
          .then(async (res) => {
            if (res.status === 200) {
            //   //   since the response was succesful, then email and password is valid
            //   //   get the refreshtoken and run the login function

            //   //  run the login function
            //  await client
            //     .post("/signin", {
            //       email: email,
            //       password: password,
            //     })
            //     .then(async (res) => {
            //       if (res.status === 200) {
            //         // also store the users values as an object and pass it round
            //         let userInfo = res.data.user;

            //         setUserInfo(userInfo);
            //         let token = res.data.token;
            //         setUserToken(token);

            //         let refreshToken = res.data.refreshToken
            //             setUserRefreshToken(refreshToken)

            //         try {
            //           // axios.defaults.headers.common.Authorization = `Bearer ${token}`
            //           // stringify the user object
            //           await AsyncStorage.setItem(
            //             "userInfo",
            //             JSON.stringify(userInfo)
            //           );

            //           // save the user access token
            //           await AsyncStorage.setItem("userToken", token);

            //           //save the user refresh token
            //           await AsyncStorage.setItem("userRefreshToken", refreshToken);

            //           const expirationTime = new Date().getTime() + (3* 60 * 1000); // expiresIn is the token expiration time received from the backend which is 21 days in milliseconds
            //           await AsyncStorage.setItem('refreshTokenExpiration', expirationTime.toString());
                      

            //         } catch (e) {
            //         }

            //       } else {
            //         console.error("Error with Login Functionality");
            //       }
            //     })
            //     .catch((e) => {
            //     });

            navigation.dispatch(StackActions.replace("PasswordInput", {email:email}));
          
            } 
          });
      } catch (e) {
        setError(true);
        setErrorMessage( e.response.data.message ? e.response.data.message : "Oops! Something went wrong. Please try again later.");
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }
  };

 
  const resendCode = async () => {
    if (!disabled) {
      setError(false)
      setDisabled(true); // Disable the button
      setTimeRemaining(90); // Set the initial time remaining to 30 seconds

      setTimeout(() => {
        setDisabled(false); // Enable the button after 30 seconds
        setTimeRemaining(0); // Reset the time remaining
      }, 30000); // 30 seconds = 30000 milliseconds

      // Perform other actions on button click
      // ...

            try{
              const formData = new FormData()
              formData.append("email", email.email)

              const res = await client.post(`/resendcode`, formData)
              if(res.status === 200){
                Alert.alert( "Resend Successful", "The code would be sent to your babcock email address")
              }
              
            }catch (e){
            setError(true);
            setErrorMessage( e.message ? e.message : "Oops! Something went wrong. Please try again later.");
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
      backgroundColor: theme.white,
    },
  });




  
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        enabled
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
        <ScrollView bounces={false} showsVerticalScrollIndicator={false} contentContainerStyle={{height:height}}>
          <TouchableWithoutFeedback>
            <View>
              <Text
                style={{
                  color: theme.primary,
                  textAlign: "center",
                  fontWeight: "600",
                  fontSize: 33,
                  top: 96,
                  fontFamily: "Poppins3",
                }}
              >
                Reset Password
              </Text>
              <LottieView
                source={require("../assets/animations/email-verification.json")}
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
                  onFinish={(value) => verify(value)}
                  isLoading={isLoading}

                />
                <View style={{ marginTop: 50 }}>
                  <Text
                    style={{
                      textAlign: "center",
                      fontWeight: "600",
                      fontSize: 13,
                      color: theme.black,
                      fontFamily: "Poppins3",
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
                        fontFamily: "Poppins3",
                      }}
                    >
                      {disabled ? formatTime(timeRemaining) : "Resend code"}
                    </Text>
                  </TouchableOpacity>

                  {error &&
                  <Text  style={{
                        alignItems: "center",
                        fontWeight: "600",
                        fontSize: 13,
                        textAlign: "center",
                        color: theme.red,
                        // textDecorationLine: "underline",
                        fontFamily: "Poppins3",
                        paddingTop:10
                      }}>{errorMessage}</Text>
                      }
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};



export default VerifyPasswordToken;
