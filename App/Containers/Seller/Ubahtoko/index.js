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

const Ubahtoko = (props) => {
  const [src, setSrc]=useState(null);

  const DATA = [
    {
      id: '2938492',
      image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    },
  ]

  const [state, setState] = useState({
    loading: false,
    nama: '',
    deskripsi: ''
})

  return (
    <View style={styles.container}>

        <HeaderToko
          title={'Informasi Toko'}
          onPress={() => props.navigation.goBack()}
        />

        <View style={styles.profilToko}>
            <Image source={{uri: DATA[0].image}} style={styles.imgProfil} />
            <View style={{marginLeft:toDp(80), bottom:toDp(30)}}>
                <Text style={{fontWeight:'bold'}}>Gambar Profil</Text>
                <Text style={{fontSize:toDp(11)}}>Besar file maks. 2MB dengan format .JPG, JPEG atau PNG.</Text>
                <Pressable style={styles.btnGanti}>
                    <Text style={{color:'#0960A1'}}>Ganti Gambar</Text>
                </Pressable>
            </View>
            
            <View style={{margin:toDp(8), bottom:toDp(20)}}>
                <Text style={styles.txtToko}>Nama Toko</Text>
                <TextInput  autoCapitalize={'none'}
                    style={styles.textInput}                        
                    placeholderTextColor={'grey'}
                    value={state.username}
                    onChangeText={(text) => setState(state => ({...state, username: text })) }
                />

                <Text style={styles.txtDeskripsi}>Deskripsi Toko</Text>
                <TextInput  autoCapitalize={'none'}
                    style={styles.textInput1}                         
                    placeholderTextColor={'grey'}
                    value={state.username}
                    onChangeText={(text) => setState(state => ({...state, username: text })) }
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
    top:toDp(50)
  },
  imgProfil: {
    height: toDp(50),
    width: toDp(50),
    top: toDp(20),
    left: toDp(15),
    borderRadius: toDp(25)
  },
  profilToko: {
      backgroundColor:'#C4C4C4',
      borderRadius:toDp(10),
      top:toDp(10),
      width:toDp(335),
      height:250,
  },
  btnGanti: {
     width:toDp(90),
     top:toDp(5),
  },
  textInput: {
    width: toDp(320),
    height: toDp(39),
    backgroundColor: '#F2F3F3',
    paddingHorizontal: toDp(8),
    borderRadius: toDp(8),
    top:toDp(3)
  },
  textInput1: {
    width: toDp(320),
    height: toDp(39),
    backgroundColor: '#F2F3F3',
    paddingHorizontal: toDp(8),
    borderRadius: toDp(8),
    top:toDp(10)
  },
  txtDeskripsi: {
      top:toDp(8),
      fontSize:toDp(12),
      color:'#2A334B'
  },
  txtToko: {
      fontSize:toDp(12),
      color:'#2A334B'
  },
  btnSimpan: {
      backgroundColor:'#2A334B',
      width:toDp(335),
      height:toDp(40),
      borderRadius:toDp(8),
      top:toDp(30),
      justifyContent:'center'
  },
  txtSimpan: {
      textAlign:'center',
      color:'white'
  }

});

export default Ubahtoko;