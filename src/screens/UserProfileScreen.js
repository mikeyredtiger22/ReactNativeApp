import React, {Component} from 'react'
import {StyleSheet, Image, View} from 'react-native';
import {Body, Button, Card, CardItem, Container, Content, Header, Icon, Text, Title} from "native-base"
import firebase from 'react-native-firebase'
import Communications from 'react-native-communications';

export class UserProfileScreen extends Component {
  constructor() {
    super();
    let userID = firebase.auth().currentUser.uid;
    let email = firebase.auth().currentUser.email;
    this.state = {
      userID: userID,
      email: email,
      userData: {}
    };

    this.loadUserData(userID);
  }

  loadUserData = (userID) => {
    let userDataRef = firebase.database().ref('users').child(userID);
    userDataRef.once('value', (dataSnapshot) => {
      if (dataSnapshot.exists()) {
        this.setState({userData: dataSnapshot.val()})
      }
    });
  };

  static navigationOptions = ({navigation}) => ({
    header: (
      <Header>
        <Body>
        <Title>Profile</Title>
        </Body>
      </Header>
    ),
  });

  componentDidMount() {
    // this.setState({userData: this.props.navigation.getParam('userData', {})});
  }

  render() {
    let userID = firebase.auth().currentUser.uid;
    // this.setState({userID: userID});
    return (
      <Container>
        <Content>
        <Button rounded style={styles.search} block primary
                onPress={() => this.props.navigation.push('SearchScreen')}>
          <Text>Search Employees</Text>
          <Icon name="search" style={styles.fieldIcon}
                onPress={() => this.openEmail(this.state.email)}/>
        </Button>
        <Card style={styles.card}>
          <CardItem header bordered style={styles.container}>
            <Image style={styles.image}
                   resizeMode={'cover'}
                   source={require('../profileImage.png')}>
            </Image>
          </CardItem>
          <CardItem bordered>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.field}>{this.state.userData.name}</Text>
          </CardItem>
          <CardItem bordered>
            <Text style={styles.label}>Location</Text>
            <Text style={styles.field}>{this.state.userData.location}</Text>
          </CardItem>
          <CardItem bordered>
            <Text style={styles.label}>Department</Text>
            <Text style={styles.field}>{this.state.userData.department}</Text>
          </CardItem>
          <CardItem bordered>
            <Text style={styles.label}>Email</Text>
            <View  style={styles.fieldWithIcons}>
              <Text style={{flex: 1}}>{this.state.email}</Text>
              <Icon name="mail" style={styles.fieldIcon}
                    onPress={() => this.openEmail(this.state.email)}/>
            </View>
          </CardItem>
          <CardItem bordered>
            <Text style={styles.label}>Phone</Text>
            <View  style={styles.fieldWithIcons}>
              <Text style={{flex: 1}}>{this.state.userData.phoneNumber}</Text>
              <Icon name="call" style={styles.fieldIcon}
                    onPress={() => this.openCall(this.state.phoneNumber)}/>
              <Icon name="text" style={styles.fieldIcon}
                    onPress={() => this.openText(this.state.phoneNumber)}/>
            </View>
          </CardItem>
        </Card>
        <View style={styles.buttonContainer}>
          <Button block success style={styles.buttons}
                  onPress={this.editProfile}>
            <Text>Logout</Text>
          </Button>
          <Button block primary style={styles.buttons}
                  onPress={this.logout}>
            <Icon name="create"/>
            <Text>Edit</Text>
          </Button>
        </View>
        </Content>
      </Container>
    )
  };

  openText = () => {
    Communications.text(this.state.userData.phoneNumber);
  };

  openCall = () => {
    Communications.phonecall(this.state.userData.phoneNumber, false);
  };

  openEmail = () => {
    Communications.email([this.state.email],'','','Email Subject','\n\n\nFrom Employee Directory App.');
  };

  logout = () => {
    firebase.auth().signOut()
  };

  editProfile = () => {
    //todo
  };

  formatCase = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5
  },
  card: {
    flex: 0,
    marginTop: 10,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',

  },
  container: {
    width: 200,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginTop: 5,
    marginBottom: 5,
    width: 200,
    height: 200,
    alignSelf: 'center',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'blue',
  },
  search: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10
  },
  label: {
    width: '30%',
    alignSelf: 'flex-start',
    fontWeight: 'bold'
  },
  field: {
    paddingStart: 5,
    width: '70%',
    alignSelf: 'flex-start'
  },
  fieldWithIcons: {
    flex: 1,
    paddingStart: 5,
    width: '70%',
    flexDirection: 'row'
  },
  fieldIcon: {
    alignSelf: 'flex-end'
  },
  buttons: {
    alignSelf: 'center',
    flex: 1,
    marginHorizontal: 5,
    marginVertical: 10
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '92%',
    alignSelf: 'center',
  }
});
