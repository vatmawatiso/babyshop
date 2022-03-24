import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ImageBackground,
  Pressable,
  Systrace
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import  Back  from '@Back'
import { Card } from "react-native-paper";
import NavigatorService from '@NavigatorService'
import { TextInput } from "react-native-gesture-handler";
import { FLATTENABLE_KEYS } from "@babel/types";

const Infopembayaran = (props) => {
  const [src, setSrc]=useState(null);

  const DATA = [
    {
      id: '1',
      nomer: '0834 1404 3033',
      total:'800.0000',
      bank: 'Mandiri'
    },
  ]

  return (
    <View style={styles.container}>

        <Back
          title={'Info Pembayaran'}
          onPress={() => props.navigation.goBack()}
        />

        <View style={{marginTop:toDp(10)}}>
            <View style={styles.bodyBayar}>
                <Text style={styles.txtTotal}>Total Pembayaran</Text>
                <Text style={styles.txtHarga}>Rp {DATA[0].total}</Text>
                <Text style={styles.txtKet}>Bayaran Pesanan Sesuai Jumlah di atas</Text>
            </View>
            <View style={styles.bodyBank}>
                <View style={{flexDirection:'row', margin:toDp(10)}}>
                    <Image source={allLogo.icMANDIRI}/>
                    <Text style={styles.txtBank}>Bank {DATA[0].bank} (Dicek Otomatis)</Text>
                </View>
                <View style={{marginLeft:toDp(57)}}>
                    <Text style={styles.txtRekening}>No. Rekening</Text>
                    <Text style={styles.txtNoker}>896 {DATA[0].nomer}</Text>
                    <Text style={styles.txtKetNoker}>Salin No. Rekening diatas untuk melakukan pembayaran</Text>
                </View>
            </View>
            <View style={styles.bayarSekarang}>
                <Pressable style={styles.btnBayar} onPress={() => NavigatorService.navigate('Successorder')}>
                    <Text style={styles.txtBayar}>Bayar Sekarang</Text>
                </Pressable>
            </View>
        </View>

    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    justifyContent:'center',
  },
  bodyBayar: {
    backgroundColor:'#E7E7E7',
    width:toDp(335),
    height:toDp(92),
    left:toDp(12),
    borderRadius:toDp(10),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

elevation: 2,
  },
  txtTotal: {
    margin:toDp(10),
  },
  txtHarga: {
    margin:toDp(10),
    bottom:toDp(15),
    fontSize:toDp(24)
  },
  txtKet: {
    margin:toDp(10),
    bottom:toDp(35),
    fontSize:toDp(11),
    color:'#0960A1'
  },
  bodyBank: {
      backgroundColor:'#E7E7E7',
      width:toDp(335),
      height:toDp(132),
      left:toDp(12),
      top:toDp(10),
      borderRadius:toDp(10),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
  },
  txtBank: {
      left:toDp(10),
      bottom:toDp(3),
      color:'#44474E'
  },
  txtRekening: {
    fontSize:toDp(12),
    bottom:toDp(5),
    color:'#44474E'
  },
  txtNoker: {
    fontSize:toDp(24),
    color:'#0960A1'
  },
  txtKetNoker: {
    fontSize:toDp(12),
    color:'#44474E'
  },
  bayarSekarang: {
    justifyContent:'center'
  },
  btnBayar: {
    backgroundColor:'#2A334B',
    width:toDp(335),
    height:toDp(45),
    borderRadius:toDp(15),
    justifyContent:'center',
    alignItems:'center',
    left:toDp(12),
    top:toDp(235),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
  },
  txtBayar:{
    color:'white'
  }
 
});

export default Infopembayaran;