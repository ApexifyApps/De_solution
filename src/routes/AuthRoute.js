import { View, Text } from 'react-native'
import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
import GetStarted from '../screens/auth/GetStarted';
import Login from '../screens/auth/Login';

const Stack = createStackNavigator();



const AuthRoute = () => {
  return (
    <Stack.Navigator initialRouteName='GetStarted' screenOptions={{ headerShown: false }}>
      <Stack.Screen name="GetStarted" component={GetStarted} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  )
}

export default AuthRoute