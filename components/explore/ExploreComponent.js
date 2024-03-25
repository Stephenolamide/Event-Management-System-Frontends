import {  Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { getTheme } from '../../context/ThemeContext'
import Explore from '../../components/explore/Explore'
import { width } from '../../utils/dimensionUtils'
import { getContext } from '../../context/AuthContext'
import ClickComponent from '../ClickComponent'


const ExploreComponent = () => {
    const {theme} = getTheme()

    const {userLocationOrigin} = getContext()
  return (
    <View style={{paddingLeft:10, }}>
      
    <Text style={{fontFamily:"Poppins", fontSize:18, alignSelf:"center"}}> {userLocationOrigin?.currentStateAdress}</Text>

{/* search bar */}

{/* <View style={{height:50, width:width*0.9, borderColor:theme.black, borderWidth:.5, alignSelf:"center", borderRadius:20, top:20}}>
<TextInput
placeholder='search'
placeholderTextColor={theme.black}
style={{right:-20}}
/>
</View> */}
<ClickComponent first={"Newest"} second ={"Upcoming"}/>
<Text style={{fontFamily:"PoppinsSemiBold", fontSize:18, color:theme.black, left:10, paddingTop:25}}>Today</Text>
  
<Explore screen={"ExploreScreen"}/>
  </View>
  )
}





  export default ExploreComponent