import React from 'react'
import {KeyboardAvoidingView, StyleSheet, View} from 'react-native'
import {Container, Header, Title, Button, Body, Content, Text, Form, Item, Input} from "native-base"
import firebase from 'react-native-firebase'


export class CreateProfileScreen extends React.Component {
  constructor() {
    super();
    this.db = {
      users: firebase.database().ref('users'),
    };
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
      errorMessage: '',
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
            {!this.state.nameError ? null :
            <Text style={styles.errorMessage}>{this.state.nameError}</Text>}
            <Item rounded
                  style={styles.inputBoxContainer}
                  error={!!this.state.nameError}>
              <Input
                style={styles.inputBox}
                onBlur={() => this.validateName()}
                onChangeText={(text) => this.setState({name: text})}
              />
            </Item>

            <Text style={styles.label}>Location</Text>
            {!this.state.locationError ? null :
            <Text style={styles.errorMessage}>{this.state.locationError}</Text>}
            <Item rounded
                  style={styles.inputBoxContainer}
                  error={!!this.state.locationError}>
              <Input
                style={styles.inputBox}
                onBlur={() => this.validateLocation()}
                onChangeText={(text) => this.setState({location: text})}
              />
            </Item>

            <Text style={styles.label}>Department</Text>
            {!this.state.departmentError ? null :
              <Text style={styles.errorMessage}>{this.state.departmentError}</Text>}
            <Item rounded
                  style={styles.inputBoxContainer}
                  error={!!this.state.departmentError} >
              <Input
                style={styles.inputBox}
                onBlur={() => this.validateDepartment()}
                onChangeText={(text) => this.setState({department: text})}
              />
            </Item>

            <Text style={styles.label}>Phone number</Text>
            {!this.state.phoneNumberError ? null :
              <Text style={styles.errorMessage}>{this.state.phoneNumberError}</Text>}
            <Item rounded
                  style={styles.inputBoxContainer}
                  error={!!this.state.phoneNumberError}>
              <Input
                style={styles.inputBox}
                onBlur={() => this.validatePhoneNumber()}
                onChangeText={(text) => this.setState({phoneNumber: text})}
                keyboardType='numeric'
              />
            </Item>

            <Text style={styles.label}>Extra</Text>
            {!this.state.extraError ? null :
              <Text style={styles.errorMessage}>{this.state.extraError}</Text>}
            <Item rounded
                  style={styles.inputBoxContainer}
                  error={!!this.state.extraError}>
              <Input
                style={styles.inputBox}
                // onBlur={() => this.v()}
                onChangeText={(text) => this.setState({extra: text})}
                returnKeyType='done'
              />
            </Item>

            <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
            <View style={styles.buttonContainer}>
              <Button style={styles.buttons} block danger onPress={() => this.validateAll()}>
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

  validateEmail = () => {
  };

  validateName = () => {
    this.setState({errorMessage: ''});
    if (this.nonEmpty(this.state.name)) {
      this.setState({nameError: 'Name required'});
      return false;
    } else {
      this.setState({nameError: ''});
      return true;
    }
  };

  validateLocation = () => {
    this.setState({errorMessage: ''});
    if (this.nonEmpty(this.state.location)) {
      this.setState({locationError: 'Location required'});
      return false;
    } else {
      this.setState({locationError: ''});
      return true;
    }
  };

  validateDepartment = () => {
    this.setState({errorMessage: ''});
    if (this.nonEmpty(this.state.department)) {
      this.setState({departmentError: 'Department required'});
      return false;
    } else {
      this.setState({departmentError: ''});
      return true;
    }
  };

  validatePhoneNumber = () => {
    this.setState({errorMessage: ''});
    if (this.nonEmpty(this.state.phoneNumber)) {
      this.setState({phoneNumberError: 'Phone number required'});
      return false;
    } else {
      this.setState({phoneNumberError: ''});
      return true;
    }
  };

  // validateExtra = () => {
  //   if (this.nonEmpty(this.state.name)) {
  //     this.setState({nameError: 'Name required'});
  //     return false;
  //   } else {
  //     this.setState({nameError: ''});
  //     return true;
  //   }
  // };

  validateAll = () => {
    let allFields = [
      {validate: (this.validateName), name: 'Name'},
      {validate: (this.validateLocation), name: 'Location'},
      {validate: (this.validateDepartment), name: 'Department'},
      {validate: (this.validatePhoneNumber), name: 'Phone number'},
      // {validate: (this.validateExtra), name: 'Extra'},
    ];

    let error = false;
    let errorMessage = '';
    for (let i = 0; i < allFields.length; i++) {
      let field = allFields[i];
      let valid = field.validate();
      console.log(valid);
      if (!valid) {
        error = true;
        errorMessage = field.name + ' is not valid'
      }
    }
    if (error) {
      this.setState({errorMessage: errorMessage});
    } else {
      this.setState({errorMessage: ''});
    }
  };

  nonEmpty = (val) => {
    return (!val || val.length === 0);
  };

  submit = () => {
    this.validateAll();
    if (this.state.errorMessage) return;
    let userID = firebase.auth().currentUser.uid;
    let userDetails = {
      name: this.state.name,
      location: this.state.location,
      department: this.state.department,
      phoneNumber: this.state.phoneNumber,
    };
    this.db.users.child(userID).set(userDetails, (r) => console.log(r));
  }
}

const styles = StyleSheet.create({
  label: {},
  errorMessage: {
    color: 'red',
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

