import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import React from 'react'
import {Colors} from '@/theme/variables'

export const LangIcon = ({
  icon,
  isActive,
  onPress,
}: {
  icon: ImageSourcePropType
  isActive: boolean
  onPress: () => void
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.iconContainer, isActive && styles.activeContainer]}>
      <Image source={icon} style={styles.icon} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  iconContainer: {
    padding: 5,
    paddingHorizontal: 30,
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
})
