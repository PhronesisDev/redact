import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity as Touch,
  ScrollView,
  BackHandler,
  Alert,
  ActivityIndicator,
  ImageBackground,
  Text,
  Modal,
  View,
  Pressable,
} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  MD2Colors,
  Tooltip,
  TextInput,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Redact_Business_Applications,
  Redact_Business_Data,
  Redact_Reports,
} from '../types';

const HomeScreen = ({route}) => {
  
  const [posts, setPosts] = useState([]);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [message, setMessage] = useState();
  const [currentUserProfile, setCurrentUserProfile] = useState();

  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    () => true,
  );
  // console.log('route data: ', route);
  const getPosts = async () =>
    await fetch(
      `https://qzpdlhayeb.execute-api.us-east-1.amazonaws.com/prod/posts/all`,
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
        setPosts(data.jobPosts);
      })
      .catch(error => console.error(error));
      
  const getProfileData = async () =>
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
      .then(data => setCurrentUserProfile(data?.profileData?.filter(current=> current?.reference === route?.params?.identityNo)));

      


  const file = currentUserProfile[0]?.file;
  console.log("file: ", file)
  useEffect(() => {
    getPosts();
    getProfileData();
  }, [route.params?.registrationNo, posts]);

  const deletePost = async (id) => {
    return await fetch(
      `https://qzpdlhayeb.execute-api.us-east-1.amazonaws.com/prod/posts?id=${id}`,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(() => Alert.alert('Success!', 'Post Successfully deleted!'))
      .catch(() =>
        Alert.alert('Error!', 'An error occurred while trying to delete post.'),
      );
  };

  const sendMail = async () =>
    await fetch(
      `https://qzpdlhayeb.execute-api.us-east-1.amazonaws.com/prod/sendmail`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: from,
          receiver: to,
          message: message,
        }),
      },
    )
      .then(response => response.json())
      .then(data => {
        Alert.alert('Email Sent Successfully', `${data.message}!`);
        setFrom('');
        setTo('');
        setMessage('');
      })
      .catch(error => console.error(error));

  const report = async (body) =>
    await fetch(
      `https://qzpdlhayeb.execute-api.us-east-1.amazonaws.com/prod/reports`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    )
      .then(response => response.json())
      .then(data => {
        console.log('reports: ', data);
        Alert.alert('Successfully Reported!', `User successfully reported!`);
      })
      .catch(error => console.error(error));

  const addApplicantToPost = async (
    applicant,
    post,
  ) => {
    console.log("Applicants: ", post.applicants.push(applicant));
    console.log(`post applicants updated: ${post.applicants}`);

    await fetch(
      `https://qzpdlhayeb.execute-api.us-east-1.amazonaws.com/prod/posts?id=${post._id}`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          applicants: post.applicants,
        }),
      },
    )
      .then(response => response.json())
      .then(data => {
        Alert.alert('Applied!', 'Successfully applied!');
        console.log(data);
      })
      .catch(err => {
        console.log(err);
        Alert.alert('Error!', 'An error occurred while trying to apply.');
      });
  };
  const applicant = {...route.params, file: file};
  // console.log('applicant: ', applicant);
  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={require('../../images/redact-transparent.png')}
        style={{width: '100%', height: '100%'}}>
        {posts ? (
          posts?.map(post => (
            <Card style={{margin: 3}}>
              <Card.Title
                title={post.title}
                subtitle={post.description}
                left={props => <Avatar.Icon {...props} icon={'rocket'} />}
              />
              <Card.Actions style={styles.iconRow}>
                <Tooltip title="Send Offer">
                  <Touch
                    onPress={() => addApplicantToPost(applicant, post)}
                    style={styles.iconRow}>
                    <Text>Apply</Text>
                  </Touch>
                </Tooltip>
              </Card.Actions>
            </Card>
          ))
        ) : (
          <ActivityIndicator
            style={{justifyContent: 'center', alignSelf: 'center'}}
            animating={true}
            size={40}
            color={MD2Colors.white}
          />
        )}
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  iconRow: {
    flexDirection: 'row', // Arrange icons horizontally
    justifyContent: 'space-between', // Evenly space icons along the row
    paddingHorizontal: 20, // Add horizontal padding if needed
    alignItems: 'center', // Align icons vertically
    // You can add more styles as needed
  },
  card: {
    margin: 5,
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#730360',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'blue',
    borderRadius: 5,
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

export default HomeScreen;
