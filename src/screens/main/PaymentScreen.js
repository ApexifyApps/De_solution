import { View, Text, TouchableOpacity, Image, TextInput, FlatList, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import APPCOLORS from '../../utils/APPCOLORS'
import Ionicons from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Octicons from 'react-native-vector-icons/Octicons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import axios from 'axios'
import Modal from 'react-native-modal'
import { useDispatch, useSelector } from 'react-redux'
import { setLoader } from '../../redux/AuthSlice'
import Toast from 'react-native-toast-message'
const PaymentScreen = ({ navigation, route }) => {

    const { data } = route.params

    console.log("first", data)
    const [PaymentMethod, setPaymentMethod] = useState("Cash")
    const [PaymentTypeModal, setPaymentTypeModal] = useState(false)

    //Cash
    const [Amount, setAmount] = useState("")

    //Bank

    const [ChequeNo, setChequqNo] = useState("")
    const [BankDate, setBankDate] = useState("")


    const [isSelectPayment, setPaymentSelect] = useState([])
    const [SelectCashType, setSelechCashType] = useState(8)
    const dispatch = useDispatch()


    const Loader = useSelector((state) => state.Data.Loading)

    console.log("first", Loader)




    const Payment = () => {
        dispatch(setLoader(true))

        if (PaymentMethod == "Cash") {

            if (Amount == "") {
                Toast.show({
                    type: 'error',
                    text1: "Please enter the amount"

                })
                dispatch(setLoader(false))

            } else {


                let data = new FormData();
                data.append('type', PaymentMethod == "Cash" ? 42 : 2);
                data.append('bank_act', SelectCashType);
                data.append('trans_date', Date.now());
                data.append('amount', Amount);
                data.append('comments', '');
                data.append('person_type_id', 2);
                data.append('person_id', data?.debtor_no);

                let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: 'https://e.de2solutions.com/mobile/post_service_payments.php',
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    data: data
                };

                axios.request(config)
                    .then((response) => {
                        console.log(JSON.stringify(response.data))
                        dispatch(setLoader(false))

                        Toast.show({
                            type: 'success',
                            text1: "Successfully Done"

                        })

                    })
                    .catch((error) => {
                        console.log(false);
                        Toast.show({
                            type: 'error',
                            text1: "Something went wrong"

                        })
                    });
            }

        } else {

            if (Amount == "") {
                Toast.show({
                    type: 'error',
                    text1: "Please enter the amount"

                })
                dispatch(setLoader(false))

            } else {



                let data = new FormData();
                data.append('type', PaymentMethod == "Cash" ? 42 : 2);
                data.append('bank_act', SelectCashType);
                data.append('trans_date', Date.now());
                data.append('amount', Amount);
                data.append('comments', '');
                data.append('person_type_id', 2);
                data.append('cheque', ChequeNo);
                data.append('cheque_date', BankDate);
                data.append('person_id', data?.debtor_no);

                let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: 'https://e.de2solutions.com/mobile/post_service_payments.php',
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    data: data
                };

                axios.request(config)
                    .then((response) => {
                        console.log(JSON.stringify(response.data))
                        dispatch(setLoader(false))

                        Toast.show({
                            type: 'success',
                            text1: "Successfully Done"

                        })

                    })
                    .catch((error) => {
                        console.log(false);
                        Toast.show({
                            type: 'error',
                            text1: "Something went wrong"

                        })
                    });
            }
        }


    }

    const getAccount = () => {


        dispatch(setLoader(true))
        let data = new FormData();

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://e.de2solutions.com/mobile/all_data.php',
            headers: {
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                // console.log(JSON.stringify(response.data.data_bank));




                if (PaymentMethod === "Cash") {
                    console.log("cash", response.data.data_cash_bank);

                    setPaymentSelect(response?.data?.data_cash_bank)
                    setPaymentTypeModal(true)

                    dispatch(setLoader(false))



                } else {
                    console.log("bank", response.data.data_bank);
                    setPaymentSelect(response?.data?.data_bank)
                    dispatch(setLoader(false))




                }

            })
            .catch((error) => {
                console.log(error);
            });

    }

    const getTypes = () => {
        getAccount()
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

                <Text style={{ color: APPCOLORS.WHITE, fontSize: 20, fontWeight: 'bold' }}>Payment Screen</Text>

                <View />

            </View>


            <View style={{ flexDirection: 'row', padding: 20, alignItems: 'center' }}>

                <TouchableOpacity onPress={() => setPaymentMethod("Cash")} style={{ flexDirection: 'row' }}>
                    <View style={{ height: 30, width: 30, borderWidth: 2, borderRadius: 200, alignItems: 'center', justifyContent: 'center' }}>
                        {
                            PaymentMethod == "Cash" ?

                                <View style={{ height: 20, width: 20, borderRadius: 2000, backgroundColor: APPCOLORS.BTN_COLOR }} />
                                :
                                null
                        }
                    </View>
                    <Text style={{ color: APPCOLORS.BLACK, fontSize: 23, marginLeft: 5, fontWeight: 'bold' }}>Cash</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setPaymentMethod("Cheque")} style={{ flexDirection: 'row' }}>
                    <View style={{ height: 30, width: 30, borderWidth: 2, borderRadius: 200, alignItems: 'center', justifyContent: 'center', marginLeft: 40 }}>
                        {
                            PaymentMethod == "Cheque" ?

                                <View style={{ height: 20, width: 20, borderRadius: 2000, backgroundColor: APPCOLORS.BTN_COLOR }} />
                                :
                                null
                        }
                    </View>
                    <Text style={{ color: APPCOLORS.BLACK, fontSize: 23, marginLeft: 5, fontWeight: 'bold' }}>Cheque</Text>
                </TouchableOpacity>
            </View>


            <View style={{ padding: 20 }}>
                {
                    PaymentMethod == "Cash" ?
                        <>
                            <Text style={{ color: APPCOLORS.BLACK, fontSize: 23, marginLeft: 5, fontWeight: 'bold' }}>Cash</Text>
                            <TextInput
                                placeholder='10,000'
                                style={{ height: 50, backgroundColor: APPCOLORS.WHITE, elevation: 10, borderRadius: 200, paddingHorizontal: 20, marginTop: 10 }}
                                onChangeText={(txt) => {
                                    setAmount(txt)
                                }}
                                value={Amount}
                            />

                            <TouchableOpacity onPress={() => getTypes()} style={{ height: 50, backgroundColor: 'white', marginTop: 10, borderRadius: 200, elevation: 10, alignItems: 'center', justifyContent: 'center' }}>

                                {
                                    Loader == true ?

                                        <ActivityIndicator size={'large'} color={'blue'} />
                                        :

                                        <Text>{SelectCashType == 6 ? "Cash In Hand" : SelectCashType == 7 ? "Pretty Cash" : SelectCashType == 9 ? "Factory Cash" : "Select Type"}</Text>
                                }
                            </TouchableOpacity>


                        </>
                        :
                        <>
                            <Text style={{ color: APPCOLORS.BLACK, fontSize: 23, marginLeft: 5, fontWeight: 'bold' }}>Cheque</Text>
                            <TextInput
                                placeholder='Bank Name'
                                style={{ height: 50, backgroundColor: APPCOLORS.WHITE, elevation: 10, borderRadius: 200, paddingHorizontal: 20, marginTop: 10 }}
                            />
                            <TextInput
                                placeholder='Cheque no'
                                style={{ height: 50, backgroundColor: APPCOLORS.WHITE, elevation: 10, borderRadius: 200, paddingHorizontal: 20, marginTop: 10 }}
                                onChangeText={(txt) => {
                                    setChequqNo(txt)
                                }}
                                value={ChequeNo}
                            />

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TextInput
                                    placeholder='Amount'
                                    style={{ height: 50, backgroundColor: APPCOLORS.WHITE, elevation: 10, borderRadius: 200, paddingHorizontal: 20, marginTop: 10, width: '50%' }}
                                    onChangeText={(txt) => {
                                        setAmount(txt)
                                    }}
                                    value={Amount}
                                />
                                <TextInput
                                    placeholder='Date'
                                    style={{ height: 50, backgroundColor: APPCOLORS.WHITE, elevation: 10, borderRadius: 200, paddingHorizontal: 20, marginTop: 10, width: '47%' }}
                                    onChangeText={(txt) => {
                                        setBankDate(txt)
                                    }}
                                    value={BankDate}
                                />
                            </View>

                            <View style={{ height: 2, backgroundColor: APPCOLORS.BLACK, marginTop: 20 }} />
                            {/* 
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                                <Text style={{ fontSize: 20, color: APPCOLORS.BLACK }}>Given</Text>
                                <Text style={{ fontSize: 20, color: APPCOLORS.BLACK }}>9,000</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                <Text style={{ fontSize: 20, color: APPCOLORS.BLACK }}>Remaining</Text>
                                <Text style={{ fontSize: 20, color: APPCOLORS.BLACK }}>1,000</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                <Text style={{ fontSize: 20, color: APPCOLORS.BLACK }}>Given</Text>
                                <Text style={{ fontSize: 20, color: APPCOLORS.BLACK }}>10,000</Text>
                            </View> */}

                        </>


                }
                <TouchableOpacity onPress={() => Payment()} style={{ height: 50, backgroundColor: APPCOLORS.BTN_COLOR, borderRadius: 200, marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: APPCOLORS.WHITE, fontSize: 20, fontWeight: 'bold' }}>{Loader == true ? <ActivityIndicator size={'large'} color={'white'} /> : "Done"}</Text>
                </TouchableOpacity>


                <Modal isVisible={PaymentTypeModal}>
                    <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 10 }}>
                        <TouchableOpacity onPress={() => setPaymentTypeModal(false)} style={{ height: 30, width: 30, borderRadius: 200, backgroundColor: APPCOLORS.BTN_COLOR, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: 'white' }}>X</Text>


                        </TouchableOpacity>

                        <FlatList
                            data={isSelectPayment}
                            renderItem={({ item }) => {
                                console.log(item)
                                return (
                                    <TouchableOpacity onPress={() => setSelechCashType(item.id)} style={{ height: 50, borderWidth: 1, marginTop: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: SelectCashType == item.id ? APPCOLORS.BTN_COLOR : null }}>
                                        <Text style={{ color: SelectCashType == item.id ? 'white' : 'black' }}>{item.bank_account_name}</Text>
                                    </TouchableOpacity>
                                )
                            }}
                        />


                    </View>
                </Modal>

            </View>

            <Toast />

        </View>
    )
}

export default PaymentScreen