import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View, 
  TextInput,
  Switch
} from 'react-native';

export default class DemoProject extends Component {
  constructor(props) {
    super(props);
    this.toggleSwitch = this.toggleSwitch.bind(this);
    this.state = {
      showPassword: true,
    }
  }

  toggleSwitch() {
    this.setState({ showPassword: !this.state.showPassword });
  }

  render() {
    return (
      <View>
        <TextInput
          placeholderTextColor="gray"
          placeholder="Password"
          secureTextEntry={this.state.showPassword}
          onChangeText={(password) => this.setState({ password })}
        />
        <Switch
          onValueChange={this.toggleSwitch}
          value={!this.state.showPassword}
        /> 
        <Text>Show</Text>
      </View>
    )
  }
}

AppRegistry.registerComponent('DemoProject', () => DemoProject);