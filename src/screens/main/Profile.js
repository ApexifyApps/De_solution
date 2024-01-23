import { View, Text, TouchableOpacity, Image, TextInput, FlatList } from 'react-native'
import React from 'react'
import APPCOLORS from '../../utils/APPCOLORS'
import Ionicons from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Octicons from 'react-native-vector-icons/Octicons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { useDispatch } from 'react-redux'
import { setLogout } from '../../redux/AuthSlice'
import { useSelector } from 'react-redux'

const Profile = ({ navigation }) => {

    const dispatch = useDispatch()
    const data = useSelector(state => state.Data.currentData)

    console.log(data)

    return (
        <View style={{ flex: 1, backgroundColor: APPCOLORS.BTN_COLOR, justifyContent: 'space-between' }}>
            
            <View style={{ backgroundColor: APPCOLORS.BTN_COLOR, height: 90, borderBottomEndRadius: 20, borderBottomLeftRadius: 20, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 20 }}>

                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Ionicons
                        name={'chevron-back'}
                        color={APPCOLORS.WHITE}
                        size={30}
                    />
                </TouchableOpacity>

                <View style={{ height: 40, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
                    <Text style={{ color: APPCOLORS.WHITE, fontSize: 22, fontWeight: 'bold' }}>Profile</Text>
                </View>

                <View style={{ width: 20 }} />
            </View>


            <View style={{ flex: 1, backgroundColor: APPCOLORS.WHITE, borderTopRightRadius: 20, borderTopLeftRadius: 20, padding: 20, justifyContent: 'space-between' }}>


                <View>
                <Image source={require('../../assets/Rider.png')} style={{ height: 200, width: 200, alignSelf: 'center' }} resizeMode='contain' />
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', }}>
                        <Ionicons
                            name={'person'}
                            color={APPCOLORS.BLACK}
                            size={30}
                        />
                        <Text style={{ color: APPCOLORS.BLACK, fontSize: 20, marginLeft: 10 }}>{data?.real_name}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 10 }}>
                        <Entypo
                            name={'mail'}
                            color={APPCOLORS.BLACK}
                            size={30}
                        />
                        <Text style={{ color: APPCOLORS.BLACK, fontSize: 20, marginLeft: 10 }}>{data?.email}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 10 }}>
                        <Entypo
                            name={'phone'}
                            color={APPCOLORS.BLACK}
                            size={30}
                        />
                        <Text style={{ color: APPCOLORS.BLACK, fontSize: 20, marginLeft: 10 }}>{data?.phone}</Text>
                    </View>
                </View>


                <View style={{}}>



                    <TouchableOpacity onPress={() => dispatch(setLogout())} style={{ height: 50, backgroundColor: 'red', marginTop: 20, alignItems: 'center', justifyContent: 'center', marginTop: 20, borderRadius: 10 }}>
                        <Text style={{ color: APPCOLORS.WHITE, fontSize: 20 }}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Profile