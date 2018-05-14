import React, {Component} from 'react'
import {StyleSheet, View} from 'react-native'
import {Container, Header, Title, Button, Body, Content, Text, Form, Item, Input} from "native-base"
import firebase from 'react-native-firebase'


export class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false,
      email: '',
      emailError: '',
      password: '',
      passwordError: '',
      text: '',
    }
  }

  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.openHomeScreen(user.uid);
      }
    })
  }

  componentWillUnmount() {
    this.authSubscription()
  }

  static navigationOptions = ({navigation}) => ({
    header: (
      <Header>
        <Body>
        <Title>Login</Title>
        </Body>
      </Header>
    ),
  });

  render() {
    return (
      <Container>
        <Content padder>
          <Form>
            <Item rounded error={!!this.state.emailError} style={styles.inputBoxContainer}>
              <Input
                placeholder='Email'
                keyboardType='email-address'
                style={styles.inputBox}
                onBlur={() => this.validateEmail()}
                onChangeText={(email) => this.setState({email: email})}
              />
            </Item>
              {!this.state.emailError ? null :
                <Text style={styles.errorMessage}>{this.state.emailError}</Text>}
            <Item rounded error={!!this.state.passwordError} style={styles.inputBoxContainer}>
              <Input
                placeholder='Password'
                secureTextEntry
                style={styles.inputBox}
                onBlur={() => this.validatePassword()}
                onChangeText={(password) => this.setState({password: password})}
              />
            </Item>
              {!this.state.passwordError ? null :
                <Text style={styles.errorMessage}>{this.state.passwordError}</Text>}
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Button style={styles.loginButtons} block success onPress={this.register}>
                <Text>Register</Text>
              </Button>
              <Button style={styles.loginButtons} block success onPress={this.login}>
                <Text>Login</Text>
              </Button>
            </View>
          </Form>
        </Content>
      </Container>
    )
  }

  validateEmail = () => {
    let email = this.state.email;
    if (!email || email.length === 0) {
      this.setState({emailError: 'Email required'});
      return false
    }
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      this.setState({emailError: 'Not a valid email'});
      return false
    }
    this.setState({emailError: ''});
    return true
  };

  validatePassword = () => {
    let password = this.state.password;
    if (!password || password.length === 0) {
      this.setState({passwordError: 'Password required'});
      return false
    }
    if (password.length < 6) {
      this.setState({passwordError: 'Password must be at least 6 characters'});
      return false
    }
    this.setState({passwordError: ''});
    return false
  };

  register = () => {
    let emailValid = this.validateEmail();
    let passwordValid = this.validatePassword();
    if (!(emailValid && passwordValid)) return;

    firebase.auth()
    .createUserAndRetrieveDataWithEmailAndPassword(this.state.email, this.state.password)
    .catch(error => {
      if (error.code === 'auth/invalid-email') {
        this.setState({emailError: 'Not a valid email'});
      }
      if (error.code === 'auth/email-already-in-use') {
        this.setState({emailError: 'This email has already been registered\nUse the Login button'});
      }
      if (error.code === 'auth/weak-password') {
        this.setState({passwordError: 'Password must be more complex'});
      }
    })
  };

  login = () => {
    firebase.auth()
    .signInAndRetrieveDataWithEmailAndPassword(this.state.email, this.state.password)
    .catch(error => {
      if (error.code === 'auth/invalid-email') {
        this.setState({emailError: 'Not a valid email'});
      }
      if (error.code === 'auth/user-disabled') {
        this.setState({emailError: 'This email has been disabled\nPlease use another'});
      }
      if (error.code === 'auth/user-not-found') {
        this.setState({emailError: 'No account for this email address'});
      }
      if (error.code === 'auth/wrong-password') {
        this.setState({passwordError: 'Incorrect password for this account'});
      }
    })
  };

  openHomeScreen = (userID) => {
    //todo store userID
    //todo get and store user Details
    this.props.navigation.navigate('SplashScreen')
  };
}

const styles = StyleSheet.create({
  inputBoxContainer: {
    marginVertical: 10
  },
  inputBox: {
    marginHorizontal: 15
  },
  errorMessage: {
    color: 'red'
  },
  loginButtons: {
    flex: 1,
    marginHorizontal: 5,
    marginVertical: 10
  }
});

