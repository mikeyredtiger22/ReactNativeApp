import React, {Component} from 'react'
import {Button, Container, Content, Text} from "native-base"
import firebase from 'react-native-firebase';
import {FlatList} from 'react-native';

export class SearchScreen extends Component {
  constructor() {
    super();
    // let userID = firebase.auth().currentUser.uid;
    // let email = firebase.auth().currentUser.email;
    this.state = {
      allUserData: []
    };

    // this.loadAllUserData();
  }

  loadAllUserData = () => {

  };

  componentDidMount() {
    let allUsersDataRef = firebase.database().ref('users').orderByChild('name');
    allUsersDataRef.once('value', (dataSnapshot) => {
      dataSnapshot.forEach((dataSnapshot) => {
        let userData = {key: dataSnapshot.key, data: dataSnapshot.val()};
        console.log(userData);
        this.setState((prevState) =>
          ({allUserData: [...prevState.allUserData, userData]}));
      });
    });
  }

  render() {
    console.log(this.state.allUserData);
    return (
      <Container>
        {/*<Button block primary onPress={() => this.props.navigation.push('SearchScreen')}>*/}
          {/*<Text>Search</Text>*/}
        {/*</Button>*/}
        <Content>
          <FlatList
            data={this.state.allUserData}
            renderItem={({item}) => <Text>{item.data.name}</Text>}
            keyExtractor={(item) => item.key}
            extraData={this.state}
          />
          <Button onPress={() => console.log(this.state.allUserData)}>
            <Text>butt</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}