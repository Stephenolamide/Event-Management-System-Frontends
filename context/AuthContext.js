import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {createContext, useContext, useEffect, useState} from "react";
import * as Location from "expo-location";
import client from "../api/client";
import {GOOGLE_MAPS_APIKEY} from "@env"


export const AuthContext = createContext();
 

export const AuthProvider =({children})=>{

    const [isLoading, setIsLoading] = useState(false)
    const [userToken, setUserToken]= useState(null)
   const [userInfo, setUserInfo] = useState(null)
   const [eventTitle, setEventTitle] = useState(null)
   const [eventTime, setEventTime] = useState(null)
   const [filterName, setFilterName] = useState("")
   const [userRefreshToken, setUserRefreshToken]= useState(null)
	const [appFirstLaunched, setAppFirstLaunched] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(null)
const [userLocationOrigin, setUserLocationOrigin] = useState(null)

const [error, setError] = useState(null)
const [userCurrentLocationDescription, setUserCurrentLocationDescription] = useState("")

    const [loading, setLoading] = useState(null)

   const logout = async()=>{ 
    try{

      const userToken = await AsyncStorage.getItem("userToken");
      if (userToken !== null) {
        setUserToken(userToken);
        const token = userToken

   const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
   
   const res = await client.post (`/signout`, config)

   if(res.status === 200){

     setIsLoading(true)
    setUserToken(null)
    // setEventTime(null)
    // setEventTitle(null)
    setFilterName(null)
    setUserRefreshToken(null)
	  setAppFirstLaunched(null);
      setIsDarkMode(null)


  await  AsyncStorage.removeItem("userToken")
   await AsyncStorage.removeItem("userInfo")
   await AsyncStorage.removeItem("filtername")
   await AsyncStorage.removeItem("userRefreshToken")
   await AsyncStorage.removeItem('initialCampaignLanding')
//    await AsyncStorage.removeItem("themeMode")
  
   // a phone only has 1 fcm reg token so need to clear it upon logging o
//    await AsyncStorage.removeItem('appFirstLaunched');
// 	  await AsyncStorage.removeItem('expirationTimestamp');

   }

   // delay it for about 2 seconds so it doesn't show that icon agaun

//    setTimeout(() => {
//     logout()
// }, 2000);

}
}catch(e){
}finally{
    setIsLoading(false)
}
   }



   const isLoggedIn = async ()=>{

       setIsLoading(true)
       try{
        const userToken = await AsyncStorage.getItem("userToken")
        const value = await AsyncStorage.getItem("userInfo")
        const userRefreshToken = await AsyncStorage.getItem("userRefreshToken")

        if(value !==null && userRefreshToken !==null && userToken!==null){
            const  userInfo = JSON.parse(value)
            setUserInfo(userInfo)
            setUserRefreshToken(userRefreshToken)
            setUserToken(userToken)
        }
    }catch(e){
    } finally{
        setIsLoading(false)
    }
}


useEffect(()=>{
    isLoggedIn()
   }, [])


// first clear origin and destination data in async storage
   useEffect(()=>{
    const clearOriginData = async()=>{
     try {
       await  AsyncStorage.removeItem("origin")
       await AsyncStorage.removeItem("destination")
     } catch (error) {
    
     }
    }
    clearOriginData()
},[])






   const getLocation = async () => {
    try{
  
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      ("Permission to access location was denied");
      return;
    }
  
    const location = await Location?.getCurrentPositionAsync({});
  
    // log location to the console so as to also get the description
    // don't forget to do the above
    
    
    // use the location coordinates to get the users current address
  
    // Use the Google Maps Geocoding API to get a location description.
     const latitude = location.coords.latitude;
     const longitude = location.coords.longitude;
  
    await client
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_APIKEY}`
    )
    .then((response) => {
      if (response.data.results.length > 0) {
        const description = response.data.results[0].formatted_address;
        const currentStateAdress = response.data.results[8].formatted_address
     
        const userOrigin = {
         latitude:latitude,
         longitude:longitude,
         description:description,
         currentStateAdress:currentStateAdress
       }

       
       setUserLocationOrigin(userOrigin)
      

      } else {
        console.log('Location description not found.');
      }
    })
    .catch((error) => {
      console.error('Error fetching location description:', error);
    });



    
  }
  catch(e){
  //(e)
  }finally{
    setLoading(false)
  }
  }
  
  
  
    // useEffect hook to get user's current location
    useEffect(()=>{
      getLocation()
    },[])
  
    const [initialCampaign, setInitialCampaign] = useState(null);


    const checkForFirstTimeLoaded = async () => {
      const appData = await AsyncStorage.getItem('initialCampaignLanding');
  
      //(appData)
  
      if (appData === null) {
        setInitialCampaign(true);
        AsyncStorage.setItem('initialCampaignLanding', 'false');
      } else {
        setInitialCampaign(false);
      }
    };
  
    useEffect(() => {
      checkForFirstTimeLoaded();
    }, []);








   // instead of using redux we can try to pass data to the provider automatically and now fetch it
// for origin
// for destination
// to setOrigin
// to setDestination


// so since user's live location automatically gives origin, use it else, if he wants to assume he's starting from anither location then now use it


    return(
        <AuthContext.Provider value={{logout, isLoading, error, setError,userRefreshToken, userInfo, userToken, userLocationOrigin, getLocation, initialCampaign, setIsLoading}}>
            {children}
        </AuthContext.Provider>
    )
}

export const getContext = () => useContext(AuthContext);