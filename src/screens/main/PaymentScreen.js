import { View, Text, TouchableOpacity, Image, TextInput, FlatList } from 'react-native'
import React, { useState } from 'react'
import APPCOLORS from '../../utils/APPCOLORS'
import Ionicons from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Octicons from 'react-native-vector-icons/Octicons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'

const PaymentScreen = ({navigation}) => {


    const [PaymentMethod, setPaymentMethod] = useState("Cash")

    return (
        <View style={{ flex: 1, backgroundColor: APPCOLORS.CLOSETOWHITE }}>

            <View style={{ backgroundColor: APPCOLORS.BTN_COLOR, height: 90, borderBottomEndRadius: 20, borderBottomLeftRadius: 20, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 20 }}>

                <TouchableOpacity onPress={()=> navigation.goBack()} >
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
                            />


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
                            />

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TextInput
                                    placeholder='Amount'
                                    style={{ height: 50, backgroundColor: APPCOLORS.WHITE, elevation: 10, borderRadius: 200, paddingHorizontal: 20, marginTop: 10 ,  width:'50%'}}
                                />
                                <TextInput
                                    placeholder='Date'
                                    style={{ height: 50, backgroundColor: APPCOLORS.WHITE, elevation: 10, borderRadius: 200, paddingHorizontal: 20, marginTop: 10,width:'47%' }}
                                />
                            </View>

                            <View style={{height:2, backgroundColor:APPCOLORS.BLACK, marginTop:20}}/>

                            <View style={{flexDirection:'row',justifyContent:'space-between', marginTop:20}}>
                                <Text style={{fontSize:20, color:APPCOLORS.BLACK}}>Given</Text>
                                <Text style={{fontSize:20, color:APPCOLORS.BLACK}}>9,000</Text>
                            </View>

                            <View style={{flexDirection:'row',justifyContent:'space-between', marginTop:10}}>
                                <Text style={{fontSize:20, color:APPCOLORS.BLACK}}>Remaining</Text>
                                <Text style={{fontSize:20, color:APPCOLORS.BLACK}}>1,000</Text>
                            </View>

                            <View style={{flexDirection:'row',justifyContent:'space-between', marginTop:10}}>
                                <Text style={{fontSize:20, color:APPCOLORS.BLACK}}>Given</Text>
                                <Text style={{fontSize:20, color:APPCOLORS.BLACK}}>10,000</Text>
                            </View>
                        
                        </>


                }
                            <TouchableOpacity style={{height:50, backgroundColor:APPCOLORS.BTN_COLOR, borderRadius:200, marginTop:20, alignItems:'center', justifyContent:'center'}}>
                                    <Text style={{color:APPCOLORS.WHITE, fontSize:20, fontWeight:'bold'}}>Done</Text>
                            </TouchableOpacity>

            </View>

        </View>
    )
}

export default PaymentScreen