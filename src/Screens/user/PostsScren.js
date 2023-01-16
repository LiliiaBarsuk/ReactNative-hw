import React from 'react';
import { moduleName } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import PostsScreenDefault from "./PostsScreenDefault";
import CommentsScreen from "./CommentsScreen";
import MapScreen from "./MapScreen";

const PostsStack = createStackNavigator();

export default function PostsScreen() {
    return (
        <PostsStack.Navigator>
            <PostsStack.Screen name='DefaultScreen' component={PostsScreenDefault} options={{headerShown: false}} />
            <PostsStack.Screen name="Map" component={MapScreen}/>
            <PostsStack.Screen name="Comments" component={CommentsScreen}/>
        </PostsStack.Navigator>
    )
}

