import React from 'react'
import {Platform, StyleSheet, View} from 'react-native'
import {
  Container, Header, Title, Button, Body,
  Content, Text, Form, Item, Input, Picker, Icon,
} from "native-base"
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
      phoneNumber: '',
      phoneNumberError: '',
      selectedLocation: '',
      locationError: '',
      selectedDepartment: '',
      departmentError: '',
      selectedRole: '',
      roleError: '',
      errorMessage: '',
      departments: (Platform.OS === 'ios') ? [] : ['Select Department'],
      locations: (Platform.OS === 'ios') ? [] : ['Select Location'],
      roles: (Platform.OS === 'ios') ? [] : ['Select Role'],
    };

    this.loadOptionsFromDatabase();
  }

  loadOptionsFromDatabase = () => {

    firebase.database().ref('locations').once('value', (dataSnapshot) => {
      dataSnapshot.forEach(loc =>
        this.setState((prevState) => ({locations: [...prevState.locations, loc.key]})));
    });

    firebase.database().ref('departments').once('value', (dataSnapshot) => {
      dataSnapshot.forEach(dept =>
        this.setState((prevState) => ({departments: [...prevState.departments, dept.key]})));
    });

    firebase.database().ref('roles').once('value', (dataSnapshot) => {
      dataSnapshot.forEach(role =>
        this.setState((prevState) => ({roles: [...prevState.roles, role.key]})));
    });
  };

  static navigationOptions = ({navigation}) => ({
    header: (
      <Header>
        <Body>
        <Title>Create Profile</Title>
        </Body>
      </Header>
    ),
  });

  locationPickerItems = () => {
    return (this.state.locations.map((loc) =>
      <Picker.Item label={loc} value={loc} key={loc}/>));
  };

  departmentPickerItems = () => {
    return (this.state.departments.map((dept) =>
      <Picker.Item label={dept} value={dept} key={dept}/>));
  };

  rolePickerItems = () => {
    return (this.state.roles.map((role) =>
      <Picker.Item label={role} value={role} key={role}/>));
  };

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

            <Text>Name</Text>
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

            <Text>Phone number</Text>
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

            <Text>Location</Text>
            {!this.state.locationError ? null :
              <Text style={styles.errorMessage}>{this.state.locationError}</Text>}
            <View style={styles.pickerContainer}>
              <Picker iosHeader="Location"
                      iosIcon={<Icon name="ios-arrow-down-outline"/>}
                      style={styles.picker}
                      mode="dropdown"
                      selectedValue={this.state.selectedLocation}
                      placeholder="Select location"
                      placeholderIconColor="#007aff"
                      onValueChange={(loc) => {
                        this.setState({selectedLocation: loc,
                          locationError: '', errorMessage: ''})
                      }}>
                {this.locationPickerItems()}
              </Picker>
            </View>

            <Text>Department</Text>
            {!this.state.departmentError ? null :
              <Text style={styles.errorMessage}>{this.state.departmentError}</Text>}
            <View style={styles.pickerContainer}>
              <Picker iosHeader="Department"
                      iosIcon={<Icon name="ios-arrow-down-outline"/>}
                      style={styles.picker}
                      mode="dropdown"
                      selectedValue={this.state.selectedDepartment}
                      placeholder="Select department"
                      placeholderIconColor="#007aff"
                      onValueChange={(dept) => {
                        this.setState({selectedDepartment: dept,
                          departmentError: '', errorMessage: ''})
                      }}>
                {this.departmentPickerItems()}
              </Picker>
            </View>

            <Text>Role</Text>
            {!this.state.roleError ? null :
              <Text style={styles.errorMessage}>{this.state.roleError}</Text>}
            <View style={styles.pickerContainer}>
              <Picker iosHeader="Role"
                      iosIcon={<Icon name="ios-arrow-down-outline"/>}
                      style={styles.picker}
                      mode="dropdown"
                      selectedValue={this.state.selectedRole}
                      placeholder="Select role"
                      placeholderIconColor="#007aff"
                      onValueChange={(role) => {
                        this.setState({selectedRole: role,
                          roleError: '', errorMessage: ''});
                      }}>
                {this.rolePickerItems()}
              </Picker>
            </View>

            <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
            <View style={styles.buttonContainer}>
              <Button style={styles.buttons} block danger onPress={() => this.cancelRegister()}>
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

  cancelRegister = () => {
    firebase.auth().signOut();
    setTimeout(() => {
      this.props.navigation.navigate('LoginScreen');
    }, 20);
  };

  validateName = () => {
    this.setState({errorMessage: ''});
    if (this.empty(this.state.name)) {
      this.setState({nameError: 'Name required'});
      return false;
    } else {
      this.setState({nameError: ''});
      return true;
    }
  };

  validatePhoneNumber = () => {
    this.setState({errorMessage: ''});
    if (this.empty(this.state.phoneNumber)) {
      this.setState({phoneNumberError: 'Phone number required'});
      return false;
    } else if (! /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/.test(this.state.phoneNumber)) {
      this.setState({phoneNumberError: 'Not a valid phone number'});
      return false;
    } else {
      this.setState({phoneNumberError: ''});
      return true;
    }
  };

  validateLocation = () => {
    this.setState({errorMessage: ''});
    if (this.empty(this.state.selectedLocation) ||
      this.state.selectedLocation === 'Select Location') {
      this.setState({locationError: 'Location required'});
      return false;
    } else {
      this.setState({locationError: ''});
      return true;
    }
  };

  validateDepartment = () => {
    this.setState({errorMessage: ''});
    if (this.empty(this.state.selectedDepartment) ||
      this.state.selectedDepartment === 'Select Department') {
      this.setState({departmentError: 'Department required'});
      return false;
    } else {
      this.setState({departmentError: ''});
      return true;
    }
  };

  validateRole = () => {
    this.setState({errorMessage: ''});
    if (this.empty(this.state.selectedRole) ||
      this.state.selectedRole === 'Select Role') {
      this.setState({roleError: 'Role required'});
      return false;
    } else {
      this.setState({roleError: ''});
      return true;
    }
  };

  validateAll = () => {
    let allFields = [
      {validate: (this.validateName), name: 'Name'},
      {validate: (this.validatePhoneNumber), name: 'Phone number'},
      {validate: (this.validateLocation), name: 'Location'},
      {validate: (this.validateDepartment), name: 'Department'},
      {validate: (this.validateRole), name: 'Role'},
    ];

    let error = false;
    let errorMessage = '';
    for (let i = 0; i < allFields.length; i++) {
      let field = allFields[i];
      let valid = field.validate();
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
    return !error;
  };

  empty = (val) => {
    return (!val || val.length === 0);
  };

  submit = () => {
    let validFields = this.validateAll();
    if (!validFields) return;
    let userID = firebase.auth().currentUser.uid;
    let userDetails = {
      name: this.state.name,
      phoneNumber: this.state.phoneNumber,
      location: this.state.selectedLocation,
      department: this.state.selectedDepartment,
      role: this.state.selectedRole,
      email: firebase.auth().currentUser.email,
    };
    this.db.users.child(userID).set(userDetails);
    this.props.navigation.navigate('HomeStack');
  }
}

const styles = StyleSheet.create({
  errorMessage: {
    color: 'red',
  },
  inputBoxContainer: {
    marginVertical: 15,
  },
  picker: {
    width: '100%',
  },
  pickerContainer: {
    paddingHorizontal: 10,
    borderColor: '#e0e0e0',
    marginVertical: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderStyle: 'solid',
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

