
import * as React from "react"
import {Text, View, StyleSheet, StatusBar, Image} from 'react-native';
import { SPACING } from '../../constants/theme';
import { ThemeContext, getTheme } from '../../context/ThemeContext';
import AppHeader from '../../components/AppHeader';
import SettingComponent from '../../components/profile/SettingComponent';

const ProfileScreen = ({navigation}) => {
  const {theme} = React.useContext(ThemeContext)

  console.log(theme)
  const styles =  StyleSheet.create({
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
      fontFamily: "Poppins-SemiBold",
      fontSize: 16,
      marginTop: SPACING.space_16,
      color: theme.white,
    },
  });



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
          source={require('../../assets/images/stephen.jpg')}
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



export default ProfileScreen;
