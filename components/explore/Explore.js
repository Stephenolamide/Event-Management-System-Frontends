import React, {forwardRef, useCallback, useRef} from 'react'
import { getEventData } from '../../utils/explore/exploreFunctions';
import CustomFlatlist from '../CustomFlatlist';
import ExploreCard from './ExploreCard';
import { height } from '../../utils/dimensionUtils';


const Explore = ({screen}) => {

  const renderItem = useCallback(
    ({ item }) => (
      <ExploreCard event={item} key={item.id} screen={screen}/>
    ),
  );

  const imageH = height*0.39
  const events=[
    {
      id:1,
      image:"sdnsdsdnsfddnms.jpg"
    },
    {
      id:2,
      image:"sdnsdsdfddfddfdnsdnms.jpg"
    },
    {
      id:3,
      image:"sdnsdsdsfbfhdnxcsdnms.jpg"
    },
    {
      id:4,
      image:"sdnsdsdfoifoidfidfdnsdnms.jpg"
    },{
      id:5,
      image:"sdnsdsdf'ofdf'dfdjk;nsdnms.jpg"
    },{
      id:6,
      image:"sdnsfkfkddkfddfe'fdsdnsdnms.jpg"
    },{
      id:7,
      image:"sdnsdfods'fd'fdfddsdnsdnms.jpg"
    },{
      id:8,
      image:"sdnsffhefd;fedsdnsdnms.jpg"
    }
  ]
  return (
        <CustomFlatlist
      // ref={flatListRef}
           // onScrollToTop={handleRefresh} // for ios
           onEndReachedThreshold={0.1}
           onEndReached={getEventData}
           showsVerticalScrollIndicator={false}
           data={ screen === "UserPostsScreen"? events.slice(0,1) : events}
          vertical={true}
           decelerationRate={"fast"}
           // ListFooterComponent={renderFooter}
          //  keyExtractor={(item) => item._id}
          keyExtractor={(item)=>item.id}
           renderItem={renderItem}
           // refreshing={isLoading && events.length === 0}
           // onRefresh={handleRefresh}
          contentContainerStyle={{height:imageH*events.length}}
           pagingEnabled={true}
           snapToInterval={height*0.3}
         />

  )
}

export default Explore






