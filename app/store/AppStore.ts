import i18n from '@/i18'
import {types} from 'mobx-state-tree'

type LangType = 'en' | 'ru'

export const AppStore = types
  .model({
    lang: types.union(types.literal('ru'), types.literal('en')),
    recordTimer: types.maybeNull(types.number),
  })
  .actions(self => ({
    setLang(lang: LangType): void {
      i18n.changeLanguage(lang)
      self.lang = lang
    },
    setRecordTimer(second: number | null): void {
      self.recordTimer = second
    },
  }))
