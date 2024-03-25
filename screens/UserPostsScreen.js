import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6'
import ProfileContainer from '../components/ProfileContainer'
import Explore from '../components/explore/Explore'
import HomeScreen from './home/HomeScreen'
import Home from '../components/home/Home'
import { height, width } from '../utils/dimensionUtils'

const UserPostsScreen = () => {
  return (
    <View style={{paddingLeft:15, paddingTop:10}}>
        
        <View style={{}}>
          <View>
        <View style={{flexDirection:"row", justifyContent:"space-evenly"}}>
              <ProfileContainer height={85} width={85} style={{top:6, right:40}}/>
              <View style={{flexDirection:"row", justifyContent:"space-between", top:40}}>
                <View style={{width:35, height:35,borderRadius:35, borderColor:"black", borderWidth:1}}>
                <FontAwesome6Icon name='message' size={15} style={{top:10, left:8}}/>
                </View>

                <View style={{borderColor:"black", borderWidth:1, width:100, height:35, borderRadius:15, left:7}}>
                    <Text style={{left:14, top:6}}>+ Follow</Text>
                </View>

              </View>
        </View>
      <Text style={{fontFamily:"PoppinsBold", fontSize:23}}>Cubana Cafe</Text>
      <Text style={{fontFamily:"PoppinsMedium", fontSize:10}}>@cubana.org</Text>
      <Text style={{fontFamily:"PoppinsMedium", fontSize:10, width:335}}>We are your lovely cafe and food shop. we sell varieties and is very good at what we do</Text>
      <Text style={{fontFamily:"PoppinsMedium", fontSize:10, color:"#9D0BC1"}}>www.cubana.org</Text>
        </View>

  
      <ScrollView contentContainerStyle={{height:height*10000}}>
  <View style={{top:20}}>
      <Text style={{color:"#290333", fontFamily:"PoppinsBold", fontSize:20}}>Latest Post</Text>
      {/* //Posts being displayes */}

      <View style={{}}>
      <Explore screen={"UserPostsScreen"}/>

      </View>


      <Text style={{fontFamily:"PoppinsBold", fontSize:18, color:"#290333", top:20}}>More Posts</Text>
      {/* / show other posts from the user */}
      <View style={{top:20}}>
      <Explore screen={"ExploreScreen"}/>

      </View>

  </View>
  </ScrollView>
  </View>

    </View>
  )
}

export default UserPostsScreen

const styles = StyleSheet.create({})