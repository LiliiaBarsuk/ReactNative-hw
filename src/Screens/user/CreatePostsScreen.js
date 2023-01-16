import React, {useState, useEffect} from 'react';
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  View, 
  TouchableOpacity,    
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from "expo-media-library";
import { useIsFocused } from '@react-navigation/native';
import * as Location from 'expo-location';

import { MaterialIcons, AntDesign } from '@expo/vector-icons'; 


const initialState = {
  title: '',
  location: ''
}

export default function CreatePostsScreen({ navigation }) {
  const [isKeabordShown, setIsKeabordShown] = useState(false);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photoUrl, setPhotoUrl] = useState('');
  const [formState, setFormState] = useState(initialState);
  const [coordinates, setCoordinates] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  
  const isFocused = useIsFocused()

  function hideKeaboard() {
    setIsKeabordShown(false);
    Keyboard.dismiss();
}

function onInputFocus() {
  setIsKeabordShown(true);
}

// useEffect(() => {
    //     (async () => {
    //     const { status } = await Camera.getCameraPermissionsAsync();
    //     await MediaLibrary.requestPermissionsAsync();

    //     setHasPermission(status === "granted");
    //     })();
    // }, []);

    // if (hasPermission === null) {
    //     return <View />;
    // }
    // if (hasPermission === false) {
    //     return <Text>No access to camera</Text>;
    // }


async function getlocation() {
  let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
  const { coords } = await Location.getCurrentPositionAsync();
  const coordinates = {
    latitude: coords.latitude,
    longitude: coords.longitude,
  };
  setCoordinates(coordinates);
}

async function takePhoto() {
  if (cameraRef) {
    const { uri } = await cameraRef.takePictureAsync();
    await MediaLibrary.createAssetAsync(uri);
    getlocation()
    setPhotoUrl(uri);
  }
}

function sendPhoto() {
  const postData = {...formState, photoUrl, coordinates}
  setPhotoUrl('');
  setFormState(initialState);
  navigation.navigate('DefaultScreen', { postData });
}
  return (
    <TouchableWithoutFeedback onPress={hideKeaboard}>
      <View style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
      { isFocused && <Camera
        style={styles.camera}
        type={type}
        ref={(ref) => {
          setCameraRef(ref);
        }}
      >
        {photoUrl && <View style={styles.imageContainer}>
            <Image source={{uri: photoUrl}} style={styles.image}/>
          </View>}
        
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
            onPress={takePhoto}>
            <MaterialIcons style={styles.buttonIcon} name="photo-camera" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </Camera>  }
      

      <Text style={styles.textUpload} >{photoUrl ? 'Edit photo' : 'Upload photo'}</Text>

      <TextInput 
        placeholder="Title..." 
        placeholderTextColor="#BDBDBD"
        textAlign='left' 
        style={styles.textInput} 
        onFocus={onInputFocus}
        value={formState.title}
        onChangeText = {(value) => setFormState((prevState) => ({...prevState, title: value}))}
        />
      
      <TextInput 
        placeholder="Location..." 
        placeholderTextColor="#BDBDBD"
        textAlign='left' 
        style={styles.textInput} 
        onFocus={onInputFocus}
        value={formState.location}
        onChangeText = {(value) => setFormState((prevState) => ({...prevState, location: value}))}
        />

      <TouchableOpacity
        activeOpacity={0.6}
        style={{...styles.publishBtn,  backgroundColor: photoUrl ? '#FF6C00' : "transparent"}}
        // onPress={createAndLoadPostData}
      >
        <Text style={{...styles.publishText, color: photoUrl ? '#FFFFFF' : '#BDBDBD'}} onPress={sendPhoto}>PUBLISH</Text>
      </TouchableOpacity> 
      <TouchableOpacity style={styles.deleteContainer} >
      <AntDesign name="delete" size={24} color="#DADADA" style={styles.deleteIcon} />
      </TouchableOpacity>
         </KeyboardAvoidingView>
                
                </View>
    
                
                
            </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, },
  camera: { 
    marginTop: 32,
    height: '35%',
    borderRadius: 8 
  },
  photoView: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
  },

  flipContainer: {
    alignSelf: "flex-end",
    marginRight: 10
  },

  button: { 
    alignSelf: "center",
    marginBottom: 20,
    width: 60,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',

  },
  textUpload: {
    marginTop: 8,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#BDBDBD'
  },
  textInput: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    height: 50,
    borderBottomColor : '#E8E8E8',
    borderBottomWidth: 1,
    marginTop: 16,
  },
  publishBtn: {
    marginTop: 32,
    fontSize: 16,
    height: 50,
    borderRadius: 100,
    justifyContent: 'center',
  },
  publishText: {
    fontFamily: 'Roboto-Regular',
    alignSelf: 'center',
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 8
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 8
  },
  deleteContainer: {
    marginBottom: 22,
    width: 70,
    height: 40,
    borderRadius: 29,
    alignSelf: 'center',
    justifyContent: 'flex-end'
  },
  deleteIcon: {
    alignSelf: 'center',
  }
});


