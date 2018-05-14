import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Container, Header, Title, Button, Body, Content, Text, Form, Item, Input} from "native-base"
import firebase from 'react-native-firebase'


export class CreateProfileScreen extends React.Component {
  constructor() {
    super();
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

            <Text style={styles.label}>First Name</Text>
            <Item rounded style={styles.inputBoxContainer}>
              <Input
                style={styles.inputBox}
                // onBlur={() => this.method()}
                // onChangeText={(email) => this.method({email: email})}
              />
            </Item>

            <View style={{flex: 1, flexDirection: 'row'}}>
              <Button style={styles.loginButtons} block success>
                <Text>Button 1</Text>
              </Button>
              <Button style={styles.loginButtons} block success >
                <Text>Button 2</Text>
              </Button>
            </View>
          </Form>
          <Button primary rounded onPress={() => this.submit()} >
            <Text>Submit</Text>
          </Button>
        </Content>
      </Container>
    )
  }

  submit = () => {
    //validate fields
    //Store user details locally
    //Send to database
    //Navigate to Home or Splash
    this.props.naivgator.navigate('HomeStack');
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
  }
});

