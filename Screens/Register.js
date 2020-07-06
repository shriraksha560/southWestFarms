import {
  View,
  Text,
  ImageBackground,
  TextInput,
  Picker,
  Image,
  StyleSheet,
  TouchableHighlight,
  StatusBar,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import AppAsyncStorage from '../AsyncStorage/AppAsyncStorage';

let responseJson;
let responseStringify;
let retrivedName;
let retrivedPassword;
let retrivedMobileNumber;

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.toggleSwitchPassword = this.toggleSwitchPassword.bind(this);
    this.toggleSwitchConfirmPassword = this.toggleSwitchConfirmPassword.bind(
      this,
    );

    this.state = {
      name: '',
      mobile: '',
      password: '',
      c_password: '',
      dataSource: [],
      showToast: false,
      choosenIndex: 0,
      showPassword: true,
      showConfirmPassword: true,
    };
  }

  toggleSwitchPassword() {
    this.setState({showPassword: !this.state.showPassword});
  }

  toggleSwitchConfirmPassword() {
    this.setState({showConfirmPassword: !this.state.showConfirmPassword});
  }

  storeApartmentData = async () => {
    try {
      await AsyncStorage.setItem(
        'savedApartmentList',
        this.state.apartmentList,
      );
      console.log('storeApartmentData after storing');
    } catch (error) {
      console.log('storeApartmentData catch block');
    }
  };

  retrieveApartmentData = async () => {
    try {
      retrieveApartmentList = await AsyncStorage.getItem('savedApartmentList');
      // return retrieveApartmentList != null ? JSON.parse(retrieveApartmentList) : null;
      console.log('retrieveApartmentList --' + retrieveApartmentList);
    } catch (e) {
      // error reading value
    }
  };

  storeData = async () => {

    try {

     await  AppAsyncStorage.save('savedName', `${this.state.name}`);
     await  AppAsyncStorage.save('savedPassword', `${this.state.password}`);
     await  AppAsyncStorage.save('savedMobileNumber', `${this.state.mobile}`);

      // await AsyncStorage.setItem('savedName', this.state.name);
      // await AsyncStorage.setItem('savedPassword', this.state.password);
      // await AsyncStorage.setItem('savedMobileNumber', this.state.mobile);
    } catch (error) {

      console.log('storeData catch block' + error);
    }
  };

  retrieveData = async () => {
    try {
      retrivedName = await AppAsyncStorage.get('savedName');
      console.log('retrivedName  -' + retrivedName);

      retrivedPassword = await AppAsyncStorage.get('savedPassword');
      console.log('retrivedPassword  -' + retrivedPassword);

      retrivedMobileNumber = await AppAsyncStorage.get('savedMobileNumber');
      console.log('retrivedMobileNumber   -' + retrivedMobileNumber);
    } catch (error) {
      console.log('retieved catch block :'+error);
    }
  };


  


  async callGetApartMentList() {
    try {
      let response = await fetch(
        'http://3.133.157.155:8080/apartment/getList',
        {
          method: 'GET',
        },
      );

      responseJson = await response.json();
      // alert(JSON.stringify(responseJson));
      responseStringify = JSON.stringify(responseJson);
      // alert(responseStringify.response);
      //  await AsyncStorage.setItem('savedApartmentList', responseStringify);

      console.log('responseJson' + responseJson);
     this.setState({
              dataSource: responseJson.response,
            })
        
      
    } catch (error) {
      console.error('catch block : ' + error);
      alert('error : ' + error);
    }
  }

  async onRegisterPress() {
    const {name, mobile, password, c_password, choosenIndex} = this.state;

    console.log('name' + name);
    console.log('mobile' + mobile);

    console.log('password' + password);
    console.log('c_password' + c_password);
    console.log('choosenIndex' + choosenIndex);

    if (name == '' || name.length <= 0) {
      Snackbar.show({
        text: 'Please enter valid name!!',
        backgroundColor: 'red',
        duration: Snackbar.LENGTH_SHORT,
      });
    } else if (mobile == '') {
      Snackbar.show({
        text: 'Please enter  phone number!!',
        backgroundColor: 'red',
        duration: Snackbar.LENGTH_SHORT,
      });
    } else if (mobile.length < 10) {
      Snackbar.show({
        text: 'Mobile number must not be less than 10 digit!!',
        backgroundColor: 'red',
        duration: Snackbar.LENGTH_SHORT,
      });
    } else if (password == '' || password.length <= 0) {
      Snackbar.show({
        text: 'Please enter valid password!!',
        backgroundColor: 'red',
        duration: Snackbar.LENGTH_SHORT,
      });
    } else if (c_password == '' || c_password.length <= 0) {
      Snackbar.show({
        text: 'Please enter confirm password!!',
        backgroundColor: 'red',
        duration: Snackbar.LENGTH_SHORT,
      });
    } else if (password != c_password) {
      Snackbar.show({
        text: 'Password does not match!!',
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
          this.callRegisterApi();
        }
      });
    }
  }

  async callRegisterApi(name, mobile, password, choosenIndex) {
    var requestBody = JSON.stringify({
      name: this.state.name,
      phone: this.state.mobile,
      password: this.state.password,
      apartmentId: this.state.choosenIndex,
    });
    console.log('requestBody  ' + requestBody);
    try {
      let response = await fetch('http://3.133.157.155:8080/users/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: requestBody,
      });
      responseJson = await response.json();
      console.log('responseJson' + responseJson);
      //  alert('Status - ' + JSON.stringify(responseJson));
      if (response.status == 200) {
        Snackbar.show({
          text: 'Registered successfully!!',
          backgroundColor: 'green',
          duration: Snackbar.LENGTH_SHORT,
        });
        this.storeData();
        this.retrieveData();
        // readData();
        // this.storeApartmentData();
        this.props.navigation.navigate('Login');
      } else if (response.status == 500) {
        Snackbar.show({
          text: 'Server error!!',
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

  async componentDidMount() {
    await this.callGetApartMentList();
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
            <Text style={styles.logoText}>South-West Farm</Text>
            <View style={styles.inputContainer}>
              <Icon
                name={`user`}
                size={20}
                color="black"
                style={styles.textInputIconName}
              />

              <TextInput
                style={styles.inputs}
                maxLength={15}
                placeholder="Enter your name"
                keyboardType="default"
                underlineColorAndroid="transparent"
                onChangeText={(name) => {
                  return this.setState({name});
                }}
              />
            </View>
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
                style={styles.textInputIconName}
              />

              <TextInput
                style={styles.inputs}
                placeholder="Enter your password"
                keyboardType="default"
                secureTextEntry={this.state.showPassword}
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
                  secureTextEntry={this.state.showPassword}
                  onPress={this.toggleSwitchPassword}
                  color="black"
                />
              ) : (
                <Icon
                  style={styles.eyeIconStyle}
                  name={`eye-slash`}
                  size={16}
                  onPress={this.toggleSwitchPassword}
                  color="black"
                />
              )}
            </View>
            <View style={styles.inputContainer}>
              <Icon
                name={`unlock`}
                size={20}
                color="black"
                style={styles.textInputIconName}
              />

              <TextInput
                style={styles.inputs}
                placeholder="Confirm your password"
                keyboardType="default"
                secureTextEntry={this.state.showConfirmPassword}
                underlineColorAndroid="transparent"
                onChangeText={(c_password) => {
                  return this.setState({c_password});
                }}
              />
              {this.state.showConfirmPassword == false ? (
                <Icon
                  style={styles.eyeIconStyle}
                  name={`eye`}
                  size={16}
                  onPress={this.toggleSwitchConfirmPassword}
                  color="black"
                />
              ) : (
                <Icon
                  style={styles.eyeIconStyle}
                  name={`eye-slash`}
                  size={16}
                  onPress={this.toggleSwitchConfirmPassword}
                  color="black"
                />
              )}
            </View>
            {this.state.dataSource.length > 0 ? (
              <View style={styles.pickerViewStyle}>
                <Picker
                  style={styles.pickerStyle}
                  selectedValue={
                    this.state.dataSource[this.state.choosenIndex].city
                  }
                  onValueChange={(itemValue, itemPosition) => {
                    console.log('item value' + itemValue);
                    console.log('item position' + itemPosition);

                    this.setState({
                      city: itemValue,
                      choosenIndex: itemPosition,
                    });
                  }}>
                  {this.state.dataSource.map((item) => {
                    return (
                      <Picker.Item
                        label={item.city}
                        value={item.city}
                        key={item.city}
                      />
                    );
                  })}
                </Picker>
              </View>
            ) : null}

            <TouchableHighlight
              style={[styles.buttonContainer, styles.loginButton]}
              underlayColor="#1B1DAE"
              // onPress={() => navigation.navigate('Login')}>
              onPress={this.onRegisterPress.bind(this)}>
              <Text style={styles.loginText}>REGISTER</Text>
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
  pickerViewStyle: {
    borderTopColor: '#A4EAA6',
    borderLeftColor: '#A4EAA6',
    borderRightColor: '#A4EAA6',
    borderBottomColor: '#A4EAA6',

    backgroundColor: '#A4EAA6',
    borderRadius: 30,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    height: 46,
    marginLeft: 7,
    marginBottom: 30,
    marginRight: 7,
    marginTop: 10,
    // \\width:"500",
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIconStyle: {
    marginRight: 20,
  },
  logoStyle: {
    height: 100,
    width: 100,
    marginBottom: 40,
  },
  pickerStyle: {
    //height: 150,
    width: '80%',
    color: 'black',
    justifyContent: 'center',
  },
  textInputIconPhone: {
    marginLeft: 20,
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
    fontSize: 28,
    marginTop: -30,
    marginBottom: 30,
    fontWeight: '600',
    color: '#0FA521',
    fontWeight: 'bold',
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
  },
  forgotStyles: {
    color: 'white',
    marginLeft: 100,
    marginTop: 0,
    fontSize: 12,
  },
  textInputIconName: {
    marginLeft: 20,
  },
});
