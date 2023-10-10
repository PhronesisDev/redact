import React, {useState} from 'react';
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
import Icon from 'react-native-vector-icons/AntDesign';
import Worker from './provider/Worker';
import {WorkerContextArgs, createWorkerContext} from './provider/WorkerContext';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const image = {uri: '.'};

function WorkerLogin({navigation}) {
  const [identityNumber, setIdentityNumber] = React.useState<string>('');
  const [password, setPassword] = useState<string>('');
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
    // <SafeAreaView style={{flex: 1}}>
    //   <View style={styles.container}>
    //     <ImageBackground
    //       source={require('../../images/redact-transparent.png')}
    //       style={{width: 350, height: 350}}>
      
    //         <TextInput
    //           label="Identity Number"
    //           value={identityNumber}
    //           onChangeText={text => setIdentityNumber(text)}
    //           style={{marginBottom: 20}}
    //         />
    //         <TextInput
    //           label="Password"
    //           value={password}
    //           secureTextEntry
    //           onChangeText={text => setPassword(text)}
    //           style={{marginBottom: 20}}
    //         />
      
    //         <Touch style={styles.button} onPress={() => workerLogin()}>
    //           <Text style={styles.buttonText}>Login</Text>
    //         </Touch>
    //         <Touch
    //           style={styles.alternativeButton}
    //           onPress={() => navigation.navigate('WorkerSignUp')}>
    //           <Text style={styles.buttonText}>Sign Up</Text>
    //         </Touch>
    //         <Text style={{marginLeft:190, fontWeight:'bold', fontSize:10, marginTop:10,color:"black"}}>
    //           Forgot Password?{' '}
    //           <Touch style={{marginTop: 1}}>
    //             <Text style={{color: 'red'}}>Reset</Text>
    //           </Touch>
    //         </Text>
       
    //     </ImageBackground>
    //   </View>
    // </SafeAreaView>
    <SafeAreaView style={{flex: 1}}>

      <View style={styles.container}>
        <Image
          style={styles.bgImage}
          source={require('../../images/redact-transparent.png')}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Identity Number"
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            value={identityNumber}
            onChangeText={text => setIdentityNumber(text)}
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
          onPress={()=> workerLogin()}>
          <Text style={styles.loginText}>Login</Text>
        </Touch>

        <Touch
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('WorkerSignUp')}>
          <Text style={styles.btnText}>Sign Up</Text>
        </Touch>
      </View>
    </SafeAreaView>
  );
}

export default WorkerLogin;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#049DBF',
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
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingHorizontal: 10,
//     backgroundColor: '#219DBF',
//     width: windowWidth,
//     height: windowHeight,
//     paddingTop:10
//   },
//   button: {
//     alignItems: 'center',
//     backgroundColor: '#024873',
//     color: 'white',
//     padding: 10,
//     width: '100%',
//     marginBottom: 10,
//   },
//   alternativeButton: {
//     alignItems: 'center',
//     backgroundColor: '#049DBF',
//     padding: 10,
//     width: '100%',
//     marginBottom: 10,
//     marginTop: 10,
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   buttonContainer: {
//     flex: 1,
//     justifyContent: 'space-evenly',
//     backgroundColor: 'white',
//     padding: 10,
//     borderWidth: 1,
//     borderColor: 'grey',
//     borderTopLeftRadius: 10,
//     borderTopRightRadius: 10,
//     shadowColor: 'black',
//     shadowOffset: {width: -2, height: 4},
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//   },
// });
