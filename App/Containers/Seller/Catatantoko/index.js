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

const Catatantoko = (props) => {
  const [src, setSrc]=useState(null);

  return (
    <View style={styles.container}>

        <HeaderToko
          title={'Catatan Toko'}
          onPress={() => props.navigation.goBack()}
        />

        <View style={{top:toDp(200)}}>
            <Text style={styles.txt1}>Toko anda belum memiliki Catatan</Text>
            <Text style={styles.txt2}>Tambah Catatan untuk menuliskan informasi{"\n"}syarat ketentuan toko</Text>
            <Pressable style={styles.btnTambah}>
                <Text style={styles.txtTambah}>Tambah Catatan Toko</Text>
            </Pressable>
        </View>

    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    top:toDp(50)
  },
  txt1: {
      textAlign:'center',
      fontWeight:'bold'
  },
  txt2: {
      textAlign:'center',
      color:'grey'
  },
  txtTambah: {
      textAlign:'center',
      color:'white'
  },
  btnTambah: {
      backgroundColor:'#2A334B',
      width:toDp(243),
      height:toDp(42),
      justifyContent:'center',
      borderRadius:toDp(8),
      margin:toDp(20)
  }
});

export default Catatantoko;