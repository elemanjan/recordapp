import React, {useRef, useState} from 'react'
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
  const camera = useRef<Camera>(null)

  const setRecordTypeVideo = (): void => {
    setRecordType('video')
  }

  const setRecordTypeVoice = (): void => {
    setRecordType('voice')
  }

  const onStartRecordVoice = async () => {
    await audioRecorderPlayer.startRecorder()
    setStarted(true)
    audioRecorderPlayer.addRecordBackListener(e => {})
  }

  const onStopRecordVoice = async () => {
    try {
      if (isStarted) {
        const result = await audioRecorderPlayer.stopRecorder()
        setStarted(false)
        audioRecorderPlayer.removeRecordBackListener()
        const base64 = await convertToBase64(result)
        await handleSendRecordToAPI(base64)
      }
    } catch (e) {}
  }

  const onStartRecordVideo = async () => {
    try {
      camera.current?.startRecording({
        onRecordingFinished: async video => {
          const base64 = await convertToBase64(video.path)
          await handleSendRecordToAPI(base64)
        },
        onRecordingError: error => console.error(error),
      })
      setStarted(true)
    } catch (e) {
      console.error(e)
    }
  }

  const onStopRecordVideo = async (): Promise<void> => {
    try {
      await camera.current?.stopRecording()
      setStarted(false)
      // const base64 = await convertToBase64(result)
      // await handleSendRecordToAPI(base64)
    } catch (e) {
      console.error(e)
    }
  }

  const handleSendRecordToAPI = async (base64: string): Promise<void> => {
    try {
      await fetch(`http://localhost:8080/api/record/${recordType}`, {
        method: 'POST',
        body: base64,
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleRecord = async (): Promise<void> => {
    try {
      const cameraPermission = await Camera.getCameraPermissionStatus()
      const microphonePermission = await Camera.getMicrophonePermissionStatus()
      if (microphonePermission === 'denied' || cameraPermission === 'denied') {
        await Camera.requestMicrophonePermission()
        await Camera.requestCameraPermission()
      } else {
        if (recordType === 'voice') {
          onStartRecordVoice()
        } else {
          setActiveCamera(true)
        }
      }
    } catch (e) {}
  }

  if (device != null && isActiveCamera) {
    return (
      <View style={styles.cameraViewContainer}>
        <Camera
          ref={camera}
          video={true}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={isActiveCamera}
        />
        <Timer
          titleStyles={{fontSize: 36}}
          containerStyles={styles.videoTimerContainer}
          duration={appStore.recordTimer}
          isTimerRun={isStarted}
          callbackStop={onStopRecordVideo}
        />
        <Button
          onPress={isStarted ? onStopRecordVideo : onStartRecordVideo}
          containerStyles={[
            styles.cameraStartRecordBtn,
            isStarted && styles.cameraStopRecordBtn,
          ]}>
          {t(isStarted ? 'stop_record' : 'record_video')}
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
        <Button
          isDisabled={isStarted}
          onPress={handleRecord}
          containerStyles={styles.buttonContainer}>
          {t('start_record')}
        </Button>
        <Button
          isDisabled={!isStarted}
          onPress={onStopRecordVoice}
          containerStyles={styles.stopButtonContainer}>
          {t('stop_record')}
        </Button>
        <Timer
          duration={appStore.recordTimer}
          isTimerRun={isStarted}
          callbackStop={onStopRecordVoice}
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
  disabledButtonContainer: {
    backgroundColor: Colors.grayBg,
  },
  stopButtonContainer: {
    backgroundColor: Colors.error,
    marginTop: 20,
  },
  cameraViewContainer: {
    flex: 1,
  },
  videoTimerContainer: {
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
  },
  cameraStartRecordBtn: {
    position: 'absolute',
    bottom: 40,
    width: '50%',
    alignSelf: 'center',
  },
  cameraStopRecordBtn: {
    backgroundColor: Colors.error,
  },
})
