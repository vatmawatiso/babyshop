import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    ActivityIndicator,
    Alert,
    Pressable,
    TouchableOpacity,
    AsyncStorage,
    Dimensions,
    ScrollView,
    RefreshControl,
    FlatList,
    LogBox
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import NavigatorService from '@NavigatorService'
import Loader from '@Loader'
import Header from '@Header'
import Axios from "axios";
import NumberFormat from 'react-number-format';
import { svr } from "../../Configs/apikey";

const { width, height } = Dimensions.get('window')

const profilToko = (props) => {
    const [src, setSrc] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);
    const [state, setState] = useState({
        arrayData: [],
        dataCat: [],
        login: '',
        retail: '',
        id: '',
        product_name: '',
        loading: false,
        showPro: false,
        showCat: true,
        option: {
            width: 750,
            height: 750,
            cropping: true,
        },
        ws_mb_id: '',
        ws_rtl_id: '',
        ws_prd_id: '',
        curWishlist: [],

    })
    useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
        produkRetail()

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

        // return (() => {
        //     getCategori()
        // })

        console.log('loooo');
        props.navigation.addListener(
            'didFocus',
            payload => {
                // alert('load')
            }
        );
    }, [state.id_member])

    // get produk berdasarkan id retail 
    const produkRetail = () => {
        let rid = props.navigation.state.params.id
        Axios.get(svr.url + 'product/retail/' + rid + '/' + svr.api)
            // Axios.get('https://market.pondok-huda.com/dev/react/product/?rtl_id=' + rid)
            .then(result => {
                if (result.data.status == 200) {
                    console.log('result', JSON.stringify(result));
                    getCurrentWsh()
                    setState(state => ({
                        ...state, arrayData: result.data.data
                    }))
                    // console.log('retail nama', state.retailid)
                    setState(state => ({ ...state, showPro: true }))
                    setState(state => ({ ...state, showCat: false }))
                } else {
                    alert('Produk Belum Ditambahkan')
                    NavigatorService.navigate('Tokobangunan')
                }

            }).catch(error => {
                console.log(error)
            })
    }

    // get kategori masih diambil dari semua 
    const getCategori = () => {
        // setState(state => ({...state, loading: true }))
        Axios.get(svr.url + 'category/' + svr.api)
            // Axios.get('https://market.pondok-huda.com/dev/react/category/')
            .then(result => {
                // handle success
                setState(state => ({ ...state, dataCat: result.data.data }))
                setState(state => ({ ...state, showPro: false }))
                setState(state => ({ ...state, showCat: true }))
                console.log('----Katagori=====>' + JSON.stringify(result.data.data));
                // alert(JSON.stringify(result.data));

            }).catch(err => {
                //console.log(err)
                alert('Gagal menerima data dari server!' + err)
                setState(state => ({ ...state, loading: false }))
            })
    }


    //get current wishlist datas
    const getCurrentWsh = () => {
        AsyncStorage.getItem('uid').then(uids => {
            let idmb = uids;

            // Axios.get(svr.url+'wishlist/oid/'+idmb+'/'+svr.api,data)
            Axios.get(svr.url + 'wishlist/oid/' + idmb + '/' + svr.api)
                // Axios.get('https://market.pondok-huda.com/dev/react/wishlist/oid/' + idmb)
                .then(result => {
                    console.log('current Wishlish---->' + state.id_member);
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
                    console.log(error)
                })

        }).catch(err => {
            console.log(err);
        })
    }

    // memasukan produk ke wishlist
    const selectItems = (id, retail, index) => {

        if ((selectedItems.ws_prd_id != state.arrayData[index]?.id) && (selectedItems.ws_mb_id != state.id_member)) {
            const body = {
                ws_mb_id: state.id_member,
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
                        //console.log('wishlist2 =>', response)
                        setSelectedItems([...selectedItems, body])
                    } else {
                        alert('Gagal menambahkan ke wishlist anda!')
                        console.log('Wishlish gagal =>', response)
                    }
                }).catch(error => {
                    console.log('error wishlist =>', error)
                })
        }

    };

    // unlike produk
    const deSelectItems = (id, retail, ws_mb_id) => {
        if (selectItems.length > 0) {
            if (selectedItems.some(i => i.ws_prd_id === id) && selectedItems.some(i => i.ws_mb_id == ws_mb_id)) {
                //console.log('unloved'+id+'/'+ws_mb_id);
                Axios.delete(svr.url + '/wishlist/delete/' + ws_mb_id + '/' + id + '/' + svr.api)
                    .then(response => {
                        console.log('response =>', response.data.status)
                        if (response.data.status == 200) {
                            const arraylst = d => d.ws_prd_id != id && d.ws_mb_id == ws_mb_id;
                            const arr3 = selectedItems.filter(arraylst);
                            return setSelectedItems(arr3);
                        } else {
                            console.log('response =>', response)
                        }
                    }).catch(error => {
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

    const selectProduk = (value, id) => {
        NavigatorService.navigate('Produk', { value, id: id })
        console.log(id);
    }

    const RenderItem = ({ item, index, onPress, selected, unLike, onPressProduk }) => (
        // <Pressable onPress={()=> alert('Produk : '+index)}>
        <View style={styles.card}>
            <Pressable onPress={() => onPressProduk()}>
                <View style={styles.txtProduct}>
                    <Image source={{ uri: item.thumbnail }} style={styles.imgProduct} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.textproduct}>{item.product_name.substr(0, 8)}</Text>
                        <View>
                            {
                                selected == false ?
                                    <TouchableOpacity onPress={() => onPress()} key={index}>
                                        <Image source={allLogo.icwishlist} style={{ width: toDp(20), height: toDp(20) }} />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity onPress={unLike} key={index}>
                                        <Image source={allLogo.heart} style={{ width: toDp(20), height: toDp(20) }} />
                                    </TouchableOpacity>
                            }
                        </View>
                    </View>
                    <NumberFormat
                        value={item.price}
                        displayType={'text'}
                        thousandSeparator={'.'}
                        decimalSeparator={','}
                        prefix={'Rp. '}
                        renderText={formattedValue => <Text style={{ color: '#F83308', fontWeight: '800' }}>{formattedValue}</Text>} // <--- Don't forget this!
                    />
                    <Text style={styles.bintang}>{item.retailaddres.substr(0, 12)}</Text>
                    <Text style={styles.dariKota}>{item.retail.substr(0, 12)}</Text>
                </ View>
            </Pressable>
        </ View>
    );

    //   kotak kotak produk
    const CardProduct = () => {
        return (
            <FlatList style={{ backgroundColor: 'white', width: width, marginTop: toDp(10) }}
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
                        onPress={() => selectItems(item.id, item.retailid, index)}
                        selected={getSelected(item.id, state.id_member)}
                        unLike={() => deSelectItems(item.id, item.retailid, state.id_member)}
                        onPressProduk={() => selectProduk(item.id)}
                    />

                )}
                KeyExtractor={item => item}
                ListFooterComponent={() => <View style={{ height: 500 }} />}
            />

        )
    }

    const CardCategory = () => {
        let rid2 = props.navigation.state.params.id
        return (
            <View style={styles.BodyKategori}>
                <View style={{ top: toDp(10), justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ marginTop: toDp(0) }}>
                        <FlatList
                            numColumns={1}
                            data={state.dataCat}
                            renderItem={({ item, index, value }) => {
                                return (
                                    ListKategori(item, index, () => NavigatorService.navigate('kategoriProDariCilent', { ctg_id: item.ctg_id, rid2, id: state.id }))
                                )
                            }}
                            ListFooterComponent={() => <View style={{ height: toDp(180), width: toDp(320) }} />}
                        />
                    </View>
                </View>
            </View>
        )
    }

    const ListKategori = (item, index, onPress) => {
        return (
            <View style={{ marginTop: toDp(0), width: '100%', marginBottom: toDp(10), }}>
                <View style={styles.viewKategori}>

                    <View style={styles.viewKate}>
                        <Text style={{ fontSize: toDp(13), marginLeft: toDp(20), }}>{item.ctg_name}</Text>
                    </View>

                    <TouchableOpacity style={{backgroundColor:'#fff', right:toDp(10)}} onPress={() => onPress()}>
                        <View style={styles.viewBuka}>
                            <Image source={allLogo.iclineblack} style={styles.iclineright} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            // <View style={{ marginTop: toDp(0), width: '100%' }}>
            //     <View style={{ flexDirection: 'row', marginHorizontal: toDp(0), height: toDp(50), alignItems: 'center', justifyContent: 'space-between' }}>
            //         <TouchableOpacity style={styles.btnKategori} onPress={() => onPress()}>
            //             <View style={{ right: toDp(0) }}>
            //                 <Text style={{ fontSize: toDp(13), left: toDp(0) }}>{item.ctg_name}</Text>
            //             </View>
            //         </TouchableOpacity>
            //         <Image source={allLogo.iclineright} style={styles.iclineright} />
            //     </View>
            //     <View style={{ borderWidth: toDp(0.5), borderColor: 'grey', bottom: toDp(0), width: toDp(330), left: toDp(2.5) }} />
            // </View>
        )
    }

    // render() {
    // render porfile toko
    const Profile = () => {
        let rtlName = props.navigation.state.params.rtl_name;
        let rtAdr = props.navigation.state.params.rtl_addres;
        return (
            <View style={styles.profil}>
                <View style={{ justifyContent: 'center', alignItems: 'center', top: 25 }}>
                    {/* <Image source={state.picture ? { uri: state.picture } :
                        require('../../Assets/img/tzuyu.jpg')}
                        style={styles.imgProfil} /> */}
                    <Text style={{ fontSize: 20, fontWeight: 'bold', top: 20, color: 'white', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>{rtlName}</Text>
                    <Text style={{ top: 20, color: 'white', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>{rtAdr}</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Header
                title={'Toko'}
                onPress={() => props.navigation.goBack()}
            />
            <View style={{ width: '100%', alignItems: 'center' }}>
                {/* <View style={styles.profil}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={state.picture ? { uri: state.picture } :
                            require('../../Assets/img/tzuyu.jpg')}
                            style={styles.imgProfil} />
                        <Text style={{ fontSize: 18, fontWeight: 'bold', width: toDp(80), top: 20, color: 'white', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>{reta}</Text>
                        <Text style={{ width: toDp(80), top: 25, color: 'white', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>Alamat</Text>
                    </View>
                </View> */}
                <Profile />
                <View style={styles.viewBtnhomeseller}>
                    {
                        state.showPro == true ?
                            (
                                <TouchableOpacity style={styles.presable3} disabled>
                                    <View style={styles.viewProduk2}>
                                        <Image source={allLogo.product} style={styles.imgProduk} />
                                    </View>
                                    <Text style={styles.textIcon}>Produk Saya</Text>
                                </TouchableOpacity>
                            ) :
                            <TouchableOpacity style={styles.presable2} onPress={() => produkRetail()}>
                                <View style={styles.viewProduk}>
                                    <Image source={allLogo.product} style={styles.imgProduk} />
                                </View>
                                <Text style={styles.textIcon}>Produk Saya</Text>
                            </TouchableOpacity>
                    }
                    {
                        state.showCat == true ?
                            (
                                <TouchableOpacity style={styles.presable3} disabled>
                                    <View style={styles.viewKategori2}>
                                        <Image source={allLogo.kategori} style={styles.imgKategori} />
                                    </View>
                                    <Text style={styles.textIcon}>Kategori</Text>
                                </TouchableOpacity>
                            ) :
                            <TouchableOpacity style={styles.presable2} onPress={() => getCategori()}>
                                <View style={styles.viewKategori}>
                                    <Image source={allLogo.kategori} style={styles.imgKategori} />
                                </View>
                                <Text style={styles.textIcon}>Kategori</Text>
                            </TouchableOpacity>

                    }



                </View>
                <View style={{ zIndex: 0, marginBottom: 50 }}>
                    {/* <View style={styles.bodyProfil}> */}
                    {
                        state.showPro == true ?
                            (
                                <CardProduct />
                            ) :
                            <CardCategory />
                    }


                    {/* </View> */}

                </View>



                {/* <View style={{ top: toDp(250), position: 'absolute' }}>
                    <ActivityIndicator
                        animating={loading}
                        size="large"
                        color="#FFFFFF"
                    />
                </View> */}




            </View>




            {/* </ScrollView> */}



        </View>
    )

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    viewBuka: {
        backgroundColor: '#F8f9f9',
        width: toDp(20),
        height: toDp(20),
        // right: toDp(30),
        alignItems: 'center',
        backgroundColor: '#fcd4c7',
        justifyContent: 'center',
        borderRadius: toDp(20),
    },
    profil: {
        backgroundColor: '#2A334B',
        height: toDp(125),
        width: toDp(335),
        marginTop: toDp(25),
        bottom: toDp(10),
        borderRadius: toDp(10),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    txtProduct: {
        width: '100%',
        backgroundColor: 'white'
    },
    cart: {
        padding: toDp(1),
        top: toDp(-257),
        left: toDp(110)
    },
    viewBtntoko: {
        borderWidth: toDp(0.5),
        borderRadius: toDp(10),
        padding: toDp(8),
        borderColor: '#E6E6E6'
    },
    imgToko: {
        height: toDp(28),
        width: toDp(28),
        resizeMode: 'contain'
    },
    imgProduct: {
        width: toDp(100),
        height: toDp(100)
    },
    address: {
        bottom: toDp(-4)
    },
    imgProfil: {
        height: toDp(50),
        width: toDp(50),
        top: toDp(10),
        borderRadius: toDp(20)
    },
    nmProfil: {
        top: toDp(-20),
        fontWeight: 'bold',
        fontSize: toDp(13),
        color: 'white'
    },
    textIcon: {
        textAlign: 'center',
        fontSize: toDp(12)
    },
    viewProduk: {
        borderWidth: toDp(0.5),
        borderRadius: toDp(10),
        padding: toDp(8),
        borderColor: '#E6E6E6'
    },
    viewProduk2: {
        borderWidth: toDp(2),
        borderRadius: toDp(10),
        padding: toDp(8),
        borderColor: '#f83308'
    },
    BodyKategori: {
        width: toDp(335),
        height: toDp(470),
        borderRadius: toDp(10),
        backgroundColor: '#FFF',
        top: toDp(20),
        flexDirection: 'column',
        justifyContent: 'space-between',
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 1,
        // },
        // shadowOpacity: 0.20,
        // shadowRadius: 1.41,

        // elevation: 2,
    },
    card: {
        backgroundColor: 'white',
        padding: toDp(25),
        marginVertical: toDp(5),
        marginHorizontal: toDp(16),
        borderRadius: toDp(10),
        height: toDp(251),
        right: toDp(17),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    mengikuti: {
        fontSize: toDp(10),
        color: 'white',
        marginLeft: toDp(8)
    },
    imgProduk: {
        height: toDp(28),
        width: toDp(28),
        resizeMode: 'contain'
    },
    btnKategori: {
        left: toDp(5),
        width: toDp(310),
        height: toDp(48),
        borderRadius: toDp(10),
        justifyContent: 'center',
    },
    icwallet: {
        height: toDp(22),
        width: toDp(25),
        tintColor: '#f83308'
    },
    icstore: {
        height: toDp(22),
        width: toDp(25),
        tintColor: '#f83308'
    },
    icline: {
        height: toDp(12),
        width: toDp(8),
        right: 10,
    },
    icorders: {
        width: toDp(23),
        height: toDp(28),
        bottom: toDp(5),
        left: toDp(5)
    },
    presable: {
        top: toDp(85),
        right: toDp(115)
    },
    bodyProfil: {
        backgroundColor: '#F9F8F8',
        width: toDp(330),
        height: toDp(210),
        borderRadius: toDp(10),
        top: toDp(10),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 2,
    },
    bodyAlamat: {
        // backgroundColor: 'green',
        flexDirection: 'row',
        margin: toDp(10),
        left: toDp(10),
        bottom: toDp(8)
    },
    viewKategori: {
        borderWidth: toDp(0.5),
        borderRadius: toDp(10),
        padding: toDp(3),
        borderColor: '#E6E6E6',
        flexDirection: 'row',
        marginHorizontal: toDp(0),
        height: toDp(50),
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderRadius: toDp(10),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 2
    },
    viewKategori2: {
        borderWidth: toDp(2),
        borderRadius: toDp(10),
        padding: toDp(3),
        borderColor: '#f83308'
    },
    iclineright: {
        width: toDp(13),
        height: toDp(13),
        tintColor: '#F83308',
    },
    imgKategori: {
        height: toDp(38),
        width: toDp(38),
        resizeMode: 'contain'
    },
    btnAlamat: {
        height: toDp(94),
        // backgroundColor:'cyan'
    },
    txtRiwayat: {
        top: toDp(5),
        left: toDp(15),
        color: '#F83308',
        fontSize: toDp(12)
    },
    txtPesanan: {
        top: toDp(3),
        left: toDp(10),
    },
    presable2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: toDp(8),
        marginHorizontal: toDp(5),
    },
    presable3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: toDp(8),
        marginHorizontal: toDp(5),
    },
    viewBtnhomeseller: {
        flexDirection: 'row',
        width: toDp(350),
        height: toDp(70),
    },

});

export default profilToko;

