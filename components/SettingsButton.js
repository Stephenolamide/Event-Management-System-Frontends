import { Platform, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { ChevRight } from "../constants/icons";

export const SettingsButton = ({ icon, ButtonName, iconLeft }) => {
	const {theme} = useContext(ThemeContext)
  
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", paddingHorizontal: 20, paddingVertical:22, justifyContent: "space-between" }}>
          {icon}
          <Text
            style={{
              marginLeft: 20,
              fontFamily: "JakartaMedium",
              fontWeight: "400",
              fontSize: Platform.OS === "android" ? 14 : 17,
              color: theme.black,
            }}
          >
            {ButtonName}
          </Text>
        </View>
        {ChevRight}
        {/* {ChevRight} */}
      </View>
      
    </>
  );
};

const styles = StyleSheet.create({});
