import React, { useContext } from 'react';
import {
  View,
  Image,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';

import {Exit, Icon } from '../constants/icons';
import { DrawerActions, useNavigation, useRoute, useTheme} from '@react-navigation/native';
import { AuthContext} from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { Dimensions } from 'react-native';


const {width, height} = Dimensions.get("screen")



const CustomDrawer = props => {

    const navigation = useNavigation()
    // const paperTheme = useTheme();


    const {toggleTheme, theme, isDarkMode} = useContext(ThemeContext);

   

  return (
    <View style={{flex: 1, backgroundColor:theme.white}}>

{/* {props.state.routes.map((route)=>{
  if(route.name === "Maps" || route.name==="Learn" || route.name==="Handbook" || route.name==="Chat" || route.name==="Settings"){
    return (
     null
    )
  }
  else{
    return( */}
      {/* <DrawerContentScrollView
      // key={route.key}
        {...props}
        contentContainerStyle={{backgroundColor: theme.white}}
        showsVerticalScrollIndicator={false}
        > */}
        <View style={{ backgroundColor: theme.white,
           paddingTop:Platform.OS === "android"?  height*0.04:height*0.08,
           }}>
            <View style={{flexDirection:"row", justifyContent:"space-between"}}>
        <Image
        source={require('../assets/busa.png')}
            style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
          />
          <Exit style={{paddingTop:20, paddingRight:25}} size={30} color={theme.black} onPress={()=>navigation.dispatch(DrawerActions.closeDrawer())}/>
            </View>
      <DrawerItemList {...props} />

                            <View style={styles.preference}
                            >
                                <Icon name={ isDarkMode ? "sunny-outline" :"moon-outline"} size={30} color={theme.black} onPress={()=>toggleTheme()}/>
                            </View>

        </View>

                        
                  

      {/* </DrawerContentScrollView> */}
    {/* )
  }
})} */}


{/* <Text> Dark Mode</Text>
 <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={theme.primary}
          ios_backgroundColor="#3e3e3e"
          // value={notificationEnabled}
          // onValueChange={toggleNotification}
        /> */}


      {/* <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="share-social-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Jakarta',
                marginLeft: 5,
              }}>
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Jakarta',
                marginLeft: 5,
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default CustomDrawer;


const styles = StyleSheet.create({
  preference: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    paddingVertical: height/2.3,
    paddingHorizontal: 20,
  },
})