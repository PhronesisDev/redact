import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    Button,
    TouchableOpacity as Touch,
    Dimensions,
    View,
    ImageBackground,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const image = { uri: '.' }
function Login({navigation}) {
    const handleLogin = (e) => {
        e.preventDefault();
        // Handle login logic here
    };

    return (
        <View style={styles.container}>
            <ImageBackground  source={require('../../images/redact-transparent.png')} style={{width:'100%', height:'100%'}}>
                <View style={{ backgroundColor: 'transparent', flex: 4 }}>

                </View>
                <View style={styles.buttonContainer}>
                    <Touch style={styles.button} onPress={()=> navigation.navigate('WorkerLogin')}>
                        <Text style={styles.buttonText}>Login As Worker</Text>
                    </Touch>
                    <Text style={{ textAlign: 'center', fontWeight:'bold' }}>Or</Text>
                    <Touch style={styles.alternativeButton}>
                        <Text style={styles.buttonText}>Login As Company</Text>
                    </Touch>
                </View>
            </ImageBackground>



        </View>


    );
}

export default Login;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
        backgroundColor:'#219DBF'
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
        justifyContent: 'flex-end',
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