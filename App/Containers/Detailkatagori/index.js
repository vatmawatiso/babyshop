import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    ImageBackground,
    Pressable,
    ScrollView,
    Dimensions,
    FlatList,
    TouchableOpacity,
    ToastAndroid,
    PermissionsAndroid,
    AsyncStorage,
    ActivityIndicator
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import BackHeader from '@BackHeader'
import Carousel, { Pagination } from "react-native-snap-carousel";
import LinearGradient from 'react-native-linear-gradient'
import NavigatorService from '@NavigatorService'
import { TextInput } from "react-native-gesture-handler";
import { BottomNavigation } from "react-native-paper";
import axios from "axios";
import NumberFormat from 'react-number-format';
import { svr } from "../../Configs/apikey";

const { width, height } = Dimensions.get('window')

const Detailkatagori = (props) => {
    const [src, setSrc] = useState(null);
    const [state, setState] = useState({
        datas: [],
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
                        return detailKategori(result)
                        setState(state => ({
                            ...state,
                            latitude: result.latitude,
                            longitude: result.longitude
                        }))
                    }, error1 => {
                        setState(state => ({ ...state, inMessage: error1, inload: 'false' }))

                    })
                    .then(result2 => {
                        setState(state => ({ ...state, datas: result2, inload: 'false' }))
                    },
                        error => {
                            setState(state => ({ ...state, inMessage: error }))
                        })
            }
        );


    }, [])


    const setKordinat = () => {
        setState(state => ({ ...state, datas: [] }))
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
                    return detailKategori(result)
                    return setState(state => ({
                        ...state,
                        latitude: result.latitude,
                        longitude: result.longitude
                    }))
                }, error1 => {
                    setState(state => ({ ...state, inMessage: error1, inload: 'false' }))

                })
                .then(result2 => {
                    setState(state => ({ ...state, datas: result2, inload: 'false' }))

                },
                    error => {
                        setState(state => ({ ...state, inMessage: error }))
                    })

        })

    }, [state.id])


    const detailKategori = (json) => {
        return new Promise((resolve, reject) => {
            const kid = props.navigation.state.params.ctg_id;
            console.log('cekkkkkkk = ', json.latitude + '/' + json.longitude);
            axios.get(svr.url + 'product/category/' + kid + '/' + json.latitude + '/' + json.longitude + '/' + svr.api)
                // axios.get('https://market.pondok-huda.com/dev/react/product/?ctg_id=' + kid)
                .then(result => {
                    if (result.data.status == 200) {
                        //hendle success
                        // console.log('Produk Bangunan ===> ', result);
                        // setState(state => ({ ...state, datas: result.data.data }))
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

                }).catch(err => {
                    //This Modif, pesan inMessage silahkan ganti
                    setState(state => ({ ...state, inArea: '500', }))
                    setState(state => ({ ...state, inMessage: 'Tidak dapat memuat data' }))
                    ToastAndroid.show("Gagal menerima data dari server!" + error, ToastAndroid.SHORT)
                    console.log('error produk =>', error)
                    reject('Tidak dapat memuat data')
                })
        })
    }

    const displayName = (retail) => {
        let count = '';
        let nama = '';
        count = retail.split(' ' || '-');
        nama = count.slice(0, 2,).join(' ');
        return nama
    }

    const renderItem = (item, index) => (
        <Pressable>
            <View style={styles.card}>
                <View style={styles.txtProduct}>
                    <Image source={{ uri: item.thumbnail }} style={styles.imgProduct} />
                    <Text style={styles.textproduct}>{item.product_name.substring(0, 15)}</Text>
                    <Text style={{ fontSize: toDp(12), right: toDp(1), fontWeight: 'bold' }}>{displayName(item.retail_name)}</Text>
                    <NumberFormat
                        value={item.price}
                        displayType={'text'}
                        thousandSeparator={'.'}
                        decimalSeparator={','}
                        prefix={'Rp. '}
                        renderText={formattedValue => <Text style={{ color: '#F83308', fontWeight: '800' }}>{formattedValue}</Text>} // <--- Don't forget this!
                    />
                    <View>

                        <View style={{ flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={allLogo.address} style={styles.address} />
                                <Text style={{ marginLeft: toDp(10), marginTop: toDp(5) }}>{item.ctyname}{"\n"}{item.jarak.substring(0, 2)} KM</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={allLogo.icstar} style={styles.star} />
                                <Text style={{ marginLeft: toDp(10), marginTop: toDp(5) }}>{item.lainnya.ratting}</Text>
                                <Text style={{ marginLeft: toDp(10), marginTop: toDp(5) }}> | Terjual {item.lainnya.terjual}</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', marginLeft: toDp(10), marginTop: toDp(7) }}>
                            <View>
                                <Text style={{ fontSize: toDp(12), right: toDp(9) }}>Stok</Text>
                                <Text style={{ fontSize: toDp(12), right: toDp(9) }}>Kondisi</Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: toDp(12), right: toDp(9) }}> : {item.stock}</Text>
                                <Text style={{ fontSize: toDp(12), right: toDp(9) }}> : {item.kondisi}</Text>
                            </View>
                        </View>

                    </ View>
                </ View>
            </View>
        </Pressable>
    );

    const CardProduct = () => {
        return (
            <FlatList style={{ minHeight: toDp(400), width: width, marginTop: toDp(20), marginBottom: toDp(45) }}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop: toDp(3),
                    paddingBottom: toDp(3),

                }}

                numColumns={2}
                data={state.datas}
                renderItem={({ item, index }) => {
                    return (
                        renderItem(item, index)
                    )
                }}
                ListFooterComponent={() => <View style={{ height: toDp(100) }} />}
            />
        )
    }

    return (
        <View style={styles.container}>

            <BackHeader
                title={props.navigation.state.params.ctg_name}
                onPress={() => props.navigation.goBack()}
            />

            <View style={{ bottom: toDp(20) }}>

                {/* //This Modif */}


                {
                    state.inload == 'true' ?
                        <View style={{ marginTop: toDp(150) }}>
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
            </View>

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor:'white'
    },
    bodyMenu: {
        flexDirection: 'row',
        alignItems: 'baseline',
        backgroundColor: '#2A334B',
        bottom: toDp(150),
        width: toDp(335),
        height: toDp(45),
        borderRadius: toDp(10),
    },
    btnHome: {
        marginHorizontal: toDp(20)
    },
    icchat: {
        width: toDp(26),
        height: toDp(26),
        tintColor: 'white'
    },
    icplus: {
        // tintColor:'black'
    },
    ichome: {
        tintColor: 'white'
    },
    btnChat: {
        marginHorizontal: toDp(20),
    },
    card: {
        backgroundColor: 'white',
        right: toDp(12),
        marginVertical: toDp(5),
        marginHorizontal: toDp(20),
        borderRadius: toDp(10),
        minHeight: toDp(200),
        width: '90%',
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
        bottom: toDp(17),
        left: toDp(15)
    },
    terjual: {
        bottom: toDp(37),
        left: toDp(28)
    },
    address: {
        bottom: toDp(-4)
    },
    dariKota: {
        bottom: toDp(6),
        left: toDp(10)
    },
    textproduct: {
        width: toDp(100),
        fontWeight: 'bold',
        fontSize: toDp(12)
    },
    txtProduct: {
        borderRadius: toDp(10),
        padding: toDp(20)
    },
    imgProduct: {
        width: toDp(100),
        height: toDp(100)
    },
    address: {
        top: toDp(7),
        width: toDp(15),
        height: toDp(15)
    },
    star: {
        marginTop: toDp(9),
        marginLeft: toDp(3)
    },
});

export default Detailkatagori;