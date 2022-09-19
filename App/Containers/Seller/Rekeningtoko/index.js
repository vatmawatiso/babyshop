import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    Alert,
    Pressable,
    RefreshControl,
    ScrollView,
    AsyncStorage,
    SafeAreaView,
    TextInput,
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import BackHeader from '@BackHeader'
import NavigatorService from '@NavigatorService'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { svr } from "../../../Configs/apikey";
import CurrencyInput from "react-native-currency-input";


const Rekeningtoko = (props) => {


    const [refreshing, setRefreshing] = useState(false);
    const [value, setValue] = useState()
    const [state, setState] = useState({
        dataBank: [],
        pay_name: '',
        tr_pay_id: '',
        tr_pay_name: '',
        tr_rk_id: ''
    })


    useEffect(() => {
        getBank()
    }, [])


    //GET DATA BANK PER MEMBER
    const getBank = () => {
        let mbid = props.navigation.state.params.mb_id;
        // https://market.pondok-huda.com/publish/react/rekening/member/MB000000002/Q4Z96LIFSXUJBK9U6ZACCB2CJDQAR0XH4R6O6ARVG
        axios.get(svr.url + 'rekening/member/' + mbid + '/' + svr.api)
            // axios.get('https://market.pondok-huda.com/dev/react/category/')
            .then(result => {
                // handle success
                if (result.data.status === 201) {
                    console.log('get rekening = >', JSON.stringify(result.data));
                    setState(state => ({
                        ...state,
                        dataBank: result.data.data,
                        nama: result.data.data[0].nama,
                        methode: result.data.data.pay_name
                    }))
                    refresh()
                    console.log('get BANK = >', state.dataBank);

                } else if (result.data.status === 404) {
                    setState(state => ({ ...state, loading: false }))
                }else if (result.data.status === 500) {
                    alert('Maaf, Terjadi kesalahan pada server!')
                    setState(state => ({ ...state, loading: false }))
                }

            }).catch(err => {
                //console.log(err)
                alert('Gagal menerima data dari server!' + err)
                setState(state => ({ ...state, loading: false }))
            })
    }


    //FUNGSI REFRESH DATA TERBARU GET ORDER DENGAN MENGOSONGKAN DATA SEBELUMNYA
    const refresh = async () => {
        let mbid = props.navigation.state.params.mb_id;
        // https://market.pondok-huda.com/publish/react/rekening/member/MB000000002/Q4Z96LIFSXUJBK9U6ZACCB2CJDQAR0XH4R6O6ARVG
        axios.get(svr.url + 'rekening/member/' + mbid + '/' + svr.api)
            // axios.get('https://market.pondok-huda.com/dev/react/category/')
            .then(result => {
                // handle success
                setState(state => ({
                    ...state,
                    dataBank: result.data.data,
                    nama: result.data.data[0].nama,
                    methode: result.data.data.pay_name
                }))
                console.log('get BANK = >', state.dataBank);
                // alert(JSON.stringify(result.data));

            }).catch(err => {
                //console.log(err)
                alert('Gagal menerima data dari server!' + err)
                setState(state => ({ ...state, loading: false }))
            })
    }


    //UNTUK MEMANGGIL GAMBAR BANK DARI ASSET BERDASARKAN PAY_ID
    const iconBank = (val) => {
        let logo = '';
        if (val == 'PYM00007') {
            logo = allLogo.arta
        } else if (val == 'PYM00001') {
            logo = allLogo.bca
        } else if (val == 'PYM00003') {
            logo = allLogo.bni
        } else if (val == 'PYM00008') {
            logo = allLogo.cimb
        } else if (val == 'PYM00002') {
            logo = allLogo.mandiri
        } else if (val == 'PYM00009') {
            logo = allLogo.muamalat
        } else if (val == 'PYM00004') {
            logo = allLogo.bri
        } else if (val == 'PYM00005)') {
            logo = allLogo.bsi
        } else if (val == 'PYM00006') {
            logo = allLogo.permata
        }
        return logo;
    }


    //HIDE UNTUK NOREK
    const hideRek = (text) => {
        const num = text.length;
        console.log('cek num = ', num);
        // let nomer_rek = text
        // console.log('isi = ', text);
        let hiddenRekening = "";
        for (let i = 0; i < num; i++) {
            if (i > 2) {
                hiddenRekening += "*";
            } else {
                hiddenRekening += nomer_rek[i];
            }
        }
        return hiddenRekening;
    }

    //ALERT KONFIRMASI TERIMA PESANAN
    const konfirmDelete = (item) =>
        // console.log('cek item = '+ JSON.stringify (item));
        Alert.alert(
            "Konfirmasi hapus!",
            "Yakin ingin hapus rekening?",
            [
                // {
                //   text: "Ask me later",
                //   onPress: () => console.log("Ask me later pressed")
                // },
                {
                    text: "Tidak!",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Hapus Rekening!", onPress: () => deleteRekening(item.rk_id) }
            ]
        );


    //DELETE REKENING
    const deleteRekening = (rk_id) => {
        // const adr = props.navigation.state.params.adr_id
        // https://market.pondok-huda.com/publish/react/rekening/RK000000003/Q4Z96LIFSXUJBK9U6ZACCB2CJDQAR0XH4R6O6ARVG
        axios.delete(svr.url + 'rekening/' + rk_id + '/' + svr.api)
            .then(response => {
                console.log('Alamat ' + JSON.stringify(response));
                if (response.data.status === 201) {
                    console.log(response);
                    alert('Berhasil menghapus rekening')
                    refresh()
                    setState(state => ({ ...state, datas: response.data.data }))
                } else if (response.data.status === 500) {
                    alert('gagal')
                    console.log(response)
                }
            }).catch(error => {
                console.log(error)
            })
    }

    //NAVIGATE KE EDIT REKENING
    const selectRekening = (nama, pay_id, pay_name, rk_id, rk_mb_id, nomer_rek, retail_id) => {
        NavigatorService.navigate('Editrekening', { nama: nama, pay_id: pay_id, pay_name: pay_name, rk_id: rk_id, rk_mb_id: rk_mb_id, nomer_rek: nomer_rek, retail_id: retail_id })
    }


    const ListRekening = (item, index, onPress) => (
        <View style={styles.bodyFlat}>
            <TouchableOpacity onPress={() => onPress()}>
                <View style={{ flexDirection: 'column', padding: toDp(15), }}>
                    <Text>{item.nama}</Text>
                    <Text>TABUNGAN {item.pay_name}</Text>
                    <Text style={{ marginTop: toDp(8), fontSize: toDp(20), color: '#0960A1', fontWeight: 'bold' }}>{hideRek(item.nomer_rek)}</Text>

                    <View style={{ marginLeft: toDp(205), bottom: toDp(85), }}>
                        <Image source={iconBank(item.pay_id)} style={{ width: 100, height: 60, borderColor: '#000', marginTop: toDp(0) }} />
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btndelete} onPress={() => konfirmDelete(item)}>
                <Image source={allLogo.delete} style={styles.imgdelete} />
            </TouchableOpacity>
        </View>
    )

    return (
        <View style={styles.container}>
            <BackHeader
                title={'Rekening Toko'}
                onPress={() => props.navigation.goBack()}
            />
            <ScrollView vertical={true} style={{ width: '100%', height: '100%' }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={refresh}
                    />}
            >
                <View style={{ justifyContent: 'flex-end', alignItems: 'center', marginTop: toDp(15) }}>
                    <Pressable style={{ width: toDp(340), height: toDp(48) }} onPress={() => NavigatorService.navigate('Tambahrekening')}>
                        <View style={styles.btnAddress}>
                            <Text style={styles.txtBtnAddress}>Tambah No Rekening</Text>
                            <Image source={allLogo.icplus} style={styles.icplus} />
                        </View>
                    </Pressable>
                </View>

                <View style={styles.flatcontent}>
                    <FlatList style={{ width: '100%', }}
                        data={state.dataBank}
                        renderItem={({ item, index }) => {
                            return (
                                ListRekening(item, index, () => selectRekening(item.nama, item.pay_id, item.pay_name, item.rk_id, item.rk_mb_id, item.nomer_rek, state.retail_id))
                            )
                        }}
                        ListFooterComponent={() => <View style={{ height: toDp(70) }} />}
                    />
                </View>
            </ScrollView>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    btndelete: {
        right: toDp(30),
        height: toDp(25),
        alignSelf: 'flex-end',
        bottom: toDp(10)
    },
    imgdelete: {
        width: toDp(20),
        height: toDp(22),
        tintColor: '#F83308'
    },
    btnEditRek: {
        backgroundColor: '#FFF',
        width: toDp(340),
        height: toDp(48),
        justifyContent: 'center',
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
    iclineright: {
        width: toDp(24),
        height: toDp(23),
        marginTop: toDp(0),
        tintColor: '#F83308',
    },
    bodyFlat: {
        backgroundColor: '#F9F8F8',
        width: toDp(340),
        height: toDp(100),
        borderRadius: toDp(10),
        marginBottom: toDp(10),
        marginTop: toDp(5),
        marginHorizontal: toDp(12),
        // borderBottomColor:'#2A334B',
        // borderBottomWidth:3,
        flexDirection: 'row',
        top: toDp(10),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    flatcontent: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtTarik: {
        color: '#FFF',
        textAlign: 'center',
        marginTop: toDp(12),
        fontSize: toDp(15)
    },
    btnTarik: {
        backgroundColor: '#2A334B',
        marginTop: toDp(50),
        height: toDp(48),
        width: toDp(340),
        borderRadius: toDp(10),
        marginBottom: toDp(10),
    },
    curren: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: toDp(30),
        backgroundColor: '#FFF',
        borderRadius: toDp(10),
        // borderWidth: toDp(0.5),
        width: toDp(300),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 2,
    },
    // bodySaldo: {
    //     backgroundColor: '#2A334B',
    //     width: toDp(334),
    //     height: toDp(262),
    //     alignItems: 'center',
    //     borderRadius: toDp(10),
    //     shadowColor: "#000",
    //     shadowOffset: {
    //         width: 0,
    //         height: 2,
    //     },
    //     shadowOpacity: 0.25,
    //     shadowRadius: 3.84,

    //     elevation: 1,
    // },
    body: {
        backgroundColor: '#FFF',
        width: toDp(340),
        height: toDp(145),
        marginTop: toDp(15),
        borderRadius: toDp(10),
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 2,
    },
    textInput: {
        marginTop: toDp(30),
        paddingLeft: toDp(10),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 2,
    },
    cash: {
        width: toDp(30),
        height: toDp(19),
        top: toDp(10),
        tintColor: '#F83308',
        marginLeft: toDp(10)
    },
    dropdown: {
        height: toDp(48),
        borderRadius: toDp(10),
        width: toDp(340),
        top: toDp(4),
        backgroundColor: 'white',
        marginTop: toDp(5),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 2,
    },
    txtAddress: {
        marginLeft: toDp(2),
        top: toDp(10),
        fontWeight: 'bold'
    },
    icaddress: {
        width: toDp(15),
        height: toDp(15),
        left: toDp(248),
        bottom: toDp(25)
    },
    btnAddress: {
        backgroundColor: '#FFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: toDp(340),
        height: toDp(48),
        borderRadius: toDp(10),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    icplus: {
        width: toDp(12),
        height: toDp(12),
        top: toDp(18),
        right: toDp(10),
        tintColor: '#F83308'
    },
    txtBtnAddress: {
        top: toDp(13),
        left: toDp(10),
        fontWeight: 'bold'
    },
});

export default Rekeningtoko;
