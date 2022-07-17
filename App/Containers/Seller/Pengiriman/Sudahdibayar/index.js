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
    FlatList
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import NavigatorService from '@NavigatorService'
import NumberFormat from 'react-number-format';
import axios from 'axios';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Sudahdibayar = (props) => {

    const DATA = [
        {
            id: '2',
            tb: 'Jaya Abadi Bandung',
            diproses: 'Belum Bayar',
            produk: 'Gerobak Pasir',
            harga: 'Rp 500.000',
            jumlah: '2',
            total: 'Rp 800.0000',
            bataswaktu: '13 Januari 2022',
            metodePembayaran: 'Bank Mandiri',
            konfirmasi: 'Dibatalkan Pembeli',
            image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
        },
    ]

    const [state, setState] = useState({
        datas: [],
        order: '',
        information: '',
        item: '',
        rtl_id: '',
        odr_id: '',

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
        axios.get('https://market.pondok-huda.com/dev/react/order/getrtl/' + rtl + '/' + content)
            .then(result => {
                //hendle success

                // let simpan = result.data.data;


                if (content == 'Dikirim') {
                    NavigatorService.navigate('Sedangdikirim')
                } else if (content == 'Selesai') {
                    NavigatorService.navigate('Selesai')
                } else if (content == 'Dibatalkan') {
                    NavigatorService.navigate('Dibatalkan')
                }


                // setState(state => ({ ...state, loading: false }))

                console.log('full ===> ' + JSON.stringify(result.data.data));
                setState(state => ({ ...state, datas: result.data.data }))
                console.log('cek ===> ' + JSON.stringify(state.datas));
                let dataorder = state.datas;

                if (dataorder == 'null') {
                    alert('Gagal simpan async storage!')
                  } else {
                    AsyncStorage.setItem('setOrderdetail', JSON.stringify(state.datas))

                    console.log('HASIL DETAIL ORDER ==> : ', state.datas)
                  }

                //
                // console.log('ongkir ===> ' + JSON.stringify(result.data.data[0].items[0].price));
                // console.log('data order ===> ' + JSON.stringify(result.data.order));
                // console.log('data informasi ===> ' + JSON.stringify(result.data.information));
                // console.log('data item ===> ' + JSON.stringify(result.data.item));

            }).catch(err => {
                alert('Gagal menerima data dari server!' + err)
                setState(state => ({ ...state, loading: false }))
            })
    }

    
  const selectProduk = () => {
    let rtl = props.retail_id;
    let content = props.con;
    NavigatorService.navigate('Detailorderan', { rtl, content })
    console.log('cekcok ', (rtl));
    console.log('cekcokcok ', (content));
  }

    return (
        <View style={styles.container}>
            {/*Bagian Update*/}
            <FlatList style={{ width: '100%', }}
                data={state.datas}
                renderItem={({ item, index }) => (
                    <View style={{ marginTop: toDp(20) }}>
                        <View style={styles.information}>
                            <Text style={styles.txtInformation1}>{item.retail_name}</Text>
                            <Text style={{ color: '#6495ED' }}>{item.items[0]?.odr_status}</Text>
                        </View>
                        <View style={{ borderWidth: toDp(0.5), borderColor: 'grey', bottom: toDp(0) }} />

                        <View style={{ alignItems: 'center', top: toDp(10) }}>
                            <View style={styles.OrderDetail}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Image source={{ uri: item.items[0]?.thumbnail }} style={{ width: toDp(120), height: toDp(120) }} />
                                    <Text style={{ top: toDp(10), left: toDp(10), fontWeight: 'bold', fontSize: toDp(15), width: toDp(180) }}>{item.items[0]?.prd_name}</Text>
                                    {/* <Text style={{ top: toDp(80), right: toDp(60) }}>{item.items[0]?.qty}x</Text> */}
                                </View>
                                <NumberFormat
                                    value={item.items[0]?.price}
                                    displayType={'text'}
                                    thousandSeparator={'.'}
                                    decimalSeparator={','}
                                    prefix={'Rp. '}
                                    renderText={formattedValue => <Text style={{ bottom: toDp(50), left: toDp(128) }}>{formattedValue}</Text>} // <--- Don't forget this!
                                />
                                <View style={{ borderWidth: toDp(0.5), borderColor: 'grey', bottom: toDp(20) }} />

                                <Pressable style={{ bottom: toDp(18) }} onPress={() => selectProduk()}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: toDp(5) }}>
                                        <Text style={styles.txtCard}>{item.items[0]?.qty} Produk</Text>
                                        <NumberFormat
                                            value={item.items[0]?.qty * item.total_bayar}
                                            displayType={'text'}
                                            thousandSeparator={'.'}
                                            decimalSeparator={','}
                                            prefix={'Rp. '}
                                            renderText={formattedValue => <Text style={{ color: '#F83308', fontWeight: '800', left: toDp(65) }}>{formattedValue}</Text>} // <--- Don't forget this!
                                        />
                                        {/* <Text style={{ left: toDp(65) }}>{DATA[0].total}</Text> */}
                                        <Image source={allLogo.iclineblack} style={{ width: toDp(10), height: toDp(12), top: toDp(5), right: toDp(0) }} />
                                    </View>
                                </Pressable>
                                <View style={{ borderWidth: toDp(0.5), borderColor: 'grey', bottom: toDp(15) }} />

                                <View style={{ alignItems: 'flex-end', margin: toDp(5), bottom: toDp(5) }}>
                                    {/* <Text style={{ fontSize: toDp(12), bottom: toDp(8) }}>Bayar sebelum {item.items[0]?.odr_expired}{"\n"}dengan {DATA[0].metodePembayaran}{"\n"}(Dicek Otomatis)</Text> */}
                                    <Pressable style={styles.buttonPay} onPress={() => NavigatorService.navigate('Pembayaran')}>
                                        <Text style={styles.txtButtonPay}>Bayar Sekarang</Text>
                                    </Pressable>
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
        top: toDp(10),

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

        backgroundColor: '#f3f3f3',
        padding: toDp(15),
        borderRadius: toDp(10),
        width: width - 30,
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

export default Sudahdibayar;