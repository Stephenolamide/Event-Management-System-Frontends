import { createStackNavigator } from "@react-navigation/stack";
import EventSchedulerScreen from "../screens/planner/AddEventScheduler";
import AddEventSchedulerScreen from "../screens/planner/AddEventScheduler";


const Stack = createStackNavigator();
const EventScheduleStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen component={EventSchedulerScreen} name="EventSchedulerScreen" />
			<Stack.Screen component={AddEventSchedulerScreen} name="AddEventSchedulerScreen" />

		</Stack.Navigator>
	);
}

export default EventScheduleStack
