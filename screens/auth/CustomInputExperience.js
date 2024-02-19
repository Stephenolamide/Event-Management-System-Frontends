import { Keyboard, StyleSheet, TouchableWithoutFeedback, ScrollView, Platform, KeyboardAvoidingView} from 'react-native'
import React from 'react'

const CustomInputExperience = ({children, contentContainerStyle, style, key}) => {
  return (
    <KeyboardAvoidingView
        enabled
        style={style}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        key={key}
      >
        <ScrollView bounces={false} showsVerticalScrollIndicator={false} contentContainerStyle={contentContainerStyle}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {children}
           </TouchableWithoutFeedback>
        </ScrollView>
        </KeyboardAvoidingView>
  )
}

export default CustomInputExperience

const styles = StyleSheet.create({})



// Thank You Jesus
// a good benefit of react. writing custom code and not having to repeat yourself, making it as dynamic as posssible
