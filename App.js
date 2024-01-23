import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/Routes';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';

import { Store } from './src/redux/Store'
import Toast from 'react-native-toast-message';

import {
  persistStore,
} from 'redux-persist'


export default function App() {


  let persistor = persistStore(Store)

  return (
    <>
      <Provider store={Store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </PersistGate>
      </Provider>
      <Toast />

    </>

  )
}

