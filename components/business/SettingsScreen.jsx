import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SettingsScreen = ({navigation}) => {
  return  navigation.navigate('BusinessLogin')
 
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
