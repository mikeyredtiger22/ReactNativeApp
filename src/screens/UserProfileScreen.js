import React, {Component} from 'react'
import {StyleSheet, Image, View} from 'react-native';
import {Body, Button, Container, Header, Text, Title} from "native-base"
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
    // let userID = this.props.navigation.getParam('userId', null);
    // this.setState({userID: userID});
    return (
      <Container>
        <Text style={{fontSize: 30}}>
          Welcome back User
        </Text>
        <Button rounded style={styles.search} block primary
                onPress={() => this.props.navigation.push('SearchScreen')}>
          <Text>Search Employees</Text>
        </Button>
        <Image style={styles.image} source={require('../profileImage.png')}>
        </Image>


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
  image: {
    width: '100%',
    height: 200,
    alignSelf: 'center',
    marginTop: 10
  },
  search: {
    width: '90%',
    alignSelf: 'center'
  }
});
