// useSignIn.js

// @Stephenolamide
import { getContext } from "../../context/AuthContext";
import { sendRequest } from "../../api/api";
import customNavigation from "../navigationUtils";

const useSignIn = () => {
  const {replace, tabNavigation}= customNavigation()
  const { setIsLoading, userToken, setUserInfo, setUserRefreshToken, setError, setUserToken } = getContext();

  const signIn = async (values) => {

console.log(values)
    replace("Tab")

    // setError(null);
    // setIsLoading(true);

    // try {
    //   const data =  await sendRequest('post', '/signin', {
    //     email: values.email +`@gmail.com`,
    //     password: values.password,
    //   });
    //   if (!data.user.isVerified) {
    //     await sendRequest('post', '/resendcode', values.email);
    //     replace('verify', {
    //       email: values.email,
    //       password: values.password,})
    //   } else {
    //     setUserInfo(data.user);
    //     setUserToken(data.token);
    //     setUserRefreshToken(data.refreshToken);
    //     await AsyncStorage.setItem('userInfo', JSON.stringify(data.user));
    //     await AsyncStorage.setItem('userToken', data.token);
    //     await AsyncStorage.setItem('userRefreshToken', data.refreshToken);
    //     replace("Tab")
    //   }
    // } catch (error) {
    //   setError('An error occurred. Please try again later.');
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return signIn;
};

export default useSignIn;





