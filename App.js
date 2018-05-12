import React, { Component } from 'react';

import {
  Button,
  Platform,
  StyleSheet,
  Text,
  View,
  YellowBox
} from 'react-native';

import {
  createStackNavigator,
} from 'react-navigation';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCT'])

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

class LoginScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Login Screen</Text>
        <Button
          title="Login"
          onPress={() => this.props.navigation.navigate('CreateUserScreen')}
        />
      </View>
    );
  }
}

class CreateUserScreen extends React.Component {
  static navigationOptions =  {
    title: 'Home',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff000',
  };
  render() {
    const count = this.props.navigation.getParam('count', 0);
    return (
      <View>
        <Text>Create User Screen {count}</Text>
        <View/>
        <Button
          title="Open New"
          onPress={() => this.props.navigation.push('CreateUserScreen', {count: count+1})}
        />
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    LoginScreen:  LoginScreen,
    CreateUserScreen: CreateUserScreen
  },
  {
    initialRouteName: 'LoginScreen'
  });

// type Props = {};
// export default class App extends Component<Props> {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Welcome to React Native!
//         </Text>
//         <Text style={styles.instructions}>
//           To get started, edit App.js
//         </Text>
//         <Text style={styles.instructions}>
//           {instructions}
//         </Text>
//       </View>
//     );
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
