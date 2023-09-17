import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import BusinessLogin from './BusinessLogin';
import BusinessSignUp from './BusinessSignUp';
import Dashboard from './Dashboard';
import {PermissionsPage} from './PermissionsPage';
import {CameraPage} from './CameraPage';

const Stack = createNativeStackNavigator();
const BusinessStack: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerBackVisible: false,
        headerShown: false,
        statusBarStyle: 'dark',
        animationTypeForReplace: 'push',
      }}>
      <Stack.Screen name="BusinessLogin" component={BusinessLogin} />
      <Stack.Screen name="PermissionsPage" component={PermissionsPage} />
      <Stack.Screen name="CameraPage" component={CameraPage} />
      <Stack.Screen name="BusinessSignUp" component={BusinessSignUp} />
      <Stack.Screen name="Redact" component={Dashboard} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default BusinessStack;
