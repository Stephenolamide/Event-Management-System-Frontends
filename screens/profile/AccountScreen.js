import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  View,
  Dimensions,
  SafeAreaView
} from "react-native";

import { Back } from "../../constants/icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from "../../context/ThemeContext";
import { ScrollView } from "react-native";
const { width, height } = Dimensions.get("screen");

const AccountScreen = () => {
    const navigation = useNavigation();
    const { theme } = useContext(ThemeContext);
    const [userInfo, setUserInfo] = useState(null);
  
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("userInfo");
        if (value !== null) {
          setUserInfo(JSON.parse(value));
        }
      } catch (e) {}
    };
    useEffect(() => {
      getData();
    }, []);
    // console.log(userInfo);
    return (
      <SafeAreaView
        style={{
          backgroundColor: theme.profileBackground,
          height: height,
          paddingHorizontal: 15,
          paddingVertical: 36
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
          <View style={{flexDirection: "row", gap: 5, justifyContent: "center"}}>
            <Back size={24} color={theme.black} style={{alignSelf: "center"}} onPress={()=>navigation.goBack()} />
            <Text style={{fontFamily: "PoppinsBold", fontSize: 24, alignSelf: "center", color:theme.black }}>Account</Text>
          </View>
          {/* <Text onPress={()=>navigation.navigate("verify",{email: userInfo?.email})} style={{fontFamily: "PoppinsSemiBold", color: "#3445EA", fontSize: 14}}>Edit Details</Text> */}
        </View>
  
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{height:1000}}>
        <View style={{ backgroundColor: theme.white, marginTop: 30, borderRadius: 5 }}>
          <View style={{ paddingHorizontal: 15 }}>
            <Text
              style={{
                paddingTop: 15,
                color: "#C3C3C3",
                fontFamily: "PoppinsSemiBold",
                fontSize: 10,
              }}
            >
              First Name
            </Text>
            <Text
              style={{
                paddingTop: 8,
                color: theme.black,
                fontFamily: "PoppinsSemiBold",
                fontSize: 14,
              }}
            >
              {userInfo?.firstname.charAt(0).toUpperCase() +
                userInfo?.firstname.slice(1)}
            </Text>
            <View
              style={{
                paddingTop: 16,
                borderBottomColor: theme.offwhite,
                borderBottomWidth: 1,
                width: "100%",
                alignSelf: "center",
              }}
            />
            <Text
              style={{
                paddingTop: 15,
                color: "#C3C3C3",
                fontFamily: "PoppinsSemiBold",
                fontSize: 10,
              }}
            >
              Last Name
            </Text>
            <Text
              style={{
                paddingTop: 8,
                color: theme.black,
                fontFamily: "PoppinsSemiBold",
                fontSize: 14,
              }}
            >
              {userInfo?.lastname.charAt(0).toUpperCase() +
                userInfo?.lastname.slice(1)}
            </Text>
            <View
              style={{
                paddingTop: 16,
                borderBottomColor: theme.offwhite,
                borderBottomWidth: 1,
                width: "100%",
                alignSelf: "center",
              }}
            />
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: "50%" }}>
                <Text
                  style={{
                    paddingTop: 15,
                    color: "#C3C3C3",
                    fontFamily: "PoppinsSemiBold",
                    fontSize: 10,
                  }}
                >
                  Sex
                </Text>
                <Text
                  style={{
                    paddingTop: 8,
                    color: theme.black,
                    fontFamily: "PoppinsSemiBold",
                    fontSize: 14,
                  }}
                >
                  {userInfo?.gender}
                </Text>
              </View>
              {/* <View style={{ width: "50%" }}>
                <Text
                  style={{
                    paddingTop: 15,
                    color: "#C3C3C3",
                    fontFamily: "PoppinsSemiBold",
                    fontSize: 10,
                  }}
                >
                  Level
                </Text>
                <Text
                  style={{
                    paddingTop: 8,
                    color: theme.black,
  
                    fontFamily: "PoppinsSemiBold",
                    fontSize: 14,
                  }}
                >
                  {userInfo?.level.charAt(0).toUpperCase() +
                    userInfo?.level.slice(1)}
                </Text>
              </View> */}
            </View>
            <View
              style={{
                paddingTop: 16,
                borderBottomColor: theme.offwhite,
                borderBottomWidth: 1,
                width: "100%",
                alignSelf: "center",
              }}
            />
            {/* <Text
              style={{
                paddingTop: 15,
                color: "#C3C3C3",
                fontFamily: "PoppinsSemiBold",
                fontSize: 10,
              }}
            >
              Matric No./App I.D
            </Text>
            <Text
              style={{
                paddingTop: 8,
                color: theme.black,
  
                fontFamily: "PoppinsSemiBold",
                paddingBottom: 15,
                fontSize: 14,
              }}
            >
              {userInfo?.matric_no}
            </Text> */}
          </View>
          </View>
  
  
  
  
          {/* <View style={{ backgroundColor: theme.white, marginTop: 30, borderRadius: 5 }}>
          <View style={{ paddingHorizontal: 15 }}>
            <Text
              style={{
                paddingTop: 15,
                color: "#C3C3C3",
                fontFamily: "PoppinsSemiBold",
                fontSize: 10,
              }}
            >
              Course
            </Text>
            <Text
              style={{
                paddingTop: 8,
                color: theme.black,
  
                fontFamily: "PoppinsSemiBold",
                fontSize: 14,
              }}
            >
              {userInfo?.course}
            </Text>
            <View
              style={{
                paddingTop: 16,
                borderBottomColor: theme.offwhite,
                borderBottomWidth: 1,
                width: "100%",
                alignSelf: "center",
              }}
            />
            <Text
              style={{
                paddingTop: 15,
                color: "#C3C3C3",
                fontFamily: "PoppinsSemiBold",
                fontSize: 10,
              }}
            >
              Campus
            </Text>
            <Text
              style={{
                paddingTop: 8,
                color: theme.black,
  
                fontFamily: "PoppinsSemiBold",
                fontSize: 14,
              }}
            >
              {userInfo?.campus}
            </Text>
            <View
              style={{
                paddingTop: 16,
                borderBottomColor: theme.offwhite,
                borderBottomWidth: 1,
                width: "100%",
                alignSelf: "center",
              }}
            />
             <Text
              style={{
                paddingTop: 15,
                color: "#C3C3C3",
                fontFamily: "PoppinsSemiBold",
                fontSize: 10,
              }}
            >
              Group
            </Text>
            <Text
              style={{
                paddingTop: 8,
                color: theme.black,
  
                fontFamily: "PoppinsSemiBold",
                fontSize: 14,
              }}
            >
              {userInfo?.group}
            </Text>
            <View
              style={{
                paddingTop: 16,
                borderBottomColor: theme.offwhite,
                borderBottomWidth: 1,
                width: "100%",
                alignSelf: "center",
              }}
            />
            <Text
              style={{
                paddingTop: 15,
                color: "#C3C3C3",
                fontFamily: "PoppinsSemiBold",
                fontSize: 10,
              }}
            >
             Department Association
            </Text>
            <Text
              style={{
                paddingTop: 8,
                color: theme.black,
  
                fontFamily: "PoppinsSemiBold",
                paddingBottom: 15,
                fontSize: 14,
              }}
            >
              {userInfo?.academic_association}
            </Text>
          </View>
          </View> */}
          </ScrollView>
        </SafeAreaView>
    );
  };
  
  
  export default AccountScreen;