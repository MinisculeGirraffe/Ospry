import React from 'react';
import { ApplicationProvider, IconRegistry, Layout } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from './src/Navigators/ApplicationNavigator'
import * as eva from '@eva-design/eva';

import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { StatusBar } from 'expo-status-bar';

import { AuthProvider } from './src/Hooks/AuthContext'


export default () => {
  const [colorScheme, setColorScheme] = React.useState()
  const previousColor = React.useRef(colorScheme)

  let systemTheme = useColorScheme()
  React.useEffect(() => {
    setColorScheme(systemTheme)
  }, [systemTheme])
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <AppearanceProvider>
        <ApplicationProvider {...eva} theme={colorScheme == "dark" ? eva.dark : eva.light} >
          <StatusBar style='auto'/>
          <AuthProvider>
            <Layout style={{ flex: 1 }}>
              <AppNavigator />
            </Layout>
          </AuthProvider>
        </ApplicationProvider>
      </AppearanceProvider>

    </>
  )
}

