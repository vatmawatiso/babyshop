import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ImageBackground,
  Pressable
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import BackHeader from '@BackHeader'
import { Card } from "react-native-paper";
import NavigatorService from '@NavigatorService'
import { TextInput } from "react-native-gesture-handler";
import axios from 'axios';

const Tambahkategori = (props) => {
  const [src, setSrc] = useState(null);

  const [state, setState] = useState({
    loading: false,
    secureTextEntry: true,
    ctg_name: '',
    ctg_id:'',
  })

  const InputKategori = async () => {
    const body = {
      ctg_id: state.ctg_id,
      ctg_name: state.ctg_name,
    }
    console.log('Body Alamat====> '+ JSON.stringify(body));

    setState(state => ({ ...state, loading: true }))
    axios.post('https://market.pondok-huda.com/dev/react/category/', body)
      .then(result => {

        console.log('-----KATEGOTI=====>' + JSON.stringify(result.data));

        if (result.data.status == 201) {
          alert('Sukses tambah kategori!')
          NavigatorService.navigate('Kategori')
          console.log('HASIL KATEGORI ==> : ' + JSON.stringify(result.data))
          setState(state => ({ ...state, loading: false }))
          //NavigatorService.navigation('Alamattoko');

        } else {
          alert('Gagal tambah kategori!')
          setState(state => ({ ...state, loading: false }))
          //console.log('-----COBA=====>'+ JSON.stringify(body));
        }

      }).catch(err => {
        //console.log(err)
        alert('Gagal menerima data dari server!' + err)
        setState(state => ({ ...state, loading: false }))
      })
  }

  return (
    <View style={styles.container}>

      <BackHeader
        title={'Tambah Kategori'}
        onPress={() => props.navigation.goBack()}
      />

      <View>
        <View style={styles.bodyKategori}>
          <Text style={styles.txtKategori}>Nama Kategori</Text>
          <TextInput autoCapitalize={'none'}
            style={styles.textInput}
            placeholder={'Masukkan kategori'}
            placeholderTextColor={'#4E5A64'}
            value={state.ctg_name}
            onChangeText={(text) => setState(state => ({ ...state, ctg_name: text }))}
          />
        </View>
        <Pressable style={styles.btnKategori} onPress={() => InputKategori()}>
          <Text style={styles.txtSimpan}>Simpan Kategori</Text>
        </Pressable>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  bodyKategori: {
    backgroundColor: '#E7E7E7',
    width: toDp(335),
    height: toDp(88),
    borderRadius: toDp(10),
    top: toDp(15),
    left: toDp(12),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
  txtKategori: {
    margin: toDp(5),
    left: toDp(3),
    color: '#4E5A64'
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: toDp(10),
    margin: toDp(5),
    marginBottom:toDp(15)
  },
  btnKategori: {
    backgroundColor: '#2A334B',
    width: toDp(335),
    height: toDp(42),
    borderRadius: toDp(10),
    top: toDp(30),
    left: toDp(12),
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
  txtSimpan: {
    color: 'white',
    textAlign: 'center'
  }
});

export default Tambahkategori;