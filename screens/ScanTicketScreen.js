
// most extensive logics have to be moved to the backend

import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Dimensions,
  FlatList,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import LottieView from "lottie-react-native";
import client from "../api/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
// import { getAccessToken } from "../utils/GetAccessToken";
import { ThemeContext } from "../context/ThemeContext";
const { width, height } = Dimensions.get("window");

const ScanTicketScreen = ({ route }) => {
  return <ScanLogic route={route} />;
};

const ScanLogic = (props) => {
  // alert the user time has elapsed
  // write functionality that after time has elapsed, take him back to the settings page


	const {theme} = useContext(ThemeContext)

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [eventTitle, setEventTitle] = useState(null);
  const [eventTime, setEventTime] = useState(null);
  const [scannedTickets, setScannedTickets] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("userInfo");
      const userToken = await AsyncStorage.getItem("userToken");
      const title = await AsyncStorage.getItem("eventTitle");
      const eventTime = await AsyncStorage.getItem("eventTime");

      if (value !== null && userToken !== null && title !== null) {
        setUserInfo(JSON.parse(value));
        setUserToken(userToken);
        setEventTitle(title);

        if (eventTime !== null) {
          const endTime = moment(eventTime, "h:mmA");
          const currentTime = moment();

          if (currentTime.isAfter(endTime)) {
            // The time for the event has ended, navigate to profile screen
            setEventTime(null);
            setEventTitle(null);

            try {
              await AsyncStorage.removeItem("eventTime");
              await AsyncStorage.removeItem("eventTitle");
            } catch (e) {
              alert(`${e}`);
            }
            navigation.navigate("ProfileScreen");
            alert(
              "sorry Admin, your time as a scanner for this event is elapsed"
            );
            return;
          }

          const timeLeft = moment.duration(endTime.diff(currentTime));
          setTimeout(getData, timeLeft.asMilliseconds());
        }
      }
    } catch (e) {
      alert(`${e.message}`);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  let scanning = false;

  const handleBarCodeScanned = async ({ type, data }) => {
    if (scanning) {
      // Function is already running, don't execute again
      return;
    }

    scanning = true; // Set flag to indicate function is running
    setScanned(true);
    const token = userToken;
    const title = eventTitle;

    const config = {
      headers: { Authorization: `Bearer ${token}` },
      "content-type": "multipart/form-data",
    };

    const formData = new FormData();
    formData.append("token", data);
    formData.append("eventTitle", title);

    try {
      const res = await client.post(`/tickets/scan`, formData, config);

      if (res.status === 200) {
        alert(`QR code has been successfully scanned`);
      } else {
        alert(`Error scanning QR code. Please try again.`);
      }
    } catch (e) {
      if (
        e.response.data.success === false &&
        e.response.status === 401 &&
        e.response.data.msg === "Session Expired"
      ) {
        try {
          await getAccessToken();
          await handleBarCodeScanned();
        } catch (e) {
          alert(
            e.message === "Network Error"
              ? e.message
              : "Oops! Something went wrong. Please try again."
          );
        }
      }

      if (e.response && e.response.status === 400) {
        alert(e.response.data.message);
      } else {
        alert("Error scanning QR code. Please try again.");
      }
    } finally {
      scanning = false; // Set flag to indicate function is no longer running
      setScanned(false);
    }

    // add a timeout of 3 seconds before every scan
    // setTimeout(() => {
    //   handleBarCodeScanned()
    // }, 3000);
  };

  //   if (hasPermission === null) {
  //     return <Text>Requesting for camera permission</Text>;
  //   }
  //   if (hasPermission === false) {
  //     return <Text>No access to camera</Text>;
  //   }



  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: width,
      alignSelf: "center",
      justifyContent: "center",
      backgroundColor: theme.black,
    },
  });



  return (
    <>
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
          // barCodeTypes={[BarCodeScanner?.Constants?.BarCodeType?.qr]}
        />
        {/* {scanned &&
	      <View style={{backgroundColor:"white", width:100, height:30, position:"absolute", alignItems:"center", bottom:height/10, left:width/3}}>
	    <Text style={{fontFamily:"JakartaSemiBold", fontSize:18, color:"blue", position:"absolute", bottom:-2, alignSelf:"center",}} onPress={()=>setScanned(false)}>Re-scan</Text>
	    </View>
	    } */}
        {showAnimation && (
          <LottieView
            source={require("../assets/animations/qr-scan.json")}
            speed={0.5}
            autoPlay
            loop={false}
            style={{
              width: 100,
              height: 100,
              marginTop: 210,
              alignSelf: "center",
            }}
            onAnimationFinish={() => setShowAnimation(false)}
          />
        )}
      </View>
      <View
        style={{
          height: 347,
          width: 300,
          backgroundColor: theme.transparent,
          position: "absolute",
          alignSelf: "center",
          bottom: height / 4,
          borderColor: theme.white,
          borderRadius: 20,
          borderWidth: 3,
          alignContent: "center",
        }}
      />
    </>
  );
};
export default ScanTicketScreen;


