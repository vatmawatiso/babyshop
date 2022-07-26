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
        AsyncStorage.getItem('setDetail').then(response => {
            //console.log('Profilseller=======>'+ JSON.stringify(responponse));

            let data = JSON.parse(response);
            //const val = JSON.stringify(data);

            console.log('setDetail ==> ' + JSON.stringify(data));

            setState(state => ({
                ...state,
                odr_id: data.id,
                retail_id: data.retail_id,
                retail_name: data.retail_name,
                total_bayar: data.total_bayar,
                subtotal: data.subtotal,
                qtyall: data.qtyall,
                prd_name: data.items[0]?.prd_name,
                price: data.items[0]?.price,
                odr_expired: data.items[0]?.odr_expired,
                odr_status: data.items[0]?.odr_status,
                thumbnail: data.items[0]?.thumbnail
            }))

            // console.log('ODR ID ' + JSON.stringify(state.odr_id));
            // console.log('retail ID ' + JSON.stringify(state.retail_id));
            // console.log('retail name ' + JSON.stringify(state.retail_name));
            // console.log('total bayar ' + JSON.stringify(state.total_bayar));
            // console.log('qty all ' + JSON.stringify(state.qtyall));
            // console.log('prd name ' + JSON.stringify(state.prd_name));
            // console.log('price ' + JSON.stringify(state.price));
            // console.log('expired ' + JSON.stringify(state.odr_expired));
            // console.log('status ' + JSON.stringify(state.odr_status));
            // console.log('thumbnail ' + JSON.stringify(state.thumbnail));

        }).catch(err => {
            console.log('err', err)
        })

        getOdt()
    }, [])

    const getOdt = () => {
        let odrid = props.navigation.state.params.odr_id;
        console.log('odrid ', odrid);
        axios.get('https://market.pondok-huda.com/dev/react/order/odt/' + odrid)
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

    const displayName = (payment) => {
        let count = '';
        let nama = '';
        count = payment.split(' ' || '-');
        nama = count.slice(0, 2,).join(' ');
        return nama
      }

    return (
        <View style={styles.container}>
            <Order
                title={'Pesanan Sayaaa'}
                onPress={() => props.navigation.goBack()}
            />

            {/* BAGIAN PRODUK */}
            <ScrollView>
                <View style={styles.body}>
                    <Text style={{ fontWeight: 'bold', fontSize: toDp(13), marginHorizontal: toDp(20), bottom: toDp(5) }}>{state.status}</Text>

                    <View style={styles.OrderDetail}>
                        <Text style={styles.txtOrder}>{state.retail_name}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', top: toDp(10) }}>
                            <Image source={{ uri: state.thumbnail }} style={{ width: toDp(120), height: toDp(120) }} />
                            <Text style={{ top: toDp(10), left: toDp(10), fontSize: toDp(13), width: toDp(170) }}>{state.prd_name}</Text>
                            <Text style={{ top: toDp(80), right: toDp(10) }}>x{state.qtyall}</Text>
                        </View>
                        <NumberFormat
                            value={state.price}
                            displayType={'text'}
                            thousandSeparator={'.'}
                            decimalSeparator={','}
                            prefix={'Rp. '}
                            renderText={formattedValue => <Text style={{ bottom: toDp(50), left: toDp(128), color: '#f83308' }}>{formattedValue}</Text>} // <--- Don't forget this!
                        />
                        <View style={{ borderWidth: toDp(0.5), borderColor: 'grey', bottom: toDp(25), width: toDp(314), right:toDp(10)}} />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', bottom: toDp(20), margin: toDp(5) }}>
                            <Text style={styles.txtCard}>{state.qtyall} Produk</Text>
                            {/* <Text style={styles.txtCard}>{DATA[0].total}</Text> */}
                            <NumberFormat
                                value={state.total_bayar}
                                displayType={'text'}
                                thousandSeparator={'.'}
                                decimalSeparator={','}
                                prefix={'Rp. '}
                                renderText={formattedValue => <Text style={{ color: '#f83308' }}>{formattedValue}</Text>} // <--- Don't forget this!
                            />
                        </View>
                    </View>

                </View>

                {/* BAGIAN ALAMAT PENGIRIMAN */}

                <View>
                    <Text style={{ fontWeight: 'bold', fontSize: toDp(13), marginHorizontal: toDp(20), }}>Info Pengiriman</Text>
                    <View style={styles.viewPengiriman}>
                        <View>
                            <Text style={{ padding: toDp(2) }}>Kurir</Text>
                            <Text style={{ padding: toDp(2) }}>No Resi</Text>
                            <Text style={{ padding: toDp(2) }}>Alamat</Text>
                            <Text style={{ padding: toDp(2) }}></Text>
                            <Text style={{ padding: toDp(2) }}></Text>
                        </View>
                        <View style={{ marginRight: toDp(50) }}>
                            <Text style={{ padding: toDp(2) }}>: {state.shipping}</Text>
                            <Text style={{ padding: toDp(2) }}>: -</Text>
                            <Text style={{ padding: toDp(2) }}>: {state.adr_name}</Text>
                            <Text style={{ padding: toDp(2) }}>  {state.adr_hp}</Text>
                            <Text style={{ padding: toDp(2) }}>  {state.address}</Text>
                        </View>
                    </View>

                </View>


                {/* BAGIAN DETAIL HARGA */}

                <View>
                    <Text style={{ fontWeight: 'bold', fontSize: toDp(13), marginHorizontal: toDp(20) }}>Rincian Pembayaran</Text>
                    <View style={styles.viewPembayaran}>
                        <View>
                            <Text style={{ padding: toDp(5) }}>Metode Pembayaran</Text>
                            <Text style={{ padding: toDp(5) }}>Sub Total Produk</Text>
                            <Text style={{ padding: toDp(5) }}>Ongkos Kirim</Text>
                            <Text></Text>
                            <Text style={{ padding: toDp(5), bottom:toDp(5), fontWeight: 'bold', color: '#f83308' }}>Total Pembayaran</Text>
                        </View>
                        <View style={{ marginLeft: toDp(50) }}>
                            <Text style={{ padding: toDp(5) }}>{displayName(state.payment)}</Text>
                            <NumberFormat
                                value={state.price * state.qtyall}
                                displayType={'text'}
                                thousandSeparator={'.'}
                                decimalSeparator={','}
                                prefix={'Rp. '}
                                renderText={formattedValue => <Text style={{ color: '#f83308', padding: toDp(5) }}>{formattedValue}</Text>} // <--- Don't forget this!
                            />
                            <NumberFormat
                                value={state.ongkir}
                                displayType={'text'}
                                thousandSeparator={'.'}
                                decimalSeparator={','}
                                prefix={'Rp. '}
                                renderText={formattedValue => <Text style={{ color: '#f83308', padding: toDp(5) }}>{formattedValue}</Text>} // <--- Don't forget this!
                            />
                            <View style={{ borderWidth: toDp(0.5), borderColor: 'grey', right: toDp(208), width: toDp(314), marginTop: toDp(5) }} />
                            <NumberFormat
                                value={state.total_bayar}
                                displayType={'text'}
                                thousandSeparator={'.'}
                                decimalSeparator={','}
                                prefix={'Rp. '}
                                renderText={formattedValue => <Text style={{ color: '#f83308', fontWeight: 'bold', padding: toDp(5), top:toDp(6) }}>{formattedValue}</Text>} // <--- Don't forget this!
                            />
                        </View>

                    </View>

                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    viewPembayaran: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: toDp(25),
        margin: toDp(5),
        paddingHorizontal: toDp(20),
        paddingTop: toDp(10),
        backgroundColor: '#F8F9F9',
        width: toDp(314),
        height: toDp(150),
        borderRadius: toDp(10),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    viewPengiriman: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: toDp(25),
        margin: toDp(5),
        paddingHorizontal: toDp(20),
        paddingTop: toDp(10),
        backgroundColor: '#F8F9F9',
        width: toDp(314),
        height: toDp(150),
        borderRadius: toDp(10),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    body: {
        backgroundColor: '#fff', 
        height: toDp(220), 
        top: toDp(15)
    },
    flatcontent: {
        width: '100%',
        alignItems: 'center',
        // justifyContent: 'center',
        marginTop: toDp(-20)
    },
    contentContainer: {
        paddingVertical: toDp(0),
    },
    contentContainer1: {
        paddingVertical: toDp(30),
    },
    content: {
        flexDirection: 'row',
    },
    txtOrder: {
        margin: toDp(7),
        bottom: toDp(40),
    },
    information: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: toDp(10),
        bottom: toDp(50),
    },
    txtOrder: {
        fontWeight: 'bold',
        fontSize: toDp(12),
        left: toDp(8),
        top: toDp(8)
    },
    OrderDetail: {
        backgroundColor: '#F9F8F8',
        padding: toDp(10),
        borderRadius: toDp(10),
        width: toDp(314),
        height: toDp(180),
        left: toDp(23),
        bottom: toDp(0),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    buttonPay: {
        backgroundColor: '#2A334B',
        borderRadius: toDp(15),
        width: toDp(97),
        height: toDp(34),
        fontSize: toDp(11),
        justifyContent: 'center',
        bottom: toDp(8),
    },
    txtButtonPay: {
        color: 'white',
        fontSize: toDp(12),
        textAlign: 'center'
    },
    ShippingInfo: {
        backgroundColor: '#F9F8F8',
        borderRadius: toDp(10),
        width: toDp(314),
        height: toDp(165),
        left: toDp(23),
        justifyContent: 'space-between',
        paddingLeft: toDp(10),
        bottom: toDp(20),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    PaymentDetails: {
        backgroundColor: '#F9F8F8',
        borderRadius: toDp(10),
        bottom: toDp(100),
        width: toDp(314),
        height: toDp(195),
        left: toDp(23),
        justifyContent: 'space-between',
        paddingLeft: toDp(10),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
});

export default Detailorderan;
