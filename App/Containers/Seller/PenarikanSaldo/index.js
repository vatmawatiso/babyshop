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
    ToastAndroid
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


const PenarikanSaldo = (props) => {


    const [refreshing, setRefreshing] = useState(false);
    const [value, setValue] = useState()
    const [state, setState] = useState({
        dataBank: [],
        pay_name: '',
        tr_pay_id: '',
        tr_pay_name: '',
        tr_rk_id: '',
        retail_id:'',
        rtl_name:''
    })


    useEffect(() => {
        AsyncStorage.getItem('member').then(response => {
            //console.log('Profilseller=======>'+ JSON.stringify(responponse));

            let data = JSON.parse(response);
            //const val = JSON.stringify(data);

            console.log('Homeseller ==> ' + JSON.stringify(data));

            setState(state => ({
                ...state,
                mb_id: data.value.mb_id,
                mb_name: data.value.mb_name,
                mb_email: data.value.mb_email,
                mb_phone: data.value.mb_phone,
                mb_type: data.value.mb_type,
                picture: data.value.picture,
                retail_id: data.retail_id,
            }))
            // console.log('RTL ID ' + JSON.stringify(state.retail_id));
        }).catch(err => {
            console.log('err', err)
        })

        setState(state => ({
            ...state,
            retail_id: props.navigation.state.params.retail_id,
            rtl_name: props.navigation.state.params.rtl_name,
      
          }))

        getBank()
    }, [])


    //GET DATA BANK
    const getBank = () => {
        let mbid = props.navigation.state.params.mb_id;
        // https://market.pondok-huda.com/publish/react/rekening/member/MB000000002/Q4Z96LIFSXUJBK9U6ZACCB2CJDQAR0XH4R6O6ARVG
        axios.get(svr.url + 'rekening/member/' + mbid + '/' + svr.api)
            // axios.get('https://market.pondok-huda.com/dev/react/category/')
            .then(result => {
                // handle success
                console.log('get rekening = >', JSON.stringify(result.data));
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
                // alert('Gagal menerima data dari server!' + err)
                ToastAndroid.show("Gagal menerima data dari server!" + err, ToastAndroid.SHORT)
                setState(state => ({ ...state, loading: false }))
            })
    }


    //POST / PENARIKAN SALDO
    const tarikSaldo = async () => {
        console.log('rtl id = ', rtlid);
        const body = {
            ps_rtl_id: state.retail_id,
            methode: state.tr_pay_name,
            rtl_name: state.rtl_name,
            ps_saldo: value,
            ps_rekening: state.tr_rk_id
        }
        console.log('Body tarik saldo ' + JSON.stringify(body));

        setState(state => ({ ...state, loading: true }))
        // https://market.pondok-huda.com/publish/react/transaksi/penarikan/RTL00000004/Q4Z96LIFSXUJBK9U6ZACCB2CJDQAR0XH4R6O6ARVG
        axios.post(svr.url + 'transaksi/penarikan/' + rtlid + '/' + svr.api, body)
            // axios.post('https://market.pondok-huda.com/dev/react/category/', body)
            .then(result => {

                console.log('cek result = ' + JSON.stringify(result.data));

                if (result.data.status == 201) {
                    // alert('Sukses tarik saldo!')
                    ToastAndroid.show("Berhasil tarik saldo!", ToastAndroid.SHORT)
                    NavigatorService.navigate('Saldopenjual')
                    console.log('HASIL ==> : ' + JSON.stringify(result.data))
                    setState(state => ({ ...state, loading: false }))
                    //NavigatorService.navigation('Alamattoko');

                } else {
                    // alert('Gagal tarik saldo!')
                    ToastAndroid.show("Gagal tarik saldo!", ToastAndroid.SHORT)
                    setState(state => ({ ...state, loading: false }))
                    //console.log('-----COBA=====>'+ JSON.stringify(body));
                }

            }).catch(err => {
                console.log('cek error = ', err + result.data)
                // alert('Gagal menerima data dari server!' + err)
                ToastAndroid.show("Gagal menerima data dari server!" + err, ToastAndroid.SHORT)
                setState(state => ({ ...state, loading: false }))
            })
    }


    return (
        <View style={styles.container}>
            <BackHeader
                title={'Penarikan Saldo'}
                onPress={() => props.navigation.goBack()}
            />
            <View style={{ justifyContent: 'flex-end', alignItems: 'center', marginTop: toDp(15) }}>
                <Pressable style={{ width: toDp(340), height: toDp(48) }} onPress={() => NavigatorService.navigate('Rekeningtoko', { mb_id: state.mb_id, retail_id: state.retail_id, rtl_name: state.rtl_name })}>
                    <View style={styles.btnAddress}>
                        <Image source={allLogo.rekening} style={styles.icplus} />
                        <Text style={styles.txtBtnAddress}>Rekening Anda</Text>
                    </View>
                </Pressable>
            </View>

            <View style={{ alignItems: 'center', marginTop: toDp(15) }}>
                <View>
                    <View style={styles.body}>
                        <Text style={{ marginTop: toDp(8), marginLeft: toDp(10), fontSize: toDp(17), fontWeight: '800' }}>Tarik Tunai</Text>
                        <Image source={allLogo.cash} style={styles.cash} />
                        <SafeAreaView>

                            <View style={styles.curren}>
                                <CurrencyInput
                                    value={value}
                                    onChangeValue={setValue}
                                    prefix="Rp. "
                                    delimiter=","
                                    separator="."
                                    precision={2}
                                    fontSize={18}
                                    placeholder={'Masukan nominal'}
                                    onChangeText={(formattedValue) => {
                                        console.log(formattedValue); // $2,310.46
                                    }}
                                />
                            </View>
                        </SafeAreaView>
                    </View>
                    <View style={{ marginTop: toDp(10), marginRight: toDp(0) }}>
                        <Text style={{ width: toDp(150), }}>Rekening Sumber</Text>
                        <SafeAreaView>
                            <SelectDropdown
                                buttonStyle={styles.dropdown}
                                buttonTextStyle={{ fontSize: toDp(12), color: '#4E5A64' }}
                                rowTextStyle={{ fontSize: toDp(12) }}
                                dropdownStyle={{ borderRadius: toDp(10) }}
                                rowStyle={{ height: toDp(48), padding: toDp(5) }}
                                defaultButtonText={'Pilih Bank'}
                                defaultValue={{
                                    pay_id: state.tr_pay_id,
                                    pay_name: state.tr_pay_name,
                                    rk_id: state.tr_rk_id
                                }}
                                data={state.dataBank}
                                onSelect={(selectedItem, index) => {
                                    console.log(selectedItem.pay_name + selectedItem.pay_id + selectedItem.rk_id)
                                    setState(state => ({
                                        ...state,
                                        tr_pay_id: selectedItem.pay_id,
                                        tr_pay_name: selectedItem.pay_name,
                                        tr_rk_id: selectedItem.rk_id
                                    }))
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem.pay_name //untuk menampilkan di depan ketika dipilih
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item.pay_name //untuk menampilkan di row button
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
                        </SafeAreaView>
                    </View>
                </View>
            </View>

            <View style={{ position: 'absolute', bottom: 0, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <TouchableOpacity style={styles.btnTarik} onPress={() => tarikSaldo()}>
                    <Text style={styles.txtTarik}>Lanjut</Text>
                </TouchableOpacity>
            </View>
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
        height: toDp(80),
        borderRadius: toDp(10),
        marginBottom: toDp(10),
        marginTop: toDp(5),
        marginHorizontal: toDp(12),
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
        // justifyContent: 'space-between',
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
        width: toDp(27),
        height: toDp(20),
        top: toDp(10),
        tintColor: '#F83308',
        marginLeft: toDp(10)
    },
    txtBtnAddress: {
        top: toDp(13),
        left: toDp(10),
        fontWeight: 'bold'
    },
});

export default PenarikanSaldo;
