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
import NavigatorService from '@NavigatorService'
import { TextInput } from "react-native-gesture-handler";

const Saldopenjual = (props) => {
  const [src, setSrc]=useState(null);

  return (
    <View style={styles.container}>

        <BackHeader
          title={'Saldo Penjual'}
          onPress={() => props.navigation.goBack()}
        />

        <View style={styles.bodySaldo}>
            <Text style={styles.txtSaldo}>Saldo Anda</Text>
            <Text style={styles.txtHarga}>Rp 0</Text>
        </View>

        <View style={{flexDirection:'row'}}>
            <Pressable style={styles.btnSaldo}>
                <Image source={allLogo.icatm} style={styles.icatm} />
                <Text style={{bottom:toDp(5), color:'#2A334B'}}>Penarikan Uang</Text>
            </Pressable>
            <Pressable style={styles.btnHarga}>
                <Image source={allLogo.ictransaksi} style={styles.ictransaksi} />
                <Text style={{bottom:toDp(5), color:'#2A334B'}}>Riwayat Transaksi</Text>
            </Pressable>
        </View>

    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  bodySaldo: {
    backgroundColor:'#2A334B',
    width:toDp(335),
    height:toDp(100),
    top:toDp(10),
    borderRadius:toDp(8),
    justifyContent:'center',
    alignItems:'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
  },
  txtSaldo: {
      fontSize:toDp(15),
      bottom:toDp(8),
      color:'white'
  },
  txtHarga: {
      fontSize:toDp(22),
      color:'#0960A1'
  },
  btnSaldo: {
      backgroundColor:'#E7E7E7',
      marginHorizontal:toDp(5),
      width:toDp(160),
      right:toDp(5),
      top:toDp(20),
      borderRadius:toDp(8),
      height:toDp(55),
      justifyContent:'flex-end',
      alignItems:'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,

  },
  btnHarga: {
    backgroundColor:'#E7E7E7',
    width:toDp(160),
    top:toDp(20),
    borderRadius:toDp(8),
    height:toDp(55),
    justifyContent:'flex-end',
    alignItems:'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
},
icatm: {
    width:toDp(19),
    height:toDp(20.58),
    bottom:toDp(8),
    tintColor:'#2A334B'
},
ictransaksi:{
    width:toDp(19),
    height:toDp(20),
    bottom:toDp(8),
    tintColor:'#2A334B'
}
});

export default Saldopenjual;