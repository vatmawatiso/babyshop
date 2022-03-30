import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Switch,
  TouchableOpacity,
  FlatList,
  Alert,
  ImageBackground,
  Pressable,
  ScrollView
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import  BackHeader  from '@BackHeader'
import NavigatorService from '@NavigatorService'

const Alamattoko = (props) => {

    const Address = [
        {
          id: '1',
          nama: 'Vatmawati',
          telepon: '083141520987',
          alamat: 'Jl KiSulaiman Kota Cirebon Jawa Barat '
        },
      ]

     return (
      <View style={styles.container}>
         <BackHeader
          title={'Alamat'}
          onPress={() => props.navigation.goBack()}
        />

        <View style={styles.Address}>
            <Image source={allLogo.icaddress1} style={styles.icaddress1} />
            <Text style={styles.txtAddress}>Alamat Pengiriman</Text>
        </View>
        <Pressable style={styles.isiAddress} onPress={() => alert('coba')}>
            <View>
                <Text>{Address[0].nama} {Address[0].telepon}</Text>
                <Text>{Address[0].alamat}</Text>
                <Image source={allLogo.iclineblack} style={styles.icaddress} />
            </View>
        </Pressable>

        <Pressable style={{bottom:toDp(30)}} onPress={ () => NavigatorService.navigate('Tambahalamat')}>
            <View style={styles.btnAddress}>
                <Text style={styles.txtBtnAddress}>Tambah Alamat Baru</Text>
                <Image source={allLogo.icplus} style={styles.icplus} />
            </View>
        </Pressable>
    </View>
    );
  
}

const styles = StyleSheet.create({
  container: {
    justifyContent:'center',
    alignItems: 'center',
  },
  Address: {
      backgroundColor:'#C4C4C4',
      width:toDp(335),
      height:toDp(105),
      borderRadius:toDp(20),
      flexDirection:'row',
      top:toDp(10)
  },
  icaddress1: {
    marginLeft:toDp(10),
    top:toDp(10)
  },
  txtAddress: {
      marginLeft:toDp(20),
      top:toDp(10)
  },
  isiAddress: {
      bottom:toDp(60),
    //   backgroundColor:'cyan',
      width:toDp(270),marginLeft:toDp(45)
  },
  icaddress: {
      width:toDp(15),
      height:toDp(15),
      left:toDp(248),
      bottom:toDp(25)
  },
  btnAddress: {
      backgroundColor:'#C4C4C4',
      flexDirection:'row',
      justifyContent:'space-between',
      width:toDp(335),
      height:toDp(32),
      borderRadius:toDp(20),
  },
  icplus: {
      width:toDp(12),
      height:toDp(12),
      top:toDp(10),
      right:toDp(10)
  },
  txtBtnAddress: {
      top:toDp(5),
      left:toDp(10)
  }
});

export default Alamattoko;