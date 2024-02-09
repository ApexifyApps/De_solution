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
import { setCartData, setLoader, setGrandCartTotalPrice, setAllProducts } from '../../redux/AuthSlice'
import { addEventListener } from "@react-native-community/netinfo";
import { fetch } from "@react-native-community/netinfo";

const AddItems = ({ navigation, route }) => {

    const { data } = route.params

    const [internetConnected, setInternetConnected] = useState(false)



    fetch().then(state => {
        console.log("Connection type", state.type);
        console.log("Is connected?", state.isConnected);
        setInternetConnected(state.isConnected)
    });

    // Subscribe
    useEffect(() => {

        const unsubscribe = addEventListener(async (state) => {
            console.log("Connection type", state.type);

            if(internetConnected == false){
                const getallproducts = await AsyncStorage.getItem('AllProducts')   
                dispatch(setAllProducts(JSON.parse(getallproducts)))
            }
        });
        // Unsubscribe
        unsubscribe();
    }, [])




    const isLoader = useSelector(state => state.Data.Loading)
    const cart = useSelector(state => state.Data.cartData)
    const CurrentUser = useSelector(state => state.Data.currentData)
    const GrandCartTotalPrice = useSelector(state => state.Data.GrandCartTotalPrice)
    const AllProducts = useSelector(state => state.Data.AllProduct)

    // console.log("GrandCartTotalPrice", GrandCartTotalPrice)

    const [allProducts, setProducts] = useState()

    const [ProductModal, setProductModal] = useState(false)

    const [Search, setSearch] = useState("")

    const [selectProduct, setSelectProduct] = useState()

    const [total, setTotal] = useState(1)

    const [itemCode, setItemCode] = useState()

    const [ProductPrice, setProductPrice] = useState("0")

    const [ProductDiscount, setProductDiscount] = useState("0")


    const dispatch = useDispatch()

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


    const getSavedData = async () => {
        const savedData = await AsyncStorage.getItem(`${data?.debtor_no}`)
        const getTotalSaved = await AsyncStorage.getItem(`${data?.debtor_no}_GrandTotal`)


        const parseData = JSON.parse(savedData)
        const parseTotalSaved = JSON.parse(getTotalSaved)



        if (parseData) {


            dispatch(setLoader(true))



            let datas = new FormData();
            datas.append('CustName', data?.name);
            datas.append('trans_type', "30");
            datas.append('person_id', data?.debtor_no);
            datas.append('ord_date', Date.now());
            datas.append('payments', '1');
            datas.append('location', 'DEF');
            datas.append('dimension', '0');
            datas.append('price_list', '');
            datas.append('comments', '');
            datas.append('tax_included', '');
            datas.append('salesman', CurrentUser?.id);
            datas.append('total', parseTotalSaved);
            datas.append('total_disc', '');
            datas.append('ship_via', '');
            datas.append('freight_cost', '');
            datas.append('purch_order_details', JSON.stringify(parseData));

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://e.de2solutions.com/mobile/post_service_purch_sale.php',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: datas
            };

            axios.request(config)
                .then(async (response) => {

                    await AsyncStorage.removeItem(`${data?.debtor_no}`)
                    await AsyncStorage.removeItem(`${data?.debtor_no}_GrandTotal`)

                    Toast.show({
                        type: 'success',
                        text1: "Order Successfully Created"
                    })
                    dispatch(setLoader(false))

                })
                .catch((error) => {
                    console.log(error);
                    dispatch(setLoader(false))
                });


        } else {
            Toast.show({
                type: 'success',
                text1: "No Order Saved"
            })
        }


    }

    const AddItemss = async () => {

        dispatch(setLoader(true))

        if (cart?.length > 0) {

            let datas = new FormData();
            datas.append('CustName', data?.name);
            datas.append('trans_type', "30");
            datas.append('person_id', data?.debtor_no);
            datas.append('ord_date', Date.now());
            datas.append('payments', '1');
            datas.append('location', 'DEF');
            datas.append('dimension', '0');
            datas.append('price_list', '');
            datas.append('comments', '');
            datas.append('tax_included', '');
            datas.append('salesman', CurrentUser?.id);
            datas.append('total', GrandCartTotalPrice);
            datas.append('total_disc', '');
            datas.append('ship_via', '');
            datas.append('freight_cost', '');
            datas.append('purch_order_details', JSON.stringify(cart));

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://e.de2solutions.com/mobile/post_service_purch_sale.php',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: datas
            };

            axios.request(config)
                .then(async (response) => {
                    console.log(JSON.stringify(response.data));
                    dispatch(setLoader(false))
                    dispatch(setCartData([]))
                    Toast.show({
                        type: 'success',
                        text1: "Successfully created"
                    })
                    await AsyncStorage.removeItem(`${data?.debtor_no}`)
                })
                .catch((error) => {
                    console.log(error);
                    dispatch(setLoader(false))
                });

        } else {
            Toast.show({
                type: 'error',
                text1: "Nothing in the cart"
            })
            dispatch(setLoader(false))
        }

    }


    const addToCart = async () => {
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
                dispatch(setGrandCartTotalPrice(GrandCartTotalPrice + ProductPrice * total - ProductDiscount))

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

                console.log("first", console.log("newCart", newCart, data?.debtor_no))

                if (internetConnected == false) {

                    await AsyncStorage.setItem(`${data?.debtor_no}`, JSON.stringify(newCart))

                    await AsyncStorage.setItem(`${data?.debtor_no}_GrandTotal`, JSON.stringify(GrandCartTotalPrice + ProductPrice * total - ProductDiscount))
                }




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
                <View style={{ flexDirection: 'row', padding: 20, alignItems: 'center', justifyContent: 'space-between', }}>
                    <TouchableOpacity onPress={() => { dispatch(setCartData([])), navigation.goBack(), dispatch(setGrandCartTotalPrice("0")) }} >
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
                        <TouchableOpacity onPress={() => navigation.navigate('ItemList', { data: data })}>
                            <LinearGradient colors={['#9BC8E2', '#007BC1']} style={{ height: 40, alignSelf: 'center', borderRadius: 20, marginTop: 20, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10, }}>
                                <Text style={{ color: APPCOLORS.WHITE, fontSize: 20, fontWeight: 'bold' }}>Total Items</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                </View>


                <View style={{ flex: 1, backgroundColor: "#9BC8E2", borderTopRightRadius: 20, borderTopLeftRadius: 20, padding: 20 }}>

                    <TouchableOpacity onPress={() => { setProductModal(true) }} style={{ height: 50, flexDirection: 'row', backgroundColor: APPCOLORS.WHITE, alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, borderRadius: 10 }}>
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
                            <Text style={{ color: APPCOLORS.BLACK, fontSize: 17 }}>Rs {GrandCartTotalPrice}</Text>
                        </View>

                    </View>



                    <TouchableOpacity onPress={() => AddItemss()} style={{ height: 50, backgroundColor: APPCOLORS.CLOSETOWHITE, marginTop: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                        {
                            isLoader ?
                                <ActivityIndicator size={'large'} color={'black'} />
                                :

                                <Text style={{ color: APPCOLORS.BLACK, fontSize: 17 }}>Confirm order</Text>
                        }
                    </TouchableOpacity>


                    <TouchableOpacity onPress={()=> getSavedData()}>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 15, alignSelf: 'center', marginTop: 10 }}>Sync Offline</Text>
                    </TouchableOpacity>
                </View>



            </View>

            <Modal isVisible={ProductModal}>
                <View style={{ flex: 1, backgroundColor: 'white', borderRadius: 20, padding: 20 }}>
                    {

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
                                    AllProducts?.filter((val) => {

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