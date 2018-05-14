import React from 'react'
import {View} from 'react-native'
import firebase from 'react-native-firebase'

export class SplashScreen extends React.Component {
  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.props.navigation.navigate('LoginScreen');
      } else {
        //if user details (locally or database)
        // this.props.navigation.navigate('HomeStack', {userID: user.uid});
        //else
        this.props.navigation.navigate('CreateProfileScreen', {userID: user.uid});
      }
    })
  }

  componentWillUnmount() {
    this.authSubscription()
  }

  render() {
    return (
      <View>
      </View>
    )
  }
}
