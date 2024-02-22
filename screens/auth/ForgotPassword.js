import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import AnimatedLottieView from "lottie-react-native";
import * as Yup from "yup";
import { StackActions, useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import Ionicons from "react-native-vector-icons/Ionicons";
import client from "../../api/client";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { FormSubmitBtn } from "../../components/FormSubmitBtn";
import { InputField } from "../../components/InputField";

const validationSchema = Yup.object({
  email: Yup.string()
    .trim()
    // .matches(
    // /^[\w-\.]+@+([\w-\.])+babcock+(\.)+edu(\.)ng$/gi,
    // "School Email required"
    // )
    // .matches(
    //   /^[\w-\.]+@student\.babcock\.edu\.ng$/,
    //   "School Email required"
    // )
    .required("Email is required!"),
});

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { theme } = useContext(ThemeContext);

  const userInfos = {
    email: "",
  };

  const sendMail = async (values) => {
    const email = values.email + `@student.babcock.edu.ng`;

    try {
      setIsLoading(true);

      const res = await client.post("/forgotPassword", {
        email: email,
      });

      if (res.status === 200) {
        navigation.dispatch(
          StackActions.replace("verifyPasswordToken", {
            email: email,
          })
        );
      }
    } catch (e) {
      // if(e.response.status === 401 && e.response.data.success === false && e.response.data.msg === "Session Expired"){

      //       try{
      //         await getAccessToken()
      //         await sendMail()

      //       }catch(e){
      //     setError(e.message === "Network Error" ? e.message : "Oops! Something went wrong. Please try again.")
      //       }
      //  } else{
      //    setError(e.message);
      //  }
      setError(e.response.data.msg);
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
                  <AnimatedLottieView
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
                    fontFamily: "Poppins2",
                    fontSize: 25,
                    fontWeight: "500",
                    paddingTop: 30,
                    color: theme.lightblue,
                  }}
                >
                  Enter email
                </Text>

                <View style={{ paddingTop: 20 }}>
                  <Formik
                    initialValues={userInfos}
                    validationSchema={validationSchema}
                    onSubmit={sendMail}
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
                                bottom: 20,
                              }}
                            >
                              {error}
                            </Text>
                          )}

                          {errors.email && touched.email && (
                            <Text
                              style={[
                                styles.error,
                                {
                                  top: -20,
                                },
                              ]}
                            >
                              {errors.email}
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
                            placeholder="Email"
                            onBlur={handleBlur("email")}
                            value={email}
                            autoCapitalize="none"
                            label={"Email"}
                            maxLength={50}
                            selectionColor={theme.lightblue}
                            placeholderTextColor={theme.black}
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
                              title={"Next"}
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
                  <Text style={{ fontFamily: "Poppins", color: theme.black }}>
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
            </TouchableWithoutFeedback>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default ForgotPassword;

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
