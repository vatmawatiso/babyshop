import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    TextInput,
    BackHandler,
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
import NumberFormat from 'react-number-format';
import { svr } from "../../Configs/apikey";
// import { payment } from "../../Configs/payment";
// import CryptoJS from "crypto-js";
// import fetch from "node-fetch";

const Checkout = (props) => {

    const [selectedItems, setSelectedItems] = useState([]);
    const [stAlu, setAllu] = useState(0);
    const [selected, setSelected] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const [state, setState] = useState({
        datas: [],
        odr_pay_id: 'PYM00001',
        odr_status: 'Belum Dibayar',
        qty: '1',
        alu_name: '',
        alu_id: '',
        alu_city: '',
        alu_adress: '',
        alu_phone: '',
        alu_desk: '',
        arrayUsers: [],
        arrayData: [],
        fotoProduk: [],
        produk: [],
        detail: [],
        thumbnails: '',
        id: '',
        shp_id: '',
        shp_name: '',
        shp_harga: 0,
        shr_jasa: '',
        id_retail: '',
        product_name: '',
        prd_id: '',
        retail: '',
        retail_name: '',
        price: 0,
        totalll: '',
        thumbnail: '',
        Code: '',
        alu_stats: false,
        loading: false,
        modalVisible: false,
        methodeName: 'Pilih Pembayaran',
        adminfee: 0,
        option: {
            width: 750,
            height: 750,
            cropping: true,
        }
    })

    //get PRODUK

    useEffect(() => {
        //getProdukbyId()
        // get id pengguna
        AsyncStorage.getItem('setProduk').then(response => {
            // console.log('CEK PRODUK ----------->' + JSON.stringify(response));

            let data = JSON.parse(response);
            // const val = JSON.stringify(data);

            // console.log('Jadikan Produk----------->' + JSON.stringify(data));

            setState(state => ({
                ...state,
                product_name: data.data[0].product_name,
                thumbnail: data.data[0].thumbnail,
                price: data.data[0].price,
                retail_name: data.data[0].retail_name,
                retail: data.data[0].retail,
                prd_id: data.data[0].id,
                berat: data.data[0].berat

            }))

            // console.log('CEK STATE ASYNC STORAGE nama retail ---->' + JSON.stringify(state.retail_name));
            console.log('nama produk --->' + JSON.stringify(state.product_name));
            console.log('harga produk ---->' + JSON.stringify(state.price));
            // console.log('CEK STATE ASYNC STORAGE thumbnail ---->' + JSON.stringify(state.thumbnail));
            console.log('ID RETAIL ---->' + JSON.stringify(state.retail));
            console.log('ID PRODUK ---->' + JSON.stringify(state.prd_id));
            console.log('BERAT PRODUK ---->' + JSON.stringify(state.berat));


        }).catch(err => {
            console.log('err', err)
        })

        // totalPro()
    }, [])


    //get ALAMAT


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
            }))
            console.log('mb_id ---->' + JSON.stringify(state.mb_id));

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
                paymentMethode()

                // getRetail()  // untuk reload data terbaru retail
            }
        );
        getJasa()
        totalPro()
        // paym()

    }, [stAlu])

    useEffect(() => {
        const backAction = () => {
            Alert.alert('Konfirmasi', 'Batalkan transaksi?', [
                {
                    text: 'Tidak',
                    onPress: () => null,
                    style: "cancel"
                },
                { text: 'Ya Batalkan', onPress: () => BackGo() }
            ]);
            return true;

        };
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, [])

    const paymentMethode = () => {

        AsyncStorage.getItem('paymentMethode').then(response => {
            let data = JSON.parse(response);
            if (data == '' || data == null) {
                setState(state => ({
                    ...state,
                    methodeName: 'Pilih Pembayaran',
                    adminfee: parseInt(0)
                }))
            } else {
                setState(state => ({
                    ...state,
                    methodeName: data.name,
                    adminfee: parseInt(data.fee)
                }))
            }

            console.log('code : ' + data.code + ' | Fee :' + data.fee + ' | methode : ' + data.name);

        }).catch(err => {
            console.log('err', err)
        })

    }

    const backActions = () => {
        Alert.alert('Konfirmasi', 'Batalkan transaksi?', [
            {
                text: 'Tidak',
                onPress: () => null,
                style: "cancel"
            },
            { text: 'Ya Batalkan', onPress: () => BackGo() }
        ]);
        return true;

    };

    const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backActions
    );

    const BackGo = () => {
        try {
            AsyncStorage.removeItem('paymentMethode');
            console.log('ya');
            props.navigation.goBack();
            return true;

        }
        catch (exception) {

            console.log('gagal');
            return false;
        }
    }


    const getAlumember = () => {
        AsyncStorage.getItem('uid').then(uids => {
            let idember = uids;
            axios.get(svr.url + 'addres/alus/' + idember + '/' + svr.api)
                // axios.get('https://market.pondok-huda.com/dev/react/addres/?alus=' + idember)
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
                        // console.log('adr_id--------> ' + JSON.stringify(oid.data[0].adr_id));
                        AsyncStorage.setItem('setAlamat', JSON.stringify(ALAMAT))
                        console.log('async setAlamat ' + JSON.stringify(ALAMAT));
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
                // console.log('SET alamat ' + JSON.stringify(response));
                let data = JSON.parse(response);
                console.log('---data alamat--->' + JSON.stringify(data));
                setState(state => ({
                    ...state,
                    alu_id: data?.id,
                    alu_city: data?.city,
                    alu_phone: data?.phone,
                    alu_name: data?.name,
                    alu_adress: data?.address,
                }))
                console.log('address id ' + JSON.stringify(data?.alu_id));
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

    const totalPro = () => {

        AsyncStorage.getItem('setProduk').then(response => {
            let total = JSON.parse(response);
            console.log('CEK PRODUK ----------->' + JSON.stringify(total));
            setState(state => ({
                ...state,
                price: total.data[0].price,

            }))
            console.log('CEK harga produk ---->' + JSON.stringify(state.price));
            console.log('CEK harga jasa ---->' + JSON.stringify(state.shp_harga));
            let priceProduk = state.price;
            let priceJasa = state.shp_harga;
            let dor = typeof (priceProduk);
            let der = typeof (priceJasa);
            console.log('tipe data produk ' + JSON.stringify(dor));
            console.log('tipe data jasa ' + JSON.stringify(der));
            let jumlah = Number(priceProduk) + Number(priceJasa);

            console.log('hasil total ' + JSON.stringify(jumlah))
            setState(state => ({
                ...state,
                totalll: jumlah,

            }))
            // console.log('kuyyy hasil ' + JSON.stringify(state.totalll));
        })
        AsyncStorage.getItem('setAlamat').then(response => {
            let data = JSON.parse(response);
            console.log('set alamat ' + JSON.stringify(data));

            setState(state => ({
                ...state,
                adr_id: data?.id,

            }))
            console.log('set adr_id ' + JSON.stringify(state.adr_id));

        })
    }


    //get jasa pengiriman

    const getJasa = () => {
        // setState(state => ({...state, loading: true }))
        axios.get(svr.url + 'ship-retail/retail/' + state.retail + '/' + svr.api)
            // axios.get('https://market.pondok-huda.com/dev/react/ship-retail/retail/' + state.retail)
            .then(result => {
                console.log('jasa kirim  ' + JSON.stringify(result));
                setState(state => ({ ...state, datas: result.data.data }))

            }).catch(err => {
                //console.log(err)
                alert('Gagal menerima data dari server!' + err)
                setState(state => ({ ...state, loading: false }))
            })
    }



    //post data order BINA

    const postProduk = async () => {
        const body = {
            odr_mb_id: state.mb_id,
            odr_shp_id: state.shp_name,
            odr_adr_id: state.adr_id,
            odr_rtl_id: state.retail,
            odr_pay_id: state.odr_pay_id,
            odr_ongkir: state.shp_harga,
            odr_berattotal: state.berat,
            odr_status: state.odr_status,
            prd_id: state.prd_id,
            prd_name: state.product_name,
            prc_price: state.price,
            qty: state.qty,
        }
        console.log('BODY' + JSON.stringify(body));

        setState(state => ({ ...state, loading: true }))
        axios.post(svr.url + 'order/' + svr.api, body)
            // axios.post('https://market.pondok-huda.com/dev/react/order/', body)
            .then(result => {
                console.log('Cek Result----------->' + JSON.stringify(result));
                if (result.data.status == 201) {

                    const datas = {
                        value: result.data.data,
                    }
                    console.log('DATAS' + JSON.stringify(datas));

                    if (datas.value == 0) {
                        alert('Tidak ditemukan data order!')
                    } else {
                        //save Async Storage
                        console.log('cek async ' + JSON.stringify(datas));
                        AsyncStorage.setItem('setOrder', JSON.stringify(datas))


                    }

                    NavigatorService.navigate('Successorder');
                    setState(state => ({ ...state, loading: false }))

                } else if (result.data.status == 500) {
                    alert('Internal server error!')
                    setState(state => ({ ...state, loading: false }))
                }
            })
            .catch(err => {
                console.log(err)
                alert('Gagal menerima data dari server!')
                setState(state => ({ ...state, loading: false }))
            })
    }

    const postPayment = async () => {
    const data = {
        'name': state.mb_name,
        'phone': state.mb_phone,
        'email': state.mb_email,
        'amount': state.totalll,
        'notifyUrl': 'https://mywebsite.com',
        'expired': '24',
        'expiredType': 'hours',
        'comments': 'null',
        'referenceId': 'null',
        'paymentMethod': state.methodeName,
        'paymentChannel': state.adminfee,
        'product[]': state.product_name,
        'qty[]': state.qty,
        'price[]': state.price,
        'weight[]': 'null',
        'width[]': 'null',
        'height[]': 'null',
        'length[]': 'null',
        'deliveryArea': 'null',
        'deliveryAddress': state.adr_id,
    }
    console.log('body post payment = '+ JSON.stringify(data))

    const headers = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'signature': signature,
          'va': payment.va,
          'timestamp': newDte
        }
      }
    // https://sandbox.ipaymu.com/api/v2/payment/direct
    axios.post(payment.url + 'payment/direct', data, headers)
        .then(result => {
            console.log('cek result = '+ JSON.stringify(result));

            if (result.data.status == 200) {

                const datas = {
                    value: result.data.data,
                }
                console.log('DATAS' + JSON.stringify(datas));

                if (datas.value == 0) {
                    alert('Tidak ditemukan data order!')
                } else {
                    //save Async Storage
                    console.log('cek async ' + JSON.stringify(datas));
                    AsyncStorage.setItem('orderPayment', JSON.stringify(datas))


                }

                // NavigatorService.navigate('Successorder');
                setState(state => ({ ...state, loading: false }))

            } else if (result.data.status == 500) {
                alert('Internal server error!')
                setState(state => ({ ...state, loading: false }))
            }

    })
    .catch(err => {
        console.log(err)
        alert('Gagal menerima data dari server!')
        setState(state => ({ ...state, loading: false }))
    })

    }

}


    return (
        <View style={styles.container}>
            <Header
                title={'Checkout'}
                onPress={() => backActions()}
            />
            <ScrollView>
                <View style={{ flex: 1 }}>
                    <View>
                        <View style={styles.viewAlamat}>
                            <Pressable style={styles.btnAlamat} onPress={() => NavigatorService.navigate('Alamat', { adr_mb_id: state.mb_id })}>
                                <View style={{ flexDirection: 'row', }}>
                                    <Image source={allLogo.location} style={styles.iclocation} />
                                    <Text style={styles.txtAlamat}>Alamat Pengiriman</Text>
                                </View>
                                <View style={{ flexDirection: 'row', bottom: toDp(10), justifyContent: 'space-between' }}>
                                    <View style={styles.isiAddress}>
                                        {state.alu_stats == true &&
                                            <>
                                                <Text style={styles.txtAddress}>{state.alu_desk}</Text>

                                            </>
                                        }
                                        <Text style={styles.txtAddress}>{state.alu_name} {state.alu_phone}{"\n"}{state.alu_adress} {state.alu_city}</Text>

                                    </View>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', right: toDp(10), top: toDp(15) }}>
                                        <Image source={allLogo.iclineblack} style={styles.icaddress} />
                                    </View>
                                </View>
                            </Pressable>
                        </View>

                        <View>
                            <Text style={styles.txtTB}>{state.retail_name}</Text>

                            <View style={styles.OrderDetail}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', top: toDp(5) }}>
                                    <Image source={{ uri: state.thumbnail }} style={{ marginLeft: toDp(10), width: toDp(100), height: toDp(100) }} />
                                </View>
                                <View style={{ alignSelf: 'center', bottom: toDp(80), flexDirection: 'column', width: toDp(200), left: toDp(50) }}>
                                    <Text style={{ fontSize: toDp(12) }}>{state.product_name}</Text>
                                    <NumberFormat
                                        value={state.price}
                                        displayType={'text'}
                                        thousandSeparator={'.'}
                                        decimalSeparator={','}
                                        prefix={'Rp. '}
                                        renderText={formattedValue => <Text style={{ bottom: toDp(0), marginTop: toDp(10), fontSize: toDp(12), color: '#F83308', fontWeight: '800' }}>{formattedValue}</Text>} // <--- Don't forget this!
                                    />
                                </View>
                            </View>
                        </View>

                        <View>
                            <View style={styles.Shipping}>
                                <Text style={styles.txtOption}>Opsi Pengiriman</Text>
                                <View style={{ borderWidth: toDp(0.5), borderColor: 'grey' }} />
                                <Pressable onPress={() => NavigatorService.navigate('underConstruction')}>
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
                                            dropdownStyle={{ borderRadius: toDp(10) }}
                                            rowStyle={{ height: toDp(48), padding: toDp(5) }}
                                            defaultButtonText={'Pilih Jasa Pengiriman'}
                                            data={state.datas}
                                            onSelect={(selectedItem, index) => {
                                                console.log('cek drop ' + (selectedItem.shp_id, index))
                                                setState(state => ({
                                                    ...state,
                                                    shp_name: selectedItem.shp_id,
                                                    shr_jasa: selectedItem.shp_id,
                                                    shp_harga: parseInt(selectedItem.shr_jasa),
                                                }))
                                                console.log('cek state harga ' + (state.shp_harga))
                                                console.log('cek state id ' + (state.shp_name))
                                                console.log('cek state nama jasa ' + (state.shr_jasa))
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
                                {/* <Text style={styles.estimasi}>Akan DIterima Pada {DATA[0].diterima}</Text> */}
                            </View>
                        </View>

                        <View>
                            <View style={styles.bodyPayment}>
                                <Pressable onPress={() => NavigatorService.navigate('Pembayaran', { from: 'belilangsung' })}>
                                    <View style={styles.payment}>
                                        <Text style={styles.txtPayment}>Metode Pembayaran</Text>
                                        <Text style={styles.txtTransfer}>
                                            {state.methodeName != '' ?
                                                state.methodeName
                                                :
                                                'Pilih Pembayaran'
                                            }
                                        </Text>
                                        <Image source={allLogo.iclineblack} style={styles.iclineblack2} />
                                    </View>
                                </Pressable>
                                <View style={{ borderWidth: toDp(0.5), borderColor: 'grey' }} />

                                <View style={{ flexDirection: 'row', margin: toDp(4), justifyContent: 'space-between' }}>
                                    <Text style={styles.txtSubTot}>Subtotal Untuk Produk</Text>
                                    <NumberFormat
                                        value={parseInt(state.price)}
                                        displayType={'text'}
                                        thousandSeparator={'.'}
                                        decimalSeparator={','}
                                        prefix={'Rp. '}
                                        renderText={formattedValue => <Text style={{ fontSize: toDp(12), }}>{formattedValue}</Text>} // <--- Don't forget this!
                                    />
                                </View>
                                <View style={{ flexDirection: 'row', margin: toDp(4), justifyContent: 'space-between' }}>
                                    <Text style={styles.txtSubPeng}>Subtotal Pengiriman</Text>
                                    <NumberFormat
                                        value={parseInt(state.shp_harga)}
                                        displayType={'text'}
                                        thousandSeparator={'.'}
                                        decimalSeparator={','}
                                        prefix={'Rp. '}
                                        renderText={formattedValue => <Text style={{ fontSize: toDp(12), }}>{formattedValue}</Text>} // <--- Don't forget this!
                                    />
                                </View>
                                <View style={{ flexDirection: 'row', margin: toDp(4), justifyContent: 'space-between' }}>
                                    <Text style={styles.txtBiayaPen}>Biaya Admin</Text>
                                    <NumberFormat
                                        value={parseInt(state.adminfee)}
                                        displayType={'text'}
                                        thousandSeparator={'.'}
                                        decimalSeparator={','}
                                        prefix={'Rp. '}
                                        renderText={formattedValue => <Text style={{ fontSize: toDp(12),  }}>{formattedValue}</Text>} // <--- Don't forget this!
                                    />
                                </View>
                                <View style={{ flexDirection: 'row', margin: toDp(4), justifyContent: 'space-between' }}>
                                    <Text style={styles.txtTotPem}>Total Pembayaran</Text>
                                    {/* <Text style={styles.txtTotPem1}>Rp 800.000</Text> */}
                                    <NumberFormat
                                        value={parseInt(state.shp_harga + parseInt(state.adminfee)+parseInt(state.price))}
                                        displayType={'text'}
                                        thousandSeparator={'.'}
                                        decimalSeparator={','}
                                        prefix={'Rp. '}
                                        renderText={formattedValue => <Text style={{ fontSize: toDp(12), color: '#F83308', fontWeight: '800', }}>{formattedValue}</Text>} // <--- Don't forget this!
                                    />
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{ marginTop: toDp(30), bottom: 10, position: 'relative' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: toDp(335), height: toDp(48), }}>
                            <Pressable style={styles.btn} onPress={() => postProduk()}>
                                <Text style={{ textAlign: 'center', top: toDp(13), color: 'white' }}>Buat Pesanan</Text>
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
    viewAlamat: {
        marginBottom: toDp(40),
        top: toDp(10)
    },
    dropdown: {
        height: toDp(48),
        borderRadius: toDp(10),
        width: toDp(320),
        top: toDp(4),
        backgroundColor: '#f9f8f8',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 2,
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
        marginLeft: toDp(24),
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
        height: toDp(120),
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
        color: '#F83308',
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
        left: toDp(10)
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
        color: '#F83308',
        fontWeight: 'bold'
    },
    btnCheckout: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',

    },
    btn: {
        backgroundColor: '#2A334B',
        borderRadius: toDp(10),
        width: toDp(335),
        height: toDp(48),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 2,
    }
});

export default Checkout;