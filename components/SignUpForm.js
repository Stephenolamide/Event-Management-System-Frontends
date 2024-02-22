import { Formik } from "formik";
import React, { useContext, useState } from "react";
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { FormInput } from "./FormInput";
import { FormSubmitBtn } from "./FormSubmitBtn";
import * as Yup from "yup";
import { useNavigation, StackActions } from "@react-navigation/native";
import client from "../api/client";

import { Eye, EyeOff, School } from "../constants/icons";
const { width, height } = Dimensions.get("screen");
import { CheckBox } from "react-native-elements";
import { ThemeContext } from "../context/ThemeContext";
import CustomInputExperience from "./CustomInputExperience";
import * as Linking from 'expo-linking';
import { Dropdown } from "react-native-element-dropdown";
import ErrorButton from "./ErrorButton";


const validationSchema = Yup.object({
  firstname: Yup.string()
    .trim()
    .min(3, "Invalid Name")
    .required("First Name required!"),
  lastname: Yup.string()
    .trim()
    .min(3, "Invalid Name")
    .required("Last Name required!"),
  email: Yup.string()
    .trim()
    // .matches(
    // 	/^[\w-\.]+@+([\w-\.])+babcock+(\.)+edu(\.)ng$/gi,
    // 	"School Email required"
    // )
    // .matches(
    // 	/^[\w-\.]+@student\.babcock\.edu\.ng$/,
    // 	"School Email required"
    //   )
    .required("Email required!"),
  password: Yup.string()
    .trim()
    .min(8, "Password not long enough!")
    .required("Password required!"),
  confirmpassword: Yup.string().equals(
    [Yup.ref("password"), null],
    "Password doesn't match"
  ),
  level: Yup.string().required("Level required!"),
});

const Level = [
  {
    label: "100",
    value: "100",
  },
  {
    label: "200",
    value: "200",
  },
  { label: "300", value: "300" },
  { label: "400", value: "400" },
  { label: "500", value: "500" },
  { label: "600", value: "600" },
];

export const SignUpForm = ({ onError }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [checked, setChecked] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const { theme } = useContext(ThemeContext);

  const navigation = useNavigation();
  const userInfo = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    level:""
  };

  const openTermsAndConditions = async () => {
    const url = 'https://lightofthewoorld.github.io/Light.github.io/eula.html'; // Replace with your terms and conditions URL
    try {
      await Linking.openURL(url);
    } catch (error) {
      setError(true)
      setErrorMessage("An error occured, pls try again")
    }
  };
  

  const signUp = async (values) => {
    const email = values.email.trim().toLowerCase() + "@student.babcock.edu.ng";   
    try {
      setIsLoading(true);
      const res = await client.post("/signup", {
        email: email,
        password: values.password,
        firstname: values.firstname,
        lastname: values.lastname,
        confirmpassword: values.confirmpassword,
        level:values.level
      });

      if (res.data.success && res.status === 200) {
        navigation.dispatch(
          StackActions.replace("verify", {
            email: email,
            password: values.password,
          })
        );
      }
    } catch (e) {
      setError(true);
      setErrorMessage(
        e.response.data.error
          ? e.response.data.error
          : "Oops! something went wrong, pls try again"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const styles = StyleSheet.create({
    text: {
      fontSize: 13.5,
      fontFamily: "Poppins",
      color: theme.black,
    },
    textInput: {
      // borderBottomWidth: 2.5,
      // borderBottomColor: theme.primary,
      backgroundColor: theme.lightGray3,
      borderRadius: 5,
      height: 45,
      marginBottom: 2,
      paddingLeft: 5,
      fontSize: 14,
      fontFamily: "Poppins",
      color: theme.black,
      
    },
    dropdown: {
      // margin: 1,
      top:2,
      height: 50,
      backgroundColor: "white",
      width:width-76,
      borderRadius: 5,
      // borderBottomWidth: 3,
      // borderBottomColor: theme.primary,
      backgroundColor: theme.lightGray,
      padding: 12,
      shadowColor: theme.black,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
      right:-2
    },
    icon: {
      marginRight: 5,
      color: theme.primaryblue,
    },
    item: {
      padding: 17,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    textItem: {
      flex: 1,
      fontSize: 16,
      fontFamily: "Poppins",
      color: "gray",
    },
    placeholderStyle: {
      fontSize: 16,
      fontFamily: "Poppins",
      color: theme.blendgray,
      marginLeft: 10,
    },
    selectedTextStyle: {
      fontSize: 16,
      color: theme.primaryblue,
      fontFamily: "Poppins",
    },
    iconStyle: {
      width: 20,
      height: 20,
      color: theme.primaryblue,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
      fontFamily: "Poppins",
    },
    error: {
      fontFamily: "Poppins",
      fontSize: 11,
      color: theme.red,
      right: 5,
      position: "absolute",
      top: -16,
    },
  });

  return (
    <SafeAreaView style={{ flex: 1, bottom:10 }}>
      <CustomInputExperience
        contentContainerStyle={{
          // flexGrow: 1,
          // paddingBottom: 30,
          height: height,
          
        }}
      >
        <View style={{ justifyContent: "center", }}>
          <Text
            style={{
              color: theme.primary,
              alignSelf: "center",
              fontSize: 35,
              fontWeight: "600",
              fontFamily: "Poppins3",
            }}
          >
            Welcome
          </Text>
          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            <Text style={{ fontFamily: "Poppins", color: theme.black }}>
              Let's create your
            </Text>
            <Text
              style={{
                // textDecorationLine: "underline",
                color: theme.black,
                fontFamily: "Poppins",
                left: 3,
              }}
            >
              account
            </Text>
          </View>
          <View style={{ width: width * 0.8, alignSelf: "center" }}>
            <Formik
              initialValues={userInfo}
              validationSchema={validationSchema}
              onSubmit={signUp}
            >
              {({
                values,
                errors,
                touched,
                isSubmitting,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
              }) => {
                const {
                  firstname,
                  lastname,
                  email,
                  password,
                  confirmpassword,
                  level
                } = values;
                return (
                  <View style={{marginVertical:15}}>
                    <FormInput
                      onChangeText={handleChange("firstname")}
                      onBlur={handleBlur("firstname")}
                      error={touched.firstname && errors.firstname}
                      value={firstname}
                      label={"First Name"}
                      style={styles.text}
                      TextInputStyle={styles.textInput}
                    />
                    <FormInput
                      onChangeText={handleChange("lastname")}
                      onBlur={handleBlur("lastname")}
                      error={touched.lastname && errors.lastname}
                      value={lastname}
                      label={"Last Name"}
                      style={styles.text}
                      TextInputStyle={styles.textInput}
                    />

                    <View>
                      <FormInput
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        error={touched.email && errors.email}
                        value={email}
                        autoCapitalize="none"
                        label={"Email"}
                        style={styles.text}
                        TextInputStyle={[styles.textInput, { fontSize: 11 }]}
                        formAppend={"@student.babcock.edu.ng"}
                        maxLength={23}
                      />
                    </View>

                    <View style={{ bottom: 13 }}>
                      <FormInput
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        error={touched.password && errors.password}
                        value={password}
                        autoCapitalize="none"
                        label={"Password"}
                        style={styles.text}
                        secureTextEntry={!passwordVisible}
                        rightIcon={!passwordVisible ? <Eye /> : <EyeOff />}
                        onPress={() => setPasswordVisible(!passwordVisible)}
                        TextInputStyle={styles.textInput}
                      />
                      <FormInput
                        onChangeText={handleChange("confirmpassword")}
                        onBlur={handleBlur("confirmpassword")}
                        error={
                          touched.confirmpassword && errors.confirmpassword
                        }
                        value={confirmpassword}
                        secureTextEntry={!confirmPasswordVisible}
                        autoCapitalize="none"
                        label={"Verify Password"}
                        style={styles.text}
                        rightIcon={
                          !confirmPasswordVisible ? <Eye /> : <EyeOff />
                        }
                        onPress={() =>
                          setConfirmPasswordVisible(!confirmPasswordVisible)
                        }
                        TextInputStyle={styles.textInput}
                        placeholderTextColor={theme.black}
                      />
                    </View>


                         <View>
                          {errors.level && touched.level && (
                            <Text style={styles.error}>{errors.level}</Text>
                          )}
                          <Dropdown
                            style={[
                              styles.dropdown,
                            ]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            itemTextStyle={styles.textItem}
                            data={Level}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="Level"
                            value={level}
                            onChange={(value) =>
                              setFieldValue("level", value.value)
                            }
                            onChangeText={handleChange("level")}
                            renderLeftIcon={() => School}
                            showsVerticalScrollIndicator={false}
                          />
                        </View>

                    {/* <TouchableOpacity onPress={()=> navigation.navigate("EndUsersAgreement")}> */}
                    <CheckBox
                      containerStyle={{
                        width: width * 0.8,
                        paddingTop: 10,
                        borderWidth: 0,
                        right: 10,
                        top: 10,
                        backgroundColor: "#FFF",
                       
                      }}
                      textStyle={{ fontSize: 9,  color:theme.primary, textDecorationLine:"underline" }}
                      center
                      title="I have read and agreed to the Terms and Conditions for using the BUSA app "
                      checked={checked}
                      onIconPress={() => {setChecked(!checked)}}
                      onPress={()=> openTermsAndConditions()}
                    />

                    {/* </TouchableOpacity> */}
                    {isLoading ? (
                      <View>
                        <ActivityIndicator
                          size="large"
                          color={theme.primaryblue}
                        />
                      </View>
                    ) : (
                      <FormSubmitBtn
                        disabled={!checked}
                        // Submitting={isSubmitting}
                        onPress={handleSubmit}
                        title={"Create Account"}
                        style={{
                          backgroundColor: checked ? theme.lightblue : "#8fb9ff" 
                        }}
                      />
                    )}
                  </View>
                );
              }}
            </Formik>
            <View
              style={{
                flexDirection: "row",
                alignSelf: "center",
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "Poppins",
                  color: theme.black,
                }}
              >
                Have an account?
              </Text>
              <Text
                style={{
                  color: theme.primary,
                  fontWeight: "500",
                  marginLeft: 5,
                  fontFamily: "Poppins3",
                }}
                onPress={() => navigation.navigate("Log-in")}
              >
                Log in
              </Text>
            </View>
          </View>
        </View>
		
      </CustomInputExperience>
      {error && (
        <ErrorButton
          onPress={() => {
            setError(false);
          }}
          message={errorMessage}
          style={{ bottom: height / 12 }}
          color={theme.red}
          borderRadius={10}
        />
      )}
    </SafeAreaView>
  );
};
