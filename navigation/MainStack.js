import { createStackNavigator } from "@react-navigation/stack";
// import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useContext} from "react";
import { ThemeContext } from "../context/ThemeContext";
import { createDrawerNavigator } from "@react-navigation/drawer";


import { HomeStack } from "./home/HomeStack";
import ProfileStack from "./profile/ProfileStack"

import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import ExploreStack from "./explore/ExploreStack";
import PlannerStack from "./planner/PlannerStack";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
import EventScheduleStack from "./EventScheduleStack";
import CustomDrawer from "../components/CustomDrawer";
import { DashboardScreen } from "../screens/DashboardScreen";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// export function MainStack() {
// 	return (
// 		<Stack.Navigator
// 			// initialRouteName="verify"
// 			screenOptions={{ headerShown: false }}
// 		>
// 			 <Stack.Screen component={TabNavigator} name="Tabs" />
// 		</Stack.Navigator>
// 	);
// }

const Drawer = createDrawerNavigator();


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
      <Tab.Screen name="Explore" component={ExploreStack} headerShown={true} /> 
      <Tab.Screen name="Planner" component={PlannerStack} headerShown={true} />  
      <Tab.Screen name="Profile" component={ProfileStack} headerShown={true} /> 
    </Tab.Navigator>

    //  </NavigationContainer>
  );
};







export function MainStack() {
  const { theme } = useContext(ThemeContext);
  return (
    <Drawer.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        drawerIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === "Feed") {
            iconName = focused ? "newspaper" : "newspaper";
          }
          else if (route.name === "EventSchedule") {
            iconName = focused ? "calendar" : "calendar";
          }
          else if (route.name === "Dashboard") {
            iconName = focused ? "calendar" : "calendar";
          }

          return (
            <FontAwesome6Icon
              name={iconName}
              size={25}
              color={focused ? color : theme.iconColor}
            />
          );
        },
        drawerActiveBackgroundColor: theme.white,
        // drawerInactiveBackgroundColor: "#f9f9f9",
        drawerActiveTintColor: "#3445EA",
        drawerInactiveTintColor: theme.drawerInactiveTintColor,
        drawerLabelStyle: {
          fontFamily: "Jakarta",
          fontSize: 15,
          fontWeight: "400",
          lineHeight: 21,
          marginVertical: 10,
          marginLeft: -18,
        },
        drawerStyle: { width: 250 },
      })}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="Feed" component={TabNavigator} />
      <Drawer.Screen name="EventSchedule" component={EventScheduleStack} />
    <Drawer.Screen name="Dashboard" component={DashboardScreen} />

    </Drawer.Navigator>
  );
}

