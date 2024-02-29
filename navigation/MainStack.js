import { createStackNavigator } from "@react-navigation/stack";
// import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useContext} from "react";
import { ThemeContext } from "../context/ThemeContext";

import { HomeStack } from "./home/HomeStack";
import ProfileStack from "./profile/ProfileStack"

import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import ExploreStack from "./explore/ExploreStack";
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
            iconName = focused ? "compass" : "compass";
          }
           else if (route.name === "Explore") {
            iconName = focused ? "bolt" : "bolt";
          }
           else if (route.name === "Profile") {
            iconName = focused
              ? "user"
              : "user";
          } else if (route.name === "Planner") {
            iconName = focused ? "folder" : "folder";
          }

          return (
            <FontAwesome5
              name={iconName}
              size={20}
              color={color}
              style={{ paddingTop: 6 }}
            />
          );
        },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.black,
        // tabBarLabelStyle: {
        //   fontFamily: "Poppins",
        //   fontSize: 9,
        //   lineHeight: 13.5,
        //   textTransform: "none",
        // },
        tabBarStyle: { backgroundColor: theme.white },
        tabBarShowLabel:false
        
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
      {/* <Tab.Screen name="Explore" component={ExploreStack} headerShown={true} /> 
      <Tab.Screen name="Planner" component={ProfileStack} headerShown={true} />  */}
      {/* <Tab.Screen name="Profile" component={ProfileStack} headerShown={true} />  */}
    </Tab.Navigator>

    //  </NavigationContainer>
  );
};


