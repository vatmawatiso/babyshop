import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Alert,
    Pressable,
    FlatList,
    AsyncStorage,
    TouchableOpacity,
    Dimensions,
    RefreshControl,
    ScrollView,
    ToastAndroid
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import NavigatorService from '@NavigatorService'
import { Card } from "react-native-paper";
import NumberFormat from 'react-number-format';
import axios from 'axios';
import { svr } from "../../../Configs/apikey";
import { sub } from "react-native-reanimated";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Selesai = (props) => {

    // const [refreshing, setRefreshing] = useState(false);
    const [state, setState] = useState({
        datas: [],
        order: '',
        information: '',
        item: '',
        mb_id: '',
        odr_id: '',
    })

    useEffect(() => {
        //*Bagian Update
        getOrder()
    }, [])

    const getOrder = () => {
        let mb = props.mbid;
        let content = props.con;
        axios.get(svr.url + 'order/getodr/' + mb + '/' + content + '/' + svr.api)
            // axios.get('https://market.pondok-huda.com/dev/react/order/getodr/' + mb + '/' + content)
            .then(result => {
                //hendle success
                console.log('full ===> ' + JSON.stringify(result.data.data));
                setState(state => ({ ...state, datas: result.data.data }))
                // refresh()

            }).catch(err => {
                // alert('Gagal menerima data dari server!' + err)
                ToastAndroid.show("Gagal menerima data dari server!" + err, ToastAndroid.SHORT)
                setState(state => ({ ...state, loading: false }))
            })
    }

    //FUNGSI NAVIGATE KE HALAMAN DETAIL ORDER
    const lihatInvoice = (data, id) => {
        let odr = data;
        AsyncStorage.setItem('Invoice', JSON.stringify(odr))

        NavigatorService.navigate('Invoice', { odr_id: id })

    }

    const Lihatdetail = (data, id) => {
        let odr = data;
        console.log('cek data = ', data);
        console.log('cek data = ', id);
        AsyncStorage.setItem('setDetail', JSON.stringify(odr))

        NavigatorService.navigate('Orderdetail', { odr_id: id, data: data })

    }

    const Komen = (id, retail_id, retail_name, prd_name, thumbnail, subtotal, qtyall, prd_id) => {
        console.log('cek props = ', prd_name)
        console.log('cek props = ', thumbnail)
        console.log('cek props = ', subtotal)
        console.log('cek props = ', prd_id)
        NavigatorService.navigate('Nilaiorder', { id: id, retail_id: retail_id, retail_name: retail_name, prd_name: prd_name, thumbnail: thumbnail, subtotal: subtotal, qtyall: qtyall, prd_id: prd_id })
    }


    return (
        <View style={styles.container}>
            {/*Bagian Update*/}

            <FlatList style={{ width: '100%', }}
                data={state.datas}
                renderItem={({ item, index }) => (
                    <View style={{ marginTop: toDp(15) }}>

                        <View style={{ alignItems: 'center', top: toDp(0) }}>
                            <View style={styles.OrderDetail}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Image source={{ uri: item.items[0]?.thumbnail }} style={{ width: 120, height: 120 }} />

                                    <View style={{ left: toDp(10), }}>
                                        <Pressable style={styles.invoice} onPress={() => lihatInvoice(item, item.id)}>
                                            <Text style={styles.txtButtonPay}>Invoice</Text>
                                        </Pressable>
                                        <Text style={{ top: toDp(0), fontWeight: 'bold', fontSize: toDp(13), width: toDp(180) }}>{item.items[0]?.prd_name}</Text>
                                        <Text style={{ top: toDp(10), fontWeight: 'bold', fontSize: toDp(13), width: toDp(180) }}>Total : {item.qtyall} Produk</Text>
                                        <NumberFormat
                                            value={item.items[0]?.price}
                                            displayType={'text'}
                                            thousandSeparator={'.'}
                                            decimalSeparator={','}
                                            prefix={'Rp. '}
                                            renderText={formattedValue => <Text style={{ top: toDp(10), color: '#F83308', fontWeight: '800', }}>{formattedValue}</Text>} // <--- Don't forget this!
                                        />
                                    </View>

                                </View>

                                <View style={{ borderWidth: toDp(0.5), borderColor: 'grey', top: toDp(5) }} />

                                <Pressable style={{ top: toDp(5) }} onPress={() => Lihatdetail(item, item.id)}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: toDp(5) }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: toDp(13), width: toDp(100) }}>Total : {item.items[0]?.qty} Produk</Text>
                                        <NumberFormat
                                            value={item.total_bayar}
                                            displayType={'text'}
                                            thousandSeparator={'.'}
                                            decimalSeparator={','}
                                            prefix={'Rp. '}
                                            renderText={formattedValue => <Text style={{ color: '#F83308', fontWeight: '800', left: toDp(40) }}>{formattedValue}</Text>} // <--- Don't forget this!
                                        />
                                        <Image source={allLogo.iclineblack} style={{ width: toDp(10), height: toDp(12), top: toDp(5), right: toDp(0) }} />
                                    </View>
                                </Pressable>

                                <View style={{ borderWidth: toDp(0.5), borderColor: 'grey', top: toDp(5) }} />

                                <View style={{ justifyContent: 'space-between', alignItems: 'flex-end', margin: toDp(5), top: toDp(10) }}>
                                    <View style={{ flexDirection: 'row', marginTop: toDp(10), justifyContent: 'space-between' }}>
                                        <Pressable style={styles.buttonPay} onPress={() => Komen(item.id, item.retail_id, item.retail_name, item.items[0]?.prd_name, item.items[0]?.thumbnail, item.subtotal, item.qtyall, item.items[0]?.prd_id)}>
                                            {/* <Text style={styles.txtButtonPay}>Nilai</Text> */}
                                            {item.id != '' ?
                                                <>
                                                    <Text style={styles.txtButtonPay}>Nilai</Text>
                                                </>
                                                :
                                                <>
                                                    <Text style={styles.txtButtonPay}>Lihat Ulasan</Text>
                                                </>
                                            }
                                        </Pressable>
                                    </View>
                                </View>
                            </View>


                        </View>
                    </View>
                )}
                ListFooterComponent={() => <View style={{ height: toDp(120) }} />}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: toDp(0),
        width: width,
    },
    invoice: {
        backgroundColor: '#1C9846',
        borderRadius: toDp(5),
        width: toDp(70),
        height: toDp(30),
        fontSize: toDp(18),
        justifyContent: 'center',
        marginBottom: toDp(5)
    },
    content: {
        flexDirection: 'row',
    },
    flatcontent: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtOrder: {
        margin: toDp(7),
        bottom: toDp(40),
    },
    information: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        bottom: toDp(0),
        alignItems: 'center',
    },
    txtInformation1: {
        fontWeight: 'bold',
        marginBottom: toDp(5),
        marginLeft: toDp(15)
    },
    OrderDetail: {
        // backgroundColor: '#F9F8F8',

        backgroundColor: '#FFF',
        padding: toDp(15),
        borderRadius: toDp(10),
        width: width - 20,
        shadowColor: "#B8B8B8",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.0,
        shadowRadius: 0,

        elevation: 15,
    },
    buttonPay: {
        backgroundColor: '#2A334B',
        borderRadius: toDp(8),
        width: toDp(120),
        height: toDp(48),
        fontSize: toDp(18),
        justifyContent: 'center',
        bottom: toDp(8),
    },
    paynow: {
        backgroundColor: '#2A334B',
        borderRadius: toDp(5),
        width: toDp(120),
        height: toDp(30),
        fontSize: toDp(18),
        justifyContent: 'center',
        marginBottom: toDp(5)
    },
    txtButtonPay: {
        color: 'white',
        fontSize: toDp(13),
        textAlign: 'center'
    }
});

export default Selesai;
