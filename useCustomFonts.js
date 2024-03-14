import { useFonts } from 'expo-font';

export default function useCustomFonts() {
  let [fontsLoaded] = useFonts({
'PoppinsLight': require('./assets/fonts/Poppins-Light.ttf'),
'PoppinsThin': require('./assets/fonts/Poppins-Thin.ttf'),
'PoppinsBold':require('./assets/fonts/Poppins-Bold.ttf'),
'PoppinsBlack':require('./assets/fonts/Poppins-Black.ttf'),
'PoppinsExtraBold':require('./assets/fonts/Poppins-ExtraBold.ttf'),
'PoppinsExtraLight':require('./assets/fonts/Poppins-ExtraLight.ttf'),
'PoppinsSemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
'PoppinsMedium': require('./assets/fonts/Poppins-Medium.ttf'),
'PoppinsRegular': require('./assets/fonts/Poppins-Regular.ttf'),
'Roboto': require('./assets/fonts/Roboto-Regular.ttf'),
'Montserrat' : require("./assets/fonts/Montserrat-Light.ttf"),
"MontserratMedium" : require("./assets/fonts/Montserrat-Medium.ttf"),
"MontserratBold" : require("./assets/fonts/Montserrat-Bold.ttf"),

  });
  return fontsLoaded;
}
