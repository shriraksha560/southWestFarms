import {
  View,
  Text,
  ImageBackground,
  TextInput,
  Image,
  StyleSheet,
  TouchableHighlight,
  Switch,
  StatusBar,
  Keyboard,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {fonts} from '../Variables/fonts';

let responseJson;
let responseErrorMessage;
let responseJsonresponsevalue;
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.toggleSwitch = this.toggleSwitch.bind(this);

    this.state = {
      mobile: '',
      password: '',
      showPassword: true,
    };
  }
  toggleSwitch() {
    this.setState({showPassword: !this.state.showPassword});
  }

  async onLoginPress() {
    const {mobile, password} = this.state;
    if (mobile == '') {
      Snackbar.show({
        text: 'Please enter mobile number!!',
        backgroundColor: 'red',
        duration: Snackbar.LENGTH_SHORT,
      });
    } else if (mobile.length <= 0 && password.length <= 0) {
      Snackbar.show({
        text: 'Please enter mobile number and password!!',
        backgroundColor: 'red',
        duration: Snackbar.LENGTH_SHORT,
      });
    } else if (mobile.length < 10) {
      Snackbar.show({
        text: 'Mobile number must not be less than 10 digit!!!!',
        backgroundColor: 'red',
        duration: Snackbar.LENGTH_SHORT,
      });
    } else if (password == '') {
      Snackbar.show({
        text: 'Please enter  password!!',
        backgroundColor: 'red',
        duration: Snackbar.LENGTH_SHORT,
      });
    } else {
      await NetInfo.fetch().then((state) => {
        if (state.isConnected == false) {
          // this.setState({ loading: false });
          alert('Please check internet internet connection');
          return;
        } else {
          this.callLoginAPI(mobile, password);
        }
      });
    }
  }

  async callLoginAPI(mobile, password) {
    var requestBody = JSON.stringify({
      phone: this.state.mobile,
      password: this.state.password,
    });
    console.log('requestBody -' + requestBody);
    try {
      let response = await fetch(
        'http://3.133.157.155:8080/users/verifyPassword',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },

          body: requestBody,
        },
      );
      responseJson = await response.json();
      responseJsonresponsevalue = responseJson.response;
      console.log('responseJsonresponsevalue' + responseJsonresponsevalue);
      responseErrorMessage = responseJson.errorMessage;
      console.log('responseErrorMessage' + responseErrorMessage);

      console.log('responseJson' + responseJson);

      //  alert('responseJson  - ' + JSON.stringify(responseJson));
      if (responseJsonresponsevalue == true) {
        this.textInputPassword.clear();
        this.textInputMobile.clear();

        this.props.navigation.navigate('Dashboard');
      } else if (responseJsonresponsevalue == false) {
        Snackbar.show({
          text: responseErrorMessage,
          backgroundColor: 'red',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
      if (response.status == 200) {
        // await AsyncStorage.setItem('@savedMobileNumber', mobile);
        // const retrivedMobileNumber = await AsyncStorage.getItem(
        //   '@savedMobileNumber',
        // );
        // console.log('retrivedMobileNumber' + retrivedMobileNumber);
      } else if (response.status == 500) {
        Snackbar.show({
          text: 'Server error..Try again!!',
          backgroundColor: 'red',
          duration: Snackbar.LENGTH_SHORT,
        });
      } else {
        Snackbar.show({
          text: 'Something went wrong!!',
          backgroundColor: 'red',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    } catch (error) {
      console.error('catch block : ' + error);
      alert('error : ' + error);
    }
  }

  render() {
    const navigation = this.props.navigation;

    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="#0FA521"
          translucent={false}
        />

        <ImageBackground
          style={styles.backgroundImage}
          source={require('../Assets/Images/background_image_leaves.jpg')}>
          <Image
            style={styles.logoStyle}
            source={require('../Assets/Images/south_west_without_name.jpg')}
          />

          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>South-West Farm </Text>
            <View style={styles.inputContainer}>
              <Icon
                name={`mobile`}
                size={20}
                color="black"
                style={styles.textInputIconPhone}
              />

              <TextInput
                style={styles.inputs}
                maxLength={10}
                placeholder="Enter your mobile number"
                keyboardType="numeric"
                ref={(input) => {
                  this.textInputMobile = input;
                }}
                underlineColorAndroid="transparent"
                onChangeText={(mobile) => {
                  return this.setState({mobile});
                }}
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon
                name={`unlock-alt`}
                size={20}
                color="black"
                style={styles.textInputIconPhone}
              />

              <TextInput
                style={styles.inputs}
                placeholder="Enter your password"
                keyboardType="default"
                secureTextEntry={this.state.showPassword}
                ref={(input) => {
                  this.textInputPassword = input;
                }}
                underlineColorAndroid="transparent"
                onChangeText={(password) => {
                  return this.setState({password});
                }}
              />
              {this.state.showPassword == false ? (
                <Icon
                  style={styles.eyeIconStyle}
                  name={`eye`}
                  size={16}
                  onPress={this.toggleSwitch}
                  color="black"
                />
              ) : (
                <Icon
                  style={styles.eyeIconStyle}
                  name={`eye-slash`}
                  size={16}
                  onPress={this.toggleSwitch}
                  color="black"
                />
              )}

              {/* <Switch
                style={styles.eyeIconStyle}
                onValueChange={this.toggleSwitch}
                value={!this.state.showPassword}
              /> */}
            </View>

            <TouchableHighlight
              underlayColor="#1B1DAE"
              style={[styles.buttonContainer, styles.loginButton]}
              onPress={this.onLoginPress.bind(this)}>
              {/* onPress={() => navigation.navigate('Otp')}> */}
              <Text style={styles.loginText}>LOGIN</Text>
            </TouchableHighlight>

            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Text style={styles.notAMemberStyle}>Not a member?</Text>
              <Text
                style={styles.registerTextStyle}
                onPress={() => navigation.navigate('Register')}>
                Register
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1.0,
  },
  logoStyle: {
    height: 100,
    width: 100,
    marginBottom: 40,
  },
  container: {
    flex: 1,
    fontFamily: '-apple-system, BlinkMacSystemFont Segoe UI',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  eyeIconStyle: {
    marginRight: 20,
  },
  logoText: {
    fontSize: 28,
    marginTop: -30,
    marginBottom: 20,
    //fontWeight: '600',
    color: '#0FA521',
    fontWeight: 'bold',
    //  fontFamily:fonts.fontBold
  },
  inputContainer: {
    borderBottomColor: 'transparent',
    backgroundColor: '#A4EAA6',
    borderRadius: 20,
    borderBottomWidth: 1,
    width: 280,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
    fontSize: 15,
    color: 'black',
  },
  inputIcon: {
    width: 25,
    height: 25,
    marginLeft: 15,
    justifyContent: 'center',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    //  marginBottom: 20,
    width: 180,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: '#1B1DAE',
  },
  loginText: {
    color: 'white',
    fontSize: 13,
    justifyContent: 'center',
    fontWeight: 'bold',
    //fontFamily:fonts.fontBold
  },
  forgotStyles: {
    color: 'white',
    marginLeft: 100,
    marginTop: 0,
    fontSize: 12,
  },
  textInputIconPhone: {
    marginLeft: 20,
  },
  notAMemberStyle: {
    color: 'black',
  },
  registerTextStyle: {
    color: '#1B1DAE',
    fontWeight: 'bold',
    borderColor: 'white',
  },
});
