import {FlatList, View} from 'react-native'
import React from 'react'

const CustomFlatlist = ({data,decelerationRate, vertical, showsVerticalScrollIndicator, renderItem, ref, keyExtractor, pagingEnabled, ListFooterComponent, onEndReached, onEndReachedThreshold, refreshing, horizontal, removeClippedSubviews, maxToRenderPerBatch, updateCellsBatchingPeriod, windowSize, getItemLayout, contentContainerStyle, showsHorizontalScrollIndicator}) => {
  return (
        <FlatList
        data ={data}
        renderItem ={renderItem}
        bounces ={false}
        keyExtractor = {keyExtractor}
        ref ={ref}
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
         pagingEnabled={pagingEnabled}
         horizontal={horizontal}
         showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
         showsVerticalScrollIndicator={showsVerticalScrollIndicator}
         vertical ={vertical}
         decelerationRate={decelerationRate}
        />
  )
}

export default CustomFlatlist

