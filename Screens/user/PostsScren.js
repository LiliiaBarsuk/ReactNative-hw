import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Platform, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';


export default function PostsScreen() {
 



    return (
            <View style={styles.formContainer}>
                <Text  style={styles.title}>Posts screen</Text>
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