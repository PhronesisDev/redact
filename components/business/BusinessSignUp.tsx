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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
function BusinessSignUp({ navigation }) {
    const [name, setName] = React.useState<string>("");
    const handleLogin = (e) => {
        e.preventDefault();
        // Handle login logic here
    };


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <ImageBackground source={require('../../images/redact-transparent.png')} style={{ width: '100%', height: '100%' }}>
                    <View style={{ backgroundColor: 'transparent', flex: 2 }}>

                    </View>
                    <View style={styles.buttonContainer}>
                        <TextInput
                            label="Name"
                            value={name}
                            onChangeText={text => setName(text)}
                            style={{marginBottom:5}}
                        />
                        <Touch style={styles.button} onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.buttonText}>Next</Text>
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
        height: windowHeight
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