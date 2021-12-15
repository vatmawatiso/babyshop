import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  ImageBackground,
  Pressable
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import Search from '@Search'

const Profilone = () => {
  const [src, setSrc]=useState(null);
  return (
    <View style={styles.container}>
       <Search onChangeText={(text)=> setSrc(text)} />
      {/* <StatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'} /> */}
        <View style={styles.header}>
          <Image source={allLogo.iccart} style={styles.cart} />
          <Image source={allLogo.icnav} style={styles.nav} />
          <Image source={allLogo.icarrow} style={styles.arrow} />
        </View>
        <View style={styles.content, {backgroundColor: '#2A334B', height: toDp(116), width: toDp(316), top: toDp(-240), borderRadius: toDp(25)}}>
          <Image source={allLogo.tzuyu} style={styles.imgProfil} />
          <Text style={styles.nmProfil}>Cho Tzuyu</Text>
          <Text style={styles.member}>Member</Text>
          <Text style={styles.pengikut}>Pengikut</Text>
          <Text style={styles.mengikuti}>Mengikuti</Text>
          <Pressable style={styles.presable}>
            <Image source={allLogo.icwallet} style={styles.icwallet} />
            <Text style={styles.pembayaran, {top: toDp(-110), left: toDp(235), color: 'white'}}>Pembayaran</Text>
          </Pressable>
          <Pressable style={styles.presable}>
            <Image source={allLogo.icstore} style={styles.icstore} />
            <Text style={styles.pengiriman, {top: toDp(-110), left: toDp(235), color: 'white'}}>Pengiriman</Text>
          </Pressable>
          <Pressable style={styles.presable}>
            <Image source={allLogo.icline} style={styles.icline} />
            <Text style={styles.editProfil, {top: toDp(-110), left: toDp(235), color: 'white'}}>Edit Profil</Text>
          </Pressable>
         
          
        </View>
        <View style={styles.footer, {backgroundColor: '#2A334B'}}>
        <Text style={styles.mengikuti}>Mengikuti</Text>
        </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    top: toDp(50),
    right: toDp(1),
  },
  cart: {
    padding: toDp(1),
    top: toDp(-257),
    left: toDp(110) 
  },
  nav: {
    padding: toDp(1),
    top: toDp(-280),
    left: toDp(150) 
  },
  arrow: {
    padding: toDp(1),
    top: toDp(-305),
    right: toDp(150),
    rotation: toDp(135)
  },
  imgProfil: {
    height: toDp(50),
    width: toDp(50),
    top: toDp(30),
    left: toDp(15),
    borderRadius: toDp(25)
  },
  nmProfil: {
    left: toDp(100),
    top: toDp(-30),
    fontWeight: 'bold',
    fontSize: toDp(12),
    color: 'white'
  },
  member: {
    left: toDp(109),
    top: toDp(-25),
    fontSize: toDp(10),
    color: 'white'
  },
  pengikut: {
    left: toDp(80),
    top: toDp(-19),
    fontSize: toDp(10),
    color: 'white'
  },
  mengikuti: {
    left: toDp(130),
    top: toDp(-33),
    fontSize: toDp(10),
    color: 'white'
  },
  icwallet: {
    top: toDp(-90),
    height: toDp(22),
    width: toDp(25),
    left: toDp(200)
  },
  icstore: {
    top: toDp(-90),
    height: toDp(22),
    width: toDp(25),
    left: toDp(200)
  },
  icline: {
    top: toDp(-96),
    height: toDp(12),
    width: toDp(8),
    left: toDp(290)
  }
});

export default Profilone;
