import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

// const theme = () => {
//   return (
//     <View>
//       <Text>theme</Text>
//     </View>
//   )
// }

// export default theme

// const styles = StyleSheet.create({})
// const {isDark} = useContext(AuthContext)

export const COLORS = {
  primary: "#004FC7", // blue
  secondary: "#F6F6F6", // gray
  lightgreen: "#005B20",
  offblack: "#363636",
  colorss: "#eff6ff",
  bio: "#2e2e2e",
  black: "#000000",
  campaignDivider: "#E0E0E0",
  sblack: "#1E1F20",
  offwhite: "#d9d9d9",
  white: "#FFFFFF",
  lightGray: "#F5F5F6",
  lightGray2: "#F6F6F7",
  lightGray3: "#EFEFF1",
  lightGray4: "#F8F8F9",
  transparent: "transparent",
  darkgray: "#999999",
  accordion: "rgba(113,113,113,0.2)",
  text: "#2d2d2d",
  extra: "rgba(39, 46, 57, 1)",
  lightblue: "#1b5bff",
  offgray: "#8c8c8c",
  ccolor: "#818181",
  red: "red",
  gray: "gray",
  primaryblue: "#363be8",
  blendgray: "#717171",
  darkblack: "#8b98a5",
  mgray: "#999999",
  events: "#2b3b67",
  home: "#4d4a95",
  modal: "#045DE9",
  new: "rgba(112.62, 112.62, 112.62, 1)",
  green: "green",
  mwhite: "#ececec",
  onboarding: "#4484e4",
  tasks: "#E5F2FF",
  todo: "#07081E",
  todoBackground: "#045DE9",
  todoInactive: "#E6F2FF",
  todoInput: "#F4F5FF",
  todoText: "#070E50",
  feedcolor: "#07081E",
  campaign: "#b4b4b4",
};




export const lightTheme = {
  primary: "#045DE9", // blue
  secondary: "#F6F6F6", // gray
  lightgreen: "#005B20",
  offblack: "#363636",
  colorss: "#eff6ff",
  bio: "#2e2e2e",
  black: "#000000",
  campaignDivider: "#E0E0E0",
  sblack: "#1E1F20",
  offwhites: "#e7e7e7",
  offwhite: "#E7E7E7",
  white: "#FFFFFF",
  lightGray: "#F5F5F6",
  lightGray2: "#F6F6F7",
  lightGray3: "#EFEFF1",
  lightGray4: "#F8F8F9",
  transparent: "transparent",
  darkgray: "#999999",
  accordion: "rgba(113,113,113,0.2)",
  text: "#2d2d2d",
  extra: "rgba(39, 46, 57, 1)",
  lightblue: "#1b5bff",
  offgray: "#8c8c8c",
  ccolor: "#818181",
  red: "red",
  gray: "gray",
  primaryblue: "#363be8",
  blendgray: "#717171",
  darkblack: "#303030",
  mgray: "#999999",
  events: "#2b3b67",
  home: "#4d4a95",
  modal: "#045DE9",
  new: "rgba(112.62, 112.62, 112.62, 1)",
  green: "green",
  mwhite: "#ececec",
  onboarding: "#4484e4",
  tasks: "#E5F2FF",
  todo: "#07081E",
  todoBackground: "#045DE9",
  todoInactive: "#E6F2FF",
  todoInput: "#F4F5FF",
  todoText: "#070E50",
  feedcolor: "#07081E",
  campaign: "#b4b4b4",
  drawer: "#f9f9f9",
  transparent2: "transparent",
  drawerBoarder: "#EFEEEB",
  drawerInactiveTintColor: "#0C0C0D",
  iconColor: "#7B7B7B",
  whites: "#ffffff",
  addTimetable:"#99A2AD",
  maps:"#D9D9D9",
  maps2:"#E9E9E9",
  mapsBackground:"#004FC7"
};

export const darkTheme = {
  primary: "#045DE9", // blue
  secondary: "#F6F6F6", // gray
  lightgreen: "#005B20",
  addTimetable:"#ffffff",
  offblack: "#ffffff",
  colorss: "#1e2936",
  bio: "#2e2e2e",
  black: "#ffffff",
  campaignDivider: "#E0E0E0",
  sblack: "#1E1F20",
  offwhite: "#8B98A5",
  offwhites: "#15202d",
  white: "#15202d",
  lightGray: "#F5F5F6",
  lightGray2: "#F6F6F7",
  lightGray3: "#8B98A5",
  lightGray4: "#F8F8F9",
  transparent: "transparent",
  darkgray: "#ffffffff",
  accordion: "rgba(113,113,113,0.2)",
  text: "#ffff",
  extra: "#ffffffff",
  lightblue: "#1b5bff",
  offgray: "#8c8c8c",
  ccolor: "#818181",
  red: "red",
  gray: "gray",
  primaryblue: "#045DE9",
  blendgray: "#8B98A5",
  darkblack: "#8b98a5",
  mgray: "#8b98a5",
  events: "#2b3b67",
  home: "#4d4a95",
  modal: "#045DE9",
  new: "rgba(112.62, 112.62, 112.62, 1)",
  green: "green",
  mwhite: "#ececec",
  onboarding: "#4484e4",
  tasks: "#1e2936",
  todo: "#8B98A5",
  todoBackground: "#045DE9",
  todoInactive: "#1e2936",
  todoInput: "#1e2936",
  todoText: "#ffffff",
  feedcolor: "#ffffff",
  campaign: "#b4b4b4",
  drawer: "#000000",
  transparent2: "#15202d",
  drawerBoarder: "#1e2936",
  drawerInactiveTintColor: "#ffffff",
  iconColor: "#ffffff",
  whites: "#ffffff",
  maps:"#263241",
  maps2:"#1E2936",
  mapsBackground:"#004FC7"

};



export const SPACING = {
  space_2: 2,
  space_4: 4,
  space_8: 8,
  space_10: 10,
  space_12: 12,
  space_15: 15,
  space_16: 16,
  space_18: 18,
  space_20: 20,
  space_24: 24,
  space_28: 28,
  space_32: 32,
  space_36: 36,
};


export const FONTSIZE = {
  size_8: 8,
  size_10: 10,
  size_12: 12,
  size_14: 14,
  size_16: 16,
  size_18: 18,
  size_20: 20,
  size_24: 24,
  size_30: 30,
};

export const FONTFAMILY = {
  poppins_black: 'Poppins-Black',
  poppins_bold: 'Poppins-Bold',
  poppins_extrabold: 'Poppins-ExtraBold',
  poppins_extralight: 'Poppins-ExtraLight',
  poppins_light: 'Poppins-Light',
  poppins_medium: 'Poppins-Medium',
  poppins_regular: 'Poppins-Regular',
  poppins_semibold: 'Poppins-SemiBold',
  poppins_thin: 'Poppins-Thin',
};