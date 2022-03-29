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
  ScrollView
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import BackHeader from '@BackHeader'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import NavigatorService from '@NavigatorService'

const Tokobangunan = (props) => {

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

  const renderswitch = (item, index) => (
    <View style={[styles.body, { marginTop: toDp(5), justifyContent: 'center', alignItems: 'center', marginHorizontal: 12 }]}>
      <View style={{right:toDp(40)}}>
        <Image source={{ uri: item.image }} style={styles.imgKontak} />
      </View>
      <View style={styles.content}>
        <View style={{ flexDirection: 'row' }}>
          <Text>Nama</Text>
          <Text style={styles.txtNama}>{item.nama}</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text>Telepon</Text>
          <Text style={styles.txtHP}>{item.telepon}</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text>Alamat</Text>
          <Text style={styles.txtHarga}>{item.alamat}</Text>
        </View>
      </View>

      <Pressable style={styles.btnLihat} onPress={() => NavigatorService.navigate('Profilseller')}>
        <Text style={styles.txtLihat}>Lihat</Text>
      </Pressable>
    </View>
  )

  return (
    <View style={styles.container}>
      <BackHeader
        title={'Toko Bangunan'}
        onPress={() => props.navigation.goBack()}
      />
      <View style={styles.flatcontent}>
        <FlatList style={{ width: '100%' }}
          data={DATA}
          renderItem={({ item, index }) => {
            return (
              renderswitch(item, index)
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
    justifyContent: 'center',
    alignItems: 'center',
    top: toDp(30),
    // backgroundColor: 'red'
  },
  body: {
    flexDirection: 'row',
    backgroundColor: '#C4C4C4',
    width: toDp(335),
    height: toDp(80),
    borderRadius: toDp(20),
    top: toDp(10),
    justifyContent: 'space-between',
    marginBottom: toDp(2),
    // right:toDp(10)
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
  },
  txtLihat: {
    textAlign: 'center',
    fontSize: toDp(12),
    color: 'white'
  },
  txtNama: {
    left: toDp(22)
  },
  txtHP: {
    left: toDp(10)
  },
  txtHarga: {
    left: toDp(22)
  },
  btnLihat: {
    backgroundColor: '#2A334B',
    width: toDp(52),
    height: toDp(20),
    borderRadius: toDp(20),
    left:toDp(35)
  }
});

export default Tokobangunan;