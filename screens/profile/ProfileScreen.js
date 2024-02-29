
import * as React from 'react';
import {Text, View, StyleSheet, StatusBar, Image} from 'react-native';
import { theme, SPACING } from '../../constants/theme';
import { getTheme } from '../../context/ThemeContext';

const ProfileScreen = ({navigation}) => {
  const {theme} = getTheme()
  const styles = getStyles(theme)
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.appHeaderContainer}>
        <AppHeader
          name="close"
          header={'My Profile'}
          action={() => navigation.goBack()}
        />
      </View>

      <View style={styles.profileContainer}>
        <Image
          source={require('../assets/image/avatar.png')}
          style={styles.avatarImage}
        />
        <Text style={styles.avatarText}>John Doe</Text>
      </View>

      <View style={styles.profileContainer}>
        <SettingComponent
          icon="user"
          heading="Account"
          subheading="Edit Profile"
          subtitle="Change Password"
          screenName =""
        />
        <SettingComponent
          icon="setting"
          heading="Settings"
          subheading="Theme"
          subtitle="Permissions"
          screenName =""
        />
        <SettingComponent
          icon="ticket"
          heading="Offers & Refferrals"
          subheading="Offer"
          subtitle="Refferrals"
          screenName =""
        />
        <SettingComponent
          icon="info"
          heading="About"
          subheading="About Movies"
          subtitle="more"
          screenName =""
        />
      </View>
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: theme.black,
  },
  appHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_20 * 2,
  },
  profileContainer: {
    alignItems: 'center',
    padding: SPACING.space_36,
  },
  avatarImage: {
    height: 80,
    width: 80,
    borderRadius: 80,
  },
  avatarText: {
    fontFamily: "Poppins3",
    fontSize: 16,
    marginTop: SPACING.space_16,
    color: theme.white,
  },
});

export default ProfileScreen;
