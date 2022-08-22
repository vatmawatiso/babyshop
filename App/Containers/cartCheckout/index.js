import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    TextInput,
    FlatList,
    Pressable,
    ScrollView,
    AsyncStorage,
    BackHandler,
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
import { payment } from "../../Configs/payment";

const cartCheckout = (props) => {
    var CryptoJS = require("crypto-js");
    const [selectedItems, setSelectedItems] = useState([]);
    const [stAlu, setAllu] = useState(0);
    const [selected, setSelected] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const [state, setState] = useState({
        mb_id: '',
        totalJasa: 0,
        selectedShpname: [],
        datas: [],
        rtlids: [],
        shpPrice: [],
        adr_id: '',
        odr_pay_id: 'PYM00001',
        odr_status: 'Dikemas',
        qty: '1',
        name: '',
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
        dataProdukCart: [],
        totalProdukCart: [],
        thumbnails: '',
        id: '',
        shp_id: [],
        shpName: [],
        crt_id: '',
        id_crt: '',
        crd_id: '',
        shp_name: '',
        shp_harga: '',
        shr_jasa: '',
        id_retail: '',
        crd_prd_name: '',
        crd_prd_id: '',
        retail: '',
        retail_id: '',
        retail_name: '',
        price: '',
        jumlah: '',
        thumbnail: '',
        total_price: '',
        total: 0,
        total_item: '',
        alu_stats: false,
        loading: false,
        modalVisible: false,
        option: {
            width: 750,
            height: 750,
            cropping: true,
        },
        methodeName: 'Pilih Pembayaran',
        totalPrice: 0,
        chanelsMethode: '',
        methodeCode: '',
        mb_id: '',
        adminfee: 0,
        totalOngkir: 0
    })


    //get ALAMAT
    useEffect(() => {
        // ambil data total harga semuanya buat dihitung di total pembayaran
        AsyncStorage.getItem('cartProduk').then(response => {
            let data = JSON.parse(response);
            console.log('dataaa', JSON.stringify(data));
            setState(state => ({
                ...state,
                total: data.value.total,
                retail_id: data.value.data[0].retail_id,
                id: data.value.data[0].id,
                value: data.value,
            }))
            console.log(state.retail_id)
        })
        // get data user dari async
        AsyncStorage.getItem('member').then(response => {
            let data = JSON.parse(response);
            setState(state => ({
                ...state,
                mb_id: data.value.mb_id,
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
        // getCart()
        totalPro()
        getCartProduk()

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

    const pad2 = (n) => { return n < 10 ? '0' + n : n }

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
                    chanelsMethode: data.code_payment,
                    methodeCode: data.methode,
                    methodeName: data.name,
                    adminfee: parseInt(data.fee)
                }))
            }

            console.log('code : ' + data.methode + ' | ' + data.code_payment + ' | Fee :' + data.fee + ' | methode : ' + data.name);

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
            axios.get(svr.url + 'addres/?alus=' + idember + '/' + svr.api)
                // axios.get('https://market.pondok-huda.com/dev/react/addres/?alus=' + idember)
                .then(result => {
                    let oid = result.data;
                    console.log('oid = ' + oid.data.length);

                    if (oid.data.length > 0) {
                        const ALAMAT = {
                            id: oid.data[0]?.adr_id,
                            name: oid.data[0]?.mb_name,
                            phone: oid.data[0]?.mb_phone,
                            address: oid.data[0]?.adr_address,
                            city: oid.data[0]?.cty_name
                        }
                        // console.log('adr_id--------> ' + JSON.stringify(oid.data[0].adr_id));
                        AsyncStorage.setItem('setAlamat', JSON.stringify(ALAMAT))
                        // console.log('async setAlamat ' + JSON.stringify(ALAMAT));
                        setAllu(1)
                        //loatAlamatU()
                    } else {
                        // console.log('null--------> ' + oid.data.length);
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
                // console.log('---data alamat--->' + JSON.stringify(data));
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

    // get produk yg udah masuk ke keranjang
    const getCartProduk = () => {
        AsyncStorage.getItem('uid').then(uids => {
            let aid = uids;

            axios.get(svr.url + 'cart/member/' + aid + '/' + svr.api)

                .then(response => {
                    if (response.data.status == 200) {
                        // console.log('response produk cart =>', JSON.stringify(response))
                        setState(state => ({ ...state, dataProdukCart: response.data.data }))
                        setState(state => ({ ...state, totalProdukCart: response.data }))
                        // console.log('cart rtl =>', JSON.stringify(response.data.data[0]?.retail_id))
                        response.data.data.map((doc, index) => {
                            //console.log('index---->', index);
                            // let { rtlids} = state;
                            // rtlids[i] = doc.retail_id;
                            // setState(state => ({
                            //   ...state,
                            //   rtlids
                            // }))
                            // setState(state => ({ ...state, rtlids }))
                            getJasa(doc.retail_id, index)
                        })


                    } else {
                        alert('Gagal Mengambil data')
                        console.log('response produk cart =>', response)
                    }
                }).catch(error => {
                    console.log('error =>', error)
                })
        }).catch(error => {
            console.log('error 2 =>', error)
        })
    }

    //mencari total harga

    const totalPro = () => {
        AsyncStorage.getItem('shipHara').then(response => {
            console.log('hasil harga jasa', response)
        })
        console.log('CEK harga produk ---->', state.total_price);
        console.log('CEK harga jasa ---->' + JSON.stringify(state.shp_harga));
        let subTotalProduk = state.total_price;
        let totalJasa = state.shp_harga;
        console.log('tottalJasa', totalJasa)
        let dor = typeof (subTotalProduk);
        let der = typeof (totalJasa);
        console.log('tipe total produk ' + JSON.stringify(dor));
        console.log('tipe total jasa ' + JSON.stringify(der));
        let totalSemua = Number(subTotalProduk) + Number(totalJasa);

        console.log('hasil total ' + JSON.stringify(totalSemua))
        setState(state => ({
            ...state,
            jumlah: totalSemua,

        }))
        // console.log('kuyyy hasil ' + JSON.stringify(state.totalll));

        AsyncStorage.getItem('setAlamat').then(response => {
            let data = JSON.parse(response);
            //  belum kepanggil name sama phonenya
            console.log('set alamat ' + JSON.stringify(data));

            setState(state => ({
                ...state,
                adr_id: data?.id,

            }))
            console.log('set adr_id ' + JSON.stringify(state.adr_id));

        })
    }


    //get jasa pengiriman

    const getJasa = (rtl, i) => {
        setState(state => ({ ...state, loading: true }))
        axios.get(svr.url + 'ship-retail/retail/' + rtl + '/' + svr.api)
            // axios.get('https://market.pondok-huda.com/dev/react/ship-retail/retail/' + rtl)
            .then(result => {
                console.log('jasa kirim  ', result);
                let { datas } = state;
                datas[i] = result.data.data;
                setState(state => ({
                    ...state,
                    datas
                }))


            }).catch(err => {
                //console.log(err)
                alert('Gagal menerima data dari server!' + err)
                setState(state => ({ ...state, loading: false }))
            })
    }

    const postProduk = async () => {
        const body = {
            odr_mb_id: state.mb_id,
            odr_shp_id: state.shp_id,
            odr_adr_id: state.adr_id,
            odr_pay_id: state.odr_pay_id,
        }
        console.log('CEK BODY ===> ' + JSON.stringify(body));

        setState(state => ({ ...state, loading: true }))
        //console.log('https://market.pondok-huda.com/dev/react/order/cart/'+state.id)
        axios.post(svr.url + 'order/cart/fromcart/' + svr.api, body)
            // axios.post('https://market.pondok-huda.com/dev/react/order/cart/fromcart', body)
            .then(response => {

                console.log('CEK URL ===>' + JSON.stringify(response.data));

                if (response.data.status == 201) {
                    const datas = {
                        value: response.data.odr_id,
                    }


                    if (datas.value == 0 || datas.value == '') {
                        alert('Tidak ditemukan data order!')
                    } else {
                        //save Async Storage
                        console.log('DATA ADA ===>', datas);
                        AsyncStorage.setItem('setOrder Data Array', JSON.stringify(datas))
                        postToPaymentgateway(response.data.odr_id)
                    }

                    //NavigatorService.navigate('SuccessorderCart')

                    console.log('DATA Hasil Order ===>' + JSON.stringify(response.data));


                    setState(state => ({ ...state, loading: false }))

                } else {
                    alert('Gagal order!')
                    setState(state => ({ ...state, loading: false }))

                    console.log('CEK ERROR ===>' + JSON.stringify(response.data));
                }

            }).catch(err => {
                // console.log(err)
                alert('Gagal menerima data dari server!' + err)
                setState(state => ({ ...state, loading: false }))
            })
    }

    const getTotaljasa = (data) => {
        let hasil = data.map(item => parseInt(item)).reduce((prev, curr) => prev + curr, 0)

        return hasil
    }

    const perProduk = (item, index, idCart, inc) => {
        let qtyyy = item.qty;
        let priceee = item.price;
        var hasilll = parseInt(qtyyy) * parseInt(priceee)
        return (
            <View style={styles.cartProduk}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop:toDp(10) }}>
                    <View style={{ marginLeft: toDp(12) }}>
                        <Image source={{ uri: item.thumbnail }} style={styles.imageThumb} />
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ fontSize: toDp(14), fontWeight: 'bold' }}>{item.qty} {item.prd_name.substr(0, 25)}</Text>
                        <NumberFormat
                            value={hasilll}
                            displayType={'text'}
                            thousandSeparator={'.'}
                            decimalSeparator={','}
                            prefix={'Rp. '}
                            renderText={formattedValue => <Text style={{ bottom: toDp(0), left: toDp(0), marginTop: toDp(10), fontSize: toDp(12), color: '#F83308', fontWeight: '800' }}>{formattedValue}</Text>} // <--- Don't forget this!
                        />

                    </View>
                </View>
                {/* line separate */}
                {/* <View style={{width: '85%', height: '2%', backgroundColor: 'grey'}}/> */}
                <SelectDropdown
                    key={inc}
                    defaultValue={state.shpName}
                    buttonStyle={styles.dropdown}
                    buttonTextStyle={{ fontSize: toDp(12), color: 'grey' }}
                    rowTextStyle={{ fontSize: toDp(12) }}
                    dropdownStyle={{ borderRadius: toDp(10) }}
                    rowStyle={{ height: toDp(48), padding: toDp(3) }}
                    defaultButtonText={'Pilih Jasa Pengiriman'}
                    data={state.datas[inc] == '' || state.datas[inc] == null ? '' : state.datas[inc]}
                    onSelect={(selectedItem, i) => {
                        console.log('cek drop ', selectedItem.shp_id, i)

                        let { shpPrice } = state;
                        shpPrice[inc] = selectedItem.shr_jasa;
                        setState(state => ({
                            ...state,
                            shpPrice
                        }))
                        let { shp_id } = state;
                        shp_id[inc] = selectedItem.shp_id;
                        setState(state => ({
                            ...state,
                            shp_id
                        }))
                        console.log('argghhhh', state.shp_id)
                        let { shpName } = state;
                        shpName[inc] = selectedItem.shp_name;
                        setState(state => ({
                            ...state,
                            shpName
                        }))
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
        )
    }

    const RenderItem = (itm, i) => {
        return (
            <View style={{ marginTop: toDp(10), justifyContent: 'center', alignItems: 'center' }} key={i}>
                <View style={styles.orderCartone}>
                    {/*Identitas produk*/}
                    <View style={{ width: '100%', height: toDp(20) ,}}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 'bold', marginLeft: toDp(5), bottom: toDp(5) }}>{itm.retail_name}</Text>
                        </View>

                    </View>
                    <View style={{ position: 'absolute', zIndex: 3, left: '50%', top: '35%' }}>
                        {/* <NumberFormat
                            value={itm.subtotal}
                            displayType={'text'}
                            thousandSeparator={'.'}
                            decimalSeparator={','}
                            prefix={'Rp. '}
                            renderText={formattedValue => <Text style={{ bottom: toDp(0), left: toDp(0), fontSize: toDp(12), color: '#F83308', fontWeight: '800' }}>{formattedValue}</Text>} // <--- Don't forget this!
                        /> */}
                    </View>


                    {/* end Identitas produk*/}
                    {/* flat list per produk */}
                    <FlatList style={{ width: toDp(335), top: toDp(10), marginBottom: toDp(70) }}
                        data={itm.items}
                        renderItem={({ item, index }) => {
                            return (
                                perProduk(item, index, itm.id, i)
                            )
                        }}

                        ListFooterComponent={() => <View style={{ height: toDp(0) }} />}
                    />
                    {/* akhir dari per produk */}
                </View>
            </View>
        )
    }

    const CardCartProduk = () => {
        return (
            <View style={styles.flatcontent}>
                <FlatList style={{ width: '100%', marginTop: toDp(6) }}
                    data={state.dataProdukCart}
                    renderItem={({ item, index }) => {
                        return (
                            RenderItem(item, index)
                        )
                    }}
                    keyExtractor={(item) => item.retail_id}
                // ListFooterComponent={() => <View style={{ height: toDp(120) }} />}

                />
            </View>
        )
    }

    const postToPaymentgateway = (id) => {
        // generate time
        var date = new Date();
        var newDte = date.getFullYear().toString() + pad2(date.getMonth() + 1) + pad2(date.getDate()) + pad2(date.getHours()) + pad2(date.getMinutes()) + pad2(date.getSeconds());
        let total = parseInt(getTotaljasa(state.shpPrice)) + parseInt(state.adminfee) + parseInt(state.total);


        var body = {
            name: state.mb_name,
            phone: "0895558785124",
            email: state.mb_email,
            amount: total,
            paymentMethod: state.methodeCode,
            notifyUrl: "https://market.pondok-huda.com/publish/react/notifycheckout/76a9b349329fd3e650942abb594ddb60",
            comments: "cek",
            referenceId: "1",
            paymentChannel: state.chanelsMethode

        }

        //generate signature
        var bodyEncrypt = CryptoJS.SHA256(JSON.stringify(body));
        var stringtosign = "POST:" + payment.va + ":" + bodyEncrypt + ":" + payment.apikey;
        var signature = CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(stringtosign, payment.apikey));

        var headers = {

            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json',
                signature: signature,
                va: payment.va,
                timestamp: newDte
            },

        }
        console.log('body', JSON.stringify(body));
        axios.post('https://sandbox.ipaymu.com/api/v2/payment/direct', body, headers)
            .then(response => {
                if (response.data.Status == 200) {
                    console.log('RESPONSE IPAYMU ----->= ' + JSON.stringify(response.data));
                    let res = response.data.Data;

                    let data = {
                        "odr_id": id,
                        "SessionId": res.SessionId,
                        "TransactionId": res.TransactionId,
                        "ReferenceId": res.ReferenceId,
                        "Via": res.Via,
                        "Channel": res.Channel,
                        "PaymentNo": res.PaymentNo,
                        "PaymentName": res.PaymentName,
                        "SubTotal": res.SubTotal,
                        "Total": res.Total,
                        "Fee": res.Fee,
                        "Expired": res.Expired,
                        "QrString": res.QrString,
                        "QrImage": res.QrImage,
                        "QrTemplate": res.QrTemplate,
                        "Note": res.Note
                    }

                    postTransaksi(data);
                    NavigatorService.reset('Infopembayaran', { data: response.data.Data })
                    return true;
                } else {
                    console.log('Ipaymu ststus ----> ', response.data.Status);
                    return false;
                }
            })
            .catch(error => {
                return false;
                console.log('----->', error.response.data);
            });

    }

    const TotalsPrice = (A, B, C) => {
        let total = (parseInt(A) + parseInt(state.adminfee) + parseInt(state.total));

        //   console.log('Price ====> ', total);
        return (
            <>
                <NumberFormat
                    value={total == 0 ? C : total}
                    displayType={'text'}
                    thousandSeparator={'.'}
                    decimalSeparator={','}
                    prefix={'Rp. '}
                    renderText={formattedValue => <Text style={{ fontSize: toDp(12), color: '#F83308', fontWeight: '800', }}>{formattedValue}</Text>} // <--- Don't forget this!
                />
            </>
        )
    }

    const postTransaksi = (data) => {
        axios.post(svr.url + 'checkout/ipy/' + state.mb_id + '/' + svr.api, data)
            .then(response => {
                if (response.data.status == 201) {
                    console.log('RESPONSE CHECKOUT----->= ' + JSON.stringify(response.data));

                } else {
                    console.log('CHECKOUT ststus ----> ', response.data);

                }
            })
            .catch(error => {
                console.log('ERR CHECKOUT----->', error.response.data);
            });
    }

    const PostAll = (MetodeBayar, Ongkir) => {
        if (MetodeBayar == '' || MetodeBayar == 'Undefined') {
            alert("Pilih Metode Pembayaran!");
        } else if (Ongkir == '0' || Ongkir == 0 || Ongkir == 'Undefined') {
            alert("Pilih Metode Pengiriman!");
        } else if (state.shr_jasa.trim() == '') {
            alert('Pilih jasa pengiriman!')
            return;
        } else {
            postProduk()
        }

    }

    // const validateInput = () => {
    //     if (state.shr_jasa.trim() == '') {
    //       alert('Pilih jasa pengiriman!')
    //       return;
    //     }
    //     if (state.methodeName.trim() == '') {
    //       alert('Pilih metode pembaaran!')
    //       return;
    //     }
    
    //     postProduk()
    //   }

    return (
        <View style={styles.container}>
            <Header
                title={'Checkout'}
                onPress={() => backActions()}
            />
            <ScrollView>
                <View style={{ flex: 1 }}>
                    <View>
                        <View style={{ marginBottom: toDp(10), top: toDp(10) }}>
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
                                        <Image source={allLogo.arrowright} style={styles.icaddress} />
                                    </View>
                                </View>
                            </Pressable>
                        </View>
                        {/* <View style={{ marginTop: toDp(10), marginBottom: toDp(90) }}> */}
                        <CardCartProduk />
                        {/* <Text>==> {JSON.stringify(state.shp_id)}</Text> */}
                        {/* </View> */}

                        <View>
                            <View style={styles.bodyPayment}>
                                <Pressable onPress={() => NavigatorService.navigate('Pembayaran', { from: 'cart' })}>
                                    <View style={styles.paymentV}>
                                        <View style={{ textAlign: 'flex-end', width: '40%', justifyContent: 'center' }}>
                                            <Text style={styles.txtPayment}>Metode Pembayaran</Text>
                                        </View>
                                        <View style={{ alignItems: 'flex-end', width: '55%', justifyContent: 'center' }}>
                                            <Text style={styles.txtTransfer}>
                                                {state.methodeName != '' ?
                                                    state.methodeName
                                                    :
                                                    'Pilih Pembayaran'
                                                }
                                            </Text>
                                        </View>
                                        <View style={{ alignItems: 'flex-end', width: '5%', justifyContent: 'center' }}>
                                            <Image source={allLogo.arrowright} style={styles.iclineblack2} />
                                        </View>
                                    </View>
                                </Pressable>
                                <View style={{ borderWidth: toDp(0.5), borderColor: 'grey' }} />

                                <View style={{ flexDirection: 'row', margin: toDp(5), justifyContent: 'space-between' }}>
                                    <Text style={styles.txtSubTot}>Subtotal Untuk Produk</Text>
                                    <NumberFormat
                                        value={state.total}
                                        displayType={'text'}
                                        thousandSeparator={'.'}
                                        decimalSeparator={','}
                                        prefix={'Rp. '}
                                        renderText={formattedValue => <Text style={{ fontSize: toDp(12), }}>{formattedValue}</Text>} // <--- Don't forget this!
                                    />
                                </View>
                                <View style={{ flexDirection: 'row', margin: toDp(5), justifyContent: 'space-between' }}>
                                    <Text style={styles.txtSubPeng}>Subtotal Pengiriman</Text>
                                    <NumberFormat
                                        value={state.shpPrice == '' || state.shpPrice == null ? 'Rp. 0' : getTotaljasa(state.shpPrice)}
                                        displayType={'text'}
                                        thousandSeparator={'.'}
                                        decimalSeparator={','}
                                        prefix={'Rp. '}
                                        renderText={formattedValue => <Text style={{ fontSize: toDp(12), }}>{formattedValue}</Text>} // <--- Don't forget this!
                                    />
                                </View>
                                <View style={{ flexDirection: 'row', margin: toDp(5), justifyContent: 'space-between' }}>
                                    <Text style={styles.txtSubTot}>Biaya Admin</Text>
                                    {/* <Text style={styles.txtTotPem1}>Rp 800.000</Text> */}
                                    <NumberFormat
                                        value={parseInt(state.adminfee)}
                                        displayType={'text'}
                                        thousandSeparator={'.'}
                                        decimalSeparator={','}
                                        prefix={'Rp. '}
                                        renderText={formattedValue => <Text style={{ fontSize: toDp(12), color: '#F83308', fontWeight: '800', }}>{formattedValue}</Text>} // <--- Don't forget this!
                                    />
                                </View>
                                <View style={{ flexDirection: 'row', margin: toDp(5), justifyContent: 'space-between' }}>
                                    <Text style={styles.txtTotPem}>Total Pembayaran</Text>
                                    {/* <Text style={styles.txtTotPem1}>Rp 800.000</Text> */}
                                    {TotalsPrice(getTotaljasa(state.shpPrice), state.adminfee, state.total)}
                                    {/*<NumberFormat
                                        value={state.shpPrice == '' || state.shpPrice == null ? 'Rp. 0' : getTotaljasa(state.shpPrice) + parseInt(state.total)}
                                        displayType={'text'}
                                        thousandSeparator={'.'}
                                        decimalSeparator={','}
                                        prefix={'Rp. '}
                                        renderText={formattedValue => <Text style={{ fontSize: toDp(12), color: '#F83308', fontWeight: '800', }}>{formattedValue}</Text>} // <--- Don't forget this!
                                    />*/}
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{ marginTop: toDp(30), bottom: 10, position: 'relative' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: toDp(335), height: toDp(48), }}>
                            <Pressable style={styles.btn} onPress={() => PostAll(state.methodeCode, getTotaljasa(state.shpPrice))}>
                                <Text style={{ textAlign: 'center', top: toDp(17), color: 'white' }}>Buat Pesanan</Text>
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
        height: toDp(48),
        borderRadius: toDp(10),
        width: toDp(335),
        top: toDp(12),
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
        width: toDp(8),
        height: toDp(14),
        marginLeft: toDp(40),
        marginTop:toDp(20)
    },
    cartProduk: {
        width: toDp(335),
        height:toDp(170),
        borderRadius:toDp(10),
        backgroundColor: '#f8f9f9',
        bottom:toDp(5),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 2,
    },
    txtRetail: {
        fontWeight: 'bold',
        bottom: toDp(20)
    },
    detailProduk: {
        backgroundColor: '#f9f8f8',
        borderRadius: toDp(10),
        marginVertical: toDp(10),
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
    viewImgPrdName: {
        flexDirection: 'row'
    },
    imageThumb: {
        width: toDp(100),
        height: toDp(100),
        borderRadius: toDp(10)
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
        top: toDp(10),
        padding: toDp(8),
    },
    bodyPayment: {
        padding: toDp(10),
        backgroundColor: '#f9f8f8',
        top: toDp(5),
        borderRadius: toDp(10),
        width: toDp(335),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 3,

        elevation: 2,
    },

    paymentV: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: toDp(40),
        paddingHorizontal: toDp(4),
    },
    txtPayment: {
        margin: 0,
        fontSize: 12,

    },
    txtTransfer: {
        margin: 0,
        fontSize: 12,

    },
    iclineblack2: {
        width: toDp(8),
        height: toDp(14),
        top: 0,
        margin: 0,

    },
    txtSubTot: {
        fontSize: toDp(12),
        marginLeft: toDp(0),
    },
    txtSubPeng: {
        fontSize: toDp(12),
        marginLeft: toDp(0),
    },
    txtBiayaPen: {
        fontSize: toDp(12),
        marginLeft: toDp(0),
    },
    txtTotPem: {
        fontSize: toDp(13),
        fontWeight: 'bold',
        marginLeft: toDp(0),
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
        borderRadius: toDp(15),
        width: toDp(335),
        height: toDp(48)
    },
    flatcontent: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    renderItem: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textRetailName: {
        fontWeight: 'bold',
        fontSize: toDp(18),
        padding: 10
    }
});

export default cartCheckout;
