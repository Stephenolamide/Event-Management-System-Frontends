import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProfileScreen from "../../screens/profile/ProfileScreen";
import HomeScreen from "../../screens/home/HomeScreen";
import TicketScreen from "../../screens/profile/TicketScreen";

const Stack = createStackNavigator();


const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      <Stack.Screen component={ProfileScreen} name="ProfileScreen" />
      <Stack.Screen component={TicketScreen} name="TicketScreen" />

    </Stack.Navigator>
  );
}

export default ProfileStack

const styles = StyleSheet.create({})