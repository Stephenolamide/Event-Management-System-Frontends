import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { Back } from '../constants/icons'
import { ThemeContext } from '../context/ThemeContext'
import { useNavigation } from '@react-navigation/native'

const CustomBackButtonWithName = ({
  name,
  style,
  backPosition,
  textStyle,
  iconStyle,
  nav,
  bgColor,
}) => {
  const { theme } = useContext(ThemeContext);
  const styles = StyleSheet.create({
    text: {
      fontSize: 13,
      fontFamily: "Jakarta",
      color: theme.addTimetable,
      top: 8,
    },
    container: { flexDirection: "row", alignSelf: "center", paddingBottom: 10 },
    iconStyle: {
      width: 40,
      height: 40,
      borderRadius: 40,
      backgroundColor: bgColor ? bgColor : "",
      alignItems: "center",
      justifyContent: "center",
      top: 9,
      right: backPosition ? backPosition : 50,
    },
  });

  const navigation = useNavigation();

  return (
    <View>
      <View style={[styles.container, style]}>
        <Back size={30} style={[styles.iconStyle, iconStyle]} onPress={()=>navigation.goBack()} color={"#99a2ad"}/>
      <Text style={[styles.text, {fontSize:24, alignSelf:"center", fontFamily:"JakartaSemiBold", color:theme.todoText}, textStyle]}>{name}</Text>
        </View>
    </View>
  );
};

export default CustomBackButtonWithName;
