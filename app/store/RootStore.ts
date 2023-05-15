import {createContext, useContext} from 'react'
import {Instance, types} from 'mobx-state-tree'
import {AppStore} from '@/store/AppStore'

const RootStore = types.model('RootStore', {
  appStore: types.optional(AppStore, {lang: 'en'}),
})

export const rootStore = RootStore.create()

export type RootInstance = Instance<typeof RootStore>
const RootStoreContext = createContext<null | RootInstance>(null)

export const Provider = RootStoreContext.Provider

export function useMst() {
  const store = useContext(RootStoreContext)
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }
  return store
}
