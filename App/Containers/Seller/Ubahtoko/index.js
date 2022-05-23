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
import { TextInput } from "react-native-gesture-handler";
import axios from 'axios';

const Ubahtoko = (props) => {
  const [src, setSrc] = useState(null);

  const DATA = [
    {
      id: '2938492',
      image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    },
  ]

  const [state, setState] = useState({
    loading: false,
    nama: '',
    deskripsi: '',
    datas:[],
    rtl_name: [],
    rtl_mb_id:[],
    rtl_phone:[],
    rtl_addres:[],
    rtl_city:[],
    rtl_status:[],
    rtl_long:[],
    rtl_lat:[],
  })

  // ===> GET nama member di profil seller <== //

  useEffect(() => {

  AsyncStorage.getItem('member').then(response => {
    //console.log('CEK nama member ===>'+ JSON.stringify(response));

    let data = JSON.parse(response);

    console.log('HASIL Nama ===>'+ JSON.stringify(data));

    setState(state => ({
      ...state,
      rtl_mb_id: data.rtl_mb_id,
      mb_name: data.value.mb_name,
    }))


  }).catch(err => {
    console.log('err', err)
  })

}, [])

// ===> GET Profil Seller <== //

useEffect (() => {
  getProfilseller()
}, [])

const getProfilseller = () => {
  setState(state => ({...state, loading: true}))
  axios.get('https://market.pondok-huda.com/dev/react/retail/')
  .then(result => {
    if(result.data.status == 200) {
      console.log('CEK Profil Seller =>', result)
      setState(state => ({...state, datas: result.data.data}))
      setState(state => ({...state, loading: false}))
    } else if (result.data.status == 500){
      console.log('error')
      setState(state => ({...state, loading: false}))
    }
  }).catch(error => {
    console.log('error Profil Seller => ', error)
    setState(state => ({...state, loading: false}))
  })
}

// ===> POST Porifl Seller atau Retail <=== //

const InputProfil = async (rtl_mb_id) => {
  const body = {
    rtl_mb_id: state.rtl_mb_id,
    rtl_name: state.rtl_name,
    rtl_phone: state.rtl_phone,
    rtl_addres: state.rtl_addres,
    rtl_lat: state.rtl_lat,
    rtl_long: state.rtl_long,
  }
  console.log('CEK BODY ===> '+ JSON.stringify(body));

  setState(state => ({ ...state, loading: true }))
  axios.get('https://market.pondok-huda.com/dev/react/retail/', body)
    .then(response => {

      console.log('CEK URL ===>'+ JSON.stringify(response.data.status));

      if (response.data.status === 201) {
        alert('Berhasil tambah data diri!')

        NavigatorService.navigate('Informasitoko')

        console.log('CEK Hasil Profil Seller ===>' + JSON.stringify(response.data));

        setState(state => ({ ...state, loading: false }))

      } else {
        alert('Gagal Tambah Data Diri!')
        setState(state => ({ ...state, loading: false }))

        console.log('CEK ERROR ===>' +JSON.stringify(response.data));
      }

    }).catch(err => {
      // console.log(err)
      alert('Gagal menerima data dari server!' + err)
      setState(state => ({ ...state, loading: false }))
    })
}



  return (
    <View style={styles.container}>

      <BackHeader
        title={'Ubah Toko'}
        onPress={() => props.navigation.goBack()}
      />

      <View style={styles.profilToko}>
        <Image source={{ uri: DATA[0].image }} style={styles.imgProfil} />
        <View style={{ marginLeft: toDp(80), bottom: toDp(30) }}>
          <Text style={{ fontWeight: 'bold' }}>Gambar Profil</Text>
          <Text style={{ fontSize: toDp(11) }}>Besar file maks. 2MB dengan format .JPG, JPEG atau PNG.</Text>
          <Pressable style={styles.btnGanti}>
            <Text style={{ color: '#0960A1' }}>Ganti Gambar</Text>
          </Pressable>
        </View>

        <View style={{ margin: toDp(8), bottom: toDp(20) }}>

        <Text style={styles.txtToko}>Nama Pengguna</Text>
          <TextInput autoCapitalize={'none'}
            style={styles.textInput}
            placeholderTextColor={'grey'}
            value={state.mb_name}
            onChangeText={(text) => setState(state => ({ ...state, mb_name: text }))}
          />

        <Text style={styles.txtToko}>Nama Toko</Text>
          <TextInput autoCapitalize={'none'}
            style={styles.textInput}
            placeholderTextColor={'grey'}
            value={state.datas.rtl_name}
            onChangeText={(text) => setState(state => ({ ...state, rtl_name: text }))}
          />

          <Text style={styles.txtDeskripsi}>Telepon</Text>
          <TextInput autoCapitalize={'none'}
            style={styles.textInput1}
            placeholderTextColor={'grey'}
            value={state.rtl_phone}
            onChangeText={(text) => setState(state => ({ ...state, rtl_phone: text }))}
          />
          <Text style={styles.txtDeskripsi}>Alamat</Text>
          <TextInput autoCapitalize={'none'}
            style={styles.textInput1}
            placeholderTextColor={'grey'}
            value={state.rtl_addres}
            onChangeText={(text) => setState(state => ({ ...state, rtl_addres: text }))}
          />
          <Text style={styles.txtDeskripsi}>Latitude</Text>
          <TextInput autoCapitalize={'none'}
            style={styles.textInput1}
            placeholderTextColor={'grey'}
            value={state.rtl_lat}
            onChangeText={(text) => setState(state => ({ ...state, rtl_lat: text }))}
          />
          <Text style={styles.txtDeskripsi}>Longtitude</Text>
          <TextInput autoCapitalize={'none'}
            style={styles.textInput1}
            placeholderTextColor={'grey'}
            value={state.rtl_long}
            onChangeText={(text) => setState(state => ({ ...state, rtl_long: text }))}
          />
        </View>
      </View>

      <Pressable style={styles.btnSimpan}>
        <Text style={styles.txtSimpan}>Simpan</Text>
      </Pressable>

    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  imgProfil: {
    height: toDp(50),
    width: toDp(50),
    top: toDp(20),
    left: toDp(15),
    borderRadius: toDp(25)
  },
  profilToko: {
    backgroundColor: '#C4C4C4',
    borderRadius: toDp(20),
    top: toDp(10),
    width: toDp(335),
    height: toDp(480),
  },
  btnGanti: {
    width: toDp(90),
    top: toDp(5),
  },
  textInput: {
    width: toDp(320),
    height: toDp(39),
    backgroundColor: '#F2F3F3',
    paddingHorizontal: toDp(8),
    borderRadius: toDp(20),
    top: toDp(3)
  },
  textInput1: {
    width: toDp(320),
    height: toDp(39),
    backgroundColor: '#F2F3F3',
    paddingHorizontal: toDp(8),
    borderRadius: toDp(20),
    top: toDp(5),
    marginTop:toDp(5)
  },
  txtDeskripsi: {
    top: toDp(8),
    fontSize: toDp(12),
    color: '#2A334B',
    marginTop:toDp(0)
  },
  txtToko: {
    fontSize: toDp(12),
    color: '#2A334B',
    marginTop:toDp(5)
  },
  btnSimpan: {
    backgroundColor: '#2A334B',
    width: toDp(335),
    height: toDp(40),
    borderRadius: toDp(20),
    top: toDp(30),
    justifyContent: 'center'
  },
  txtSimpan: {
    textAlign: 'center',
    color: 'white'
  }

});

export default Ubahtoko;