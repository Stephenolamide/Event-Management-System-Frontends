// navigationUtils.js
import { useNavigation, CommonActions, StackActions } from '@react-navigation/native';

const customNavigation = () => {
  const navigation = useNavigation();

  const navigate = (routeName, params) => {
    navigation.navigate(routeName, params);
  };

  const replace = (routeName, params) => {
    navigation.dispatch(StackActions.replace(routeName, params));
  };

  // write other functions here too



  // @function to navigate to another tab
  const tabNavigation =(tabName, screenName)=>{
    // tabName is name of Tab you want to navigate too ,
    // screen name is name of screen on the particular tab

//@following the structure below
    // navigation.dispatch(
    //     CommonActions.navigate({
    //       name: "Task",
    //       params: {
    //         screen: "TasksScreen2",
    //       },
    //     })
    //   );
    navigation.dispatch(
        CommonActions.navigate({
            name:`${tabName}`,
          params:{
            screen:`${screenName}`
        }})
      );
  }

  return { navigate, replace, tabNavigation };
};

export default customNavigation;
