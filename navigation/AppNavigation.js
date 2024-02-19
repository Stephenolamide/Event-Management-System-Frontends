import React, { useContext } from "react";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MainStack } from "./MainStack";
import AuthenticationStack from "./AuthenticationStack";
import { AuthContext, AuthProvider } from "../context/AuthContext";
import { ActivityIndicator, View, AppState, StatusBar } from "react-native";
import { COLORS, darkTheme, lightTheme } from "../constants/theme";
import { ThemeContext } from "../context/ThemeContext";

const AppNavigation = () => {
  const { isLoading, userRefreshToken } = useContext(AuthContext);

  const { theme, isDarkMode } = useContext(ThemeContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContext: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} color={COLORS.transparent} />
      </View>
    );
  }

  const ColorsDefaultTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#ffff",
    },
  };

  const ColorsDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: "#15202d",
    },
  };
  const themes = isDarkMode ? ColorsDarkTheme : ColorsDefaultTheme;

  return (
    <NavigationContainer theme={themes}>
      <StatusBar
        backgroundColor={theme.white}
        barStyle={isDarkMode ? "light-content" : "dark-content"}
      />
      <SafeAreaProvider>
        {userRefreshToken !== null ? (
          //when a user is signed in
          <MainStack />
        ) : (
          // when a user is signed out
          <AuthenticationStack />
        )}
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default AppNavigation;
