import React, {Component} from 'react'
import {StyleSheet, View} from 'react-native';
import {Button, Container, Content, Icon, Text} from "native-base"
import {UserProfile} from '../components/UserProfile';
import firebase from 'react-native-firebase';

export class OtherUserProfileScreen extends Component {
  constructor() {
    super();

    this.state = {
      errorMessage: '',
    }
  }

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.userData.name,
  });

  render() {
    const userData = this.props.navigation.getParam('userData', {});
    return (
      <Container>
        <Content>
          <UserProfile userData={userData}/>
          {!this.state.errorMessage ? null :
            <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>}
          <View style={styles.buttonContainer}>
            <Button block success style={styles.buttons}
                    onPress={this.logout}>
              <Text>Default..</Text>
            </Button>
            <Button block primary style={styles.buttons}
                    onPress={this.setManager}>
              <Text>Set as Manager</Text>
            </Button>
          </View>
        </Content>
      </Container>
    )
  };

  setManager = () => {
    const userID = firebase.auth().currentUser.uid;
    const otherUserID = this.props.navigation.getParam('otherUserID', '');
    if (userID === otherUserID) {
      this.setState({errorMessage: 'Cannot set yourself as manager.'})
    } else {
      console.log('uid', typeof userID, userID);
      firebase.database().ref('users/'+userID+'/manager').set(otherUserID);
      firebase.database().ref('users/'+otherUserID+'/employees/'+userID).set('true');
    }
  }
}

const styles = StyleSheet.create({
  errorMessage: {
    marginLeft: 25,
    color: 'red',
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
