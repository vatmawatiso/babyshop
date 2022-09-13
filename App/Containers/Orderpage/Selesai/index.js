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
                alert('Gagal menerima data dari server!' + err)
                setState(state => ({ ...state, loading: false }))
            })
    }

    //FUNGSI NAVIGATE KE HALAMAN DETAIL ORDER
    const Lihatdetail = (data, id) => {
        let odr = data;
        AsyncStorage.setItem('Invoice', JSON.stringify(odr))

        NavigatorService.navigate('Invoice', { odr_id: id })

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
                            <Text style={{ color: '#6495ED', marginRight: toDp(15), marginBottom: toDp(5) }}>{item.items[0]?.odr_status}</Text>
                        </View>

                        <View style={{ alignItems: 'center', top: toDp(10) }}>
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

                                {/* <View style={{ borderWidth: toDp(0.5), borderColor: 'grey', bottom: toDp(20) }} /> */}

                                {/* <Pressable style={{ bottom: toDp(18) }} onPress={() => Lihatdetail(item, item.id)}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: toDp(5) }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: toDp(13), width: toDp(100) }}>Total : {item.items[0]?.qty} Produk</Text>
                                        <NumberFormat
                                            value={item.total_bayar}
                                            displayType={'text'}
                                            thousandSeparator={'.'}
                                            decimalSeparator={','}
                                            prefix={'Rp. '}
                                            renderText={formattedValue => <Text style={{ color: '#F83308', fontWeight: '800', left: toDp(40) }}>{formattedValue}</Text>} // <--- Don't forget this!
                                        /> */}
                                {/* <Text style={{ left: toDp(65) }}>{DATA[0].total}</Text> */}
                                {/* <Image source={allLogo.iclineblack} style={{ width: toDp(10), height: toDp(12), top: toDp(5), right: toDp(0) }} /> */}
                                {/* </View> */}
                                {/* </Pressable> */}
                                <View style={{ borderWidth: toDp(0.5), borderColor: 'grey', top: toDp(5) }} />

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: toDp(5), top: toDp(10) }}>
                                    <View>
                                        <Text style={{ fontSize: toDp(18), fontWeight: 'bold' }}>Bayar sebelum :</Text>
                                        <Text style={{ fontSize: toDp(12), }}>{item.items[0]?.odr_expired}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: toDp(10), justifyContent: 'space-between' }}>
                                        <Pressable style={styles.buttonPay} onPress={() => NavigatorService.navigate('Pembayaran')}>
                                            <Text style={styles.txtButtonPay}>Nilai</Text>
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

export default Selesai;
