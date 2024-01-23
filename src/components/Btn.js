import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import APPCOLORS from '../utils/APPCOLORS'

const Btn = (props) => {
  return (
    <TouchableOpacity onPress={props.nav} style={{height:50,  alignItems:'center', justifyContent:'center',backgroundColor:APPCOLORS.BTN_COLOR, borderRadius:5 }}>
      {
        props.loading == true ?

        <ActivityIndicator size={'large'} color={'white'} />
        :

        <Text style={{color:APPCOLORS.WHITE, fontWeight:'bold'}}>{props.title}</Text>
      }
    </TouchableOpacity>
  )
}

export default Btn