import { View, Text, Image, StyleSheet, StatusBar } from 'react-native';
import React from 'react';

export default class Splash extends React.Component {
    render() {
        return (

            <View style={styles.container} >
                <StatusBar barStyle="light-content" hidden={false} backgroundColor="#0FA521" translucent={false} />

                <View style={{ marginTop: 50, marginLeft: -120 }}>
                    <Image style={{ height: 700, width: 600, marginTop: -150, marginBottom: 10 }} source={require('../Assets/Images/logo.jpg')} />
                    <Text style={{ color: "grey", marginTop: -240, marginLeft: 200 }}>   Fruits & Vegetables Store </Text>


                </View>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        opacity: 1.5
    },
    container: {
        justifyContent: 'center'
    },
    logoContainer: {
        marginTop: -100
        // alignItems: "center",
    },
    logoText: {
        fontSize: 28,
        marginTop: 10,
        fontWeight: '600',
        color: 'white',
        fontWeight: "bold"
    },
    logoDescription: {
        fontSize: 15,
        // fontWeight: '600',
        color: 'grey',
        marginTop: 100
    },
    logoStyle: {
        height: 700, width: "100%",

    }
});