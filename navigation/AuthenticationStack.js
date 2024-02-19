
import LoginScreen from "../screens/auth/LoginScreen";
import { SignUp } from "../screens/auth/SignUpScreen";
import VerifyAccountScreen from "../screens/auth/VerifyAccountScreen";
import { TabNavigator } from "./TabStack";
import React, { useEffect, useState } from "react";
import OnBoardingScreen from "../screens/auth/OnBoardingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import ForgotPassword from "../screens/auth/ForgotPassword";
import VerifyPasswordToken from "../screens/auth/VerifyPasswordToken";
import PasswordInput from "../screens/auth/PasswordInput";
import { MainStack } from "./MainStack";
const Stack = createStackNavigator();

const AuthenticationStack = () => {
  const [isAppFirstLaunched, setIsAppFirstLaunched] = useState(null);

  const checkForFirstTimeLoaded = async () => {
    const appData = await AsyncStorage.getItem("isAppFirstLaunched");

    if (appData == null) {
      setIsAppFirstLaunched(true);
      AsyncStorage.setItem("isAppFirstLaunched", "false");
    } else {
      setIsAppFirstLaunched(false);
    }
  };

  useEffect(() => {
    checkForFirstTimeLoaded();
  }, []);

  return (
    isAppFirstLaunched !== null && (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAppFirstLaunched && (
          <Stack.Screen component={OnBoardingScreen} name="OnBoarding" />
        )}
        <Stack.Screen component={LoginScreen} name="Log-in" />
        <Stack.Screen component={SignUp} name="Sign-up" />
        <Stack.Screen component={VerifyAccountScreen} name="verify" />
        <Stack.Screen component={ForgotPassword} name="password" />
        <Stack.Screen
          component={VerifyPasswordToken}
          name="verifyPasswordToken"
        />
        <Stack.Screen component={PasswordInput} name="PasswordInput" />
        <Stack.Screen component={MainStack} name="Tab" />
      </Stack.Navigator>
    )
  );
};

//in the aunthentication stack, if the user is just coming to the app for the first time, show the onboarding screen and save the result to the async storage

export default AuthenticationStack;
