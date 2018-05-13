import React, {Component} from 'react'
import {StyleSheet, View} from 'react-native'
import {Container, Header, Title, Left, Icon, Right, Button, Body, Content, Text, Card, CardItem} from "native-base"
import firebase from 'react-native-firebase'


export class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      isAuthenticated: false,
    };
  }

  componentDidMount() {
    // this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
    //   this.setState({
    //     loading: false,
    //     user,
    //   });
    // });
    firebase.auth().signInAnonymously()
      .then(() => {
        this.setState({
          isAuthenticated: true,
        });
      });
  }

  componentWillUnmount() {
    // this.authSubscription();
  }

  static navigationOptions = ({navigation}) => ({
    header: (
      <Header>
        <Body>
        <Title>Login</Title>
        </Body>
      </Header>
    )
  })

  render() {
    return (
      <Container>
        <Content padder>
          <Text style={{alignSelf: "center"}}>Login 1:30</Text>
          <Text>{this.state.isAuthenticated}</Text>
          <Button block success onPress={this.login()}>
            <Text>Login</Text>
          </Button>
          <View>
            <Text>The following Firebase modules are enabled:</Text>
            {firebase.admob.nativeModuleExists && <Text style={styles.module}>Admob</Text>}
            {firebase.analytics.nativeModuleExists && <Text style={styles.module}>Analytics</Text>}
            {firebase.auth.nativeModuleExists && <Text style={styles.module}>Authentication</Text>}
            {firebase.crashlytics.nativeModuleExists && <Text style={styles.module}>Crashlytics</Text>}
            {firebase.firestore.nativeModuleExists && <Text style={styles.module}>Cloud Firestore</Text>}
            {firebase.messaging.nativeModuleExists && <Text style={styles.module}>Cloud Messaging</Text>}
            {firebase.links.nativeModuleExists && <Text style={styles.module}>Dynamic Links</Text>}
            {firebase.iid.nativeModuleExists && <Text style={styles.module}>Instance ID</Text>}
            {firebase.notifications.nativeModuleExists && <Text style={styles.module}>Notifications</Text>}
            {firebase.perf.nativeModuleExists && <Text style={styles.module}>Performance Monitoring</Text>}
            {firebase.database.nativeModuleExists && <Text style={styles.module}>Realtime Database</Text>}
            {firebase.config.nativeModuleExists && <Text style={styles.module}>Remote Config</Text>}
            {firebase.storage.nativeModuleExists && <Text style={styles.module}>Storage</Text>}
          </View>
        </Content>
      </Container>
    )
  }

  login = () => {
    firebase.auth()
      .signInAnonymouslyAndRetrieveData()
      .then(credential => {
        if (credential) {
          console.log('default app user ->', credential.user.toJSON())
        }
      })
  }
}

const styles = StyleSheet.create({
  label: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
})

