import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Title,
  Content,
  DatePicker,
  Card,
} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import InputSpinner from 'react-native-input-spinner';
import Modal from 'react-native-modal';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-community/async-storage';
import AppAsyncStorage from '../AsyncStorage/AppAsyncStorage';
// import Utils from '../Screens/Utils';
let response;
let responseJson;
let profileResponseJson;
let responseJsonStringyfied;
let retrivedName;
let storedQty;

let retrivedPassword;
let retrivedMobileNumber;
let retrieveApartmentList;
let clearedAsync;

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      profile: [],
      userId: '',
      checkOutData: [],
      isAdded: false,
      isModalVisible: false,
    };
  }

  handleAddBtn = (item, value) => {
    console.log('item :' + item);
    console.log('value :' + value);
    console.log('strigified item :' + JSON.stringify(item));
    let stringifiedItem = JSON.stringify(item);
    let newArray = [];
    if (this.state.checkOutData.length > 0) {
      let objIndex = this.state.checkOutData.findIndex(
        (obj) => obj.id == item.id,
      );
      console.log('obj :' + objIndex);
      if (objIndex == -1) {
        newArray.push(item);
        this.setState({
          checkOutData: [...this.state.checkOutData, ...newArray],
        });
      } else {
        this.state.checkOutData.map((data, index) => {
          console.log('data : ' + data);
          console.log('stringified data :' + JSON.stringify(data));
          if (data.id == item.id) {
            console.log('data.id == item.id is same');
            // this.state.checkOutData[index].count = data.count + 1;
            this.state.checkOutData[index].count =
              this.state.checkOutData[index].count + 1;
            console.log('count : ' + this.state.checkOutData[index].count);
          }
        });
      }
    } else {
      newArray.push(item);
      this.setState({
        checkOutData: [...this.state.checkOutData, ...newArray],
      });
    }
  };

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  retrieveApartmentData = async () => {
    try {
      retrieveApartmentList = await AsyncStorage.getItem('savedApartmentList');
      // return retrieveApartmentList != null ? JSON.parse(retrieveApartmentList) : null;
      console.log('retrieveApartmentList --' + retrieveApartmentList);
    } catch (error) {
      alert('retrieveApartmentData catch block ' + error);
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
      console.log('retieved catch block :' + error);
    }
  };

  async callGetProfileAPI() {
    try {
      response = await fetch(
        'http://3.133.157.155:8080/users/getUserProfileByPhone/' +
          retrivedMobileNumber,
        {
          method: 'GET',
        },
      );

      profileResponseJson = await response.json();
      console.log(
        'profileResponseJson callGetProfileAPI ' +
          JSON.stringify(profileResponseJson),
      );
      this.setState({
        userId: JSON.stringify(profileResponseJson.userId),
      });
      console.log('userId -' + this.state.userId);
      responseJsonStringyfied =
        profileResponseJson != null ? profileResponseJson.response : null;
      // console.log(
      //   'responseJsonStringyfied' + JSON.stringify(responseJsonStringyfied),
      // );
      this.setState({
        profile:
          responseJsonStringyfied != null ? responseJsonStringyfied : 'null',
      });
    } catch (error) {
      console.error('catch block : ' + error);
      alert('error : ' + error);
    }
  }
  async callGetItemListApi() {
    var requestBody = JSON.stringify({
      page: 1,
      size: 5,
    });
    let response = await fetch('http://3.133.157.155:8080/items/getList', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: requestBody,
    });
    const item = await response.json();
    console.log('item -' + JSON.stringify(item.response.items));
    responseJsonStringyfied = JSON.stringify(item.response.items);
    console.log('responseJsonStringyfied' + responseJsonStringyfied);
    if (response.status == 200) {
      this.setState({
        dataSource: item.response.items,
      });
      // alert(this.state.dataSource);
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
  }
  catch(error) {
    console.error('catch block : ' + error);
    alert('error : ' + error);
  }

  async componentDidMount() {
    setTimeout(async () => {
      await this.retrieveData();
    }, 3000);
    //   await this.retrieveData();

    await this.callGetItemListApi();
    // await this.retrieveApartmentData();
    // await this.callGetProfileAPI();
  }

  async clearAsync() {
    clearedAsync = await AppAsyncStorage.clear();

    console.log('clearAsync log' + clearedAsync);
  }

  render() {
    console.log('datasource--' + this.state.dataSource);
    const navigation = this.props.navigation;
    // console.log('checkout data' + this.state.checkOutData);

    return (
      <Container>
        <Header style={styles.headerStyle} androidStatusBarColor="#0FA521">
          <Left>
            <Button transparent>
              <Icon name="angle-left" size={30} color="white" />
            </Button>
          </Left>
          <Body>
            <Title style={styles.titleStyle}>Products</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon
                name={`user`}
                size={20}
                color="white"
                onPress={this.toggleModal}
              />
              <Modal isVisible={this.state.isModalVisible}>
                <View style={styles.modelViewStyle}>
                  <View style={{flexDirection: 'row'}}>
                    <View>
                      <Image
                        style={styles.profileIconStyle}
                        source={require('../Assets/Images/profileIcon.png')}
                      />
                    </View>
                    <View>
                      <Text style={styles.nameStyle}>
                        {this.state.profile !== undefined &&
                        this.state.profile !== ''
                          ? this.state.profile.name
                          : ''}{' '}
                      </Text>
                      <Text style={styles.mobileStyle}>
                        {this.state.profile !== undefined &&
                        this.state.profile !== ''
                          ? this.state.profile.phone
                          : ''}{' '}
                      </Text>
                      <Text style={styles.cityStyle}>
                        {this.state.profile !== undefined &&
                        this.state.profile !== ''
                          ? this.state.profile.apartmentName
                          : ''}{' '}
                        ,{' '}
                        {this.state.profile !== undefined &&
                        this.state.profile !== ''
                          ? this.state.profile.area
                          : ''}{' '}
                      </Text>

                      <Text style={styles.cityStyle}>
                        {this.state.profile !== undefined &&
                        this.state.profile !== ''
                          ? this.state.profile.city
                          : ''}{' '}
                      </Text>

                      <Button
                        iconLeft
                        style={styles.logoutButtonStyle}
                        justifyContent="space-evenly"
                        onPress={this.clearAsync()}>
                        <Icon
                          name="power-off"
                          style={styles.logoutIconStyle}
                          size={20}
                        />
                        <Text style={styles.logoutTextStyle}>LOGOUT</Text>
                      </Button>
                    </View>
                  </View>
                  {/* <Button title="Hide modal" onPress={this.toggleModal} /> */}
                </View>
              </Modal>
            </Button>
          </Right>
        </Header>

        <ScrollView>
          {this.state.dataSource.length > 0 ? (
            <FlatList
              data={this.state.dataSource}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <View>
                    <Card
                      style={styles.cardStyle}
                      cardElevation={2}
                      cardMaxElevation={2}
                      cornerRadius={10}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                        }}>
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
                          <Text style={styles.qtyStyle}>
                            {item.quantity}
                            {item.unit}
                          </Text>
                          <Text style={styles.priceStyle}>{item.price}/-</Text>
                        </View>
                        <View style={{marginRight: 0}}>
                          {this.state.isAdded ? (
                            <Button style={styles.AddButtonStyle}>
                              <InputSpinner
                                style={styles.spinnerStyle}
                                rounded="true"
                                min={1}
                                step={1}
                                width={100}
                                buttonStyle={styles.buttonStyle}
                                height={40}
                                colorLeft="#0FA521"
                                colorRight="#0FA521"
                                onIncrease={() => this.handleAddBtn(item, true)}
                                onDecrease={() =>
                                  this.handleAddBtn(item, false)
                                }
                                // value={this.state.number}
                                onChange={(num) => {
                                  this.setState({storedQty: num});
                                }}
                              />
                            </Button>
                          ) : (
                            <Button
                              bordered
                              style={styles.AddButtonStyle}
                              onPress={() => {
                                this.setState({
                                  isAdded: true,
                                });
                                this.handleAddBtn(item, true);
                              }}>
                              <Text style={styles.addStyle}>ADD</Text>
                            </Button>
                          )}
                        </View>
                      </View>
                    </Card>
                  </View>
                );
              }}
              keyExtractor={(item) => item.value}
            />
          ) : null}
        </ScrollView>
        <Button
          block
          style={styles.checkoutButtonStyle}
          onPress={() =>
            this.props.navigation.navigate('Checkout', {
              itemSelected: this.state.checkOutData,
              //  selectedQty: this.state.storedQty,
            })
          }>
          <Text
            style={{
              color: 'white',
              fontSize: 13,
              justifyContent: 'center',
              fontWeight: 'bold',
            }}>
            CHECKOUT(1 item)
          </Text>
        </Button>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#0FA521',
    // marginTop: 20
  },
  titleStyle: {
    // textAlign: 'center',
    // marginLeft: 65
  },
  spinnerStyle: {
    justifyContent: 'center',
  },
  buttonCloseStyle: {
    height: 35,
    width: 70,
    marginLeft: 40,
    marginTop: 10,
  },
  buttonStyle: {
    height: 28,
    width: 28,
    marginTop: 6,
    marginLeft: 4,
    marginRight: 7,
  },
  addContainerStyle: {
    alignItems: 'flex-start',
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
  AddButtonStyle: {
    width: 100,
    height: 40,
    marginTop: 18,

    borderRadius: 40,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    backgroundColor: 'white',
  },
  inputSpinnerStyle: {
    width: 120,
    height: 40,
    marginLeft: 20,
    marginTop: 18,
    borderRadius: 40,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
  },
  addStyle: {
    fontWeight: 'bold',
    marginLeft: 35,
    color: '#0FA521',
  },
  checkoutButtonStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    backgroundColor: '#1B1DAE',
  },
  modelViewStyle: {
    flex: 1,
    backgroundColor: 'white',
    height: 360,
    marginTop: 200,
    marginBottom: 200,
    borderRadius: 20,
  },
  profileIconStyle: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginLeft: 20,
    marginTop: 50,
  },
  nameStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    marginTop: 40,
    marginLeft: 30,
  },
  mobileStyle: {
    fontSize: 13,
    marginLeft: 30,
    color: 'blue',
  },

  cityStyle: {
    fontSize: 12,
    marginLeft: 30,
    color: 'black',
  },
  closeTextStyle: {
    marginLeft: -80,
    marginTop: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  priceButtonStyle: {
    width: '50%',
    borderColor: '#1B1DAE',
  },
  placeOrderButtonStyle: {
    width: '50%',
    backgroundColor: '#1B1DAE',
  },
  logoutIconStyle: {
    color: 'white',
    marginRight: -30,
    marginLeft: 0,
  },
  logoutButtonStyle: {
    height: 40,
    width: 130,
    marginLeft: 20,
    marginTop: 10,
    borderRadius: 20,
    backgroundColor: '#1B1DAE',
  },
  logoutTextStyle: {
    color: 'white',
    fontSize: 15,
    marginLeft: 20,
    fontWeight: 'bold',
  },
});
