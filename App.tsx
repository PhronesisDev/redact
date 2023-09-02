import React, {useState} from 'react';
import {StyleSheet, useColorScheme,Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WorkerStack from './components/worker/WorkerStack';
import UserType from './components/UserType';
import BusinessStack from './components/business/BusinessStack';
import Dashboard from './components/business/Dashboard';

type StackProps ={
  type: string,
  setType: (type: string)=> void;
}

function App(): JSX.Element {

  const [type, setType] = useState<string>('');
  const Stack = createNativeStackNavigator();

  const stackDisplay: React.FC<StackProps> = ({type, setType})=>{
    if(type === ''){
      return <UserType setType={setType}/>
    }
    if(type === 'individual'){
      return <WorkerStack/>
    }
    if(type === 'company'){
      return<BusinessStack/> 
    }
  }
  return (
   <>
    {stackDisplay({type, setType})}
    {/* <Dashboard/> */}
   </>
   
  
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
