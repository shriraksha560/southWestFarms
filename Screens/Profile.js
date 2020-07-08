import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
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
import Icon from 'react-native-vector-icons/FontAwesome';
export default class MyProfile extends React.Component {
  render() {
    return (
      <Container>
        <Header style={styles.headerStyle} androidStatusBarColor="#0FA521">
          <Left>
            <Button transparent>
              <Icon
                name="angle-left"
                size={30}
                color="white"
                onPress={(props) => {
                  this.props.navigation.goBack(null);
                }}
              />
            </Button>
          </Left>
          <Body>
            <Title>My Profile</Title>
          </Body>
        </Header>

        <ImageBackground
          style={styles.backgroundImage}
          source={require('../Assets/Images/background_image_leaves.jpg')}>
          <Card
            style={styles.cardStyle}
            cardElevation={2}
            cardMaxElevation={2}
            cornerRadius={7}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Image
                  style={styles.profileIconStyle}
                  source={require('../Assets/Images/profileIcon.png')}
                />
              </View>
              <View>
                <Text style={styles.nameStyle}>name</Text>
                <Text style={styles.mobileStyle}>mobile</Text>
                <Text style={styles.cityStyle}>apartment name</Text>

                <Text style={styles.cityStyle}>area,city</Text>
              </View>
            </View>
          </Card>
        </ImageBackground>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#0FA521',
    // marginTop: 20
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.6,
  },
  cardStyle: {
    marginTop: -400,

    backgroundColor: 'white',

    borderRadius: 20,
  },
  profileIconStyle: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginLeft: 20,
    marginTop: 20,
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
});
