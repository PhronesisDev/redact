import React, {useCallback, useEffect, useState} from 'react';
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
  Linking,
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
  const LeftContent = (avatar: string) => <Avatar.Icon icon={avatar} />;
  const [posts, setPosts] = useState<Redact_Business_Data[]>([]);
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);
  const [from, setFrom] = useState<string>();
  const [to, setTo] = useState<string>();
  const [message, setMessage] = useState<string>();

  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    () => true,
  );
  const getPosts = async () =>
    await fetch(
      `https://qzpdlhayeb.execute-api.us-east-1.amazonaws.com/prod/posts?reference=${route.params?.registrationNo}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(data => setPosts(data.jobPosts))
      .catch(error => console.error(error));
  useEffect(() => {
    getPosts();
  }, [route.params?.registrationNo, posts]);

  const deletePost = async (id: string) => {
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

  const report = async (body: Redact_Reports) =>
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

  const removeUserFromPost = async (
    applicant: Redact_Business_Applications,
    post,
  ) => {
    const newApplicantsList =
      post?.applicants?.filter(user => user !== applicant) ?? [];
    console.log(' new applicants: ', newApplicantsList);
    await fetch(
      `https://qzpdlhayeb.execute-api.us-east-1.amazonaws.com/prod/posts?id=${post._id}`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: post.title,
          description: post.description,
          company: route.params,
          applicants: newApplicantsList,
          reference: route.params.registrationNo,
        }),
      },
    )
      .then(response => response.json())
      .then(data => {
        Alert.alert('Removed!', 'Successfully removed candidate!');
        console.log(data);
      })
      .catch(err => console.log(err));
  };
  const OpenURLButton = (url: string) => {
    const handlePress = async () => {
      // Checking if the link is supported for links with custom URL scheme.
     
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        if(!url){
          Alert.alert("Error!", "Error occurred while trying to view Document")
        }
        await Linking.openURL(url);
      
    }
    
    handlePress();
  }
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
                    onPress={() => deletePost(post._id)}
                    style={styles.iconRow}>
                    <Icon name={'trash'} size={25} color={'black'} />
                  </Touch>
                </Tooltip>
              </Card.Actions>
              <ScrollView>
                {post.applicants?.map((applicant, index) => {
                  console.log("applicant: ", applicant)
                  return(
                  <Card style={styles.card} key={index}>
                    <Card.Title
                      title={applicant.username}
                      subtitle={applicant.status}
                      left={props => (
                        <Avatar.Icon {...props} icon={applicant.avatar} />
                      )}
                    />
                    <Card.Actions style={styles.iconRow}>
                    <Touch onPress={()=> OpenURLButton(applicant?.file)}>
                        <Text>View CV</Text>
                      </Touch>
                      <Touch
                        onPress={() =>
                          report({
                            name: applicant.username,
                            surname: applicant.surname,
                            avatar: applicant.avatar,
                            status: applicant.status,
                            reference: route.params.registrationNo,
                            postId: post._id,
                            companyName: route.params?.companyName,
                            identityNo: applicant.identityNo
                          })
                        }
                        style={styles.iconRow}>
                        <Icon name={'ban'} size={25} color={'black'} />
                      </Touch>
                      <Touch
                        onPress={() => {
                          removeUserFromPost(applicant, post);
                        }}
                        style={styles.iconRow}>
                        <Icon name={'times'} size={25} color={'black'} />
                      </Touch>
                      <Tooltip title="Send Offer">
                        <Touch
                          onPress={() => {
                            setModalVisibility(true);
                          }}
                          style={styles.iconRow}>
                          <Icon name={'envelope-o'} size={25} color={'black'} />
                        </Touch>
                      </Tooltip>
                    </Card.Actions>
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
                              style={{
                                margin: 3,
                                borderStyle: 'solid',
                                borderColor: 'gray',
                                borderWidth: 1,
                                backgroundColor: 'white',
                              }}
                              label={'From:'}
                              placeholder="From:"
                              value={from}
                              onChangeText={text => setFrom(text)}
                            />
                            <TextInput
                              style={{
                                margin: 3,
                                borderStyle: 'solid',
                                borderColor: 'gray',
                                borderWidth: 1,
                                backgroundColor: 'white',
                              }}
                              label={'To:'}
                              placeholder="To:"
                              value={to}
                              onChangeText={text => setTo(text)}
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
                              label={'Message'}
                              multiline={true}
                              placeholder="Enter your message here..."
                              value={message}
                              onChangeText={text => {
                                setMessage(text);
                              }}
                            />
                            <Touch onPress={() => sendMail()}>
                              <Button style={styles.buttonSave}>
                                <Text style={styles.buttonText}>Save</Text>
                              </Button>
                            </Touch>
                            <Touch>
                              <Button
                                onPress={() => setModalVisibility(false)}
                                style={styles.alternativeButton}>
                                <Text style={styles.buttonText}>Close</Text>
                              </Button>
                            </Touch>
                          </View>
                        </Card>
                      </View>
                    </Modal>
                  </Card>
                )})}
              </ScrollView>
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
