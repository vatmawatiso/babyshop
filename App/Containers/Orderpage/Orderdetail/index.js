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
import Order from '@Order'
import { Card } from "react-native-paper";
import NumberFormat from 'react-number-format';
import axios from 'axios';

const Orderdetail = (props) => {
  const DATA = [
    {
      id: '2938492',
      tb: 'Jaya Abadi Bandung',
      diproses: 'Selesai',
      produk: 'Gerobak Pasir',
      harga: 'Rp 500.000',
      jumlah: '2',
      total: 'Rp 800.0000',
      konfirmasi: 'Dibatalkan Pembeli',
      pembayaran: 'BCA',
      image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    },
  ]

  const Pengiriman = [
    {
      id: '1',
      kurir: 'Rudi Prakasa',
      NoResi: '8344389479234',
    },
  ]

  const Address = [
    {
      id: '1',
      nama: 'Vatmawati',
      telepon: '083141520987',
      alamat: 'Jl KiSulaiman Kota Cirebon'
    },
  ]

  const [state, setState] = useState({
    datas: [],
    order: '',
    information: '',
    item: '',
    mb_id: '',
    odr_id: '',

})

  useEffect(() => {
    //*Bagian Update
    getDetailorder()
}, [])

const getDetailorder = () => {
  let mb = props.mbid;
  let content = props.con;
  

  axios.get('https://market.pondok-huda.com/dev/react/order/getodr/' + mb + '/' + content)
      .then(result => {
          //hendle success
          console.log('full ===> ' + JSON.stringify(result.data.data));
          setState(state => ({ ...state, datas: result.data.data }))
          //
          // console.log('ongkir ===> ' + JSON.stringify(result.data.data[0].items[0].price));
          // console.log('data order ===> ' + JSON.stringify(result.data.order));
          // console.log('data informasi ===> ' + JSON.stringify(result.data.information));
          // console.log('data item ===> ' + JSON.stringify(result.data.item));

      }).catch(err => {
          alert('Gagal menerima data dari server!' + err)
          setState(state => ({ ...state, loading: false }))
      })
}



  const ListToko = (item, index) => (
    <View style={[styles.body, { backgroundColor:'#fff', height:toDp(220),}]}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={{fontWeight:'bold', fontSize:toDp(13), marginHorizontal:toDp(20)}}>{item.diproses}</Text>

        <View style={styles.OrderDetail}>
          <Text style={styles.txtOrder}>{DATA[0].tb}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', top: toDp(10) }}>
            <Image source={allLogo.icgerobak} style={styles.icAddress} />
            <Text style={{ top: toDp(20), right: toDp(30) }}>{DATA[0].produk}</Text>
            <Text style={{ top: toDp(80), right: toDp(10) }}>{DATA[0].jumlah}x</Text>
          </View>
          <NumberFormat
            value={DATA[0].harga}
            displayType={'text'}
            thousandSeparator={'.'}
            decimalSeparator={','}
            prefix={'Rp. '}
            renderText={formattedValue => <Text style={{ bottom: toDp(50), left: toDp(128), color: '#f83308' }}>{formattedValue}</Text>} // <--- Don't forget this!
          />
          <View style={{ borderWidth: toDp(0.5), borderColor: 'grey', bottom: toDp(10) }} />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', bottom: toDp(10), margin: toDp(5) }}>
            <Text style={styles.txtCard}>{DATA[0].jumlah} Produk</Text>
            {/* <Text style={styles.txtCard}>{DATA[0].total}</Text> */}
            <NumberFormat
              value={DATA[0].total}
              displayType={'text'}
              thousandSeparator={'.'}
              decimalSeparator={','}
              prefix={'Rp. '}
              renderText={formattedValue => <Text style={{ color: '#f83308' }}>{formattedValue}</Text>} // <--- Don't forget this!
            />
          </View>
        </View>


      </ScrollView>

    </View>
  )

  return (
    <View style={styles.container}>
      <Order
        title={'Pesanan Saya'}
        onPress={() => props.navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.contentContainer1}>

        <View style={styles.flatcontent}>
          <FlatList style={{ width: '100%' }}
            data={DATA}
            renderItem={({ item, index }) => {
              return (
                ListToko(item, index)
              )
            }}
            ListFooterComponent={() => <View style={{ height: toDp(100) }} />}
          />
        </View>

        <Text style={{ fontWeight: 'bold', left: toDp(22), bottom: toDp(110) }}>Rincian Pembayaran</Text>

        <View style={styles.PaymentDetails}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: toDp(10), }}>
            <Text style={{ right: toDp(10) }}>Metode Pembayaran</Text>
            <Text>{DATA[0].pembayaran}</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: toDp(10), }}>
            <Text style={{ right: toDp(10) }}>Sub Total Produk</Text>
            <NumberFormat
              value={700000}
              displayType={'text'}
              thousandSeparator={'.'}
              decimalSeparator={','}
              prefix={'Rp. '}
              renderText={formattedValue => <Text style={{ color: '#f83308' }}>{formattedValue}</Text>} // <--- Don't forget this!
            />
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: toDp(10), }}>
            <Text style={{ right: toDp(10) }}>Sub Total Diskon</Text>
            <NumberFormat
              value={50000}
              displayType={'text'}
              thousandSeparator={'.'}
              decimalSeparator={','}
              prefix={'Rp. '}
              renderText={formattedValue => <Text style={{ color: '#f83308' }}>{formattedValue}</Text>} // <--- Don't forget this!
            />
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: toDp(10), }}>
            <Text style={{ right: toDp(10) }}>Biaya Penanganan</Text>
            <NumberFormat
              value={50000}
              displayType={'text'}
              thousandSeparator={'.'}
              decimalSeparator={','}
              prefix={'Rp. '}
              renderText={formattedValue => <Text style={{ color: '#f83308' }}>{formattedValue}</Text>} // <--- Don't forget this!
            />
          </View>

          <View style={{ borderWidth: toDp(0.5), borderColor: 'grey', right: toDp(10), width: toDp(314), bottom: toDp(0) }} />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: toDp(10), }}>
            <Text style={{ right: toDp(10), fontWeight: 'bold', color: '#f83308' }}>Total Pembayaran</Text>
            <NumberFormat
              value={800000}
              displayType={'text'}
              thousandSeparator={'.'}
              decimalSeparator={','}
              prefix={'Rp. '}
              renderText={formattedValue => <Text style={{ color: '#f83308', fontWeight: 'bold' }}>{formattedValue}</Text>} // <--- Don't forget this!
            />
          </View>
        </View>
        {/* </ScrollView> */}


      </ScrollView>


    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  flatcontent: {
    width: '100%',
    alignItems: 'center',
    // justifyContent: 'center',
    marginTop: toDp(-20)
  },
  contentContainer: {
    paddingVertical: toDp(0),
  },
  contentContainer1: {
    paddingVertical: toDp(30),
  },
  content: {
    flexDirection: 'row',
  },
  txtOrder: {
    margin: toDp(7),
    bottom: toDp(40),
  },
  information: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: toDp(10),
    bottom: toDp(50),
  },
  txtOrder: {
    fontWeight: 'bold',
    fontSize: toDp(12),
    left: toDp(8),
    top: toDp(8)
  },
  OrderDetail: {
    backgroundColor: '#F9F8F8',
    padding: toDp(10),
    borderRadius: toDp(10),
    width: toDp(314),
    height: toDp(180),
    left: toDp(23),
    bottom: toDp(0),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  buttonPay: {
    backgroundColor: '#2A334B',
    borderRadius: toDp(15),
    width: toDp(97),
    height: toDp(34),
    fontSize: toDp(11),
    justifyContent: 'center',
    bottom: toDp(8),
  },
  txtButtonPay: {
    color: 'white',
    fontSize: toDp(12),
    textAlign: 'center'
  },
  ShippingInfo: {
    backgroundColor: '#F9F8F8',
    borderRadius: toDp(10),
    width: toDp(314),
    height: toDp(165),
    left: toDp(23),
    justifyContent: 'space-between',
    paddingLeft: toDp(10),
    bottom: toDp(20),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  PaymentDetails: {
    backgroundColor: '#F9F8F8',
    borderRadius: toDp(10),
    bottom:toDp(100),
    width: toDp(314),
    height: toDp(195),
    left: toDp(23),
    justifyContent: 'space-between',
    paddingLeft: toDp(10),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  }
});

export default Orderdetail;
