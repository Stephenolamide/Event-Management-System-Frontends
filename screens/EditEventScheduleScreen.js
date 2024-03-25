import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { FormInput } from "../components/FormInput";
import { StyleSheet } from "react-native";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { Back, Icon } from "../constants/icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FormSubmitBtn } from "../components/FormSubmitBtn";
import client from "../api/client";
import AnimatedLottieView from "lottie-react-native";
import { Platform } from "react-native";
import CustomBackButtonWithName from "../components/CustomBackButtonWithName";
import { KeyboardAvoidingView } from "react-native";
const { width, height } = Dimensions.get("screen");





const EditEventScheduleScreen = () => {
  const navigation = useNavigation();
  const [expandedDay, setExpandedDays] = useState({});
  const [editedClasses, setEditedClasses] = useState({});
  const { theme } = useContext(ThemeContext);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [classes, setClasses] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDataLoaded, setIsDataLoaded] = useState(false); // Add a flag to track data loading
  const [newClass, setNewClass] = useState([]);
  const [daysClasses, setDaysClasses] = useState({}); // Use an object to hold classes for each day
  const [loading, setLoading] = useState(false);

  const [date, setDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [newclassDate, setNewClassDate] = useState(new Date());
  const [newClassEndDate, setNewClassEndDate] = useState(new Date());

  useEffect(() => {
    getAllTimeTable();
  }, []);

  const getAllTimeTable = async () => {
    setIsLoading(true);

    // setIsDataLoaded(true);
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

        //(res)
        const timetable = res.data.data.weekTimeTable;
        setClasses(timetable);
        setIsDataLoaded(true);
      }
    } catch (e) {
      //(e);
      if (
        e.response.status === 401 &&
        e.response.data.success === false &&
        e.response.data.msg === "Session Expired"
      ) {
        try {
          await getAccessToken();
          await getAllTasks();
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

  const handleEdit = (classId, field, value) => {
    setEditedClasses((prev) => {
      const updatedClasses = { ...prev };
      if (!updatedClasses[classId]) {
        updatedClasses[classId] = {}; // Initialize the class object if not present
      }
      updatedClasses[classId][field] = value;
      return updatedClasses;
    });
  };

  const toggleDayExpansion = (day) => {
    setExpandedDays((prevExpandedDays) => ({
      ...prevExpandedDays,
      [day]: !prevExpandedDays[day], // Toggle the current day's expansion state
    }));
  };

  const handleRemove = (classId, day) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to remove this class?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => {
            const updatedClasses = classes.map((dayData) => {
              if (dayData.day === day) {
                const updatedDayClasses = dayData.classes.filter(
                  (cls) => cls._id !== classId
                );
                return { ...dayData, classes: updatedDayClasses };
              }
              return dayData;
            });

            setClasses(updatedClasses);

            setEditedClasses((prev) => {
              const updatedEditedClasses = { ...prev };
              delete updatedEditedClasses[classId];
              return updatedEditedClasses;
            });
          },
        },
      ]
    );
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const userToken = await AsyncStorage.getItem("userToken");
      const value = await AsyncStorage.getItem("userInfo");

      if (userToken !== null && value !== null) {
        const userInfo = JSON.parse(value);

        //(userInfo)
        setUserToken(userToken);
        setUserInfo(userInfo);

        const token = userToken;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "application/json",
          },
        };

        const updatedWeekTimeTable = classes.map((dayData) => ({
          ...dayData,
          classes: [
            ...dayData.classes,
            ...(dayData.day === newClass.day ? [newClass] : []),
          ].map((cls) => ({
            ...cls,
            ...(editedClasses[cls._id] || {}),
          })),
        }));

        const completeTimetable = updatedWeekTimeTable.map((dayData) => ({
          ...dayData,
          classes: [...dayData.classes, ...(daysClasses[dayData.day] || [])],
        }));

        let isValid = true;
        for (const dayData of completeTimetable) {
          if (dayData.classes.length > 0) {
            for (const cls of dayData.classes) {
              if (
                !cls.courseTitle ||
                !cls.courseCode ||
                !cls.venue ||
                !cls.time ||
                !cls.endTime
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
          Alert.alert("Please fill in all fields for every class.");
          return;
        }

        let hasClasses = false;

        for (const dayData of completeTimetable) {
          if (dayData.classes.length > 0) {
            hasClasses = true;
            break;
          }
        }

        if (!hasClasses) {
          // Display an error message to the user
          Alert.alert("Please add classes to the timetable before submitting.");
          return;
        }

        const res = await client.put(
          `/timetable/editTimeTable/${userInfo._id}`,
          {
            weekTimeTable: completeTimetable,
          },
          config
        );
        //(res)

        if (res.status === 200) {
          navigation.goBack();
          navigation.goBack();
          navigation.dispatch(
            CommonActions.navigate({
          name:"TimeTable"
        }))
        }
      }
    } catch (error) {
      // ... error handling
      //(error)
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveNewClass = (day, index) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to remove this class?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => {
            setDaysClasses((prevDaysClasses) => {
              const updatedClasses = { ...prevDaysClasses };
              if (updatedClasses[day]) {
                updatedClasses[day] = updatedClasses[day].filter(
                  (_, i) => i !== index
                );
              }
              return updatedClasses;
            });
          },
        },
      ]
    );
  };

  const handleAddNewClass = (day) => {
    const newClass = {
      // type: "Classes",
      courseTitle: "",
      courseCode: "",
      venue: "",
      time: "",
      // showStartTimePicker: false,
      endTime: "",
      // showEndTimePicker: false,
    };

    setDaysClasses((prevDaysClasses) => ({
      ...prevDaysClasses,
      [day]: [...(prevDaysClasses[day] || []), newClass],
    }));
  };

  const handleEditNewClass = (day, index, field, value) => {
    setDaysClasses((prevDaysClasses) => {
      const updatedClasses = { ...prevDaysClasses };
      if (!updatedClasses[day]) {
        updatedClasses[day] = [];
      }
      updatedClasses[day][index] = {
        ...updatedClasses[day][index],
        [field]: value,
      };
      return updatedClasses;
    });
  };

  const styles = StyleSheet.create({
    text: {
      fontSize: 13,
      fontFamily: "Jakarta",
      color: theme.addTimetable,
      fontFamily: "Jakarta",
      fontWeight: "600",
      wordWrap: "break-word",
    },
    textInput: {
      backgroundColor: theme.colorss,
      borderRadius: 5,
      background: "#EFF6FF",
      borderRadius: 6,
      height: 45,
      width: 323,
      paddingLeft: 5,
      fontSize: 14,
      fontFamily: "Jakarta",
      color: theme.black,
      marginVertical: 5,
      width:width*0.89

    },
    error: {
      fontFamily: "Jakarta",
      fontSize: 8,
      color: "red",
      right: 35,
      position: "absolute",
      top: 5,
    },
  });



  return (
    <View
      style={{
        paddingTop: Platform.OS === "android" ? height * 0.06 : 80,
        flex: 1,
      }}
    >
      <CustomBackButtonWithName name={"Edit Timetable"} backPosition={50} />
      <ScrollView contentContainerStyle={{height:"auto"}} showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>

        {isLoading ? (
          <AnimatedLottieView
            source={require("../assets/animations/loading.json")}
            autoPlay
            loop
            speed={0.5}
            style={{
              width: 100,
              height: 100,
              alignSelf: "center",
            }}
          />
        ) : (
          classes.map((dayData, index) => (
            <View key={index}>
              {dayData.day !== "Saturday" && dayData.day !== "Sunday" && (
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
                          fontFamily: "JakartaSemiBold",
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
                      {dayData.classes.map((cls) => (
                        <View key={cls._id} style={{ paddingBottom: 20 }}>
                          {/* Editable Fields */}

                          <View
                            style={{
                              width: 323,
                              height: 1,
                              backgroundColor: theme.addTimetable,
                              position: "absolute",
                              top: 17,
                            }}
                          />

                          <View style={{ top: 23 }}>
                            <FormInput
                              value={
                                (editedClasses[cls._id] &&
                                  editedClasses[cls._id].courseTitle) ||
                                cls.courseTitle
                              }
                              onChangeText={(value) =>
                                handleEdit(cls._id, "courseTitle", value)
                              }
                              placeholder="course"
                              label={"Title"}
                              style={styles.text}
                              TextInputStyle={styles.textInput}
                              placeholderTextColor={theme.addTimetable}
                              // clearButtonMode ={"always"}
                            />

                            <View style={{ flexDirection: "row" }}>
                              <View>
                                <FormInput
                                  value={
                                    (editedClasses[cls._id] &&
                                      editedClasses[cls._id].courseCode) ||
                                    cls.courseCode
                                  }
                                  onChangeText={(value) =>
                                    handleEdit(cls._id, "courseCode", value)
                                  }
                                  TextInputStyle={[
                                    styles.textInput,
                                    { width: width / 2.45, marginRight: 25 },
                                  ]}
                                  placeholderTextColor={theme.addTimetable}
                                  placeholder="Course Code"
                                  label="Course Code"
                                  style={styles.text}
                                />
                              </View>

                              <View>
                                <FormInput
                                  value={
                                    (editedClasses[cls._id] &&
                                      editedClasses[cls._id].venue) ||
                                    cls.venue
                                  }
                                  onChangeText={(value) =>
                                    handleEdit(cls._id, "venue", value)
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
                                    onPress={() => {
                                      handleEdit(
                                        cls._id,
                                        "showStartTimePicker",
                                        true
                                      );
                                    }}
                                  >
                                    <Text
                                      style={[
                                        styles.text,
                                        { top: 12, left: 6, fontSize: 14 },
                                      ]}
                                    >
                                      {editedClasses[cls._id]?.time || cls.time}
                                    </Text>
                                  </TouchableOpacity>
                                  {editedClasses[cls._id]
                                    ?.showStartTimePicker && (
                                    <DateTimePicker
                                      value={date}
                                      mode="time"
                                      is24Hour={false}
                                      display="default"
                                      onChange={(event, value) => {
                                        // setShowStartTimePicker(false);
                                        setDate(value);
                                        const time = value.toLocaleTimeString(
                                          [],
                                          {
                                            hour: "numeric",
                                            minute: "2-digit",
                                          }
                                        );

                                        const updatedClasses = {
                                          ...editedClasses,
                                        };
                                        updatedClasses[cls._id].time = time;
                                        updatedClasses[
                                          cls._id
                                        ].showStartTimePicker = false; // Close the picker
                                        setEditedClasses(updatedClasses);
                                      }}
                                    />
                                  )}
                                </View>
                              </View>

                              {/* EndTime */}

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
                                    // onPress={() => {

                                    //   setShowEndTimePicker(true);
                                    // }}

                                    onPress={() => {
                                      handleEdit(
                                        cls._id,
                                        "showEndTimePicker",
                                        true
                                      );
                                    }}
                                  >
                                    <Text
                                      style={[
                                        styles.text,
                                        { top: 12, left: 6, fontSize: 14 },
                                      ]}
                                    >
                                      {editedClasses[cls._id]?.endTime ||
                                        cls.endTime}
                                    </Text>
                                  </TouchableOpacity>

                                  {editedClasses[cls._id]
                                    ?.showEndTimePicker && (
                                    <DateTimePicker
                                      value={endDate}
                                      mode="time"
                                      is24Hour={false}
                                      display="default"
                                      onChange={(event, value) => {
                                        setEndDate(value);
                                        const endTime =
                                          value.toLocaleTimeString([], {
                                            hour: "numeric",
                                            minute: "2-digit",
                                          });

                                        // setShowEndTimePicker(false);

                                        const updatedClasses = {
                                          ...editedClasses,
                                        };
                                        updatedClasses[cls._id].endTime =
                                          endTime;
                                        updatedClasses[
                                          cls._id
                                        ].showEndTimePicker = false; // Close the picker
                                        setEditedClasses(updatedClasses);
                                      }}
                                    />
                                  )}
                                </View>
                              </View>
                            </View>
                            {/* Remove Button */}

                            <View
                              style={[
                                styles.textInput,
                                { width: 120, height: 35, alignSelf: "center" },
                              ]}
                            >
                              <TouchableOpacity
                                onPress={() =>
                                  handleRemove(cls._id, dayData.day)
                                }
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

                      {/* Functionality to add new classes */}
                      {/* New Class Fields */}

                      {daysClasses[dayData.day] &&
                        daysClasses[dayData.day].map((newClass, newIndex) => (
                          <View
                            key={newIndex}
                            style={{ paddingBottom: 30, top: 20 }}
                          >
                            <View
                              style={{
                                width: 323,
                                height: 1,
                                backgroundColor: theme.addTimetable,
                                position: "absolute",
                              }}
                            />

                            {/* Editable Fields for the new class */}

                            <View style={{ top: 10 }}>
                              <FormInput
                                value={newClass.courseTitle}
                                onChangeText={(value) =>
                                  handleEditNewClass(
                                    dayData.day,
                                    newIndex,
                                    "courseTitle",
                                    value
                                  )
                                }
                                placeholder="course"
                                label="Title"
                                style={styles.text}
                                TextInputStyle={styles.textInput}
                                placeholderTextColor={theme.addTimetable}
                              />

                              <View style={{ flexDirection: "row" }}>
                                <View>
                                  <FormInput
                                    value={newClass.courseCode}
                                    onChangeText={(value) =>
                                      handleEditNewClass(
                                        dayData.day,
                                        newIndex,
                                        "courseCode",
                                        value
                                      )
                                    }
                                    TextInputStyle={[
                                      styles.textInput,
                                      { width: width / 2.45, marginRight: 25 },
                                    ]}
                                    placeholderTextColor={theme.addTimetable}
                                    placeholder="Course Code"
                                    label="Course Code"
                                    style={styles.text}
                                  />
                                </View>
                                <View>
                                  <FormInput
                                    value={newClass.venue}
                                    onChangeText={(value) =>
                                      handleEditNewClass(
                                        dayData.day,
                                        newIndex,
                                        "venue",
                                        value
                                      )
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
                                        handleEditNewClass(
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
                                        {newClass.showStartTimePicker
                                          ? newClass.time || "Select Time"
                                          : newClass.time || "00:00"}
                                      </Text>
                                    </TouchableOpacity>
                                    {newClass.showStartTimePicker && (
                                      <DateTimePicker
                                        value={newclassDate}
                                        mode="time"
                                        is24Hour={false}
                                        display="default"
                                        onChange={(event, value) => {
                                          handleEditNewClass(
                                            dayData.day,
                                            newIndex,
                                            "showStartTimePicker",
                                            false
                                          );

                                          setNewClassDate(value);
                                          if (event.type === "set") {
                                            const time =
                                              value.toLocaleTimeString([], {
                                                hour: "numeric",
                                                minute: "2-digit",
                                              });
                                            handleEditNewClass(
                                              dayData.day,
                                              newIndex,
                                              "time",
                                              time
                                            ); // Convert back to string for storage
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
                                        handleEditNewClass(
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
                                        {newClass.showEndTimePicker
                                          ? newClass.endTime || "Select Time"
                                          : newClass.endTime || "00:00"}
                                      </Text>
                                    </TouchableOpacity>

                                    {newClass.showEndTimePicker && (
                                      <DateTimePicker
                                        value={newClassEndDate}
                                        mode="time"
                                        is24Hour={false}
                                        display="default"
                                        onChange={(event, value) => {
                                          handleEditNewClass(
                                            dayData.day,
                                            newIndex,
                                            "showEndTimePicker",
                                            false
                                          ); // close picker

                                          setNewClassEndDate(value);
                                          if (event.type === "set") {
                                            const endTime =
                                              value.toLocaleTimeString([], {
                                                hour: "numeric",
                                                minute: "2-digit",
                                              });
                                            handleEditNewClass(
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
                                  {
                                    width: 120,
                                    height: 35,
                                    alignSelf: "center",
                                  },
                                ]}
                              >
                                <TouchableOpacity
                                  onPress={() =>
                                    handleRemoveNewClass(dayData.day, newIndex)
                                  }
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

                      <View
                        style={[
                          styles.textInput,
                          { width: 120, height: 35, top: 5 },
                        ]}
                      >
                        <View
                          style={{
                            width: 323,
                            height: 1,
                            backgroundColor: theme.addTimetable,
                            position: "absolute",
                            // top: 17,
                          }}
                        />
                        <TouchableOpacity
                          onPress={() => handleAddNewClass(dayData.day)}
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
                              name={"add-circle"}
                              size={20}
                              color={theme.black}
                            />
                            <Text style={[styles.text, { top: 2, right: 10 }]}>
                              Add Class
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
              )}
            </View>
          ))
        )}
        </KeyboardAvoidingView>

      </ScrollView>
      {loading ? (
        <ActivityIndicator size="large" color={theme.lightblue} />
      ) : (
        <FormSubmitBtn
          title={"Confirm"}
          style={{ width: 343, bottom: 5 }}
          onPress={() => handleSubmit()}
        />
      )}
    </View>
  );
};

export default EditEventScheduleScreen;
