import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    FlatList,
    Image
} from 'react-native';

import { useSelector, useDispatch } from "react-redux";

import { collection, query, where, getDocs } from "firebase/firestore";

import { MaterialIcons, EvilIcons } from '@expo/vector-icons';

import { signOutUser } from '../../../redux/auth/authOperations';
import { db } from '../../../firebase/config';


export default function ProfileScreen() {
    const [posts, setPosts] = useState([]);

    const dispatch = useDispatch();
    const { userId, login } = useSelector(state => state.auth);

    useEffect(() => {
        getUsersPosts();

        
    }, []);

    const signOut = () => {
        dispatch(signOutUser());
    }

    const getUsersPosts = async () => {

        const q = query(collection(db, "posts"), where("userId", "==", userId));

        const querySnapshot = await getDocs(q);

        setPosts(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));               
    }



    return (
        <View style={styles.container}>

        <ImageBackground source={require('../../../assets/img/PhotoBG.jpg')} style={styles.image}> 
              
            <View style={styles.profile} >

                <View style={styles.avatar}>
                    <TouchableOpacity activeOpacity={0.6} style={styles.avatarBtn}>
                        <ImageBackground
                            source={require('../../../assets/img/add.png')}
                            style={styles.btnimage}>                
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
                    
                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={styles.signOut}
                        onPress={signOut}
                    >
                        <MaterialIcons name="logout" size={24} color="#BDBDBD" />
                    </TouchableOpacity>

                <Text style={styles.login}>{login}</Text>

                <FlatList data={posts} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) => (
                    <View style={styles.pictureContainer}>
                        <View style={styles.picture} >
                            <Image source={{uri: item.photo}} style={{width: '100%', height: 240, borderRadius: 8,}} />
                        </View>

                        <Text style={styles.title}>{ item.title }</Text>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                style={styles.commentsButton}
                                onPress={() => navigation.navigate("CommentsScreen", {postId: item.id, photo: item.photo})}
                            >
                                <EvilIcons name="comment" size={18} color="#BDBDBD" />
                                <Text style={styles.commentsText}>0</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity
                                activeOpacity={0.6}
                                style={styles.mapButton}
                                onPress={() => navigation.navigate("MapScreen", {location: item.location, title: item.title} )}
                            >
                                <EvilIcons name="location" size={18} color="#BDBDBD" />
                                <Text style={styles.locationText}>{ item.location }</Text>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                )}  />    

            </View>
                
          
        </ImageBackground>      
        
      </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'flex-end', 
    },

    profile: {
        height: '80%',
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
        borderRadius: 16,
        backgroundColor: '#f6f6f6',
        position: 'absolute',
        top: -60,
        left: "50%",
        transform: [{ translateX: -50 }],    
        
    },

    avatarBtn: {    
        width: 25,
        height: 25,    
        borderRadius: 50,
        position: 'absolute',
        top: 81,
        right: -12,
        
    },

    btnimage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',    
    },

    signOut: {
        position: 'absolute',
        top: 22,
        right: 16,
    },

    login: {
        fontFamily: 'Roboto-Regular',
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 32,
    },

    pictureContainer: {        
        marginBottom: 32,
    },

    picture: {
        marginBottom: 8,
    },

    title: {        
        marginBottom: 8,
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
    },
    
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    commentsButton: {
        flexDirection: 'row', 
        alignItems: 'center'
    },

    mapButton: {
        flexDirection: 'row', 
        alignItems: 'center'       
    },

    commentsText: {
        marginLeft: 6,
    },

    locationText: {
        marginLeft: 6,
        marginRight: 16,
    },
  
});