import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TicketCard from "../../components/tickets/TicketCard";

import { height, width } from "../../utils/dimensionUtils";
import { Back } from "../../constants/icons";
import ErrorButton from "../../components/ErrorButton";
import { getTheme } from "../../context/ThemeContext";
import AppHeader from "../../components/AppHeader";

const ticketHeight = height * 0.5;
const ticketWidth = width * 0.83;

const TIcketScreen = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);


  const [tickets, setTickets] = useState([
    "sdsdsjdsjshds.jpg",
    "sdjnsdsjnsnjsdjnsdd.png",
    "sdjsdsjhdsids[ddeui.png",
  ]);

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / ticketWidth);
    setCurrentSlideIndex(index);
  };

  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
	const {theme} = getTheme()


  // const getTicketData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem("userInfo");
  //     const userToken = await AsyncStorage.getItem("userToken");

  //     if (value !== null && userToken !== null) {
  //       setUserInfo(JSON.parse(value));
  //       setUserToken(userToken);

  //       const userInfo = JSON.parse(value);

  //       // run the getTicketDetailsFunction
  //       setIsLoading(true);
  //       const email = userInfo?.email;

  //       const token = userToken;
  //       const config = {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "content-type": "multipart/form-data",
  //         },
  //       };

  //       const formData = new FormData();

  //       formData.append("email", email);

  //       const res = await client.post(
  //         `/tickets/getTicketByEmail`,
  //         formData,
  //         config
  //       );

  //       // console.log(res)

  //       if (res.status === 200) {
  //         setTickets([...tickets, ...res.data.data]);
  //       }

  //       if (res.data.data.length === 0) {
  //         setTickets([]);
  //         setError(true);
  //         setErrorMessage("Oops! Pls kindly purchase a ticket😁.");
  //       }
  //     }
  //   } catch (e) {
  //     if (
  //       e.response.status === 401 &&
  //       e.response.data.success === false &&
  //       e.response.data.msg === "Session Expired"
  //     ) {
  //       try {
  //         await getAccessToken();
  //         await getTicketData();
  //       } catch (e) {
  //         (e);
  //         setError(true);
  //         setErrorMessage(
  //           e.message === "Network Error"
  //             ? e.message
  //             : "Oops! Something went wrong. Please try again."
  //         );
  //       }
  //     } else {
  //       setError(true);
  //       setErrorMessage(
  //         e.message
  //           ? e.message
  //           : "Oops! Something went wrong. Please try again later."
  //       );
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };


  const getTicketData = async ()=>{

  }
  useEffect(() => {
    getTicketData();
  }, []);

  const renderLoader = () => {
    return isLoading ? (
      <View
        style={{
          alignContent: "center",
          top: width / 2,
          marginHorizontal: 140,
        }}
      >
        <ActivityIndicator size="large" color="blue" />
      </View>
    ) : null;
  };

  const TicketIndicator = ({ tickets }) => {
    return (
      <View>
        {tickets.length > 1 ? (
          <View style={styles.pagination}>
            {tickets.map((_, index) => {
              return (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    currentSlideIndex == index && {
                      backgroundColor: theme.black,
                      width: 7,
                      height: 7,
                      borderRadius: 10,
                    },
                  ]}
                />
              );
            })}
          </View>
        ) : null}
      </View>
    );
  };

  return (
      <View style={styles.container}>


        <View style={{top:-60}}>
      <AppHeader
      name={"arrow-left"}
      header={'My Tickets'}
      action={()=>navigation.goBack()}
      />

        </View>


        <View
          style={{
            backgroundColor: theme.white,
            height: height * 0.5,
            width: width * 0.83,
            alignItems: "center",
            borderRadius: 20,
          }}
        >
          {error && (
            <ErrorButton
              onPress={() => {
                setError(false);
                getTicketData();
              }}
              message={errorMessage}
              style={{ paddingTop: height * 0.52 }}
              color={theme.red}
              borderRadius={10}
            />
          )}

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={35}
            bounces={false}
            pagingEnabled
            scrollEnabled
            data={tickets}
            onScroll={handleScroll}
            renderItem={({ item, id }) => (
              <TicketCard ticket={item} key={id} navigation={navigation} />
            )}
            ListFooterComponent={renderLoader}
          />
          {/* <View style={{top:150}}>
			  <Text style={{fontSize:13, fontWeight:"600", color:"red", fontFamily:"Jakarta", alignSelf:"center"}}>
				Pls You do not have any ticket purchased, kindly go ahead and purchase a ticket
			  </Text>
			  <Warning style={{alignSelf:"center", marginTop:30}} width={100} height={100} />
			</View>  */}

          <TicketIndicator tickets={tickets} />
        </View>
      </View>
    
  );
};

export default TIcketScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 65,
    left: 15,
  },
  dot: {
    borderRadius: 10,
    height: 7,
    width: 7,
    backgroundColor: "gray",
    marginBottom: 10,
    marginHorizontal: 3,
    justifyContent: "center",
  },
  pagination: {
    bottom: 10,
    left: -ticketWidth / 50,
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    width: 40,
  },
});
