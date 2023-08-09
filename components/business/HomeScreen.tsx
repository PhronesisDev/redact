import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity as Touch } from 'react-native';
import { Avatar, Button, Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = ({ navigation }) => {
  const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
  return (
    <View>
       <Card style={styles.card}>
    <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
    <Card.Content>
      <Text >Card title</Text>
      <Text>Card content</Text>
    </Card.Content>
    <Card.Actions style={styles.iconRow} >
      <Touch  style={styles.iconRow}><Icon name={'ban'} size={25} color={'black'}/></Touch>
      <Touch  style={styles.iconRow}><Icon name={'check'} size={25} color={'black'}/></Touch>
      <Touch  style={styles.iconRow}><Icon name={'times'} size={25} color={'black'}/></Touch>
      <Touch  style={styles.iconRow}><Icon name={'envelope-o'} size={25} color={'black'}/></Touch>
    </Card.Actions>
  </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  iconRow: {
    flexDirection: 'row',          // Arrange icons horizontally
    justifyContent: 'space-between', // Evenly space icons along the row
    paddingHorizontal: 20,         // Add horizontal padding if needed
    alignItems: 'center',          // Align icons vertically
    // You can add more styles as needed
  },
  card:{
    margin:5,
    justifyContent:'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
