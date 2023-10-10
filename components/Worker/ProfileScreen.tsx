import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
} from 'react-native';
import {Card, TextInput, Button} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import AWS from 'aws-sdk';
import RNFS from 'react-native-fs';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const ProfileScreen = ({navigation, route}) => {
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [avatar, setAvatar] = useState<string>('');
  const [file, setFile] = useState('');
  const [details, setDetails] = useState([]);
//   console.log('route: ', route);

  const getProfileDetails = async () =>
    await fetch(
      `https://qzpdlhayeb.execute-api.us-east-1.amazonaws.com/prod/profile?id=${route.params.identityNo}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(data => {
        setDetails(data.profileData);
        console.log(details);
      });

  useEffect(() => {
    getProfileDetails();
  }, [route]);


  const save = async () =>
    await fetch(
      'https://qzpdlhayeb.execute-api.us-east-1.amazonaws.com/prod/profile',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          avatar: avatar,
          file: file,
          reference: route.params.identityNo,
          description,
        }),
      },
    )
      .then(result => console.log('result: ', result))
      .catch(error => console.log(error));
  function openImageLibraryAndSelectImage() {
    // Define options for the image picker
    const options = {
      maxHeight: 250,
      maxWidth: 350,
      mediaType: 'images',
      includeBase64: true,
    };

    // Launch the image library
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        // User cancelled the image library
        console.log('Image library selection cancelled');
      } else if (response.error) {
        // Error occurred while opening the image library
        console.error('Image library error:', response.error);
      } else {
        // Image selected successfully, you can access it using response.uri
        console.log('Selected Image URI:', response?.assets[0].base64);
        setAvatar(response.assets[0].base64);
      }
    });
  }

  async function openFilePickerAndSelectFile() {
    try {
      await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
        allowMultiSelection: false, // Specify the types of files you want to allow
        // You can specify more specific types like DocumentPicker.types.pdf, DocumentPicker.types.doc, etc.
      }).then(async response => {
        console.log(response);

        const pathToLocalFile = response[0].uri; // Replace with the actual file path

        const fileContent = await RNFS.readFile(pathToLocalFile, 'base64');
        setFile(fileContent);
      });
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
      } else {
        // An error occurred while opening the file picker
        console.error('File picker error:', error);
      }
    }
  }

  console.log("details: ", details);

  const userDetails = details?.filter(detail=> detail?.reference === route?.params?.identityNo);

  console.log("details: ", userDetails);

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>

      {userDetails ? (
        <Image style={styles.avatar} source={{uri: userDetails[0]?.avatar}} />
      ) : (
        <Image
          style={styles.avatar}
          source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}
        />
      )}
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.name}>
            {route.params.username + " " + route.params.surname ?? 'John Doe'}
          </Text>
          <Text style={styles.info}>UX Designer / Mobile developer</Text>
          <Text style={styles.description}>
            {userDetails[0]?.description ??
              'Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an'}
          </Text>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => setModalVisibility(true)}>
            <Text>Update Profile</Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibility}
          onRequestClose={() => {
            setModalVisibility(!modalVisibility);
          }}>
          <View style={{flex: 3}}>
            <Card style={{marginTop: 30, padding: 6}}>
              <View>
                <TextInput
                  label={'Email'}
                  value={email}
                  onChangeText={text => setEmail(text)}
                />
                <TextInput
                  style={{
                    margin: 3,
                    borderStyle: 'solid',
                    borderColor: 'black',
                    borderWidth: 1,
                    backgroundColor: 'white',
                    height: 250,
                  }}
                  label={'Description'}
                  multiline={true}
                  placeholder="Enter a description of your company..."
                  value={description}
                  onChangeText={text => {
                    setDescription(text);
                  }}
                />
                <TouchableOpacity
                  onPress={() => openImageLibraryAndSelectImage()}>
                  <Button style={styles.buttonSave}>
                    <Text style={styles.buttonText}>Select Image</Text>
                  </Button>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => openFilePickerAndSelectFile()}>
                  <Button style={styles.buttonSave}>
                    <Text style={styles.buttonText}>Select File</Text>
                  </Button>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => save()}>
                  <Button style={styles.buttonSave}>
                    <Text style={styles.buttonText}>Save</Text>
                  </Button>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setModalVisibility(false)}>
                  <Button style={styles.alternativeButton}>
                    <Text style={styles.buttonText}>Close</Text>
                  </Button>
                </TouchableOpacity>
              </View>
            </Card>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 300,
    height: windowHeight,
    backgroundColor: 'lightgray',
  },
  header: {
    backgroundColor: '#730360',
    height: 200,
  },
  container: {
    width: windowWidth,
    height: windowHeight,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130,
  },
  name: {
    fontSize: 22,
    color: 'black',
    fontWeight: '600',
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    alignItems: 'center',
    padding: 30,
  },
  info: {
    fontSize: 16,
    color: 'black',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: 'black',
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonSave: {
    alignItems: 'center',
    backgroundColor: '#024873',
    color: 'white',
    padding: 10,
    width: '100%',
    marginBottom: 10,
    borderRadius: 2,
  },
  alternativeButton: {
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: 'black',
    borderColor: 'black',
    borderStyle: 'solid',
    padding: 10,
    width: '100%',
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 2,
  },
});
