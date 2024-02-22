import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useContext} from "react";
import { ThemeContext } from "../context/ThemeContext";

import { HomeStack } from "./home/HomeStack";
import ProfileStack from "./profile/ProfileStack"

import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export function MainStack() {
	return (
		<Stack.Navigator
			// initialRouteName="verify"
			screenOptions={{ headerShown: false }}
		>
			 <Stack.Screen component={TabNavigator} name="Tabs" />
		</Stack.Navigator>
	);
}

const TabNavigator = () => {
  const { theme } = useContext(ThemeContext);

  return (
    // <NavigationContainer independent={true}>
    <Tab.Navigator
      // initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          }
           else if (route.name === "Event") {
            iconName = focused ? "ios-calendar" : "ios-calendar-outline";
          }
           else if (route.name === "Profile") {
            iconName = focused
              ? "ios-person-circle"
              : "ios-person-circle-outline";
          } else if (route.name === "Task") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          }

          return (
            <Ionicons
              name={iconName}
              size={23}
              color={color}
              style={{ paddingTop: 6 }}
            />
          );
        },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.darkgray,
        tabBarLabelStyle: {
          fontFamily: "Poppins",
          fontSize: 9,
          lineHeight: 13.5,
          textTransform: "none",
        },
        tabBarStyle: { backgroundColor: theme.white },
        
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={({ route }) => ({
          tabBarStyle: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? "";
            if (routeName === "PostDetails") {
              return { display: "none" };
            } else {
              return { backgroundColor: theme.white };
            }
          })(route),
        })}
      />
      <Tab.Screen name="Profile" component={ProfileStack} headerShown={true} /> 
    </Tab.Navigator>

    //  </NavigationContainer>
  );
};


