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
import  Back  from '@Back'
import NavigatorService from '@NavigatorService'
import Axios from "axios";
import NumberFormat from "react-number-format";

const { width, height } = Dimensions.get('window')

const Successorder = (props) => {
  const [state, setState] = useState({
    totalProdukCart: '',
    dataProdukCart: [],
    totalAkhir: ''
  })

  useEffect(() => {
    getCartProduk()
  },[])

     // get produk yg udah masuk ke keranjang
     const getCartProduk = () => {
      AsyncStorage.getItem('uid').then(uids => {
          let aid = uids;
          Axios.get('https://market.pondok-huda.com/dev/react/cart/?mb_id=' + aid)
              .then(response => {
                  if (response.data.status == 200) {
                      console.log('response produk cart =>', JSON.stringify(response))
                      setState(state => ({ ...state, dataProdukCart: response.data.data }))
                      setState(state => ({ ...state, totalProdukCart: response.data.total }))
                      let total = state.totalProdukCart;
                      let totalSemua = Number(total);
                      setState(state => ({...state, totalAkhir: totalSemua}))
                      console.log('total akhir', state.totalAkhir)
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
                renderText={formattedValue => <Text style={{ bottom: toDp(0), left: toDp(0), fontSize: toDp(12), color: '#F83308', fontWeight: '800' }}>{formattedValue}</Text>} // <--- Don't forget this!
            />
            <Text style={styles.txtKet}>silahkan cek untuk mengetahui status pesananmu</Text>
                <View style={{flexDirection:'row'}}>
                    <Pressable style={styles.btnBeranda} onPress={()=> NavigatorService.navigate('Homepage', {content:'Home'})}>
                        <Text style={styles.txtBtn}>Beranda</Text>
                    </Pressable>
                    <Pressable style={styles.btnBeranda} onPress={()=> NavigatorService.navigate('Orderpage', {content:'Belumbayar'})}>
                        <Text style={styles.txtBtn}>Pesanan Saya</Text>
                    </Pressable>
                </View>
        </View>    
     </View>
    );
  
}

const styles = StyleSheet.create({
  container: {
    justifyContent:'center',
    alignItems: 'center',
  },
  content: {
      backgroundColor:'#C4C4C4',
      width:toDp(335),
      height:toDp(139),
      borderRadius:toDp(20),
      marginTop:toDp(10),
      justifyContent:'center',
      alignItems:'center'
  },
  txtKonfirm: {
      bottom:toDp(10),
      fontSize:toDp(14)
  },
  txtKet: {
      fontSize:toDp(12)
  },
  btnBeranda: {
      backgroundColor:'#2A334B',
      marginHorizontal:toDp(20),
      top:toDp(20),
      width:toDp(126),
      height:toDp(40),
      borderRadius:toDp(20),
      justifyContent:'center'
  },
  txtBtn: {
      textAlign:'center',
      color:'white'
  }
});

export default Successorder;