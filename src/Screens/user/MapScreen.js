import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from "react-native-maps";

export default function MapScreen({navigation, route}) { 


    return (
            <View style={styles.container}>
                <MapView 
                  style={{flex: 1}} 
                  initialRegion={{
                    latitude: route.params.coordinates.latitude, 
                    longitude: route.params.coordinates.longitude, 
                    latitudeDelta: 0.001, 
                    longitudeDelta: 0.006}}>
                      <Marker coordinate={{latitude: route.params.coordinates.latitude, longitude: route.params.coordinates.longitude}}/>
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