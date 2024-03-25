import {
    Text,
    FlatList,
    StyleSheet,
    View,
    Image,
    Dimensions,
    ActivityIndicator,
  } from "react-native";
  import React, { useCallback, useEffect, useState } from "react";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import client from "../api/client";
  import { FormSubmitBtn } from "../components/FormSubmitBtn";
  import { useFocusEffect } from "@react-navigation/native";
  
  const { width } = Dimensions.get("screen");
  
  export const DashboardScreen = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [userToken, setUserToken] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
  
    // const getData = async () => {
    //   try {
    //     setIsLoading(true);
  
    //     setError(null);
  
    //     const userToken = await AsyncStorage.getItem("userToken");
    //     const value = await AsyncStorage.getItem("userInfo");
  
    //     if (userToken !== null && value !== null) {
    //       const userInfo = JSON.parse(value);
    //       setUserToken(userToken);
    //       setUserInfo(userInfo);
  
    //       const formData = new FormData();
    //       formData.append("userId", userInfo._id);
  
    //       const config = {
    //         headers: {
    //           Authorization: `Bearer ${userToken}`,
    //           // "Content-Type": "multipart/form-data",
    //         },
    //       };
  
    //       const res = await client.get("/dashboard/dashboardData", config);
    //       //(res.data.data);
    //       if (res.data != null) {
    //         setData(res.data.data);
    //       } else {
    //         //(undefined);
    //       }
    //       // Handle the response data as needed
    //     }
    //   } catch (e) {
    //     //(e)
    //     setError(e.message || "An error occurred");
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };



    const getData = async()=>{
        try {
            setData(data)
        } catch (error) {
            console.log(error)
        }
    }
  
    useFocusEffect(
      useCallback(() => {
      getData();
    }, []));
  
    const renderItem = ({ item }) => (
      <View style={styles.itemContainer}>
        <View style={styles.item}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Image
              source={(() => {
                if (item.title === "Total Revenue") {
                  return require("../assets/3.png");
                } else if (item.title === "BUSA's Revenue") {
                  return require("../assets/5.png");
                } else if (item.title === "Total Attendees") {
                  return require("../assets/6.png");
                } else {
                  return require("../assets/4.png");
                }
              })()}
              style={{ width: 28.9, height: 25 }}
              resizeMode="contain"
            />
            {/* <View
              style={{
                width: 55,
                height: 20,
                backgroundColor: (() => {
                  if (item.increament === "down") {
                    return "rgba(252, 44, 45, 0.18)";
                  } else if (item.increament === "up") {
                    return "rgba(35, 225, 76, 0.19)";
                  } else {
                    return "#F4F6F6";
                  }
                })(),
                borderRadius: 20,
                // alignItems: "center"
                flexDirection: "row",
                // justifyContent: "space-between"
              }}
            >
              <Ionicons
                name={(() => {
                  if (item.increament === "down") {
                    return "arrow-down-outline";
                  } else if (item.increament === "down") {
                    return "arrow-up-outline";
                  } else {
                    return "remove";
                  }
                })()}
                size={15}
                color={(() => {
                  if (item.increament === "down") {
                    return "#FC2C2D";
                  } else if (item.increament === "up") {
                    return "#23E14C";
                  } else {
                    return "#000000";
                  }
                })()}
                light
                style={{ marginTop: 1, marginLeft: 1 }}
              />
              <Text
                style={{
                  justifyContent: "center",
                  alignSelf: "center",
                  fontSize: 12,
                  // marginLeft: 4,
                }}
              >
                10.0%
              </Text>
            </View> */}
          </View>
          <View>
            <Text style={{ fontSize: 15, color: "#717171", marginTop: 10 }}>
              {item.title}
            </Text>
            <Text
              style={{
                fontSize: 25,
                fontWeight: "900",
                color: "#004FC7",
                marginTop: 5,
              }}
            >
              {item.number}
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: "#071148",
                marginTop: 5,
                letterSpacing: 0.1,
              }}
            >
              {item.date}
            </Text>
          </View>
        </View>
      </View>
    );
    return (
      <View style={{ paddingTop: 30, padding: 20 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingBottom: 30,
          }}
        >
          <Image
            source={require("../assets/logo.png")}
            style={{ height: 40, paddingRight: 100, width: 80 }}
            resizeMode="contain"
          />
  
          <View
            style={{
              alignSelf: "flex-end",
              color: "black",
              borderWidth: 1,
              borderColor: "#D9D9D9",
              borderRadius: 40,
              width: 120,
              height: 40,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#4484E4",
                borderRadius: 40,
                height: 40,
                width: 40,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../assets/2.png")}
                style={{
                  backgroundColor: "#4484E4",
                  borderRadius: 30,
                  width: 30,
                  height: 30,
                }}
              />
            </View>
            {userInfo ? (
              <>
                <Text style={{ marginLeft: 5, fontSize: 20 }}>
                  {userInfo.lastname}
                </Text>
              </>
            ) : (
              <>
                <Text style={{ marginLeft: 5, fontSize: 20 }}>Admin</Text>
              </>
            )}
          </View>
        </View>
  
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
        />
  
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          // <Button title="Refresh" onPress={() => getData()} />
          <FormSubmitBtn title={"Refresh"} onPress={() => getData()} />
        )}
        {/* <Chart /> */}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 10,
      paddingVertical: 20,
    },
    itemContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 10,
      marginVertical: 15,
      borderRadius: 10,
      elevation: 5,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      backgroundColor: "#fff",
    },
    item: {
      height: width / 3.2,
      // width: 162,
      width: width / 3.2,
      paddingTop: 20,
    },
    header: {
      width: 139,
      fontSize: 25,
      fontWeight: "700",
      paddingBottom: 5,
    },
  });
  
  const data = [
    {
      id: "1",
      title: "Total Revenue",
      number: "₦100,000",
      date: "Wed, Jul 20",
      increament: "down",
    },
    {
      id: "2",
      title: "BUSA's Revenue",
      number: "₦93,000",
      date: "Wed, Jul 20",
      increament: "up",
    },
    {
      id: "3",
      title: "Total Attendees",
      number: 2137,
      date: "Wed, Jul 20",
      increament: "stable",
    },
    {
      id: "4",
      title: "Downloads",
      number: 4501,
      date: "Wed, Jul 20",
      increament: "down",
    },
  ];
  