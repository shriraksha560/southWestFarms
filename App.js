import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from './Screens/Splash';
import Login from './Screens/Login';
import Register from './Screens/Register';
import Dashboard from './Screens/Dashboard';
import Checkout from './Screens/Checkout';
import PlaceOrder from './Screens/Placeorder';
import MyProfile from './Screens/Profile';

const Stack = createStackNavigator();

export default class App extends React.Component {
  
  constructor() {
    super();
    this.state = {
      isVisible: true,
    };
  }
  Hide_Splash_Screen = () => {
    this.setState({
      isVisible: false,
    });
  };

  componentDidMount() {
    var that = this;
    setTimeout(function () {
      that.Hide_Splash_Screen();
    }, 1000);
  }

  render() {
    this.state.isVisible === true ? <Splash /> : null;
    return (
      //   (this.state.isVisible === true) ? <Splash /> : <Login />

      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={({route, navigation}) => ({
            gestureEnabled: true,
            cardOverlayEnabled: true,
          })}
          mode="modal"
          headerMode="none">
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Checkout" component={Checkout} />
          <Stack.Screen name="PlaceOrder" component={PlaceOrder} />
          <Stack.Screen name="MyProfile" component={MyProfile} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}