import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  StatusBar,
  ImageBackground,
  Pressable,
  FlatList,
  AsyncStorage,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import NonCart from '@NonCart'
import { Card } from "react-native-paper";
import NumberFormat from 'react-number-format';
import axios from 'axios';
import { svr } from "../../../Configs/apikey";

const Invoice = (props) => {

  const [state, setState] = useState({
    datas: [],
    odr_id: '',
    tanggal_transaksi: '',
    ongkir: '',
    PRODUK: '',
    HARGA: '',
    TOTAL: '',
    TransactionId: '',
    Nama: '',
    Alamat: '',
    NamaTokoBangunan: ''
  })

  useEffect(() => {

    getInvoice()

  }, [])


  const getInvoice = () => {
    let odrid = props.navigation.state.params.odr_id;
    console.log('odrid ', odrid);
    // https://market.pondok-huda.com/publish/react/transaksi/invoice/ODR000000014/Q4Z96LIFSXUJBK9U6ZACCB2CJDQAR0XH4R6O6ARVG
    axios.get(svr.url + 'transaksi/invoice/' + odrid + '/' + svr.api)
      .then(response => {
        console.log('cek response  invoice = ' + JSON.stringify(response.data));

        if (response.data.status == 200) {
          console.log('response invoice =>' + JSON.stringify(response.data))
          setState(state => ({ ...state, datas: response.data.data }))
          setState(state => ({ ...state, loading: false }))
        } else if (response.data.status == 500) {
          console.log('error')
          setState(state => ({ ...state, loading: false }))
        }

      }).catch(error => {
        console.log('error response ==> ', error);
      });
  }


  return (
    <View style={styles.container}>
      <NonCart
        title={'Invoice'}
        onPress={() => props.navigation.goBack()}
        onDownload={() => props.navigation.navigate('')}
      />

      {state.datas.map((item, index) => {
        return (
          <View style={styles.menus}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: toDp(15), width: toDp(340) }}>
              <Image source={allLogo.icbina} style={{ width: toDp(130), height: toDp(50), tintColor: 'black' }}></Image>
              <View style={{ alignItems: 'flex-start', marginRight: toDp(96) }}>
                <Text style={{ fontSize: toDp(14), fontWeight: 'bold' }}>INVOICE</Text>
                <Text style={{ color: '#F83308', fontSize: toDp(14) }}>{item.TransactionId}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: toDp(20), width: toDp(340) }}>
              <View style={{ width: toDp(150) }}>
                <Text style={styles.text}>DITERBITKAN ATAS NAMA</Text>
                <Text style={styles.txt}>Toko Bangunan: {item.NamaTokoBangunan}</Text>
              </View>
              <View style={{ width: toDp(150) }}>
                <Text style={styles.text}>UNTUK</Text>
                <Text style={styles.txt}>Nama: {item.Nama}</Text>
                <Text style={styles.txt}>Tgl transaksi: {item.tanggal_transaksi}</Text>
                <Text style={styles.txt}>Alamat: {item.Alamat}</Text>
              </View>
            </View>
            <View style={{ marginTop: toDp(20) }}>
              <View style={styles.line}></View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: toDp(10), marginBottom: toDp(10) }}>
                <Text>PRODUK</Text>
                <Text>JUMLAH</Text>
                <Text>HARGA</Text>
                {/* <Text>TOTAL</Text> */}
              </View>
              <View style={styles.line}></View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: toDp(340), marginTop: toDp(10), marginLeft: toDp(0) }}>
                <Text style={{ color: '#F83308', width: toDp(90), }}>{item.PRODUK}</Text>
                <Text>{item.JUMLAH}</Text>
                <NumberFormat
                  value={item.HARGA}
                  displayType={'text'}
                  thousandSeparator={'.'}
                  decimalSeparator={','}
                  prefix={'Rp. '}
                  renderText={formattedValue => <Text style={{ left: toDp(16), }}>{formattedValue}</Text>} // <--- Don't forget this!
                />
                {/* <Text style={{ left: 10 }}>Rp. {item.HARGA}</Text> */}
                {/* <Text>Rp. {item.HARGA}</Text> */}
              </View>
              <View style={styles.line2}></View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: toDp(340), marginLeft: toDp(-15) }}>
                <View style={{ width: toDp(100) }}></View>
                <View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: toDp(200) }}>
                    <View style={{ marginLeft: toDp(10) }}>
                      <Text style={styles.txts}>SUBTOTAL</Text>
                      <Text style={styles.txts}>ONGKIR</Text>
                      <Text style={[styles.txts, { fontWeight: 'bold' }]}>TOTAL</Text>
                    </View>

                    <View style={{marginTop:toDp(7), marginLeft:toDp(5)}}>
                      <NumberFormat
                        value={parseInt(item.HARGA)}
                        displayType={'text'}
                        thousandSeparator={'.'}
                        decimalSeparator={','}
                        prefix={'Rp. '}
                        renderText={formattedValue => <Text style={{ left: toDp(0), }}>{formattedValue}</Text>} // <--- Don't forget this!
                      />
                      <NumberFormat
                        value={parseInt(item.ongkir)}
                        displayType={'text'}
                        thousandSeparator={'.'}
                        decimalSeparator={','}
                        prefix={'Rp. '}
                        renderText={formattedValue => <Text style={{ marginTop: toDp(10), }}>{formattedValue}</Text>} // <--- Don't forget this!
                      />
                      <NumberFormat
                        value={parseInt(item.HARGA)+ parseInt(item.ongkir)}
                        displayType={'text'}
                        thousandSeparator={'.'}
                        decimalSeparator={','}
                        prefix={'Rp. '}
                        renderText={formattedValue => <Text style={{ marginTop: toDp(10), }}>{formattedValue}</Text>} // <--- Don't forget this!
                      />
                      {/* <Text style={styles.txts}>Rp. {parseInt(item.HARGA)}</Text> */}
                      {/* <Text style={styles.txts}>Rp. {parseInt(item.ongkir)}</Text> */}
                      {/* <Text style={styles.txts}>Rp. {Number(item.HARGA) + Number(item.ongkir)}</Text> */}
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  menus: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: toDp(12),
    fontWeight: 'bold'
  },
  txt: {
    fontSize: toDp(12),
    fontWeight: 'normal',
    fontFamily: 'Poppins',
    marginTop: toDp(3),
  },
  line: {
    backgroundColor: 'black',
    height: toDp(3),
    width: toDp(340)
  },
  line2: {
    backgroundColor: '#E1E1E1',
    height: toDp(1),
    width: toDp(340),
    marginTop: toDp(10)
  },
  txts: {
    fontSize: toDp(14),
    marginTop: toDp(10)
  },

});

export default Invoice;
