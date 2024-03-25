import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../screens/home/HomeScreen";
import messaging, { firebase } from "@react-native-firebase/messaging";
import { useState, useEffect } from "react";
import client from "../../api/client";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserPostsScreen from "../../screens/UserPostsScreen";
import PostDetailsScreen from "../../screens/home/PostDetailsScreen"
// import moment from "moment";


const Stack = createStackNavigator();

export function HomeStack() {
  const [appFirstLaunched, setAppFirstLaunched] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [userToken, setUserToken] = useState(null);



  // const checkForFirstTimeLoading = async () => {
  //   const appData = await AsyncStorage.getItem("appFirstLaunched");
  //   if (appData === null) {
  //     setAppFirstLaunched(true);
  //     await AsyncStorage.setItem("appFirstLaunched", "false");
  //     // Perform the initial request here
  //     // ...
  //     return true;
  //   } else {
  //     setAppFirstLaunched(false);
  //     return false;
  //   }
  // };

  // const requestPermissions = async () => {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //   }
  // };

  // const saveTokenToDatabase = async (token) => {
  //   // Assume user is already signed in

  //   try {
  //     const userToken = await AsyncStorage.getItem("userToken");
  //     const value = await AsyncStorage.getItem("userInfo");
  //     if (userToken !== null && value !== null) {
  //       const userInfo = JSON.parse(value);
  //       setUserToken(userToken);
  //       setUserInfo(userInfo);

  //       const config = {
  //         headers: {
  //           Authorization: `Bearer ${userToken}`,
  //           "Content-Type": "application/json",
  //         },
  //       };

  //       const body = JSON.stringify({ token: token, platform: Platform.OS });

  //       await client
  //         .post(`/notification/registerDevice/${userInfo._id}`, body, config)
  //         .then((res) => {
  //           const expirationTimestamp = res.data.data.expiredAt;
  //           AsyncStorage.setItem("expirationTimestamp", expirationTimestamp);
  //         });
  //     }
  //   } catch (error) {}
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const isFirstTimeLoading = await checkForFirstTimeLoading();

  //     if (isFirstTimeLoading) {
  //       if (requestPermissions()) {
  //         messaging()
  //           .getToken()
  //           .then((token) => {
  //             return saveTokenToDatabase(token);
  //           });

  //         // listen when token changes

  //         return messaging().onTokenRefresh((token) => {
  //           updateUsersToken(token);
  //         });
  //       } else {
  //         // Handle when permission is not granted
  //       }

  //       messaging()
  //         .getInitialNotification()
  //         .then(async (remoteMessage) => {
  //           if (remoteMessage) {
  //           }
  //         });

  //       messaging().onNotificationOpenedApp()(async (remoteMessage) => {});

  //       messaging().setBackgroundMessageHandler(async (remoteMessage) => {});

  //       const unsubscribe = messaging().onMessage(async (remoteMessage) => {
  //         Alert.alert(
  //           "A new FCM message arrived!",
  //           JSON.stringify(remoteMessage)
  //         );
  //       });

  //       return unsubscribe;
  //     }
  //   };

  //   fetchData();
  // }, []);

  // const updateUsersToken = async (token) => {
  //   try {
  //     const userToken = await AsyncStorage.getItem("userToken");
  //     const value = await AsyncStorage.getItem("userInfo");
  //     if (userToken !== null && value !== null) {
  //       const userInfo = JSON.parse(value);
  //       setUserToken(userToken);
  //       setUserInfo(userInfo);

  //       const config = {
  //         headers: {
  //           Authorization: `Bearer ${userToken}`,
  //           // "content-type": "multipart/form-data",
  //           "Content-Type": "application/json",
  //         },
  //       };

  //       const body = JSON.stringify({ token: token, platform: Platform.OS });

  //       await client
  //         .put(`/notification/updateEachDevice/${userInfo._id}`, body, config)
  //         .then((res) => {
  //           const expirationTimestamp = res.data.data.expiredAt;

  //           AsyncStorage.setItem("expirationTimestamp", expirationTimestamp);
  //         });
  //     }
  //   } catch (error) {}
  // };

  // const checkExpiration = async () => {
  //   const storedTimestamp = await AsyncStorage.getItem("expirationTimestamp");

  //   const expirationTimestamp = moment.utc(storedTimestamp);

  //   const currentTime = moment.utc();

  //   if (currentTime.isAfter(expirationTimestamp)) {
  //     messaging()
  //       .getToken()
  //       .then((token) => {
  //         updateUsersToken(token); // Refresh the token when it expires
  //       });
  //   }
  // };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     checkExpiration();
  //   }, 24 * 60 * 60 * 1000); // Check every 24hrs

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      <Stack.Screen component={HomeScreen} name="HomeScreen" />
      <Stack.Screen component={UserPostsScreen} name="UserPostsScreen"/>
      <Stack.Screen component={PostDetailsScreen} name="PostDetails"/>

    </Stack.Navigator>
  );
}
