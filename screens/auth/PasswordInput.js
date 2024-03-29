import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
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
import { InputField } from "../../components/InputField";
import { StackActions, useNavigation } from "@react-navigation/native";
import * as Yup from "yup";
import { Formik } from "formik";
import LottieView from "lottie-react-native";
import client from "../../api/client";

import { ThemeContext } from "../../context/ThemeContext";
import { FormSubmitBtn } from "../../components/FormSubmitBtn";
const { width, height } = Dimensions.get("screen");

const validationSchema = Yup.object({
  newPassword: Yup.string()
    .trim()
    .min(8, "Password not long enough!")
    .required("Password required!"),

  confirmPassword: Yup.string().equals(
    [Yup.ref("newPassword"), null],
    "Password doesn't match"
  ),
});

const PasswordInput = ({ route }) => {
	const {theme} = useContext(ThemeContext)

  return (
    <>
      <PasswordLogic route={route}  theme ={theme}/>
    </>
  );
};

export default PasswordInput;

const PasswordLogic = (props, theme) => {
  const { email } = props.route.params;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const userInfos = {
    newPassword: "",
    confirmPassword: "",
  };

  const verify = async (values) => {
    try {
      setIsLoading(true);
      setError(false);
      setFeedback(false);
      const formData = new FormData();

      formData.append("email", email.email);
      formData.append("newPassword", values.newPassword);
      formData.append("confirmPassword", values.confirmPassword);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      const res = await client.put(`/resetpassword`, formData, config);

      if (res.status === 200) {
        setFeedback("Password reset successful ✅");

        // navigate the user after 2 seconds to provide a better user experience
        setTimeout(() => {
          navigation.dispatch(StackActions.replace("Log-in"));
        }, 3000);
      }
    } catch (e) {
      // if (e.response.data.success === false  && e.response.status === 401 && e.response.data.msg === "Session Expired") {
      //   try{
      //     await getAccessToken()
      //     await verify()

      //   }catch(e){

      //    setError(e.message === "Network Error" ? e.message : "Oops! Something went wrong. Please try again.")
      //   }
      // }
      // else{
      //   setError(e.message)
      // }
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          alignContent: "center",
          backgroundColor: theme.white,
        }}
      >
        <StatusBar backgroundColor={theme.white} />
        <KeyboardAvoidingView
          enabled
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={{ paddingHorizontal: 25, paddingTop: 40 }}>
                <View style={{ alignItems: "center" }}>
                  <LottieView
                    source={require("../../assets/animations/login.json")}
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
                    fontFamily: "Poppins-Bold",
                    fontSize: 25,
                    fontWeight: "500",
                    paddingTop: 30,
                    color: theme.lightblue,
                  }}
                >
                  Reset Password
                </Text>

                <View style={{ paddingTop: error ? 40 : 30 }}>
                  <Formik
                    initialValues={userInfos}
                    validationSchema={validationSchema}
                    onSubmit={verify}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleBlur,
                      handleChange,
                      handleSubmit,
                    }) => {
                      const { newPassword, confirmPassword } = values;
                      return (
                        <View>
                          {error && (
                            <Text
                              style={{
                                color: "red",
                                fontFamily: "Poppins",
                                fontSize: 13,
                                bottom: 20,
                              }}
                            >
                              {error}
                            </Text>
                          )}

                          {feedback && (
                            <Text
                              style={{
                                color: theme.lightgreen,
                                fontFamily: "Poppins",
                                fontSize: 13,
                                bottom: 20,
                              }}
                            >
                              {feedback}
                            </Text>
                          )}

                          {errors.newPassword && touched.newPassword && (
                            <Text
                              style={[
                                styles.error,
                                {
                                  top: error ? 10 : -10,
                                  alignContent: "center",
                                  right: width / 25,
                                },
                              ]}
                            >
                              {errors.newPassword}
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
                            placeholder="new password"
                            onChangeText={handleChange("newPassword")}
                            onBlur={handleBlur("newPassword")}
                            error={touched.newPassword && errors.newPassword}
                            value={newPassword}
                            secureTextEntry
                            autoCapitalize="none"
                            maxLength={32}
                            selectionColor={theme.lightblue}
                            cursorColor={theme.lightblue}
                          />

                          {errors.confirmPassword &&
                            touched.confirmPassword && (
                              <Text
                                style={[
                                  styles.error,
                                  {
                                    top: error ? 70 : 45,
                                    alignContent: "center",
                                    right: width / 25,
                                  },
                                ]}
                              >
                                {errors.confirmPassword}
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
                            placeholder="confirm password"
                            onChangeText={handleChange("confirmPassword")}
                            onBlur={handleBlur("confirmPassword")}
                            error={
                              touched.confirmPassword && errors.confirmPassword
                            }
                            value={confirmPassword}
                            secureTextEntry
                            autoCapitalize="none"
                            maxLength={32}
                            selectionColor={theme.lightblue}
                            cursorColor={theme.lightblue}
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
                              title={"Verify"}
                            />
                          )}
                        </View>
                      );
                    }}
                  </Formik>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

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
