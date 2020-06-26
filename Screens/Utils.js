import React,{Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';





class Utils extends Component {

    retrieveData = async () => {
        try {
          retrivedName = await AsyncStorage.getItem('savedName');
          console.log('retrivedName  -' + retrivedName);
    
          retrivedPassword = await AsyncStorage.getItem('savedPassword');
          console.log('retrivedPassword  -' + retrivedPassword);
    
          retrivedMobileNumber = await AsyncStorage.getItem('savedMobileNumber');
          console.log('retrivedMobileNumber   -' + retrivedMobileNumber);
        } catch (error) {
          console.log('retieved catch block');
        }
      };

    render() {
      return (
         <View>
            <Text>Welcome to React Native</Text>
         </View>
      );
    }
}
