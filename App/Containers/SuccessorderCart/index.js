import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    TextInput,
    SafeAreaView,
    Pressable,
    ScrollView,
    Dimensions,
    AsyncStorage
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import Back from '@Back'
import NavigatorService from '@NavigatorService'
import Axios from "axios";
import NumberFormat from "react-number-format";

const { width, height } = Dimensions.get('window')

const SuccessorderCart = (props) => {
    const [state, setState] = useState({
        totalProdukCart: '',
        dataProdukCart: [],
        dataOrder: [],
        totalAkhir: ''
    })

    useEffect(() => {
        AsyncStorage.getItem('member').then(response => {
            // console.log('Profil----------->'+ JSON.stringify(response));
      
            let data = JSON.parse(response);
            // const val = JSON.stringify(data);
      
            // console.log('Profilefiks----------->' + JSON.stringify(data));
      
            setState(state => ({
              ...state,
              mb_id: data.mb_id,
              mb_name: data.value.mb_name,
              mb_email: data.value.mb_email,
              mb_phone: data.value.mb_phone,
              mb_type: data.value.mb_type,
              picture: data.value.picture,
              id_retail: data.retail_id,
            }))
            console.log('id retail ' + JSON.stringify(state.id_retail));
            console.log('CEK MB_NAME ' + JSON.stringify(state.mb_id));
      
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
    

        getOrder()
    }, [])

    // get produk yg udah masuk ke keranjang
    const getOrder = () => {
        AsyncStorage.getItem('uid').then(uids => {
            let aid = uids;
            Axios.get('https://market.pondok-huda.com/dev/react/order/getodr/' + aid + '/' + 'Belum%20Dibayar/')
                .then(response => {
                    console.log('response => ', response.data);
                    if (response.data.status == 200) {
                        console.log('response => ', response.data);
                        setState(state => ({ ...state, dataOrder: response.data.data, totalAkhir: response.data.data[0]?.total_bayar }))
                    } else {
                        console.log('gagal mengambil data', response)
                    }
                }).catch(error => {
                    console.log(error)
                })

        }).catch(error => {
            console.log('error 2 =>', error)
        })
    }

    return (
        <View style={styles.container}>
            <Back
                title={'Sukses Order'}
                onPress={() => props.navigation.goBack()}
            />

            <View style={styles.content}>
                <Text style={styles.txtKonfirm}>Silahkan Lakukan Pembayaran Sebesar</Text>
                <NumberFormat
                    value={state.totalAkhir}
                    displayType={'text'}
                    thousandSeparator={'.'}
                    decimalSeparator={','}
                    prefix={'Rp. '}
                    renderText={formattedValue => <Text style={{ bottom: toDp(0), left: toDp(0), fontSize: toDp(18), color: '#F83308', fontWeight: '800' }}>{formattedValue}</Text>} // <--- Don't forget this!
                />
                <Text style={styles.txtKet}>silahkan cek untuk mengetahui status pesananmu</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Pressable style={styles.btnBeranda} onPress={() => NavigatorService.navigate('Homepage', { content: 'Home' })}>
                        <Text style={styles.txtBtn}>Beranda</Text>
                    </Pressable>
                    <Pressable style={styles.btnBeranda} onPress={() => NavigatorService.navigate('Orderpage', { content: 'Belumbayar', mb_id: state.mb_id })}>
                        <Text style={styles.txtBtn}>Pesanan Saya</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        backgroundColor: '#f8f9f9',
        width: toDp(335),
        height: toDp(160),
        borderRadius: toDp(10),
        marginTop: toDp(10),
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 3,
    },
    txtKonfirm: {
        bottom: toDp(10),
        fontSize: toDp(14)
    },
    txtKet: {
        fontSize: toDp(12)
    },
    btnBeranda: {
        backgroundColor: '#2A334B',
        marginHorizontal: toDp(20),
        top: toDp(20),
        width: toDp(126),
        height: toDp(40),
        borderRadius: toDp(10),
        justifyContent: 'center'
    },
    txtBtn: {
        textAlign: 'center',
        color: 'white'
    }
});

export default SuccessorderCart;