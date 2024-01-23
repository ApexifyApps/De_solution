import { View, Text, TouchableOpacity, Image, TextInput, FlatList, ScrollView } from 'react-native'
import React, { useState } from 'react'
import APPCOLORS from '../../utils/APPCOLORS'
import Ionicons from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useDispatch, useSelector } from 'react-redux'
import { setCartData } from '../../redux/AuthSlice'

const ItemList = ({ navigation }) => {



    const dispatch = useDispatch()
    
    const cart = useSelector(state => state.Data.cartData)


    const removeItem = (index) => {
        // Create a new array without the selected item
        const newCart = cart.filter((item, i) => i !== index);
        dispatch(setCartData(newCart))
    };

    return (
        <View style={{ flex: 1, backgroundColor: APPCOLORS.BTN_COLOR, padding: 20, paddingBottom: 0 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <TouchableOpacity onPress={() => navigation.navigate("AddItems", {NewCart : cart})}>
                    <Ionicons
                        name={'chevron-back'}
                        color={APPCOLORS.WHITE}
                        size={30}
                    />
                </TouchableOpacity>


                <Text style={{ color: APPCOLORS.WHITE, fontSize: 20, fontWeight: 'bold' }}>Total Items</Text>

                <View />
            </View>

            <FlatList
                data={cart}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    console.log(item, index)
                    return (
                        <View style={{ backgroundColor: APPCOLORS.CLOSETOWHITE, marginTop: 20, borderRadius: 10, padding: 10 }}>
                            
                            <TouchableOpacity style={{ position: 'absolute', zIndex: 100, right: 0, top: -15, backgroundColor: 'red', padding: 10, borderRadius: 10 }} onPress={() => removeItem(index)}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center',  }}>
                                    <Ionicons name={'trash-bin'} color={APPCOLORS.WHITE} size={20} />

                                </View>
                            </TouchableOpacity>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop:30 }}>
                                <Text style={{ color: APPCOLORS.BLACK, fontSize: 15, fontWeight: 'bold' }}>Product name</Text>
                                <Text style={{ color: APPCOLORS.BLACK, fontSize: 15 }}>{item?.description}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                <Text style={{ color: APPCOLORS.BLACK, fontSize: 15, fontWeight: 'bold' }}>Quantity</Text>
                                <Text style={{ color: APPCOLORS.BLACK, fontSize: 15 }}>{item?.quantity_ordered}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                <Text style={{ color: APPCOLORS.BLACK, fontSize: 15, fontWeight: 'bold' }}>Per_Unit Price</Text>
                                <Text style={{ color: APPCOLORS.BLACK, fontSize: 15 }}>Rs {item?.unit_price}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                <Text style={{ color: APPCOLORS.BLACK, fontSize: 15, fontWeight: 'bold' }}>Product Discount</Text>
                                <Text style={{ color: APPCOLORS.BLACK, fontSize: 15 }}>Rs {item?.ProductDiscount}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                <Text style={{ color: APPCOLORS.BLACK, fontSize: 15, fontWeight: 'bold' }}>Grand Total</Text>
                                <Text style={{ color: APPCOLORS.BLACK, fontSize: 15 }}>Rs {item?.GrandTotal}</Text>
                            </View>

                        </View>
                    )
                }}

            />
        </View>
    )
}

export default ItemList