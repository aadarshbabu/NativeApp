import React, { useEffect } from 'react';
import { type PropsWithChildren } from 'react';
import Register from './screen/auth/Register';
import Login from './screen/auth/Login';
import HomePage from './screen/Home/HomePage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen'


const stack = createNativeStackNavigator();

const Auth: React.FC = () => {
  return (
    <stack.Navigator >
      <stack.Screen name='Register' options={{ headerShown: false }} component={Register} />
      <stack.Screen name='Login' options={{ headerShown: false }} component={Login} />
      <stack.Screen name='Home' options={
        {
          headerShown: false,
          title: "Chat",
          headerStyle: {
            backgroundColor: '#f4511e'
          },
          headerTintColor: '#fff'
        }} component={HomePage} />
    </stack.Navigator>
  );
};

function App(): React.ReactNode {
  useEffect(() => {
    SplashScreen.hide();
  }, [])
  return (
    <NavigationContainer>

      <Auth />

    </NavigationContainer>
  );
}

export default App;
