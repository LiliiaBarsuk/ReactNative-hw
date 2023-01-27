import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,    
    TouchableOpacity,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
    FlatList,
    Image
} from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import { useSelector } from 'react-redux';

import { doc, setDoc, collection, getDocs } from "firebase/firestore";

import { db } from '../../../firebase/config';


export default function CommentsScreen({route}) {
    const [isKeabordShown, setIsKeabordShown] = useState(false);
    const [comment, setComment] = useState('');
    const [commentsList, setCommentsList] = useState('');

    const { login } = useSelector(state => state.auth);
    const { postId, photo } = route.params;

    useEffect(() => {
        getCommentsList();

    }, []);

    async function createComment() {
        const uniqName = Date.now().toString();
        await setDoc(doc(db, "posts", postId, "comments", uniqName), {
            login,
            comment,
            createdAt: commentDate(),
        });

        setComment('');
        hideKeaboard();
    }

    async function getCommentsList() {
        const querySnapshot = await getDocs(collection(db, "posts", postId, "comments"));
        if (querySnapshot) {
            setCommentsList(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        }        
    }

    function hideKeaboard() {
        setIsKeabordShown(false);
        Keyboard.dismiss();
    }

    function onInputFocus() {
        setIsKeabordShown(true);
    }
    return (

        <TouchableWithoutFeedback onPress={hideKeaboard}>
            
            <View style={styles.container}>

                    <View style={styles.picture} >                
                        <Image source={{uri: photo}} style={{width: '100%', height: 240, borderRadius: 8,}} />
                    </View>
                    
                    <FlatList data={commentsList} keyExtractor={(item) => item.id} renderItem={({ item, index }) => (
                    <View style={{
                        ...styles.commentsList,
                        marginLeft: index % 2 === 0 ? "auto" : 0,
                        marginRight: index % 2 !== 0 ? "auto" : 0
                    }} >
                            <Text style={styles.login}>{ item.login }</Text>
                            <View style={styles.commentTextContainer}>
                                <Text style={styles.commentText}>{ item.comment }</Text>
                                <Text style={styles.commentDate}>{ item.createdAt }</Text>
                            </View>
                        </View>
                    )}  />

                    <TextInput
                        placeholder='Comment'
                        placeholderTextColor="#BDBDBD"
                        textAlign='left'
                        style={styles.commentInput}
                        value={comment}
                        onFocus={onInputFocus}
                        onChangeText={(value) => setComment(value)}
                    />

                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={styles.makeCommentButton}
                        onPress={createComment}
                    >
                        <AntDesign name="arrowup" size={24} color="#ffffff" />
                    </TouchableOpacity>
                
            </View>
            
        </TouchableWithoutFeedback>
        
        );
    };


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingTop: 32,
        paddingBottom: 16,
        paddingLeft: 16,
        paddingRight: 16,        
    },

    picture: {
        marginBottom: 32,
    },

    commentsList: {
        width: '80%',
        borderRadius: 10,
        padding: 16,
        backgroundColor: '#f6f6f6',
        marginBottom: 24,
    },

    commentsItem: {
        marginLeft: "auto",
    },

    login: {},

    commentTextContainer: {
        
    },

    commentText: {
        fontFamily: "Roboto-Regular",
        fontSize: 13,
        color: '#212121',
    },

    commentDate: {
        fontFamily: "Roboto-Regular",
        fontSize: 10,
        color: '#bdbdbd',
    },

    commentInput: {
        height: 50,
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: "#212121",
        backgroundColor: '#f6f6f6',
        borderWidth: 1,        
        borderColor: '#e8e8e8',
        borderRadius: 100,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16,
        paddingRight: 50,
        marginTop: 'auto',
    },

    makeCommentButton: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        alignItems: "center",
        justifyContent: "center",
        width: 34,
        height: 34,
        borderRadius: 50,
        backgroundColor: '#ff6c00',

    },

});


function commentDate() {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hours = date.getHours();
    let min = date.getMinutes();

    if (day.length === 1) {
        day = "0" + day;
    }

    if (month.length === 1) {
        month = "0" + month;
    }

    if (hours.length === 1) {
        hours = "0" + hours;
    }

    if (min.length === 1) {
        min = "0" + min;
    }

    return `${day} ${month} ${year} | ${hours}:${min}`;
}