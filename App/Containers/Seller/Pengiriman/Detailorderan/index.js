import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    StatusBar,
    ImageBackground,
    Pressable,
    FlatList,
    AsyncStorage,
    Dimensions,
    TouchableOpacity
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import Order from '@Order'
import { Card } from "react-native-paper";
import NumberFormat from 'react-number-format';
import axios from 'axios';
import { svr } from "../../../../Configs/apikey";

const Detailorderan = (props) => {

    const [state, setState] = useState({
        datas: [],
        odr_id: '',
        retail_id: '',
        retail_name: '',
        total_bayar: '',
        qtyall: '',
        prd_name: '',
        price: '',
        odr_expired: '',
        odr_status: '',
        thumbnail: '',
        status: '',
        shipping: '',
        adr_name: '',
        address: '',
        adr_hp: '',
        payment: '',
        ongkir: '',
    })

    useEffect(() => {
        let dataOdr = props.navigation.state.params.data;
        console.log('dataOdr = ', dataOdr)
        setState(state => ({
            ...state,
            allqty: dataOdr.qtyall,
            rtl_id: dataOdr.retail_id,
            rtl_name: dataOdr.retail_name,
            totalsub: dataOdr.subtotal,
            totalall: dataOdr.total_bayar,
            produk: dataOdr.items[0].prd_name,
            qty: dataOdr.items[0].qty,
            foto: dataOdr.items[0].thumbnail,
            total: dataOdr.items[0].price
        }))
        console.log('kondisi lain = ', state.produk)

        getOdt()
    }, [])

    const getOdt = () => {
        let odrid = props.navigation.state.params.odr_id;
        console.log('odrid ', odrid);
        // axios.get('https://market.pondok-huda.com/dev/react/order/odt/' + odrid)
        axios.get(svr.url + 'order/odt/' + odrid + '/' + svr.api)
            .then(result => {

                let data = result.data.data;
                console.log('ODt ===> ' + JSON.stringify(data));
                setState(state => ({
                    ...state,
                    status: data[0]?.status,
                    shipping: data[0]?.shipping,
                    adr_name: data[0]?.adr_name,
                    address: data[0]?.address,
                    adr_hp: data[0]?.adr_hp,
                    payment: data[0]?.payment,
                    ongkir: data[0]?.ongkir

                }))
                console.log('shipp ', state.status)

            }).catch(err => {
                alert('Gagal menerima data dari server!' + err)
                setState(state => ({ ...state, loading: false }))

            })
    }

    return (
        <View style={styles.container}>
            <Order
                title={'Detail Order'}
                onPress={() => props.navigation.goBack()}
            />

            {/* BAGIAN PRODUK */}
            <View style={{ paddingLeft: toDp(10), paddingTop: toDp(20) }}>
                <Text style={{ marginBottom: toDp(10), fontSize: toDp(14), fontWeight: '800' }}>Detail Produk</Text>

                <View style={styles.bodyy}>
                    <Text>{state.rtl_name}</Text>
                    <View style={{ flexDirection: 'row', paddingTop: toDp(5) }}>
                        <Image source={{ uri: state.foto }} style={styles.imgProduk} />
                        <View style={{ paddingLeft: toDp(10), marginTop: toDp(5) }}>
                            <Text style={{ width: toDp(200) }}>{state.produk}</Text>
                            <Text style={{ fontWeight: '800', top: toDp(15) }}>Total : {state.allqty} Produk</Text>
                            <NumberFormat
                                value={state.totalall}
                                displayType={'text'}
                                thousandSeparator={'.'}
                                decimalSeparator={','}
                                prefix={'Rp. '}
                                renderText={formattedValue => <Text style={{ paddingTop: toDp(15), color: '#f83308', fontWeight: '800' }}>{formattedValue}</Text>} // <--- Don't forget this!
                            />
                        </View>
                    </View>
                </View>
            </View>

            {/* BAGIAN INFO PENGIRIMAN */}
            <View style={{ paddingLeft: toDp(10), paddingTop: toDp(20) }}>
                <Text style={{ marginBottom: toDp(10), fontSize: toDp(14), fontWeight: '800' }}>Info Pengiriman</Text>
                <View style={styles.bodyPengiriman}>
                    <View>
                        <Text style={{ marginBottom: toDp(5) }}>Nama</Text>
                        <Text style={{ marginBottom: toDp(5) }}>Jasa Pengiriman</Text>
                        <Text style={{ marginBottom: toDp(5) }}>Status</Text>
                        <Text style={{ marginBottom: toDp(5) }}>Telepon</Text>
                        <Text style={{ marginBottom: toDp(5) }}>Alamat</Text>
                    </View>
                    <View style={{ paddingRight: toDp(80) }}>
                        <Text style={{ marginBottom: toDp(5) }}>        : {state.adr_name}</Text>
                        <Text style={{ marginBottom: toDp(5) }}>        : {state.shipping}</Text>
                        <Text style={{ marginBottom: toDp(5) }}>        : {state.status}</Text>
                        <Text style={{ marginBottom: toDp(5) }}>        : {state.adr_hp}</Text>
                        <Text style={{ marginBottom: toDp(5) }}>        : {state.address}</Text>
                    </View>
                </View>
            </View>

            {/* BAGIAN RINCIAN PEMBAYARAN */}
            <View style={{ paddingLeft: toDp(10), paddingTop: toDp(20) }}>
                <Text style={{ marginBottom: toDp(10), fontSize: toDp(14), fontWeight: '800' }}>Rincian Pembayaran</Text>
                <View style={styles.bodyRincian}>
                    <View>
                        <Text>Metode Pembayaran</Text>
                        <Text style={{ paddingTop: toDp(15) }}>Sub Total Produk</Text>
                        <Text style={{ paddingTop: toDp(15) }}>Ongkos Kirim</Text>
                        <Text style={{ paddingTop: toDp(15), fontWeight: '800' }}>Total Pembayaran</Text>
                    </View>
                    <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <Text>{state.payment}</Text>
                        <NumberFormat
                            value={state.totalsub}
                            displayType={'text'}
                            thousandSeparator={'.'}
                            decimalSeparator={','}
                            prefix={'Rp. '}
                            renderText={formattedValue => <Text style={{ paddingTop: toDp(15), color: '#f83308' }}>{formattedValue}</Text>} // <--- Don't forget this!
                        />
                        <NumberFormat
                            value={state.ongkir}
                            displayType={'text'}
                            thousandSeparator={'.'}
                            decimalSeparator={','}
                            prefix={'Rp. '}
                            renderText={formattedValue => <Text style={{ paddingTop: toDp(15), color: '#f83308' }}>{formattedValue}</Text>} // <--- Don't forget this!
                        />
                        <NumberFormat
                            value={state.totalall}
                            displayType={'text'}
                            thousandSeparator={'.'}
                            decimalSeparator={','}
                            prefix={'Rp. '}
                            renderText={formattedValue => <Text style={{ paddingTop: toDp(15), color: '#f83308', fontWeight: '800' }}>{formattedValue}</Text>} // <--- Don't forget this!
                        />
                    </View>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    bodyy: {
        backgroundColor: '#FFF',
        width: toDp(340),
        borderRadius: toDp(10),
        padding: toDp(10),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 2,
    },
    imgProduk: {
        height: toDp(80),
        width: toDp(80),
        marginTop: toDp(5),
    },
    bodyPengiriman: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
        width: toDp(340),
        borderRadius: toDp(10),
        padding: toDp(10),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 2,
    },
    bodyRincian: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
        width: toDp(340),
        borderRadius: toDp(10),
        padding: toDp(10),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 2,
    },
});

export default Detailorderan;
