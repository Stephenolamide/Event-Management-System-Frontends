import React, { useState, useRef, useEffect, useContext } from "react";
import {
  View,
  TextInput,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { ThemeContext } from "../context/ThemeContext";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const initCodes = [];

export default function OTP({
  containerStyle,
  otpStyles,
  codeCount = 5,
  onTyping,
  onFinish,
  isLoading,
  ...props
}) {
	const {theme} = useContext(ThemeContext)

  const inputCodeRef = useRef(new Array());
  const [codes, setCodes] = useState(initCodes);
  const [isCodeComplete, setIsCodeComplete] = useState(false);

  useEffect(() => {
    const codes = [];
    for (let i = 0; i < codeCount; i++) {
      codes.push("");
    }
    setCodes(codes);
  }, []);

  useEffect(() => {
    onTyping && onTyping(getCodes());
    const isTypeFinish = codes.every(function (i) {
      return i !== "";
    });
    setIsCodeComplete(isTypeFinish);
  }, [codes]);

  const getCodes = () => {
    let codeString = "";
    codes.forEach((code) => {
      codeString += code;
    });
    return { token: codeString };
  };

  const onChangeCode = (code, index) => {
    const typedCode = code.slice(-1);
    const currentCodes = [...codes];
    currentCodes[index] = typedCode;
    setCodes(currentCodes);
  };

  const onKeyPress = (event, index) => {
    const key = event.nativeEvent.key;
    let destIndex = index;
    if (key === "Backspace") {
      destIndex = index > 0 ? index - 1 : 0;
    } else {
      destIndex = index < codeCount - 1 ? index + 1 : codeCount - 1;
    }
    inputCodeRef.current[destIndex].focus();
  };

  const handleSubmit = () => {
    try {
      if (isCodeComplete) {
        onFinish && onFinish(getCodes());
      }
    } catch (e) {
    } finally {
    }
  };


  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
    },
    // scrollViewContent: {
    // 	// flexGrow: 1,
    // 	alignItems: "center",
    // 	justifyContent: "center",
    // },
    codeContainer: {
      flexDirection: "row",
      justifyContent: "center",
    },
    codeInput: {
      width: width / 8,
      height: 50,
      marginHorizontal: 5,
      fontSize: 24,
      backgroundColor: theme.white,
      borderRadius: 5,
      borderWidth: 2,
      borderColor: theme.primary,
      textAlign: "center",
      fontFamily: "Poppins",
      color: theme.onboarding,
      marginBottom: 10,
    },
    submitButton: {
      width: width * 0.4,
      height: width * 0.15,
      marginTop: 15,
      borderRadius: 7.5,
      display: "flex",
      // flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.primary,
      borderRadius: 5,
    },
    submitButtonText: {
      fontSize: 14,
      fontWeight: "600",
      color: "white",
      color: theme.white,
      fontSize: 18,
      fontFamily: "Poppins",
    },
  });
  

  return (
    <View style={[styles.container, containerStyle]}>
      {/* <ScrollView
				contentContainerStyle={styles.scrollViewContent}
				keyboardShouldPersistTaps="handled"
			> */}
      <View style={styles.codeContainer}>
        {codes.map((code, index) => (
          <TextInput
            cursorColor={theme.lightblue}
            key={index}
            ref={(ref) => (inputCodeRef.current[index] = ref)}
            style={[styles.codeInput, otpStyles]}
            onChangeText={(text) => onChangeCode(text, index)}
            onKeyPress={(event) => onKeyPress(event, index)}
            value={code}
            maxLength={1}
            keyboardType="numeric"
            autoFocus={index === 0}
            selectTextOnFocus={true}
            blurOnSubmit={false}
          />
        ))}
      </View>
      {/* </ScrollView> */}
      {isCodeComplete &&
        (isLoading ? (
          <View style={styles.submitButton}>
            <ActivityIndicator size="large" color={theme.white} />
          </View>
        ) : (
          <>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
              // disabled={true}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </>
        ))}
    </View>
  );
}

