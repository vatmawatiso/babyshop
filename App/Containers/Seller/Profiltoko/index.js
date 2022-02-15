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

const Profiltoko = (props) => {
  const [src, setSrc]=useState(null);

  const DATA = [
    {
      id: '2938492',
      nama: 'TB Abadi Jaya Bandung',
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
          title={'Profil Toko'}
          onPress={() => props.navigation.goBack()}
        />

        <View style={styles.bodyProfil}>
            <View style={styles.profil1}>
                <Image source={{uri: DATA[0].image}} style={styles.imgProfil} />
                <Text style={styles.txtProfil1}>{DATA[0].nama}</Text>
            </View>

            <Text style={styles.txtMember}>Member Classic</Text>

            <View style={styles.profil2}>
                <Text style={styles.txtPengikut}>Pengikut</Text>
                <Text style={styles.txtMengikuti}>Mengikuti</Text>
            </View>

            <View style={styles.profil3}>
              <Pressable style={styles.btnPembayaran}>
                <Image source={allLogo.icwallet} style={styles.icwallet}/>
                <Text style={styles.txtPembayaran}>Pembayaran</Text>
              </Pressable>

              <Pressable style={styles.btnPengiriman}>
                <Image source={allLogo.icstore} style={styles.icstore}/>
                <Text style={styles.txtPengiriman}>Pengiriman</Text>
              </Pressable>
            </View>
        </View>

    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    top:toDp(50)
  },
  bodyProfil: {
    backgroundColor:'#2A334B',
    width:toDp(335),
    height:toDp(116),
    borderRadius:toDp(8),
    top:toDp(20)
  },
  imgProfil: {
    height: toDp(50),
    width: toDp(50),
    top: toDp(25),
    left: toDp(25),
    borderRadius: toDp(25)
  },
  profil1: {
    flexDirection:'row',
    right:20
    
  },
  profil2: {
    flexDirection:'row',
    justifyContent:'center',
    right:toDp(40),
  },
  txtProfil1: {
    marginLeft:toDp(25),
    marginTop:toDp(20),
    fontSize:toDp(13),
    color:'white'
  }, 
  txtMember: {
    textAlign:'center',
    right:toDp(45),
    fontSize:toDp(12),
    color:'white'
  },
  txtMengikuti: {
    left:toDp(10),
    fontSize:toDp(12),
    color:'white'
  },
  txtPengikut: {
    fontSize:toDp(12),
    right:toDp(15),
    color:'white'
  },
  profil3: {
    alignItems:'flex-end',
  },
  btnPembayaran: {
    bottom:toDp(60),
    width:toDp(120),
    height:toDp(25)
  },
  btnPengiriman: {
    bottom:toDp(40),
    width:toDp(120),
    height:toDp(25)
  },
  txtPembayaran: {
    bottom:toDp(20),
    left:toDp(30),
    color:'white'
  },
  txtPengiriman: {
    bottom:toDp(20),
    left:toDp(30),
    color:'white'
  }
});

export default Profiltoko;