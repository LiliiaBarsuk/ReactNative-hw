import 'react-native-gesture-handler';
import React, { useState, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/Screens/auth/LoginScreen';
import RegistrationScreen from './src/Screens/auth/RegistrationScreen';

import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

const loadFonts = async () => {
  await Font.loadAsync({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),    
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });
};

import HomeRouter from './src/routers/HomeRouter';
import AuthRouter from './src/routers/authRouter';

const AuthStack = createStackNavigator(); 
const MainTabs = createBottomTabNavigator(); 

const useRoute = (isAuth) => {
  if (!isAuth) {
    return (      
      <>
        <AuthStack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
        <AuthStack.Screen name="Registration" component={RegistrationScreen} options={{headerShown: false}} />
      </> 
    );
  }
  
  return (    
      <AuthStack.Screen name="Home" component={HomeRouter} options={{ headerShown: false }} />    
  );
}


export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [isAuth, setIsAuth] = useState(true);

  const routing = useRoute(isAuth);

  function updateIsAuth (value) {
    setIsAuth(value)
  }

  if (!isReady) {
    return (<AppLoading
      startAsync={loadFonts}
      onFinish={() => setIsReady(true)}
      onError={err => console.log(err)} />);
  }
  
  return (
    <NavigationContainer>

      <AuthStack.Navigator initialRouteName={isAuth ? "Home" : "Login"} >

        {routing}       

      </AuthStack.Navigator>

    </NavigationContainer>    
  );
}

