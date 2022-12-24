import { ImageBackground, TouchableWithoutFeedback, KeyboardAvoidingView, View, Keyboard, Platform, StyleSheet } from 'react-native';
import RegistrationScreen from './Screens/RegistrationScreen';
import React, { useState, useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import LoginScreen from './Screens/LoginScreen';


SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  function focusInput() {
    setIsShowKeyboard(true);
  }

  function hideKeaboard() {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  }

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
        <TouchableWithoutFeedback onPress={hideKeaboard}>
        <View style={styles.container}>
        
        <ImageBackground source={require('./assets/img/PhotoBG.jpg')} style={styles.image}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""} >
        <RegistrationScreen onInputFocus={focusInput} hideKeaboard={hideKeaboard} isShowKeyboard={isShowKeyboard}></RegistrationScreen>    
        </KeyboardAvoidingView>
        </ImageBackground>
      </View>
      </TouchableWithoutFeedback>
   
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
      },
      image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "flex-end",   
      },
})
