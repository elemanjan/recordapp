import React from 'react'
import {StatusBar} from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {Colors} from 'react-native/Libraries/NewAppScreen'
import {Provider, rootStore} from '@/store/RootStore'
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native'
import AppNavigator from '@/navigation/Application'

function App(): JSX.Element {
  const navigationRef = createNavigationContainerRef()

  return (
    <Provider value={rootStore}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={Colors.backgroundColor}
      />
      <SafeAreaProvider>
        <NavigationContainer ref={navigationRef}>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  )
}

export default App
