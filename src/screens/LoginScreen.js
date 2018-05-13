import React, {Component} from 'react'
import {StyleSheet} from 'react-native'
import {Container, Header, Title, Left, Icon, Right, Button, Body, Content, Text, Card, CardItem} from "native-base"

export class LoginScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    header: (
      <Header>
        <Body>
        <Title>Loggin</Title>
        </Body>
      </Header>
    )
  })

  render() {
    return (
      <Container>
        <Content padder>
          <Text style={{ alignSelf: "center" }}>Login</Text>
          <Button block success>
            <Text>Login</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  label: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
})

