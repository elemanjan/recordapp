import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {AppParamList} from '@/navigation/types'
import {MainScreen} from '@/screens/MainScreen'
import {DEFAULT_HEADER, HEADER_NONE} from '@/navigation/screenOptions'
import {useTranslation} from 'react-i18next'
import {RecordScreen} from '@/screens/RecordScreen'

const Root = createNativeStackNavigator<AppParamList>()

const AppNavigator = () => {
  const {t} = useTranslation()
  return (
    <Root.Navigator screenOptions={DEFAULT_HEADER}>
      <Root.Screen
        options={() => ({
          ...HEADER_NONE,
        })}
        name="MainScreen"
        component={MainScreen}
      />
      <Root.Screen
        name="RecordScreen"
        options={() => ({
          title: t('navigation.record_screen') ?? '',
        })}
        component={RecordScreen}
      />
    </Root.Navigator>
  )
}

export default AppNavigator
