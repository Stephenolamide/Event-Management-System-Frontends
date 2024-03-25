import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeScreen from "../../screens/home/HomeScreen";
import TicketScreen from "../../screens/profile/TicketScreen";
import { ProfileScreen } from "../../screens/profile/ProfileScreen";
import AccountScreen from "../../screens/profile/AccountScreen";
import UploadEventScreen from "../../screens/UploadEventScreen";
import UploadPostScreen from "../../screens/UploadPostScreen";
import ScanTicketScreen from "../../screens/ScanTicketScreen";
import { DashboardScreen } from "../../screens/DashboardScreen";
import EditEventScheduleScreen from "../../screens/EditEventScheduleScreen";
import Feedback from "../../screens/profile/FeedbackScreen";

const Stack = createStackNavigator();


const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      <Stack.Screen component={ProfileScreen} name="ProfileScreen" />
      <Stack.Screen component={AccountScreen} name="AccountScreen" />
      <Stack.Screen component={TicketScreen} name="TicketScreen" />
      <Stack.Screen component={UploadPostScreen} name="UploadPostScreen" />
      <Stack.Screen component={UploadEventScreen} name="UploadEventScreen" />
      <Stack.Screen component={ScanTicketScreen} name="ScanTicketScreen" />
      <Stack.Screen component={DashboardScreen} name="DashboardScreen" />
      <Stack.Screen component={Feedback} name="FeedbackScreen" />
      <Stack.Screen
        component={EditEventScheduleScreen}
        name="EditEventScheduleScreen"
      />
    </Stack.Navigator>
  );
}

export default ProfileStack

const styles = StyleSheet.create({})