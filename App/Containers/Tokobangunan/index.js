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
import Axios from "axios";

const Tokobangunan = (props) => {
  const[state, setState] = useState({
    dataRetail: []
  })

  useEffect(() => {
    getRetail()
  })

  const getRetail = () => {
    Axios.get('https://market.pondok-huda.com/dev/react/retail/')
      .then(result => {
        // console.log('result', result);
        setState(state => ({...state, dataRetail: result.data.data}))
        console.log('result2 =>', result.data.data)
      }).catch(error => {
        console.log(error)
      })
  }
  const displayName = (rtl_name) =>{
    let count = '';
    let nama  = '';
    count = rtl_name.split(' ' || '-');
    nama  = count.slice(0, 3).join(' ');
    return nama
}

  const renderswitch = (item, index) => (
    <View style={[styles.body, { marginTop: toDp(5), justifyContent: 'center', alignItems: 'center', marginHorizontal: 12 }]}>
      <View style={{right:toDp(40)}}>
        <Image source={require('../../Assets/img/tzuyu.jpg')} style={styles.imgKontak} />
      </View>
      <View style={styles.content}>
        <View style={{ flexDirection: 'row' }}>
          <Text>Nama</Text>
          <Text style={styles.txtNama}>{displayName(item.rtl_name)}</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text>Telepon</Text>
          <Text style={styles.txtHP}>{item.rtl_phone}</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text>Alamat</Text>
          <Text style={styles.txtHarga}>{displayName(item.rtl_addres)}</Text>
        </View>
      </View>

      <Pressable style={styles.btnLihat} onPress={() => alert('Hallo')}>
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
          data={state.dataRetail}
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