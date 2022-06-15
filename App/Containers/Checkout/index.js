import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    TextInput,

    Pressable,
    ScrollView,
    AsyncStorage,
    TouchableOpacity
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import Header from '@Header'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import NavigatorService from '@NavigatorService'
import axios from 'axios';

const Checkout = (props) => {

    const DATA = [
        {
            id: '2938492',
            tb: 'Jaya Abadi Bandung',
            diproses: 'Dikemas',
            produk: 'Gerobak Pasir',
            harga: 'Rp 500.000',
            jumlah: '2',
            total: 'Rp 800.0000',
            bataswaktu: '13 Januari 2022',
            diterima: '15-18 januari 2022',
            metodePembayaran: 'Bank Mandiri',
            konfirmasi: 'Dibatalkan Pembeli',
            image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
        },
    ]

    const Address = [
        {
            id: '1',
            nama: 'Vatmawati',
            telepon: '083141520987',
            alamat: 'Jl KiSulaiman Kota Cirebon Jawa Barat '
        },
    ]

    const [stAlu, setAllu] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    const [state, setState] = useState({
        datas: [],
        alu_name: '',
        alu_id: '',
        alu_city: '',
        alu_adress: '',
        alu_phone: '',
        alu_desk: '',
        alu_stats: false,
        loading: false,
        modalVisible: false,
        option: {
            width: 750,
            height: 750,
            cropping: true,
        }
    })


    useEffect(() => {

        AsyncStorage.getItem('member').then(response => {
            // console.log('Profil----------->'+ JSON.stringify(response));

            let data = JSON.parse(response);
            // const val = JSON.stringify(data);

            console.log('Profilefiks----------->' + JSON.stringify(data));

            setState(state => ({
                ...state,
                mb_id: data.mb_id,
                mb_name: data.value.mb_name,
                mb_email: data.value.mb_email,
                mb_phone: data.value.mb_phone,
                mb_type: data.value.mb_type,
                picture: data.value.picture,
                retail_id: data.value.rtl_id,
            }))

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

        getAlumember()

        props.navigation.addListener(
            'didFocus',
            payload => {
                loatAlamatU()
                // getRetail()  // untuk reload data terbaru retail
            }
        );

    }, [stAlu])


    const getAlumember = () => {
        AsyncStorage.getItem('uid').then(uids => {
            let idember = uids;
            axios.get('https://market.pondok-huda.com/dev/react/addres/?alus=' + idember)
                .then(result => {
                    let oid = result.data;
                    console.log('oid = ' + oid.data.length);

                    if (oid.data.length > 0) {
                        const ALAMAT = {
                            id: oid.data[0]?.adr_id,
                            name: oid.data[0]?.adr_name,
                            phone: oid.data[0]?.adr_hp,
                            address: oid.data[0]?.adr_address,
                            city: oid.data[0]?.cty_name
                        }
                        console.log('length--------> ' + JSON.stringify(oid.data[0].adr_id));
                        AsyncStorage.setItem('setAlamat', JSON.stringify(ALAMAT))
                        setAllu(1)
                        //loatAlamatU()
                    } else {
                        console.log('null--------> ' + oid.data.length);
                        setState(state => ({
                            ...state,
                            alu_desk: 'Atur alamat dulu',
                            alu_stats: true
                        }))
                    }
                }).catch(error => {
                    console.log(error)
                })
        }).catch(err => {
            console.log('err', err)
        })
    }

    const loatAlamatU = async () => {
        try {

            AsyncStorage.getItem('setAlamat').then(response => {
                let data = JSON.parse(response);
                console.log('---data--->' + data);
                setState(state => ({
                    ...state,
                    alu_id: data?.id,
                    alu_city: data?.city,
                    alu_phone: data?.phone,
                    alu_name: data?.name,
                    alu_adress: data?.address,
                }))
                if (data == null) {
                    setState(state => ({
                        ...state,
                        alu_stats: true
                    }))
                } else {
                    setState(state => ({
                        ...state,
                        alu_stats: false
                    }))
                }
            }).catch(err => {
                console.log('err', err)
            })
        } catch (e) {
            console.log('e', e)
        }
    }

    useEffect(() => {
        getJasa()

    }, [])

    // const countries = ["Jakarta", "Cirebon", "Bandung", "Kuningan"]

    const getJasa = () => {
        // setState(state => ({...state, loading: true }))
        axios.get('https://market.pondok-huda.com/dev/react/shipping/')
            .then(result => {
                // handle success
                setState(state => ({ ...state, datas: result.data.data }))
                console.log('----JASA=====>' + JSON.stringify(result.data.data));
                // alert(JSON.stringify(result.data));

            }).catch(err => {
                //console.log(err)
                alert('Gagal menerima data dari server!' + err)
                setState(state => ({ ...state, loading: false }))
            })
    }

    return (
        <View style={styles.container}>
            <Header
                title={'Checkout'}
                onPress={() => props.navigation.goBack()}
            />
            <ScrollView>
                <View style={{ flex: 1 }}>
                    <View>
                        <View style={{ marginBottom: toDp(40), top: toDp(10) }}>
                            <Pressable style={styles.btnAlamat} onPress={() => NavigatorService.navigate('Alamat', { adr_mb_id: state.mb_id })}>
                                <View style={{ flexDirection: 'row', }}>
                                    <Image source={allLogo.location} style={styles.iclocation} />
                                    <Text style={styles.txtAlamat}>Alamat Pengiriman</Text>
                                </View>
                                <View style={{ flexDirection: 'row', bottom: toDp(10) }}>
                                    <View style={styles.isiAddress}>
                                        {state.alu_stats == true &&
                                            <>
                                                <Text style={styles.txtAddress}>{state.alu_desk}</Text>

                                            </>
                                        }
                                        <Text style={styles.txtAddress}>{state.alu_name} {state.alu_phone}{"\n"}{state.alu_adress} {state.alu_city}</Text>

                                    </View>
                                    <View>
                                        <Image source={allLogo.iclineblack} style={styles.icaddress} />
                                    </View>
                                </View>
                            </Pressable>
                        </View>

                        <View>
                            <Text style={styles.txtTB}>Jaya Abadi Bandung</Text>

                            <View style={styles.OrderDetail}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Image source={allLogo.icgerobak} style={{ marginLeft: toDp(10) }} />
                                    <Text style={{ top: toDp(20), right: toDp(40), fontSize: toDp(12) }}>{DATA[0].produk}</Text>
                                    <Text style={{ top: toDp(80), right: toDp(10), fontSize: toDp(12) }}>{DATA[0].jumlah}x</Text>
                                </View>
                                <Text style={{ bottom: toDp(60), left: toDp(150), fontSize: toDp(12) }}>{DATA[0].harga}</Text>
                            </View>
                        </View>

                        <View>
                            <View style={styles.Shipping}>
                                <Text style={styles.txtOption}>Opsi Pengiriman</Text>
                                <View style={{ borderWidth: toDp(0.5), borderColor: 'grey' }} />
                                <Pressable onPress={() => alert('Coba Ajalah')}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Image source={allLogo.icvoucher} style={styles.icvoucher} />
                                        <Text style={styles.voucher}>Klaim Voucher</Text>
                                        <Image source={allLogo.iclineblack} style={styles.iclineblack} />
                                    </View>
                                </Pressable>
                                {/* <View style={{ borderWidth: toDp(0.5), borderColor: 'grey' }} /> */}
                                <Pressable onPress={() => NavigatorService.navigate('Jasakirim')}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <SelectDropdown
                                            buttonStyle={styles.dropdown}
                                            buttonTextStyle={{ fontSize: toDp(12), color: 'grey' }}
                                            rowTextStyle={{ fontSize: toDp(12) }}
                                            dropdownStyle={{ borderRadius: toDp(7) }}
                                            rowStyle={{ height: toDp(30), padding: toDp(5) }}
                                            defaultButtonText={'Pilih Jasa Pengiriman'}
                                            data={state.datas}
                                            onSelect={(selectedItem, index) => {
                                                console.log(selectedItem.shp_id, index)
                                                setState(state => ({ ...state, shp_name: selectedItem.shp_id }))
                                            }}
                                            buttonTextAfterSelection={(selectedItem, index) => {

                                                return selectedItem.shp_name;
                                            }}
                                            rowTextForSelection={(item, index) => {
                                                return item.shp_name;
                                            }}
                                            renderDropdownIcon={(isOpened) => {
                                                return (
                                                    <FontAwesome
                                                        name={isOpened ? "chevron-up" : "chevron-down"}
                                                        color={"#444"}
                                                        size={12}
                                                    />
                                                );
                                            }}
                                        />
                                    </View>
                                </Pressable>
                                <Text style={styles.estimasi}>Akan DIterima Pada {DATA[0].diterima}</Text>
                            </View>
                        </View>

                        <View>
                            <View style={styles.bodyPayment}>
                                <Pressable onPress={() => NavigatorService.navigate('Pembayaran')}>
                                    <View style={styles.payment}>
                                        <Text style={styles.txtPayment}>Metode Pembayaran</Text>
                                        <Text style={styles.txtTransfer}>Transfer Bank</Text>
                                        <Image source={allLogo.iclineblack} style={styles.iclineblack2} />
                                    </View>
                                </Pressable>
                                <View style={{ borderWidth: toDp(0.5), borderColor: 'grey' }} />

                                <View style={{ flexDirection: 'row', margin: toDp(4), justifyContent: 'space-between' }}>
                                    <Text style={styles.txtSubTot}>Subtotal Untuk Produk</Text>
                                    <Text style={styles.txtSubTot}>Rp 700.000</Text>
                                </View>
                                <View style={{ flexDirection: 'row', margin: toDp(4), justifyContent: 'space-between' }}>
                                    <Text style={styles.txtSubPeng}>Subtotal Pengiriman</Text>
                                    <Text style={styles.txtSubPeng}>Rp 50.000</Text>
                                </View>
                                <View style={{ flexDirection: 'row', margin: toDp(4), justifyContent: 'space-between' }}>
                                    <Text style={styles.txtBiayaPen}>Biaya Penanganan</Text>
                                    <Text style={styles.txtBiayaPen}>Rp 50.000</Text>
                                </View>
                                <View style={{ flexDirection: 'row', margin: toDp(4), justifyContent: 'space-between' }}>
                                    <Text style={styles.txtTotPem}>Total Pembayaran</Text>
                                    <Text style={styles.txtTotPem1}>Rp 800.000</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{ marginTop: toDp(30), bottom: 10, position: 'relative' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: toDp(335), height: toDp(40), }}>
                            <View style={{ flexDirection: 'column', width: toDp(140), height: toDp(40), backgroundColor: '#2A334B', borderRadius: toDp(10) }}>
                                <Text style={{ textAlign: 'center', color: 'white', }}>Total Pembayaran</Text>
                                <Text style={{ textAlign: 'center', color: 'white', }}>{DATA[0].total}</Text>
                            </View>
                            <Pressable style={{ backgroundColor: '#2A334B', borderRadius: toDp(10), width: toDp(120), height: toDp(40) }} onPress={() => NavigatorService.navigate('Successorder')}>
                                <Text style={{ textAlign: 'center', top: toDp(10), color: 'white' }}>Buat Pesanan</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        // backgroundColor: 'red',
        flex: 1
    },
    dropdown: {
        height: toDp(25),
        borderRadius: toDp(10),
        width: toDp(320),
        top: toDp(4),
        backgroundColor: '#f9f8f8',
        borderWidth: toDp(0.5)
    },
    Address: {
        top: toDp(15),
        flexDirection: 'row',
        backgroundColor: '#f9f8f8',
    },
    isiAddress: {
        top: toDp(5),
        marginLeft: toDp(50),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,

        elevation: 1,
    },
    btnAlamat: {
        bottom: toDp(0),
        backgroundColor: '#f8f9f9',
        width: toDp(335),
        height: toDp(105),
        borderRadius: toDp(10),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 2,
    },
    icaddress1: {
        marginLeft: toDp(10),
        top: toDp(10),
    },
    txtAddress: {
        top: toDp(15),
        fontSize: toDp(12)
    },
    txtAlamat: {
        top: toDp(20),
        fontSize: toDp(12),
        marginLeft: toDp(15)
    },
    iclocation: {
        width: toDp(35),
        height: toDp(35),
        left: toDp(10),
        top: toDp(5)
    },
    icaddress: {
        width: toDp(12),
        height: toDp(12),
        top: toDp(25),
        marginLeft: toDp(60)
    },
    txtTB: {
        fontWeight: 'bold',
        bottom: toDp(20)
    },
    OrderDetail: {
        backgroundColor: '#f9f8f8',
        borderRadius: toDp(10),
        width: toDp(335),
        height: toDp(110),
        bottom: toDp(15),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    Shipping: {
        padding: toDp(10),
        backgroundColor: '#f9f8f8',
        borderRadius: toDp(10),
        width: toDp(335),
        height: toDp(110),
        bottom: toDp(5),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    txtOption: {
        color: '#6495ED',
        margin: toDp(4),
        marginLeft: toDp(10),
        fontSize: toDp(12),
    },
    delivery: {
        fontWeight: 'bold',
        fontSize: toDp(12),
        margin: toDp(4)
    },
    estimasi: {
        fontSize: toDp(12),
        margin: toDp(6),
        marginLeft: toDp(55)
    },
    icvoucher: {
        margin: toDp(4),
        marginLeft: toDp(10),
        width: toDp(22),
        height: toDp(12)
    },
    voucher: {
        fontSize: toDp(12),
        margin: toDp(2),
        left: toDp(90)
    },
    iclineblack: {
        width: toDp(10),
        height: toDp(10),
        margin: toDp(4),
        top: toDp(2)
    },
    iclineblack1: {
        width: toDp(10),
        height: toDp(10),
        margin: toDp(4),
        bottom: toDp(45),
        left: toDp(317)
    },
    price: {
        margin: toDp(4),
        right: toDp(53),
        fontSize: toDp(12),
    },
    payment: {
        backgroundColor: '#f9f8f8',
        width: toDp(316),
        height: toDp(105),
        borderRadius: toDp(20),
        top: toDp(10)
    },
    bodyPayment: {
        padding: toDp(10),
        backgroundColor: '#f9f8f8',
        top: toDp(5),
        borderRadius: toDp(10),
        width: toDp(335),
        height: toDp(145),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    payment: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    txtPayment: {
        margin: toDp(4),
        marginLeft: toDp(10),
        fontSize: toDp(12)
    },
    txtTransfer: {
        margin: toDp(4),
        fontSize: toDp(12),
        left: toDp(50)
    },
    iclineblack2: {
        width: toDp(10),
        height: toDp(10),
        top: toDp(5),
        margin: toDp(4)
    },
    txtSubTot: {
        fontSize: toDp(12),
        marginLeft: toDp(6),
    },
    txtSubPeng: {
        fontSize: toDp(12),
        marginLeft: toDp(6),
    },
    txtBiayaPen: {
        fontSize: toDp(12),
        marginLeft: toDp(6),
    },
    txtTotPem: {
        fontSize: toDp(13),
        fontWeight: 'bold',
        marginLeft: toDp(6),
    },
    txtTotPem1: {
        fontSize: toDp(13),
        color: '#6495ED',
        fontWeight: 'bold'
    },
    btnCheckout: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',

    },
});

export default Checkout;