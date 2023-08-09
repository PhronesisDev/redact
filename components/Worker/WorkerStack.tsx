import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import WorkerLogin from './WorkerLogin';
import WorkerSignUp from './WorkerSignUp';
import Dashboard from './Dashboard';

const Stack = createNativeStackNavigator();
const WorkerStack: React.FC =  ()=>(
    <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen name="WorkerLogin" component={WorkerLogin} />
          <Stack.Screen name="WorkerSignUp" component={WorkerSignUp} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
        </Stack.Navigator>
      </NavigationContainer>
)

export default WorkerStack;