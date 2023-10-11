import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WorkerStack from './components/Worker/WorkerStack';
import UserType from './components/UserType';
import BusinessStack from './components/business/BusinessStack';

function App() {

  const [type, setType] = useState('');
  const Stack = createNativeStackNavigator();

  const stackDisplay = ({type, setType})=>{
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
