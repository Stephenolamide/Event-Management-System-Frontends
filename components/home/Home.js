import React, {forwardRef, useCallback, useRef} from 'react'
import { getEventData } from '../../utils/explore/exploreFunctions';
import CustomFlatlist from '../CustomFlatlist';
import ExploreCard from '../explore/ExploreCard';
import { height } from '../../utils/dimensionUtils';

const Home = (ref, props) => {
  const flatListRef = useRef(null);

const imageH = height*0.56



  const renderItem = useCallback(
    ({ item }) => (
      <ExploreCard event={item} key={item.id} screen={"HomeScreen"} style={{right:10}}/>
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
    },
    {
      id:8,
      image:"sdnsffhd'sfd9ife]efd;fedsdnsdnms.jpg"
    },
    {
      id:9,
      image:"sdnsffhfufdsdefd;fedsdnsdnms.jpg"
    },
     {
      id:10,
      image:"sdnsffhedhsdslsdfd;fedsdnsdnms.jpg"
    },
    {
      id:11,
      image:"sdnsffhedcjddcfdhsdslsdfd;fedsdnsdnms.jpg"
    },
    {
      id:12,
      image:"sdnsffheddfidfd'gferhsdslsdfd;fedsdnsdnms.jpg"
    }
  ]
  return (
        <CustomFlatlist
      // ref={flatListRef}
           // onScrollToTop={handleRefresh} // for ios
          //  onEndReachedThreshold={0.1}
          //  onEndReached={getEventData}
           showsVerticalScrollIndicator={false}
           data={events}
          vertical={true}
          //  decelerationRate={"fast"}
           // ListFooterComponent={renderFooter}
          //  keyExtractor={(item) => item._id}
          keyExtractor={(item)=>item.id}
           renderItem={renderItem}
           // refreshing={isLoading && events.length === 0}
           // onRefresh={handleRefresh}
          //  maxToRenderPerBatch={10}
          //  getItemLayout={(data, index)=>({length:imageH, index})}
          contentContainerStyle={{height:imageH*events.length}}
         />

  )
}

export default Home






