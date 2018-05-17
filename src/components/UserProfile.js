import React, {Component} from 'react'
import {StyleSheet, Image, View} from 'react-native';
import {Button, Card, CardItem, Icon, Text} from "native-base"
import Communications from 'react-native-communications';
import {Field} from './Field';

export class UserProfile extends Component {
  render() {
    return (
      <View>
        <Card style={styles.card}>
          <CardItem header bordered style={styles.container}>
            <Image style={styles.image}
                   resizeMode={'cover'}
                   source={require('../profileImage.png')}>
            </Image>
          </CardItem>
          <Field label={'Name'} value={this.props.userData.name}/>
          <Field label={'Location'} value={this.props.userData.location}/>
          <Field label={'Department'} value={this.props.userData.department}/>
          <Field label={'Role'} value={this.props.userData.role}/>
          <CardItem bordered>
            <Text style={styles.label}>Email</Text>
            <View style={styles.fieldWithIcons}>
              <Text style={{flex: 1}}>{this.props.userData.email}</Text>
              <Icon name="mail" style={styles.fieldIcon}
                    onPress={() => this.openEmail(this.props.userData.email)}/>
            </View>
          </CardItem>
          <CardItem bordered>
            <Text style={styles.label}>Phone</Text>
            <View style={styles.fieldWithIcons}>
              <Text style={{flex: 1}}>{this.props.userData.phoneNumber}</Text>
              <Icon name="call" style={styles.fieldIcon}
                    onPress={() => this.openCall(this.props.userData.phoneNumber)}/>
              <Icon name="text" style={styles.fieldIcon}
                    onPress={() => this.openText(this.props.userData.phoneNumber)}/>
            </View>
          </CardItem>
          {this.props.showManagerButtons ?
            <View style={styles.buttonContainer}>
              <Button block primary style={styles.buttons}
                      onPress={this.props.viewManager}>
                <Text>View Manager</Text>
              </Button>
              <Button block primary style={styles.buttons}
                      onPress={this.editProfile}>
                <Text>View Employees</Text>
              </Button>
            </View>
          : null}
        </Card>
      </View>
    )
  };

  openText = () => {
    Communications.text(this.props.userData.phoneNumber);
  };

  openCall = () => {
    Communications.phonecall(this.props.userData.phoneNumber, false);
  };

  openEmail = () => {
    Communications.email([this.props.userData.email], '', '', 'Email Subject', '\n\n\nFrom Employee Directory App.');
  };
}

const styles = StyleSheet.create({
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
  label: {
    width: '30%',
    alignSelf: 'flex-start',
    fontWeight: 'bold',
  },
  field: {
    paddingStart: 5,
    width: '70%',
    alignSelf: 'flex-start',
  },
  fieldWithIcons: {
    flex: 1,
    paddingStart: 5,
    width: '70%',
    flexDirection: 'row',
  },
  fieldIcon: {
    paddingLeft: 15,
    alignSelf: 'flex-end',
    fontSize: 20,
  },
  buttons: {
    alignSelf: 'center',
    flex: 1,
    marginHorizontal: 5,
    marginVertical: 10,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '92%',
    alignSelf: 'center',
  },
});
