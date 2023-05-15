import React, {useEffect, useState} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import {StyleSheet, View} from 'react-native'
import {Colors} from '@/theme/variables'
import {RecordTypeButton} from '@/screens/RecordScreen/components/RecordTypeButton'
import {Button} from '@/components/Button'
import {useTranslation} from 'react-i18next'
import AudioRecorderPlayer from 'react-native-audio-recorder-player'
import {observer} from 'mobx-react-lite'
import {useMst} from '@/store/RootStore'
import {Timer} from './components/Times'
import {Camera, useCameraDevices} from 'react-native-vision-camera'
const RNFS = require('react-native-fs')

const audioRecorderPlayer = new AudioRecorderPlayer()

const convertToBase64 = async (path: string): Promise<string> => {
  return await RNFS.readFile(path, 'base64')
}

type RecordType = 'voice' | 'video'

export const RecordScreen = observer((): JSX.Element => {
  const [recordType, setRecordType] = useState<RecordType>('voice')
  const [isStarted, setStarted] = useState<boolean>(false)
  const [isActiveCamera, setActiveCamera] = useState<boolean>(false)
  const {appStore} = useMst()
  const {t} = useTranslation()
  const devices = useCameraDevices()
  const device = devices.back

  const onStartVoiceRecord = async () => {
    await audioRecorderPlayer.startRecorder()
    setStarted(true)
    audioRecorderPlayer.addRecordBackListener(e => {})
  }

  const onStopRecord = async () => {
    try {
      if (isStarted) {
        const result = await audioRecorderPlayer.stopRecorder()
        setStarted(false)
        audioRecorderPlayer.removeRecordBackListener()
        await convertToBase64(result)
      }
    } catch (e) {}
  }

  const sendRecord = async (base64: string) => {
    try {
      await fetch('http://localhost:8080/api/record/video', {
        method: 'POST',
        body: base64,
      })
    } catch (error) {
      console.error(error)
    }
  }

  const setRecordTypeVideo = () => {
    setRecordType('video')
  }

  const setRecordTypeVoice = () => {
    setRecordType('voice')
  }

  const handleRecord = async () => {
    try {
      const cameraPermission = await Camera.getCameraPermissionStatus()
      const microphonePermission = await Camera.getMicrophonePermissionStatus()
      if (microphonePermission === 'denied') {
        await Camera.requestMicrophonePermission()
      } else {
        if (recordType === 'voice') {
          await onStartVoiceRecord()
        } else {
          if (cameraPermission === 'denied') {
            await Camera.requestCameraPermission()
          } else {
            setActiveCamera(true)
          }
        }
      }
    } catch (e) {}
  }

  if (device != null && isActiveCamera) {
    return (
      <View style={{flex: 1}}>
        <Camera
          video={true}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={isActiveCamera}
        />
        <Timer
          titleStyles={{fontSize: 36}}
          containerStyles={{
            position: 'absolute',
            top: 0,
            alignSelf: 'center',
          }}
          duration={appStore.recordTimer}
          isTimerRun={isStarted}
          setTimerRun={setStarted}
        />
        <Button
          containerStyles={{
            position: 'absolute',
            bottom: 40,
            width: '50%',
            alignSelf: 'center',
          }}>
          Record video
        </Button>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <View style={styles.recordTypeContainer}>
          <RecordTypeButton
            title={t('voice')}
            isActive={recordType === 'voice'}
            onPress={setRecordTypeVoice}
            containerStyles={styles.recordTypeBtn}
          />
          <RecordTypeButton
            title={t('video')}
            isActive={recordType === 'video'}
            onPress={setRecordTypeVideo}
            containerStyles={styles.recordTypeBtn}
          />
        </View>
        <Button onPress={handleRecord} containerStyles={styles.buttonContainer}>
          {t('start_record')}
        </Button>
        <Button
          onPress={onStopRecord}
          containerStyles={styles.stopButtonContainer}>
          {t('stop_record')}
        </Button>
        <Timer
          duration={appStore.recordTimer}
          isTimerRun={isStarted}
          setTimerRun={setStarted}
        />
      </View>
    </SafeAreaView>
  )
})

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 24,
    paddingHorizontal: 12,
  },
  recordTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  recordTypeBtn: {
    width: '48%',
  },
  buttonContainer: {
    marginTop: 20,
  },
  stopButtonContainer: {
    backgroundColor: Colors.error,
    marginTop: 20,
  },
})
