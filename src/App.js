import React from 'react';
import {YellowBox} from 'react-native';
import {createStackNavigator, createSwitchNavigator} from 'react-navigation';
import {SplashScreen} from './screens/SplashScreen';
import {LoginScreen} from './screens/LoginScreen';
import {UserProfileScreen} from './screens/UserProfileScreen';
import {CreateProfileScreen} from './screens/CreateProfileScreen';
import {SearchScreen} from './screens/SearchScreen';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCT', 'Class RCTC',
  'Warning: Overriding previous layout animation']);

export class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

const HomeStack = createStackNavigator(
  {
    UserProfileScreen: UserProfileScreen,
    SearchScreen: SearchScreen
  },
  {
    initialRouteName: 'UserProfileScreen'
  });

const RootStack = createSwitchNavigator(
  {
    SplashScreen: SplashScreen,
    LoginScreen:  LoginScreen,
    CreateProfileScreen: CreateProfileScreen,
    HomeStack: HomeStack
  },
  {
    initialRouteName: 'SplashScreen'
  });
