import React from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight, TextComponent } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Title, Segment, Content, DatePicker, Card } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome'
export default class MyProfile extends React.Component {

    render() {
        const navigation = this.props.navigation;

        return (

            <Container>
                <Header style={styles.headerStyle}>
                    <Left>
                        <Button transparent>
                            <Icon name="angle-left" size={35} color="white" onPress={(props) => { this.props.navigation.goBack(null) }} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>My Profile</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            {/* <Icon name="search" size={20} color="white" /> */}

                        </Button>
                    </Right>
                </Header>

            </Container>

        );
    }
}
const styles = StyleSheet.create({


    headerStyle: {
        backgroundColor: "#740B8B",

    },

});