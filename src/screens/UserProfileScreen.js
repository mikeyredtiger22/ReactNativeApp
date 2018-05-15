import React, {Component} from 'react'
import {StyleSheet, Image, View} from 'react-native';
import {Body, Button, Card, CardItem, Container, Header, Text, Title} from "native-base"
import firebase from 'react-native-firebase'

export class UserProfileScreen extends Component {
  constructor() {
    super();
    let userID = firebase.auth().currentUser.uid;
    let email = firebase.auth().currentUser.email;
    this.state = {
      userID: userID,
      email: email,
      userData: {}
    };

    this.loadUserData(userID);
  }

  loadUserData = (userID) => {
    let userDataRef = firebase.database().ref('users').child(userID);
    userDataRef.once('value', (dataSnapshot) => {
      if (dataSnapshot.exists()) {
        this.setState({userData: dataSnapshot.val()})
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

  componentDidMount() {
    // this.setState({userData: this.props.navigation.getParam('userData', {})});
  }

  render() {
    let userID = firebase.auth().currentUser.uid;
    // this.setState({userID: userID});
    return (
      <Container>
        <Button rounded style={styles.search} block primary
                onPress={() => this.props.navigation.push('SearchScreen')}>
          <Text>Search Employees</Text>
        </Button>
        <Card style={styles.card}>
          <CardItem header bordered style={styles.container}>
            <Image style={styles.image}
                   resizeMode={'cover'}
                   source={require('../profileImage.png')}>
            </Image>
          </CardItem>
          <CardItem bordered>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.field}>{this.state.userData.name}</Text>
          </CardItem>
          <CardItem bordered>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.field}>{this.state.email}</Text>
          </CardItem>
          <CardItem bordered>
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.field}>{this.state.userData.phoneNumber}</Text>
          </CardItem>
          <CardItem bordered>
            <Text style={styles.label}>Location</Text>
            <Text style={styles.field}>{this.state.userData.location}</Text>
          </CardItem>
          <CardItem>
            <Text style={styles.label}>Department</Text>
            <Text style={styles.field}>{this.state.userData.department}</Text>
          </CardItem>
        </Card>
        {/*
        search button navigate (better UI affordance)
        image (better sizing)

        Name
        Department
        ...

        Edit profile button (move to header)
        Logout (move to header)
        */}
        <View style={styles.buttonContainer}>
          <Button success style={styles.buttons}
                  onPress={this.logout}>
            <Text>Logout</Text>
          </Button>
          <Button block primary style={styles.buttons}
                  onPress={this.logout}>
            <Text>Edit</Text>
          </Button>
        </View>
      </Container>
    )
  };

  logout = () => {
    // firebase.auth().signOut()
    console.log(this.state.userData.name);
  };
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5
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
    marginTop: 10
  },
  label: {
    width: '30%',
    alignSelf: 'flex-start',
    fontWeight: 'bold'
  },
  field: {
    width: '70%',
    alignSelf: 'flex-start'
  },
  buttons: {
    alignSelf: 'center',
    flex: 1,
    marginHorizontal: 5,
    marginVertical: 10
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '92%',
    alignSelf: 'center',
  }
});
