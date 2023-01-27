import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux'; 
import LoginScreen from '../Screens/auth/LoginScreen';
import RegistrationScreen from '../Screens/auth/RegistrationScreen';
import HomeRouter from '../routers/HomeRouter';
import AuthRouter from '../routers/authRouter';
import { authStateChangeUser } from '../../redux/auth/authOperations';


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

export const Main = () => {
    const { stateChange } = useSelector(state => state.auth)

   const dispatch = useDispatch()
     
    useEffect(() => {
      dispatch(authStateChangeUser())
    }, [])
    
    const routing = useRoute(stateChange);
    return <NavigationContainer>

    <AuthStack.Navigator initialRouteName={stateChange ? "Home" : "Login"} >

      {routing}       

    </AuthStack.Navigator>

  </NavigationContainer> 
}