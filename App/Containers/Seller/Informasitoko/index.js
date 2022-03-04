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

const Informasitoko = (props) => {
  const [src, setSrc]=useState(null);

  const DATA = [
    {
      id: '2938492',
      nama: 'TB Jaya Abadi Bandung',
      memberUser: 'Member Classic',
      pengikutUser: 'Pengikut (100)',
      mengikutiUser : 'Mengikuti (4)',
      type: 'Pembeli',
      image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    },
  ]

  return (
    <View style={styles.container}>

        <BackHeader
          title={'Informasi Toko'}
          onPress={() => props.navigation.goBack()}
        />

        <View style={styles.Tokosaya}>
            <View style={{flexDirection:'row'}}>
                <Image source={{uri: DATA[0].image}} style={styles.imgProfil} />
                <Text style={styles.txtToko}>{DATA[0].nama}</Text>
            </View>

            <Text style={styles.txtMember}>{DATA[0].memberUser}</Text>

            <View style={{flexDirection:'row', top:toDp(50), marginTop:toDp(5), right:toDp(182)}}>
                <Text style={styles.txtPengikut}>{DATA[0].pengikutUser}</Text>
                <Text style={styles.txtMengikuti}>{DATA[0].mengikutiUser}</Text>
            </View>
            <Pressable style={{right:130, height:20, top:toDp(10)}} onPress={() => NavigatorService.navigate('Settingtoko')} >
              <Image source={allLogo.icsettings} style={{tintColor:'white', bottom:toDp(1)}} />
            </Pressable>
        </View>
        
        <View style={styles.Ubah}>
            <Pressable style={styles.btnUbah} onPress={() => NavigatorService.navigate('Ubahtoko')} >
                <Text style={styles.txtUbah}>Ubah</Text>
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
    backgroundColor:'#2A334B',
    width:toDp(335),
    height:toDp(90),
    borderRadius:toDp(10),
    bottom:toDp(40)
  },
  txtToko: {
      left:toDp(50),
      top:toDp(15),
      color:'white'
  },
  txtMember: {
      top:toDp(35),
      right:toDp(96),
      fontSize:toDp(12),
      marginTop:toDp(3),
      color:'white'
  },
  txtPengikut: {
    fontSize:toDp(12),
    color:'white'
  },
  txtMengikuti: {
    fontSize:toDp(12),
    color:'white'
  },
  btnUbah: {
      backgroundColor:'#C4C4C4',
      width:toDp(335),
      height:toDp(40),
      borderRadius:toDp(10),
  },
  txtUbah: {
      textAlign:'center',
      top:toDp(8),
      color:'black'
  },
  Ubah: {
    bottom:toDp(30)
  }
});

export default Informasitoko;