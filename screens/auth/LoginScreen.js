import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Dimensions,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import { InputField } from "../Components/InputField";
import {
  CommonActions,
  StackActions,
  useNavigation,
} from "@react-navigation/native";

import * as Yup from "yup";
import { Formik } from "formik";
import LottieView from "lottie-react-native";
import client from "../api/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomInputExperience from "../../components/CustomInputExperience";
import { FormSubmitBtn } from "../../components/FormSubmitBtn";
const { width, height } = Dimensions.get("screen");


const validationSchema = Yup.object({
  email: Yup.string()
    .trim()
    // .matches(
    // /^[\w-\.]+@+([\w-\.])+babcock+(\.)+edu(\.)ng$/gi,
    // "School Email required"
    // )
    // .matches(/^[\w-\.]+@student\.babcock\.edu\.ng$/, "School Email required")
    .required("Email is required!"),
  password: Yup.string()
    .trim()
    .min(8, "Password not long enough!")
    .required("Password required!"),
});

const LoginScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [userRefreshToken, setUserRefreshToken] = useState(null);
  const [error, setError] = useState(null);
	const {theme} = useContext(ThemeContext)


  const userInfos = {
    email: "",
    password: "",
  };

  const signIn = async (values) => {
    const email = values.email.trim().toLowerCase() + `@student.babcock.edu.ng`;
    setError(false);
    try {
      setIsLoading(true);
      const res = await client.post("/signin", {
        email: email,
        password: values.password,
      });
      if (res.data.user.isVerified === false) {
        // call the endpoint
        try{
           const formData = new FormData();
         formData.append("email", email);
           const res = await client.post(`/resendcode`, formData)
           if(res.status === 200){
             
           }
         }catch{
         }
        navigation.dispatch(
          StackActions.replace("verify", {
            // email: values.email,
            email: email,
            password: values.password,
          })
        );
      } else {
        // also store the users values as an object and pass it round
        let userInfo = res.data.user;

        setUserInfo(userInfo);
        let token = res.data.token;
        setUserToken(token);

        let userRefreshToken = res.data.refreshToken;
        setUserRefreshToken(userRefreshToken);
        try {
          //axios.defaults.headers.common.Authorization = `Bearer ${token}`
          // stringify the user object
          await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
          // get the user acess token
          await AsyncStorage.setItem("userToken", token);

          //set userRefreshToken

          await AsyncStorage.setItem("userRefreshToken", userRefreshToken);

          // When setting the refresh token expiration
          // const expirationTime = new Date().getTime() + 3 * 60 * 1000; // expiresIn is the token expiration time received from the backend which is 21 days in milliseconds
          // await AsyncStorage.setItem(
          //   "refreshTokenExpiration",
          //   expirationTime.toString()
          // );
        } catch (error) {
          setError("An error occured");
        }
        const value = await AsyncStorage.getItem("userInfo");
        if (value !== null) {
          const userInfo = JSON.parse(value);
          setUserInfo(userInfo);
          navigation.dispatch(StackActions.replace("Tab"));
        }
        setIsLoading(false);
      }
    } catch (e) {
      // if (e.response.data.success === false  && e.response.status === 401 && e.response.data.msg === "Session Expired") {
      //   try{
      //     await getAccessToken()
      //     await signIn()

      //   }catch(e){

      //    setError(e.message === "Network Error" ? e.message : "Oops! Something went wrong. Please try again.")
      //   }
      // }

      if (e.response && e.response.status === 401) {
        setError(`${e.response.data.error}`);
      } else if (e.response && e.response.status === 400) {
        setError(`${e.response.data.error}`);
      } else if (e.message === "Network Error" && e.code === "ERR_NETWORK") {
        setError("Network error, lost connection!");
      } else {
        setError("An error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <SafeAreaView
      style={{ flex: 1, alignContent: "center", backgroundColor: theme.white }}
    >
      <StatusBar backgroundColor={theme.white} />
                 <CustomInputExperience style={{flex:1}}>
            <View style={{ paddingHorizontal: 25, paddingTop: 40 }}>
              <View style={{ alignItems: "center" }}>
                <LottieView
                  source={require("../assets/animations/login.json")}
                  style={{
                    position: "relative",
                    width: 250,
                    height: 250,
                    paddingTop: 3,
                    alignSelf: "center",
                  }}
                  loop={true}
                  autoPlay
                />
              </View>

              <Text
                style={{
                  fontFamily: "Poppins2",
                  fontSize: 28,
                  fontWeight: "500",
                  paddingTop: 30,
                  color: theme.lightblue,
                }}
              >
                Login
              </Text>

              <View style={{ paddingTop: error ? 40 : 20 }}>
                <Formik
                  initialValues={userInfos}
                  validationSchema={validationSchema}
                  onSubmit={signIn}
                >
                  {({
                    values,
                    errors,
                    touched,
                    isSubmitting,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                  }) => {
                    const { email, password } = values;
                    return (
                      <View>
                        {error && (
                          <Text
                            style={{
                              color: "red",
                              fontFamily: "Poppins",
                              fontSize: 13,
                              bottom: 27,
                            }}
                          >
                            {error}
                          </Text>
                        )}

                        <Text
                          style={{
                            paddingLeft: 130,
                            top: 23,
                            fontFamily: "Poppins",
                            fontSize: 13,
                            color: theme.black,
                          }}
                        >
                          @student.babcock.edu.ng
                        </Text>

                        {errors.email && touched.email && (
                          <Text
                            style={[
                              styles.error,
                              {
                                top: error ? 4 : -10,
                              },
                            ]}
                          >
                            {errors.email}
                          </Text>
                        )}

                        <InputField
                          icon={
                            <Ionicons
                              name="mail"
                              size={20}
                              color={theme.lightblue}
                              style={{ marginRight: 5 }}
                            />
                          }
                          onChangeText={handleChange("email")}
                          // placeholder="email@student.babcock.edu.ng"
                          placeholder="Email"
                          onBlur={handleBlur("email")}
                          value={email}
                          autoCapitalize="none"
                          // label={"Email"}
                          maxLength={30}
                          selectionColor={theme.lightblue}
                          placeholderTextColor ={theme.black}
                        />

                        {errors.password && touched.password && (
                          <Text
                            style={[
                              styles.error,
                              {
                                top: error ? 65 : 58,
                                alignContent: "center",
                                right: width / 25,
                                position: "absolute",
                              },
                            ]}
                          >
                            {errors.password}
                          </Text>
                        )}
                        <InputField
                          icon={
                            <Ionicons
                              name="ios-lock-closed-outline"
                              size={20}
                              color={theme.lightblue}
                              style={{ marginRight: 5 }}
                            />
                          }
                          inputType="password"
                          fieldButtonLabel={"Forgot?"}
                          fieldButtonFunction={() =>
                            navigation.navigate("password")
                          }
                          placeholder="*********"
                          onChangeText={handleChange("password")}
                          onBlur={handleBlur("password")}
                          error={touched.password && errors.password}
                          value={password}
                          secureTextEntry
                          autoCapitalize="none"
                          maxLength={32}
                          selectionColor={theme.lightblue}
                          cursorColor={theme.lightblue}
                          placeholderTextColor ={theme.black}
                        />

                        {isLoading ? (
                          <View>
                            <ActivityIndicator
                              size="large"
                              color={theme.lightblue}
                            />
                          </View>
                        ) : (
                          <FormSubmitBtn
                            onPress={handleSubmit}
                            title={"Log in"}
                          />
                        )}
                      </View>
                    );
                  }}
                </Formik>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  paddingTop: 50,
                }}
              >
                <Text style={{ fontFamily: "Poppins", color:theme.black }}>
                  Don't have an account?
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Sign-up")}
                >
                  <Text
                    style={{
                      color: theme.lightblue,
                      paddingBottom: 2,
                      fontFamily: "Poppins3",
                      fontSize: 13,
                    }}
                  >
                    {" "}
                    Register
                  </Text>
                </TouchableOpacity>
              </View>
            </View>              
            </CustomInputExperience>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  error: {
    fontFamily: "Poppins",
    fontSize: 12,
    color: "red",
    right: 15,
    position: "absolute",
    top: 5,
  },
});
