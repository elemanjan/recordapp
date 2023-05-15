import {Colors} from '@/theme/variables'
import React from 'react'
import {StyleProp, StyleSheet, Text as RNText, TextStyle} from 'react-native'

interface CustomTextProps {
  children?: string | null
  style?: StyleProp<TextStyle>
}

export const Text = (props: CustomTextProps) => {
  return (
    <RNText style={[styles.textStyle, props.style]}>{props.children}</RNText>
  )
}

const styles = StyleSheet.create({
  textStyle: {
    color: Colors.white,
  },
})
