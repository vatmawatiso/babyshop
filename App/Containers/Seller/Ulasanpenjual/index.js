import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    ImageBackground,
    Pressable,
    FlatList,
    TouchableOpacity,
    AsyncStorage,
    ToastAndroid
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import BackHeader from '@BackHeader'
import Profiltoko from '@Profiltoko'
import NavigatorService from '@NavigatorService'
import axios from 'axios';
import { svr } from "../../../Configs/apikey";
import StarRating from 'react-native-star-rating-widget';
import NumberFormat from 'react-number-format';

const Ulasanpenjual = (props) => {
    const [src, setSrc] = useState(null);

    const [state, setState] = useState({
        datas: [],
        mb_name: '',
        pp: ''
    })

    useEffect(() => {
        // setState(state => ({
        //     ...state,
        //     mb_name: props.navigation.state.params.mb_name,
        //     pp: props.navigation.state.params.picture,

        // }))
        // console.log("HP--->" , props.navigation.state.params.pp);
        // console.log('foto pp = ', state.pp)

        getUlasan()

    }, [])


    const getUlasan = () => {
        const rtlid = props.navigation.state.params.retail_id
        console.log('cek rtl id = ', rtlid)
        axios.get(svr.url + 'komentar/retail/' + rtlid + '/' + svr.api)
            .then(result => {
                // handle success
                setState(state => ({ ...state, datas: result.data.data }))
                console.log('get Ulasan = ' + JSON.stringify(result.data));
                // alert(JSON.stringify(result.data));

            }).catch(err => {
                // alert('Gagal menerima data dari server!' + err)
                ToastAndroid.show("Gagal menerima data dari server!" + err, ToastAndroid.SHORT)
                setState(state => ({ ...state, loading: false }))
            })
    }


    const listUlasan = (item, index) => {
        return (

            <View style={styles.body}>
                <View style={{ flexDirection: 'row' }}>
                    {item.picture != '' ?
                        <>
                            <Image source={{ uri: item.picture }} style={styles.iccamera} />
                        </>
                        :
                        <>
                            <Image source={allLogo.icuser} style={styles.iccamera} />
                        </>
                    }
                    <View style={{ flexDirection: 'column', paddingLeft: toDp(10), marginBottom: toDp(5), bottom: toDp(3) }}>
                        <Text>{item.mb_name}</Text>
                        <Text style={{ paddingTop: toDp(10), width: toDp(250) }}>{item.komentar}</Text>
                        {/* <Image source={{ uri: item.foto_km }} style={styles.fotokm} /> */}
                        {item.foto_km != '' ?
                            <>
                                <Image  source={{ uri: item.foto_km }} style={styles.fotokm} />
                            </>
                            :
                            <>
                                <Image source={allLogo.noimage} style={styles.fotokm} />
                            </>
                        }
                        <StarRating style={{ right: toDp(7), paddingTop: toDp(5) }}
                            rating={item.ratting}
                            starSize={toDp(15)}
                            enableHalfStar={false}
                        // onChange={setRating}
                        />
                        <Text style={{ fontSize: 11, paddingTop: toDp(5) }}>{item.tanggal}</Text>
                    </View>
                </View>
                <View style={styles.bodyProduk}>
                    <Image source={{ uri: item.prd_thumbnail }} style={styles.foto} />
                    <View style={{ flexDirection: 'column', paddingLeft: toDp(10) }}>
                        <Text style={{ fontWeight: '800', width: toDp(200) }}>{item.prd_name}</Text>
                        <View style={{ paddingTop: toDp(8) }}>
                            <Text style={{ fontWeight: '800', }}>total : {item.qty} produk</Text>
                            <NumberFormat
                                value={item.prd_price}
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
        )
    }


    return (
        <View style={styles.container}>

            <BackHeader
                title={'Ulasan Toko'}
                onPress={() => props.navigation.goBack()}
            />


            <View style={{ width: toDp(340) }}>
                <FlatList
                    numColumns={1}
                    data={state.datas}
                    renderItem={({ item, index, value }) => {
                        return (
                            listUlasan(item, index)
                        )
                    }}
                    ListFooterComponent={() => <View style={{ height: toDp(180) }} />}
                />
            </View>

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'white'
    },
    iccamera: {
        width: toDp(21),
        height: toDp(19),
        justifyContent: 'center',
        resizeMode: 'cover',
        borderRadius: toDp(20)
    },
    foto: {
        width: toDp(77),
        height: toDp(75),
        justifyContent: 'center',
        // backgroundColor: 'cyan',
        resizeMode: "cover",
        borderRadius:toDp(5)
    },
    fotokm: {
        width: toDp(77),
        height: toDp(62),
        justifyContent: 'center',
        marginTop: toDp(5),
        borderRadius: toDp(10),
        // backgroundColor: 'cyan',
        resizeMode: "cover",
    },
    body: {
        paddingTop: toDp(20),
        paddingLeft: toDp(5),
        backgroundColor: 'white',
        width: toDp(340),
        height: toDp(300),
        borderRadius: toDp(10),
        marginBottom: toDp(10),
        marginTop: toDp(5),
        top: toDp(10),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    bodyProduk: {
        paddingLeft: toDp(24), 
        flexDirection: 'row', 
        backgroundColor: '#D0D6E4', 
        width: toDp(290), 
        height: toDp(95), 
        paddingLeft: toDp(5), 
        marginLeft: toDp(30), 
        borderRadius: toDp(5), 
        paddingTop: 10
    }

});

export default Ulasanpenjual;