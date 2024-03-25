import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Platform,
  } from "react-native";
  import React, { useContext, useEffect, useState, useCallback, useRef } from "react";

  
  import {useFocusEffect, useNavigation } from "@react-navigation/native";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import AnimatedLottieView from "lottie-react-native";
import { ThemeContext } from "../../context/ThemeContext";
import client from "../../api/client";
import { List, data } from "../../constants/Data";
import { timeSlot } from "../../data/timeSlot";
import { Back } from "../../constants/icons";
  const { width, height } = Dimensions.get("screen");
  
  const EventScheduleScreen = () => {
    const { theme } = useContext(ThemeContext);
    const [timetableData, setTimetableData] = useState([]);
    const [selectedDay, setSelectedDay] = useState("Monday"); // 1. State for selected day
    const [filteredClasses, setFilteredClasses] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false); // Add a flag to track data loading
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [userToken, setUserToken] = useState(null);
    
  
    useFocusEffect(
      useCallback(() => {
        setSelectedDay("Monday")
      getAllEvent();
    }, []));
  
    const getAllEvent = async () => {
      setIsLoading(true);
  
    
      try {
        const userToken = await AsyncStorage.getItem("userToken");
        const value = await AsyncStorage.getItem("userInfo");
  
        if (userToken !== null && value !== null) {
          const userInfo = JSON.parse(value);
          setUserToken(userToken);
          setUserInfo(userInfo);
  
          const token = userToken;
  
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
              "content-type": "application/json",
            },
          };
  
          const res = await client.get(
            `/timetable/getTimetable/${userInfo._id}`,
            config
          );

  
        //   const timetable = res.data.data.weekTimeTable;
          setTimetableData(data.data.weekTimeTable);


          console.log(timetableData)
        }
      } catch (e) {
    
        if (
          e.response.status === 401 &&
          e.response.data.success === false &&
          e.response.data.msg === "Session Expired"
        ) {
          try {
            await getAccessToken();
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
      } finally {
        setIsLoading(false);
      }
    };
  
    const filterClassesByDay = (day) => {
      const newdata = timetableData.filter((dayData) => dayData.day === day);
      return newdata;
    };
  
    useEffect(() => {
      // Function to filter classes for the initial selected day
      const filterInitialClasses = async() => {
        const mondayClasses = filterClassesByDay("Monday");
        setFilteredClasses(mondayClasses);
      };
  
      // Ensure the timetableData is available before filtering initial classes
      if (isLoading) {
        filterInitialClasses();
      }
    }, [selectedDay, timetableData]);
  
    const Categories = ({ item }) => {
      const handleDayFilter = async(day) => {
        setSelectedDay(day); // 2. Update selected day on click
        const filteredData = filterClassesByDay(day);
        setFilteredClasses(filteredData);
      };
  
      return (
        <>
          <View
            style={{
              backgroundColor: "#E8F2FF",
              width: width / 5,
              height: 45,
              marginBottom: 10,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleDayFilter(item.name)}
            >
              <View style={{ alignSelf: "center" }}>
                <View style={{}}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      paddingTop: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "PoppinsLight",
                        fontSize: 14,
                        lineHeight: 21,
                        // color: theme.black,
                        color: selectedDay === item.name ? "blue" : "black",
                        top: 2,
                      }}
                    >
                      {item.short}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </>
      );
    };
    const alternatingColors = ["#EFF6FF", "#FFEFEF", "#FFFBEF"];
    const altColors = ["#0E23F0", "#F55265", "#F5BD17"];
  
    const navigation = useNavigation();
  
  
    const styles = StyleSheet.create({
      text:{color:theme.black, fontFamily:"PoppinsLight", fontSize:16,}
  });
  
  
  
    return (
      <View>
        <View
          style={{
            justifyContent: "space-between",
            alignSelf: "center",
            flexDirection: "row",
            paddingTop: Platform.OS === "android" ?height*0.05: 90,
            paddingBottom: 20,
          }}
        >
          <Back
            size={28}
            color={theme.blendgray}
            style={{ marginTop: 3, right: 75 }}
            // onPress={() => navigation.goBack()}
            onPress={()=>navigation.openDrawer()}
          />
          <Text
            style={{
              color: theme.todoText,
              fontSize: 24,
              fontFamily: "PoppinsSemiBold",
            }}
          >
            Events
          </Text>
        </View>
  
        {/* Render buttons to filter classes */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {List.map((item) => {
            return <Categories item={item} key={item.name} />;
          })}
        </ScrollView>
             
             <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{height:height*1.8}}>
  
        {isLoading ? (
          <View style={{ paddingTop: 60 }}>
            <AnimatedLottieView
              source={require("../../assets/animations/loading.json")}
              autoPlay
              loop
              speed={0.5}
              style={{
                width: 100,
                height: 100,
                alignSelf: "center",
              }}
            />
          </View>
        ) : timetableData.every((day) => day.classes.length === 0) &&
          !isLoading ? (
          <View style={{alignSelf:"center"}}>
             <AnimatedLottieView
                      source={require("../../assets/animations/empty.json")}
                      style={{
                        width: 300,
                        height: 300,
                        alignSelf: "center",
                      }}
                      loop
                      speed={0.7}
                      autoPlay
                    />
                    <View style={{alignItems:"center"}}>
            <Text style={styles.text}>No events</Text>
            {userInfo?.role === 4 && 
            <TouchableOpacity
            activeOpacity={0.7}
            onPress={()=>{navigation.navigate("AddEventSchedulerScreen")}}
            >
              <Text style={[styles.text,{fontSize:13}]}>click to add Event</Text>
            </TouchableOpacity>
            }
                    </View>
          </View>
        ) : (
          !isLoading &&
          filteredClasses.map((dayData, dayIndex) => {
            //(dayData)
            return(
            <View key={dayIndex}>
              {/* Display time slots vertically */}
              {dayData.classes.length === 0 && 
              <View style={{paddingTop:40, position:"absolute", alignSelf:"center",}}>
              <AnimatedLottieView
              source={require("../../assets/animations/exams.json")}
              autoPlay
              loop
              speed={0.5}
              style={{
              width: 300,
              height: 300,
              alignSelf: "center",
              }}
              />
              <Text
                style={{
                  fontFamily: "PoppinsLight",
                  fontSize: 15,
                  paddingTop: 3,
                  color: theme.black,
                  textAlign:"center"
                }}
              >
                  No Events
              </Text>
              </View>
              }
  
              {timeSlot.map((time, id) => (
                <View style={{ flexDirection: "row" }} key={time}>
                  <View
                    style={{
                      height: 90,
                      borderBottomWidth: 1,
                      width: width / 7,
                      alignItems: "flex-end",
                      borderBottomColor: "#D6E1F0",
                    }}
                   key={id}
                  >
                    <Text
                      style={{
                        marginTop: 5,
                        color: theme.todoText,
                        fontSize: 14,
                        fontFamily: "PoppinsLight",
                        fontWeight: "400",
                        wordWrap: "break-word",
                      }}
                    >
                      {time}
                    </Text>
                  </View>
                {/* here if the length is 0, just show no class today so that user won't be confused */}
                  {
                  dayData.classes.map((eventData, classIndex, id) => {
                    const diff =
                      parseInt(eventData.endTime.substr(0, 2)) -
                      parseInt(eventData.time.substr(0, 2));
                    return (
                      <View key={classIndex}>
                        {eventData.time === time ? (
                          <View
                            // key={classIndex}
                            style={{
                              position: "absolute",
                              height: diff >= 2 ? diff * 85 : diff * 75,
                              borderLeftWidth: 5,
                              borderLeftColor:
                                altColors[
                                  (dayIndex * dayData.classes.length +
                                    classIndex) %
                                    alternatingColors.length
                                ],
                              // paddingBottom: 5,
                              borderRadius: 7,
                              backgroundColor:
                                alternatingColors[
                                  (dayIndex * dayData.classes.length +
                                    classIndex) %
                                    alternatingColors.length
                                ],
                              width: width - 80,
                              alignSelf: "flex-end",
                              marginBottom: 5,
                              marginTop: 5,
                              marginLeft: 5,
                              left: width / 35,
                              top: 1,
                            }}
                          >
                            {/* Class information */}
                            <Text
                              style={{
                                marginLeft: 10,
                                color: "#070E50",
                                fontSize: 15,
                                fontFamily: "PoppinsLight",
                                fontWeight: "600",
                                wordWrap: "break-word",
                              }}
                              numberOfLines={1}
                            >
                              {eventData.courseTitle}
                            </Text>
                            {/* Other class information */}
                            <Text
                              style={{
                                marginLeft: 10,
                                color: "#070E50",
                                fontSize: 10,
                                fontFamily: "PoppinsLight",
                                fontWeight: "400",
                                wordWrap: "break-word",
                              }}
                            >
                              {eventData.eventBudget}
                            </Text>
                            <Text
                              style={{
                                marginLeft: 10,
                                color: "#070E50",
                                fontSize: 10,
                                fontFamily: "PoppinsLight",
                                fontWeight: "400",
                                wordWrap: "break-word",
                              }}
                            >
                              {eventData.time} - {eventData.endTime}
                            </Text>
                            <Text
                              style={{
                                marginLeft: 10,
                                color: "#070E50",
                                fontSize: 10,
                                fontFamily: "PoppinsLight",
                                fontWeight: "400",
                                wordWrap: "break-word",
                              }}
                            >
                              {eventData.venue}
                            </Text>
                          </View>
                        )
                        :null
                      }
                      </View>
                    );
                  })}
                </View>
              ))}
  
              {/* Display class data */}
            </View>
            )
  })
        )}
             </ScrollView >
      </View>
    );
  };
  
  export default EventScheduleScreen;
  
  
  