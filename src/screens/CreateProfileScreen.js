import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Container, Header, Title, Button, Body, Content, Text, Form, Item, Input} from "native-base"
import firebase from 'react-native-firebase'


export class CreateProfileScreen extends React.Component {
  constructor() {
    super();
    this.ref = firebase.database().ref('usersTest');
    this.state = {
      name: '',
      nameError: '',
      location: '',
      locationError: '',
      department: '',
      departmentError: '',
      phoneNumber: '',
      phoneNumberError: '',
      extra: '',
      extraError: '',
      error: 'pp',
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
                onBlur={() => this.validateEmail()}
                onChangeText={(text) => this.setState({name: text})}
              />
            </Item>
            <Text style={styles.label}>Location</Text>
            <Item rounded style={styles.inputBoxContainer}>
              <Input
                style={styles.inputBox}
                onBlur={() => this.validateEmail()}
                onChangeText={(text) => this.setState({location: text})}
              />
            </Item>
            <Text style={styles.label}>Department</Text>
            <Item rounded style={styles.inputBoxContainer}>
              <Input
                style={styles.inputBox}
                onBlur={() => this.validateEmail()}
                onChangeText={(text) => this.setState({department: text})}
              />
            </Item>
            <Text style={styles.label}>Phone number</Text>
            <Item rounded style={styles.inputBoxContainer}>
              <Input
                style={styles.inputBox}
                onBlur={() => this.validateEmail()}
                onChangeText={(text) => this.setState({phoneNumber: text})}
                keyboardType='numeric'
              />
            </Item>
            <Text style={styles.label}>Extra</Text>
            <Item rounded style={styles.inputBoxContainer}>
              <Input
                style={styles.inputBox}
                onBlur={() => this.validateEmail()}
                onChangeText={(text) => this.setState({extra: text})}
                returnKeyType='done'
              />
            </Item>
            <Text style={styles.errorMessage}>{this.state.error}</Text>
            <View style={styles.buttonContainer}>
              <Button style={styles.buttons} block danger>
                <Text>Cancel</Text>
              </Button>
              <Button style={styles.buttons} block success onPress={() => this.submit()}>
                <Text>Register</Text>
              </Button>
            </View>
          </Form>
        </Content>
      </Container>
    )
  }

  setText = (text) => {
    this.setState({text: text});
  };

  validateEmail = () => {
    this.validateAll();
  };

  validateName = () => {
    let name = this.state.name;
    if (!name || name.length === 0) {
      this.setState({nameError: 'Name required'});
      return false
    }
    this.setState({nameError: ''});
    return false
  };

  validateAll = () => {
    let allFields = [
      {val: (this.state.name), name: 'Name'},
      {val: (this.state.location), name: 'Location'},
      {val: (this.state.department), name: 'Department'},
      {val: (this.state.phoneNumber), name: 'Phone number'}
      // {val: (this.state.extra), name: 'Extra'},
    ];
    this.validateFields(allFields);
  };

  validateFields = (allFields) => {
    for (let i = 0; i < allFields.length; i++) {
      let {val, name} = allFields[i];

      if (!val || val.length === 0) {
        this.setState({error : name + ' required'});
      } else {
        this.setState({error: ''});
      }
    }
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
  label: {},
  errorMessage: {
    color: 'red'
  },
  inputBoxContainer: {
    marginVertical: 10,
  },
  inputBox: {
    marginHorizontal: 15,
  },
  buttons: {
    flex: 1,
    marginHorizontal: 5,
    marginVertical: 10,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
  },
});

