import React from 'react';
import 'react-native-gesture-handler';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from './src/Navigators/ApplicationNavigator'
import * as eva from '@eva-design/eva';

import {AuthProvider} from './src/Hooks/AuthContext'


export default () => {

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light} >
        <AuthProvider>
        <AppNavigator />
        </AuthProvider>
      </ApplicationProvider>
    </>
  )
}

