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
import  BackHeader  from '@BackHeader'
import { Card } from "react-native-paper";
import NavigatorService from '@NavigatorService'
import { TextInput } from "react-native-gesture-handler";

const Tambahkategori = (props) => {
  const [src, setSrc]=useState(null);

  const [state, setState] = useState({
    loading: false,
    secureTextEntry: true,
    kategori: ''
})

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
                            style={[styles.textInput, {marginTop: toDp(-11)}]}
                            placeholder={'Masukkan kategori'}
                            placeholderTextColor={'grey'}
                            value={state.Kategori}
                            onChangeText={(text) => setState(state => ({...state, Kategori: text})) }
                 />
            </View>
            <Pressable style={styles.btnKategori}>
                <Text style={styles.txtSimpan}>Simpan Kategori</Text>
            </Pressable>
        </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    justifyContent:'center',
  },
  bodyKategori: {
    backgroundColor:'#E7E7E7',
    width:toDp(335),
    height:toDp(88),
    borderRadius:toDp(10),
    top:toDp(15),
    left:toDp(12),
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
    margin:toDp(5),
    left:toDp(3),
    color:'grey'
  },
  textInput:{
    backgroundColor:'white',
    borderRadius:toDp(15),
    margin:toDp(5),
    top:toDp(10)
  },
  btnKategori: {
    backgroundColor:'#2A334B',
    width:toDp(335),
    height:toDp(42),
    borderRadius:toDp(15),
    top:toDp(30),
    left:toDp(12),
    justifyContent:'center',
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
    color:'white',
    textAlign:'center'
  }
});

export default Tambahkategori;