import React, {Component} from 'react'
import {StyleSheet, Image, View} from 'react-native';
import {Card, CardItem, Icon, Text} from "native-base"
import Communications from 'react-native-communications';

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
          <CardItem bordered>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.field}>{this.props.userData.name}</Text>
          </CardItem>
          <CardItem bordered>
            <Text style={styles.label}>Location</Text>
            <Text style={styles.field}>{this.props.userData.location}</Text>
          </CardItem>
          <CardItem bordered>
            <Text style={styles.label}>Department</Text>
            <Text style={styles.field}>{this.props.userData.department}</Text>
          </CardItem>
          {/*<CardItem bordered>*/}
            {/*<Text style={styles.label}>Email</Text>*/}
            {/*<View style={styles.fieldWithIcons}>*/}
              {/*<Text style={{flex: 1}}>{this.props.userData.email}</Text>*/}
              {/*<Icon name="mail" style={styles.fieldIcon}/>*/}
              {/*onPress={() => this.openEmail(this.props.userData.email)}/>*/}
            {/*</View>*/}
          {/*</CardItem>*/}
          {/*<CardItem bordered>*/}
            {/*<Text style={styles.label}>Phone</Text>*/}
            {/*<View style={styles.fieldWithIcons}>*/}
              {/*<Text style={{flex: 1}}>{this.props.userData.phoneNumber}</Text>*/}
              {/*<Icon name="call" style={styles.fieldIcon}*/}
                    {/*onPress={() => this.openCall(this.props.userData.phoneNumber)}/>*/}
              {/*<Icon name="text" style={styles.fieldIcon}*/}
                    {/*onPress={() => this.openText(this.props.userData.phoneNumber)}/>*/}
            {/*</View>*/}
          {/*</CardItem>*/}
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
  centerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
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
    marginTop: 10,
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
