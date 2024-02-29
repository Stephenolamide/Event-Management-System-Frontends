import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { FONTFAMILY, FONTSIZE, SPACING } from '../../constants/theme';
import {ReusableIcon } from '../../constants/icons';

const SettingComponent = (props) => {
  return (
<TouchableOpacity onPress={()=> NavigationHelpersContext()}>
    <View style={styles.container}>
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
</TouchableOpacity>
  );
};

export default SettingComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: SPACING.space_20,
  },
  settingContainer: {
    flex: 1,
  },
  iconStyle: {
    color: theme.White,
    fontSize: FONTSIZE.size_24,
    paddingHorizontal: SPACING.space_20,
  },
  iconBG: {
    justifyContent: 'center',
  },
  title: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: 18,
    color: theme.White,
  },
  subtitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: theme.WhiteRGBA15,
  },
});
