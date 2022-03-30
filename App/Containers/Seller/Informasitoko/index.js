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
import BackHeader from '@BackHeader'
import NavigatorService from '@NavigatorService'
import { TextInput } from "react-native-gesture-handler";

const Informasitoko = (props) => {
  const [src, setSrc] = useState(null);

  const DATA = [
    {
      id: '2938492',
      nama: 'TB Jaya Abadi Bandung',
      memberUser: 'Member Classic',
      pengikutUser: 'Pengikut (100)',
      mengikutiUser: 'Mengikuti (4)',
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

      <View>
        <View style={[styles.Tokosaya, { flexDirection: 'row' }]}>
          <Image source={{ uri: DATA[0].image }} style={styles.imgProfil} />
          <Text style={styles.txtToko}>{DATA[0].nama}</Text>
        </View>
        <View style={{ bottom: toDp(50), left: toDp(20) }}>
          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.txtMember}>{DATA[0].memberUser}</Text>
            <Text style={styles.txtPengikut}>{DATA[0].pengikutUser} {DATA[0].mengikutiUser}</Text>
          </View>
          <View style={{right:toDp(20)}}>
            <Pressable style={{ backgroundColor: '#698498', width: toDp(335), height: toDp(38), borderRadius: toDp(20), justifyContent: 'center' }} onPress={() => NavigatorService.navigate('Settingtoko')}>
              <Text style={{ textAlign: 'center', color: 'white' }}>Pengaturan</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <View style={{ bottom:toDp(20) }}>
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
    // flex: 1
  },
  imgProfil: {
    height: toDp(50),
    width: toDp(50),
    top: toDp(20),
    left: toDp(15),
    borderRadius: toDp(25)
  },
  Tokosaya: {
    flexDirection: 'row',
    backgroundColor: '#2A334B',
    width: toDp(335),
    height: toDp(130),
    borderRadius: toDp(20),
    top: toDp(20)
  },
  txtToko: {
    left: toDp(50),
    top: toDp(15),
    color: 'white'
  },
  txtMember: {
    left: toDp(105),
    fontSize: toDp(12),
    color: 'white',
    bottom: toDp(20)
  },
  txtPengikut: {
    fontSize: toDp(12),
    color: 'white',
    left: toDp(80),
    bottom: toDp(15)
  },
  txtMengikuti: {
    fontSize: toDp(12),
    color: 'white'
  },
  btnUbah: {
    backgroundColor: '#C4C4C4',
    width: toDp(335),
    height: toDp(45),
    borderRadius: toDp(20),
    bottom: toDp(10),
    justifyContent: 'center'
  },
  txtUbah: {
    textAlign: 'center',
    color: 'black'
  },
});

export default Informasitoko;