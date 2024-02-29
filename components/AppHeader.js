import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  BORDERRADIUS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../constants/theme';
import { getTheme } from '../context/ThemeContext';
import { ReusableIcon } from '../constants/icons';

const AppHeader = (props) => {
 const {theme} = getTheme()
 const styles = getStyles(theme)

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconBG} onPress={() => props.action()}>
        <ReusableIcon name={props.name} style={styles.iconStyle} />
      </TouchableOpacity>
      <Text style={styles.headerText}>{props.header}</Text>
      <View style={styles.emptyContainer}></View>
    </View>
  );
};

const getStyles =(theme)=> StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    color: theme.white,
    fontSize: FONTSIZE.size_24,
  },
  headerText: {
    flex: 1,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_20,
    textAlign: 'center',
    color: theme.white,
  },
  emptyContainer: {
    height: SPACING.space_20 * 2,
    width: SPACING.space_20 * 2,
  },
  iconBG: {
    height: SPACING.space_20 * 2,
    width: SPACING.space_20 * 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: theme.primaryblue,
  },
});

export default AppHeader;
