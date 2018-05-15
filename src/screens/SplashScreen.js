import React from 'react'
import {View} from 'react-native'
import firebase from 'react-native-firebase'

export const SplashScreen = function(props) {
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      props.navigation.navigate('LoginScreen');
    } else {
      let userID = user.uid;
      let userRef = firebase.database().ref('users').child(userID.toString());
      userRef.once('value', (dataSnapshot) => {
        if (dataSnapshot.exists()) {
          //todo add user data to local storage
          props.navigation.navigate('HomeStack');
          console.log('HERE');
        } else {
          props.navigation.navigate('CreateProfileScreen');
        }
      });
    }
  });
  return <View/>;
};
