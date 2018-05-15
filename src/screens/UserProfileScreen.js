import React, {Component} from 'react'
import {StyleSheet, Image, View} from 'react-native';
import {Body, Button, Card, CardItem, Container, Content, Header, Icon, Text, Title} from "native-base"
import firebase from 'react-native-firebase'
import Communications from 'react-native-communications';
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
        console.log('val',dataSnapshot.val());
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
    // console.log(this.get());
    // if (Object.keys(this.get()).length === 0) {
    //   return <Text>Loading Profile</Text>
    // } else {
      return (
      <Container>
        <Content>
          <Button rounded style={styles.search} block primary
                  onPress={() => this.props.navigation.navigate('SearchScreen')}>
            <Text>Search Employees</Text>
            <Icon name="search"/>
          </Button>
          <UserProfile userData={{ name: 'W', phoneNumber: '07817440999', location: 'W', email: 'jeafoosnd.sdfbion@outlook.co.uk', department: 'W' }} />
          <View style={styles.buttonContainer}>
            <Button block success style={styles.buttons}
                    onPress={this.editProfile}>
              <Text>Logout</Text>
            </Button>
            <Button block primary style={styles.buttons}
                    onPress={this.logout}>
              <Icon name="create"/>
              <Text>Edit</Text>
            </Button>
          </View>
        </Content>
      </Container>
      )
    // }
  };

  // get = () => {
  //   return this.state.userData;
  // };

  logout = () => {
    firebase.auth().signOut()
  };

  editProfile = () => {
    //todo
  };

  formatCase = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  card: {
    flex: 0,
    marginTop: 10,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',

  },
  container: {
    width: 200,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginTop: 5,
    marginBottom: 5,
    width: 200,
    height: 200,
    alignSelf: 'center',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'blue',
  },
  search: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
  label: {
    width: '30%',
    alignSelf: 'flex-start',
    fontWeight: 'bold',
  },
  field: {
    paddingStart: 5,
    width: '70%',
    alignSelf: 'flex-start',
  },
  fieldWithIcons: {
    flex: 1,
    paddingStart: 5,
    width: '70%',
    flexDirection: 'row',
  },
  fieldIcon: {
    alignSelf: 'flex-end',
    fontSize: 20,
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
