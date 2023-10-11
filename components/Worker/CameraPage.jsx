import {
    View,
    TouchableOpacity as Pressable,
    PermissionsAndroid,
    Button,
    Alert,
  } from 'react-native';

  import React from 'react';
  import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
  
  
  export function CameraPage({navigation, route}) {

  
    console.log("route data: ", route.params)
    const requestCameraPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs access to your camera to take pictures.',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Camera permission granted');
          openCamera();
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };
  
    const openCamera = () => {
      const options = {
        maxHeight: 250,
        maxWidth: 350,
        mediaType:'images',
        includeBase64: true
      };
  
      launchImageLibrary(options, async(response) => {
     
          // createBucket()
          console.log("data: ",response?.assets[0]?.base64)
          const imageUri = response?.assets[0]?.uri;
          // Convert the image data to base64
  
         
      
  
         await fetch(
            'https://qzpdlhayeb.execute-api.us-east-1.amazonaws.com/prod/facialrecognition',
            {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                idNo: route?.params?.identityNo,
                data:response?.assets[0]?.base64
              }),
            }
          )
            .then(response => {
              if (!response.ok) {
                Alert.alert("Authentication Failed", 'Failed to authenticate!');
              }
              return response.json(); // Parse the JSON response
            })
            .then(data => {
              console.log('Response:', data); // Handle the response data here
              const confidence = data.data
              confidence > 70 ? navigation.navigate('Dashboard', route.params ): Alert.alert("Authentication Failed", 'Failed to authenticate!');
            })
            .catch(err => {
              console.log('Error:', err);
            });
          
       
      });
    };
  
    return (
      <View>
        <Button title="Open Camera" onPress={()=>requestCameraPermission()} />
        {/* <Button color="#68a0cf" title="Create Bucket" onPress={createBucket} /> */}
      </View>
    );
  }
  