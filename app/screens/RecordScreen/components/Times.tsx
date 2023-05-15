import React, {useEffect, useState} from 'react'
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'

interface TimerProps {
  isTimerRun: boolean
  callbackStop: () => void
  duration: number | null
  containerStyles?: StyleProp<ViewStyle>
  titleStyles?: StyleProp<TextStyle>
}
export const Timer = (props: TimerProps) => {
  const [timer, setTimer] = useState<number>(props.duration ?? 0)

  useEffect(() => {
    let interval: number
    if (props.isTimerRun) {
      interval = setInterval(() => {
        setTimer((prevTime: number) => {
          if (prevTime <= 0) {
            props.callbackStop()
            clearInterval(interval)
            return 0
          }
          return prevTime - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [props.isTimerRun])

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes < 10 ? '0' : ''}${minutes}:${
      seconds < 10 ? '0' : ''
    }${seconds}`
  }

  return (
    <View style={[styles.container, props.containerStyles]}>
      <Text style={[styles.timer, props.titleStyles]}>{formatTime(timer)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    fontSize: 64,
    marginBottom: 24,
  },
})
