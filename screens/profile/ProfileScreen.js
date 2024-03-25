
import * as React from "react"
import {Text, View, StyleSheet, StatusBar, Image} from 'react-native';
import { SPACING } from '../../constants/theme';
import { ThemeContext, getTheme } from '../../context/ThemeContext';
import AppHeader from '../../components/AppHeader';
import SettingComponent from '../../components/profile/SettingComponent';
import ProfileContainer from "../../components/ProfileContainer";

const ProfileScreen = ({navigation}) => {
  const {theme} = React.useContext(ThemeContext)
  const styles =  StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      backgroundColor: theme.white,
      paddingTop:13
    },
    appHeaderContainer: {
      marginHorizontal: SPACING.space_36,
      marginTop: 13,
    },
    profileContainer: {
      alignItems: 'center',
      padding: 4,
      top:14
    },
    avatarImage: {
      height: 80,
      width: 80,
      borderRadius: 80,
    },
    avatarText: {
      fontFamily: "PoppinsSemiBold",
      fontSize: 16,
      marginTop: SPACING.space_16,
      color: theme.black,
    },
  });



  return (
    <View style={styles.container}>
      {/* <StatusBar hidden /> */}
      <View style={styles.appHeaderContainer}>
        <AppHeader
          name="arrow-left"
          header={'My Profile'}
          action={() => navigation.goBack()}
        />
      </View>

     <ProfileContainer name ={"Dada Stephen"}/>

      <View style={styles.profileContainer}>
        <SettingComponent
          icon="user"
          heading="Account"
          subheading="Edit Profile"
          subtitle="Change Password"
          screenName ="HomeScreen"
        />
        <SettingComponent
          icon="gear"
          heading="Settings"
          subheading="Theme"
          subtitle="Permissions"
          screenName =""
        />
        <SettingComponent
          icon="ticket"
          heading="Ticket"
          subheading="View Tickets"
          subtitle="Refferrals"
          screenName ="TicketScreen"
        />
        <SettingComponent
          icon="info"
          heading="About"
          subheading="About Efrica"
          // subtitle="more"
          screenName =""
        />
      </View>
    </View>
  );
};



export default ProfileScreen;
