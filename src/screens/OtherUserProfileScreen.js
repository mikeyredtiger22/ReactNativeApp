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
    title: navigation.state.params.otherUserData.name,
  });

  render() {
    const userData = this.props.navigation.getParam('otherUserData', {});
    return (
      <Container>
        <Content>
          <UserProfile userData={userData}
                       showManagerButtons={true}
                       viewManager={this.viewManager}
                       viewEmployees={this.viewEmployees}/>
          {!this.state.errorMessage ? null :
            <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>}
          <View style={styles.buttonContainer}>
            <Button block success style={styles.buttons}
                    onPress={this.setManager}>
              <Text>Set As My manager</Text>
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
      firebase.database().ref('users/'+userID+'/manager').once('value', (dataSnapshot) => {
        let previousManagerUserID = dataSnapshot.val();
        firebase.database().ref('users/'+userID+'/manager').set(otherUserID);
        firebase.database().ref('users/'+otherUserID+'/employees/'+userID).set('true');
        firebase.database().ref('users/'+previousManagerUserID+'/employees/'+userID).remove();
      });
    }
  };

  viewManager = () => {
    const otherUserData = this.props.navigation.getParam('otherUserData', {});
    const managerID = otherUserData.manager;
    if (!managerID) {
      this.setState({errorMessage: 'This user does not have a manager'});
      return;
    }

    let userManagerDataRef = firebase.database().ref('users').child(managerID);
    userManagerDataRef.once('value', (dataSnapshot) => {
      if (!dataSnapshot.exists()) {
        this.setState({errorMessage: 'This user does not have a manager'});
      } else {
        this.props.navigation.push('OtherUserProfileScreen',
          {otherUserData: dataSnapshot.val(), otherUserID: managerID});
      }
    });
  };

  viewEmployees = () => {
    const otherUserData = this.props.navigation.getParam('otherUserData', {});
    const employees = otherUserData.employees;
    if (employees) {
      this.props.navigation.push('SearchScreen', {userIDs: Object.keys(employees)});
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
