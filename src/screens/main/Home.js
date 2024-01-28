import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import APPCOLORS from '../../utils/APPCOLORS'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import LinearGradient from 'react-native-linear-gradient'
import { useDispatch } from 'react-redux'
import { setAllProducts, setLoader } from '../../redux/AuthSlice'
import axios from 'axios'
const Home = ({navigation}) => {


    useEffect(()=>{
        getProducts()
    },[])


    const dispatch = useDispatch()
    const getProducts = () => {

        dispatch(setLoader(true))

        let data = new FormData()

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://e.de2solutions.com/mobile/stock_master.php',
            headers: {},
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data.data));
                dispatch(setLoader(false))
                dispatch(setAllProducts(response.data.data))

             
            })
            .catch((error) => {
                dispatch(setLoader(false))
                console.log(error);

            });
    }


    return (
        <View style={{ flex: 1, backgroundColor: '#C0DAEA' }}>
            
            <View style={{ backgroundColor: APPCOLORS.BTN_COLOR, height: 80, borderBottomEndRadius: 20, borderBottomStartRadius: 20, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 20 }}>
                <View />
                <Text style={{ color: APPCOLORS.WHITE, fontSize: 20 }}>Home</Text>
                <TouchableOpacity  onPress={()=> navigation.navigate('Profile')}>
                    <MaterialIcons
                        name={'person'}
                        color={APPCOLORS.WHITE}
                        size={30}
                    />
                </TouchableOpacity>
            </View>
            
            <View style={{ justifyContent: 'space-around', flex: 1 }}>
                
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
                    <TouchableOpacity   style={{ height: 300, width: '43%' }}>
                        <LinearGradient colors={['#9BC8E2', APPCOLORS.BTN_COLOR]} style={{ height: 270, width: '100%', borderRadius: 10, backgroundColor: APPCOLORS.SKY_BLUE, alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={require('../../assets/newOrder.png')} style={{ height: 100, width: 100, resizeMode: 'contain' }} />
                            <Text style={{ color: APPCOLORS.WHITE, marginTop: 20, fontSize: 20 }}>New Orders</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=> navigation.navigate('AddNewCustomer')} style={{ height: 300, width: '43%' }}>
                        <LinearGradient colors={['#9BC8E2', APPCOLORS.BTN_COLOR]} style={{ height: 270, width: '100%', borderRadius: 10, backgroundColor: APPCOLORS.SKY_BLUE, alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={require('../../assets/TotalOrder.png')} style={{ height: 100, width: 100, resizeMode: 'contain' }} />
                            <Text style={{ color: APPCOLORS.WHITE, marginTop: 20, fontSize: 20 }}>Total Orders</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
                    <TouchableOpacity style={{ height: 300, width: '43%' }}>
                        <LinearGradient colors={['#9BC8E2', APPCOLORS.BTN_COLOR]} style={{ height: 270, width: '100%', borderRadius: 10, backgroundColor: APPCOLORS.SKY_BLUE, alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={require('../../assets/Pending.png')} style={{ height: 100, width: 100, resizeMode: 'contain' }} />
                            <Text style={{ color: APPCOLORS.WHITE, marginTop: 20, fontSize: 20 }}>Pending</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=> navigation.navigate("Maps")} style={{ height: 300, width: '43%' }}>
                        <LinearGradient colors={['#9BC8E2', APPCOLORS.BTN_COLOR]} style={{ height: 270, width: '100%', borderRadius: 10, backgroundColor: APPCOLORS.SKY_BLUE, alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={require('../../assets/Recover.png')} style={{ height: 100, width: 100, resizeMode: 'contain' }} />
                            <Text style={{ color: APPCOLORS.WHITE, marginTop: 20, fontSize: 20 }}>Recovery</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                </View>

            </View>

        </View>
    )
}

export default Home