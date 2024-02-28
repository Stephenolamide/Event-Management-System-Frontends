import {  Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { getTheme } from '../../context/ThemeContext'
import Explore from '../../components/explore/Explore'
import { width } from '../../utils/dimensionUtils'
import { getContext } from '../../context/AuthContext'


const ExploreComponent = () => {
    const {theme} = getTheme()

    const {userLocationOrigin} = getContext()
  return (
    <View style={{paddingLeft:10, top:30}}>
      
    <Text style={{fontFamily:"Poppins", fontSize:18, alignSelf:"center"}}> {userLocationOrigin?.currentStateAdress}</Text>

{/* search bar */}

<View style={{height:50, width:width*0.9, backgroundColor:"grey", alignSelf:"center", borderRadius:20, top:20}}>
<TextInput
placeholder='search'
placeholderTextColor={"white"}
style={{right:-20}}
/>
</View>
<ClickComponent/>
<Text style={{fontFamily:"Poppins3", fontSize:18, color:theme.black, left:10, paddingTop:10}}>Today</Text>
  
<Explore/>
  </View>
  )
}


const ClickComponent = () => {
  const [clicked, setClicked] = useState(false);
  const [userClick, setUserClick] = useState(false);
  
  const handleNewestClick = () => {
    setClicked(true);
    setUserClick(false);
  };
  
  const handleUpcomingClick = () => {
      setUserClick(true);
      setClicked(false);
    };
  
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 33 }}>
        <TouchableOpacity  onPress={handleNewestClick}>
          <Text style={{ fontFamily: 'Poppins', fontSize: 16, color: clicked ? 'blue' : 'black', textDecorationLine: clicked ? "underline":"none" }}>Newest</Text>
        </TouchableOpacity>
  
        <TouchableOpacity  onPress={handleUpcomingClick}>
          <Text style={{ fontFamily: 'Poppins', fontSize: 16, color: userClick ? 'blue' : 'black', textDecorationLine: userClick ? "underline":"none"}}>Upcoming</Text>
        </TouchableOpacity>
      </View>
    );
  };


  export default ExploreComponent