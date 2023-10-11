import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import SettingsScreen from '../business/SettingsScreen';
import HomeScreen from './HomeScreen';
import CreatePostScreen from '../business/CreatePostScreen';
import { ProfileScreen } from './ProfileScreen';
const Tab = createBottomTabNavigator();


function Dashboard({route: parser, navigation}) {
console.log('parser: ', parser)
  useEffect(()=> {
    navigation.navigate('Candidates', parser.params)
  }, [parser.params])
 
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
        }else if (route.name ===  "Profile"){
          iconName=focused?'id-card':'address-book-o';
          // navigation.navigate('Profile', parser)
          colors = focused ? 'white': 'black'
        }
        
        return <Icon name={iconName} size={25} color={colors}/>
      },
      tabBarActiveBackgroundColor: '#730360',
      tabBarInactiveBackgroundColor: 'white',
      headerShown: false,
      tabBarLabelStyle:{color:'white'},
    
    })}

  
  
  >
     <Tab.Screen name="Candidates" component={HomeScreen} />
     <Tab.Screen name = "Profile"  component={()=><ProfileScreen route={parser} navigation={navigation}/>}/>
    <Tab.Screen name="SignOut" component={SettingsScreen} />
    
    
  </Tab.Navigator>
 

  );
}

export default Dashboard;
