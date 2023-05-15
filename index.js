/**
 * @format
 */

import {AppRegistry} from 'react-native'
import App from './app/App'
import {name as appName} from './app.json'
import '@/i18/index'

AppRegistry.registerComponent(appName, () => App)
