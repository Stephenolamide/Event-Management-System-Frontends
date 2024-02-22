import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";

import {
  useNavigation,
} from "@react-navigation/native";

import * as Yup from "yup";
import { Formik } from "formik";
import LottieView from "lottie-react-native";
import CustomInputExperience from "../../components/CustomInputExperience";
import { FormSubmitBtn } from "../../components/FormSubmitBtn";
import { InputField } from "../../components/InputField";
import { ThemeContext } from "../../context/ThemeContext";
import useSignIn from "../../utils/auth/authFunction";

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
  const [error, setError] = useState(null);
	const {theme} = useContext(ThemeContext)


  const userInfos = {
    email: "",
    password: "",
  };


  const signIn = useSignIn()


  return (
    <SafeAreaView
      style={{ flex: 1, alignContent: "center", backgroundColor: theme.white }}
    >
      <StatusBar backgroundColor={theme.white} />
                 <CustomInputExperience style={{flex:1}}>
            <View style={{ paddingHorizontal: 25, paddingTop: 40 }}>
              <View style={{ alignItems: "center" }}>
                <LottieView
                  source={require("../../assets/animations/campaign2.json")}
                  style={{
                    // position: "relative",
                    width: 250,
                    height: 250,
                    // paddingTop: 3,
                    // alignSelf: "center",
                  }}
                  loop
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
                          @gmail.com
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
                              name="mail"
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
