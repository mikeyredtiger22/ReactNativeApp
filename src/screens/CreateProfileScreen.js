import React from 'react'
import {StyleSheet, View} from 'react-native'
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
      location: '',
      locationError: '',
      department: '',
      departmentError: '',
      phoneNumber: '',
      phoneNumberError: '',
      extra: '',
      extraError: '',
      errorMessage: '',
      departments: [],
      locations: [],
      selectedDepartment: '',
      selectedLocation: '',
    };

    firebase.database().ref('departments').once('value', (dataSnapshot) => {
      console.log(dataSnapshot.forEach(dept =>
        this.setState((prevState) => ({departments: [...prevState.departments, dept.key]}))));
    });

    firebase.database().ref('locations').once('value', (dataSnapshot) => {
      console.log(dataSnapshot.forEach(loc =>
        this.setState((prevState) => ({locations: [...prevState.locations, loc.key]}))));
    });
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

  departmentPickerItems = () => {
    return (this.state.departments.map((dept) =>
      <Picker.Item label={dept} value={dept} key={dept}/>));
  };

  locationPickerItems = () => {
    return (this.state.locations.map((loc) =>
      <Picker.Item label={loc} value={loc} key={loc}/>));
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
            <View style={styles.pickerContainer}>
              <Picker iosHeader="Location"
                      iosIcon={<Icon name="ios-arrow-down-outline"/>}
                      style={styles.picker}
                      mode="dropdown"
                      selectedValue={this.state.selectedLocation}
                      placeholder="Select location"
                      placeholderIconColor="#007aff"
                      onValueChange={(loc) => {
                        this.setState({selectedLocation: loc})
                      }}>
                {this.locationPickerItems()}
              </Picker>
            </View>

            <Text style={styles.label}>Department</Text>
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
                        this.setState({selectedDepartment: dept})
                      }}>
                {this.departmentPickerItems()}
              </Picker>
            </View>
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

  validateLocation = () => {
    this.setState({errorMessage: ''});
    if (this.empty(this.state.location)) {
      this.setState({locationError: 'Location required'});
      return false;
    } else {
      this.setState({locationError: ''});
      return true;
    }
  };

  validateDepartment = () => {
    this.setState({errorMessage: ''});
    if (this.empty(this.state.department)) {
      this.setState({departmentError: 'Department required'});
      return false;
    } else {
      this.setState({departmentError: ''});
      return true;
    }
  };

  validatePhoneNumber = () => {
    this.setState({errorMessage: ''});
    if (this.empty(this.state.phoneNumber)) {
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

  empty = (val) => {
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
      email: firebase.auth().currentUser.email,
    };
    this.db.users.child(userID).set(userDetails);
    this.props.navigation.navigate('HomeStack');
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
  picker: {
    width: '100%',
  },
  pickerContainer: {
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

