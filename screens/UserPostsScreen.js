import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6'
import ProfileContainer from '../components/ProfileContainer'

const UserPostsScreen = () => {
  return (
    <View>
        <View style={{flexDirection:"row", justifyContent:"space-evenly"}}>
              <ProfileContainer height={100} width={100} style={{top:2, left:-10}}/>
                <View>
                <FontAwesome6Icon name='mail'/>
                </View>

                <View>
                    <Text>+ Follow</Text>
                </View>
        </View>
      <Text>Cubana Cafe</Text>
      <Text>@cubana.org</Text>
      <Text>We are your lovely cafe and food shop. we sell varieties and is very good at what we do</Text>
      <Text>www.cubana.org</Text>
      <Text>Latest Post</Text>
      {/* //Posts being displayes */}

      <Text>More Posts</Text>
      {/* / show other posts from the user */}
    </View>
  )
}

export default UserPostsScreen

const styles = StyleSheet.create({})