import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity as Touch,
  Dimensions,
  View,
  ImageBackground,
  Alert,
} from 'react-native';
import {TextInput} from 'react-native-paper';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const image = {uri: '.'};

function WorkerLogin({navigation}) {
  const [identityNumber, setIdentityNumber] = React.useState('');
  const [password, setPassword] = useState('');
  const handleLogin = e => {
    e.preventDefault();
    // Handle login logic here
  };
  const workerLogin = async () =>
    await fetch(
      'https://pl1s3odbbi.execute-api.us-east-1.amazonaws.com/prod/worker-authenticate',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identityNo: identityNumber,
          password: password,
        }),
      },
    )
      .then(response => response.json())
      .then(data => {
        console.log(data);
        data.message === 'Successfully Logged In'
          ? navigation.navigate('PermissionsPage', data.info)
          : Alert.alert(
              'Error!',
              'An error occurred while trying to authenticate',
            );
      });
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <ImageBackground
          source={require('../../images/redact-transparent.png')}
          style={{width: '100%', height: '100%'}}>
          <View style={{backgroundColor: 'transparent', flex: 1}}></View>
          <View style={styles.buttonContainer}>
            <TextInput
              label="Identity Number"
              value={identityNumber}
              onChangeText={text => setIdentityNumber(text)}
              style={{marginBottom: 20}}
            />
            <TextInput
              label="Password"
              value={password}
              secureTextEntry
              onChangeText={text => setPassword(text)}
              style={{marginBottom: 20}}
            />
            <Text>
              Forgot Password?{' '}
              <Touch style={{marginTop: 1}}>
                <Text style={{color: 'red'}}>Reset</Text>
              </Touch>
            </Text>
            <Touch style={styles.button} onPress={() => workerLogin()}>
              <Text style={styles.buttonText}>Login</Text>
            </Touch>
            <Touch
              style={styles.alternativeButton}
              onPress={() => navigation.navigate('WorkerSignUp')}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </Touch>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

export default WorkerLogin;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#219DBF',
    width: windowWidth,
    height: windowHeight,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#024873',
    color: 'white',
    padding: 10,
    width: '100%',
    marginBottom: 10,
  },
  alternativeButton: {
    alignItems: 'center',
    backgroundColor: '#049DBF',
    padding: 10,
    width: '100%',
    marginBottom: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    padding: 10,
    borderWidth: 1,
    borderColor: 'grey',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    shadowColor: 'black',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
