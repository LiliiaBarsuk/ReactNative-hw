import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Platform, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import MapView, { Marker } from "react-native-maps";

export default function MapScreen() { 


    return (
            <View style={styles.container}>
                <MapView 
                  style={{flex: 1}} 
                  initialRegion={{
                    latitude: '', 
                    longitude: '', 
                    latitudeDelta: 0.001, 
                    longitudeDelta: 0.006}}>
                      <Marker coordinate={{latitude: '', longitude: ''}}/>
                </MapView>
            </View>
    );
}

const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center'
      },
    title: {
        fontFamily: 'Roboto-Bold',
        fontSize: 30,
        textAlign: 'center',
        color: '#212121',
        marginBottom: 32,  
    },
    

})