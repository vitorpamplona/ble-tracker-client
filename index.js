/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import BackgroundTaskServices from './app/services/BackgroundTaskService';

AppRegistry.registerComponent(appName, () => App);

BackgroundTaskServices.start();

