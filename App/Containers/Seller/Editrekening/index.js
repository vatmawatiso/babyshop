import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    ImageBackground,
    Pressable,
    SafeAreaView,
    TextInput,
    AsyncStorage,
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import BackHeader from '@BackHeader'
import { Card } from "react-native-paper";
import NavigatorService from '@NavigatorService'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import axios from 'axios';
import { svr } from "../../../Configs/apikey";

const Editrekening = (props) => {
    const [src, setSrc] = useState(null);

    const [state, setState] = useState({
        nama: '',
        pay_id: '',
        pay_name: '',
        rk_id: '',
        rk_mb_id: '',
        nomer_rek:'',
        dataBank: [],
        rek_pay_id: '',
        rek_pay_name: '',
        rek_rk_id: ''
    })

    useEffect(() => {
        setState(state => ({
          ...state,
          nama: props.navigation.state.params.nama,
          pay_id: props.navigation.state.params.pay_id,
          pay_name: props.navigation.state.params.pay_name,
          rk_id: props.navigation.state.params.rk_id,
          rk_mb_id: props.navigation.state.params.rk_mb_id,
          nomer_rek: props.navigation.state.params.nomer_rek,
    
        }))
        console.log("nama--->" + props.navigation.state.params.nama);
        console.log("payname--->" + props.navigation.state.params.pay_id);
        console.log("nama--->" + props.navigation.state.params.pay_name);
        console.log("payname--->" + props.navigation.state.params.rk_id);
        console.log("nama--->" + props.navigation.state.params.rk_mb_id);
        console.log("norek--->" + props.navigation.state.params.nomer_rek);

      }, [])


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

        getBank()
    }, [])


      const getBank = () => {
        // setState(state => ({...state, loading: true }))
        // https://market.pondok-huda.com/publish/react/payment/Q4Z96LIFSXUJBK9U6ZACCB2CJDQAR0XH4R6O6ARVG
        axios.get(svr.url + 'payment/' + svr.api)
            // axios.get('https://market.pondok-huda.com/dev/react/category/')
            .then(result => {
              
                let data = result.data.data.map(doc => {
                    return {
                        pay_id: doc.pay_id,
                        pay_name: doc.pay_name
                    }
                })
                setState(state => ({ ...state, dataBank: data }))
                console.log('get BANK = >', state.dataBank);
                // alert(JSON.stringify(result.data));

            }).catch(err => {
                //console.log(err)
                alert('Gagal menerima data dari server!' + err)
                setState(state => ({ ...state, loading: false }))
            })
    }


    //EDIT REKENING
    const Editrek = async () => {
        const body = {
            nama: state.mb_name,
            nomer_rek: state.nomer_rek,
            pay_id: state.pay_id,
            rk_mb_id: state.mb_id
        }
        console.log('Body Rekening ' + JSON.stringify(body));

        setState(state => ({ ...state, loading: true }))
        // https://market.pondok-huda.com/publish/react/rekening/RK000000001/Q4Z96LIFSXUJBK9U6ZACCB2CJDQAR0XH4R6O6ARVG
        axios.post(svr.url + 'rekening/' + state.rk_id +'/'+ svr.api, body)
            .then(result => {

                console.log('cek result = ' + JSON.stringify(result));

                if (result.data.status == 201) {
                    alert('Sukses edit rekening!')
                    NavigatorService.navigate('Rekeningtoko')
                    console.log('HASIL ==> : ' + JSON.stringify(result.data))
                    setState(state => ({ ...state, loading: false }))
                    //NavigatorService.navigation('Alamattoko');

                } else {
                    alert('Gagal edit rekening!')
                    setState(state => ({ ...state, loading: false }))
                    //console.log('-----COBA=====>'+ JSON.stringify(body));
                }

            }).catch(err => {
                //console.log(err)
                alert('Gagal menerima data dari server!' + err)
                setState(state => ({ ...state, loading: false }))
            })
    }


    //hide belum selesai
    const hideRek= (text)=> {
        let nomer_rek = text
        let hiddenRekening = "";
        for (let i = 0; i < nomer_rek.length; i++) {
          if (i > 2 && i< nomer_rek.indexOf("8") ) {
            hiddenRekening += "*";
          } else {
            hiddenRekening += nomer_rek[i];
          }
        }
        return hiddenRekening;
     }






    return (
        <View style={styles.container}>

            <BackHeader
                title={'Edit Rekening'}
                onPress={() => props.navigation.goBack()}
            />

            <View>
                <View style={styles.bodyKategori}>
                    <View>
                        <Text style={styles.txtKategori}>Pilih Bank</Text>
                        <SafeAreaView style={{ alignItems: 'center' }}>
                            <SelectDropdown
                                buttonStyle={styles.dropdown}
                                buttonTextStyle={{ fontSize: toDp(12), color: '#4E5A64' }}
                                rowTextStyle={{ fontSize: toDp(12) }}
                                dropdownStyle={{ borderRadius: toDp(10) }}
                                rowStyle={{ height: toDp(48), padding: toDp(5) }}
                                defaultButtonText={'Pilih Bank'}
                                defaultValue={{
                                    pay_id: state.pay_id,
                                    pay_name: state.pay_name
                                  }}
                                data={state.dataBank}
                                onSelect={(selectedItem, index) => {
                                    console.log(selectedItem.pay_id, index)
                                    setState(state => ({ ...state, pay_id: selectedItem.pay_id }))
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem.pay_name
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item.pay_name
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
                    <View style={{ bottom: toDp(10) }}>
                        <Text style={styles.txtKategori}>No Rekening</Text>
                        <SafeAreaView style={{ alignItems: 'center' }}>
                            <TextInput autoCapitalize={'none'}
                                style={styles.textInput}
                                placeholder={'Masukkan No Rekening'}
                                keyboardType={'numeric'}
                                placeholderTextColor={'#4E5A64'}
                                value={state.nomer_rek}
                                onChangeText={(text) => setState(state => ({ ...state, nomer_rek: text }))}
                            />
                        </SafeAreaView>
                    </View>
                </View>
                <Pressable style={styles.btnKategori} onPress={() => Editrek()}>
                    <Text style={styles.txtSimpan}>Simpan</Text>
                </Pressable>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    dropdown: {
        backgroundColor: 'white',
        borderRadius: toDp(10),
        width: toDp(315),
        height: toDp(48),
        margin: toDp(5),
        marginBottom: toDp(15),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 2,
    },
    bodyKategori: {
        backgroundColor: '#FFF',
        width: toDp(335),
        height: toDp(190),
        borderRadius: toDp(10),
        top: toDp(15),
        left: toDp(12),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    txtKategori: {
        margin: toDp(5),
        left: toDp(3),
        color: 'black',
    },
    textInput: {
        backgroundColor: 'white',
        borderRadius: toDp(10),
        height: toDp(48),
        width: toDp(315),
        margin: toDp(5),
        paddingLeft: toDp(10),
        marginBottom: toDp(15),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    btnKategori: {
        backgroundColor: '#2A334B',
        width: toDp(335),
        height: toDp(48),
        borderRadius: toDp(10),
        top: toDp(30),
        left: toDp(12),
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    txtSimpan: {
        color: 'white',
        textAlign: 'center'
    }
});

export default Editrekening;