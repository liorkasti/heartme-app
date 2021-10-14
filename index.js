/**
 * @format
 */

import {AppRegistry} from 'react-native';
import RootApp from './src/AppContext';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => RootApp);
