import { useFonts } from 'expo-font';

export default function useCustomFonts() {
  let [fontsLoaded] = useFonts({
  'Poppins': require('./assets/fonts/Poppins-Light.ttf'),
  'PoppinsBold':require('./assets/fonts/Poppins-Bold.ttf'),
'PoppinsSemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
'PoppinsRegular': require('./assets/fonts/Poppins-Regular.ttf'),
'Roboto': require('./assets/fonts/Roboto-Regular.ttf'),
'Montserrat' : require("./assets/fonts/Montserrat-Light.ttf"),
"MontserratMedium" : require("./assets/fonts/Montserrat-Medium.ttf"),
"MontserratBold" : require("./assets/fonts/Montserrat-Bold.ttf"),
  });
  return fontsLoaded;
}
