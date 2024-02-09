import { View, Text, TouchableOpacity, Image, TextInput, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import APPCOLORS from '../../utils/APPCOLORS'
import Ionicons from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Octicons from 'react-native-vector-icons/Octicons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setLoader } from '../../redux/AuthSlice'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'
const InsertNewCustomerDetail = ({ navigation }) => {

    const userData = useSelector(state => state.Data.currentData)

    const isLoader = useSelector(state => state.Data.Loading)

    const [CustomerName, setCustomerName] = useState("")
    const [PhoneNumber, setPhoneNumber] = useState("")
    const [Address, setAddress] = useState("")

    const dispatch = useDispatch()

    const AddNewCustomer = async () => {


        const OfflineUser = {
            'CustName': CustomerName,
            'cust_ref': PhoneNumber,
            'address': Address
        }

        console.log("first",OfflineUser)

        await AsyncStorage.setItem("setOfflineUser", JSON.stringify(OfflineUser))



        dispatch(setLoader(true))
        if (!CustomerName) {
            dispatch(setLoader(false))
            Toast.show({
                type: 'error',
                text1: 'Customer Name is required'
            })

        } else if (!PhoneNumber) {
            dispatch(setLoader(false))
            Toast.show({
                type: 'error',
                text1: 'Phone Number Name is required'
            })

        } else if (!Address) {
            dispatch(setLoader(false))

            Toast.show({
                type: 'error',
                text1: 'Address is required'
            })
        } else {


            let data = new FormData();
            data.append('CustName', CustomerName);
            data.append('cust_ref', PhoneNumber);
            data.append('address', Address);
            data.append('user_id', userData.id);

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://e.de2solutions.com/mobile/debtors_master_post.php',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: data
            };

            axios.request(config)
                .then(async(response) => {
                    console.log(JSON.stringify(response.data));
                    Toast.show({
                        type: 'success',
                        text1: 'Successfully created new customer'
                    })
                    setCustomerName("")
                    setPhoneNumber("")
                    setAddress("")
                    dispatch(setLoader(false))
                    await AsyncStorage.removeItem("setOfflineUser")

                })
                .catch((error) => {
                    console.log(error);
                    dispatch(setLoader(false))
                });
        }

    }

    const SyncOffline = async () => {


        const getOfflineSyncUser = await AsyncStorage.getItem("setOfflineUser")

        if(getOfflineSyncUser){

        

        const getOfflineData = JSON.parse(getOfflineSyncUser)

        setCustomerName(getOfflineData.CustName)
        setPhoneNumber(getOfflineData.cust_ref)
        setAddress(getOfflineData.address)

        console.log("first",getOfflineData)
    }else{
        Toast.show({
            type:'error',
            text1: "No User Found"
        })
    }



    }

    return (
        <View style={{ flex: 1, backgroundColor: APPCOLORS.SKY_BLUE }}>
            <View style={{ backgroundColor: APPCOLORS.BTN_COLOR, height: 90, borderBottomEndRadius: 20, borderBottomLeftRadius: 20, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 20 }}>

                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Ionicons
                        name={'chevron-back'}
                        color={APPCOLORS.WHITE}
                        size={30}
                    />
                </TouchableOpacity>

                <Text style={{ color: APPCOLORS.WHITE, fontSize: 20, }}>Add Customer</Text>

                <TouchableOpacity onPress={()=> SyncOffline()}>
                    <Text style={{color:'white'}}>Get Offline</Text>
                </TouchableOpacity>



            </View>

            <View style={{ padding: 20 }}>


                <TextInput
                    style={{ height: 50, backgroundColor: 'white', borderRadius: 10, paddingHorizontal: 10, marginTop: 10 }}
                    placeholder='Customer Name'
                    onChangeText={(txt) => {
                        setCustomerName(txt)
                    }}
                    value={CustomerName}
                />

                <TextInput
                    style={{ height: 50, backgroundColor: 'white', borderRadius: 10, paddingHorizontal: 10, marginTop: 10 }}
                    placeholder='Phone Number'
                    onChangeText={(txt) => {
                        setPhoneNumber(txt)
                    }}
                    value={PhoneNumber}
                />

                <TextInput
                    style={{ height: 50, backgroundColor: 'white', borderRadius: 10, paddingHorizontal: 10, marginTop: 10 }}
                    placeholder='Address'
                    onChangeText={(txt) => {
                        setAddress(txt)
                    }}
                    value={Address}
                />


                <TouchableOpacity onPress={() => AddNewCustomer()} style={{ height: 60, backgroundColor: APPCOLORS.BTN_COLOR, marginTop: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                    {
                        isLoader == true ?
                            <ActivityIndicator size={'large'} color={'white'} />
                            :
                            <Text style={{ color: APPCOLORS.WHITE, fontSize: 20, fontWeight: 'bold' }}>Submit</Text>
                    }
                </TouchableOpacity>

            </View>

        </View>
    )
}

export default InsertNewCustomerDetail