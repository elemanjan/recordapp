import React, {ReactElement} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import {StyleSheet, TextInput, View} from 'react-native'
import {useTranslation} from 'react-i18next'
import {Colors, FontSize} from '@/theme/variables'
import {Text} from '@/components/Text'
import {useMst} from '@/store/RootStore'
import {observer} from 'mobx-react-lite'
import {AppStackScreenProps} from '@/navigation/types'
import {Button} from '@/components/Button'
import {LangIcon} from './components/LangIcon'

const enIcon = require('@/assets/icons/en.png')
const ruIcon = require('@/assets/icons/ru.png')

export const MainScreen = observer(
  (props: AppStackScreenProps<'MainScreen'>): ReactElement => {
    const {t} = useTranslation()
    const {appStore} = useMst()

    const handleSetTimer = (text: string) => {
      if (text.length === 0) {
        appStore.setRecordTimer(null)
      }
      if (text.length > 0) {
        appStore.setRecordTimer(Number(text))
      }
    }

    const navigateToRecord = () => {
      if (appStore.recordTimer !== 0 && appStore.recordTimer !== null) {
        props.navigation.navigate('RecordScreen')
      }
    }

    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Text style={styles.sectionTitle}>{t('input_count_seconds')}</Text>
            <TextInput
              value={appStore.recordTimer?.toString() ?? ''}
              onChangeText={handleSetTimer}
              keyboardType={'number-pad'}
              style={styles.input}
            />
            {(appStore.recordTimer === null || appStore.recordTimer === 0) && (
              <Text style={styles.errorTitle}>{t('input_count_seconds')}</Text>
            )}
          </View>
          <View style={styles.languageContainer}>
            <Text style={styles.sectionTitle}>{t('change_language')}</Text>
            <View style={styles.rowContainer}>
              <LangIcon
                icon={ruIcon}
                isActive={appStore.lang === 'ru'}
                onPress={() => appStore.setLang('ru')}
              />
              <LangIcon
                icon={enIcon}
                isActive={appStore.lang === 'en'}
                onPress={() => appStore.setLang('en')}
              />
            </View>
          </View>
          <Button
            onPress={navigateToRecord}
            containerStyles={styles.buttonContainer}>
            {t('nav_record')}
          </Button>
        </View>
      </SafeAreaView>
    )
  },
)

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 12,
    paddingHorizontal: 12,
    justifyContent: 'space-evenly',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  languageContainer: {
    paddingTop: 12,
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: FontSize.md,
    marginBottom: 18,
  },
  buttonContainer: {
    position: 'absolute',
    width: '100%',
    alignSelf: 'center',
    bottom: 40,
  },
  inputContainer: {},
  input: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    color: Colors.black,
    fontSize: FontSize.md,
    fontWeight: '500',
  },
  errorTitle: {
    color: Colors.error,
    fontSize: FontSize.sm,
  },
})
