import React, {Component} from 'react'
import {StyleSheet} from 'react-native'
import {Container, Header, Title, Button, Body, Content, Text, Form, Item, Input} from "native-base"
import firebase from 'react-native-firebase'


export class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false,
      user: null,
      email: '',
      emailError: '',
      password: '',
      passwordError: '',
      text: '',
    }
  }

  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        user: user,
      });
      console.log('logged in')
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

  log = (text) => {
    this.setState({text: this.state.text + text})
  };

  logout = () => {
    firebase.auth().signOut()
  };

  render() {
    let userID = null;
    if (this.state.user) {
      userID = this.state.user.uid
    }
    return (
      <Container>
        <Content padder>
          <Text style={{alignSelf: "center"}}>Login</Text>
          <Text>Auth: {userID}</Text>
          <Form>
            <Item rounded error={!!this.state.emailError}>
              <Input
                placeholder='Email'
                keyboardType='email-address'
                style={{marginHorizontal: 15}}
                onBlur={() => this.validateEmail()}
                onChangeText={(email) => this.setState({email: email})}
              />
            </Item>
            <Item>
              {!this.state.emailError ? null :
                <Text style={{color: 'red'}}>{this.state.emailError}</Text>}
            </Item>
            <Item rounded error={!!this.state.passwordError}>
              <Input
                placeholder='Password'
                secureTextEntry
                style={{marginHorizontal: 15}}
                onBlur={() => this.validatePassword()}
                onChangeText={(password) => this.setState({password: password})}
              />
            </Item>
            <Text>
              {this.state.text}
            </Text>
            <Item>
              {!this.state.passwordError ? null :
                <Text style={{color: 'red'}}>{this.state.passwordError}</Text>}
            </Item>
          </Form>
          <Button block success onPress={this.login} disabled={this.state.email.length === 0}>
            <Text>Login</Text>
          </Button>
          <Button onPress={this.logout}><Text>Logout</Text></Button>
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

  login = () => {
    let emailValid = this.validateEmail();
    let passwordValid = this.validatePassword();
    if (!(emailValid && passwordValid)) return;


    firebase.auth()
    // .signInAnonymouslyAndRetrieveData()
    .createUserAndRetrieveDataWithEmailAndPassword(this.state.email, this.state.password)
    .then(credential => {
      if (credential) {
        console.log('defaaault app user ->', credential.user.toJSON())
        this.props.navigation.navigate()
      }
    })
    .catch(error => {
      console.warn('error:', error)
    })
  };
}

const styles = StyleSheet.create({
  label: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

