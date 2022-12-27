import React, {useState} from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, View, TouchableOpacity, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';

const initialState = {
  login: '',
  email: '',
  password: ''
}

export default function RegistrationScreen({ navigation }) {
    const [showPassword, setShowPassword] = useState(true);
    const [registerState, setRegisterState] = useState(initialState);  
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
      console.log(registerState);
      setRegisterState(initialState);
      navigation.navigate("Home");
    }

    return (
      <TouchableWithoutFeedback onPress={hideKeaboard}>
        <View style={styles.container}>

        
        <ImageBackground source={require('../../assets/img/PhotoBG.jpg')} style={styles.image}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""} >
        <View style={{...styles.formContainer, paddingBottom: isShowKeyboard ? 20 : 45}}>
                <View style={styles.avatar}>
                    <View style={styles.avatarAddBtn}>
                    <ImageBackground source={require('../../assets/img/add.png')} style={styles.addImage}></ImageBackground>
                    </View>
                </View>
                <Text  style={styles.title}>Registration</Text>
                <View style={styles.form}>
                    <TextInput 
                      placeholder="Login" 
                      placeholderTextColor="#BDBDBD"
                      textAlign='left' 
                      style={styles.textInput} 
                      onFocus={onInputFocus}
                      value={registerState.login}
                      onChangeText = {(value) => setRegisterState((prevState) => ({...prevState, login: value}))}/>
                    <TextInput 
                      placeholder="Email" 
                      placeholderTextColor="#BDBDBD"
                      textAlign='left' 
                      style={styles.textInput} 
                      onFocus={onInputFocus}
                       value={registerState.email}
                      onChangeText = {(value) => setRegisterState((prevState) => ({...prevState, email: value}))}/>
                    <TextInput 
                      placeholder="Password" 
                      placeholderTextColor="#BDBDBD"
                      textAlign='left' 
                      style={styles.passwordInput} 
                      secureTextEntry={showPassword} 
                      onFocus={onInputFocus}
                       value={registerState.password}
                      onChangeText = {(value) => setRegisterState((prevState) => ({...prevState, password: value}))}/>
                    <TouchableOpacity 
                      activeOpacity={0.8} 
                      style={styles.showPassword}
                      onPress={() => setShowPassword(!showPassword)}>
                      <>{showPassword ? <Text>Show</Text> : <Text>Hide</Text>}</>
                    </TouchableOpacity>            
                    <TouchableOpacity 
                      activeOpacity={0.8} 
                      style={styles.registerBtn} 
                      onPress={onPressSubmit}>
                      <Text style={styles.registerBtnText}>Sign up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      activeOpacity={0.8}
                      onPress={() => navigation.navigate('Login')}
                    >
                      <Text style={styles.redirectText}>Already have an account? Log in</Text>
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
      paddingTop: 92,
      paddingLeft: 16,
      paddingRight: 16,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      backgroundColor: '#ffffff',

    },
    avatar: {
        width: 120,
        height: 120,
        backgroundColor: "#F6F6F6",
        borderRadius: 16,
        position: 'absolute',
        top: -60,
        left: "50%",
        transform: [{ translateX: -50 }],
      },
    avatarAddBtn: {
        position: 'absolute',
        top: 81,
        right: -12,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: 25,
        height: 25,
        backgroundColor: '#FFFFFF',
        borderColor: "#FF6C00",
        borderRadius: 50,
        borderWidth: 1,
    },
    addImage: {
        resizeMode: "cover",    
        width: 13,
        height: 13
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
    registerBtn: {
        height: 51,
        paddingHorizontal: 32,
        paddingVertical: 16,
        backgroundColor: '#FF6C00',
        borderRadius: 100,
        marginBottom: 16, 
    },
    registerBtnText: {
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
      top: 148,
      right: 32,
      fontFamily: 'Roboto-Regular',
      fontSize: 16,
      color: '#1B4371',
    }

})