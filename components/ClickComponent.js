import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ClickComponent = ({first, second, styles}) => {
    const [clicked, setClicked] = useState(false);
    const [userClick, setUserClick] = useState(false);
    
    const handleNewestClick = () => {
      setClicked(true);
      setUserClick(false);
    };
    
    const handleUpcomingClick = () => {
        setUserClick(true);
        setClicked(false);
      };
    
      return (
        <View style={[{ flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 33 }, styles]}>
          <TouchableOpacity  onPress={handleNewestClick}>
            <Text style={{ fontFamily: 'PoppinsMedium', fontSize: 16, color: clicked ? 'blue' : 'black', textDecorationLine: clicked ? "underline":"none",}}>{first}</Text>
          </TouchableOpacity>
    
          <TouchableOpacity  onPress={handleUpcomingClick}>
            <Text style={{ fontFamily: 'PoppinsMedium', fontSize: 16, color: userClick ? 'blue' : 'black', textDecorationLine: userClick ? "underline":"none"}}>{second}</Text>
          </TouchableOpacity>
        </View>
      );
    };


    export default ClickComponent