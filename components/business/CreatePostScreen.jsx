import React, {useState} from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity as Touch,
  Alert,
} from 'react-native';
import {Card} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

 
const CreatePostScreen = data => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const uploadPost =  () =>{
    return fetch(
      'https://qzpdlhayeb.execute-api.us-east-1.amazonaws.com/prod/posts',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          description: description,
          company: [data.params],
          reference: data.params.registrationNo,
        }),
      },
    )
      .then(() => Alert.alert('Success!', 'Post Successfully Created!')).then(()=> {setDescription(''), setTitle('')})
   
  }
  return (
    <SafeAreaView>
      <View>
        <Card>
          <TextInput
            value={title}
            style={styles.input}
            onChangeText={text => setTitle(text)}
            placeholder="Title"
          />
          <TextInput
            value={description}
            onChangeText={text => setDescription(text)}
            placeholder="Description"
            style={styles.input}
            editable
            multiline
            numberOfLines={4}
            maxLength={40}
          />
          <Card.Actions>
            <Touch style={styles.button} onPress={()=> uploadPost()}>
              <Text style={styles.buttonText}>Post</Text>
            </Touch>
          </Card.Actions>
        </Card>
      </View>
    </SafeAreaView>
  );
};
export default CreatePostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#730360',
    width: windowWidth,
    height: windowHeight,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  textArea: {
    height: '300px',
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
