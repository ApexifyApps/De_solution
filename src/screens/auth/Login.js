import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import APPCOLORS from '../../utils/APPCOLORS';
import Btn from '../../components/Btn';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { CurrentLogin, setLoader } from '../../redux/AuthSlice';
import Toast from 'react-native-toast-message';
const Login = ({ navigation }) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()

    const Loading = useSelector(state => state.Data.Loading)


    const Login = () => {

        dispatch(setLoader(true))

        if (username == "" || password == "") {
            dispatch(setLoader(false))

            Toast.show({
                type: 'error',
                text1: 'All fields are required'
            })
            
        }else{

        console.log("....", username, password)

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://e.de2solutions.com/mobile/users.php',
            headers: {}
        };
        dispatch(CurrentLogin({config, username, password}))
    }

    }

    return (
        <LinearGradient colors={['#007BC1', '#007BC1', '#FFFFFF']} style={{ flex: 1, paddingBottom: 20, justifyContent: 'space-around' }}>
            <Image source={require('../../assets/Rider.png')} style={{ alignSelf: 'center', height: 300, width: 300, resizeMode: 'contain', marginTop: 30 }} />

            <View style={{ backgroundColor: APPCOLORS.CLOSETOWHITE, elevation: 10, width: '90%', alignSelf: 'center', borderRadius: 10, padding: 20 }}>
                <Text style={{ color: APPCOLORS.BLACK, fontSize: 30, fontWeight: 'bold' }}>Login</Text>

                <TextInput
                    placeholder='Email or username'
                    style={{ color: APPCOLORS.BLACK, backgroundColor: APPCOLORS.TEXTFIELDCOLOR, borderRadius: 10, marginTop: 20, paddingHorizontal: 10 }}
                    onChangeText={(txt) => {
                        setUsername(txt)
                    }}
                    value={username}
                />

                <TextInput
                    placeholder='Password'
                    secureTextEntry={true}
                    style={{ color: APPCOLORS.BLACK, backgroundColor: APPCOLORS.TEXTFIELDCOLOR, borderRadius: 10, paddingHorizontal: 10, marginTop: 10 }}
                    onChangeText={(txt) => {
                        setPassword(txt)
                    }}
                    value={password}
                />

                <View style={{ marginTop: 40 }}>
                    <Btn title={'Sign In'} nav={() => Login()} loading={Loading} />
                </View>
            </View>
        </LinearGradient>
    )
}

export default Login