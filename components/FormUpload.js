import {
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
    Image,
    ScrollView,
    TextInput, TouchableOpacity, Pressable
  } from "react-native";
  import React, { useContext, useEffect, useState } from "react";
  import { Formik } from "formik";
  import {
    StackActions,
    useNavigation,
    CommonActions,
  } from "@react-navigation/native";
  import * as ImagePicker from "expo-image-picker";
  import { FormInput } from "../components/FormInput";
  import * as Yup from "yup";
  import { Dropdown } from "react-native-element-dropdown";
  import DateTimePicker from "@react-native-community/datetimepicker";
  import { Calendars, Time, Back } from "../constants/icons";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import axios from "axios";
  import client from "../api/client";
  import ErrorButton from "../components/ErrorButton"
  // import { getAccessToken } from "../utils/GetAccessToken";
  import { ThemeContext } from "../context/ThemeContext";
  // import "intl";
  // import "intl/locale-data/jsonp/en-GB";
  
  const { width, height } = Dimensions.get("window");
  
  export const Form = ({ component }) => {
    const {theme} = useContext(ThemeContext)
  
    const [userInfo, setUserInfo] = useState(null);
    const [userToken, setUserToken] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');
    const [ticketPrice, setTicketPrice] = useState('');
    const navigation = useNavigation();
    const [image, setImage] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
  
    const validationSchema = Yup.object({
      title: Yup.string().required("Title is required!"),
      content: Yup.string().required("Content is required!"),
      image: Yup.array()
        .min(1, "Please select at least one image!")
        .max(10, "You can only select a maximum of 10 images!"),
      campus: Yup.string().required("Campus is required!"),
    });
  
    const validationSchemaEvent = Yup.object({
      title: Yup.string().required("Title is required!"),
      content: Yup.string().required("Content is required!"),
      image: Yup.array()
        .min(1, "Please select at least one image!")
        .max(10, "You can only select a maximum of 10 images"),
      campus: Yup.string().required("Campus is required!"),
  
      date: Yup.string().required("select start date!"),
      time: Yup.string().required("select start time!"),
      endTime: Yup.string().required("select end time!"),
      endDate: Yup.string().required("select end date!"), // here, endDate is a string
      ticketPrice: Yup.string().required("Ticket Price required!"),
      venue: Yup.string().required("venue required!"),
      capacity: Yup.string().required("capacity required!"),
      // price: Yup.mixed().when('ticketPrice', {
      //   is: value => value !== 0,
      //   then: Yup.string()
      //     .matches(/^[1-9]\d*$/, "Price must be a non-zero positive number")
      //     .required("Price is required when ticket is not free"),
      //   otherwise: Yup.string().notRequired() // No validation if ticketPrice is 'Free'
      // })
    });
  
    const getData = async (values) => {
  
      try {
        const value = await AsyncStorage.getItem("userInfo");
        const token = await AsyncStorage.getItem("userToken");
  
        if (value !== null && token !== null) {
          setUserInfo(JSON.parse(value));
          setUserToken(token);
  
          const formData = new FormData();
  
          formData.append("title", values.title);
          values.image.forEach((image) => {
            formData.append("image", {
              uri: image.uri,
              type: "image/jpeg",
              name: `${Date.now()}.jpeg`,
            });
          });
          formData.append("campus", values.campus);
          formData.append("content", values.content);
          formData.append("ticketPrice",  values.ticketPrice === "Free" ? 0: values.price);
          formData.append("venue", values.venue);
          formData.append("capacity", values.capacity);
          formData.append("date", values.date);
          formData.append("time", values.time);
          formData.append("endDate", values.endDate);
          formData.append("endTime", values.endTime);
          formData.append("isPaid", values.ticketPrice === "Free" ? false: true);
  
  
          const newToken = token;
  
          const config = {
            headers: {
              Authorization: `Bearer ${newToken}`,
              "content-type": "multipart/form-data",
            },
          };
          console.log(formData)
          if (component === "Event") {
            setLoading(true);
            await client
              .post(`/event/uploadEvent`, formData, config)
              .then((res) => {
                if (res.status === 200) {
                  navigation.dispatch(
                    CommonActions.navigate({
                      name: "Event",
                      params: {
                        screen: "EventScreen",
                      },
                    })
                  );
                  navigation.goBack();
                  // res is succesful, dispatch the user to event screen to see what he posted
                }
              })
              .catch((e) => {
                console.log(e)
  
        // if(e.response.status === 401 && e.response.data.success === false && e.response.data.msg === "Session Expired"){
          
        //       try{
        //         await getAccessToken()
        //         await getData()
   
        //       }catch(e){
        // setError(true)
        //     setErrorMessage(e.message === "Network Error" ? e.message : "Oops! Something went wrong. Please try again.")
        //       }
        //  } else{
        //    setError(true);
        //    setErrorMessage(
        //      e.message
        //        ? e.message
        //        : "Oops! Something went wrong. Please try again later."
     
        //        );
        //  }
  
  
        setError(true);
           setErrorMessage(
             e.message
               ? e.message
               : "Oops! Something went wrong. Please try again later."
     
               );
              })
              .finally(()=>{
                setLoading(false);
              })
          } else if (component === "Post") {
            setLoading(true);
            await client
              .post(`/news/addNews`, formData, config)
              .then((res) => {
                if (res.status === 200) {
                  // navigation.dispatch(StackActions.replace("Home"));
                  navigation.dispatch(
                    CommonActions.navigate({
                      name: "Home",
                      params: {
                        screen: "HomeScreen",
                      },
                    })
                  );
                  navigation.goBack();
                }
                // if res is succesful, dispatch the user to home screen to see what he posted
              })
              .catch((e) => {
  
                // if(e.response.status === 401 && e.response.data.success === false && e.response.data.msg === "Session Expired"){
               
                //       try{
                //         await getAccessToken()
                //         await getData()
           
                //       }catch(e){
           
                    
                // setError(true)
                //     setErrorMessage(e.message === "Network Error" ? e.message : "Oops! Something went wrong. Please try again.")
                //       }
           
                //  } else{
                //    setError(true);
                //    setErrorMessage(
                //      e.message
                //        ? e.message
                //        : "Oops! Something went wrong. Please try again later."
             
                //        );
                //  }
  
                     setError(true);
                   setErrorMessage(
                     e.message
                       ? e.message
                       : "Oops! Something went wrong. Please try again later."
             
                       );
  
              })
          }
        }
      } catch (e) {
        setError(true);
        setErrorMessage(
          e.message
            ? e.message
            : "Oops! Something went wrong. Please try again later."
        );
      }
      finally{
        setIsLoading(false)
      }
    };
  
    const Campus = [
      {
        label: "Main",
        value: "Main",
      },
      { label: "Iperu", value: "Iperu" },
  
      // the news guy is only meant to be able to post for his campus. this is to avoid unncessary mistakes
  
      // 	{label:`${userInfo?.campus}`, value:`${userInfo?.campus}`
      // }
    ];
  
    const pickImage = async (setFieldValue) => {
      try {
        // const permissionResult =
        //   await ImagePicker.requestMediaLibraryPermissionsAsync();
  
        // if (permissionResult.granted === false) {
        //   alert("Permission to access camera roll is required!");
        //   return;
        // }
  
        // No permissions request is necessary for launching the image library
  
        setIsLoading(true);
        const pickerResult = await ImagePicker.launchImageLibraryAsync({
          allowsMultipleSelection: true,
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1,
          // selectionLimit: 10, //for IOS 14+
        });
  
        if (!pickerResult.canceled) {
          const uris = pickerResult.assets.map((asset, index) => ({
            uri: asset.uri,
            id: index,
          }));
          setFieldValue("image", uris);
          setImage((previmage) => [...previmage, ...uris]);
        }
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
      }
    };
  
    const [mode, setMode] = useState("date");
    const [newMode, setNewMode] = useState("date");
  
    const [date, setDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [view, setView] = useState(false);
  
  
    const styles = StyleSheet.create({
      input: {
        height: 43,
        backgroundColor: theme.offwhite,
        borderRadius: 5,
        marginTop: 10,
        paddingLeft: 10,
        fontSize: 16,
        textAlign: "left",
        fontFamily: "Jakarta",
        width: width - 40,
        color:theme.black
      },
      venueInput: {
        height: 43,
        backgroundColor: theme.offwhite,
        borderRadius: 5,
        marginTop: 10,
        paddingLeft: 10,
        fontSize: 16,
        textAlign: "left",
        fontFamily: "Jakarta",
        width: width / 2.8,
      },
      checkbox: {
        alignSelf: "center",
        width: 20,
        height: 20,
      },
      label: {
        fontSize: 16,
      },
      checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
        paddingTop: 15,
        justifyContent: "space-between",
      },
      TextInput2: {
        borderWidth: 2,
        borderColor: theme.offwhite,
        width: width - 45,
        height: height / 4.3,
        // paddingBottom: 100,
        marginTop: 5,
        borderRadius: 5,
        fontFamily: "Jakarta",
        fontSize: 13,
        paddingLeft: 11,
        color:theme.black
      },
      dropdown: {
        margin: 15,
        width: width - 40,
        // width: width/2.8,
        // height: 50,
        height:43,
        top: 6,
        backgroundColor: theme.offwhite,
        borderRadius: 5,
        padding: 12,
        shadowColor: theme.black,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        right: 10,
      },
      icon: {
        marginRight: 5,
        color: "blue",
      },
      item: {
        padding: 17,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
      textItem: {
        flex: 1,
        fontSize: 16,
        fontFamily: "Jakarta",
        color: "gray",
      },
      placeholderStyle: {
        fontSize: 16,
        fontFamily: "JakartaSemiBold",
        color: theme.black,
      },
      selectedTextStyle: {
        fontSize: 16,
        color: theme.black,
        fontFamily: "Jakarta",
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
        fontFamily: "Jakarta",
      },
      error: {
        fontFamily: "Jakarta",
        fontSize: 10,
        color: "red",
        right: 35,
        position: "absolute",
        top: 5,
      },
    });
  
    return (
      // add status bar with the color
  
      <View style={{ alignSelf: "center", width: width - 40, paddingTop: 55 }}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity activeOpacity={1} onPress={() => navigation.goBack()}>
            <Back color={theme.darkgray} size={30} />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: "JakartaSemiBold",
              alignItems: "center",
              fontSize: 28,
              position: "absolute",
              left: 100,
              color:theme.black,
              top:-10
            }}
          >
            New {component}
          </Text>
        </View>
        <Formik
          initialValues={{
            content: "",
            capacity: "",
            title: "",
            image: [],
            campus: "",
            date: "",
            time: "",
            venue: "",
            endDate: "",
            endTime: "",
            ticketPrice: "",
            price:""
          }}
          onSubmit={getData}
          validationSchema={
            component === "Post" ? validationSchema : validationSchemaEvent
          }
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            resetForm
          }) => {
            const {
              title,
              image,
              content,
              campus,
              ticketPrice,
              venue,
              capacity,
              price,
            } = values;
            return (
              <ScrollView
                showsVerticalScrollIndicator={false}
                bounces={false}
                contentContainerStyle={{ height: height * 1.8 }}
              >
                <View style={{ top: -10 }}>
                  <FormInput
                    onChangeText={handleChange("title")}
                    onBlur={handleBlur("title")}
                    error={touched.title && errors.title}
                    value={title}
                    placeholder="Title"
                    TextInputStyle={styles.input}
                    maxLength={250}
                    placeholderTextColor ={theme.black}
                  />
  
                  <View style={{ top: 10 }}>
                    <Text
                      style={{
                        fontFamily: "JakartaSemiBold",
                        fontWeight: "500",
                        fontSize: 22,
                        color:theme.black
                      }}
                    >
                      Image
                    </Text>
                    <Text
                      style={{
                        fontWeight: "300",
                        fontSize: 11,
                        fontFamily: "Jakarta",
                        width: 0.9 * width,
                        color:theme.black
  
                      }}
                    >
                      You can only add a maximum of ten images per post
                    </Text>
                  </View>
                  <View
                    style={{
                      width: width - 40,
                      height: height / 3.8,
                      borderColor: theme.offwhite,
                      borderStyle: "dashed",
                      borderWidth: 2.5,
                      marginTop: 19,
                      borderRadius: 5,
                    }}
                  >
                    <View style={{ padding: 10, flexDirection: "row" }}>
                      <Text
                        style={{
                          fontSize: 16,
                          padding: 5,
                          fontFamily: "Jakarta",
                          color: theme.black,
                        }}
                      >
                        Upload Here
                      </Text>
                      {isLoading ? (
                        <View>
                          <ActivityIndicator
                            size="large"
                            color={theme.primary}
                          />
                        </View>
                      ) : (
                        <Pressable onPress={() => pickImage(setFieldValue)}>
                          <View
                            style={{
                              height: 30,
                              width: 30,
                              backgroundColor: theme.primary,
                              borderRadius: 25,
                              alignSelf: "center",
                              marginLeft: width - 200,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 30,
                                fontWeight: "300",
                                color: "black",
                                justifyContent: "center",
                                alignItems: "center",
                                fontFamily: "Jakarta",
                                position: "absolute",
                                left: 6,
                                top: -12,
                                color: theme.white,
                              }}
                            >
                              +
                            </Text>
                          </View>
                        </Pressable>
                      )}
                    </View>
  
                    {errors.image && touched.image && (
                      <Text
                        style={[
                          styles.error,
                          {
                            top: 35,
                            alignContent: "center",
                            fontSize: 10,
                            right: width / 4.5,
                          },
                        ]}
                      >
                        {errors.image}
                      </Text>
                    )}
  
                    <FlatList
                      data={image.slice(0, 10)}
                      // data={image}
                      horizontal
                      renderItem={({ item }) => (
                        <View style={{ width: 120, height: 130 }}>
                          <Image
                            source={{ uri: item.uri }}
                            style={{
                              width: 103,
                              height: 110,
                              left: 7,
                              marginHorizontal: 4,
                              borderRadius: 6,
                              resizeMode:
                                Platform.OS === "android" ? "cover" : "contain",
                            }}
                          />
                        </View>
                      )}
                      keyExtractor={(item) => item.uri}
                    />
                  </View>
  
                  {component === "Event" ? (
                    <View style={{ top: 10, padding: 3 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          paddingHorizontal: 3,
                        }}
                      >
                        <Text
                          style={{ fontFamily: "Jakarta", color: theme.black }}
                        >
                          Start Date
                        </Text>
                        <Text
                          style={{ fontFamily: "Jakarta", color: theme.black }}
                        >
                          Start Time
                        </Text>
                      </View>
  
                      {show && (
                        <DateTimePicker
                          value={date}
                          mode={mode}
                          is24Hour={false}
                          display="default"
                          onChange={(event, selectedDate) => {
                            setShow(false);
                            const currentDate = selectedDate || date;
                            setDate(currentDate);
                            const formattedDate =
                                currentDate.toLocaleDateString("en-GB", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                });
  
                            setFieldValue(
                              "date",
                              formattedDate
                            );
                            const formattedTime = currentDate
                              .toLocaleTimeString("en-US", {
                                hour: "numeric",
                                minute: "numeric",
                                hour12: true,
                              })
                              .replace(" ", "");
                            setFieldValue("time", formattedTime);
                          }}
                        />
                      )}
  
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          paddingHorizontal: 10,
                        }}
                      >
                        <View
                          style={[
                            styles.dateContainer,
                            {
                              justifyContent: "space-around",
                              flexDirection: "row",
                              right: 5,
                              width: width / 2.8,
                              height: 50,
                              backgroundColor: theme.offwhite,
                              borderRadius:5
                            },
                          ]}
                        >
                          {errors.date && touched.date && (
                            <Text style={[styles.error, { top: -33, right: 10 }]}>
                              {errors.date}
                            </Text>
                          )}
                          <Text
                            style={[
                              styles.textContainer,
                              { marginTop: 13, fontFamily: "Jakarta" },
                            ]}
                          >
                      {date.toLocaleDateString()}
                          </Text>
                          <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => {
                              setMode("date");
                              setShow(true);
                            }}
                          >
                            {Calendars}
                          </TouchableOpacity>
                        </View>
  
                        <View
                          style={[
                            styles.dateContainer,
                            {
                              justifyContent: "space-around",
                              flexDirection: "row",
                              right: -3,
                              width: width / 2.8,
                              height: 50,
                              backgroundColor: theme.offwhite,
                              borderRadius:5
  
                            },
                          ]}
                        >
                          {errors.time && touched.time && (
                            <Text style={[styles.error, { top: -33, right: 10 }]}>
                              {errors.time}
                            </Text>
                          )}
                          <Text
                            style={[
                              styles.textContainer,
                              { marginTop: 13, fontFamily: "Jakarta" },
                            ]}
                          >
                            {date.toLocaleTimeString()}
                          </Text>
                          <TouchableOpacity
                            onPress={() => {
                              setMode("time");
                              setShow(true);
                            }}
                          >
                            <Time size={25} />
                          </TouchableOpacity>
                        </View>
                      </View>
  
                      {/* for end Date and End Time */}
  
                      <View style={{ top: 10 }}>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingHorizontal: 10,
                          }}
                        >
                          <Text style={{ fontFamily: "Jakarta", color:theme.black }}>End Date</Text>
                          <Text style={{ fontFamily: "Jakarta", color:theme.black }}>End Time</Text>
                        </View>
  
                        {view && (
                          <DateTimePicker
                            value={endDate}
                            mode={newMode}
                            is24Hour={false}
                            display="default"
                            onChange={(event, selectedDate) => {
                              setView(false);
                              const currentDate = selectedDate || endDate;
                              setEndDate(currentDate);
                                
                              const formattedDate =
                                currentDate.toLocaleDateString("en-GB", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                });
  
                              setFieldValue(
                                "endDate",
                              formattedDate
                              );
                              const formattedTime = currentDate
                                .toLocaleTimeString("en-US", {
                                  hour: "numeric",
                                  minute: "numeric",
                                  hour12: true,
                                })
                                .replace(" ", "");
  
                              setFieldValue("endTime", formattedTime);
                            }}
                          />
                        )}
  
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingHorizontal: 10,
                          }}
                        >
                          <View
                            style={[
                              styles.dateContainer,
                              {
                                justifyContent: "space-around",
                                flexDirection: "row",
                                right: 5,
                                width: width / 2.8,
                                height: 50,
                                backgroundColor: theme.offwhite,
                              borderRadius:5
  
                              },
                            ]}
                          >
                            {errors.endDate && touched.endDate && (
                              <Text
                                style={[styles.error, { top: -33, right: 20 }]}
                              >
                                {errors.endDate}
                              </Text>
                            )}
                            <Text
                              style={[
                                styles.textContainer,
                                { marginTop: 13, fontFamily: "Jakarta" },
                              ]}
                            >
                              {endDate.toLocaleDateString()}
                            </Text>
                            <TouchableOpacity
                              activeOpacity={0.6}
                              onPress={() => {
                                setNewMode("date");
                                setView(true);
                              }}
                            >
                              {Calendars}
                            </TouchableOpacity>
                          </View>
  
                          <View
                            style={[
                              styles.dateContainer,
                              {
                                justifyContent: "space-around",
                                flexDirection: "row",
                                right: -3,
                                width: width / 2.8,
                                height: 50,
                                backgroundColor: theme.offwhite,
                              borderRadius:5
  
                              },
                            ]}
                          >
                            {errors.endTime && touched.endTime && (
                              <Text
                                style={[styles.error, { top: -33, right: 20 }]}
                              >
                                {errors.endTime}
                              </Text>
                            )}
                            <Text
                              style={[
                                styles.textContainer,
                                { marginTop: 13, fontFamily: "Jakarta" },
                              ]}
                            >
                              {endDate.toLocaleTimeString()}
                            </Text>
                            <TouchableOpacity
                              onPress={() => {
                                setNewMode("time");
                                setView(true);
                              }}
                            >
                              <Time size={25} />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
  
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          paddingRight: 5,
                          top: 18,
                        }}
                      >
                        {errors.ticketPrice && touched.ticketPrice && (
                          <Text
                            style={{
                              color: "red",
                              fontFamily: "Jakarta",
                              fontSize: 10,
                              top: -8,
                              alignSelf: "center",
                              position: "absolute",
                              left: 50,
                            }}
                          >
                            {errors.ticketPrice}
                          </Text>
                        )}
  
                        {/* Dropdown */}
  
                        {/* <FormInput
                          onChangeText={handleChange("ticketPrice")}
                          onBlur={handleBlur("ticketPrice")}
                          // error={touched.ticketPrice && errors.ticketPrice}
                          value={ticketPrice}
                          keyboardType="numeric"
                          placeholder="Price"
                          TextInputStyle={[styles.venueInput, { right: 11 }]}
                        /> */}
  
  <View>
    <Dropdown
      style={[styles.dropdown, {width: width/2.8, top: -4, borderRadius: 5}]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      itemTextStyle={styles.textItem}
      data={[
        { label: 'Free', value: 'Free' },
        { label: 'Type', value: 'Type' },
      ]}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Price"
      value={ticketPrice}
      onChangeText={(value) => handleChange("ticketPrice")}
      onChange={(value) => setFieldValue("ticketPrice", value.value)}
    />
    
    {values.ticketPrice === 'Type' && (
      <>
        {values.ticketPrice === "Type" && errors.price && touched.price && (
          <Text
            style={{
              color: "red",
              fontFamily: "Jakarta",
              fontSize: 10,
              top: 5,
              alignSelf: "center",
              // position: "absolute",
              right: -70,
            }}
          >
            {values.ticketPrice === "Type" && errors.price}
          </Text>
        )}
        <FormInput
          onChangeText={handleChange("price")}
          onBlur={handleBlur("price")}
          // error={touched.ticketPrice && errors.ticketPrice}
          value={price}
          keyboardType="numeric"
          placeholder="Enter Price"
          TextInputStyle={[styles.venueInput, {width: width - 60, left: 3, top: -6}]}
        />
      </>
    )}
  </View>
  
                        {errors.venue && touched.venue && (
                          <Text
                            style={{
                              color: "red",
                              fontFamily: "Jakarta",
                              fontSize: 10,
                              top: -8,
                              alignSelf: "center",
                              position: "absolute",
                              right: 8,
                            }}
                          >
                            {errors.venue}
                          </Text>
                        )}
                        <FormInput
                          onChangeText={handleChange("venue")}
                          onBlur={handleBlur("venue")}
                          // error={touched.venue && errors.venue}
                          value={venue}
                          placeholder="Venue"
                          TextInputStyle={[styles.venueInput, {right: values.ticketPrice === "Type" ?120 : null}]}
                        />
                      </View>
  
                      <View
                        style={{
                          marginLeft: 5,
                          marginTop: -10,
                        }}
                      >
                       
                       {errors.capacity && touched.capacity && (
                          <Text
                            style={{
                              color: "red",
                              fontFamily: "Jakarta",
                              fontSize: 10,
                              top: 35,
                              alignSelf: "center",
                              position: "absolute",
                              left:13,
                            }}
                          >
                            {errors.capacity}
                          </Text>
                        )}
  
                                 <View style={{top:20}}>
                        <FormInput
                          onChangeText={handleChange("capacity")}
                          onBlur={handleBlur("capacity")}
                          keyboardType="numeric"
                          value={capacity}
                          placeholder="Capacity"
                          TextInputStyle={[styles.venueInput, {width:width*0.84}]}
                        />
                        </View>
                      </View>
                    </View>
                  ) : null}
  
                  <View style={{ marginTop: 30 }}>
                    <Text
                      style={{
                        fontSize: 22,
                        paddingTop: 10,
                        fontFamily: "JakartaSemiBold",
                        color:theme.black
                      }}
                    >
                      Content
                    </Text>
                    {errors.content && touched.content && (
                      <Text
                        style={{
                          color: "red",
                          fontFamily: "Jakarta",
                          fontSize: 10,
                          top: -13,
                          alignSelf: "center",
                        }}
                      >
                        {errors.content}
                      </Text>
                    )}
                    <TextInput
                      multiline
                      style={styles.TextInput2}
                      placeholder="Type Something here..."
                      onChangeText={handleChange("content")}
                      onBlur={handleBlur("content")}
                      // error={touched.content && errors.content}
                      value={content}
                      placeholderTextColor={theme.black}
                    />
  
                    <View>
                      {errors.campus && touched.campus && (
                        <Text style={styles.error}>{errors.campus}</Text>
                      )}
                      <Dropdown
                        style={[styles.dropdown, {width:width-50}]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        itemTextStyle={styles.textItem}
                        data={Campus}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Campus"
                        value={campus}
                        onChangeText={handleChange("campus")}
                        onChange={(value) => setFieldValue("campus", value.value)}
                        //   renderLeftIcon={() => (
                        //     <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                        //   )}
                      />
                    </View>
  
    
  
  

                    {loading ? (
                      <View>
                        <ActivityIndicator size="large" color={theme.primary} />
                      </View>
                    ) : (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={handleSubmit}
                      >
                        <View
                          style={{
                            backgroundColor: theme.primary,
                            width: 113,
                            justifyContent: "center",
                            alignSelf: "center",
                            alignItems: "center",
                            borderRadius: 8,
                            marginTop: 13,
                            height: 37,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: "500",
                              color: theme.whites,
                              fontFamily: "JakartaSemiBold",
                            }}
                          >
                            Post
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
  
                {error && (
                  <ErrorButton
                    onPress={() => {
                      setError(false);
                    }}
                    message={errorMessage}
                    style={{ paddingTop: height / 22 }}
                    color={theme.red}
                    borderRadius={5}
                    bgcolor={theme.primary}
                  />
                )}
              </ScrollView>
            );
          }}
        </Formik>
      </View>
    );
  };
  
  
  