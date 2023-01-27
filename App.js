import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { Provider } from 'react-redux'; 

import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';



import { store } from './redux/store';
import { Main } from './src/components/Main';

const loadFonts = async () => {
  await Font.loadAsync({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),    
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });
};

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return (<AppLoading
      startAsync={loadFonts}
      onFinish={() => setIsReady(true)}
      onError={err => console.log(err)} />);
  }
  
  return (
    <Provider store={store}>
      <Main />
    </Provider>   
  );
}

