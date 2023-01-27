import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity } from 'react-native';


import PostsScreen from '../Screens/user/PostsScren';
import ProfileScreen from '../Screens/user/Profile';
import CreatePostsScreen from '../Screens/user/CreatePostsScreen';

import { AntDesign, Octicons, MaterialIcons, Ionicons } from '@expo/vector-icons';

const MainTab = createBottomTabNavigator();

export default function HomeRouter({ navigation }) {
  

  return (<MainTab.Navigator initialRouteName="Posts"
  screenOptions={{ tabBarShowLabel: false,  }}
  tabBarOptions={{tabStyle: { borderTopWidth: 1, borderColor: 'rgba(0, 0, 0, 0.1)' } }}>
  <MainTab.Screen 
    name='Posts' 
    component={PostsScreen}
    options={{headerShown: false, 
    tabBarIcon: ({focused, size, color}) => <AntDesign name="appstore-o" size={24} color="#212121CC" />}} />
  <MainTab.Screen 
    name='Create' 
    component={CreatePostsScreen} 
    options={{
      tabBarIcon: ({focused, size, color}) => <AntDesign name="plus" size={24} color="#212121CC" />,
      headerLeft: () => (
          <TouchableOpacity activeOpacity={0.6}
              style={{ marginLeft: 16 }}>
              <Ionicons name="arrow-back" size={24} color="#212121CC" />
          </TouchableOpacity>                        
      ),
      headerTitleAlign: "center",
      headerTitle: 'Create post',
      headerTitleStyle: { fontFamily: 'Roboto-Medium', fontSize: 17, color: '#212121'},
      headerStyle: { borderBottomWidth: 1, borderColor: 'rgba(0, 0, 0, 0.3)' },
    }} 
    />
  <MainTab.Screen 
    name='Profile' 
    component={ProfileScreen}
    options={{
      headerShown: false,
      tabBarIcon: ({focused, size, color}) => <Octicons name="person" size={24} color="#212121CC" />
    }} 
     />
</MainTab.Navigator>)
}

