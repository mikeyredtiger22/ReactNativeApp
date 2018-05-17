import React, {Component} from 'react'
import {
  Body, Container, Content, Header, Icon,
  Input, Item, Left, ListItem, Right, Text, Thumbnail,
} from "native-base"
import firebase from 'react-native-firebase';
import {FlatList} from 'react-native';

export class SearchScreen extends Component {
  constructor() {
    super();
    this.state = {
      allUserData: [],
      filteredUserData: [],
      loading: true,
      filterIDs: null,
    };
  }

  componentDidMount() {
    const userIDs = this.props.navigation.getParam('userIDs', null);
    if (userIDs) {
      this.setState({filterIDs: userIDs});
    }

    let allUsersDataRef = firebase.database().ref('users').orderByChild('name');
    allUsersDataRef.once('value', (dataSnapshot) => {
      this.setState({loading: false});
      dataSnapshot.forEach((dataSnapshot) => {
        let userData = {key: dataSnapshot.key, data: dataSnapshot.val()};
        this.setState((prevState) => ({allUserData: [...prevState.allUserData, userData]}));
        this.search('');
      });
    });
  }

  static navigationOptions = ({navigation}) => ({
    header: null
  });

  render() {
    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Input placeholder="Search"
                   onChangeText={(searchText) => this.search(searchText)}/>
            <Icon name="search"/>
          </Item>
        </Header>
        <Content>
          {this.state.loading? <ListItem><Body><Text>Loading Profiles</Text></Body></ListItem> : null}
          <FlatList
            data={this.state.filteredUserData}
            extraData={this.state}
            keyExtractor={(item) => item.key}
            renderItem={({item}) =>
              <ListItem avatar onPress={() =>
                this.props.navigation.push('OtherUserProfileScreen',
                  {otherUserData: item.data, otherUserID: item.key})}>
                <Left><Thumbnail source={require('../profileImage.png')}/></Left>
                <Body>
                <Text>{item.data.name}</Text>
                <Text note>{item.data.department}, {item.data.location}</Text>
                </Body>
                <Right><Text note>{item.data.email}</Text></Right>
              </ListItem>
            }
          />
        </Content>
      </Container>
    )
  }

  search = (searchText) => {
    var filteredUserData = this.state.allUserData;
    if (this.state.filterIDs) {
      filteredUserData = filteredUserData.filter(userData =>
        this.state.filterIDs.includes(userData.key));
    }
    if (searchText) {
      filteredUserData = filteredUserData.filter(userData =>
        userData.data.name.toLowerCase().includes(searchText.toLowerCase()));
    }
    this.setState({filteredUserData: filteredUserData});
  }
}