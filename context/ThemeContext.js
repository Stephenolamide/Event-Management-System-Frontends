

import React, { createContext, useState, useEffect } from 'react';
import { useColorScheme} from 'react-native';
import { darkTheme, lightTheme } from '../constants/theme';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(null); // Initially set to null while loading from AsyncStorage

  useEffect(() => {
    // Retrieve theme mode from AsyncStorage when the app is launched
    const retrieveThemeMode = async () => {
      try {
        const storedThemeMode = await AsyncStorage.getItem('themeMode');
        setIsDarkMode(storedThemeMode === 'dark');

     
      } catch (error) {
        // Error retrieving data from AsyncStorage
        // console.log('Error retrieving theme mode:', error);
      }
    };

    retrieveThemeMode();
  }, []);

  useEffect(() => {
    // Save the theme mode to AsyncStorage whenever it changes
    const saveThemeMode = async () => {
      try {
        await AsyncStorage.setItem('themeMode', isDarkMode ? 'dark' : 'light');
      } catch (error) {
        // Error saving data to AsyncStorage
        // console.log('Error saving theme mode:', error);
      }
    };

    if (isDarkMode !== null) { // Avoid saving initial null value
      saveThemeMode();
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const theme = isDarkMode === null ? lightTheme : isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

