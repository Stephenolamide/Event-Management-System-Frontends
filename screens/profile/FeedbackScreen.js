import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { Back } from "../../constants/icons";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";
import * as Yup from "yup";
import { COLORS } from "../../constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../../context/ThemeContext";
import client from "../../api/client";

const { width, height } = Dimensions.get("screen");

const validationSchemaFeedback = Yup.object({
  feedback: Yup.string().required("Feedback required!"),
});

const Feedback = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [feedback, setFeedback] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("userInfo");
      const userToken = await AsyncStorage.getItem("userToken");

      if (value !== null && userToken !== null) {
        setUserInfo(JSON.parse(value));
        setUserToken(userToken);
      }
    } catch (e) {
      console.error("Error retrieving data:", e);
    }
  };
  const postFeedback = async (values, userToken, userInfo, resetForm) => {
    try {
      if (userToken !== null && userInfo !== null) {
        const formData = new FormData();
        formData.append("feedback", values.feedback);
        formData.append("senderMail", userInfo.email);
        const token = userToken;

        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        setIsLoading(true);
        console.log("Sending feedback...");
        const res = await client.post(`/sendFeedback`, formData, config);

        console.log("Response:", res);

        if (res.status === 200) {
          setFeedback(true);
          setMessage("Feedback sent successfully✅");
          Alert.alert(
            "Feedback sent Successfully ✅",
            "Your opinion has been noted and would be worked on😁"
          );
          // Reset form upon success
          resetForm();
        }
      }
    } catch (e) {
      console.error("Error:", e);
      setFeedback(true);
      setMessage("Something went wrong, Please try again!");
    } finally {
      setIsLoading(false);
    }
  };

  const { theme } = useContext(ThemeContext);

  return (
    <SafeAreaView style={{ paddingHorizontal: 15, paddingTop: 29 }}>
      <View style={{ flexDirection: "row", gap: 15, marginBottom: 30 }}>
        <Back
          size={24}
          color={theme.black}
          style={{ alignSelf: "center" }}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{
            fontFamily: "JakartaBold",
            fontSize: 24,
            alignSelf: "center",
            color: theme.black,
          }}
        >
          Feedback
        </Text>
      </View>
      <Text style={{ color: theme.black }}>
        Send us feedback to know how we can improve your experience on the app!
      </Text>
      <Formik
        initialValues={{ feedback: "" }}
        validationSchema={validationSchemaFeedback}
        onSubmit={(values, { resetForm }) =>
          postFeedback(values, userToken, userInfo, resetForm)
        }
      >
        {({
          values,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          touched,
        }) => {
          const { feedback } = values;
          return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View>
                <TextInput
                  placeholder="Your message here"
                  multiline={true}
                  style={{
                    marginTop: 15,
                    borderColor: COLORS.gray,
                    width: "100%",
                    borderWidth: 1,
                    borderRadius: 10,
                    padding: 10,
                    height: 171,
                    marginBottom: 15,
                    fontFamily: "Jakarta",
                    top: 3,
                    color: theme.black,
                  }}
                  selectionColor={theme.primaryblue}
                  onChangeText={handleChange("feedback")}
                  onBlur={handleBlur("feedback")}
                  value={feedback}
                />
                {isLoading ? (
                  <ActivityIndicator
                    size="large"
                    color={theme.primaryblue}
                    style={{ marginTop: height * 0.45 }}
                  />
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={handleSubmit}
                    style={{
                      marginTop:
                        Boolean(Keyboard.isVisible) === true
                          ? 120
                          : height * 0.45,
                    }}
                  >
                    <View
                      style={{
                        alignSelf: "center",
                        height: 48,
                        width: 335,
                        backgroundColor: "rgba(0, 79.41, 198.53, 1)",
                        borderRadius: 5,
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          // fontWeight: "500",
                          textAlign: "center",
                          color: COLORS.white,
                          fontFamily: "JakartaSemiBold",
                        }}
                      >
                        Done
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            </TouchableWithoutFeedback>
          );
        }}
      </Formik>
    </SafeAreaView>
  );
};
export default Feedback;
