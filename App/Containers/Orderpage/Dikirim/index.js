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

const Dikirim = (props) => {

    const [refreshing, setRefreshing] = useState(false);
    const [state, setState] = useState({
        datas: [],
        order: '',
        information: '',
        item: '',
        mb_id: '',
        odr_id: '',
        buttonStts: 'Selesai',
        pesan_nf: 'Pesanan sudah diterima',
        jenis_nf: 'Transaksi',
        status: '0'

    })

    useEffect(() => {

        AsyncStorage.getItem('member').then(response => {
            //console.log('Profilseller=======>'+ JSON.stringify(responponse));

            let data = JSON.parse(response);
            //const val = JSON.stringify(data);

            console.log('Homeseller ==> ' + JSON.stringify(data));

            setState(state => ({
                ...state,
                mb_id: data.value.mb_id,
                mb_name: data.value.mb_name,
                mb_email: data.value.mb_email,
                mb_phone: data.value.mb_phone,
                mb_type: data.value.mb_type,
                picture: data.value.picture,
                retail_id: data.retail_id,
            }))
            console.log('MB ID ' + JSON.stringify(state.mb_id));
        }).catch(err => {
            console.log('err', err)
        })

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
                refresh()

            }).catch(err => {
                alert('Gagal menerima data dari server!' + err)
                setState(state => ({ ...state, loading: false }))
            })
    }


    //ALERT KONFIRMASI TERIMA PESANAN
    const konfirmPesanan = (mb_id, item) =>
        // console.log('cek item = '+ JSON.stringify (item));
        Alert.alert(
            "Konfirmasi pesanan anda!",
            "Pesanan anda sudah sampai?",
            [
                // {
                //   text: "Ask me later",
                //   onPress: () => console.log("Ask me later pressed")
                // },
                {
                    text: "Belum sampai!",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Sudah diterima!", onPress: () => ubahStatus(mb_id, item.id, item.retail_id, item.retail_name, item.total_bayar, item.items[0].odr_status, item.subtotal, item.qtyall) }
            ]
        );

    //POST STATUS ORDER
    const ubahStatus = async (mb_id, id, retail_id, retail_name, total_bayar, odr_status, subtotal, qtyall) => {
        const body = {
            odr_status: state.buttonStts,
            pesan_nf: state.pesan_nf,
            id_tujuan: mb_id,
            jenis_nf: state.jenis_nf,
            asal_nf: retail_id,
            status: state.status
        }
        console.log('cek body post status order = ', JSON.stringify(body));

        setState(state => ({ ...state, loading: true }))
        let id_odr = id;
        console.log('cekkkk = ', id_odr)
        axios.post(svr.url + 'order/' + id_odr + '/' + svr.api, body)
            .then(response => {
                console.log('Response = ' + JSON.stringify(response.data));
                const STATUS = {
                    odr_id: id,
                    retail_id: retail_id,
                    retail_name: retail_name,
                    total_bayar: total_bayar,
                    odr_status: odr_status, //belum dapet
                    subtotal: subtotal,
                    qtyall: qtyall
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
                    postSaldo(retail_id, id)
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


    //POST SALDO KONFRIMASI TERIMA PESANAN
    const postSaldo = async (retail_id, id) => {
        // let id_odr = id;
        console.log('cek rtl id = ', retail_id);
        console.log('cek id = ', id);
        const body = {
            rs_odr_id: id,
            rtl_id: retail_id
        }
        console.log('cek body saldo = ', JSON.stringify(body));

        setState(state => ({ ...state, loading: true }))
        // https://market.pondok-huda.com/publish/react/transaksi/Q4Z96LIFSXUJBK9U6ZACCB2CJDQAR0XH4R6O6ARVG
        axios.post(svr.url + 'transaksi/' + svr.api, body)
            .then(response => {
                console.log('Response = ' + JSON.stringify(response.data));
                const SALDO = {
                    rs_odr_id: response.data.rs_odr_id,
                    rtl_id: retail_id,
                }
                if (response.data.status == 201) {
                    alert('Berhasil tambah saldo!')

                    if (Object.keys(SALDO).length === 0) {
                        alert('Terjadi kesalahan!')
                    } else {
                        // save Async storage
                        console.log('LOG SALDO ===> ' + JSON.stringify(SALDO));
                        AsyncStorage.setItem('setSaldo', JSON.stringify(SALDO))

                    }

                    console.log('HASIL = ', response.data);
                    setState(state => ({ ...state, loading: false }))
                } else {
                    alert('Gagal tambah saldo!')
                    console.log('HASIL = ', response.data.status);
                    setState(state => ({ ...state, loading: false }))
                }

            }).catch(err => {
                alert('Gagal menerima data dari server!')
                setState(state => ({ ...state, loading: false }))
                console.log(' tec erorr = ' + JSON.stringify(response.data))
            })
    }

    //FUNGSI NAVIGATE KE HALAMAN DETAIL ORDER
    const Lihatdetail = (data, id) => {
        let odr = data;
        AsyncStorage.setItem('Invoice', JSON.stringify(odr))

        NavigatorService.navigate('Invoice', { odr_id: id })

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


    return (
        <View style={styles.container}>
            {/*Bagian Update*/}
            <FlatList style={{ width: '100%', }}
                data={state.datas}
                renderItem={({ item, index }) => (
                    <View style={{ marginTop: toDp(15) }}>
                        {/* <View style={styles.information}>
                                <Text style={styles.txtInformation1}>{item.retail_name}</Text>
                                <Text style={{ color: '#6495ED', marginRight: toDp(16), marginBottom: toDp(5) }}>{item.items[0]?.odr_status}</Text>
                            </View> */}

                        <View style={{ alignItems: 'center', top: toDp(0) }}>
                            <View style={styles.OrderDetail}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Image source={{ uri: item.items[0]?.thumbnail }} style={{ width: 120, height: 120 }} />

                                    <View style={{ left: toDp(10), }}>
                                        <Pressable style={styles.invoice} onPress={() => Lihatdetail(item, item.id)}>
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

                                {/* <View style={{ borderWidth: toDp(0.5), borderColor: 'grey', bottom: toDp(20) }} />

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
                                        <Image source={allLogo.iclineblack} style={{ width: toDp(10), height: toDp(12), top: toDp(5), right: toDp(0) }} />
                                    </View>
                                </Pressable> */}
                                <View style={{ borderWidth: toDp(0.5), borderColor: 'grey', top: toDp(5) }} />
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: toDp(5), top:toDp(10) }}>
                                    <View>
                                        <Text style={{ fontSize: toDp(18), fontWeight: 'bold' }}>Bayar sebelum :</Text>
                                        <Text style={{ fontSize: toDp(12), }}>{item.items[0]?.odr_expired}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: toDp(10), justifyContent: 'space-between' }}>
                                        <Pressable style={styles.buttonPay} onPress={() => konfirmPesanan(state.mb_id, item)}>
                                            <Text style={styles.txtButtonPay}>Pesanan Diterima</Text>
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

export default Dikirim;
