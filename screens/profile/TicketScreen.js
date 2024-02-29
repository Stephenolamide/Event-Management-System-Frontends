import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Image,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import AppHeader from '../../components/AppHeader';
import {
  BORDERRADIUS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../../constants/theme';
import LinearGradient from 'react-native-linear-gradient';
import { ReusableIcon } from '../../constants/icons';
import { getTheme } from '../../context/ThemeContext';


const TicketScreen = ({navigation, route}) => {
  const [ticketData, setTicketData] = useState(route.params);

  const {theme} = getTheme()

  useEffect(() => {
    (async () => {
      try {
        const ticket = await EncryptedStorage.getItem('ticket');
        if (ticket !== undefined && ticket !== null) {
          setTicketData(JSON.parse(ticket));
        }
      } catch (error) {
        console.error('Something went wrong while getting Data', error);
      }
    })();
  }, []);

  if (ticketData !== route.params && route.params != undefined) {
    setTicketData(route.params);
  }

  if (ticketData == undefined || ticketData == null) {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <View style={styles.appHeaderContainer}>
          <AppHeader
            name="close"
            header={'My Tickets'}
            action={() => navigation.goBack()}
          />
        </View>
      </View>
    );
  }



  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      backgroundColor: theme.black,
    },
    appHeaderContainer: {
      marginHorizontal: SPACING.space_36,
      marginTop: SPACING.space_20 * 2,
    },
    ticketContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    ticketBGImage: {
      alignSelf: 'center',
      width: 300,
      aspectRatio: 200 / 300,
      borderTopLeftRadius: BORDERRADIUS.radius_25,
      borderTopRightRadius: BORDERRADIUS.radius_25,
      overflow: 'hidden',
      justifyContent: 'flex-end',
    },
    linearGradient: {
      height: '70%',
    },
    linear: {
      borderTopColor: theme.black,
      borderTopWidth: 3,
      width: 300,
      alignSelf: 'center',
      backgroundColor: theme.primaryblue,
      borderStyle: 'dashed',
    },
    ticketFooter: {
      backgroundColor: theme.primaryblue,
      width: 300,
      alignItems: 'center',
      paddingBottom: SPACING.space_36,
      alignSelf: 'center',
      borderBottomLeftRadius: BORDERRADIUS.radius_25,
      borderBottomRightRadius: BORDERRADIUS.radius_25,
    },
    ticketDateContainer: {
      flexDirection: 'row',
      gap: SPACING.space_36,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: SPACING.space_10,
    },
    ticketSeatContainer: {
      flexDirection: 'row',
      gap: SPACING.space_36,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: SPACING.space_10,
    },
    dateTitle: {
      fontFamily: FONTFAMILY.poppins_medium,
      fontSize: FONTSIZE.size_24,
      color: theme.white,
    },
    subtitle: {
      fontFamily: FONTFAMILY.poppins_regular,
      fontSize: FONTSIZE.size_14,
      color: theme.white,
    },
    subheading: {
      fontFamily: FONTFAMILY.poppins_medium,
      fontSize: FONTSIZE.size_18,
      color: theme.white,
    },
    subtitleContainer: {
      alignItems: 'center',
    },
    clockIcon: {
      fontSize: FONTSIZE.size_24,
      color: theme.white,
      paddingBottom: SPACING.space_10,
    },
    barcodeImage: {
      height: 50,
      aspectRatio: 158 / 52,
    },
    blackCircle: {
      height: 80,
      width: 80,
      borderRadius: 80,
      backgroundColor: theme.black,
    },
  });



  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.appHeaderContainer}>
        <AppHeader
          name="close"
          header={'My Tickets'}
          action={() => navigation.goBack()}
        />
      </View>

      <View style={styles.ticketContainer}>
        <ImageBackground
        //   source={{uri: ticketData?.ticketImage}}

        source={require("../../assets/images/stephen.jpg")}
          style={styles.ticketBGImage}>
          <LinearGradient
            colors={[theme.primaryblue, theme.primary]}
            style={styles.linearGradient}>
            <View
              style={[
                styles.blackCircle,
                {position: 'absolute', bottom: -40, left: -40},
              ]}></View>
            <View
              style={[
                styles.blackCircle,
                {position: 'absolute', bottom: -40, right: -40},
              ]}></View>
          </LinearGradient>
        </ImageBackground>
        <View style={styles.linear}></View>

        <View style={styles.ticketFooter}>
          <View
            style={[
              styles.blackCircle,
              {position: 'absolute', top: -40, left: -40},
            ]}></View>
          <View
            style={[
              styles.blackCircle,
              {position: 'absolute', top: -40, right: -40},
            ]}></View>
          <View style={styles.ticketDateContainer}>
            <View style={styles.subtitleContainer}>
              <Text style={styles.dateTitle}>{ticketData?.date.date}</Text>
              <Text style={styles.subtitle}>{ticketData?.date.day}</Text>
            </View>
            <View style={styles.subtitleContainer}>
              <ReusableIcon name="clock" style={styles.clockIcon} />
              <Text style={styles.subtitle}>{ticketData?.time}</Text>
            </View>
          </View>
          <View style={styles.ticketSeatContainer}>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subheading}>Hall</Text>
              <Text style={styles.subtitle}>02</Text>
            </View>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subheading}>Row</Text>
              <Text style={styles.subtitle}>04</Text>
            </View>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subheading}>Seats</Text>
              <Text style={styles.subtitle}>
                {ticketData?.seatArray
                  .slice(0, 3)
                  .map((item, index, arr) => {
                    return item + (index == arr.length - 1 ? '' : ', ');
                  })}
              </Text>
            </View>
          </View>
          <Image
            source={require('../../assets/images/barcode.png')}
            style={styles.barcodeImage}
          />
        </View>
      </View>
    </View>
  );
};



export default TicketScreen;
