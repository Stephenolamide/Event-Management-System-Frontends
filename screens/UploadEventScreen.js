import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Form } from '../components/FormUpload'

const UploadEventScreen = () => {
  return ( 
    <View>
      <Form component={"Event"}/>
    </View>
  )
}
 
export default UploadEventScreen

const styles = StyleSheet.create({})