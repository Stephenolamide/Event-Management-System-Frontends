import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
const { width, height } = Dimensions.get("screen");
export const FormInput = (props) => {
  const { theme } = useContext(ThemeContext);

  const {
    label,
    error,
    style,
    TextInputStyle,
    rightIcon,
    onPress,
    multiline,
    maxLength,
    formAppend,
    inputStyle,
    placeholderTextColor,
    clearButtonMode,
  } = props;
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        //   paddingTop: 20,
        }}
      >
        <Text style={style}>{label}</Text>
        {error ? (
          <Text style={{ fontSize: 11, color: "red", fontFamily: "Poppins" }}>
            {error}
          </Text>
        ) : null}
      </View>
      <View>
        <TextInput
          {...props}
          style={TextInputStyle}
          multiline={multiline}
          selectionColor={theme.primary}
          cursorColor={theme.primary}
          maxLength={maxLength}
          placeholderTextColor={placeholderTextColor}
          clearButtonMode={clearButtonMode}
        />
        {rightIcon && (
          <TouchableOpacity
            onPress={onPress}
            style={{
              position: "absolute",
              right: 10,
              top: 8,
            }}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
        {formAppend && (
          <Text
            style={{
              top: -34,
              left: width * 0.43,
              fontFamily: "Poppins",
              fontSize: 10,
              color: theme.black,
              
            }}
           
          >
            {formAppend}
          </Text>
        )}
      </View>
    </>
  );
};
