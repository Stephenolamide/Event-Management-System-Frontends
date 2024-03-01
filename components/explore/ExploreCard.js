import { Dimensions, StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, Image, Platform} from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { width, height } from '../../utils/dimensionUtils'
import CustomSafeAreaView from '../CustomSafeAreaView'
import { getTheme } from '../../context/ThemeContext'
import { useNavigation } from '@react-navigation/native'
import CustomFlatlist from '../CustomFlatlist'
import { ReusableIcon } from '../../constants/icons'
import ProfileContainer from '../ProfileContainer'
import BottomSheet from '../BottomSheet'


const imageH = height*0.3
const imageW = width * 0.89


const ExploreCard = ({event, screen, style}) => {
  return (

<>
<Events event ={event} screen={screen} style={style}/>
</>
  )
}



const Events = ({ event, screen, style}) => {
  const navigation = useNavigation();
  
  const { theme } = getTheme();
  
  
  
  
  
  return (
    // <CustomSafeAreaView style={[{ padding:10, top:-10}, style]}>

    <View 
    style={{height:height*0.52,}}
    >
{screen === "HomeScreen" &&
 <View style ={{flexDirection:"row", top:5}}>
  <ProfileContainer width={40} height={40} style={{top:-10}}/>

  <View style={{left:10,top:-8 }}>
<Text style={{fontFamily:"Poppins-SemiBold"}}>Cubana cafe</Text>
<Text style={{fontFamily:"Poppins-Light"}}>16m ago</Text>
</View>
  </View>
 }

 <View 
 style={{bottom: screen === "HomeScreen" && 30 }}
 >
      <EventImage event={event} navigation={navigation} theme={theme} screen={screen}/>
      { screen !== "HomeScreen" && <EventItems event={event} theme={theme} screen={screen}/>}
      {screen === "HomeScreen" && <EventFooter event={event} theme={theme} screen={screen}/>}
 </View>
 </View>
    // </CustomSafeAreaView>
  );
};

const EventImage = ({ event, navigation, theme, screen }) => {
 
const renderItem =({ item }, id) => {
  return (
  <View
  style={{
    // alignSelf: "center",
    height: imageH,
    width: imageW*1.13,
    // borderRadius:20,
    backgroundColor:"transparent"
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
            alignContent:"center"
        }}
        key={id}
        // source={{ uri: item }}

        source={require("../../assets/images/stephen.jpg")}
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

    <
    >

      <CustomFlatlist
        data={images}
        horizontal ={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(index) => index.toString()}
        renderItem={renderItem}
        pagingEnabled ={true}
      />
    </>
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
            fontFamily: "Poppins-Bold",
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
            fontFamily: "Poppins-SemiBold",
          }}
        >
          {/* {formattedDMonth}  */} DEC
        </Text>
      </View>
    </>
  );
};


const EventFooter = ()=>{
  const [bottomSheetActive, setBottomSheetActive] = useState(false)

  const bottomSheetRef = useRef()
  const {theme} = getTheme()
  const pressHandler = useCallback(() => {
    console.log("djsdbshds")
    console.log(bottomSheetRef)

    // the bittomsheetref current shouldm't be undefined
    bottomSheetRef?.current?.expand();
    setBottomSheetActive(true)
  }, []);



  return(

    <>
    <View style={{width:imageW, paddingTop:7, }}>
<Text numberOfLines={2} ellipsizeMode='tail' style={{fontFamily:"Poppins-Light"}}>Join me for my birthday this evening at 8:30pm dsbhdsdsgdhkdgdhkfghdfghdfdhgfdhfdghfdhgdgfdhgk</Text>

<View style={{flexDirection:"row", justifyContent:"space-evenly", right:55, paddingTop:10}}>
 <RenderIconWithNumber name={"heart"} number ={113}/>
 <RenderIconWithNumber name={"comment"} number={36}
  // onPress={}
  onPress={()=>pressHandler()} // call the comment modal here
  />  
 {/* when you click on the above it should open a modal that would show comments */}
 <RenderIconWithNumber name={"share"}/>
</View>
    </View> 
    </>
  )
}


const RenderIconWithNumber = ({name, number, onPress})=>{


  return(
    <>
    <View style={{flexDirection:"row"}}>
      <ReusableIcon name={name} size={20} onPress={onPress}/>
      <Text style={{left:5}}>{number}</Text>
    </View>
    </>
  )
}



const BottomSheetDisplay =()=>{
  return(
    <BottomSheet
ref={bottomSheetRef}
activeHeight ={1000}
backgroundColor={"red"}
/>
  )
}

export default ExploreCard