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
  ScrollView,
  TouchableOpacity
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import Header from '@Header'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import NavigatorService from '@NavigatorService'
import axios from "axios";

const Tokobangunan = (props) => {

  const [state, setState] = useState({
    datas: [],
  })

  useEffect(() => {
    Tokobangunan()
  }, [])

  const Tokobangunan = () => {
    axios.get('https://market.pondok-huda.com/dev/react/retail/')
      .then(result => {
        //hendle success
        setState(state => ({ ...state, datas: result.data.data }))
        console.log('Toko Bangunan ===> ' + JSON.stringify(result.data.data));

      }).catch(err => {
        alert('Gagal menerima data dari server!' + err)
        setState(state => ({ ...state, loading: false }))
      })
  }

  const DATA = [
    {
      id: '1',
      nama: 'TB Jaya Abadi',
      telepon: '083141520987',
      alamat: 'Bandung',
      image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    },
    {
      id: '2',
      nama: 'TB Jaya Abadi',
      telepon: '083141520987',
      alamat: 'Bandungbae',
      image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    },
    {
      id: '3',
      nama: 'TB Jaya Abadi',
      telepon: '083141520987',
      alamat: 'Bandung',
      image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    },
    {
      id: '4',
      nama: 'TB Jaya Abadi',
      telepon: '083141520987',
      alamat: 'Bandung',
      image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    },
    {
      id: '5',
      nama: 'TB Jaya sukses',
      telepon: '083141520987',
      alamat: 'Bali',
      image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    },
    {
      id: '6',
      nama: 'TB Jaya Abadi',
      telepon: '083141520987',
      alamat: 'Indramayu',
      image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    },
    {
      id: '7',
      nama: 'TB Jaya Abadi',
      telepon: '083141520987',
      alamat: 'Majalengka',
      image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    },
    {
      id: '8',
      nama: 'TB Jaya Abadi',
      telepon: '083141520987',
      alamat: 'Kuningan',
      image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    },
    {
      id: '9',
      nama: 'TB Jaya Abadi',
      telepon: '083141520987',
      alamat: 'Bogor',
      image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    },
    {
      id: '10',
      nama: 'TB Jaya Abadi',
      telepon: '083141520987',
      alamat: 'Cirebon',
      image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    }, {
      id: '11',
      nama: 'TB Jaya Abadi',
      telepon: '083141520987',
      alamat: 'Jakarta',
      image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    },
    {
      id: '12',
      nama: 'TB Jaya Abadi',
      telepon: '083141520987',
      alamat: 'Banten',
      image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    }, {
      id: '13',
      nama: 'TB Jaya Abadi',
      telepon: '083141520987',
      alamat: 'Tasikmalaya',
      image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    },
  ]

  const ListToko = (item, index) => (
    <View style={[styles.body, { marginTop: toDp(5), alignItems: 'center', marginHorizontal: toDp(12) }]}>
      <TouchableOpacity style={{ width: toDp(330) }} onPress={() => NavigatorService.navigate('Profilseller')}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: toDp(10) }}>
          <Image source={{ uri: DATA[0].image }} style={styles.imgKontak} />
          <View style={{ flexDirection: 'row', marginLeft: toDp(10) }}>
            <View>
              <Text>Nama</Text>
              <Text>Telepon</Text>
              <Text>Alamat</Text>
              <Text>Latitude</Text>
              <Text>Longtitude</Text>
            </View>
            <View>
              <Text> : {item.rtl_name}</Text>
              <Text> : {item.rtl_phone}</Text>
              <Text> : {item.rtl_address} {item.cty_name}</Text>
              <Text> : {item.rtl_long}</Text>
              <Text> : {item.rtl_lat}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )

  return (
    <View style={styles.container}>
      <Header
        title={'Notification'}
        onPress={() => props.navigation.goBack()}
      />
      <View style={styles.flatcontent}>
        <FlatList style={{ width: '100%' }}
          data={state.datas}
          renderItem={({ item, index }) => {
            return (
              ListToko(item, index)
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
    flex: 1
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'red'
  },
  body: {
    flexDirection: 'row',
    backgroundColor: '#f8f9f9',
    width: toDp(335),
    height: toDp(110),
    borderRadius: toDp(10),
    top: toDp(10),
    justifyContent: 'space-between',
    marginBottom: toDp(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 3,
  },
  content: {
    right: toDp(10),
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
    borderRadius: toDp(20),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 3,
  },
});

export default Tokobangunan;