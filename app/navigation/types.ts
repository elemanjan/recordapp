/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import type {NativeStackScreenProps} from '@react-navigation/native-stack'

export type AppParamList = {
  MainScreen: undefined
  RecordScreen: undefined
}

/** Navigation screens props */

export type AppStackScreenProps<T extends keyof AppParamList> =
  NativeStackScreenProps<AppParamList, T>
