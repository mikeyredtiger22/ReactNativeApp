import React, {Component} from 'react'
import {StyleSheet} from 'react-native';
import {CardItem, Text} from "native-base"

export class Field extends Component {
  render() {
    return (
      <CardItem bordered>
        <Text style={styles.label}>{this.props.label}</Text>
        <Text style={styles.field}>{this.props.value}</Text>
      </CardItem>
    )
  };
}

const styles = StyleSheet.create({
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
});
