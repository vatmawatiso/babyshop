import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ImageBackground,
  Pressable,
  AsyncStorage
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import BackHeader from '@BackHeader'
import NavigatorService from '@NavigatorService'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import axios from 'axios';
import { TouchableOpacity } from "react-native-gesture-handler";

const Settingtoko = (props) => {
  const [src, setSrc] = useState(null);

  const [state, setState] = useState({
    cityname: [],
    datas: [],
    mb_id: '',
    mb_name: '',
    mb_phone: '',
    loading: false,
    adr_mb_id: '',
  })

  useEffect(() => {

    AsyncStorage.getItem('member').then(response => {
      // console.log('Profil----------->'+ JSON.stringify(response));

      let data = JSON.parse(response);
      // const val = JSON.stringify(data);

      console.log('Profilefiks----------->' + JSON.stringify(data));

      setState(state => ({
        ...state,
        mb_id: data.mb_id,
        mb_name: data.value.mb_name,
        mb_phone: data.value.mb_phone,
        id_retail: data.retail_id,
      }))
      console.log('cek state SettingToko----------->' + JSON.stringify(state.id_retail));
      


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

  }, [])

  //get Jasa Pengiriman


  useEffect(() => {
    getJasa()

  }, [])

  // const countries = ["Jakarta", "Cirebon", "Bandung", "Kuningan"]

  const getJasa = () => {
    // setState(state => ({...state, loading: true }))
    axios.get('https://market.pondok-huda.com/dev/react/shipping/')
      .then(result => {
        // handle success
        setState(state => ({ ...state, datas: result.data.data }))
        console.log('----JASA=====>' + JSON.stringify(result.data.data));
        // alert(JSON.stringify(result.data));

      }).catch(err => {
        //console.log(err)
        alert('Gagal menerima data dari server!' + err)
        setState(state => ({ ...state, loading: false }))
      })
  }


  return (
    <View style={styles.container}>

      <BackHeader
        title={'Pengaturan Toko'}
        onPress={() => props.navigation.goBack()}
      />

      <View style={styles.content}>
        <View style={styles.viewProfiltoko}>
          <Image source={allLogo.store} style={styles.store} />
          <Text style={styles.txtProfiltoko}>Profil Toko</Text>
        </View>
        <View style={styles.viewInAn}>
          <Pressable style={styles.btnInfo} onPress={() => NavigatorService.navigate('Informasitoko')} >
            <Text style={styles.txtInfo}>Informasi Toko</Text>
          </Pressable>
          <Pressable style={styles.btnCatat} onPress={() => NavigatorService.navigate('underConstruction')} >
            <Text style={styles.txtCatatan}>Catatan Toko</Text>
          </Pressable>
        </View>
        <View style={styles.viewAlpeng} />

        <View style={styles.viewAlampengiriam}>
          <Image source={allLogo.location} style={styles.icon} />
          <Text style={styles.txtAlamPengiriman}>Alamat dan Pengiriman</Text>
        </View>
        <View style={styles.viewInAn}>
          <Pressable style={styles.btnAlamat} onPress={() => NavigatorService.navigate('Alamattoko', { adr_mb_id: state.mb_id })} >
            <Text style={styles.txtAlamat}>Alamat Toko</Text>
          </Pressable>
          <TouchableOpacity onPress={() => NavigatorService.navigate('Layananjasa', { id_retail: state.id_retail })}>
            <Text style={styles.txtLayananjasa}>Layanan Jasa</Text>
          </TouchableOpacity>
        </View>

      </View>

    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  viewInAn: {
    marginLeft: toDp(40),
    bottom: toDp(10)
  },
  viewProfiltoko: {
    flexDirection: 'row',
    margin: toDp(10)
  },
  txtProfiltoko: {
    padding: toDp(5),
    bottom: toDp(2),
    left: toDp(2),
    fontWeight: 'bold'
  },
  btnInfo: {
    height: toDp(20),
    width: toDp(90)
  },
  btnCatat: {
    top: toDp(5),
    height: toDp(20),
    width: toDp(80)
  },
  viewAlpeng: {
    borderWidth: toDp(0.5),
    borderColor: 'grey'
  },
  viewAlampengiriam: {
    flexDirection: 'row',
    margin: toDp(10)
  },
  txtAlamPengiriman: {
    padding: toDp(5),
    fontWeight: 'bold',
    top: toDp(5),
    right: toDp(13)
  },
  btnAlamat: {
    height: toDp(20),
    width: toDp(70)
  },
  txtLayananjasa: {
    top: toDp(1),
    fontSize: toDp(12),
  },
  icon: {
    width: toDp(38),
    height: toDp(38),
    right: toDp(8)
  },
  content: {
    backgroundColor: '#F9F8F8',
    top: toDp(20),
    width: toDp(335),
    height: toDp(190),
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
  iconic: {
    tintColor: '#f4360c'
  },
  txtInfo: {
    fontSize: toDp(12),
    marginBottom: toDp(5)
  },
  txtCatatan: {
    fontSize: toDp(12)
  },
  txtAlamat: {
    fontSize: toDp(12),
    marginBottom: toDp(5),
  },
  txtLayanan: {
    fontSize: toDp(12)
  },
  dropdown: {
    height: toDp(25),
    borderRadius: toDp(20),
    width: toDp(335),
    backgroundColor: '#F9F8F8',
    right: toDp(40),
  },
  store: {
    width: toDp(24),
    height: toDp(24),
    resizeMode: 'contain',
    tintColor: '#ea421e'
  },
});

export default Settingtoko;