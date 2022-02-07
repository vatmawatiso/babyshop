import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TextInput,
  SafeAreaView,
  Pressable,
  ScrollView
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import  Back  from '@Back'
import NavigatorService from '@NavigatorService'

const Successorder = (props) => {

    
    const Pembayaran = [
        {
          id: '1',
          Konfirmasibayar: 'Rp 800.000'
        },
      ]

     return (
      <View style={styles.container}>
         <Back
            title={'Sukses Order'}
            onPress={() => props.navigation.goBack()}
         /> 

        <View style={styles.content}>
            <Text style={styles.txtKonfirm}>Kamu berhasil membayar {Pembayaran[0].Konfirmasibayar}</Text>
            <Text style={styles.txtKet}>silahkan cek untuk mengetahui status pesananmu</Text>
                <View style={{flexDirection:'row'}}>
                    <Pressable style={styles.btnBeranda} onPress={()=> NavigatorService.navigate('Homepage', {content:'Home'})}>
                        <Text style={styles.txtBtn}>Beranda</Text>
                    </Pressable>
                    <Pressable style={styles.btnBeranda} onPress={()=> NavigatorService.navigate('Orderpage', {content:'Belumbayar'})}>
                        <Text style={styles.txtBtn}>Pesanan Saya</Text>
                    </Pressable>
                </View>
        </View>    
     </View>
    );
  
}

const styles = StyleSheet.create({
  container: {
    top:toDp(50),
    justifyContent:'center',
    alignItems: 'center',
  },
  content: {
      backgroundColor:'#C4C4C4',
      width:toDp(316),
      height:toDp(139),
      borderRadius:toDp(15),
      bottom:toDp(40),
      justifyContent:'center',
      alignItems:'center'
  },
  txtKonfirm: {
      bottom:toDp(10),
      fontSize:toDp(14)
  },
  txtKet: {
      fontSize:toDp(12)
  },
  btnBeranda: {
      backgroundColor:'#2A334B',
      marginHorizontal:toDp(20),
      top:toDp(20),
      width:toDp(126),
      height:toDp(40),
      borderRadius:toDp(15),
      justifyContent:'center'
  },
  txtBtn: {
      textAlign:'center',
      color:'white'
  }
});

export default Successorder;