import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import WorkerLogin from './WorkerLogin';
import WorkerSignUp from './WorkerSignUp';
import Dashboard from './Dashboard';
import { CameraPage } from './CameraPage';
import { PermissionsPage } from './PermissionsPage';

const Stack = createNativeStackNavigator();
const WorkerStack: React.FC =  ()=>(
    <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerBackVisible: false,
            headerShown: false,
            statusBarStyle: 'dark',
            animationTypeForReplace: 'push',
          }}
        >

          <Stack.Screen name="WorkerLogin" component={WorkerLogin} />
          <Stack.Screen name="PermissionsPage" component={PermissionsPage} />
          <Stack.Screen name="CameraPage" component={CameraPage}/>
          <Stack.Screen name="WorkerSignUp" component={WorkerSignUp} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
        </Stack.Navigator>
      </NavigationContainer>
)

export default WorkerStack;