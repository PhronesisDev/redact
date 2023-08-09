import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    Button,
    View,
  } from 'react-native';
  import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
  import Icon from 'react-native-vector-icons/FontAwesome';
import SettingsScreen from './SettingsScreen';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
const Tab = createBottomTabNavigator();


function Dashboard() {

  return (
  
    <Tab.Navigator
    screenOptions={({ route }) => ({
    
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        let colors
        if (route.name === 'Candidates') {
          iconName = focused ? 'user' : 'user-o';
          colors = focused ? 'white': 'black'
        } else if (route.name === 'SignOut') {
          iconName = focused ? 'sign-out' : 'sign-out';
          colors = focused ? 'black': 'black'
        }
        
        return <Icon name={iconName} size={25} color={colors}/>
      },
      tabBarActiveBackgroundColor: '#730360',
      tabBarInactiveBackgroundColor: 'white',
      headerShown: false,
      tabBarLabelStyle:{color:'white'}
    })}

  
  
  >
     <Tab.Screen name="Candidates" component={HomeScreen} />
    <Tab.Screen name="SignOut" component={SettingsScreen} />
  </Tab.Navigator>
 

  );
}

export default Dashboard;


