/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

import {Dimensions, Platform} from 'react-native'

/**
 * Colors
 */
export const Colors = {
  transparent: 'rgba(0,0,0,0)',
  background: '#202020',
  white: '#ffffff',
  black: '#000000',
  text: '#ffffff',
  primary: '#1CAF68',
  navigationHeader: '#202020',
  error: '#E83154',
  blue: '#2A70B0',
  yellow: '#FFE15D',
  gray: '#F6F6F6',
  grayBg: '#F5F8FD',
  grayDark: '#c4c4c4',
  grayText: '#636B79',
  grayBorder: '#F5F7FB',
  placeholderColor: '#909399',
}
/**
 * FontSize
 */
export const FontSize = {
  xs: 12,
  sm: 14,
  md: 18,
  l: 20,
  xl: 22,
}

/**
 * Metrics Sizes
 */
const tiny = 5 // 10
const small = tiny * 2 // 10
const regular = tiny * 3 // 15
const large = regular * 2 // 30
export const MetricsSizes = {
  tiny,
  small,
  regular,
  large,
}

export default {
  Colors,
  FontSize,
  MetricsSizes,
}

interface BoxShadowProps {
  color?: string
  radius?: number
  offset?: {height: number; width: number}
  opacity?: number
}
export function boxShadow({
  color = '#878787',
  radius = 6,
  offset = {height: 3, width: 0},
  opacity = 0.2,
}: BoxShadowProps) {
  return {
    shadowColor: color,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: radius,
  }
}

export const DEVICE_WIDTH = Dimensions.get('window').width
export const DEVICE_HEIGHT = Dimensions.get('window').height
export const isIOS = Platform.OS === 'ios'
export const isAndroid = Platform.OS === 'android'
