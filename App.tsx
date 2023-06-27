/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {StyleSheet, useColorScheme} from 'react-native';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Login from './components/Worker/Login';
import Signup from './components/SignUp';
import Dashboard from './components/Worker/Dashboard';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WorkerLogin from './components/Worker/WorkerLogin';
import WorkerSignUp from './components/Worker/WorkerSignUp';



function App(): JSX.Element {

  const Stack = createNativeStackNavigator();
  return (
    
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="WorkerLogin" component={WorkerLogin} />
          <Stack.Screen name="WorkerSignUp" component={WorkerSignUp} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
        </Stack.Navigator>
      </NavigationContainer>
  
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
