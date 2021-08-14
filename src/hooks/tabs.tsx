import React, { createContext, useCallback, useContext, useState } from 'react'

export type TypeTabs = {
  default?: boolean
  name: string
  label: string
  Component?: JSX.Element
  isEnable: boolean
}

type TypeCurrentTab = {
  key: string
}

type TypeTabsContext = {
  addTab: (newTab: TypeTabs) => void
  removeTab: (keyTab: string) => void
  tabs: TypeTabs[]
  activeTab: (keyTab: string) => void
  disableTab: (keyTab: string) => void
  changeCurrentTab: (keyTab: string) => void
  changeCurrentTabForNext: () => void
  loadCurrentTab: () => TypeCurrentTab
  changeCurrentTabForPrevious: () => void
}

type TypeTabsProvider = {
  children: JSX.Element
}

const TabsContext = createContext<TypeTabsContext>({} as TypeTabsContext)

const TabsProvider = ({ children }: TypeTabsProvider): JSX.Element => {
  const [tabs, setTabs] = useState<TypeTabs[]>([])
  const [currentTab, setCurrentTab] = useState<TypeCurrentTab>({ key: '' })

  const addTab = (newTab: TypeTabs) => {
    if (newTab.default) setCurrentTab({ key: newTab.name })
    setTabs(prevState => {
      prevState.push(newTab)
      return prevState
    })
  }

  const removeTab = (keyTab: string): void => {
    try {
      const result = tabs.filter(({ name }) => name === keyTab)
      if (!result) {
        const resultTabsWithouRemoveTab = tabs.filter(
          ({ name }) => keyTab !== name
        )
        setTabs(resultTabsWithouRemoveTab)
        return
      }
      throw new Error('No find tab with id')
    } catch (error) {
      console.error(error.message)
    }
  }

  const activeTab = (keyTab: string) => {
    try {
      const result = tabs.filter(({ name }) => name === keyTab)
      if (result.length > 0) {
        setTabs(prevState => {
          const tabsCopy = [...prevState]
          const indexTab = tabsCopy.indexOf(result[0])
          tabsCopy[indexTab].isEnable = true
          return tabsCopy
        })
        return
      }
      throw new Error('No find tab with id')
    } catch (error) {
      console.error(error.message)
    }
  }

  const disableTab = (keyTab: string) => {
    try {
      const result = tabs.filter(({ name }) => name === keyTab)
      if (result.length > 0) {
        setTabs(prevState => {
          const tabsCopy = [...prevState]
          const indexTab = tabsCopy.indexOf(result[0])
          tabsCopy[indexTab].isEnable = false
          return tabsCopy
        })
        return
      }
      throw new Error('No find tab with id')
    } catch (error) {
      console.error(error.message)
    }
  }

  const changeCurrentTab = useCallback((keyTab: string) => {
    setCurrentTab({ key: keyTab })
  }, [])

  const loadCurrentTab = (): TypeCurrentTab => currentTab

  const changeCurrentTabForNext = () => {
    if (loadCurrentTab().key) {
      const index = tabs
        .filter(({ isEnable }) => isEnable)
        .findIndex(({ name }) => name === loadCurrentTab().key)
      const nextTab = tabs
        .filter(({ isEnable }) => isEnable)
        .find((tab, nextIndex) => {
          return nextIndex === index + 1 ? tab : null
        })
      if (nextTab) {
        setCurrentTab({ key: nextTab.name })
      }
    }
  }

  const changeCurrentTabForPrevious = () => {
    if (loadCurrentTab().key) {
      const index = tabs
        .filter(({ isEnable }) => isEnable)
        .findIndex(({ name }) => name === loadCurrentTab().key)
      const nextTab = tabs
        .filter(({ isEnable }) => isEnable)
        .find((tab, nextIndex) => {
          return nextIndex === index - 1 ? tab : null
        })
      if (nextTab) {
        setCurrentTab({ key: nextTab.name })
      }
    }
  }

  return (
    <TabsContext.Provider
      value={{
        addTab,
        removeTab,
        tabs,
        activeTab,
        disableTab,
        changeCurrentTab,
        loadCurrentTab,
        changeCurrentTabForPrevious,
        changeCurrentTabForNext
      }}
    >
      {children}
    </TabsContext.Provider>
  )
}

const useTabs = (): TypeTabsContext => {
  const context = useContext(TabsContext)

  if (!context) {
    throw new Error('useTabs must be used witin a TabsProvider')
  }

  return context
}

export { TabsProvider, useTabs }
