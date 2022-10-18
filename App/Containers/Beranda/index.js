import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar,
    ImageBackground,
    Pressable,
    AsyncStorage,
    ScrollView,
    FlatList,
    Dimensions,
    TextInput,
    TouchableOpacity,
    LogBox,
    ToastAndroid,
    PermissionsAndroid,
    ActivityIndicator
} from "react-native";
import { color, img } from '@Assets';
import { toDp } from '@percentageToDP';
import { allLogo } from '@Assets';
import NavigatorService from '@NavigatorService'
import Carousel, { Pagination } from "react-native-snap-carousel";
import Search from '@Search'
import LinearGradient from 'react-native-linear-gradient'
import Axios from "axios";
import Geolocation from '@react-native-community/geolocation';
import NumberFormat from 'react-number-format';
import { svr } from "../../Configs/apikey";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
const { width, height } = Dimensions.get('window');

const Beranda = (props) => {

    const [wish, setWish] = useState([])
    const [pid, setPid] = useState('MB000000032')
    const [selectedItems, setSelectedItems] = useState([]);
    const [current, setCurrent] = useState(0)
    const [text, setText] = useState('');
    const [src, setSrc] = useState(null);
    const [state, setState] = useState({
        id: '',
        arrayUsers: [],
        arrayData: [],
        lainnya: '',
        arrayRetail: [],
        dataWish: [],
        loading: false,
        ws_mb_id: '',
        ws_rtl_id: '',
        ws_prd_id: '',
        id_retail: 'RTL000001',
        curWishlist: [],
        isHide: '',
        latitude: '',
        longitude: '',
        latlongName: '',
        lat: [],
        long: [],
        inArea: 'false',
        inMessage: '',
        inload: 'true',
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
                        setState(state => ({ ...state, arrayData: result2, inload: 'false' }))
                    },
                        error => {
                            setState(state => ({ ...state, inMessage: error }))
                        })
            }
        );


    }, [])

    useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
        listRetail()


        // get id pengguna
        AsyncStorage.getItem('uid').then(uids => {
            let ids = uids;
            setState(state => ({
                ...state,
                id_member: ids
            }))
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
                    setState(state => ({ ...state, arrayData: result2, inload: 'false' }))

                },
                    error => {
                        setState(state => ({ ...state, inMessage: error }))
                    })

        })


    }, [state.id_member])



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
                        // setState(state => ({ ...state, arrayData: result.data.data }))
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


    // get nama toko
    const listRetail = () => {
        Axios.get(svr.url + 'retail/' + svr.api)
            // Axios.get('https://market.pondok-huda.com/dev/react/retail/')
            .then(result => {
                // console.log('get retail', result);
                setState(state => ({ ...state, arrayRetail: result.data.data }))
                // console.log('result2 =>', result.data.data)

            }).catch(error => {
                ToastAndroid.show("Gagal menerima data dari server!" + error, ToastAndroid.SHORT)
                console.log('error retail =>', error)
            })
    }


    //get current wishlist datas
    const getCurrentWsh = () => {
        AsyncStorage.getItem('uid').then(uids => {
            let idmb = uids;
            Axios.get(svr.url + 'wishlist/oid/' + idmb + '/' + svr.api)
                // Axios.get('https://market.pondok-huda.com/dev/react/wishlist/oid/'+idmb)
                .then(result => {
                    console.log('current Wishlish---->' + idmb);
                    let oid = result.data;
                    if (oid.data?.length > 0) {
                        //console.log('length--------> '+oid.data?.length);
                        //setState(state => ({...state, curWishlist: result.data.data}))
                        setSelectedItems(result.data.data)
                    } else {
                        //console.log('null--------> '+oid.data?.length);
                        setSelectedItems([])
                    }

                    //console.log('result2 =>', result.data.data)
                }).catch(error => {
                    console.log('error get current wish =>', error)
                    ToastAndroid.show("error get current wish!", ToastAndroid.SHORT)
                })

        }).catch(err => {
            ToastAndroid.show("Gagal menerima data dari server!" + err, ToastAndroid.SHORT)
            console.log(err);
        })
    }


    // memasukan produk ke wishlist
    const selectItems = (id, retail, index) => {

        if ((selectedItems.ws_prd_id != state.arrayData[index]?.prd_id) && (selectedItems.ws_mb_id != state.id_member)) {
            const body = {
                ws_mb_id: state.id_member,
                ws_rtl_id: retail,
                ws_prd_id: id
            }
            console.log('data -----=>', body);
            Axios.post(svr.url + 'wishlist/' + svr.api, body)
                // Axios.post('https://market.pondok-huda.com/dev/react/wishlist/', body)
                .then(response => {
                    console.log('wishlist -----=>', response);

                    if (response.data.status == 201) {
                        //alert('Produk telah masuk ke wishlist anda!')
                        ToastAndroid.show("roduk telah masuk ke wishlist anda!", ToastAndroid.SHORT)
                        //console.log('wishlist2 =>', response)
                        setSelectedItems([...selectedItems, body])
                    } else {
                        // alert('Gagal menambahkan ke wishlist anda!')
                        ToastAndroid.show("Gagal menambahkan ke wishlist anda!", ToastAndroid.SHORT)
                        console.log('Wishlish gagal =>', response)
                    }
                }).catch(error => {
                    ToastAndroid.show("Gagal menerima data dari server!" + err, ToastAndroid.SHORT)
                    console.log('error wishlist =>', error)
                })
        }

    };


    // unlike produk
    const deSelectItems = (id, retail, ws_mb_id) => {
        if (selectItems.length > 0) {
            if (selectedItems.some(i => i.ws_prd_id === id) && selectedItems.some(i => i.ws_mb_id == ws_mb_id)) {
                //console.log('unloved'+id+'/'+ws_mb_id);
                Axios.delete(svr.url + 'wishlist/delete/' + ws_mb_id + '/' + id + '/' + svr.api)
                    // Axios.delete('https://market.pondok-huda.com/dev/react/wishlist/delete/'+ws_mb_id+'/'+id)
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
                        ToastAndroid.show("Gagal menerima data dari server!" + err, ToastAndroid.SHORT)
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



    const renderItemExpore = (item, index) => {
        // console.log('item', item);
        return (
            <View style={styles.viewRenderExplore}>
                <View style={styles.viewImage}>
                    <LinearGradient colors={['#C4C4C4', 'transparent']} style={styles.gradientTop} />
                    <Image source={require('../.././Assets/img/bahan.jpg')} style={styles.imageProfile} />
                    <LinearGradient colors={['transparent', '#3A3A3ACC']} style={styles.gradientBottom} />
                </View>
                <View style={styles.viewImageContent}>
                    <TouchableOpacity style={styles.touchSilangExplore} onPress={() => alert('In Progress')}>
                        <Image source={allLogo.icResidentSilang} style={styles.icResidentSilang} />
                    </TouchableOpacity>
                    <View style={styles.viewDetail}>
                        <Text style={styles.textNameExplore}>{item.item.rtl_name}</Text>
                        <Text style={styles.textWork}>{item.item.rtl_addres}</Text>
                        <Text style={styles.textDistance}>Buka dari Jam 10.00 AM</Text>
                    </View>
                </View>
            </View>
        )
    }

    const selectProduk = (value, id) => {
        NavigatorService.navigate('Produk', { value, id: id })
        console.log(id);
    }



    const RenderItem = ({ item, index, onPress, selected, unLike, onPressProduk }) => (
        // <Pressable onPress={()=> alert('Produk : '+index)}>
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
                    <Text style={{ marginTop: toDp(5), fontSize: toDp(10) }}>{item.retail_name}</Text>
                    <NumberFormat
                        value={item.price}
                        displayType={'text'}
                        thousandSeparator={'.'}
                        decimalSeparator={','}
                        prefix={'Rp. '}
                        renderText={formattedValue => <Text style={{ color: '#F83308', fontWeight: '800', fontSize: toDp(15) }}>{formattedValue}</Text>} // <--- Don't forget this!
                    />
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
            <FlatList style={{ backgroundColor: 'white', minHeight: toDp(400), width: width, marginTop: toDp(10) }}
                columnWrapperStyle={{ justifyContent: 'space-between', marginHorizontal: 15 }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop: toDp(3),
                    paddingBottom: toDp(3),

                }}

                numColumns={2}
                data={state.arrayData}
                renderItem={({ item, index }) => (
                    <RenderItem
                        item={item}
                        index={index}
                        onPress={() => selectItems(item.prd_id, item.retail, index)}
                        selected={getSelected(item.prd_id, state.id_member)}
                        unLike={() => deSelectItems(item.prd_id, item.retail, state.id_member)}
                        onPressProduk={() => selectProduk(item.prd_id)}
                    />

                )}
                KeyExtractor={item => item}
                ListFooterComponent={() => <View style={{ height: toDp(100) }} />}
            />

        )
    }


    const setKordinat = () => {
        setState(state => ({ ...state, arrayData: [] }))
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




    return (
        <View style={styles.container}>
            <Search onChangeText={(text) => setSrc(text)}
                onChart={() => NavigatorService.navigate('Keranjang', { id: state.id })}
                onWish={() => NavigatorService.navigate('Wishlist')}
            />


            <ScrollView style={styles.ScrollView}>
                <View style={{ alignItems: 'center', marginTop: toDp(10), }}>
                    <TouchableOpacity style={styles.btnLokasi} onPress={() => NavigatorService.navigate('Map')}>
                        <Image source={allLogo.map} style={styles.ikon} />
                        <View>
                            <Text style={{ marginTop: toDp(5), marginLeft: toDp(15), fontSize: toDp(11) }}>Lokasi kamu</Text>
                            <Text style={{ marginLeft: toDp(15), marginTop: toDp(5), fontSize: toDp(13), fontWeight: '800' }}>
                                {state.latitude != '' || state.longitude != '' ?
                                    state.latitude + ', ' + state.longitude
                                    :
                                    'Atur Lokasi'
                                }
                            </Text>
                        </View>
                    </TouchableOpacity>

                </View>

                <View style={{ width: '100%', height: toDp(230), marginTop: toDp(-5), backgroundColor: 'white' }}>
                    <Carousel
                        layout={"default"}
                        data={state.arrayRetail}
                        sliderWidth={width}
                        itemWidth={toDp(350)}
                        renderItem={(item, index) => renderItemExpore(item, index)}
                        onSnapToItem={index => setState(state => ({ ...state, activeIndex: index }))}
                    />
                </View>

                <View style={styles.content}>
                    <Pressable style={styles.presable} onPress={() => NavigatorService.navigate('Tokobangunan')}>
                        <View style={{ borderWidth: toDp(0.5), borderRadius: toDp(10), padding: toDp(3), borderColor: 'grey' }}>
                            <Image source={allLogo.toko} style={styles.icon} />
                        </View>
                        <Text style={[styles.textIcon, { textAlign: 'center', fontSize: toDp(12) }]}>Toko{'\n'}Bangunan</Text>
                    </Pressable>

                    <Pressable style={styles.presable} onPress={() => NavigatorService.navigate('underConstruction')}>
                        <View style={{ borderWidth: toDp(0.5), borderRadius: toDp(10), padding: toDp(3), borderColor: 'grey' }}>
                            <Image source={allLogo.worker} style={styles.icon} />
                        </View>
                        <Text style={[styles.textIcon, { textAlign: 'center', fontSize: toDp(12) }]}>Jasa{'\n'}Tukang</Text>
                    </Pressable>

                    <Pressable style={styles.presable} onPress={() => NavigatorService.navigate('underConstruction')}>
                        <View style={{ borderWidth: toDp(0.5), borderRadius: toDp(10), padding: toDp(3), borderColor: 'grey' }}>
                            <Image source={allLogo.arsitek} style={styles.icon} />
                        </View>
                        <Text style={[styles.textIcon, { textAlign: 'center', fontSize: toDp(12) }]}>Konsultan{'\n'}Arsitek</Text>
                    </Pressable>

                    <Pressable style={styles.presable} onPress={() => NavigatorService.navigate('underConstruction')}>
                        <View style={{ borderWidth: toDp(0.5), borderRadius: toDp(10), padding: toDp(3), borderColor: 'grey' }}>
                            <Image source={allLogo.donation} style={styles.icon} />
                        </View>
                        <Text style={[styles.textIcon, { textAlign: 'center', fontSize: toDp(12) }]}>Donasi{'\n'}Bangunan</Text>
                    </Pressable>

                </View>
                {state.isHide != '' ?
                    <>
                        <Text>id: {JSON.stringify(state.id_member)}</Text>
                        <Text>Selected: {JSON.stringify(selectedItems)}</Text>
                    </>
                    : null
                }

                {/* //This Modif */}

                {
                    state.inload == 'true' ?
                        <ActivityIndicator size="large" color="#0000ff" />
                        : <></>

                }

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
                <Pressable style={styles.btnmenu} onPress={() => NavigatorService.navigate('Katagori', { latitude: state.latitude, longitude: state.longitude })}>
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
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        // backgroundColor: color.back,
    },
    btnLokasi: {
        backgroundColor: 'white',
        width: toDp(335),
        height: toDp(60),
        flexDirection: 'row',
        borderRadius: toDp(10),
        marginBottom: toDp(10),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 3,
    },
    ikon: {
        height: toDp(28),
        width: toDp(28),
        marginTop: toDp(15),
        marginLeft: toDp(10),
        resizeMode: 'contain',
        tintColor: '#f83308'
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
    content: {
        flex: 1,
    },
    textIcon: {
        fontSize: toDp(10),
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
        fontSize:toDp(12)
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
        fontSize:toDp(12)
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
    imgProfile: {
        width: toDp(80),
        height: toDp(80),
        borderRadius: toDp(10),
    },
    viewRenderExplore: {
        backgroundColor: 'white',
        width: '100%',
        height: toDp(200),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: toDp(10),
        marginTop: toDp(0),
        padding: toDp(10),
        top: toDp(10)
    },
    viewImage: {
        width: '100%',
        height: toDp(200),
        resizeMode: 'contain',
        position: 'absolute',
    },
    viewImageContent: {
        width: '100%',
        height: toDp(200),
        zIndex: 2
    },
    imageProfile: {
        width: '100%',
        height: '100%',
        borderRadius: toDp(10),
        position: 'absolute',
        resizeMode: 'contain',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gradientTop: {
        width: '100%',
        height: toDp(130),
        top: toDp(0),
        borderTopLeftRadius: toDp(10),
        borderTopRightRadius: toDp(10),
        zIndex: 1,
    },
    gradientBottom: {
        width: '100%',
        height: toDp(130),
        borderBottomLeftRadius: toDp(10),
        borderBottomRightRadius: toDp(10),
        position: 'absolute',
        bottom: toDp(0),
    },
    icResidentSilang: {
        width: toDp(28),
        height: toDp(28),
    },
    touchSilangExplore: {
        padding: toDp(4),
        position: 'absolute',
        right: toDp(16),
        top: toDp(16),
    },
    viewDetail: {
        position: 'absolute',
        bottom: toDp(16),
        left: toDp(16),
        zIndex: 2
    },
    textNameExplore: {
        fontSize: toDp(24),
        color: '#FFFFFF',
    },
    textWork: {
        marginTop: toDp(4),
        fontSize: toDp(14),
        color: '#FFFFFF',
    },
    textDistance: {
        marginTop: toDp(4),
        fontSize: toDp(14),
        color: '#FFFFFF',
    },
    content: {
        width: toDp(350),
        height: toDp(70),
        bottom: toDp(5),
        flexDirection: 'row',
        left: toDp(5),
        backgroundColor: 'white'
    },
    presable: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: toDp(8),
        marginHorizontal: toDp(5),
    },
    icon: {
        height: toDp(38),
        width: toDp(38),
        resizeMode: 'contain',
        tintColor: '#f83308'
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
    btnSimpan: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2A334B',
        width: toDp(335),
        height: toDp(48),
        borderRadius: toDp(10),
        marginTop: toDp(25),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 2,
    },

})

export default Beranda;
