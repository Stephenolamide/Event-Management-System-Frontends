import {FlatList, View} from 'react-native'
import React, { useRef } from 'react'

const CustomFlatlist = ({data,decelerationRate, vertical, showsVerticalScrollIndicator, renderItem, ref, keyExtractor, pagingEnabled, ListFooterComponent, onEndReached, onEndReachedThreshold, refreshing, horizontal, removeClippedSubviews, maxToRenderPerBatch, updateCellsBatchingPeriod, windowSize, getItemLayout, contentContainerStyle, showsHorizontalScrollIndicator}) => {
  const flatListRef = useRef(null);
  
  
  return (
        <FlatList
        ref={flatListRef}
        data ={data}
        renderItem ={renderItem}
        bounces ={false}
        keyExtractor = {keyExtractor}
        // ref ={ref}
        ListFooterComponent ={ListFooterComponent}
        refreshing={refreshing}
        onEndReachedThreshold={onEndReachedThreshold}
         onEndReached={onEndReached}
         removeClippedSubviews={removeClippedSubviews}
         maxToRenderPerBatch={maxToRenderPerBatch}
         updateCellsBatchingPeriod={updateCellsBatchingPeriod}
         windowSize={windowSize}
         getItemLayout={getItemLayout}
         contentContainerStyle={contentContainerStyle}
        //  pagingEnabled={pagingEnabled}
        pagingEnabled
         horizontal={horizontal}
         showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
         showsVerticalScrollIndicator={showsVerticalScrollIndicator}
         vertical ={vertical}
         decelerationRate={decelerationRate}
        />
  )
}

export default CustomFlatlist

