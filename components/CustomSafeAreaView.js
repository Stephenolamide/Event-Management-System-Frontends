import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'

const CustomSafeAreaView = ({children, style}) => {
  return (
   <SafeAreaView style={style}>
    {children}
   </SafeAreaView>
  )
}

export default CustomSafeAreaView

const styles = StyleSheet.create({})