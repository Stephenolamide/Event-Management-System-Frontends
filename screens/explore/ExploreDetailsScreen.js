import * as React from "react";
import {
  StatusBar,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Platform,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { useState, useEffect, useRef, useContext } from "react";
import { Back, Location, Time } from "../../constants/icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { StackActions, useNavigation } from "@react-navigation/native";
import client from "../../api/client";
import ErrorButton from "../../components/ErrorButton";
import { ThemeContext } from "../../context/ThemeContext";

const { width, height } = Dimensions.get("screen");

const imageW = width * 0.95;
const imageH = height / 2.36;

const ExploreDetailsScreen = ({ route }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={{ flex: 1, backgroundColor: theme.white }}>
      <EventAbout route={route} />
    </View>
  );
};

const EventAbout = (props) => {
  const { title, date, venue, time, image, ticketPrice, content, isPaid, isSoldOut } =
    props.route.params;

  const { theme } = useContext(ThemeContext);

  const [userInfo, setUserInfo] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();

  //run the async to get email and also get title being passed as a prop

  const newDate = date;
  const changedDate = moment(newDate, "DD/MM/YYYY"); // parse the date string using the specified format

  const formattedDate = changedDate.format("dddd, DD MMMM"); // format the date as "Friday, 17 February"

  const Pay = async () => {
    try {
      const value = await AsyncStorage.getItem("userInfo");
      const userToken = await AsyncStorage.getItem(`userToken`);
      if (value !== null && userToken !== null) {
        const userInfo = JSON.parse(value);
        setUserInfo(userInfo);
        setUserToken(userToken);

        const token = userToken;
        const email = userInfo.email;

        const Title = title;

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "multipart/form-data",
          },
        };

        const formData = new FormData();
        formData.append("email", email);
        formData.append("title", Title);

        setIsLoading(true);

        await client
          .post(`/pay/payForTicket`, formData, config)
          .then((res) => {
            console.log(res)
            if (res.status === 200 && res.data.message === "You'll be navigated to paystack") {
              navigation.dispatch(
                StackActions.replace("CheckOutScreen", {
                  authorization_url: res.data.authorization_url,
                })
              );
            } else if (res.status === 200 && res.data.message === "Ticket Generated Successfully") {
              navigation.navigate("SucessScreen")
            }
            else if (res.status === 200 && res.data.message === "You've already gotten a ticket"){
              Alert.alert(
                "You already have a ticket for this event✅",
                "Please view ticket on your profile"
              )
            }
          })
          .catch(async (e) => {
            if (
              e.response.status === 401 &&
              e.response.data.success === false &&
              e.response.data.msg === "Session Expired"
            ) {
              try {
                // await getAccessToken();
                await Pay();
              } catch (e) {
                setError(true);
                setErrorMessage(
                  e.message === "Network Error"
                    ? e.message
                    : "Oops! Something went wrong. Please try again."
                );
              }
            } else {
              setError(true);
              setErrorMessage(
                e.message
                  ? e.message
                  : "Oops! Something went wrong. Please try again later."
              );
            }
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    } catch (e) {
      setError(true);
      setErrorMessage(
        e.message ? e.message : "Oops! Something went wrong. Please try again ."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // const num = ticketPrice;

  // const formatter = new Intl.NumberFormat('en-NG', {
  //   style: 'currency',
  //   currency: 'NGN',
  // });

  // const formattedNumber = formatter.format(num).replace(/\.00$/, '');

  function numberWithCommas(x) {
    const parts = x?.toString().split(".");
    parts[0] = parts[0]?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  const formattedTicketPrice = numberWithCommas(ticketPrice);

  const scrollX = useRef(new Animated.Value(0)).current;

  const Indicator = ({ scrollx }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
          bottom: imageH * 0.96,
          position: "absolute",
        }}
      >
        {image.length > 1 &&
          image.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

            const scale = scrollx.interpolate({
              inputRange,
              outputRange: [0.6, 0.9, 0.6],
              extrapolate: "clamp",
            });
            return (
              <Animated.View
                key={`indicator-${i}`}
                style={{
                  height: 10,
                  width: 10,
                  borderRadius: 5,
                  backgroundColor: theme.white,
                  margin: 5,
                  transform: [
                    {
                      scale,
                    },
                  ],
                }}
              />
            );
          })}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar hidden />
        <View style={StyleSheet.absoluteFillObject}>
          {image.map((image, index) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0, 1, 0],
            });
            return (
              <Animated.Image
                source={{ uri: image }}
                key={`image-${index}`}
                style={[StyleSheet.absoluteFillObject, { opacity }]}
                blurRadius={50}
              />
            );
          })}
        </View>

        <>
          <Animated.FlatList
            showsHorizontalScrollIndicator={false}
            data={image}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            keyExtractor={(_, index) => index}
            horizontal
            pagingEnabled
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    paddingTop: 20,
                    width,
                    alignItems: "center",
                    shadowColor: theme.black,
                    shadowOpacity: 0.5,
                    shadowOffset: { width: 0, height: 0 },
                    shadowRadius: 20,
                  }}
                >
                  <Image
                    source={{ uri: item }}
                    style={{
                      width: imageW,
                      height: imageH,
                      // resizeMode: Platform.OS === "android" ? "cover" : null,
                      borderRadius: 10,
                    }}
                  />
                </View>
              );
            }}
          />
          <View
            style={{
              position: "absolute",
              top: 40,
              left: 25,
              backgroundColor: theme.black,
              width: 50,
              height: 50,
              borderRadius: 25,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Back
              size={30}
              color={theme.white}
              onPress={() => {
                navigation.goBack();
              }}
            />
          </View>
        </>

        <View>
          <Indicator scrollx={scrollX} />
          <View
            style={{
              height: height * 0.49,
              width: width,
              borderRadius: 30,
              backgroundColor: theme.white,
              top: -imageH * 0.87,
              alignSelf: "center",
              position: "absolute",
            }}
          >
            <View style={{ marginLeft: 30, top: 10 }}>
              <Text
                style={{
                  color: theme.lightblue,
                  fontFamily: "JakartaBold",
                  fontSize: 10,
                  fontWeight: "300",
                  textTransform: "uppercase",
                  top: 15,
                }}
              >
                {formattedDate}
              </Text>
              <Text
                style={{
                  fontWeight: "500",
                  fontSize: 23,
                  color: theme.black,
                  fontFamily: "JakartaBold",
                  top: 13,
                }}
              >
                {title}
              </Text>
              <Text
                style={{
                  fontWeight: "600",
                  color: theme.black,
                  fontFamily: "JakartaBold",
                  fontSize: 14,
                  textTransform: "uppercase",
                  top: 13,
                }}
              >
                <Time size={15} />
                 {""}
                {time}   {"|"}
                 {Location}
                {venue}
              </Text>
              {/* if the text should prob be in a scroll view */}

              <ScrollView
                showsVerticalScrollIndicator
                vertical
                bounces={false}
                // contentContainerStyle={{height:height*0.7, paddingTop:3}}
              >
                <View>
                  <Text
                    style={{
                      marginTop: 30,
                      width: width * 0.8,
                      fontSize: 11,
                      fontFamily: "Jakarta",
                      fontWeight: "300",
                      color: theme.darkgray,
                      lineHeight: 18,
                      height: 110,
                      alignItems: "center",
                      right: -6,
                    }}
                  >
                    {content}
                  </Text>
                </View>
              </ScrollView>

              <View
                style={{
                  position: "absolute",
                  top: imageH / 1.5,
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    fontFamily: "JakartaBold",
                    fontWeight: "500",
                    fontSize: 20,
                    lineHeight: 20,
                    paddingTop: width / 20,
                    width: width / 3.8,
                    height: height / 20,
                    backgroundColor: "transparent",
                    top: width / 85,
                    position: "absolute",
                    color:theme.black
                  }}
                >
                  {ticketPrice === 0 ? "Free" : `₦${formattedTicketPrice}`}
                </Text>

                {isLoading ? (
                  <View style={{ left: width / 1.6 }}>
                    <ActivityIndicator size="large" color={theme.primary} />
                  </View>
                ) : (
                  <View
                    style={{
                      width: 100,
                      height: 37,
                      borderRadius: 10,
                      backgroundColor: isSoldOut ? null: theme.primary,
                      alignSelf: "center",
                      left: width / 1.9,
                      position: "absolute",
                      top: width / 100,
                    }}
                  >
                    <Pressable 
                    onPress={Pay} 
                    activeOpacity={0.8}
                    disabled={isSoldOut}
                    >
                      <Text
                        style={{
                          // color: isSoldOut ? theme.black : theme.white,
                          fontSize: isSoldOut ?16 :14,
                          fontWeight: "600",
                          lineHeight: 21,
                          fontFamily: "JakartaSemiBold",
                          alignSelf: "center",
                          position: "absolute",
                          padding: 8,
                          color: isSoldOut?"red":theme.whites,
                          top: isSoldOut ? 7 :null,
                          left: isSoldOut ? 30 :null
                        }}
                      >
                        {isPaid === true
                          ? "Buy Now"
                          : isSoldOut === true
                          ? "Sold Out"
                          : "Get"}
                      </Text>
                    </Pressable>
                  </View>
                )}
              </View>
            </View>

            {error && (
              <ErrorButton
                onPress={() => {
                  setError(false);
                }}
                message={errorMessage}
                style={{ paddingBottom: height / 120, bottom: 35 }}
                color={theme.red}
                borderRadius={10}
                bgcolor={theme.primary}
              />
            )}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default ExploreDetailsScreen;

