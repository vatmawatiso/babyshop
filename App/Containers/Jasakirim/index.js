import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Switch,
  Alert,
  ImageBackground,
  Pressable
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import  NonCart  from '@NonCart'
import { Card } from "react-native-paper";
import NavigatorService from '@NavigatorService'
import { TextInput } from "react-native-gesture-handler";

const Jasakirim = (props) => {
  const [src, setSrc]=useState(null);

  const DATA = [
    {
      id: '1',
      nama: 'Chou Tzuyu',
      kontak: '083120203876',
      alamat:'Desa meguclik blok pengadangan RT/RW:02/02',
      kecamatan: 'Kec. Weru',
      kotakab: 'Kab. Cirebon',
      provinsi: 'Jawa Barat',
    },
  ]

  const jasakirim = [
    {
      id: '1',
      jasakirim: 'Reguler',
    },
    {
      id: '2',
      jasakirim: 'Antar Aja',
    },
    {
      id: '3',
      jasakirim: 'Si Cepat Reg',
    },
    {
      id: '4',
      jasakirim: 'J&T Express',
    },
    {
      id: '4',
      jasakirim: 'JNE Reguler',
    },
    {
      id: '6',
      jasakirim: 'ID Express',
    },
    {
      id: '7',
      jasakirim: 'Pos Kilat Khusus',
    },
    {
      id: '8',
      jasakirim: 'Kargo',
    },
  ]

  // const RenderItem = (item, index) => (
  return (
    <View style={styles.container}>

        <NonCart
          title={'Jasa Kirim'}
          onPress={() => props.navigation.goBack()}
        />

        <View style={styles.content}>
            <View style={styles.address}>
                <Image source={allLogo.icaddress1} style={styles.icAddress} />
                <Text style={styles.titleAddress}>Alamat Pengiriman</Text>
                    <Pressable style={styles.buttonAddress}>
                        <Text style={styles.txtAddress}>{DATA[0].nama} {DATA[0].kontak}</Text>
                        <Text style={styles.txtAddress}>{DATA[0].alamat}</Text>
                        <Text style={styles.txtAddress}>{DATA[0].kecamatan} {DATA[0].kotakab} {DATA[0].provinsi}</Text>
                    </Pressable>
            </View>
        </View>
        <View style={styles.body}>
            <View style={styles.courier}>
                <Text style={styles.txtCourier}>Reguler</Text>
                <Text style={styles.txtCourier}>Antar Aja</Text>
                <Text style={styles.txtCourier}>Si Cepat Reg</Text>
                <Text style={styles.txtCourier}>Ninja Express</Text>
                <Text style={styles.txtCourier}>J and T Express</Text>
                <Text style={styles.txtCourier}>JNE Reguler</Text>
                <Text style={styles.txtCourier}>ID Express</Text>
                <Text style={styles.txtCourier}>Post Kilat Khusus</Text>
                <Text style={styles.txtCourier}>Kargo</Text>
            </View>
        </View>

    

    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top:toDp(50),
  },
  content: {
      backgroundColor:'red',
      bottom:toDp(30),
      width:toDp(360),
      height:toDp(145),
  },
  address: {
      backgroundColor:'cyan',
      width:toDp(316),
      height:toDp(105),
      top:toDp(10),
      marginLeft:toDp(20),
      borderRadius:toDp(15)
  },
  icAddress: {
      left:toDp(10),
      top:toDp(10)
  },
  titleAddress: {
      left:toDp(40),
      bottom:toDp(6)
  },
  txtAddress: {
      left:toDp(38),
      fontSize:toDp(12)
  },
  body: {
    backgroundColor:'yellow',
    bottom:toDp(30),
    width:toDp(360),
    height:toDp(350),
  },
  courier: {
    backgroundColor:'pink',
    width:toDp(316),
    height:toDp(340),
    left:toDp(20),
    borderRadius:toDp(15),
    alignItems:'flex-start',
    justifyContent:'space-between',
  },
  txtCourier: {
    
  }
});

export default Jasakirim;