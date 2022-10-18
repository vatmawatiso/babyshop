import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar,
    ScrollView,
    Dimensions,
    ImageBackground,
    Pressable,
    FlatList,
    AsyncStorage,
    LogBox,
    TouchableOpacity,
    ToastAndroid,
    PermissionsAndroid,
    ActivityIndicator
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import Carousel, { Pagination } from "react-native-snap-carousel";
import LinearGradient from 'react-native-linear-gradient'
import SelectableChips from 'react-native-chip/SelectableChips'
import Search from '@Search'
import Geolocation from '@react-native-community/geolocation';
import NavigatorService from '@NavigatorService'
import Axios from "axios";
import NumberFormat from 'react-number-format';
import { svr } from "../../Configs/apikey";
import { set } from "react-native-reanimated";
// import { TouchableOpacity } from "react-native-gesture-handler";
const { width, height } = Dimensions.get('window')

const Katagori = (props) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [state, setState] = useState({
        dataProduk: [],
        dataWish: [],
        ws_mb_id: '',
        ws_rtl_id: '',
        ws_prd_id: '',
        dataKategori: '',
        loading: false,
        sChip: '',
        id: '',
        icHide: '',
        inArea: 'false',
        inMessage: '',
        lat: [],
        long: [],
        inload: 'true'
    })


    useEffect(() => {

        // get id pengguna
        AsyncStorage.getItem('uid').then(uids => {
            let ids = uids;
            setState(state => ({ ...state, id: ids }))
            console.log('id', state.id)
        }).catch(error => {
            console.log('error', error)
        })

        //Pemanggilan promise saat terjadi back navigation
        props.navigation.addListener(
            'didFocus',
            payload => {
                setKordinat()
                    .then(result => {
                        return produk(result)
                        setState(state => ({
                            ...state,
                            latitude: result.latitude,
                            longitude: result.longitude
                        }))
                    }, error1 => {
                        setState(state => ({ ...state, inMessage: error1, inload: 'false' }))

                    })
                    .then(result2 => {
                        setState(state => ({ ...state, dataProduk: result2, inload: 'false' }))
                    },
                        error => {
                            setState(state => ({ ...state, inMessage: error }))
                        })
            }
        );


    }, [])

    const setKordinat = () => {
        setState(state => ({ ...state, dataProduk: [] }))
        setState(state => ({ ...state, inload: 'true' }))
        //Penggunaan Promise
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem('kordinat').then(response => {
                let data = JSON.parse(response);
                if (response !== null) {
                    if ((data.latitude == '' && data.latitude == null) || (data.longitude == '' && data.longitude == null)) {
                        setState(state => ({
                            ...state,
                            latlongName: 'Atur Lokasi',
                            inMessage: 'Lokasi mu tidak dalam jangkauan',

                        }))
                        reject('Lokasi mu tidak dalam jangkauan')
                    } else {
                        setState(state => ({
                            ...state,
                            latitude: data.latitude,
                            longitude: data.longitude,

                        }))
                        //calback promise
                        resolve(data)
                    }
                } else {
                    //calback promise reject
                    reject('Lokasi mu tidak dalam jangkauan')
                    setState(state => ({
                        ...state,
                        latlongName: 'Atur Lokasi',
                        inMessage: 'Lokasi mu tidak dalam jangkauan',

                    }))
                }

            }).catch(err => {
                console.log('err', err)
                //calback promise reject
                reject('Tidak dapat memuat data')
            })

        })


    }


    useEffect(() => {

        LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
        dataCat()

        // get id pengguna
        AsyncStorage.getItem('uid').then(uids => {
            let ids = uids;
            setState(state => ({
                ...state,
                id: ids
            }))
            console.log('iddddd', state.id)
        }).catch(err => {
            console.log('err', err)
        })

        return (() => {
            //Pemanggilan promise saat buka pertama
            setKordinat()
                .then(result => {
                    return produk(result)
                    return setState(state => ({
                        ...state,
                        latitude: result.latitude,
                        longitude: result.longitude
                    }))
                }, error1 => {
                    setState(state => ({ ...state, inMessage: error1, inload: 'false' }))

                })
                .then(result2 => {
                    setState(state => ({ ...state, dataProduk: result2, inload: 'false' }))

                },
                    error => {
                        setState(state => ({ ...state, inMessage: error }))
                    })

        })

    }, [state.id])


    const dataCat = () => {
        setState(state => ({ ...state, loading: true }))
        Axios.get(svr.url + 'category/' + svr.api)
            // Axios.get('https://market.pondok-huda.com/dev/react/category/')
            .then(result => {
                if (result.data.status == 200) {
                    console.log('result kategori =>', result)
                    setState(state => ({ ...state, dataKategori: result.data.data }));
                    // convert(result.data)
                    setState(state => ({ ...state, loading: false }))
                } else if (result.data.status == 500) {
                    console.log('error')
                    ToastAndroid.show("Gagal menampilkan detail kategori!", ToastAndroid.SHORT)
                    setState(state => ({ ...state, loading: false }))
                }
            }).catch(error => {
                console.log('error kategori => ', error)
                ToastAndroid.show("Gagal menerima data dari server!" + error, ToastAndroid.SHORT)
                setState(state => ({ ...state, loading: false }))
            })
    }

    // get produk yg kotak2 besar
    const produk = (json) => {
        //Penggunaan Promise
        return new Promise((resolve, reject) => {
            console.log('cekkkkkkk = ', json.latitude + '/' + json.longitude);
            Axios.get(svr.url + 'product/' + json.latitude + '/' + json.longitude + '/' + svr.api)
                // Axios.get('https://market.pondok-huda.com/dev/react/product/')
                .then(result => {
                    console.log('get produk', result.data);

                    if (result.data.status == 200) {
                        getCurrentWsh()
                        // setState(state => ({ ...state, dataProduk: result.data.data }))
                        //This Modif
                        setState(state => ({ ...state, inArea: 'true' }))
                        resolve(result.data.data)


                    } else if (result.data.status == 500) {
                        //This Modif
                        setState(state => ({ ...state, inArea: '500', }))
                        setState(state => ({ ...state, inMessage: 'Tidak dapat memuat data' }))
                        ToastAndroid.show("Internal server error", ToastAndroid.SHORT)
                        reject('Tidak dapat memuat data')
                    } else {
                        //This Modif
                        setState(state => ({ ...state, inArea: 'false', }))
                        setState(state => ({ ...state, inMessage: 'Lokasi kamu di luar jangkauan penjual' }))
                        //ToastAndroid.show("Data not found", ToastAndroid.SHORT)
                        reject('Lokasi kamu di luar jangkauan penjual')
                    }

                    // console.log('result2 =>', result.data.data)
                }).catch(error => {
                    //This Modif, pesan inMessage silahkan ganti
                    setState(state => ({ ...state, inArea: '500', }))
                    setState(state => ({ ...state, inMessage: 'Tidak dapat memuat data' }))
                    ToastAndroid.show("Gagal menerima data dari server!" + error, ToastAndroid.SHORT)
                    console.log('error produk =>', error)
                    reject('Tidak dapat memuat data')
                })

        })
    }

    const getCurrentWsh = () => {
        AsyncStorage.getItem('uid').then(uids => {
            let idmb = uids;
            console.log('cek wishwish = ', svr.url + 'wishlist/oid/' + idmb + '/' + svr.api)
            Axios.get(svr.url + 'wishlist/oid/' + idmb + '/' + svr.api)
                // Axios.get('https://market.pondok-huda.com/dev/react/wishlist/oid/' + idmb)
                .then(result => {
                    console.log('current Wishlish---->' + idmb);
                    let oid = result.data;
                    if (oid.data?.length > 0) {
                        // console.log('length--------> ' + oid.data.length);
                        //setState(state => ({...state, curWishlist: result.data.data}))
                        setSelectedItems(result.data.data)
                    } else {
                        // console.log('null--------> ' + oid.data.length);
                        setSelectedItems([])
                    }

                    //console.log('result2 =>', result.data.data)
                }).catch(error => {
                    console.log('error get current wish =>', error)
                    ToastAndroid.show("Gagal" + error, ToastAndroid.SHORT)
                })

        }).catch(err => {
            ToastAndroid.show("Gagal menerima data dari server!" + error, ToastAndroid.SHORT)
            console.log(err);
        })
    }
    // memasukan produk ke wishlist
    const selectItems = (id, retail, index) => {

        if ((selectedItems.ws_prd_id != state.dataProduk[index]?.prd_id) && (selectedItems.ws_mb_id != state.id)) {
            const body = {
                ws_mb_id: state.id,
                ws_rtl_id: retail,
                ws_prd_id: id
            }
            console.log('data -----=>', body);
            Axios.post(svr.url + 'wishlist/' + svr.api, body)
                // Axios.post('https://market.pondok-huda.com/dev/react/wishlist/', body)
                .then(response => {
                    console.log('wishlist -----=>', response.data);

                    if (response.data.status == 201) {
                        //alert('Produk telah masuk ke wishlist anda!')
                        ToastAndroid.show("Produk telah masuk ke wishlist anda!", ToastAndroid.SHORT)
                        //console.log('wishlist2 =>', response)
                        setSelectedItems([...selectedItems, body])
                    } else {
                        // alert('Gagal menambahkan ke wishlist anda!')
                        ToastAndroid.show("Gagal menambahkan ke wishlist anda!", ToastAndroid.SHORT)
                        console.log('Wishlish gagal =>', response)
                    }
                }).catch(error => {
                    ToastAndroid.show("Gagal menerima data dari server!" + error, ToastAndroid.SHORT)
                    console.log('error wishlist =>', error)
                })
        }

    };

    // unlike produk
    const deSelectItems = (id, retail, ws_mb_id) => {
        if (selectItems.length > 0) {
            if (selectedItems.some(i => i.ws_prd_id === id) && selectedItems.some(i => i.ws_mb_id == ws_mb_id)) {
                console.log('unloved' + id + '/' + ws_mb_id);
                console.log('https://market.pondok-huda.com/dev/react/wishlist/delete/' + ws_mb_id + '/' + id)
                Axios.delete(svr.url + 'wishlist/delete/' + ws_mb_id + '/' + id + '/' + svr.api)
                    // Axios.delete('https://market.pondok-huda.com/dev/react/wishlist/delete/' + ws_mb_id + '/' + id)
                    .then(response => {
                        console.log('response =>', response.data.status)
                        if (response.data.status == 200) {
                            ToastAndroid.show("Berhasil unlike produk!", ToastAndroid.SHORT)
                            const arraylst = d => d.ws_prd_id != id && d.ws_mb_id == ws_mb_id;
                            const arr3 = selectedItems.filter(arraylst);
                            return setSelectedItems(arr3);
                        } else {
                            ToastAndroid.show("Gagal unlike produk!", ToastAndroid.SHORT)
                            console.log('response =>', response)
                        }
                    }).catch(error => {
                        ToastAndroid.show("Gagal menerima data dari server!" + error, ToastAndroid.SHORT)
                        console.log('error =>', error)
                    })
            }
        }
    }

    // filter button
    const getSelected = (id, ws_mb_id) => {
        if (selectItems.length > 0) {
            if (selectedItems.some(i => i.ws_prd_id === id) && selectedItems.some(i => i.ws_mb_id === ws_mb_id)) {
                return true
            } else {
                return false
            }
        }
    }

    const convert = (datas) => {
        //this func => convert json to array
        let final = [];
        datas.data.map((v, i) => {
            final.push(v.ctg_name)
        })

        setState(state => ({ ...state, dataKategori: final })) //set result to state 
        //return JSON.stringify(final)
    }
    const selectProduk = (value, id) => {
        NavigatorService.navigate('Produk', { value, id: id })
    }

    const RenderItem = ({ item, index, onPress, selected, unLike, onPressProduk }) => (

        <View style={styles.card}>
            <Pressable onPress={() => onPressProduk()}>
                <View style={styles.txtProduct}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: toDp(10) }}>
                        <Image source={{ uri: item.thumbnail }} style={styles.imgProduct} />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: toDp(10) }}>
                        <View style={{ justifyContent: 'center', width: '70%' }}>
                            <Text numberOfLines={2} style={styles.textproduct}>{item.product_name}</Text>
                        </View>
                        <View>
                            {
                                selected == false ?
                                    <TouchableOpacity onPress={() => onPress()} key={index}>
                                        <Image source={allLogo.love} style={{ width: toDp(30), height: toDp(30), tintColor: 'black', marginLeft: toDp(13) }} />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity onPress={unLike} key={index}>
                                        <Image source={allLogo.hati} style={{ width: toDp(20), height: toDp(18) }} />
                                    </TouchableOpacity>
                            }
                        </View>
                    </View>
                    {/* <Text style={styles.harga}>{item.price}</Text> */}
                    <NumberFormat
                        value={item.price}
                        displayType={'text'}
                        thousandSeparator={'.'}
                        decimalSeparator={','}
                        prefix={'Rp. '}
                        renderText={formattedValue => <Text style={{ color: '#F83308', fontWeight: '800', fontSize: toDp(15) }}>{formattedValue}</Text>} // <--- Don't forget this!
                    />
                    <Text style={{ marginTop: toDp(5), fontSize: toDp(10) }}>{item.retail_name}</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: toDp(10), }}>
                        <Image source={allLogo.address} style={styles.address} />
                        <Text style={styles.dariKota}>{item.retailaddres}</Text>
                    </ View>
                    <Text style={{left: toDp(15), fontSize:toDp(12)}}>{item.jarak.substring(0,3)} KM</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: toDp(2), }}>
                        <Image source={allLogo.icstar} style={styles.star} />

                        <Text style={styles.bintang}>{item.lainnya.rating}</Text>

                        <Text style={styles.terjual}>|| {item.lainnya.terjual} Terjual</Text>
                    </View>
                </ View>
            </Pressable>
        </ View>

    );

    const CardProduct = () => {
        return (
            <FlatList style={{ backgroundColor: 'white', minHeight: toDp(400), width: width, marginTop: toDp(-10), }}
                columnWrapperStyle={{ justifyContent: 'space-between', marginHorizontal: toDp(15) }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    bottom: toDp(13),
                    paddingBottom: toDp(3),

                }}

                numColumns={2}
                data={state.dataProduk}
                renderItem={({ item, index }) => (
                    <RenderItem
                        item={item}
                        index={index}
                        onPress={() => selectItems(item.prd_id, item.retail, index)}
                        selected={getSelected(item.prd_id, state.id)}
                        unLike={() => deSelectItems(item.prd_id, item.retail, state.id)}
                        onPressProduk={() => selectProduk(item.prd_id)}
                    />
                )}
                KeyExtractor={item => item}
                ListFooterComponent={() => <View style={{ height: toDp(100) }} />}
            />
        )
    }

    const getKategori = (value, ctg_id, ctg_name,) => {
        console.log('cek log kategori = ', value);
        console.log('cek log kategori = ', ctg_name);
        console.log('cek log kategori = ', ctg_id);
        NavigatorService.navigate('Detailkatagori', { value, ctg_id: ctg_id, ctg_name: ctg_name, lat: state.lat, long: state.long })
    }

    const renderKategori = (item, index, onPress) => (
        <Pressable style={styles.presKategori} onPress={() => onPress()}>
            <View style={styles.kategori}>
                <Text style={styles.textKat}>{item.ctg_name}</Text>
            </ View>
        </Pressable>
    );


    return (
        <View style={styles.container}>
            <Search onChangeText={(text) => setSrc(text)}
                onChart={() => NavigatorService.navigate('Keranjang', { id: state.id })}
                onWish={() => NavigatorService.navigate('Wishlist')}
            />

            <ScrollView style={styles.ScrollView}>
                {/* <Search onChangeText={(text)=> setSrc(text)} /> */}
                {/* <View style={{width: '100%', marginTop: toDp(1), flexDirection: 'column', height: toDp(100)}}> */}
                <View style={{ width: '100%', marginVertical: 5 }}>
                    <Text style={{ fontSize: toDp(10), fontWeight: 'bold', fontSize: toDp(13), marginLeft: toDp(14) }}>Kategori</Text>
                </View>
                <View style={styles.content}>
                    <FlatList
                        horizontal={true}
                        style={styles.viewCat}
                        data={state.dataKategori}
                        // ItemSeparatorComponent={Separator}
                        renderItem={({ item, index, value }) => {
                            return (
                                renderKategori(item, index, () => getKategori(value, item.ctg_id, item.ctg_name))
                            )
                        }}
                    />
                </View>

                <View style={styles.textVocher}>
                    <View style={styles.judul1}>
                        <Text style={[styles.textVocher, { fontWeight: 'bold' }]}>Promo dan Vocher</Text>
                    </View>
                </View>
                <View style={styles.contentVocher}>
                    <Pressable style={{ left: toDp(65), top: toDp(15) }} onPress={() => alert('coba')}>
                        <View style={[styles.vocher, { minHeight: toDp(95) }]}>
                            <Image source={allLogo.diskon} style={styles.imgVocher} />
                            <Text style={styles.titleVocher}>Diskon</Text>
                        </View>
                    </Pressable>

                    <Pressable style={{ left: toDp(65), top: toDp(15) }} onPress={() => alert('coba')}>
                        <View style={[styles.vocher, { minHeight: toDp(95) }]}>
                            <Image source={allLogo.cashback} style={styles.imgVocher} />
                            <Text style={styles.titleVocher}>Casback</Text>
                        </View>
                    </Pressable>

                    <Pressable style={{ left: toDp(65), top: toDp(15) }} onPress={() => alert('coba')}>
                        <View style={[styles.vocher, { minHeight: toDp(95) }]}>
                            <Image source={allLogo.gratisongkir} style={styles.imgVocher} />
                            <Text style={styles.titleVocher}>Gratis Ongkir</Text>
                        </View>
                    </Pressable>
                </View>
                <View style={styles.titleContent}>
                    <Text style={styles.textContent}>Bahan Bangunan Berkualitas</Text>
                </View>

                {/* //This Modif */}

                {
                    state.inload == 'true' ?
                        <View style={{ marginBottom: toDp(50) }}>
                            <ActivityIndicator size="large" color="#0000ff" />
                        </View>
                        : <></>

                }

                {/* //This Modif */}
                {state.inArea == 'true' ?
                    <CardProduct />

                    : state.inArea == 'false' ?
                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <Text>{state.inMessage}</Text>
                        </View>
                        :
                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <Text>{state.inMessage}</Text>
                        </View>
                }

            </ScrollView>

            {/* FOOTER */}
            <View style={styles.buttonSubmit}>
                {/* <Pressable style={styles.btnSimpan} onPress={() => editAlamat()}>
                    <Text style={{ color: 'white' }}>Simpan</Text>
                </Pressable> */}
                <Pressable style={styles.btnmenu} onPress={() => NavigatorService.navigate('Beranda')}>
                    <Image source={allLogo.ichome} style={styles.iconik} />
                    <Text style={{ color: 'white', fontSize: toDp(11) }}>Beranda</Text>
                </Pressable>
                <Pressable style={styles.btnmenu} onPress={() => NavigatorService.navigate('Katagori')}>
                    <Image source={allLogo.iccategory} style={styles.iconik} />
                    <Text style={{ color: 'white', fontSize: toDp(11) }}>Kategori</Text>
                </Pressable >
                <Pressable style={styles.btnmenu} onPress={() => NavigatorService.navigate('Notification', { id: state.id })}>
                    <Image source={allLogo.icnotification} style={styles.iconik} />
                    <Text style={{ color: 'white', fontSize: toDp(11) }}>Notifikasi</Text>
                </Pressable>
                <Pressable style={styles.btnmenu} onPress={() => NavigatorService.navigate('Profilone')}>
                    <Image source={allLogo.icprofil} style={styles.iconik} />
                    <Text style={{ color: 'white', fontSize: toDp(11) }}>Profil</Text>
                </Pressable>
            </View>
        </View>
    )

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    iconik: {
        width: toDp(28),
        height: toDp(26),
        resizeMode: 'contain',
        tintColor: 'white'
    },
    btnmenu: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: toDp(10),
    },
    buttonSubmit: {
        shadowColor: "#000",
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: toDp(10),
        width: toDp(340),
        height: toDp(52),
        flexDirection: 'row',
        backgroundColor: '#2A334B',
        borderRadius: toDp(10)
    },
    title: {
        fontSize: toDp(13),
        color: 'black',
        top: toDp(25),
        right: toDp(75)
    },
    content: {
        top: toDp(5),
        backgroundColor: 'white',
        height: toDp(75)
    },
    presable: {
        justifyContent: 'center',
        top: toDp(30)
    },
    textButton1: {
        right: toDp(130),
        backgroundColor: '#C4C4C4',
        height: toDp(11),
        width: toDp(50),
        borderRadius: toDp(10),
        textAlign: 'center'
    },
    textButton2: {
        top: toDp(-11),
        right: toDp(58),
        backgroundColor: '#C4C4C4',
        height: toDp(11),
        width: toDp(80),
        borderRadius: toDp(10),
        textAlign: 'center'
    },
    textButton3: {
        top: toDp(-22),
        right: toDp(-29),
        backgroundColor: '#C4C4C4',
        height: toDp(11),
        width: toDp(80),
        borderRadius: toDp(10),
        textAlign: 'center'
    },
    textButton4: {
        top: toDp(-33),
        right: toDp(-116),
        backgroundColor: '#C4C4C4',
        height: toDp(11),
        width: toDp(80),
        borderRadius: toDp(10),
        textAlign: 'center'
    },
    textButton5: {
        top: toDp(-28),
        right: toDp(130),
        backgroundColor: '#C4C4C4',
        height: toDp(11),
        width: toDp(50),
        borderRadius: toDp(10),
        textAlign: 'center'
    },
    textButton6: {
        top: toDp(-39),
        right: toDp(49),
        backgroundColor: '#C4C4C4',
        height: toDp(13),
        width: toDp(100),
        borderRadius: toDp(10),
        textAlign: 'center'
    },
    textButton7: {
        top: toDp(-51),
        right: toDp(-48),
        backgroundColor: '#C4C4C4',
        height: toDp(11),
        width: toDp(80),
        borderRadius: toDp(10),
        textAlign: 'center'
    },
    product: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        backgroundColor: '#C4C4C4',
        textAlign: 'center',
        borderRadius: toDp(10),
        width: toDp(70),
        height: toDp(70),
        fontSize: toDp(10),
        margin: toDp(10),
        paddingTop: toDp(53)
    },
    imgProduk: {
        position: 'absolute',
        zIndex: 1,
        marginLeft: toDp(10),
        top: toDp(10)
    },
    text2: {
        backgroundColor: 'red',
        textAlign: 'center',
        borderRadius: toDp(10),
        width: toDp(64),
        height: toDp(64),
        margin: toDp(5),
        color: 'white',
        paddingTop: toDp(35)
    },
    textVocher: {
        right: toDp(32),
        top: toDp(-8),
        fontSize: toDp(13)
    },
    judul: {
        left: toDp(89)
    },
    judul1: {
        left: toDp(79)
    },
    contentVocher: {
        flexDirection: 'row',
        right: toDp(65),
        bottom: toDp(20),
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    vocher: {
        // top: toDp(10),
        backgroundColor: '#C4C4C4',
        margin: toDp(5),
        paddingRight: toDp(20),
        // left: toDp(65),
        borderRadius: toDp(10)
    },
    titleVocher: {
        textAlign: 'center',
        left: toDp(10),
        bottom: toDp(8)
    },
    imgVocher: {
        left: toDp(10)
    },
    textContent: {
        bottom: toDp(12),
        right: toDp(83),
        fontSize: toDp(13),
        fontWeight: 'bold',
    },
    titleContent: {
        left: toDp(97),
        paddingBottom: toDp(5),
        marginTop: toDp(20)
    },
    card: {
        backgroundColor: '#FFF',
        top: toDp(10),
        padding: toDp(0),
        marginVertical: toDp(5),
        // marginHorizontal: toDp(16),
        borderRadius: toDp(10),
        minHeight: toDp(221),
        // right: toDp(2),
        width: '48%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    bintang: {
        left: toDp(5)
    },
    terjual: {
        left: toDp(3),
        marginRight: 0,
        fontSize: toDp(12)
    },
    address: {
        width: toDp(12),
        height: toDp(12)
    },
    star: {
        right: toDp(0)
    },
    dariKota: {
        left: toDp(3),
        fontSize: toDp(12)
    },
    textproduct: {
        textTransform: 'uppercase',
        fontSize: toDp(12),
    },
    txtProduct: {
        borderRadius: toDp(10),
        padding: toDp(20)
    },
    imgProduct: {
        width: toDp(100),
        height: toDp(100)
    },
    presKategori: {
        marginRight: toDp(8),
        marginLeft: toDp(8),
        backgroundColor: '#2B324C',
        height: toDp(48),
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
    kategori: {
        width: toDp(100),
        height: toDp(45),
        justifyContent: 'center',
        alignItems: 'center',
    },
    textKat: {
        fontSize: toDp(12),
        fontWeight: 'bold',
        color: 'white'
    }
});

export default Katagori;
