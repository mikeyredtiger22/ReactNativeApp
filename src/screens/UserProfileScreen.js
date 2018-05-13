import React, {Component} from 'react'
import {Body, Button, Container, Header, Text, Title} from "native-base"

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
    let userID = this.props.navigation.getParam('userId', null);
    // this.setState({userID: userID});
    return (
      <Container>
        <Button block primary onPress={this.props.navigation.push('SearchScreen')}>
          <Text>Search Employees</Text>
        </Button>


        {/*search button navigate
        image
        Name
        Department

        Edit profile button
        */}
      </Container>
    )
  }
}