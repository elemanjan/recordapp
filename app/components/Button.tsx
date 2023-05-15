import {Colors, FontSize} from '@/theme/variables'
import React from 'react'
import {
  PressableProps,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import {Text} from '@/components/Text'

interface ButtonProps extends PressableProps {
  children?: string | null
  containerStyles?: StyleProp<ViewStyle>
  onPress?: () => void
}

export const Button = (props: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.container, props.containerStyles]}>
      <Text style={styles.title}>{props.children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: FontSize.md,
    fontWeight: '500',
  },
})
