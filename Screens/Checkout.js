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

export default class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      q: [],
    };
  }
  async componentDidMount() {
    const itemSelected = this.props.route.params;
    console.log('itemSelected -' + JSON.stringify(itemSelected));
    this.setState({
      dataSource: itemSelected.itemSelected,
    });
    this.setState({
      q:itemSelected.selectedQty,
    });
    console.log('qty got from dashboard to  checkout-' + this.state.q);

    console.log('setData-' + this.state.dataSource);
    console.log('LENGTH-' + this.state.dataSource.length);
  }
  async setData() {
    this.setState({
      dataSource: itemSelected,
    });
    console.log('setData-' + this.state.dataSource);
    console.log('LENGTH-' + this.state.dataSource.length);
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
                        <View style={{flexDirection: 'row'}}>
                          <Text style={styles.priceStyle}>{item.price}/-</Text>
                          <Button
                            bordered
                            success
                            style={styles.qtyButtonStyle}>
                            <Text style={{fontSize:18}}> {this.state.q}</Text>
                            <Text>{item.unit}</Text>

                          </Button>
                        </View>
                      </View>
                    </View>
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
    height: 60,
    width: 70,
    marginLeft: 5,
    marginTop: 8,
    marginBottom: 5,
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
    width: 50,
    flexDirection:'row',
    justifyContent:'space-around',
    marginLeft: 120,
  },
});
