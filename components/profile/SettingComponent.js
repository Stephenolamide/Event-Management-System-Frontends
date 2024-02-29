import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { FONTFAMILY, FONTSIZE, SPACING } from '../../constants/theme';
import {ReusableIcon } from '../../constants/icons';
import customNavigation from '../../utils/navigationUtils';
import { getTheme } from '../../context/ThemeContext';



const SettingComponent = (props) => {

  const {navigate} = customNavigation()

const {theme} = getTheme()
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingVertical: SPACING.space_20,
    },
    settingContainer: {
      flex: 1,
    },
    iconStyle: {
      color: theme.black,
      fontSize: FONTSIZE.size_24,
      paddingHorizontal: SPACING.space_20,
    },
    iconBG: {
      justifyContent: 'center',
    },
    title: {
      fontFamily: FONTFAMILY.poppins_medium,
      fontSize: 18,
      color: theme.black,
    },
    subtitle: {
      fontFamily: FONTFAMILY.poppins_regular,
      fontSize: FONTSIZE.size_14,
      color: theme.black,
    },
  });
  
  return (
    <View style={styles.container} onTouchEnd={()=>navigate(props.screenName)}>
      <View>
        <ReusableIcon name={props.icon} style={styles.iconStyle} />
      </View>
      <View style={styles.settingContainer}>
        <Text style={styles.title}>{props.heading}</Text>
        <Text style={styles.subtitle}>{props.subheading}</Text>
        <Text style={styles.subtitle}>{props.subtitle}</Text>
      </View>
      <View style={styles.iconBG}>
        <ReusableIcon name={'arrow-right'} style={styles.iconStyle} />
      </View>


    </View>
  );
};

export default SettingComponent;

