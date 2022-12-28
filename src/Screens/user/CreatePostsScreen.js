import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Platform, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from "expo-media-library";

import { MaterialIcons,Entypo } from '@expo/vector-icons'; 


export default function CreatePostsScreen() {
    const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={(ref) => {
          setCameraRef(ref);
        }}
      >
        <View style={styles.photoView}>
          <TouchableOpacity
            style={styles.flipContainer}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
              {" "}
              Flip{" "}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              if (cameraRef) {
                const { uri } = await cameraRef.takePictureAsync();
                await MediaLibrary.createAssetAsync(uri);
              }
            }}
          >
            <View style={styles.takePhotoOut}>
              <View style={styles.takePhotoInner}></View>
            </View>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  photoView: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
  },

  flipContainer: {
    flex: 0.1,
    alignSelf: "flex-end",
  },

  button: { alignSelf: "center" },

  takePhotoOut: {
    borderWidth: 2,
    borderColor: "white",
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },

  takePhotoInner: {
    borderWidth: 2,
    borderColor: "white",
    height: 40,
    width: 40,
    backgroundColor: "white",
    borderRadius: 50,
  },
});


{/* <View style={styles.container}>
                
<View style={styles.cameraContainer}>
    <Camera style={styles.camera} type={type} ref={(ref) => {
setCameraRef(ref);
}}> */}
                        {/* <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={async () => {
              if (cameraRef) {
                const { uri } = await cameraRef.takePictureAsync();
                await MediaLibrary.createAssetAsync(uri);
              }
            }}>
                          <MaterialIcons name="photo-camera" size={24} color="grey" />
                        </TouchableOpacity>
                        </View>
                    </Camera>
                </View>
                <Text style={styles.text}>Upload photo(Edit photo)</Text>
                <TextInput 
                      placeholder="Name..." 
                      placeholderTextColor="#BDBDBD"
                      textAlign='left' 
                      style={styles.textInput} 
                    //   onFocus={onInputFocus}
                    //   value={registerState.login}
                    //   onChangeText = {(value) => setRegisterState((prevState) => ({...prevState, login: value}))}
                    />


            </View>
    );
}

const styles = StyleSheet.create({
      container: {
        flex: 1,
        paddingTop: 32,
        paddingHorizontal: 16,
        backgroundColor: '#ffffff',
      },
    camera: {
      height: 240,
      borderRadius: 8,
      
    },
    cameraContainer: {
        
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: '#FFFFFF4D',
       alignItems: 'center',
       justifyContent: 'center',
       position: 'absolute', 
       top: 168,
       left: 132
    },
    text: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: '#BDBDBD',
        marginTop: 8,
    },
    textInput: {
       height: 50,
       marginTop: 16,
       paddingTop: 16,
       paddingBottom: 16,
       color: "#212121"
    }
    

}) */}