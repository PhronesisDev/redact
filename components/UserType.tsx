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

type UserTypeProps = {
    setType: (type: string )=> void
}
const UserType: React.FC<UserTypeProps> =({setType})=> {
    
    return (
        <View style={styles.container}>
            <ImageBackground  source={require('../images/redact-transparent.png')} style={{padding:5, width:320, height:320}}>
                <View style={{ backgroundColor: 'transparent', flex: 4 }}>

                </View>
              
                    <Touch style={styles.button} onPress={()=> setType('individual')} >
                        <Text style={styles.buttonText}>Login As Individual</Text>
                    </Touch>
                    <Text style={{ textAlign: 'center', fontWeight:'bold' }}>Or</Text>
                    <Touch style={styles.alternativeButton} onPress={()=> setType('company')}>
                        <Text style={styles.buttonText}>Login As Company</Text>
                    </Touch>
               
               
            </ImageBackground>



        </View>


    );
}

export default UserType;
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
        marginLeft:10,
        marginBottom: 10,
        borderColor:"white",
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