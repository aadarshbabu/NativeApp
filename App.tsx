import React, { createContext, useEffect, useReducer } from 'react';
import { type PropsWithChildren } from 'react';
import Register from './screen/auth/Register';
import Login from './screen/auth/Login';
import ChatHome from './screen/Home/ChatHome';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen'
import Home from './screen/Home/Home';
import IntrestrialAds from './screen/Ads/intrestrialAds';
import RewardedAds from './screen/Ads/RewadedAds';
import RewardedInterstitialAdd from './screen/Ads/RewardedIntertitiel';
import RewarePurchase from './screen/Purchase/RewarePurchase';


import { context, contextInit } from './Context/createContext';
import { Store, store } from './Context/store';
import { reduser } from './Context/reduser';
import { StatusBar } from 'react-native';
const stack = createNativeStackNavigator(); // Navigagtion.

const Auth: React.FC = () => {
  return (
    <stack.Navigator >

      <stack.Screen name='Login' options={{ headerShown: false }} component={Login} />
      <stack.Screen name='Home' options={{ headerShown: false }} component={Home} initialParams={{ userName: 'test' }} />
      <stack.Screen name='Register' options={{ headerShown: false }} component={Register} />
      <stack.Screen name='IntrestrialAds' options={{ headerShown: false }} component={IntrestrialAds} />
      <stack.Screen name='RewardedAds' options={{ headerShown: false }} component={RewardedAds} />
      <stack.Screen name='RewardedInterstitialAdd' options={{ headerShown: false }} component={RewardedInterstitialAdd} />
      <stack.Screen name='RewarePurchase' options={{ headerShown: true, title: 'Reward' }} component={RewarePurchase} />
      <stack.Screen name='ChatHome' options={
        {
          headerShown: true,
          title: "Chat",
          headerStyle: {
            backgroundColor: '#111827'
          },
          headerTintColor: '#fff'
        }} component={ChatHome} />
    </stack.Navigator>
  );
};



function App(): React.ReactNode {

  const [state, dispatch] = useReducer(reduser, store);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <context.Provider value={{ state, dispatch }} >
      <NavigationContainer>
        <StatusBar backgroundColor={"#111827"}></StatusBar>
        <Auth />
      </NavigationContainer>
    </context.Provider>
  );
}

export default App;
