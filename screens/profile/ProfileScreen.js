
// import * as React from "react"
// import {Text, View, StyleSheet, StatusBar, Image} from 'react-native';
// import { SPACING } from '../../constants/theme';
// import { ThemeContext, getTheme } from '../../context/ThemeContext';
// import AppHeader from '../../components/AppHeader';
// import SettingComponent from '../../components/profile/SettingComponent';
// import ProfileContainer from "../../components/ProfileContainer";

// const ProfileScreen = ({navigation}) => {
//   const {theme} = React.useContext(ThemeContext)
//   const styles =  StyleSheet.create({
//     container: {
//       display: 'flex',
//       flex: 1,
//       backgroundColor: theme.white,
//       paddingTop:13
//     },
//     appHeaderContainer: {
//       marginHorizontal: SPACING.space_36,
//       marginTop: 13,
//     },
//     profileContainer: {
//       alignItems: 'center',
//       padding: 4,
//       top:14
//     },
//     avatarImage: {
//       height: 80,
//       width: 80,
//       borderRadius: 80,
//     },
//     avatarText: {
//       fontFamily: "PoppinsSemiBold",
//       fontSize: 16,
//       marginTop: SPACING.space_16,
//       color: theme.black,
//     },
//   });



//   return (
//     <View style={styles.container}>
//       {/* <StatusBar hidden /> */}
//       <View style={styles.appHeaderContainer}>
//         <AppHeader
//           name="arrow-left"
//           header={'My Profile'}
//           action={() => navigation.goBack()}
//         />
//       </View>

//      <ProfileContainer name ={"Dada Stephen"}/>

//       <View style={styles.profileContainer}>
//         <SettingComponent
//           icon="user"
//           heading="Account"
//           subheading="Edit Profile"
//           subtitle="Change Password"
//           screenName ="HomeScreen"
//         />
//         <SettingComponent
//           icon="gear"
//           heading="Settings"
//           subheading="Theme"
//           subtitle="Permissions"
//           screenName =""
//         />
//         <SettingComponent
//           icon="ticket"
//           heading="Ticket"
//           subheading="View Tickets"
//           subtitle="Refferrals"
//           screenName ="TicketScreen"
//         />
//         <SettingComponent
//           icon="info"
//           heading="About"
//           subheading="About Efrica"
//           // subtitle="more"
//           screenName =""
//         />
//       </View>
//     </View>
//   );
// };



// export default ProfileScreen;


























































import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  TextInput,
  ActivityIndicator,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from "react-native";
import {
  TicketIcon,
  Notification,
  Person,
  Chat,
  Direction,
  ScanTicket,
  Icon,
  Campaign,
  CalendarOutline,
  School,
  ChevRight,
  Remove,
  Logout,
} from "../../constants/icons";
import { StackActions, useNavigation } from "@react-navigation/native";
import { SettingsButton } from "../../components/SettingsButton";
import { ModalPopUp } from "../../components/Modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Yup from "yup";
import BottomSheet from "../../components/BottomSheet";
import moment from "moment";
import client from "../../api/client";
import ErrorButton from "../../components/ErrorButton";
import { ThemeContext } from "../../context/ThemeContext";
import { COLORS } from "../../constants/theme";
import { AuthContext } from "../../context/AuthContext";
const { width, height } = Dimensions.get("screen");

// 5 is for dfr dashboard
// 4 is for course rep
// 3 is for campaigns
// 2 is to scan events
// 1 is for a pro
// 0 is for normal user

export const ProfileScreen = () => {
  const [actionTriggered, setActionTriggered] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const bottomSheetRef = useRef();
  const pressHandler = useCallback(() => {
    bottomSheetRef.current.expand();
  }, []);

  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [userRefreshToken, setUserRefreshToken] = useState(null);
  const [eventTitle, setEventTitle] = useState(null);
  const [eventTime, setEventTime] = useState(null);
  const [feedback, setFeedback] = useState(false);
  const [message, setMessage] = useState("");
  const { theme } = useContext(ThemeContext);

const [userRole, setUserRole] = useState("")

  // const [loading, setLoading] = useState(false)


  const {logout,
     loading
    } = useContext(AuthContext);




 
  const validationSchemaFeedback = Yup.object({
    feedback: Yup.string().required("Feedback required!"),
  });


 
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("userInfo");
      const userToken = await AsyncStorage.getItem("userToken");
      const userRole = await AsyncStorage.getItem("userRole")

      // since async storage is global, get eventTitle and eventTime are stored on async storage
      //

      if (value !== null && userToken !== null && userRole!==null) {

        setUserInfo(JSON.parse(value));
        setUserToken(userToken);
        setUserRole(JSON.parse(userRole))
      }
    } catch (e) {}
  };

  useEffect(() => {
    getData();
  }, []);



  // const logOutUser = async()=>{
  //       setIsLoading(true)
  //   setTimeout(()=>{
  //  logout();
  //  setIsLoading(false);
  //   }, 2000)
  // }
  const DeleteAcc = async () => {
    const [userInfo, setUserInfo] = useState(null);
    try {
      setIsLoading(true);
      const value = await AsyncStorage.getItem("userInfo");
      if (value !== null) {
        const userInfo = JSON.parse(value);

        const res = await client.delete(`/deleteUserByEmail/${userInfo.email}`);

        if (res.status === 200 && res.data.success === true) {
          // if response is succesfully deleted, call the logout function
          Alert.alert("Account deleted Successfully");
          logout();
        }
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  /* const scanLogic=()=>{

		// remember, there must be a protect function here to make sure this guy has a role of 2
		


		try{
			// here the item is gotten

		}catch(e){
		}

		// since async storage is global, they are retrieved here {eventTitle and eventTime}


       // presentTime = actual time
	   // evenTime =eventTime
	   // presentTime > eventTime  ; (eventTime has elapsed)
	   setEventTime(null)


		// here event title is used
		for every event Title, there must be an eventTime attached with it

		// if users eventTitle!==null and eventTime hasn't elapsed  (eventTime !==null)
		// navigate the user to scanTicketscreen  ==here user has picked what he's scanning for and the time hasn't elapsed



		else if eventTitle ==null and eventTime ==null  
		 navigate to see list of events i.e initial landing. 
		here, the user hasn't picked anything, so he is navigated to this screen, to check list of events if they are open

                                                  
		// else if time has elapsed (eventTime ==null), that means there must be an eventTitle {eventTitle !==null}, therefore setEventTitle and eventTime to null, navigate the user to see the list of events (EventsList page)

	}
		
		*/

  const checkEvent = async () => {
    try {
      const eventTitle = await AsyncStorage.getItem("eventTitle");
      const eventTime = await AsyncStorage.getItem("eventTime");

      if (eventTitle !== null && eventTime !== null) {
        const endTime = moment(eventTime, "h:mmA");

        const currentTime = moment();
        if (currentTime.isAfter(endTime)) {
          // The time for the event has ended, navigate to event list
          setEventTime(null);
          setEventTitle(null);
          try {
            await AsyncStorage.removeItem("eventTime");
            await AsyncStorage.removeItem("eventTitle");
          } catch (e) {}
          navigation.navigate("EventList");
        } else {
          // The event is ongoing, navigate to scan ticket screen
          setEventTime(eventTime);
          setEventTitle(eventTitle);
          navigation.navigate("ScanTicketScreen");
        }
      } else {
        // The user has not picked anything yet, navigate to event list
        navigation.navigate("EventList");
      }
    } catch (e) {
      alert(e.message);
    }
  };

  const postFeedback = async (values) => {
    const formData = new FormData();
    formData.append("feedback", values.feedback);
    formData.append("senderMail", userInfo.email);

    const token = userToken;

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    setIsLoading(true);
    try {
      const res = await client.post(`/sendFeedback`, formData, config);

      // //(res)

      if (res.status === 200) {
        setVisible(false);
        // remove the modal from view
        setFeedback(true);
        setMessage("Feedback sent successfully✅");
      }
    } catch (e) {
      setFeedback(true);
      setMessage("Something went wrong, Please try again!");
    } finally {
      setIsLoading(false);
    }
  };

  const styles = StyleSheet.create({
    footer: {
      position: "absolute",
      paddingTop: height / 2,
      right: 30,
    },
    iconContainer: {
      height: 50,
      width: 50,
      backgroundColor: theme.todoBackground,
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      paddingHorizontal: 15,
      paddingVertical: Platform.OS === "ios" ? 80 : 0,
      backgroundColor: theme.profileBackground,
      height: height,
      // alignSelf: "center",
      // flex: 1,
      // paddingTop: 80,
      // paddingLeft: 12,
    },
    itemcontainer: {
      backgroundColor: theme.primary,
      height: 59,
      width: 59,
      borderRadius: 59,
      alignItems: "center",
      justifyContent: "center",
    },
    email: {
      fontWeight: "500",
      color: theme.blendgray,
      fontSize: 12,
      opacity: 0.5,
      fontFamily: "Roboto",
    },
    modalBackGround: {
      flex: 1,
      backgroundColor: theme.black,
      justifyContent: "center",
      alignItems: "center",
    },
    modalContainer: {
      width: "80%",
      backgroundColor: theme.white,
      paddingHorizontal: 20,
      marginVertical: 30,
      borderRadius: 20,
      elevation: 20,
    },
    header: {
      width: "100%",
      height: 20,
      alignItems: "flex-end",
      justifyContent: "center",
    },
    text: {
      fontFamily: "PoppinsLight",
      fontSize: 20,
      fontWeight: "300",
      lineHeight: 30,
      alignItems: "center",
      color: theme.offblack,
      left: 5,
      top: -2,
    },
    password: {
      borderColor: theme.gray,
      width: "100%",
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
      height: 60,
      marginBottom: 15,
      fontFamily: "PoppinsLight",
      top: 3,
      color: theme.black,
    },
  });

  // here, i'm getting the whole userinfo to get the values
  return (
    <View style={styles.container}>
      <Text
        style={{
          marginBottom: 30,
          color: theme.black,
          fontSize: Platform.OS === "android" ? 34 : 40,
          fontFamily: "PoppinsBold",
        }}
      >
        Profile
      </Text>
      <View>
        <View style={{ backgroundColor: theme.white, borderRadius: 7 }}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate("AccountScreen")}
          >
            <SettingsButton
              iconLeft={Direction}
              icon={Person}
              ButtonName={"Account"}
            />
            <View
              style={{
                borderBottomColor: theme.offwhite,
                borderBottomWidth: 1,
                width: "90%",
                alignSelf: "center",
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            // onPress={() => {
            //   setVisible(true);
            //   setActionTriggered("Action_1");
            // }}
            onPress={()=> navigation.navigate("TicketScreen")}
          >
            <SettingsButton icon={TicketIcon} ButtonName={"Ticket"} />
            <View
              style={{
                borderBottomColor: theme.offwhite,
                borderBottomWidth: 1,
                width: "90%",
                alignSelf: "center",
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate("FeedbackScreen")
            }}
          >
            <SettingsButton icon={Chat} ButtonName={"Feedback"} />
          </TouchableOpacity>
        </View>
        {/* here if you are a normal guy see timetable, course rep see duties */}
        {/* <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate("TimetableScreen");
            }}
          >
            <SettingsButton icon={CalendarOutline} ButtonName={"Timetable"} />
          </TouchableOpacity> */}
        {/* 
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate("UpdateGroup")}
          >
            <SettingsButton icon={School} ButtonName={"Update Group"} />
          </TouchableOpacity> */}
        <View
          style={{
            backgroundColor: theme.white,
            marginVertical: 30,
            borderRadius: 7,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setVisible(true);
              setActionTriggered("Action_1");
            }}
          >
            <SettingsButton
              iconLeft={ChevRight}
              icon={Remove}
              ButtonName={"Deactivate Account"}
            />
            <View
              style={{
                borderBottomColor: theme.offwhite,
                borderBottomWidth: 1,
                width: "90%",
                alignSelf: "center",
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setVisible(true);
              setActionTriggered("Action_2");
            }}
          >
            <SettingsButton icon={Logout} ButtonName={"Log Out"} />
          </TouchableOpacity>
        </View>
        {
        // userInfo?.role === 4
        userRole ===4
         ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate("DutiesScreen");
            }}
          >
            <SettingsButton icon={CalendarOutline} ButtonName={"Duties"} />
          </TouchableOpacity>
        ) : null}

        {
        // userInfo?.role === 5 
        userRole ===5
        ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate("DashboardScreen");
            }}
          >
            <SettingsButton icon={CalendarOutline} ButtonName={"Dashboard"} />
          </TouchableOpacity>
        ) : null}

        {
        // userInfo?.role === 1 ||
        // userInfo?.role === 4 ||
        // userInfo?.role === 3
        userRole === 1 || userRole === 4 || userRole ===3
        
        ? (
          <>
            {/* <View
                style={{
                  width: 55,
                  height: 55,
                  backgroundColor: theme.primary,
                  borderRadius: 50,
                  // position: "absolute",
                  // bottom: -height / 3.4,
                  top:300,
                  right: 30,
                }}
              >
                <Pressable
                  //  onPress={() => pressHandler()}
                  onPress={() =>
                    userInfo.role === 3
                      ? navigation.navigate("AddCampaignPostsScreen")
                      : pressHandler()
                  }
                >
                  <Text
                    style={{
                      bottom: 7,
                      fontFamily: "PoppinsLight",
                      alignSelf: "center",
                      fontSize: 48,
                      color: theme.whites,
                    }}
                  >
                    +
                  </Text>
                </Pressable>
              </View> */}

            <View style={styles.footer}>
              <TouchableOpacity
                onPress={() =>
                  // userInfo.role === 3
                  userRole === 3
                    ? navigation.navigate("AddCampaignPostsScreen")
                    : pressHandler()
                }
                activeOpacity={1}
              >
                <View style={styles.iconContainer}>
                  <Icon name="add" color="white" size={30} />
                </View>
              </TouchableOpacity>
            </View>
          </>
        ) : 
        // userInfo?.role === 2 || userInfo?.role === 9 

        userRole === 2 || userRole ===9
        
        ? (
          // this is meant to be 2 or 9
          <>
            <TouchableOpacity
              activeOpacity={0.7}
              // here the functionality is chehcked before he is navigated. of
              onPress={() => checkEvent()}
            >
              <SettingsButton icon={ScanTicket} ButtonName={"Scan QR Code"} />
            </TouchableOpacity>
          </>
        ) : null}

        <BottomSheet
          ref={bottomSheetRef}
          activeHeight={
            // userInfo?.role === 4
            userRole ===4
             ? height * 0.63 : height * 0.6}
          backgroundColor={theme.white}
        >
          <View
            style={{
              width: width,
              height: 200,
              marginLeft: 20,
              marginTop: 20,
            }}
          >
            <View>
              <Text
                style={{
                  fontWeight: "600",
                  fontFamily: "PoppinsBold",
                  fontSize: 30,
                  color: theme.black,
                }}
              >
                {
                // userInfo?.role === 4 
                userRole ===4
                ? "Upload" : "Create"}
              </Text>

              {/* change the icons too per click */}

              <View style={{ paddingVertical: 10 }}>
                {
                // userInfo?.role === 4 
               userRole ===4
                && (
                  <TouchableOpacity
                    onPress={() => {
                      setVisible(false);
                      navigation.navigate("AddExamTimeTableScreen");
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        // top: 30,
                        borderBottomColor: COLORS.blendgray,
                        borderBottomWidth: 1,
                        width: width - 100,
                      }}
                    >
                      <Icon
                        name={"document-text-outline"}
                        size={20}
                        color={theme.black}
                      />
                      <Text style={styles.text}>Upload Exam TimeTable</Text>
                    </View>
                  </TouchableOpacity>
                )}

                <View style={{ top: 10 }}>
                  <TouchableOpacity
                    onPress={() => {
                      setVisible(false);
                      // userInfo?.role === 4
                      userRole ===4
                        ? navigation.navigate("AddTimetableScreen")
                        : navigation.navigate("UploadPostScreen");
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        borderBottomColor: COLORS.blendgray,
                        borderBottomWidth: 1,
                        width: width - 100,
                      }}
                    >
                      <Icon
                        name={"document-text-outline"}
                        size={20}
                        color={theme.black}
                      />
                      <Text style={styles.text}>
                        {
                        // userInfo?.role === 4
                        userRole ===4
                        ? "Upload Timetable" : "New Post"}
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      setVisible(false);

                      // userInfo?.role === 4

                      userRole ===4
                        ? navigation.navigate("AddImpromtuClassScreen")
                        : navigation.navigate("UploadEventScreen");
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        top: 15,
                        borderBottomColor: COLORS.blendgray,
                        borderBottomWidth: 1,
                        width: width - 100,
                      }}
                    >
                      <Icon
                        name={"document-text-outline"}
                        size={20}
                        color={theme.black}
                      />
                      <Text style={styles.text}>
                        {
                        // userInfo?.role === 4
                        userRole ===4
                          ? "Upload Impromptu Class"
                          : "New Event"}
                      </Text>
                    </View>
                  </TouchableOpacity>

                  {
                  // userInfo?.role === 4
                  userRole === 4
                   && (
                    <TouchableOpacity
                      onPress={() => {
                        setVisible(false);
                        navigation.navigate("AddAssignmentsScreen");
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          top: 30,
                          borderBottomColor: COLORS.blendgray,
                          borderBottomWidth: 1,
                          width: width - 100,
                        }}
                      >
                        <Icon
                          name={"document-text-outline"}
                          size={20}
                          color={theme.black}
                        />
                        <Text style={styles.text}>Upload Assignment</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </View>
        </BottomSheet>

        <ModalPopUp
          visible={visible}
          height={Platform.OS === "android" ? "26%" : height * .2}
        >
          <View
          // style={{ alignItems: "center" }}
          >
            <View style={styles.header}>
            </View>
          </View>

          {actionTriggered === "Action_1" ? (
            <View 
            style={{top: Platform.OS === "ios" ? -10:null}}
            >
              <Text
                style={{
                  fontFamily: "PoppinsBold",
                  fontSize: Platform.OS === "android" ? 20 : width * .06,
                  marginBottom: 8,
                  color:theme.black
                }}
              >
                Deactivate Account
              </Text>
              <Text
                style={{
                  fontFamily: "PoppinsLight",
                  fontSize: Platform.OS === "android" ? 12 : width * .035,
                  color:theme.black
                  
                }}
              >
                Are you sure
              </Text>
              <Text
                style={{
                  fontFamily: "PoppinsLight",
                  fontSize: Platform.OS === "android" ? 12 : width * .035,
                  color:theme.black

                }}
              >
                 data saved will be lost
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  // justifyContent: "space-around",
                  marginTop: 10,
                  gap: 8,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setVisible(false);
                    setIsLoading(false);
                  }}
                  style={{
                    alignItems: "center",
                    backgroundColor: "#D9D9D9",
                    width: 145,
                    height: 44,
                    justifyContent: "center",
                    borderRadius: 4,
                  }}
                >
                  <Text
                    style={{
                      color: "#717171",
                      fontFamily: "PoppinsSemiBold",
                      fontSize: 16,
                    }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
                {isLoading ? (
                  <View
                    style={{
                      height: 44,
                      width: 145,
                      alignItems: "center",
                      borderRadius: 4,
                      justifyContent: "center",
                      backgroundColor: theme.lightblue,
                    }}
                  >
                    <ActivityIndicator size="large" color={theme.white} />
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={()=>DeleteAcc()}
                    style={{
                      alignItems: "center",
                      backgroundColor: "#F34F4F",
                      width: 145,
                      height: 44,
                      justifyContent: "center",
                      borderRadius: 4,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontFamily: "PoppinsSemiBold",
                        fontSize: 16,
                      }}
                    >
                      Deactivate
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ) : null}

          {actionTriggered === "Action_2" ? (
            <View style={{top:Platform.OS === "ios" ? -6:null}}>
              <Text
                style={{
                  fontFamily: "PoppinsBold",
                  fontSize: Platform.OS === "android" ? 20 : 26,
                  marginBottom: 8,
                }}
              >
                Log Out
              </Text>
              <Text
                style={{
                  fontFamily: "PoppinsLight",
                  fontSize: Platform.OS === "android" ? 12 : width * .035,
                }}
              >
                Are you sure you to sign out of this account?
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  // justifyContent: "space-around",
                  marginTop: 15,
                  gap: 8,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setVisible(false);
                    setIsLoading(false);
                  }}
                  style={{
                    alignItems: "center",
                    backgroundColor: "#D9D9D9",
                    width: 145,
                    height: 44,
                    justifyContent: "center",
                    borderRadius: 4,
                  }}
                >
                  <Text
                    style={{
                      color: "#717171",
                      fontFamily: "PoppinsSemiBold",
                      fontSize: 16,
                    }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
                {isLoading ? (
                  <View
                    style={{
                      height: 44,
                      width: 145,
                      alignItems: "center",
                      borderRadius: 4,
                      justifyContent: "center",
                      backgroundColor: theme.lightblue,
                    }}
                  >
                    <ActivityIndicator size="large" color={theme.white} />
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={()=>{logout()}}
                    style={{
                      alignItems: "center",
                      backgroundColor: "#3445EA",
                      width: 145,
                      height: 44,
                      justifyContent: "center",
                      borderRadius: 4,
                    }}
                  >
                    {loading ? <ActivityIndicator color={"#ffff"}/>
                    :
                  
                    <Text
                      style={{
                        color: "white",
                        fontFamily: "PoppinsSemiBold",
                        fontSize: 16,
                      }}
                    >
                      logout
                    </Text>
}
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ) : null}
        </ModalPopUp>
      </View>
      {feedback && (
        <ErrorButton
          onPress={() => setFeedback(false)}
          message={message}
          style={{ paddingTop: height * 0.35 }}
          color={theme.green}
          bgcolor={theme.lightgreen}
          borderRadius={10}
        />
      )}
    </View>
  );
};

















