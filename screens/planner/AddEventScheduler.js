import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
  ActivityIndicator,
  StyleSheet, 
  Platform,
} from "react-native";
import { CommonActions, useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AnimatedLottieView from "lottie-react-native";
import { FormSubmitBtn } from "../../components/FormSubmitBtn";
import { FormInput } from "../../components/FormInput";
import client from "../../api/client";
import { ThemeContext } from "../../context/ThemeContext";
import { Icon } from "../../constants/icons";

const {width, height} = Dimensions.get("screen")

const AddEventSchedulerScreen = () => {
  const [expandedDay, setExpandedDays] = useState({});
  const [editedEvents, setEditedEvents] = useState({});
  const { theme } = useContext(ThemeContext);
  const [userInfo, setUserInfo] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [newEvents, setNewEvents] = useState([]);
  const [daysEvents, setDaysEvents] = useState({}); // Use an object to hold events for each day
  const [loading, setLoading] = useState(false)
  const [newclassDate, setNewEventsDate] = useState(new Date())
  const [newEventsEndDate, setNewEventsEndDate] = useState(new Date())
  const navigation = useNavigation();
const [timetableAdded, setTimetableAdded] = useState("")

 const dummyEvents = [
   {"events": [], "day": "Monday"}, {"events": [], "day": "Tuesday"}, {"events": [], "day": "Wednesday"}, {"events": [], "day": "Thursday"}, {"events": [], "day": "Friday"}, {"events": [], "day": "Saturday"}, {"events": [], "day": "Sunday"}
  ]
  const [events, setEvents] = useState(dummyEvents);


  const toggleDayExpansion = (day) => {
    setExpandedDays((prevExpandedDays) => ({
      ...prevExpandedDays,
      [day]: !prevExpandedDays[day], // Toggle the current day's expansion state
    }));
  };

  const AddTimeTable = async () => {
    Alert.alert(
      "Confirm Submission",
      "Are you sure you want to submit this schedule?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes",
  //         onPress: async() => {
  //   try {
  //      setLoading(true)
  //     const userToken = await AsyncStorage.getItem("userToken");
  // const value = await AsyncStorage.getItem("userInfo");

  // if (userToken !== null && value !== null) {
  //   const userInfo = JSON.parse(value);
  //   setUserToken(userToken);
  //   setUserInfo(userInfo);

  //   const token = userToken;
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "content-type":"application/json"
  //     },
  //   };


  //     const updatedWeekTimeTable = events.map((dayData) => ({
  //       ...dayData,
  //       events: [
  //         ...dayData.events,
  //         ...(dayData.day === newEvents.day ? [newEvents] : []),
  //       ].map((cls) => ({
  //         ...cls,
  //         ...(editedEvents[cls._id] || {}),
  //       })),
  //     }));

  //     const completeTimetable = updatedWeekTimeTable.map((dayData) => ({
  //       ...dayData,
  //       events: [...dayData.events, ...(daysEvents[dayData.day] || [])],
  //     }));

  //     let isValid = true;
  //     for (const dayData of completeTimetable) {
  //       if (dayData.events.length >0){
  //       for (const cls of dayData.events) {
  //         if (
  //           (!cls.eventTitle ||
  //            !cls.eventBudget ||
  //            !cls.venue ||
  //            !cls.time ||
  //            !cls.endTime)
  //         ) {
  //           isValid = false;
  //           break;
  //         }
  //       }
  //       if (!isValid) {
  //         break;
  //       }
  //     }
  //   }
  
  //     if (!isValid) {
  //       // Display an error message to the user
  //       Alert.alert("Please fill in all fields for every event added.");
  //       return;
  //     }

  //     let hasEvents = false;

  //     for (const dayData of completeTimetable) {
  //       if (dayData.events.length > 0) {
  //         hasEvents = true;
  //         break;
  //       }
  //     }

  //     if (!hasEvents) {
  //       // Display an error message to the user
  //       Alert.alert("Please add events before submitting.");
  //       return;
  //     }
      
      
  //      const res = await client.post(`/timetable/addTimeTable/${userInfo._id}`, {
  //         weekTimeTable:completeTimetable
  //       }, config);
         


        
  //       if (res.status === 200) { 
  //       navigation.goBack()
  //           navigation.dispatch(
  //             CommonActions.navigate({
  //           name:"EventsScheduler"
  //         }))
    
  //       }
  //     }
  //   } 
  //   catch (e){
        
  //           if(e.response.status === 409){
  //             setTimetableAdded(e.response.data)
  //           }
  //       else{
  //      setError(true);
  //      setErrorMessage(
  //        e.message
  //          ? e.message
  //          : "Oops! Something went wrong. Please try again later."
      
  //          );
  //     }
  //      }
  //   finally{
  //     setLoading(false)
  //   }
  // }

  onPress:async()=>{

        const updatedWeekTimeTable = events.map((dayData) => ({
        ...dayData,
        events: [
          ...dayData.events,
          ...(dayData.day === newEvents.day ? [newEvents] : []),
        ].map((cls) => ({
          ...cls,
          ...(editedEvents[cls._id] || {}),
        })),
      }));

      const completeTimetable = updatedWeekTimeTable.map((dayData) => ({
        ...dayData,
        events: [...dayData.events, ...(daysEvents[dayData.day] || [])],
      }));

      let isValid = true;
      for (const dayData of completeTimetable) {
        if (dayData.events.length >0){
        for (const cls of dayData.events) {
          if (
            (!cls.eventTitle ||
             !cls.eventBudget ||
             !cls.venue ||
             !cls.time ||
             !cls.endTime)
          ) {
            isValid = false;
            break;
          }
        }
        if (!isValid) {
          break;
        }
      }
    }
  
      if (!isValid) {
        // Display an error message to the user
        Alert.alert("Please fill in all fields for every event added.");
        return;
      }

      let hasEvents = false;

      for (const dayData of completeTimetable) {
        if (dayData.events.length > 0) {
          hasEvents = true;
          break;
        }
      }

      if (!hasEvents) {
        // Display an error message to the user
        Alert.alert("Please add events before submitting.");
        return;
      }


      console.log(completeTimetable)
  }
}
])
  };


  const handleRemoveNewEvents = (day, index) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to remove this Events?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => {
    setDaysEvents((prevDaysEvents) => {
      const updatedEvents = { ...prevDaysEvents };
      if (updatedEvents[day]) {
        updatedEvents[day] = updatedEvents[day].filter((_, i) => i !== index);
      }
      return updatedEvents;
    });
          },
        },
      ]
    );
  };

  const handleAddNewEvents = (day) => {
    const newEvents = {
      // type: "events",
      eventTitle: "",
      eventBudget: "",
      venue: "",
      time: "",
      endTime: "",
    };
  
    setDaysEvents((prevDaysEvents) => ({
      ...prevDaysEvents,
      [day]: [...(prevDaysEvents[day] || []), newEvents],
    }));
  };
  
  const handleEditNewEvents = (day, index, field, value) => {

    
    setDaysEvents((prevDaysEvents) => {
      const updatedEvents = { ...prevDaysEvents };
      if (!updatedEvents[day]) {
        updatedEvents[day] = [];
      }
      updatedEvents[day][index] = {
        ...updatedEvents[day][index],
        [field]: value,
      };
      return updatedEvents;
    });
  };
  

  const styles = StyleSheet.create({
    text: {
      fontSize: 13,
      fontFamily: "PoppinsLight",
      color: theme.addTimetable,
      fontWeight: "600",
      wordWrap: "break-word",
    },
    textInput: {
      backgroundColor: theme.colorss,
      borderRadius: 5,
      borderRadius: 6,
      height: 45,
      paddingLeft: 5,
      fontSize: 14,
      fontFamily: "PoppinsLight",
      color: theme.black,
      marginVertical: 5,
      width:width*0.89

    },
    error: {
      fontFamily: "PoppinsLight",
      fontSize: 8,
      color: "red",
      right: 35,
      position: "absolute",
      top: 5,
    },
  });



  return (
      <View style={{ 
      paddingTop: Platform.OS === "android" ?height*0.06: 80,
      flex:1}}>
       {/* <CustomBackButtonWithName name={"Timetable"} backPosition={75}/> */}
    <ScrollView contentContainerStyle={{height:"auto", paddingTop:20}} showsVerticalScrollIndicator={false}>
        {
          !loading && timetableAdded ?
                   <View style={{alignSelf:"center", paddingTop:50}}>
         <AnimatedLottieView
                  source={require("../../assets/animations/timetable.json")}
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
        <Text style={styles.text}>You have an existing event</Text>
        {userInfo?.role === 4 && 
        <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          navigation.dispatch(
            CommonActions.navigate({
              name: "Profile",
              params: {
                screen: "EditTimetableScreen",
              },
            })
          );
        }}
        >
          <Text style={[styles.text,{fontSize:13}]}>click to edit EventsScheduler</Text>
        </TouchableOpacity>
        }
                </View>
      </View>
        :
        events.map((dayData, index) => (
           <View key={index}>
           { 
           dayData.day !=="Saturday" && dayData.day !== "Sunday" &&
          <View
            key={dayData._id}
            style={{
              marginTop: 20,
              height: expandedDay[dayData.day] ? "auto" : 47,
              paddingLeft: 10,
              width: width*0.95,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "rgba(153, 162, 173, 0.30)",
              alignSelf: "center",
            }}
          >
            
            <TouchableOpacity
              onPress={() => toggleDayExpansion(dayData.day)}
              activeOpacity={1}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  top: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "PoppinsSemiBold",
                    color: theme.todoText,
                  }}
                >
                  {dayData.day}
                </Text>
                <Icon
                  name={
                    expandedDay[dayData.day]
                      ? "chevron-up-outline"
                      : "chevron-down-outline"
                  }
                  size={25}
                  style={{
                    width: 28,
                    height: 28,
                    backgroundColor: "#d9d9d9",
                    borderRadius: 28,
                    right: 10,
                  }}
                />
              </View>
            </TouchableOpacity>

            {expandedDay[dayData.day] && (
              <View>
                

                {/* Functionality to add new events */}
                {daysEvents[dayData.day] &&daysEvents[dayData.day].map((newEvents, newIndex) => (
                  <View key={newIndex} style={{ paddingBottom: 30, top: 20 }}>
                    <View
                      style={{
                        width: 323,
                        height: 1,
                        backgroundColor: theme.addTimetable,
                        position: "absolute",
                      }}
                    />

                    {/* Editable Fields for the new Events */}

                    <View style={{ top: 10 }}>
                      <FormInput
                        value={newEvents.eventTitle}
                        onChangeText={(value) =>
                          handleEditNewEvents(dayData.day, newIndex, "eventTitle", value)
                        }
                        placeholder="event"
                        label="Title"
                        style={styles.text}
                        TextInputStyle={styles.textInput}
                        placeholderTextColor={theme.addTimetable}
                      />

                      <View style={{ flexDirection: "row" }}>
                        <View>
                          <FormInput
                            value={newEvents.eventBudget}
                            onChangeText={(value) =>
                              handleEditNewEvents(dayData.day, newIndex, "eventBudget", value)
                            }
                            TextInputStyle={[
                              styles.textInput,
                              { width: width / 2.45, marginRight: 25 },
                            ]}
                            placeholderTextColor={theme.addTimetable}
                            placeholder="Event Budget"
                            label="Event Budget"
                            style={styles.text}
                          />
                        </View>
                        <View>
                          <FormInput
                            value={newEvents.venue}
                            onChangeText={(value) =>
                              handleEditNewEvents(dayData.day,newIndex, "venue", value)
                            }
                            label="Venue"
                            placeholder="Venue"
                            style={styles.text}
                            TextInputStyle={[
                              styles.textInput,
                              { width: width / 2.45 },
                            ]}
                            placeholderTextColor={theme.addTimetable}
                          />
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <View>
                          <Text style={styles.text}>Start Time</Text>
                          <View
                            style={[
                              styles.textInput,
                              { width: width / 2.45, marginRight: 25 },
                            ]}
                          >
                            <TouchableOpacity
                              onPress={() =>
                                handleEditNewEvents(
                                  dayData.day,
                                  newIndex,
                                  "showStartTimePicker",
                                  true
                                )
                              }
                            >
                              <Text
                                style={[
                                  styles.text,
                                  { top: 12, left: 6, fontSize: 14 },
                                ]}
                              >
                                {newEvents.showStartTimePicker
                                  ? newEvents.time || "Select Time"
                                  : newEvents.time || "00:00"}
                              </Text>
                            </TouchableOpacity>
                            {newEvents.showStartTimePicker && (
                              <DateTimePicker
                                value={newclassDate}
                                mode="time"
                                is24Hour={false}
                                display="default"
                                onChange={(event, value) => {

                                  handleEditNewEvents(
                                    dayData.day,
                                    newIndex,
                                    "showStartTimePicker",
                                    false
                                  );

                                  setNewEventsDate(value)
                                  if (event.type === "set") {
                                    const time = value.toLocaleTimeString([], {
                                      hour: "numeric",
                                      minute: "2-digit",
                                    });
                                    handleEditNewEvents( dayData.day, newIndex, "time", time); // Convert back to string for storage
                                    // Close the picker
                                  }
                                }}
                              />
                            )}
                          </View>
                        </View>

                        <View>
                          <Text style={[styles.text, { left: 10 }]}>
                            End Time
                          </Text>
                          <View
                            style={[
                              styles.textInput,
                              { width: width / 2.45, marginRight: 25 },
                            ]}
                          >
                            <TouchableOpacity
                              onPress={() =>
                                handleEditNewEvents(
                                  dayData.day,
                                  newIndex,
                                  "showEndTimePicker",
                                  true
                                )
                              }
                            >
                              <Text
                                style={[
                                  styles.text,
                                  { top: 12, left: 6, fontSize: 14 },
                                ]}
                              >
                                {newEvents.showEndTimePicker
                                  ? newEvents.endTime || "Select Time"
                                  : newEvents.endTime || "00:00"}
                              </Text>
                            </TouchableOpacity>

                            {newEvents.showEndTimePicker && (
                              <DateTimePicker
                                value={newEventsEndDate}
                                mode="time"
                                is24Hour={false}
                                display="default"
                                onChange={(event, value) => {

                                  handleEditNewEvents(
                                    dayData.day,
                                    newIndex,
                                    "showEndTimePicker",
                                    false
                                  );  // close picker

                                  setNewEventsEndDate(value)
                                  if (event.type === "set") {
                                    const endTime = value.toLocaleTimeString(
                                      [],
                                      {
                                        hour: "numeric",
                                        minute: "2-digit",
                                      }
                                    );
                                    handleEditNewEvents(
                                      dayData.day,
                                      newIndex,
                                      "endTime",
                                      endTime
                                    ); // Convert back to string for storage
                                 
                                  }
                                }}
                              />
                            )}
                          </View>
                        </View>
                      </View>

                      <View
                        style={[
                          styles.textInput,
                          { width: 120, height: 35, alignSelf: "center" },
                        ]}
                      >
                        <TouchableOpacity
                          onPress={() => handleRemoveNewEvents(dayData.day, newIndex)}
                          activeOpacity={1}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              top: 5,
                              justifyContent: "space-evenly",
                            }}
                          >
                            <Icon
                              name={"close-circle"}
                              size={20}
                              color={theme.black}
                            />
                            <Text style={[styles.text, { top: 2 }]}>
                              Remove
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}

                {/* Add Button */}
                    
                <View style={[styles.textInput, { width: 120, height: 35, top:5}]}>
                  <TouchableOpacity
                    onPress={() => handleAddNewEvents(dayData.day)}
                    activeOpacity={1}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        top: 5,
                        justifyContent: "space-evenly",
                      }}
                    >
                      <Icon name={"add-circle"} size={20} color={theme.addTimetable} />
                      <Text style={[styles.text, { top: 2, right: 10 }]}>
                        Add Events
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
}
          </View>
        ))}
      
        {loading?
        <ActivityIndicator size="large" color={theme.lightblue} style={{paddingTop:80}}/>
          :
          !loading && timetableAdded ? null :
          <View style={{paddingTop:80}}>
            <FormSubmitBtn
              title={"Confirm"}
              style={{width:343}}
              onPress={() => AddTimeTable()}
              />
          </View>
      }
        </ScrollView>
        </View>
  );
};

export default AddEventSchedulerScreen;