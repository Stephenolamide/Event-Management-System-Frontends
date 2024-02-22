import { FlatList, View } from 'react-native'
import React, {useCallback, useRef, useState} from 'react'
import Home from '../../components/home/Home'
import { getEventData } from '../../utils/home/homeFunctions';
import ImageCard from '../../components/home/ImageCard';

const HomeComponent = () => {
  const flatListRef = useRef(null);


  const renderItem = useCallback(
    ({ item }) => (
      <ImageCard event={item} key={item.id}/>
    ),
  );


  const events=[
    {
      id:1,
      image:"sdnsdsdnsdnms.jpg"
    },
    {
      id:2,
      image:"sdnsdsdnsdnms.jpg"
    },
    {
      id:3,
      image:"sdnsdsdnsdnms.jpg"
    },
    {
      id:3,
      image:"sdnsdsdnsdnms.jpg"
    },{
      id:4,
      image:"sdnsdsdnsdnms.jpg"
    },{
      id:5,
      image:"sdnsdsdnsdnms.jpg"
    },{
      id:6,
      image:"sdnsdsdnsdnms.jpg"
    },{
      id:7,
      image:"sdnsdsdnsdnms.jpg"
    },{
      id:8,
      image:"sdnsdsdnsdnms.jpg"
    }
  ]
  return (
    <View>
      <FlatList
         ref={flatListRef}
         // onScrollToTop={handleRefresh} // for ios
         onEndReachedThreshold={0.1}
         onEndReached={getEventData}
         showsVerticalScrollIndicator={false}
         data={events}
          vertical
         bounces={false}
         decelerationRate={"fast"}
         // ListFooterComponent={renderFooter}
         keyExtractor={(item) => item._id}
         renderItem={renderItem}
         // refreshing={isLoading && events.length === 0}
         // onRefresh={handleRefresh}
       />
    </View>
  )
}

export default HomeComponent






