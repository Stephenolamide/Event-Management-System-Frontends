import {  Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { height, width } from '../../utils/dimensionUtils'
import ImageCard from './ImageCard'
import { getTheme } from '../../context/ThemeContext'
import HomeComponent from './HomeComponent'


const Home = () => {

    const {theme} = getTheme()
  return (
    <View style={{paddingLeft:10, top:30}}>
      
    <Text style={{fontFamily:"Poppins", fontSize:18, alignSelf:"center"}}> Lagos, Nigeria</Text>

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
   <HomeComponent/>

  </View>
  )
}

export default Home

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
          <Text style={{ fontFamily: 'Poppins', fontSize: 16, color: clicked ? 'blue' : 'black' }}>Newest</Text>
        </TouchableOpacity>
  
        <TouchableOpacity  onPress={handleUpcomingClick}>
          <Text style={{ fontFamily: 'Poppins', fontSize: 16, color: userClick ? 'blue' : 'black' }}>Upcoming</Text>
        </TouchableOpacity>
      </View>
    );
  };
  