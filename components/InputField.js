import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export const InputField = (props) => {
  const {
    label,
    icon,
    inputType,
    keyboardType,
    fieldButtonLabel,
    fieldButtonFunction,
    rightIcon,
    onPress,
    width,
    placeholderTextColor
  } = props;

  const {theme} = useContext(ThemeContext)

  return (
    <View
      style={{
        flexDirection: "row",
        borderBottomColor: theme.lightGray3,
        borderBottomWidth: 1,
        paddingBottom: 5,
        marginBottom: 20,
      }}
    >
      {icon}
      {inputType == "password" ? (
        <>
          <TextInput
            {...props}
            style={{ flex: 1, paddingVertical: 0, fontFamily: "Poppins", color:theme.black }}
            selectionColor={theme.primary}
            cursorColor={theme.primary}
          placeholderTextColor={placeholderTextColor}

          />
          {rightIcon && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onPress}
              style={{
                position: "absolute",
                right: 10,
                top: 4,
              }}
            >
              {rightIcon}
            </TouchableOpacity>
          )}
        </>
      ) : (
        <View style={{width:100}}>

        <TextInput
          {...props}
          style={{ flex: 1, paddingVertical: 0, fontFamily: "Poppins", color:theme.black}}
          selectionColor={theme.primary}
          cursorColor={theme.primary}
          placeholderTextColor={placeholderTextColor}
        />
        </View>
      )}
      <TouchableOpacity onPress={fieldButtonFunction} activeOpacity={0.8}>
        <Text
          style={{
            color: theme.lightblue,
            fontFamily: "Poppins3",
            fontSize: 13.5,
            top: 3,
          }}
        >
          {fieldButtonLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
