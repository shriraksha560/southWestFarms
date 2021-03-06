import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  TextComponent,
  FlatList,
  SafeAreaView,
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
import {FAB} from 'react-native-paper';
import Snackbar from 'react-native-snackbar';

let responseJson;
let responseJsonStringyfied;
let retrievedUserId;

const queryString = require('query-string');

export default class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      q: [],
      totalPrice: '',
      userId: '',
      itemId: [],
    };
  }
  retrieveUserId = async () => {
    try {
      retrievedUserId = await AppAsyncStorage.get('savedUserId');
      console.log('retrievedUserId  :' + retrievedUserId);
      this.setState({
        userId: retrievedUserId,
      });
    } catch (error) {
      console.log('retrievedUserId catch block :' + error);
    }
  };
  async componentDidMount() {
    const itemSelected = this.props.route.params;
    console.log('itemSelected -' + JSON.stringify(itemSelected));
    this.setState({
      dataSource: itemSelected.itemSelected,
    });
    this.calculatePrice(itemSelected);
    this.listingItemIds(itemSelected);
  }

  async calculatePrice(data) {
    console.log('calculate price data :' + data);
    let sum = 0;
    {
      data.itemSelected.map((item) => {
        console.log('inside map :' + item);
        sum = sum + item.price * item.count;
        console.log('sum : ' + sum);
        this.setState({
          totalPrice: sum,
        });
      });
    }
  }
  async listingItemIds(data) {
    let arrItemId = [];
    {
      data.itemSelected.map((item) => {
        arrItemId = arrItemId + item.id;
        console.log('arrItemId : ' + arrItemId);
        this.setState({
          itemId: arrItemId,
        });
        console.log('item id :' + this.state.itemId);
        //item id:456
      });
    }
  }

  async callPlaceOrderApi() {
    var requestBody = JSON.stringify({
      userId: this.state.userId,
      itemId: this.state.itemId,
      quantity: 3,
    });
    let response = await fetch(
      'http://3.133.157.155:8080/orders/placeOrder',
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
    console.log('responseJson' + responseJson);
    responseJsonStringyfied = JSON.stringify(responseJson.status);
    console.log('responseJsonStringyfied' + responseJsonStringyfied);

    this.setState({
      success: responseJsonStringyfied,
    });
    // alert(this.state.success);
    if (responseJson.status == 200) {
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
  render() {
    const navigation = this.props.navigation;
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
            <Title>Checkout</Title>
          </Body>
          <Right>
            <Button transparent>
              {/* <Icon name="search" size={20} color="white" /> */}
            </Button>
          </Right>
        </Header>
        <ScrollView>
          {this.state.dataSource.length != 0 ? (
            (console.log(this.state.dataSource.length),
            (
              <FlatList
                data={this.state.dataSource}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) => {
                  console.log('item --' + item);
                  console.log('index----' + index);
                  return (
                    <Card
                      style={styles.cardStyle}
                      cardElevation={2}
                      cardMaxElevation={2}
                      cornerRadius={10}>
                      <View style={{flexDirection: 'row'}}>
                        <View>
                          <Image
                            style={styles.productsIconStyle}
                            source={{
                              uri: `${item.imageUrl}`,
                            }}
                          />
                        </View>
                        <View style={{alignItems: 'flex-start'}}>
                          <Text style={styles.PnameStyle}>{item.title}</Text>
                          {/* <Text style={styles.PnameStyle}>
                            {item.quantity}
                            {item.unit}
                          </Text> */}

                          <View style={{flexDirection: 'row'}}>
                            <Text style={styles.priceStyle}>
                              {item.price * item.count}/-
                            </Text>
                            <Button
                              bordered
                              success
                              style={styles.qtyButtonStyle}>
                              <Text style={{fontSize: 15}}>{item.count}</Text>
                              <Text style={{fontSize: 15}}>{item.unit}</Text>
                            </Button>
                          </View>
                        </View>
                      </View>
                    </Card>
                  );
                }}
                keyExtractor={(item) => {
                  console.log('item value' + item);
                  item.value;
                }}
              />
            ))
          ) : (
            <Text>this.state.dataSource.length is less than 0</Text>
          )}
        </ScrollView>
        <View style={{flexDirection: 'row'}}>
          <Button
            bordered
            style={styles.priceButtonStyle}
            // onPress={this.calculatePrice}
          >
            <Text
              style={{
                color: 'green',
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Total - {this.state.totalPrice}/-
            </Text>
          </Button>
          <Button
            full
            style={styles.placeOrderButtonStyle}
            onPress={() => {
              // navigation.navigate('PlaceOrder');
              this.callPlaceOrderApi();
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              PLACE ORDER
            </Text>
          </Button>
        </View>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#0FA521',
    //marginTop: 20
  },
  productsIconStyle: {
    height: 60,
    width: 70,
    marginLeft: 5,
    marginTop: 8,
    marginBottom: 5,
  },
  cardStyle: {
    //padding: 50,
    // margin: 10,
    marginRight: 10,
    marginTop: 10,
    marginLeft: 15,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 7,
  },
  PnameStyle: {
    marginLeft: 20,
    fontSize: 15,
    marginTop: 5,
  },
  priceStyle: {
    marginLeft: 20,
    marginTop: 5,
    marginBottom: 3,
    color: 'green',
    fontWeight: 'bold',
    fontSize: 16,
  },
  qtyStyle: {
    marginLeft: 20,
    fontSize: 15,
    marginTop: 5,
  },
  itemNameStyle: {
    fontSize: 15,
  },
  itemViewStyle: {
    marginTop: 20,
    marginLeft: 10,
  },
  productHeaderStyle: {
    fontSize: 15,
  },
  priceButtonStyle: {
    width: '50%',
    borderColor: '#1B1DAE',
    position: 'relative',
  },
  placeOrderButtonStyle: {
    width: '50%',
    backgroundColor: '#1B1DAE',
    position: 'relative',
  },
  itemPriceStyle: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  qtyButtonStyle: {
    height: 30,
    width: 70,
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: 120,
  },
});
