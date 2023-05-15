import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native'
import React from 'react'
import {Colors} from '@/theme/variables'
import {Text} from '@/components/Text'

interface RecordTypeButtonProps {
  title: string
  isActive: boolean
  onPress: () => void
  containerStyles?: StyleProp<ViewStyle>
}

export const RecordTypeButton = (props: RecordTypeButtonProps) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        styles.container,
        props.containerStyles,
        props.isActive && styles.activeContainer,
      ]}>
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeContainer: {
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  icon: {
    width: 45,
    height: 45,
  },
  title: {},
})
