/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Test} from './Screens/Test';
console.disableyellowbox = true;
AppRegistry.registerComponent(appName, () => App);
