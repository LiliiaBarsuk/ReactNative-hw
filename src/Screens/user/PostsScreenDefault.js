import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity, FlatList, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

export default function PostsScreenDefaults({ route, navigation }) {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        if(route.params?.postData) {
            setPosts(prevState => [...prevState, route.params.postData]);            
        }
    }, [route.params])  
    return (
            <View style={styles.container}>
                <View style={styles.userInfoContainer}>
                   <Image style={styles.userAvatar}/> 
                   <View style={styles.userInfo} >
                        <Text style={styles.userLogin} >Natali Romanova</Text>
                        <Text style={styles.userEmail} >email@example.com</Text>
                    </View>
                </View>
                    <FlatList 
                        data={posts} 
                        keyExtractor={(item, indx) => indx.toString()} 
                        renderItem={({item}) => (
                            <View style={styles.postContainer}>
                                <View style={styles.imageContainer}>
                                    <Image source={{uri: item.photoUrl}} style={styles.image}/>
                                </View>
                                <Text style={styles.postTitle}>{item.title}</Text>
                                <View style={styles.postInfo}>
                                    <TouchableOpacity style={styles.postAddInfo} onPress={() => navigation.navigate("Comments")}>
                                        <EvilIcons name="comment" size={18} color="#BDBDBD" />
                                        <Text style={styles.commentsText}>0</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.postAddInfo} onPress={() => navigation.navigate("Map")}>
                                        <EvilIcons name="location" size={18} color="#BDBDBD" />
                                        <Text style={styles.locationText}>{item.location}</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        )
                        }/>
                </View>

            
    );
}

const styles = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: 'column',
        
        paddingTop: 32,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: '#ffffff',
      },
      userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 32,
      },
      userAvatar: {
        width: 60,
        height: 60,
        borderRadius: 16,
        backgroundColor: '#BDBDBD',
        marginRight: 8
      },
      userInfo: {

      },
      userLogin: {
        fontFamily: 'Roboto-Bold',
        fontSize: 13,
        color: '#212121'
      },
      userEmail: {
        fontFamily: 'Roboto-Regular',
        fontSize: 11,
        color: 'rgba(33, 33, 33, 0.8)'
      },
      postContainer: {
        marginBottom: 32,
      },
      imageContainer:{
       marginBottom: 8
      },
      image: {
        height: 240,
        borderRadius: 8,
      },
      postTitle: {
        fontFamily: 'Roboto-Medium',
        marginBottom: 11,
        fontSize: 16
      },
      postInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        
      },
      postAddInfo: {
        flexDirection: 'row',
        alignItems: 'center',

      },
      commentsText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color:'#BDBDBD',
        marginLeft: 8,
      },
      locationText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color:'#212121',
        marginLeft: 8,
      }
    

})