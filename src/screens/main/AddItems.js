import { View, Text, TouchableOpacity, Image, TextInput, FlatList, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import APPCOLORS from '../../utils/APPCOLORS'
import Ionicons from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient'
import AntDesign from 'react-native-vector-icons/AntDesign'
import axios from 'axios'
import Modal from "react-native-modal";
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux'
import { setCartData, setLoader } from '../../redux/AuthSlice'



const AddItems = ({ navigation, route }) => {

    const { data } = route.params


    const isLoader = useSelector(state => state.Data.Loading)
    const cart = useSelector(state => state.Data.cartData)

    console.log("first", isLoader)


    // console.log("myData", data.debtor_no)

    const [allProducts, setProducts] = useState()

    const [ProductModal, setProductModal] = useState(false)

    const [Search, setSearch] = useState("")

    const [selectProduct, setSelectProduct] = useState()
    const [total, setTotal] = useState(1)
    const [itemCode, setItemCode] = useState()

    const [ProductPrice, setProductPrice] = useState("0")
    const [ProductDiscount, setProductDiscount] = useState("0")

    // const [cart, setCart] = useState([])





    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getProducts()

        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation])

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
                // console.log(JSON.stringify(response.data.data));
                dispatch(setLoader(false))
                setProducts(response.data.data)

            })
            .catch((error) => {
                dispatch(setLoader(false))
                console.log(error);

            });
    }


    const subtraction = (mode) => {
        if (mode == "plus") {

            setTotal(total + 1)


        } else {
            if (total == 1) {

            } else {
                setTotal(total - 1)



            }
        }
    }

    const AddItems = async () => {

        if (cart?.length > 0) {



            let data = new FormData();
            data.append('CustName', '');
            data.append('trans_type', '03215');
            data.append('person_id', 'karachi abcdd');
            data.append('ord_date', Date.now());
            data.append('payments', '');
            data.append('location', '');
            data.append('dimension', '');
            data.append('price_list', '');
            data.append('comments', '');
            data.append('tax_included', '');
            data.append('salesman', '');
            data.append('total', '');
            data.append('total_disc', '');
            data.append('ship_via', '');
            data.append('freight_cost', '');
            data.append('purch_order_details', '');

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://e.de2solutions.com/mobile/post_service_purch_sale.php',
                headers: {
                    ...data.getHeaders()
                },
                data: data
            };

            axios.request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                })
                .catch((error) => {
                    console.log(error);
                });

        } else {
            Toast.show({
                type: 'error',
                text1: "Nothing in the cart"
            })
        }

    }


    const addToCart = () => {
        if (!selectProduct) {
            Toast.show({
                type: 'error',
                text1: 'Please Select a Product'
            })
        } else if (!ProductPrice) {
            Toast.show({
                type: 'error',
                text1: 'Please enter a Product Price'
            })
        } else if (!itemCode) {
            Toast.show({
                type: 'error',
                text1: 'Please enter a Product Price'
            })
        } else {


            // Create a new item object

            const isExist = cart?.some(item => item.item_code === itemCode);

            console.log("is exist?", isExist);

            if (isExist == true) {
                Toast.show({
                    type: 'error',
                    text1: 'Item already exists in the cart'
                });
            } else {

                const newItem = {
                    description: selectProduct,
                    unit_price: ProductPrice, // Assuming ProductPrice is a string, convert it to a float
                    quantity_ordered: total,
                    item_code: itemCode,
                    ProductDiscount: ProductDiscount,
                    GrandTotal: ProductPrice * total - ProductDiscount
                };


                console.log(newItem)
                // Use the spread operator to create a new array with the existing cart items and the new item
                const newCart = [...cart, newItem];

                // Update the cart state

                dispatch(setCartData(newCart))


                setSelectProduct()
                setProductDiscount("0")
                setProductPrice("0")
                setItemCode()
                setTotal(1)
            }

        }


    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ flex: 1, backgroundColor: APPCOLORS.BTN_COLOR }}>
                <View style={{ flexDirection: 'row', padding: 20, alignItems: 'center', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => { dispatch(setCartData([])), navigation.goBack() }} >
                        <Ionicons
                            name={'chevron-back'}
                            color={APPCOLORS.WHITE}
                            size={30}
                        />
                    </TouchableOpacity>

                    <View>
                        <TouchableOpacity style={{ height: 30, width: 30, backgroundColor: 'red', position: 'absolute', zIndex: 100, borderRadius: 200, top: 0, right: 0, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: 'white', fontWeight: 'bold', }}>{cart?.length > 0 ? cart?.length : "0"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('ItemList')}>
                            <LinearGradient colors={['#9BC8E2', '#007BC1']} style={{ height: 40, alignSelf: 'center', borderRadius: 20, marginTop: 20, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10, }}>
                                <Text style={{ color: APPCOLORS.WHITE, fontSize: 20, fontWeight: 'bold' }}>Total Items</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                </View>


                <View style={{ flex: 1, backgroundColor: "#9BC8E2", borderTopRightRadius: 20, borderTopLeftRadius: 20, padding: 20 }}>

                    <TouchableOpacity onPress={() => { getProducts(), setProductModal(true) }} style={{ height: 50, flexDirection: 'row', backgroundColor: APPCOLORS.WHITE, alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, borderRadius: 10 }}>
                        <Text style={{ color: APPCOLORS.BLACK }}>Select Product</Text>

                        <Text>{selectProduct}</Text>
                    </TouchableOpacity>

                    <View style={{ height: 50, flexDirection: 'row', backgroundColor: APPCOLORS.WHITE, alignItems: 'center', paddingHorizontal: 20, borderRadius: 10, marginTop: 10, justifyContent: 'space-between' }}>
                        <Text style={{ color: APPCOLORS.BLACK }}>Quantity :</Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
                            <TouchableOpacity onPress={() => subtraction("minus")} style={{ height: 30, width: 30, borderRadius: 10, backgroundColor: APPCOLORS.BTN_COLOR, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 20, color: APPCOLORS.WHITE, }}>-</Text>
                            </TouchableOpacity>

                            <Text style={{ marginRight: 10, marginLeft: 10, color: APPCOLORS.BLACK, fontSize: 20 }}>{total}</Text>

                            <TouchableOpacity onPress={() => subtraction("plus")} style={{ height: 30, width: 30, borderRadius: 10, backgroundColor: APPCOLORS.BTN_COLOR, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 20, color: APPCOLORS.WHITE, }}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ height: 50, flexDirection: 'row', backgroundColor: APPCOLORS.WHITE, alignItems: 'center', paddingHorizontal: 20, borderRadius: 10, marginTop: 10, justifyContent: 'space-between' }}>
                        <Text style={{ color: APPCOLORS.BLACK }}>Price :</Text>

                        <TextInput
                            keyboardType='decimal-pad'

                            style={{ borderBottomWidth: 1, borderColor: APPCOLORS.BLACK, width: '75%', padding: 0, marginBottom: 10, marginLeft: 10 }}
                            value={ProductPrice}
                            onChangeText={(txt) => {
                                setProductPrice(txt)
                            }}
                        />
                    </View>

                    <View style={{ height: 50, flexDirection: 'row', backgroundColor: APPCOLORS.WHITE, alignItems: 'center', paddingHorizontal: 20, borderRadius: 10, marginTop: 10, justifyContent: 'space-between' }}>
                        <Text style={{ color: APPCOLORS.BLACK }}>Discount :</Text>

                        <TextInput
                            keyboardType='decimal-pad'
                            style={{ borderBottomWidth: 1, borderColor: APPCOLORS.BLACK, width: '75%', padding: 0, marginBottom: 10, marginLeft: 10 }}
                            value={ProductDiscount}
                            onChangeText={(txt) => {
                                setProductDiscount(txt)
                            }}
                        />
                    </View>


                    <TouchableOpacity onPress={() => addToCart()} style={{ alignSelf: 'flex-end', }}>
                        <LinearGradient colors={['#9BC8E2', '#007BC1']} style={{ height: 40, borderRadius: 20, marginTop: 20, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10, }}>
                            <Text style={{ color: APPCOLORS.WHITE, fontSize: 20, fontWeight: 'bold' }}>Add Item</Text>
                        </LinearGradient>
                    </TouchableOpacity>


                    <View style={{ backgroundColor: APPCOLORS.CLOSETOWHITE, borderRadius: 10, marginTop: 20, padding: 20 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: APPCOLORS.BLACK, fontSize: 17 }}>Subtotal</Text>
                            <Text style={{ color: APPCOLORS.BLACK, fontSize: 17 }}>Rs {ProductPrice * total}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: APPCOLORS.BLACK, fontSize: 17 }}>Discount</Text>
                            <Text style={{ color: APPCOLORS.BLACK, fontSize: 17 }}>Rs {ProductDiscount}</Text>
                        </View>


                        <View style={{ height: 2, backgroundColor: APPCOLORS.BLACK, marginTop: 30 }} />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                            <Text style={{ color: APPCOLORS.BLACK, fontSize: 17 }}>Grand Total</Text>
                            <Text style={{ color: APPCOLORS.BLACK, fontSize: 17 }}>Rs {ProductPrice * total - ProductDiscount}</Text>
                        </View>

                    </View>



                    <TouchableOpacity onPress={()=> AddItems()} style={{ height: 50, backgroundColor: APPCOLORS.CLOSETOWHITE, marginTop: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: APPCOLORS.BLACK, fontSize: 17 }}>Confirm order</Text>
                    </TouchableOpacity>
                </View>



            </View>

            <Modal isVisible={ProductModal}>
                <View style={{ flex: 1, backgroundColor: 'white', borderRadius: 20, padding: 20 }}>
                    {
                        isLoader == true ?

                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: 'black' }}>Loading Products</Text>
                                <ActivityIndicator size={'large'} color={'black'} />
                            </View>

                            :

                            <View style={{ flex: 1 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                    <Text style={{ color: 'black', fontSize: 20 }}>Select product</Text>

                                    {
                                        selectProduct ?

                                            <TouchableOpacity onPress={() => setProductModal(false)} style={{ paddingHorizontal: 15, backgroundColor: APPCOLORS.BTN_COLOR, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                                                <Text style={{ fontSize: 14, color: 'white' }}>Done</Text>
                                            </TouchableOpacity>

                                            :
                                            null
                                    }
                                </View>

                                <TextInput
                                    placeholder='search'
                                    style={{ borderWidth: 1, borderRadius: 10, paddingHorizontal: 10, marginTop: 10 }}
                                    onChangeText={(txt) => {
                                        setSearch(txt)
                                    }}
                                    value={Search}
                                />


                                <ScrollView>
                                    {
                                        allProducts?.filter((val) => {

                                            const itemNameLowerCase = val.description.toLowerCase();

                                            if (Search == "") {
                                                return val
                                            } else if (itemNameLowerCase?.includes(Search.toLowerCase())) {
                                                return val
                                            }
                                        }).map((item) => {
                                            // console.log("...........", item)
                                            // setProductPrice(item.material_cost)
                                            return (
                                                <TouchableOpacity onPress={() => { setItemCode(item?.stock_id), setSelectProduct(item?.description) }} style={{ padding: 10, borderWidth: 1, marginTop: 10, borderRadius: 10, backgroundColor: item.description == selectProduct ? APPCOLORS.BTN_COLOR : null }}>
                                                    <Text style={{ color: item.description == selectProduct ? 'white' : 'black' }}>{item.description}</Text>

                                                    <Text style={{ color: item.description == selectProduct ? 'white' : 'black' }}>Stock ID : {item.stock_id}</Text>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </ScrollView>

                            </View>
                    }



                </View>
            </Modal>
        </ScrollView>
    )
}

export default AddItems