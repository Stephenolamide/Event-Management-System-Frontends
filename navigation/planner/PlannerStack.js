import { StyleSheet} from 'react-native'
import React from 'react'

const Stack = createStackNavigator();

import { createStackNavigator } from "@react-navigation/stack";
import AddEventSchedulerScreen from '../../screens/planner/AddEventScheduler';
import EventScheduleScreen from '../../screens/planner/EventScheduleScreen';


const PlannerStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
    
          <Stack.Screen component={EventScheduleScreen} name="EventScheduleScreen" />
          <Stack.Screen component={AddEventSchedulerScreen} name="AddEventSchedulerScreen" />

        </Stack.Navigator>
      );

}

export default PlannerStack

const styles = StyleSheet.create({})