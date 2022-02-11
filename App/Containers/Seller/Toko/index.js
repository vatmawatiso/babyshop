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

const Toko = (props) => {
  const [src, setSrc]=useState(null);

  const DATA = [
    {
      id: '2938492',
      nama: 'Cinthya Dewi CP',
      memberUser: 'Member',
      pengikutUser: 'Pengikut (100)',
      mengikutiUser : 'Mengikuti (4)',
      type: 'Pembeli',
      image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    },
  ]

  return (
    <View style={styles.container}>

        <HeaderToko
          title={'Toko Saya'}
          onPress={() => props.navigation.goBack()}
        />

        <View style={styles.Tokosaya}>
            <Image source={{uri: DATA[0].image}} style={styles.imgProfil} />
            <Text style={styles.txtToko}>Cimol Store</Text>
                <View style={{flexDirection:'row', right:toDp(10), top:toDp(40), margin:toDp(5)}}>
                    <Text style={styles.txtPengikut}>Pengikut</Text>
                    <Text style={styles.txtMengikuti}>Mengikuti</Text>
                </View>
        </View>
        <View style={styles.Body}>
            <View style={styles.BodySaldo}>
                <Text style={styles.txtSkor}>Skor Toko</Text>
                <Image source={allLogo.iclineright} style={styles.iclineright} />
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between', margin:toDp(10)}}>
                <Text>Saldo</Text>
                <Text>Rp 5.000.000</Text>
            </View>
        </View>

          <View style={styles.Penjualan}>
              <Pressable style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <Text style={styles.txtPenjualan}>Penjualan</Text>
                  <Image source={allLogo. iclineright} style={styles.iclineright1} />
              </Pressable>
              <View style={{borderWidth:0.5, borderColor:'grey'}} />

              
              <Pressable>
                  <View style={{flexDirection:'row', justifyContent:'space-between', margin:toDp(10)}}>
                    <Image source={allLogo.icorders} style={styles.icorders}/>
                    <Text style={{right:toDp(20), top:toDp(5)}}>Pesanan Baru</Text>
                    <Image source={allLogo.iconly} style={{left:toDp(20)}}/>
                    <Text style={{top:toDp(5)}}>Siap dikirim</Text>
                  </View>
                  <Text style={{margin:toDp(10)}}>Kata Pembeli</Text>
              </Pressable>
              <View style={{borderWidth:0.5, borderColor:'grey'}} />

              <Pressable>
                  <View>
                    <Text>Ulasan</Text>
                    <Text>Diskusi</Text>
                    <Text>Pesanan Dikomplain</Text>
                  </View>
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
  imgProfil: {
    height: toDp(50),
    width: toDp(50),
    top: toDp(20),
    left: toDp(15),
    borderRadius: toDp(25)
  },
  Tokosaya: {
    flexDirection:'row',
    backgroundColor:'cyan',
    width:toDp(335),
    height:toDp(90),
    borderRadius:toDp(10),
    top:toDp(10),
    shadowColor: "#000",
    shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,
  },
  txtToko: {
    left:toDp(80),
    top:toDp(20)
  },
  txtPengikut: {
      right:toDp(25)
  },
  txtMengikuti: {
      left:toDp(10)
  },
  iclineright: {
      width:toDp(10),
      height:toDp(15)
  },
  Body: {
    backgroundColor:'cyan',
    width:toDp(335),
    height:toDp(80),
    borderRadius:toDp(10),
    top:toDp(30),
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
  },
  BodySaldo: {
      flexDirection:'row',
      justifyContent:'space-between',
      margin:toDp(10)
  },
  Penjualan: {
    backgroundColor:'cyan',
    width:toDp(335),
    height:toDp(300),
    top:toDp(40),
    borderRadius:toDp(10),
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
  },
  txtPenjualan: {
    margin:toDp(10)
  },
  iclineright1: {
    margin:toDp(10),
    width:toDp(10),
    height:toDp(15),
  }
});

export default Toko;