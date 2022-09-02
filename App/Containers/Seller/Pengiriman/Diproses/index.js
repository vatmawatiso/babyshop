import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Alert,
    Pressable,
    AsyncStorage,
    Dimensions,
    FlatList,
    RefreshControl,
    ScrollView
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import NavigatorService from '@NavigatorService'
import NumberFormat from 'react-number-format';
import axios from 'axios';
import { svr } from "../../../../Configs/apikey";
import { payment } from "../../../../Configs/payment";


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Diproses = (props) => {

    const [refreshing, setRefreshing] = useState(false);
    const [state, setState] = useState({
        datas: [],
        order: '',
        information: '',
        item: '',
        rtl_id: '',
        odr_id: '',
        buttonStts: 'Dikirim',
        pesan_nf: 'Barang sedang diproses oleh pihak Toko Bangunan',
        jenis_nf: 'Notifikasi status order diproses',
        status: '0'
    })

    useEffect(() => {
        //*Bagian Update
        getOrder()
    }, [])

    const getOrder = () => {
        let rtl = props.retail_id;
        let content = props.con;
        console.log('cek rtl id ' + (rtl));
        console.log('cek content ' + (content));
        axios.get(svr.url + 'order/getrtl/' + rtl + '/' + content + '/' + svr.api)
            // axios.get('https://market.pondok-huda.com/dev/react/order/getrtl/' +rtl+ '/' + content)
            .then(result => {
                //hendle success

                console.log('full ===> ' + JSON.stringify(result.data.data));
                setState(state => ({ ...state, datas: result.data.data }))
                refresh()
            }).catch(err => {
                alert('Gagal menerima data dari server!' + err)
                setState(state => ({ ...state, loading: false }))
            })
    }


    const Lihatdetail = (data, id) => {
        let odr = data;
        AsyncStorage.setItem('setDetail', JSON.stringify(odr))

        NavigatorService.navigate('Detailorderan', { odr_id: id })

    }

    //POST STATUS ORDER
    const ubahStatus = async (odr_mb_id, id, retail_id, retail_name, total_bayar, odr_status, subtotal, qtyall) => {
        const body = {
            odr_status: state.buttonStts,
            pesan_nf: state.pesan_nf,
            id_tujuan: odr_mb_id,
            jenis_nf: state.jenis_nf,
            asal_nf: retail_id,
            status: state.status
        }
        console.log('cek body = ', JSON.stringify(body));

        setState(state => ({ ...state, loading: true }))
        let id_odr = id;
        axios.post(svr.url + 'order/' + id_odr + '/' + svr.api, body)
            .then(response => {
                console.log('Response = ' + JSON.stringify(response.data));
                const STATUS = {
                    odr_id: id,
                    retail_id: retail_id,
                    retail_name: retail_name,
                    total_bayar: total_bayar,
                    odr_status: odr_status,
                    subtotal: subtotal
                }
                if (response.data.status == 200) {
                    alert('Berhasil ubah status order!')
                    refresh()

                    if (Object.keys(STATUS).length === 0) {
                        alert('Status yang dimasukkan salah!')
                    } else {
                        // save Async storage
                        console.log('LOG STATUS ===> ' + JSON.stringify(STATUS));
                        AsyncStorage.setItem('setStatusPro', JSON.stringify(STATUS))

                    }
                    console.log('HASIL = ', response.data);
                    setState(state => ({ ...state, loading: false }))
                } else {
                    alert('Gagal Ubah Status!')
                    console.log('HASIL = ', response.data.status);
                    setState(state => ({ ...state, loading: false }))
                }

            }).catch(err => {
                alert('Gagal menerima data dari server!')
                setState(state => ({ ...state, loading: false }))
                console.log(' tec erorr = ' + JSON.stringify(response.data))
            })
    }


    //FUNGSI REFRESH DATA TERBARU GET ORDER DENGAN MENGOSONGKAN DATA SEBELUMNYA
    const refresh = async () => {
        let rtl = props.retail_id;
        let content = props.con;
        // console.log('cek rtl id ' + (rtl));
        // console.log('cek content ' + (content));
        setState(state => ({ ...state, datas: '' }))
        // https://market.pondok-huda.com/dev/react/order/getrtl/RTL00000001/Dikemas/
        axios.get(svr.url + 'order/getrtl/' + rtl + '/' + content + '/' + svr.api)
            .then(result => {
                console.log('full ===> ' + JSON.stringify(result.data.data));
                setState(state => ({ ...state, datas: result.data.data }))

            }).catch(err => {
                alert('Gagal menerima data dari server!' + err)
                setState(state => ({ ...state, loading: false }))
            })
    }

    return (
        <View style={styles.container}>
            {/*Bagian Update*/}

            {/* <ScrollView vertical={true} style={{ width: '100%', height: '100%' }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={refresh}
                    />}
            > */}
                <FlatList style={{ width: '100%', }}
                    data={state.datas}
                    renderItem={({ item, index }) => (
                        <View style={{ marginTop: toDp(20) }}>
                            <View style={styles.information}>
                                <Text style={styles.txtInformation1}>{item.retail_name}</Text>
                                <Text style={{ color: '#6495ED', marginRight: toDp(16), marginBottom: toDp(5) }}>{item.odr_status}</Text>
                            </View>

                            <View style={{ alignItems: 'center', top: toDp(10) }}>
                                <View style={styles.OrderDetail}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Image source={{ uri: item.items[0]?.thumbnail }} style={{ width: 120, height: 120 }} />
                                        <Text style={{ top: toDp(10), left: toDp(10), fontWeight: 'bold', fontSize: toDp(15), width: toDp(180) }}>{item.items[0]?.prd_name}</Text>
                                        {/* <Text style={{ top: toDp(80), right: toDp(60) }}>{item.items[0]?.qty}x</Text> */}
                                    </View>
                                    <NumberFormat
                                        value={item.items[0]?.price}
                                        displayType={'text'}
                                        thousandSeparator={'.'}
                                        decimalSeparator={','}
                                        prefix={'Rp. '}
                                        renderText={formattedValue => <Text style={{ bottom: toDp(50), left: toDp(128), fontWeight: '800' }}>{formattedValue}</Text>} // <--- Don't forget this!
                                    />
                                    <View style={{ borderWidth: toDp(0.5), borderColor: 'grey', bottom: toDp(20) }} />

                                    <Pressable style={{ bottom: toDp(18) }} onPress={() => Lihatdetail(item, item.id)}>
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
                                            {/* <Text style={{ left: toDp(65) }}>{DATA[0].total}</Text> */}
                                            <Image source={allLogo.iclineblack} style={{ width: toDp(10), height: toDp(12), top: toDp(5), right: toDp(0) }} />
                                        </View>
                                    </Pressable>
                                    <View style={{ borderWidth: toDp(0.5), borderColor: 'grey', bottom: toDp(15) }} />

                                    <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', margin: toDp(5) }}>
                                        <View style={{ marginTop: toDp(10),  }}>
                                            <Pressable style={styles.buttonPay} onPress={() => ubahStatus(item.odr_mb_id, item.id, item.retail_id, item.retail_name, item.total_bayar, item.odr_status, item.subtotal)}>
                                                <Text style={styles.txtButtonPay}>Dikirim</Text>
                                            </Pressable>
                                        </View>

                                    </View>
                                </View>


                            </View>
                        </View>
                    )}
                    ListFooterComponent={() => <View style={{ height: toDp(120) }} />}
                />
            {/* </ScrollView> */}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: toDp(0),
        width: width,
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
        width: width - 30,
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

export default Diproses;