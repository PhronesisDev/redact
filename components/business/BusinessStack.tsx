import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import BusinessLogin from './BusinessLogin';
import BusinessSignUp from './BusinessSignUp';
import Dashboard from './Dashboard';

const Stack = createNativeStackNavigator();
const BusinessStack: React.FC =  ()=>(
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerBackVisible: false}}>

          <Stack.Screen name="BusinessLogin" component={BusinessLogin} />
          <Stack.Screen name="BusinessSignUp" component={BusinessSignUp} />
          <Stack.Screen name="Redact" component={Dashboard} />
        </Stack.Navigator>
      </NavigationContainer>
)

export default BusinessStack;