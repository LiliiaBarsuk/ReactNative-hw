import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { signOutUser } from '../../../redux/auth/authOperations';

import PostsScreenDefault from "./PostsScreenDefault";
import CommentsScreen from "./CommentsScreen";
import MapScreen from "./MapScreen";

import { AntDesign, Octicons, MaterialIcons, Ionicons } from '@expo/vector-icons';

const PostsStack = createStackNavigator();

export default function PostsScreen() {
    const dispatch = useDispatch();

  function signOut() {
    dispatch(signOutUser());
  }
    return (
        <PostsStack.Navigator screenOptions={{ tabBarShowLabel: false,  }}>
            <PostsStack.Screen name='DefaultScreen' component={PostsScreenDefault}  options={{
      tabBarLabel: "",
      headerRight: () => (
          <TouchableOpacity activeOpacity={0.6}
              style={{ marginRight: 20 }} onPress={signOut}>
              <MaterialIcons name="logout" size={24} color="#BDBDBD" />
          </TouchableOpacity>                        
      ),
      headerTitleAlign: "center",
      headerTitle: 'Posts',
      headerTitleStyle: { fontFamily: 'Roboto-Medium', fontSize: 17, color: '#212121'},
      headerStyle: { borderBottomWidth: 1, borderColor: 'rgba(0, 0, 0, 0.3)' },
      tabBarIcon: ({focused, size, color}) => <AntDesign name="appstore-o" size={24} color="#212121CC" />
      }} />
            <PostsStack.Screen name="Map" component={MapScreen} options={{
                    headerTitle: 'Map',
                    headerTitleAlign: "center",
                    headerStyle: { borderBottomWidth: 1, borderColor: 'rgba(0, 0, 0, 0.3)' },
                    tabBarHideOnKeyboard: true,
                    // tabBarShowLabel: false,
                }}/>
            <PostsStack.Screen name="Comments" component={CommentsScreen}  options={{
                    headerTitle: 'Comments',
                    headerTitleAlign: "center",
                    headerStyle: { borderBottomWidth: 1, borderColor: 'rgba(0, 0, 0, 0.3)' },
                    tabBarHideOnKeyboard: true,
                    // tabBarShowLabel: false,                    
                }}/>
        </PostsStack.Navigator>
    )
}

