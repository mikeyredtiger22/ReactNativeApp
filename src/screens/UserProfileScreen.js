import React, {Component} from 'react'
import {StyleSheet, Image, View} from 'react-native';
import {Body, Button, Card, CardItem, Container, Content, Header, Icon, Text, Title} from "native-base"
import firebase from 'react-native-firebase'
import {UserProfile} from '../components/UserProfile';

export class UserProfileScreen extends Component {
  constructor() {
    super();
    let userID = firebase.auth().currentUser.uid;
    let email = firebase.auth().currentUser.email;
    this.state = {
      userID: userID,
      email: email,
      userData: {},
    };

    this.loadUserData(userID);
  }

  loadUserData = (userID) => {
    let userDataRef = firebase.database().ref('users').child(userID);
    userDataRef.once('value', (dataSnapshot) => {
      if (dataSnapshot.exists()) {
        this.setState({userData: dataSnapshot.val()});
      }
    });
  };

  static navigationOptions = ({navigation}) => ({
    header: (
      <Header>
        <Body>
        <Title>Profile</Title>
        </Body>
      </Header>
    ),
  });

  render() {
    if (!this.state.userData) {
      return <View/>
    } else {
      return (
        <Container>
          <Content>
            <Button rounded style={styles.search} block primary
                    onPress={() => this.props.navigation.navigate('SearchScreen')}>
              <Text>Search Employees</Text>
              <Icon name="search"/>
            </Button>
            <UserProfile userData={this.state.userData}
                         showManagerButtons={false}/>
            <View style={styles.buttonContainer}>
              <Button block danger style={styles.buttons}
                      onPress={this.logout}>
                <Text>Logout</Text>
              </Button>
            </View>
          </Content>
        </Container>
      )
    }
  };

  logout = () => {
    firebase.auth().signOut();
    setTimeout(() => {
      this.props.navigation.navigate('LoginScreen');
    }, 20);
  };
}

const styles = StyleSheet.create({
  search: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
  buttons: {
    alignSelf: 'center',
    flex: 1,
    marginHorizontal: 5,
    marginVertical: 10,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '92%',
    alignSelf: 'center',
  },
});
