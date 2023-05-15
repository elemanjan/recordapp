/**
 * This is style options for navigator screens
 */

import {Colors} from '@/theme/variables'
import {NativeStackNavigationOptions} from '@react-navigation/native-stack'

export const HEADER_NONE = {headerShown: false}

export const DEFAULT_HEADER: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: Colors.background,
  },
  headerShadowVisible: false,
  headerBackVisible: true,
  headerTitleAlign: 'center',
  headerBackTitleVisible: false,
  headerTintColor: Colors.white,
  headerBackButtonMenuEnabled: false,
  headerTitleStyle: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '600',
  },
}
