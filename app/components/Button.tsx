import {Colors, FontSize} from '@/theme/variables'
import React from 'react'
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native'
import {Text} from '@/components/Text'

interface ButtonProps extends TouchableOpacityProps {
  children?: string | null
  containerStyles?: StyleProp<ViewStyle>
  onPress?: () => void
  isDisabled?: boolean
}

export const Button = ({
  children,
  containerStyles,
  onPress,
  isDisabled,
  ...rest
}: ButtonProps) => {
  return (
    <TouchableOpacity
      disabled={isDisabled}
      onPress={onPress}
      style={[
        styles.container,
        containerStyles,
        isDisabled && styles.disabledContainer,
      ]}
      {...rest}>
      <Text style={[styles.title, isDisabled && styles.disabledTitle]}>
        {children}
      </Text>
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
  disabledContainer: {
    backgroundColor: Colors.grayDark,
  },
  title: {
    fontSize: FontSize.md,
    fontWeight: '500',
  },
  disabledTitle: {
    color: Colors.black,
  },
})
