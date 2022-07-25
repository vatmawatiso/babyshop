import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Alert,
  TextInput,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import BackHeader from '@BackHeader'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import NavigatorService from '@NavigatorService'
import axios from "axios";
import NumberFormat from 'react-number-format';

const Konsultan = (props) => {

  const [state, setState] = useState({
    datas: [],
    loading: false,
    loading: true,
  })

  useEffect(() => {
    arsitek()
  }, [])

  const arsitek = () => {
    setState(state => ({ ...state, loading: true }))
    axios.get('https://market.pondok-huda.com/dev/react/architect/')
      .then(result => {
        //hendle success
        setState(state => ({ ...state, datas: result.data.data }))
        console.log('Konsultan=Arsitek ===>' + JSON.stringify(result.data.data));
      }).catch(err => {
        alert('Gagal menerima data dari server!' + err)
        setState(state => ({ ...state, loading: false }))
      })
  }

  const DATA = [
    {
      id: '1',
      nama: 'Vatmawati',
      email: 'Vatma@gmail.com',
      telepon: '083141520987',
      perusahaan: 'PT. Jaya Citra',
      harga: '1.000.000',
      image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    },
    {
      id: '2',
      nama: 'Vatmawati',
      email: 'Vatma@gmail.com',
      telepon: '083141520987',
      perusahaan: 'PT. Jaya Citra',
      harga: '1.000.000',
      image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    },
    {
      id: '3',
      nama: 'Vatmawati',
      email: 'Vatma@gmail.com',
      telepon: '083141520987',
      perusahaan: 'PT. Jaya Citra',
      harga: '1.000.000',
      image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    },
    {
      id: '4',
      nama: 'Vatmawati',
      email: 'Vatma@gmail.com',
      telepon: '083141520987',
      perusahaan: 'PT. Jaya Citra',
      harga: '1.000.000',
      image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    },
    {
      id: '5',
      nama: 'Vatmawati',
      email: 'Vatma@gmail.com',
      telepon: '083141520987',
      perusahaan: 'PT. Jaya Citra',
      harga: '1.000.000',
      image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    },
    {
      id: '6',
      nama: 'Vatmawati',
      telepon: '083141520987',
      perusahaan: 'PT. Jaya Citra',
      harga: '1.000.000',
      image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    },
    {
      id: '7',
      nama: 'Vatmawati',
      email: 'Vatma@gmail.com',
      telepon: '083141520987',
      perusahaan: 'PT. Jaya Citra',
      harga: '1.000.000',
      image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    },
    {
      id: '8',
      nama: 'Vatmawati',
      email: 'Vatma@gmail.com',
      telepon: '083141520987',
      perusahaan: 'PT. Jaya Citra',
      harga: '1.000.000',
      image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    },
    {
      id: '9',
      nama: 'Vatmawati',
      email: 'Vatma@gmail.com',
      telepon: '083141520987',
      perusahaan: 'PT. Jaya Citra',
      harga: '1.000.000',
      image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    },
    {
      id: '10',
      nama: 'Vatmawati',
      email: 'Vatma@gmail.com',
      telepon: '083141520987',
      perusahaan: 'PT. Jaya Citra',
      harga: '1.000.000',
      image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    }, {
      id: '11',
      nama: 'Vatmawati',
      email: 'Vatma@gmail.com',
      telepon: '083141520987',
      perusahaan: 'PT. Jaya Citra',
      harga: '1.000.000',
      image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    },
    {
      id: '12',
      nama: 'Vatmawati',
      email: 'Vatma@gmail.com',
      telepon: '083141520987',
      perusahaan: 'PT. Jaya Citra',
      harga: '1.000.000',
      image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    },
    {
      id: '13',
      nama: 'Vatmawati',
      email: 'Vatma@gmail.com',
      telepon: '083141520987',
      perusahaan: 'PT. Jaya Citra',
      harga: '1.000.000',
      image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    },
    {
      id: '14',
      nama: 'Vatmawati',
      email: 'Vatma@gmail.com',
      telepon: '083141520987',
      perusahaan: 'PT. Jaya Citra Abadi',
      harga: '1.000.000',
      image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    },
  ]


  const KonsultanArsitek = (item, index) => (
    <View style={[styles.body, { marginTop: toDp(10), alignItems: 'center', marginHorizontal: toDp(12) }]}>

      <View style={styles.body}>
        <Image source={{ uri: DATA[0].image }} style={styles.imgKontak} />
        <View style={{ flexDirection: 'row', marginRight: toDp(20) }}>
          <View>
            <Text style={{ fontSize: toDp(12) }}>Nama</Text>
            <Text style={{ fontSize: toDp(12) }}>Email</Text>
            <Text style={{ fontSize: toDp(12) }}>Telepon</Text>
            <Text style={{ fontSize: toDp(12) }}>Perusahaan</Text>
            <Text style={{ fontSize: toDp(12) }}>Harga</Text>
          </View>
          <View>
            <Text style={{ fontSize: toDp(12) }}> : {item.ac_name}</Text>
            <Text style={{ fontSize: toDp(12) }}> : {item.ac_email}</Text>
            <Text style={{ fontSize: toDp(12) }}> : {item.ac_phone}</Text>
            <Text style={{ fontSize: toDp(12) }}> : {item.name_pt}</Text>
            <NumberFormat
              value={item.ac_payment}
              displayType={'text'}
              thousandSeparator={'.'}
              decimalSeparator={','}
              prefix={'Rp. '}
              renderText={formattedValue => <Text style={{ fontSize: toDp(12) }}> : {formattedValue}</Text>} // <--- Don't forget this!
            />
            {/* <Text style={{ fontSize: toDp(12) }}> : {item.ac_payment}</Text> */}
          </View>
        </View>

        <TouchableOpacity style={styles.btnBuka}>
          <Image source={allLogo.Chat1} style={styles.iclineright} />
        </TouchableOpacity>

        {/* <Pressable style={styles.btnKontak} onPress={() => NavigatorService.navigate('underConstruction')}>
          <Text style={styles.txtKontak}>Kontak</Text>
        </Pressable> */}
      </View>

    </View>

  )



  return (
    <View style={styles.container}>
      <BackHeader
        title={'Konsultan'}
        onPress={() => props.navigation.goBack()}
      />

      <View style={styles.flatcontent}>
        <FlatList style={{ width: '100%' }}
          data={state.datas}
          renderItem={({ item, index }) => {
            return (
              KonsultanArsitek(item, index)
            )
          }}
          ListFooterComponent={() => <View style={{ height: toDp(120) }} />}
        />
      </View>

    </View>

  );

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    height: '100%'
  },
  iclineright: {
    width:toDp(30),
    height:toDp(30),
    tintColor:'#F83308'
  },
  btnBuka: {
    backgroundColor: '#F8f9f9',
    width: toDp(28),
    height: toDp(28),
    right:toDp(10),
    // borderBottomWidth: 1,
    // borderBottomColor: '#2A334B',
    // borderWidth:0.5,
    alignItems:'center',
    backgroundColor: '#fcd4c7',
    justifyContent: 'center',
    borderRadius: toDp(20),
  },
  body: {
    flexDirection: 'row',
    backgroundColor: '#F9F8F8',
    width: toDp(335),
    height: toDp(100),
    borderRadius: toDp(10),
    borderBottomWidth: 5,
    borderBottomColor: '#2A334B',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  flatcontent: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: toDp(45)
  },
  imgKontak: {
    height: toDp(50),
    width: toDp(50),
    borderRadius: toDp(10),
    left: toDp(10)
  },
  txtKontak: {
    fontSize: toDp(12),
    color: 'white',
    textAlign: 'center',
  },
  btnKontak: {

    right: toDp(10),
    backgroundColor: '#2A334B',
    width: toDp(52),
    height: toDp(20),
    borderRadius: toDp(5),
  },
});

export default Konsultan;