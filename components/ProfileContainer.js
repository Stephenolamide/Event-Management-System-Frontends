import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { getTheme } from '../context/ThemeContext'
import { SPACING } from '../constants/theme'

const ProfileContainer = ({name, height, width, style, onPress}) => {

const {theme} = getTheme()
    const styles = StyleSheet.create({
        profileContainer: {
            alignItems: 'center',
            padding: 4,
            top:14
          },
          avatarImage: {
            height: height,
            width: width,
            borderRadius: 80,
          },
          avatarText: {
            fontFamily: "PoppinsSemiBold",
            fontSize: 16,
            marginTop: SPACING.space_16,
            color: theme.black,
          },
    })
  return (
    <View style={[styles.profileContainer, style]} onTouchEnd={onPress}>
    <Image
      source={require('../assets/images/stephen.jpg')}
      style={styles.avatarImage}
    />
   {name!=="" && <Text style={styles.avatarText}>{name}</Text>}
  </View>
  )
}

export default ProfileContainer

