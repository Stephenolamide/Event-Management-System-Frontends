import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ClickComponent from '../ClickComponent'
import CustomSafeAreaView from '../CustomSafeAreaView'
import ProfileContainer from '../ProfileContainer'
import { Divider } from 'react-native-elements'
import { width } from '../../utils/dimensionUtils'
import Home from './Home'
import BottomSheet from '../BottomSheet'
import { useNavigation } from '@react-navigation/native'

const HomeComponent = () => {
  const navigation = useNavigation()
  return (
<CustomSafeAreaView style={{top:30}}>
    <View 
    style={{left:24}}
    >
      <View style={{flexDirection:"row", justifyContent:"space-around"}}>
      <Text style={{fontFamily:"PoppinsMedium", fontSize:30, right:30}}>BuzzFeed</Text>
     <ProfileContainer height={36} width={36} style={{top:2, left:-10}} onPress={()=>navigation.navigate("UserPostsScreen")}/>
      </View>
      <View style={{top:-7}}>
<ClickComponent first={"Following"} second ={"Latest"} styles={{right:40, top:-35}}/>
<Divider style={{bottom:26, right:20}}/>
      </View>
      <Home screen={"HomeScreen"}/>

      <BottomSheet
      activeHeight={100}
      style={{width:width}}
      />
    </View>
</CustomSafeAreaView>
  )
}

export default HomeComponent

const styles = StyleSheet.create({})