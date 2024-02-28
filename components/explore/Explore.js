import React, {useCallback, useRef} from 'react'
import { getEventData } from '../../utils/explore/exploreFunctions';
import CustomFlatlist from '../CustomFlatlist';
import ExploreCard from './ExploreCard';

const Explore = () => {
  const flatListRef = useRef(null);


  const renderItem = useCallback(
    ({ item }) => (
      <ExploreCard event={item} key={item.id}/>
    ),
  );


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
         ref={flatListRef}
         // onScrollToTop={handleRefresh} // for ios
         onEndReachedThreshold={0.1}
         onEndReached={getEventData}
         showsVerticalScrollIndicator={false}
         data={events}
        vertical={true}
         decelerationRate={"fast"}
         // ListFooterComponent={renderFooter}
        //  keyExtractor={(item) => item._id}
        keyExtractor={(item)=>item.id}
         renderItem={renderItem}
         // refreshing={isLoading && events.length === 0}
         // onRefresh={handleRefresh}
       />
  )
}

export default Explore






