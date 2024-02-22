module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName:"@env",
          path:".env",
        }
    ],
    'react-native-reanimated/plugin',
  
  ],
  };
};



// "expo-font",
// {
//   "fonts": [
//     "./assets/fonts/Inter-Black.otf",
//     './assets/fonts/Poppins-Light.ttf',
//     './assets/fonts/Poppins-Bold.ttf',
//     './assets/fonts/Poppins-SemiBold.ttf',
//     './assets/fonts/Roboto-Regular.ttf',
//     "./assets/fonts/Montserrat-Light.ttf",
//     "./assets/fonts/Montserrat-Medium.ttf"
//   ]
// }