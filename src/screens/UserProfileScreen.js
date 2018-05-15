import React, {Component} from 'react'
import {StyleSheet, Image, View} from 'react-native';
import {Body, Button, Card, CardItem, Container, Header, Text, Title} from "native-base"
import firebase from 'react-native-firebase'

export class UserProfileScreen extends Component {
  constructor() {
    super();
    this.state = {
      userID: null
    }
  }

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
    let userID = firebase.auth().currentUser.uid;
    // this.setState({userID: userID});
    return (
      <Container>
        <Button rounded style={styles.search} block primary
                onPress={() => this.props.navigation.push('SearchScreen')}>
          <Text>Search Employees</Text>
        </Button>
        <Card style={styles.card}>
          <CardItem style={styles.container}>
            <Image style={styles.image}
                   resizeMode={'cover'}
                   source={require('../profileImage.png')}>
            </Image>
          </CardItem>
          <CardItem>
            <Text>My ID: {userID}</Text>
          </CardItem>
          <CardItem>
            <Text>My ID: {userID}</Text>
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

        <View style={styles.centerContainer}>
          <Button primary rounded onPress={this.logout}>
            <Text>Logout</Text>
          </Button>
        </View>
      </Container>
    )
  };

  logout = () => {
    firebase.auth().signOut()
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
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'blue',
  },
  search: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10
  }
});
