import React, {Component} from 'react'
import {Button, Container, Text} from "native-base"

export class SearchScreen extends Component {
  render() {
    return (
      <Container>
        <Button block primary onPress={() => this.props.navigation.push('SearchScreen')}>
          <Text>Search</Text>
        </Button>
      </Container>
    )
  }
}