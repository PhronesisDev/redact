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
function SignUp() {
  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <View>
      <Text>SignUp</Text>
      <Text onPress={handleLogin}>Click here to login</Text>
     
    </View>
  );
}

export default SignUp;
