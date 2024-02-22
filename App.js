
import "react-native-gesture-handler"
import React, { useCallback, useState, useContext } from "react";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import AppNavigation from "./navigation/AppNavigation";


import useCustomFonts from "./useCustomFonts";
import { useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { SplashScreen } from 'expo';





const App = ()=> {
	let fontsLoaded = useCustomFonts()
	const [isLoading, setIsLoading] = useState(false);

	const [theme, setTheme] = useState(null)
	



	useEffect(() => {
		const fetchData = async () => {
		  // Fetch data from AsyncStorage or any other async operations

		  setIsLoading(true)
		  try {
			// Simulating data fetching from AsyncStorage
			const value = await AsyncStorage.getItem('themeMode');

	
			// Delay for 2 seconds to simulate fetching time
			await new Promise((resolve) => setTimeout(resolve, 500));
			// Set loading to false once data is fetched
			setIsLoading(false);


		
	
		  } catch (error) {
			// console.log('Error fetching data:', error);
			setIsLoading(false);
		  }
		};
	
		fetchData();
	  }, []);


	const onLayoutRootView = useCallback(async () => {
		        if (fontsLoaded) {
		          await SplashScreen.hideAsync();
		        }
		      }, [fontsLoaded])

	if(!fontsLoaded){
		return null
	}


	if (isLoading) {
		// Render a loading screen or component
		return (
		  // Loading screen or component
		  // You can show a spinner or custom loading UI here
		  // Or return null to render nothing during the loading state
	// <View style={{backgroundColor : theme === "dark" ? "#15202d" :"white", flex:1}}>
	// 	</View>

	null
		);
	  }





	return (
		<ThemeProvider>
		<AuthProvider>
			<AppNavigation/>
		</AuthProvider>
		</ThemeProvider>
	);
}

export default App;
