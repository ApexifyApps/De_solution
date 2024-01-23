import { View, Text, TouchableOpacity, Image, TextInput, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import APPCOLORS from '../../utils/APPCOLORS'
import Ionicons from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Octicons from 'react-native-vector-icons/Octicons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import axios from 'axios'
import LottieView from 'lottie-react-native';

const AddNewCustomer = ({ navigation }) => {

    const arr = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 1 },
    ]

    const [AllOrders, setAllOrders] = useState([])
    const [Loader, setLoader] = useState(false)
    const [Search, setSearch] = useState("")


    useEffect(() => {
        getAllOrders()
    }, [])
    const getAllOrders = () => {
        setLoader(true)
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://e.de2solutions.com/mobile/debtors_master.php',
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setAllOrders(response?.data?.data)
                setLoader(false)

            })
            .catch((error) => {
                console.log(error);
                setLoader(false)
            });

    }

    return (
        <View style={{ flex: 1, backgroundColor: APPCOLORS.CLOSETOWHITE }}>
            <View style={{ backgroundColor: APPCOLORS.BTN_COLOR, height: 90, borderBottomEndRadius: 20, borderBottomLeftRadius: 20, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 20 }}>

                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Ionicons
                        name={'chevron-back'}
                        color={APPCOLORS.WHITE}
                        size={30}
                    />
                </TouchableOpacity>

                <View style={{ height: 40, width: '85%', backgroundColor: APPCOLORS.TEXTFIELDCOLOR, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
                    <TextInput
                        placeholder='Search'
                        style={{ width: '80%' }}
                        onChangeText={(txt) => {
                            setSearch(txt)
                        }}
                        value={Search}
                    />


                    <TouchableOpacity >
                        <AntDesign
                            name={'search1'}
                            color={APPCOLORS.BLACK}
                            size={20}
                        />
                    </TouchableOpacity>
                </View>

            </View>


            {
                Loader == true ?

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                        <LottieView source={require('../../assets/Loader.json')} style={{ height: 250, width: 250, alignSelf: 'center' }} autoPlay loop />
                    </View>
                    :

                    <View style={{flex:1}}>
                        <ScrollView>
                        {
                            AllOrders.filter((val) => {
                                console.log(val.debtor_no)

                                const itemNameLowerCase = val.name.toLowerCase();

                                if (Search == "") {
                                    return val
                                } else if (itemNameLowerCase?.includes(Search.toLowerCase())) {
                                    return val
                                }
                            }).map((item, index) => {
                                return (
                                    <View key={index} style={{ borderRadius: 20, elevation: 10, backgroundColor: APPCOLORS.CLOSETOWHITE, marginTop: 10, width: '90%', alignSelf: 'center', padding: 10 }}>

                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Octicons
                                                    name={'person'}
                                                    color={APPCOLORS.BLACK}
                                                    size={20}
                                                />
                                                <Text style={{ color: APPCOLORS.BLACK, marginLeft: 10 }}>{item?.name}</Text>
                                            </View>

                                            <View style={{ flexDirection: 'row' }}>
                                                <AntDesign
                                                    name={'phone'}
                                                    color={APPCOLORS.BLACK}
                                                    size={20}
                                                />
                                                <Text style={{ color: APPCOLORS.BLACK, marginLeft: 10 }}>{item?.debtor_ref}</Text>
                                            </View>
                                        </View>

                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                            <EvilIcons
                                                name={'location'}
                                                color={APPCOLORS.BLACK}
                                                size={22}
                                            />
                                            <Text style={{ color: APPCOLORS.BLACK, }} numberOfLines={1}>{item.address}</Text>
                                        </View>

                                        <TouchableOpacity onPress={() => navigation.navigate('AddItems',{data: item})} style={{ marginTop: 15 }}>
                                            <LinearGradient colors={['#9BC8E2', APPCOLORS.BTN_COLOR, APPCOLORS.BTN_COLOR]} style={{ height: 40, borderRadius: 100, alignItems: 'center', justifyContent: 'center', padding: 10, }}>
                                                <Text style={{ color: APPCOLORS.WHITE, fontSize: 12, fontWeight: 'bold' }}>Take Order</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>

                                            <TouchableOpacity onPress={() => navigation.navigate('PaymentScreen')}>
                                                <LinearGradient colors={['#9BC8E2', APPCOLORS.BTN_COLOR, APPCOLORS.BTN_COLOR]} style={{ height: 40, borderRadius: 100, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                                                    <Text style={{ color: APPCOLORS.WHITE, fontSize: 12, fontWeight: 'bold' }}>Payment</Text>
                                                </LinearGradient>
                                            </TouchableOpacity>


                                            <View style={{ flexDirection: 'row', width: '80%', justifyContent: 'space-around' }}>
                                                <View>
                                                    <Text style={{ color: APPCOLORS.BLACK, fontWeight: 'bold' }}>Last Order</Text>
                                                    <Text>23-11-2023</Text>
                                                </View>

                                                <View>
                                                    <Text style={{ color: APPCOLORS.BLACK, fontWeight: 'bold' }}>Total Order</Text>
                                                    <Text>25</Text>
                                                </View>

                                                <View>
                                                    <Text style={{ color: APPCOLORS.BLACK, fontWeight: 'bold' }}>Total Pay</Text>
                                                    <Text>Rs 1,000</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                )
                            })
                        }
                        </ScrollView>
                    </View>
         
            }

            <TouchableOpacity onPress={() => navigation.navigate('InsertNewCustomerDetail')} style={{ backgroundColor: 'red', height: 50, width: '100%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                <LinearGradient colors={['#9BC8E2', APPCOLORS.BTN_COLOR, APPCOLORS.BTN_COLOR]} style={{ height: 50, width: '100%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', margin: 10 }}>
                    <Text style={{ color: APPCOLORS.WHITE, fontSize: 20, fontWeight: 'bold' }}>Add new customer</Text>
                </LinearGradient>
            </TouchableOpacity>


        </View>
    )
}

export default AddNewCustomer