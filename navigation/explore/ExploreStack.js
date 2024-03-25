import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Stack = createStackNavigator();

import { createStackNavigator } from "@react-navigation/stack";
import ExploreScreen from '../../screens/explore/ExploreScreen';
import ExploreDetailsScreen from "../../screens/explore/ExploreDetailsScreen"

const ExploreStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
    
          <Stack.Screen component={ExploreScreen} name="ExploreScreen" />
          <Stack.Screen component={ExploreDetailsScreen} name="ExploreDetails" />

        </Stack.Navigator>
      );

}

export default ExploreStack

const styles = StyleSheet.create({})