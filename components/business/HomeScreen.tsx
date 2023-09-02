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
} from 'react-native';
import {Avatar, Button, Card, MD2Colors, Tooltip} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
const HomeScreen = ({route}) => {
  const LeftContent = (avatar: string) => <Avatar.Icon icon={avatar} />;
  const [posts, setPosts] = useState([]);

  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    () => true,
  );
  const getPosts = async ()=> await   fetch(
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
    getPosts()
  }, [route.params?.registrationNo, posts]);

  console.log('posts: ', posts);
  const deletePost = async (id: string)=> {
   return await  fetch(`https://qzpdlhayeb.execute-api.us-east-1.amazonaws.com/prod/posts?id=${id}`,
    {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  ).then(()=> Alert.alert('Success!', 'Post Successfully deleted!'))
    .catch(() => Alert.alert('Error!', 'An error occurred while trying to delete post.'));
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
                    onPress={() =>
                      deletePost(post._id)
                    
                      
                    }
                    style={styles.iconRow}>
                    <Icon name={'trash'} size={25} color={'black'} />
                  </Touch>
                </Tooltip>
              </Card.Actions>
              <ScrollView>
                {post.applicants?.map(applicant => (
                  <Card style={styles.card}>
                    <Card.Title
                      title={applicant.name}
                      subtitle={applicant.status}
                      left={props => (
                        <Avatar.Icon {...props} icon={applicant.avatar} />
                      )}
                    />
                    <Card.Actions style={styles.iconRow}>
                      <Touch
                        onPress={() =>
                          Alert.alert(
                            'Report!',
                            'Successfully Reported candidate!',
                          )
                        }
                        style={styles.iconRow}>
                        <Icon name={'ban'} size={25} color={'black'} />
                      </Touch>
                      <Touch
                        onPress={() =>
                          Alert.alert(
                            'Approved!',
                            'Successfully Approved candidate!',
                          )
                        }
                        style={styles.iconRow}>
                        <Icon name={'check'} size={25} color={'black'} />
                      </Touch>
                      <Touch
                        onPress={() =>
                          Alert.alert(
                            'Removed!',
                            'Successfully removed candidate!',
                          )
                        }
                        style={styles.iconRow}>
                        <Icon name={'times'} size={25} color={'black'} />
                      </Touch>
                      <Tooltip title="Send Offer">
                        <Touch
                          onPress={() =>
                            Alert.alert(
                              'Email sent!',
                              'Successfully sent email!',
                            )
                          }
                          style={styles.iconRow}>
                          <Icon name={'envelope-o'} size={25} color={'black'} />
                        </Touch>
                      </Tooltip>
                    </Card.Actions>
                  </Card>
                ))}
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
});

export default HomeScreen;
