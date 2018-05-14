import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Container, Header, Title, Button, Body, Content, Text, Form, Item, Input} from "native-base"
import firebase from 'react-native-firebase'


export class CreateProfileScreen extends React.Component {
  constructor() {
    super();
    this.ref = firebase.database().ref('usersTest');
    this.state = {
      text: '',
    }
  }

  static navigationOptions = ({navigation}) => ({
    header: (
      <Header>
        <Body>
        <Title>Create Profile</Title>
        </Body>
      </Header>
    ),
  });

  render() {
    return (
      <Container>
        <Header>
          <Body>
          <Title>Create Profile</Title>
          </Body>
        </Header>
        <Content padder>
          <Form>

            <Text style={styles.label}>Name</Text>
            <Item rounded style={styles.inputBoxContainer}>
              <Input
                style={styles.inputBox}
                // onBlur={() => this.method()}
                onChangeText={(email) => this.setText(email)}
              />
            </Item>
            <Text style={styles.label}>Location</Text>
            <Item rounded style={styles.inputBoxContainer}>
              <Input
                style={styles.inputBox}
                // onBlur={() => this.method()}
                // onChangeText={(email) => this.method({email: email})}
              />
            </Item>
            <Text style={styles.label}>Department</Text>
            <Item rounded style={styles.inputBoxContainer}>
              <Input
                style={styles.inputBox}
                // onBlur={() => this.method()}
                // onChangeText={(email) => this.method({email: email})}
              />
            </Item>
            <Text style={styles.label}>Phone number</Text>
            <Item rounded style={styles.inputBoxContainer}>
              <Input
                style={styles.inputBox}
                // onBlur={() => this.method()}
                // onChangeText={(email) => this.method({email: email})}
              />
            </Item>
            <Text style={styles.label}>Email</Text>
            <Item rounded style={styles.inputBoxContainer}>
              <Input
                style={styles.inputBox}

                // onBlur={() => this.method()}
                // onChangeText={(email) => this.method({email: email})}
              />
            </Item>

            <View style={styles.buttonContainer}>
              <Button style={styles.buttons} block danger>
                <Text>Cancel</Text>
              </Button>
              <Button style={styles.buttons} block success onPress={() => this.sum()} >
                <Text>Register</Text>
              </Button>
            </View>
          </Form>
          <Button primary rounded onPress={() => this.submit()} >
            <Text>Sumbmit</Text>
          </Button>
          {firebase.firestore.nativeModuleExists && <Text style={styles.module}>Cloud Firestore</Text>}
          {firebase.database.nativeModuleExists && <Text style={styles.module}>Realtime Database</Text>}
        </Content>
      </Container>
    )
  }

  setText = (text) => {
    this.setState({text: text});
  };

  sum = () => {
    console.log('try connect');

  };

  submit = () => {
    console.log('sending.....');
    //validate fields
    //Store user details locally
    //Send to database
    //Navigate to Home or Splash
    // this.props.naivgator.navigate('HomeStack');

    this.ref.push({newobj: 'hellooo'}, (r) => console.log(r));
    console.log('ob', objRef);
  }
}

const styles = StyleSheet.create({
  label: {

  },
  inputBoxContainer: {
    marginVertical: 10
  },
  inputBox: {
    marginHorizontal: 15
  },
  buttons: {
    flex: 1,
    marginHorizontal: 5,
    marginVertical: 10
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row'
  }
});

