import React, {Component} from 'react'
import {StyleSheet, View} from 'react-native';
import {Button, Container, Content, Icon, Text} from "native-base"
import {UserProfile} from '../components/UserProfile';

export class OtherUserProfileScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.userData.name
  });

  render() {
    const userData = this.props.navigation.getParam('userData', {});
    return (
      <Container>
        <Content>
          <UserProfile userData={userData}/>
          <View style={styles.buttonContainer}>
            <Button block success style={styles.buttons}
                    onPress={this.logout}>
              <Text>Add as Employee</Text>
            </Button>
            <Button block primary style={styles.buttons}
                    onPress={this.editProfile}>
              <Text>Set as Manager</Text>
            </Button>
          </View>
          {/*<View style={styles.buttonContainer}>*/}
            {/*<Button block success style={styles.buttons}*/}
                    {/*onPress={this.editProfile}>*/}
              {/*<Icon name="create"/>*/}
              {/*<Text>Edit</Text>*/}
            {/*</Button>*/}
          {/*</View>*/}
        </Content>
      </Container>
    )
  };

  editProfile = () => {
    //todo auth
  };
}

const styles = StyleSheet.create({
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
