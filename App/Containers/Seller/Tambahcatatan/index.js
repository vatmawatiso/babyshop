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
import  HeaderToko  from '@HeaderToko'
import NavigatorService from '@NavigatorService'
import { TextInput } from "react-native-gesture-handler";

const Tambahcatatan = (props) => {
  const [src, setSrc]=useState(null);

  const [state, setState] = useState({
    loading: false,
    judul: '',
    isi: ''
})

  return (
    <View style={styles.container}>

        <HeaderToko
          title={'Tambah Catatan'}
          onPress={() => props.navigation.goBack()}
        />

        <View style={styles.content}>
            <Text style={styles.txtJudul}>Judul Catatan</Text>
            <TextInput  autoCapitalize={'none'}
                    style={styles.textInput}                        
                    placeholderTextColor={'grey'}
                    value={state.judul}
                    onChangeText={(text) => setState(state => ({...state, judul: text })) }
                />

            <Text style={styles.txtCatatan}>Isi Catatan</Text>
            <TextInput  autoCapitalize={'none'}
                    style={styles.textInput1}                        
                    placeholderTextColor={'grey'}
                    value={state.isi}
                    onChangeText={(text) => setState(state => ({...state, isi: text })) }
                />
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
    top:toDp(50)
  },
  content: {
      backgroundColor:'#E7E7E7',
      width:toDp(335),
      height:toDp(220),
      top:toDp(20),
      borderRadius:toDp(8),
  },
  textInput: {
    width: toDp(320),
    height: toDp(39),
    backgroundColor: '#F2F3F3',
    paddingHorizontal: toDp(8),
    borderRadius: toDp(8),
    margin:toDp(8),
    bottom:toDp(10),
    borderWidth:0.5,
  },
  textInput1: {
    width: toDp(320),
    height: toDp(100),
    backgroundColor: '#F2F3F3',
    paddingHorizontal: toDp(8),
    borderRadius: toDp(8),
    margin:toDp(8),
    bottom:toDp(28),
    borderWidth:0.5,
  },
  txtJudul: {
    margin:toDp(8),
    color:'#2A334B'
  },
  txtCatatan: {
    margin:toDp(8),
    bottom:toDp(20),
    color:'#2A334B'
  },
  btnSimpan: {
    backgroundColor:'#2A334B',
    width:toDp(335),
    height:toDp(40),
    borderRadius:toDp(8),
    top:toDp(40),
    justifyContent:'center',
  },
  txtSimpan: {
    color:'white',
    textAlign:'center'
  }
});

export default Tambahcatatan;