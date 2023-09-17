import React, { useRef, useState } from 'react';
// import {S3, S3Client, PutObjectCommand} from '@aws-sdk/client-s3';
// import {fromCognitoIdentityPool} from '@aws-sdk/credential-providers';
import {ScrollView, Text, Alert, StyleSheet, TouchableOpacity as Touch, Button } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

// import { RNCamera } from 'react-native-camera';
// const s3Client = new S3Client({
//   region: 'us-east-1',
//   credentials: fromCognitoIdentityPool({
//     // Replace the value of 'identityPoolId' with the ID of an Amazon Cognito identity pool in your Amazon Cognito Region.
//     identityPoolId: 'us-east-1:ba729f22-b4cb-4a94-af94-d48651cc0560',
//     // Replace the value of 'region' with your Amazon Cognito Region.
//     clientConfig: {region: 'us-east-1'},
//   }),
// });

// enum MessageType {
//   SUCCESS,
//   FAILURE,
//   EMPTY,
// }

// async function uploadFileToS3(
//   bucketName: string,
//   key: string,
//   fileBuffer: string,
//   contentType: string,
// ) {
//   try {
//     const params = {
//       Bucket: bucketName,
//       Key: key,
//       Body: fileBuffer,
//       ContentType: contentType,
//     };

//     const uploadCommand = new PutObjectCommand(params);

//     const result = await s3Client.send(uploadCommand);
//     console.log('File uploaded successfully:', result);
//     return MessageType.SUCCESS;
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     return MessageType.FAILURE;
//   }
// }


const RekognitionScreen = () => {
    const devices = useCameraDevices()
    const device = devices.back
  
    if (device == null) return <><Text>Loading...</Text></>
      
  
  return (
    <ScrollView>
      <Text style={{fontSize: 20}}>Rekognition Screen</Text>
      <Camera
      device={device}
      isActive={true}
    />
    </ScrollView>
  );
};
export default RekognitionScreen;

const styles = StyleSheet.create({
    btnAlignment: {
       flex: 1,
       flexDirection: 'column',
       justifyContent: 'flex-end',
       alignItems: 'center',
       marginBottom: 20,
     },
    });