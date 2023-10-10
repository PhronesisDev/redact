import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity as Touch,
  Dimensions,
  View,
  ImageBackground,
  Image,
  Alert,
} from 'react-native';
import {TextInput} from 'react-native-paper';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const image = {uri: '.'};

function BusinessLogin({navigation}) {
  const [registrationNo, setRegistrationNo] = React.useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [data, setData] = useState();
  const registrationNoRegex = /(19|2[0-9])\d{2}\/\d{6}\/\d{2}/;
  const handleLogin = async () =>
    registrationNoRegex.test(registrationNo)
      ? Alert.alert(
          'Invalid Registration Number',
          'Please enter a valid registration number.',
        )
      : password.length < 6 || password === ''
      ? Alert.alert(
          'Invalid Password',
          'Password cannot be less than 6 characters.',
        )
      : await fetch(
          'https://qzpdlhayeb.execute-api.us-east-1.amazonaws.com/prod/authenticate',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              registrationNo: registrationNo,
              password: password,
            }),
          },
        )
          .then(response => response.json())
          .then(data => {
            console.log('Response: ', JSON.stringify(data.message));

            console.log('data info: ', data.info);
            if (data.message === 'Successfully Logged In') {
              navigation.navigate('PermissionsPage', data.info);
              setRegistrationNo('');
              setPassword('');
            }
            if (data.message === 'Invalid credentials') {
              Alert.alert('Authentication Error: ', data.message);
            }
          });

  return (
    <SafeAreaView style={{flex: 1}}>

      <View style={styles.container}>
        <Image
          style={styles.bgImage}
          source={require('../../images/redact-transparent.png')}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Registration Number"
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            value={registrationNo}
            onChangeText={registrationNo => setRegistrationNo(registrationNo)}
          />
          <Image
            style={styles.inputIcon}
            source={{uri: 'https://img.icons8.com/nolan/40/000000/email.png'}}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            underlineColorAndroid="transparent"
            onChangeText={password => setPassword(password)}
          />
          <Image
            style={styles.inputIcon}
            source={{uri: 'https://img.icons8.com/nolan/40/000000/key.png'}}
          />
        </View>

        <Touch
          style={styles.btnForgotPassword}
          onPress={() => console.log('rest')}>
          <Text style={styles.btnText}>Forgot your password?</Text>
        </Touch>

        <Touch
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </Touch>

        <Touch
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('BusinessSignUp')}>
          <Text style={styles.btnText}>Sign Up</Text>
        </Touch>
      </View>
    </SafeAreaView>
  );
}

export default BusinessLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#730360',
    width: windowWidth,
    height: windowHeight,
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 300,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: '#808080',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
    justifyContent: 'center',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 300,
    borderRadius: 30,
    backgroundColor: 'transparent',
  },
  btnForgotPassword: {
    height: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 10,
    width: 300,
    backgroundColor: 'transparent',
  },
  loginButton: {
    backgroundColor: '#00b5ec',

    shadowColor: '#808080',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,

    elevation: 19,
  },
  loginText: {
    color: 'white',
  },
  bgImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
