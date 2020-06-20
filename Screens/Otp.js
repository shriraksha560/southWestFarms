import {
  View,
  Text,
  Button,
  ImageBackground,
  TextInput,
  Image,
  StyleSheet,
  TouchableHighlight,
  AsyncStorage,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Snackbar from 'react-native-snackbar';

export default class Otp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
    };
  }

  async onVerifyPasswordPress() {
    const {password} = this.state;

    if (password == '') {
      Snackbar.show({
        text: 'Please enter your password!!',
        backgroundColor: 'red',
        duration: Snackbar.LENGTH_SHORT,
      });
    }

    // this.callVerifyPasswordAPI(password);
  }

  retrievePhoneNumber = async () => {
    try {
      const retrivedMobileNumber = await AsyncStorage.getItem(
        '@savedMobileNumber',
      );
      console.log('retrivedMobileNumber' + retrivedMobileNumber);
    } catch (e) {
      //error reading value
    }
  };

  async callVerifyPasswordAPI(password, mobile) {
    try {
      let response = await fetch(
        'http://3.133.157.155:8080/users/verifyPassword',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: 'name',
            phone: 'retrivedMobileNumber',
          }),
        },
      );
      responseJson = await response.json();
      console.log('responseJson' + responseJson);
      if (response.status == 200) {
        await AsyncStorage.setItem('savePassword', password);

        this.props.navigation.navigate('Dashboard');
      } else if (response.status == 500) {
        Snackbar.show({
          text: 'Server error..Try again!!',
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
        <ImageBackground
          style={styles.backgroundImage}
          source={require('../Assets/Images/background_image_leaves.jpg')}>
          <Image
            style={styles.logoStyle}
            source={require('../Assets/Images/south_west_without_name.jpg')}
          />
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>
              One Time Password(OTP) has been sent to your mobile number
              9876543210 . Please enter the same below
            </Text>
            <View style={styles.inputContainer}>
              <Icon
                name={`unlock`}
                size={20}
                color="black"
                style={styles.textInputIconPhone}
              />

              <TextInput
                style={styles.inputs}
                // maxLength={4}
                placeholder="Enter your password"
                underlineColorAndroid="transparent"
                onChangeText={(password) => {
                  return this.setState({password});
                }}
              />
            </View>

            <TouchableHighlight
              underlayColor="#1B1DAE"
              style={[styles.buttonContainer, styles.loginButton]}
              //   onPress={() => navigation.navigate('Dashboard')}>
              onPress={this.onVerifyPasswordPress.bind(this)}>
              <Text style={styles.loginText}>VERIFY PASSWORD</Text>
            </TouchableHighlight>
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
  container: {
    flex: 1,
    fontFamily: '-apple-system, BlinkMacSystemFont Segoe UI',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoText: {
    fontSize: 10,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#0FA521',
    fontWeight: 'bold',
  },
  logoStyle: {
    height: 100,
    width: 100,
    marginBottom: 20,
  },
  inputContainer: {
    borderBottomColor: '#A4EAA6',
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
    fontSize: 12,
    fontWeight: 'bold',
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
});
