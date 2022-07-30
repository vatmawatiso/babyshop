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

const cartCheckout = (props) => {
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
        total: '',
        total_item: '',
        alu_stats: false,
        loading: false,
        modalVisible: false,
        option: {
            width: 750,
            height: 750,
            cropping: true,
        },
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

                // getRetail()  // untuk reload data terbaru retail
            }
        );
        // getCart()
        totalPro()
        getCartProduk()

    }, [stAlu])


    const getAlumember = () => {
        AsyncStorage.getItem('uid').then(uids => {
            let idember = uids;
            axios.get(svr.url+'addres/?alus='+idember+'/'+svr.api)
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
                        console.log('adr_id--------> ' + JSON.stringify(oid.data[0].adr_id));
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

    // get produk yg udah masuk ke keranjang
    const getCartProduk = () => {
        AsyncStorage.getItem('uid').then(uids => {
            let aid = uids;
            axios.get(svr.url+'cart/member/'+aid+'/'+svr.api)
            // axios.get('https://market.pondok-huda.com/dev/react/cart/?mb_id=' + aid)
                .then(response => {
                    if (response.data.status == 200) {
                        console.log('response produk cart =>', JSON.stringify(response))
                        setState(state => ({ ...state, dataProdukCart: response.data.data }))
                        setState(state => ({ ...state, totalProdukCart: response.data }))
                        console.log('cart rtl =>', JSON.stringify(response.data.data[0]?.retail_id))
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
        axios.get(svr.url+'ship-retail/retail/'+rtl+'/'+svr.api)
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
        axios.post(svr.url+'order/cart/fromcart/'+svr.api,body)
        // axios.post('https://market.pondok-huda.com/dev/react/order/cart/fromcart', body)
            .then(response => {

                console.log('CEK URL ===>' + JSON.stringify(response.data));

                if (response.data.status === 201) {
                    alert('Berhasil order!')


                    NavigatorService.navigate('SuccessorderCart')

                    console.log('CEK Hasil Order ===>' + JSON.stringify(response.data));

                    setState(state => ({ ...state, loading: false }))

                } else {
                    alert('Gagal order!')
                    setState(state => ({ ...state, loading: false }))

                    console.log('CEK ERROR ===>' + JSON.stringify(response.data));
                }

            }).catch(err => {
                console.log(svr.url+'order/cart/fromcart/'+svr.api,body)
                alert('Gagal menerima data dari server!' +svr.url+'order/cart/fromcart/'+svr.api,body )
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
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <View style={{ marginLeft: toDp(12) }}>
                            <Image source={{ uri: item.thumbnail }} style={styles.imageThumb} />
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{item.qty} {item.prd_name.substr(0, 25)}</Text>
                            <NumberFormat
                                value={hasilll}
                                displayType={'text'}
                                thousandSeparator={'.'}
                                decimalSeparator={','}
                                prefix={'Rp. '}
                                renderText={formattedValue => <Text style={{ bottom: toDp(0), left: toDp(0), fontSize: toDp(12), color: '#F83308', fontWeight: '800' }}>{formattedValue}</Text>} // <--- Don't forget this!
                            />
                            
                        </View>
                    </View>
                    {/* line separate */}
                    {/* <View style={{width: '85%', height: '2%', backgroundColor: 'grey'}}/> */}
                   
                </View>
        )
    }

    const RenderItem = (itm, i) => {
        return (
            <View style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center' }} key={i}>
                <View style={styles.orderCartone}>
                    {/*Identitas produk*/}
                    <View style={{ width: '100%', height: toDp(20) }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 'bold', marginLeft: toDp(15), top: toDp(6) }}>{itm.retail_name}</Text>
                        </View>

                    </View>
                    <View style={{position: 'absolute', zIndex: 3, left: '50%', top: '35%'}}>
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
                    <SelectDropdown
                        key={i}
                        defaultValue={state.shpName}
                        buttonStyle={styles.dropdown}
                        buttonTextStyle={{ fontSize: toDp(12), color: 'grey' }}
                        rowTextStyle={{ fontSize: toDp(12) }}
                        dropdownStyle={{ borderRadius: toDp(7) }}
                        rowStyle={{ height: toDp(48), padding: toDp(5) }}
                        defaultButtonText={'Pilih Jasa Pengiriman'}
                        data={state.datas[i] == '' || state.datas[i] == null ? '' : state.datas[i]}
                        onSelect={(selectedItem, itm) => {
                            console.log('cek drop ', selectedItem.shp_id, itm)

                            let { shpPrice } = state;
                            shpPrice[i] = selectedItem.shr_jasa;
                            setState(state => ({
                                ...state,
                                shpPrice
                            }))
                            let { shp_id } = state;
                            shp_id[i] = selectedItem.shp_id;
                            setState(state => ({
                                ...state,
                                shp_id
                            }))
                            console.log('argghhhh', state.shp_id)
                            let { shpName } = state;
                            shpName[i] = selectedItem.shp_name;
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

    return (
        <View style={styles.container}>
            <Header
                title={'Checkout'}
                onPress={() => props.navigation.goBack()}
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
                                        <Image source={allLogo.iclineblack} style={styles.icaddress} />
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
                                    <NumberFormat
                                        value={state.total}
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
                                        value={state.shpPrice == '' || state.shpPrice == null ? 'Rp. 0' : getTotaljasa(state.shpPrice)}
                                        displayType={'text'}
                                        thousandSeparator={'.'}
                                        decimalSeparator={','}
                                        prefix={'Rp. '}
                                        renderText={formattedValue => <Text style={{ fontSize: toDp(12), }}>{formattedValue}</Text>} // <--- Don't forget this!
                                    />
                                </View>
                                {/* <View style={{ flexDirection: 'row', margin: toDp(4), justifyContent: 'space-between' }}>
                                    <Text style={styles.txtBiayaPen}>Biaya Penanganan</Text>
                                    <Text style={styles.txtBiayaPen}>Rp 50.000</Text>
                                </View> */}
                                <View style={{ flexDirection: 'row', margin: toDp(4), justifyContent: 'space-between' }}>
                                    <Text style={styles.txtTotPem}>Total Pembayaran</Text>
                                    {/* <Text style={styles.txtTotPem1}>Rp 800.000</Text> */}
                                    <NumberFormat
                                        value={state.shpPrice == '' || state.shpPrice == null ? 'Rp. 0' : getTotaljasa(state.shpPrice) + parseInt(state.total)}
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
        borderRadius: toDp(15),
        width: toDp(335),
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
    cartProduk: {
        width: toDp(335),
        // backgroundColor: 'cyan',
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
        top: toDp(10)
    },
    bodyPayment: {
        padding: toDp(10),
        backgroundColor: '#f9f8f8',
        top: toDp(5),
        borderRadius: toDp(10),
        width: toDp(335),
        height: toDp(125),
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