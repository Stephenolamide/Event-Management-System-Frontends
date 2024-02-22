import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
const {width, height} = Dimensions.get("screen")

const ImageCard = () => {
  return (
    <View>
      <View style={{width:width*0.89, height:height*0.43, backgroundColor:"transparent"}}>


        <View style={{top:30}}>
        <Text>Cubana Rave</Text>
        <Text>Victoria Gardens 7.00pm</Text>
        </View>


      </View>
    </View>
  )
}

export default ImageCard

const styles = StyleSheet.create({})