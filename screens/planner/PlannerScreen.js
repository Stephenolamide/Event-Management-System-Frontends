import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import { FormSubmitBtn } from '../../components/FormSubmitBtn'
import { width } from '../../utils/dimensionUtils'
import LottieView from 'lottie-react-native'
import { useNavigation } from '@react-navigation/native'

const PlannerScreen = () => {
    const {theme} = useContext(ThemeContext)

    const navigation = useNavigation()
  return (
    <View style={{alignSelf:"center", left:10}}>

        <LottieView
        source={require("../../assets/animations/campaign.json")}
        style={{width:350, height:350}}
        loop
        autoPlay
        />

        <View style={{top:50}}>

      <Text style={{fontFamily:"PoppinsBold", color:theme.black, fontSize:20}}>Event Scheduler</Text>
      <Text style={{fontFamily:"PoppinsLight", fontSize:12, width:width*0.89}}>Create a virtual schedule to manage every task you would be preparing for in terms of the event</Text>
        </View>

      <FormSubmitBtn title={"Create Schedule"} style={{width:width*0.89, top:100, right:10}} onPress={()=>navigation.navigate("EventSchedulerScreen")}/>
    </View>
  )
}

export default PlannerScreen

const styles = StyleSheet.create({})