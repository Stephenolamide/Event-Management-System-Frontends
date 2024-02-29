import { useFonts } from 'expo-font';

export default function useCustomFonts() {
  let [fontsLoaded] = useFonts({
'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),
'Poppins-Thin': require('./assets/fonts/Poppins-Thin.ttf'),
'Poppins-Bold':require('./assets/fonts/Poppins-Bold.ttf'),
'Poppins-Black':require('./assets/fonts/Poppins-Black.ttf'),
'Poppins-ExtraBold':require('./assets/fonts/Poppins-ExtraBold.ttf'),
'Poppins-ExtraLight':require('./assets/fonts/Poppins-ExtraLight.ttf'),
'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
'Roboto': require('./assets/fonts/Roboto-Regular.ttf'),
'Montserrat' : require("./assets/fonts/Montserrat-Light.ttf"),
"MontserratMedium" : require("./assets/fonts/Montserrat-Medium.ttf"),
"MontserratBold" : require("./assets/fonts/Montserrat-Bold.ttf"),

  });
  return fontsLoaded;
}
