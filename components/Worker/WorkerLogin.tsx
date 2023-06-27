import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity as Touch,
    Dimensions,
    View,
    ImageBackground,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign'
import Worker from './provider/Worker';
import { WorkerContextArgs, createWorkerContext } from './provider/WorkerContext';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const image = { uri: '.' }


function WorkerLogin({ navigation }) {
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = useState<string>("")
    const handleLogin = (e) => {
        e.preventDefault();
        // Handle login logic here
    };

    const context = createWorkerContext();
    return (
        <SafeAreaView style={{ flex: 1 }}>
         
                
                    <View style={styles.container}>
                    <ImageBackground source={require('../../images/redact-transparent.png')} style={{ width: '100%', height: '100%' }}>
                        <View style={{ backgroundColor: 'transparent', flex: 1 }}>
    
                        </View>
                        <View style={styles.buttonContainer}>
                            <TextInput
                                label="Email"
                                value={email}
                                onChangeText={text => setEmail(text)}
                                style={{ marginBottom: 20 }}
                            />
                            <TextInput
                                label="Password"
                                value={password}
                                secureTextEntry
                                onChangeText={text => setPassword(text)}
                                style={{ marginBottom: 20 }}
                            />
                            <Text>Forgot Password?  <Touch style={{marginTop:1}}><Text style={{ color: 'red' }}>Reset</Text></Touch></Text>
                            <Touch style={styles.button} onPress={() => navigation.navigate('Dashboard')}>
                                <Text style={styles.buttonText}>Login</Text>
                            </Touch>
                            <Touch style={styles.alternativeButton} onPress={() => navigation.navigate('WorkerSignUp')}>
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
        backgroundColor: '#219DBF'
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#024873',
        color: 'white',
        padding: 10,
        width: '100%',
        marginBottom: 10
    },
    alternativeButton: {
        alignItems: 'center',
        backgroundColor: '#049DBF',
        padding: 10,
        width: '100%',
        marginBottom: 10,
        marginTop: 10
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold'
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
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    }
});