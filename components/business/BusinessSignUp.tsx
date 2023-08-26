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
function BusinessSignUp({navigation}) {
  const [registrationNo, setRegistrationNo] = React.useState<string>('');
  const [password, setPassword] = useState<string>('');
  const registrationNoRegex = /(19|2[0-9])\d{2}\/\d{6}\/\d{2}/;
  const handleSignUp = async () =>
    !registrationNoRegex.test(registrationNo)
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
          'https://qzpdlhayeb.execute-api.us-east-1.amazonaws.com/prod/signup',
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
            data !== null
              ? Alert.alert('Successfully Registered!', 'Welcome to Redact!')
              : Alert.alert(
                  'An error occurred !',
                  'An error occured while trying to sign you up :(',
                );
          });

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <ImageBackground
          source={require('../../images/redact-transparent.png')}
          style={{width: '100%', height: '100%'}}>
          <View style={styles.buttonContainer}>
            <TextInput
              label="Registration Number"
              value={registrationNo}
              onChangeText={text => setRegistrationNo(text)}
              style={{marginBottom: 5}}
            />
            <TextInput
              label="Password"
              value={password}
              onChangeText={text => setPassword(text)}
              style={{marginBottom: 5}}
            />
            <Touch style={styles.button}>
              <Text style={styles.buttonText} onPress={() => handleSignUp()}>
                Submit
              </Text>
            </Touch>
            <Touch
              style={styles.alternativeButton}
              onPress={() => navigation.navigate('BusinessLogin')}>
              <Text style={styles.buttonText}>Back</Text>
            </Touch>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

export default BusinessSignUp;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#730360',
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
