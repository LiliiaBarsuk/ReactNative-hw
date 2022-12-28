import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Platform, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';


const loadFonts = async () => {
  await Font.loadAsync({
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),    
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
  });
};

export default function ComentsScreen({onInputFocus, hideKeaboard, isShowKeyboard}) {
    const [isReady, setIsReady] = useState(false);  

  if (!isReady) {
    return (<AppLoading
      startAsync={loadFonts}
      onFinish={() => setIsReady(true)}
      onError={err => console.log(err)} />);
  }

    return (
            <View style={{...styles.formContainer, paddingBottom: isShowKeyboard ? 32 : 111}}>
                <Text  style={styles.title}>CommentsScreen</Text>
                <View style={styles.form}>
                    
                </View>
            </View>
    );
}

const styles = StyleSheet.create({
      formContainer: {
        paddingTop: 32,
        paddingLeft: 16,
        paddingRight: 16,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: '#ffffff',
      },
    title: {
        fontFamily: 'Roboto-Bold',
        fontSize: 30,
        textAlign: 'center',
        color: '#212121',
        marginBottom: 32,  
    },
    

})