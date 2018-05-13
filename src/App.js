import React from 'react';
import {YellowBox} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import {LoginScreen} from './screens/LoginScreen';
import {UserProfileScreen} from './screens/UserProfileScreen';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCT', 'Class RCTC'])

export class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

const RootStack = createStackNavigator(
  {
    LoginScreen:  LoginScreen,
    UserProfileScreen: UserProfileScreen
  },
  {
    initialRouteName: 'LoginScreen',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff000'
    },
  });
