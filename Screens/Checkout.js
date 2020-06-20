import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  TextComponent,
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

export default class Checkout extends React.Component {
  constructor(props) {
    super(props);
    // qty = this.props.navigation.state.qty;
   this.state = {
      selectedRow: {
        name: '',
        price: '',
        category: '',
      },
      dataSource: [],
    };
    this.getRow = this.getRow.bind(this);
  }
  getRow(row) {
    this.setState({selectedRow: row});
  }

  componentDidMount() {
    var q = this.state.qty;
    console.log('CHECKOUT PAGE qty  -' + q);
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
          <View style={{flexDirection: 'row'}}>
            <Image
              style={styles.productsIconStyle}
              source={require('../Assets/Images/brocolli.png')}
            />
            <View style={styles.itemViewStyle}>
              <Text style={styles.itemNameStyle}>Romaine Lettuce</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.itemPriceStyle}>1500/-</Text>
                <Button bordered success style={styles.qtyButtonStyle}>
                  <Text> Qty-2</Text>
                </Button>
              </View>
            </View>
          </View>
          <View
            style={{
              borderBottomColor: '#DFEDDF',
              borderBottomWidth: 1,
              marginTop: 3,
              marginBottom: 3,
              marginLeft: 6,
              marginRight: 3,
            }}></View>

          <View style={{flexDirection: 'row'}}>
            <Image
              style={styles.productsIconStyle}
              source={require('../Assets/Images/brocolli.png')}
            />

            <View style={styles.itemViewStyle}>
              <Text style={styles.itemNameStyle}>Romaine Lettuce</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.itemPriceStyle}>1500/-</Text>
                <Button bordered success style={styles.qtyButtonStyle}>
                  <Text> Qty-2</Text>
                </Button>
              </View>
            </View>
          </View>
          <View
            style={{
              borderBottomColor: '#DFEDDF',
              borderBottomWidth: 1,
              marginTop: 3,
              marginBottom: 3,
              marginLeft: 6,
              marginRight: 3,
            }}></View>
        </ScrollView>
        <View style={{flexDirection: 'row'}}>
          <Button bordered style={styles.priceButtonStyle}>
            <Text
              style={{
                color: 'green',
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              {' '}
              Total - 3000/-
            </Text>
          </Button>
          <Button
            full
            style={styles.placeOrderButtonStyle}
            onPress={() => {
              navigation.navigate('PlaceOrder');
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
    height: 70,
    width: 80,
    marginLeft: 20,
    marginTop: 17,
    marginBottom: 5,
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
    width: 50,
    marginLeft: 120,
  },
});
