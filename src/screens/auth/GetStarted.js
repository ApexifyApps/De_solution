import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import Btn from '../../components/Btn'
import APPCOLORS from '../../utils/APPCOLORS'

const GetStarted = ({navigation}) => {
    return (
        <ImageBackground source={require('../../assets/getstartedbg.png')} style={{ flex: 1 }}>

            <View style={{padding:20, flex:0.9, justifyContent:'flex-end'}}>
                <Text style={{ color: APPCOLORS.WHITE, fontSize: 30,marginBottom:10, fontWeight:'bold' }}>De-Solution</Text>
                <Text style={{ color: APPCOLORS.WHITE, fontSize: 20 ,marginBottom:20}}>Get Start with us with a great Delivery platform</Text>
                <Btn nav={()=> navigation.navigate('Login')} title={"Get Started"} />
            </View>

        </ImageBackground>
    )
}

export default GetStarted