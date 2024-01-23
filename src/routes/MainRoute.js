import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/main/Home';
import AddNewCustomer from '../screens/main/AddNewCustomer';
import AddItems from '../screens/main/AddItems';
import ItemList from '../screens/main/ItemList';
import PaymentScreen from '../screens/main/PaymentScreen';
import Profile from '../screens/main/Profile';
import Maps from '../screens/main/Maps';
import InsertNewCustomerDetail from '../screens/main/InsertNewCustomerDetail';


const Stack = createStackNavigator();

const MainRoute = () => {
  return (
    <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AddNewCustomer" component={AddNewCustomer} />
      <Stack.Screen name="InsertNewCustomerDetail" component={InsertNewCustomerDetail} />

      <Stack.Screen name="AddItems" component={AddItems} />
      <Stack.Screen name="ItemList" component={ItemList} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Maps" component={Maps} />

    </Stack.Navigator>
  )
}

export default MainRoute