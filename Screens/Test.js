// your entry point
import {MenuProvider} from 'react-native-popup-menu';
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
export const Test = () => (
  <MenuProvider>
    <YourComponent />
  </MenuProvider>
);

// somewhere in your app
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

export const YourComponent = () => (
  <View>
    <Text>Hello world!</Text>
    <Menu>
      <MenuTrigger text="Select action" />
      <MenuOptions>
        <MenuOption onSelect={() => alert(`Save`)} text="Save" />
        <MenuOption onSelect={() => alert(`Delete`)}>
          <Text style={{color: 'red'}}>Delete</Text>
        </MenuOption>
        <MenuOption
          onSelect={() => alert(`Not called`)}
          disabled={true}
          text="Disabled"
        />
      </MenuOptions>
    </Menu>
  </View>
);
