import React from 'react'
import {View} from 'react-native'
import firebase from 'react-native-firebase'

export const SplashScreen = function(props) {
  let user = firebase.auth().currentUser;
  if (!user) {
    props.navigation.navigate('LoginScreen');
  } else {
    let userID = user.uid;
    let userRef = firebase.database().ref('users').child(userID.toString());
    userRef.once('value', (dataSnapshot) => {
      if (dataSnapshot.exists()) {
        props.navigation.navigate('HomeStack');
      } else {
        props.navigation.navigate('CreateProfileScreen');
      }
    });
  }
  return <View/>;
};
