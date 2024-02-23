import { Dimensions, StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, Image, Platform} from 'react-native'
import React from 'react'
import { width, height } from '../../utils/dimensionUtils'
import CustomSafeAreaView from '../CustomSafeAreaView'
import { getTheme } from '../../context/ThemeContext'
import { useNavigation } from '@react-navigation/native'
import CustomFlatlist from '../CustomFlatlist'



const ImageCard = ({event}) => {
  return (
<Events event ={event}/>
  )
}

export default ImageCard


const Events = ({ event }) => {
  const navigation = useNavigation();

  const { theme } = getTheme();



 

  return (
    <CustomSafeAreaView style={{top:20, padding:10}}>
      <EventImage event={event} navigation={navigation} theme={theme} />
      <EventItems event={event} theme={theme} />
    </CustomSafeAreaView>
  );
};

const EventImage = ({ event, navigation, theme }) => {
  const imageH = height*0.3
const imageW = width * 0.89



const renderItem =({ item }, id) => {
  return (
  <View
  style={{
    alignSelf: "center",
    height: imageH,
    width: imageW,
  }}
  >
    <TouchableOpacity
      activeOpacity={1}
      // onPress={() =>
      //   navigation.navigate("EventDetails", {
      //     image: event.images,
      //     title: event.title,
      //     date: event.date,
      //     time: event.time,
      //     venue: event.venue,
      //     ticketPrice: event.ticketPrice,
      //     content: event.content,
      //   })
      // }
    >
      <Image
        style={{
          height: imageH,
          width: imageW,
          borderRadius: 20,
          resizeMode:
            Platform.OS === "android" ? "cover" : "stretch",
          alignSelf: "center",
        }}
        key={id}
        // source={{ uri: item }}

        source={require("../../assets/busa.png")}
      />
    </TouchableOpacity>
  </View>
  )
}

const images =[
  "djsdjsdjs.png",
  "ddjdjdjdsdsdsj.jpg",
  "ddjdjdjdhsdhsbddj.jpg",
  "djsdjsdbhsdhsdhssdjs.png",

]
  return (
        <CustomFlatlist
          data={images}
          horizontal ={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(index) => index.toString()}
          renderItem={renderItem}
           pagingEnabled ={true}
        />
  );
};

const EventItems = ({ event, theme }) => {
  // const newDate = event.date;
  // const changedDate = moment(newDate, "DD/MM/YYYY"); // parse the date string using the specified format

  // const formattedDay = changedDate.format("DD"); // format the date as "Friday, 17 February"
  // const formattedDMonth = changedDate.format("MMM");

  return (
    <>
      <View
        style={{
          width: width * 0.16,
          height: height * 0.09,
          borderRadius: 20,
          backgroundColor: theme.white,
          position: "absolute",
          right: 40,
          top: 20,
        }}
      >
        <Text
          style={{
            alignSelf: "center",
            fontWeight: "800",
            paddingTop: 5,
            fontSize: 27,
            fontFamily: "Poppins2",
            color: theme.black,
          }}
        >
          {/* {formattedDay} */} 17
        </Text>
        <Text
          style={{
            fontWeight: "600",
            fontSize: 14,
            color: theme.offgray,
            alignSelf: "center",
            bottom: 5,
            fontFamily: "Poppins3",
          }}
        >
          {/* {formattedDMonth}  */} DEC
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({})