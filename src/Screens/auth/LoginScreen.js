import React, {useState} from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, View, TouchableOpacity, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';

const initialState = {
  login: '',
  email: '',
}

export default function LoginScreen({ navigation }) {
    const [showPassword, setShowPassword] = useState(true);
    const [loginState, setLoginState] = useState(initialState);
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);  

  function onInputFocus() {
    setIsShowKeyboard(true);
  }

  function hideKeaboard() {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  }

  function onPressSubmit() {
      hideKeaboard();
      console.log(loginState);
      setLoginState(initialState);
      navigation.navigate("Home");

      
  }


    return (
      <TouchableWithoutFeedback onPress={hideKeaboard}>
        <View style={styles.container}>
        
        <ImageBackground source={require('../../../assets/img/PhotoBG.jpg')} style={styles.image}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""} >
        <View style={{...styles.formContainer, paddingBottom: isShowKeyboard ? 32 : 111}}>
                <Text  style={styles.title}>Log in</Text>
                <View style={styles.form}>
                    <TextInput 
                      placeholder="Email" 
                      placeholderTextColor="#BDBDBD"
                      textAlign='left' 
                      style={styles.textInput} 
                      onFocus={onInputFocus}
                      value={loginState.email}
                      onChangeText = {(value) => setLoginState((prevState) => ({...prevState, email: value}))}/>
                    <TextInput 
                      placeholder="Password" 
                      placeholderTextColor="#BDBDBD"
                      textAlign='left' 
                      style={styles.passwordInput} 
                      secureTextEntry={showPassword} 
                      onFocus={onInputFocus}
                      value={loginState.password}
                      onChangeText = {(value) => setLoginState((prevState) => ({...prevState, password: value}))}/>
                    <TouchableOpacity 
                      activeOpacity={0.8} 
                      style={styles.showPassword}
                      onPress={() => setShowPassword(!showPassword)}>
                      <>{showPassword ? <Text>Show</Text> : <Text>Hide</Text>}</>
                    </TouchableOpacity>            
                    <TouchableOpacity 
                      activeOpacity={0.8} 
                      style={styles.loginBtn} 
                      onPress={onPressSubmit}>
                      <Text style={styles.loginBtnText}>Log in</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      activeOpacity={0.8}
                      onPress={() => navigation.navigate('Registration')}>
                      <Text style={styles.redirectText}>Don't have an account yet? Sign up</Text>
                    </TouchableOpacity>
                
                </View>
            </View>    
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
    form: {
        marginHorizontal: 16,
    },
    textInput: {
        backgroundColor: '#F6F6F6',
        borderWidth: 1,
        borderColor: '#E8E8E8',
        borderRadius: 8,
        height: 50,
        color: '#212121',
        padding: 16,
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        marginBottom: 16,
    },
    passwordInput: {
        backgroundColor: '#F6F6F6',
        borderWidth: 1,
        borderColor: '#E8E8E8',
        borderRadius: 8,
        height: 50,
        color: '#212121',
        padding: 16,
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        marginBottom: 43,
    },
    loginBtn: {
        height: 51,
        paddingHorizontal: 32,
        paddingVertical: 16,
        backgroundColor: '#FF6C00',
        borderRadius: 100,
        marginBottom: 16, 
    },
    loginBtnText: {
      textAlign: "center",
        color: '#FFFFFF',
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
    },
    redirectText: {
      fontSize: 16,
      fontFamily: 'Roboto-Regular',
      textAlign: "center",
      color: '#1B4371',
    },
    showPassword: {
      position: 'absolute',
      top: 82,
      right: 32,
      fontFamily: 'Roboto-Regular',
      fontSize: 16,
      color: '#1B4371',
    }

})