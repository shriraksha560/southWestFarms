import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  TextComponent,
  BackHandler,
  Alert,
} from 'react-native';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Title,
  Segment,
  Content,
  DatePicker,
  Card,
} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import Snackbar from 'react-native-snackbar';

let responseJson;
let responseJsonStringyfied;
export default class PlaceOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success: '',
    };
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backPressed);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
  }

  backPressed = () => {
    Alert.alert(
      'Exit App',
      'Do you want to exit?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },

        {text: 'Yes', onPress: () => BackHandler.exitApp()},
      ],
      {cancelable: false},
    );
    return true;
  };
  async callPlaceOrderApi() {
    var requestBody = JSON.stringify({
      userId: 18,
      itemId: 2,
      quantity: 3,
    });
    let response = await fetch('http://3.133.157.155:8080/orders/placeOrder', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: requestBody,
    });
    responseJson = await response.json();
    console.log('responseJson' + responseJson);
    responseJsonStringyfied = JSON.stringify(responseJson.status);
    console.log('responseJsonStringyfied' + responseJsonStringyfied);

    this.setState({
      success: responseJsonStringyfied,
    });
    // alert(this.state.success);
    if (response != null) {
      Snackbar.show({
        text: 'Your order placed succesfully!!',
        backgroundColor: 'green',
        duration: Snackbar.LENGTH_SHORT,
      });
      console.log('response.status' + responseJsonStringyfied);
      //alert(responseJsonStringyfied);
    } else {
      Snackbar.show({
        text: 'Something went wrong!!',
        backgroundColor: 'red',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  }

  catch(error) {
    console.error('catch block : ' + error);
    alert('error : ' + error);
  }

  async componentDidMount() {
    this.callPlaceOrderApi();
  }
  render() {
    return (
      <Container>
        <Header style={styles.headerStyle} androidStatusBarColor="#0FA521">
          <Left>
            <Button transparent>
              <Icon
                name="angle-left"
                size={35}
                color="white"
                onPress={(props) => {
                  this.props.navigation.goBack(null);
                }}
              />
            </Button>
          </Left>
          <Body>
            <Title>Place Order</Title>
          </Body>
          <Right>
            <Button transparent>
              {/* <Icon name="search" size={20} color="white" /> */}
            </Button>
          </Right>
        </Header>

        <ScrollView>
          <View>
            <Image
              style={styles.placedIconStyle}
              source={require('../Assets/Images/placed_right.png')}
            />
            <Text
              style={{textAlign: 'center', fontWeight: 'bold', fontSize: 18}}>
              Thank you for your order
            </Text>
            <Text
              style={{textAlign: 'center', fontWeight: 'normal', marginTop: 5}}>
              Your order number is PROD1003.Please wait while we review and
              approve your order.
            </Text>
          </View>

          {/* <View>
            <Image
              style={styles.placedIconStyle}
              source={require('../Assets/Images/placed_retry.png')}
              // onPress=  {  this.callPlaceOrderApi}
            />
            <Text
              style={{textAlign: 'center', fontWeight: 'bold', fontSize: 18}}>
              Oops!!! Something went wrong
            </Text>
            <Text
              style={{textAlign: 'center', fontWeight: 'normal', marginTop: 5}}>
              Could not place your order.Check your internet connection and try
              again!!
            </Text>
          </View> */}
        </ScrollView>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#0FA521',
    //   marginTop: 20
  },
  placedIconStyle: {
    height: 100,
    width: 100,
    marginLeft: 130,
    marginTop: 150,
  },
});
