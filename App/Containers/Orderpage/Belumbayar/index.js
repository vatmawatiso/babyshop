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
    ScrollView
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import NavigatorService from '@NavigatorService'
import { Card } from "react-native-paper";
import NumberFormat from 'react-number-format';
import axios from 'axios';
import { svr } from "../../../Configs/apikey";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Belumbayar = (props) => {

    const [refreshing, setRefreshing] = useState(false);
    const [state, setState] = useState({
        datas: [],
        order: '',
        information: '',
        item: '',
        mb_id: '',
        odr_id: '',
        buttonStts: 'Dibatalkan',
        pesan_nf: 'Pesanan dibatalkan',
        jenis_nf: 'Transaksi',
        status: '0'
    })



    useEffect(() => {
        AsyncStorage.getItem('member').then(response => {
            // console.log('Profil----------->'+ JSON.stringify(response));

            let data = JSON.parse(response);
            // const val = JSON.stringify(data);

            // console.log('Profilefiks----------->' + JSON.stringify(data));

            setState(state => ({
                ...state,
                mb_id: data.mb_id,
                mb_name: data.value.mb_name,
                mb_email: data.value.mb_email,
                mb_phone: data.value.mb_phone,
                mb_type: data.value.mb_type,
                picture: data.value.picture,
                id_retail: data.retail_id,
            }))
            console.log('MB ID ' + JSON.stringify(state.id_retail));
            // console.log('CEK MB_NAME ' + JSON.stringify(state.mb_name));

        }).catch(err => {
            console.log('err', err)
        })

        AsyncStorage.getItem('uid').then(uids => {
            let ids = uids;
            setState(state => ({
                ...state,
                mb_id: ids
            }))
        }).catch(err => {
            console.log('err', err)
        })

        //*Bagian Update
        getOrder()
    }, [])

    const getOrder = () => {
        let mb = props.mbid;
        let content = props.con;
        console.log(svr.url + 'order/trxodr/' + mb + '/' + content + '/' + svr.api);
        axios.get(svr.url + 'order/trxodr/' + mb + '/' + content + '/' + svr.api)
            .then(result => {
                //hendle success
                // if (content == 'Dikemas') {
                //     NavigatorService.navigate('Dikemas')
                // } else if (content == 'Diproses') {
                //     NavigatorService.navigate('SedangDiproses')
                // } else if (content == 'Dikirim') {
                //     NavigatorService.navigate('Dikirim')
                // } else if (content == 'Selesai') {
                //     NavigatorService.navigate('Selesai')
                // } else if (content == 'Dibatalkan') {
                //     NavigatorService.navigate('Dibatalkan')
                // }

                console.log('full ===> ' + JSON.stringify(result.data.data));
                setState(state => ({ ...state, datas: result.data.data }))
                // refresh()

            }).catch(err => {
                alert('Gagal menerima data dari server!' + err)
                setState(state => ({ ...state, loading: false }))

            })
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
        let mb = props.mbid;
        let content = props.con;
        axios.get(svr.url + 'order/getodr/' + mb + '/' + content + '/' + svr.api)
            // axios.get('https://market.pondok-huda.com/dev/react/order/getodr/' + mb + '/' + content)
            .then(result => {
                console.log('full ===> ' + JSON.stringify(result.data.data));
                setState(state => ({ ...state, datas: result.data.data }))

            }).catch(err => {
                alert('Gagal menerima data dari server!' + err)
                setState(state => ({ ...state, loading: false }))

            })
    }


    const Lihatdetail = (data, odr_id) => {
        let odr = data;
        console.log('cek data = ', data);
        console.log('cek odr = ', odr_id);
        AsyncStorage.setItem('setDetail', JSON.stringify(odr))

        NavigatorService.navigate('Orderdetail', {odr_id: odr_id})

    }


    return (
        <View style={styles.container}>
            {/*Bagian Update*/}

            <ScrollView vertical={true} style={{ width: '100%', height: '100%' }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={refresh}
                    />}
            >
                <FlatList style={{ width: '100%', }}
                    data={state.datas}
                    renderItem={({ item, index }) => (
                        <View style={{ marginTop: toDp(15) }}>
                            {/* <View style={styles.information}>
                                <Text style={styles.txtInformation1}>{item.retail_name}</Text>
                                <Text style={{ color: '#6495ED', marginRight: toDp(13), marginBottom: toDp(5) }}>{item.status}</Text>
                            </View> */}
                            {/* <View style={{ borderWidth: toDp(0.5), borderColor: 'grey', bottom: toDp(0), width:335, marginLeft:15 }} /> */}

                            <View style={{ alignItems: 'center', top: toDp(0) }}>
                                <View style={styles.OrderDetail}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Image source={{ uri: item.prd_thumbnail }} style={{ width: 120, height: 120, borderRadius: 8 }} />

                                        {/* <Text style={{ top: toDp(80), right: toDp(60) }}>{item.qty}x</Text> */}

                                        <View style={{ left: toDp(10), }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                                <Pressable style={styles.paynow} onPress={() => NavigatorService.navigate('Infopembayaran', { data: item, from: 'Orderpage' })}>
                                                    <Text style={styles.txtButtonPay}>Bayar Sekarang</Text>
                                                </Pressable>
                                            </View>
                                            <Text style={{ top: toDp(0), fontWeight: 'bold', fontSize: toDp(13), width: toDp(180) }}>{item.odd_prd_name}</Text>
                                            <Text style={{ top: toDp(10), fontWeight: 'bold', fontSize: toDp(13), width: toDp(180) }}>Total : {item.qtyall} Produk</Text>
                                            <NumberFormat
                                                value={item.Total}
                                                displayType={'text'}
                                                thousandSeparator={'.'}
                                                decimalSeparator={','}
                                                prefix={'Rp '}
                                                renderText={formattedValue => <Text style={{ top: toDp(10), color: '#F83308', fontWeight: '800', }}>{formattedValue}</Text>} // <--- Don't forget this!
                                            />
                                        </View>
                                    </View>


                                    <View style={{ borderWidth: toDp(0.5), borderColor: 'grey', top: toDp(5) }} />

                                    <Pressable style={{ top: toDp(5) }} onPress={() => Lihatdetail(item, item.odr_id)}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: toDp(5) }}>
                                            <Text style={{ fontWeight: 'bold', fontSize: toDp(13), width: toDp(100) }}>Total : {item.qtyall} Produk</Text>
                                            <NumberFormat
                                                value={item.Total}
                                                displayType={'text'}
                                                thousandSeparator={'.'}
                                                decimalSeparator={','}
                                                prefix={'Rp. '}
                                                renderText={formattedValue => <Text style={{ color: '#F83308', fontWeight: '800', left: toDp(40) }}>{formattedValue}</Text>} // <--- Don't forget this!
                                            />
                                            <Image source={allLogo.iclineblack} style={{ width: toDp(10), height: toDp(12), top: toDp(5), right: toDp(0) }} />
                                        </View>
                                    </Pressable>

                                    <View style={{ borderWidth: toDp(0.5), borderColor: '#E5E5E5', top: toDp(5) }} />


                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: toDp(5), top: toDp(10) }}>
                                        <View>
                                            <Text style={{ fontSize: toDp(18), fontWeight: 'bold' }}>Bayar sebelum :</Text>
                                            <Text style={{ fontSize: toDp(12), }}>{item.Expired}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginTop: toDp(10), justifyContent: 'space-between' }}>

                                            <Pressable style={styles.buttonPay} onPress={() => ubahStatus(item.odr_mb_id, item.id, item.retail_id, item.retail_name, item.total_bayar, item.odr_status, item.subtotal)}>
                                                <Text style={styles.txtButtonPay}>Batalkan</Text>
                                            </Pressable>
                                        </View>
                                    </View>

                                </View>


                            </View>
                        </View>
                    )}
                    ListFooterComponent={() => <View style={{ height: toDp(120) }} />}
                />


            </ScrollView>
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
        backgroundColor: '#FF0C0C',
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
        marginBottom: toDp(5),
        marginRight: toDp(57)
    },
    invoice: {
        backgroundColor: '#1C9846',
        borderRadius: toDp(5),
        width: toDp(60),
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

export default Belumbayar;
