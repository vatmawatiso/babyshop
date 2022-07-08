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
    TouchableOpacity
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import NavigatorService from '@NavigatorService'
import { Card } from "react-native-paper";
import NumberFormat from 'react-number-format';
import axios from 'axios';

const Belumbayar = (props) => {

    const DATA = [
        {
            id: '2',
            tb: 'Jaya Abadi Bandung',
            diproses: 'Belum Bayar',
            produk: 'Gerobak Pasir',
            harga: '500000',
            jumlah: '2',
            total: '800000',
            bataswaktu: '13 Januari 2022',
            metodePembayaran: 'Bank Mandiri',
            konfirmasi: 'Dibatalkan Pembeli',
            image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
        },
    ]

    const [state, setState] = useState({
        datas: [],
        mb_id:'',
        namatoko:''
    })

    useEffect(() => {
        
        AsyncStorage.getItem('setOrder').then(response => {
            let total = JSON.parse(response);
            console.log('CEK ORDER ' + JSON.stringify(total));
            // setState(state => ({
            //     ...state,
            //     namatoko: total.data[0].price,

            // }))
            // console.log('kuyyy hasil ' + JSON.stringify(state.totalll));
        })

        AsyncStorage.getItem('uid').then(uids => {
            let ids = uids;
            setState(state => ({
                ...state,
                mb_id: ids
            }))
            console.log('ids---->' + JSON.stringify(state.mb_id));
        }).catch(err => {
            console.log('err', err)
        })


        getOrder()
    }, [])
    

    const getOrder = () => {
        axios.get('https://market.pondok-huda.com/dev/react/order/'+ state.mb_id)
            .then(result => {
                //hendle success
                setState(state => ({ ...state, datas: result.data.data }))
                console.log('orderan ===> ' + JSON.stringify(result.data.data));

            }).catch(err => {
                alert('Gagal menerima data dari server!' + err)
                setState(state => ({ ...state, loading: false }))
            })
    }

    const ListOrder = (item, index) => (
        <View style={{ marginTop: toDp(10) }}>
            <View style={styles.information}>
                <Text style={styles.txtInformation1}>{item.namatoko}</Text>
                <Text style={{ color: '#6495ED' }}>{DATA[0].diproses}</Text>
            </View>
            <View style={{ borderWidth: toDp(0.5), borderColor: 'grey', bottom: toDp(0) }} />

            <View style={{ alignItems: 'center', top: 10 }}>
                <View style={styles.OrderDetail}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Image source={allLogo.icgerobak} style={styles.icAddress} />
                        <Text style={{ top: toDp(20), right: toDp(30), fontWeight: 'bold', fontSize: toDp(16) }}>{DATA[0].produk}</Text>
                        <Text style={{ top: toDp(80), right: toDp(10) }}>{DATA[0].jumlah}x</Text>
                    </View>
                    <NumberFormat
                        value={DATA[0].harga}
                        displayType={'text'}
                        thousandSeparator={'.'}
                        decimalSeparator={','}
                        prefix={'Rp. '}
                        renderText={formattedValue => <Text style={{ bottom: toDp(50), left: toDp(128) }}>{formattedValue}</Text>} // <--- Don't forget this!
                    />
                    <View style={{ borderWidth: toDp(0.5), borderColor: 'grey', bottom: toDp(20) }} />

                    <Pressable style={{ bottom: toDp(18) }} onPress={() => NavigatorService.navigate('Orderdetail')}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: toDp(5) }}>
                            <Text style={styles.txtCard}>{DATA[0].jumlah} Produk</Text>
                            <NumberFormat
                                value={DATA[0].total}
                                displayType={'text'}
                                thousandSeparator={'.'}
                                decimalSeparator={','}
                                prefix={'Rp. '}
                                renderText={formattedValue => <Text style={{ color: '#F83308', fontWeight: '800', left: toDp(65) }}>{formattedValue}</Text>} // <--- Don't forget this!
                            />
                            {/* <Text style={{ left: toDp(65) }}>{DATA[0].total}</Text> */}
                            <Image source={allLogo.iclineblack} style={{ width: toDp(10), height: toDp(12), top: toDp(5), right: toDp(5) }} />
                        </View>
                    </Pressable>
                    <View style={{ borderWidth: toDp(0.5), borderColor: 'grey', bottom: toDp(15) }} />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: toDp(5), bottom: toDp(5) }}>
                        <Text style={{ fontSize: toDp(12), bottom: toDp(8) }}>Bayar sebelum {DATA[0].bataswaktu}{"\n"}dengan {DATA[0].metodePembayaran} (Dicek Otomatis)</Text>
                        <Pressable style={styles.buttonPay} onPress={() => NavigatorService.navigate('Pembayaran')}>
                            <Text style={styles.txtButtonPay}>Bayar Sekarang</Text>
                        </Pressable>
                    </View>
                </View>

            </View>


        </View>
    )

    return (
        <View style={styles.container}>
            <View style={{ height: toDp(280), }}>
                <View style={styles.flatcontent}>
                    <FlatList style={{ width: '100%', }}
                        data={state.datas}
                        renderItem={({ item, index }) => {
                            return (
                                ListOrder(item, index)
                            )
                        }}
                        ListFooterComponent={() => <View style={{ height: toDp(120) }} />}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: toDp(40)
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
        marginBottom: toDp(5)
    },
    OrderDetail: {
        // backgroundColor: '#F9F8F8',
        backgroundColor: 'cyan',
        padding: toDp(10),
        borderRadius: toDp(10),
        width: toDp(335),
        height: toDp(200),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    buttonPay: {
        backgroundColor: '#2A334B',
        borderRadius: toDp(10),
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
    }
});

export default Belumbayar;