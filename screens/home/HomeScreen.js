import { FlatList, View } from 'react-native'
import React, {useCallback, useRef, useState} from 'react'
import Home from '../../components/home/Home'
import { getEventData } from '../../utils/home/homeFunctions';
import ImageCard from '../../components/home/ImageCard';

const HomeScreen = () => {
  const flatListRef = useRef(null);


  const renderItem = useCallback(
    ({ item }) => (
      <ImageCard event={item} key={item.id}/>
    ),
  );

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
      <Home/>
    </View>
  )
}

export default HomeScreen






