import React, {Component} from 'react'
import {Body, Button, Container, Content, Left, List, ListItem, Right, Text, Thumbnail} from "native-base"
import firebase from 'react-native-firebase';
import {FlatList} from 'react-native';

export class SearchScreen extends Component {
  constructor() {
    super();
    // let userID = firebase.auth().currentUser.uid;
    // let email = firebase.auth().currentUser.email;
    this.state = {
      allUserData: [],
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
            extraData={this.state}
            keyExtractor={(item) => item.key}
            renderItem={({item}) =>
              <ListItem avatar>
                <Left><Thumbnail source={require('../profileImage.png')}/></Left>
                <Body>
                <Text>{item.data.name}</Text>
                <Text note>{item.data.department}, {item.data.location}</Text>
                </Body>
                <Right><Text note>{item.data.email}</Text></Right>
              </ListItem>
            }
          />
          <Button onPress={() => console.log(this.state.allUserData)}>
            <Text>butt</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}