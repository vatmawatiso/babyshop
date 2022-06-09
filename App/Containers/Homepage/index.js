import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Image,
  StatusBar,
  ImageBackground,
  Pressable
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';

import NavigatorService from '@NavigatorService'

import Home from './Home'
import Kategoriproduk from './Kategoriproduk'
import Notification from './Notification'
import Profilone from '../Profilone'
import Search from '@Search'

const Homepage = () => {

  const [state, setState] = useState({
    content: 'home', // home, user, setting
  })

  const [text, setText] = useState('');
  const [src, setSrc]=useState(null);

  return (
    <View style={styles.container}>
      <Search onChangeText={(text)=> setSrc(text)} />
        <Image source={allLogo.iccart} style={styles.cart} />
        <Image source={allLogo.icwishlist} style={styles.nav} />
      

      <View style={styles.content}>
        {
          state.content == 'home' ?
            <Home />
          : 
            <Kategoriproduk />
        }
      </View>

      <View style={styles.footer}>
        <Pressable style={[styles.presable, {backgroundColor: state.content === 'home' ? '#234D6C' : '#2A334B'}]} onPress={() => setState(state => ({...state, content: 'home' }))}>
          <Image source={allLogo.ichome} style={styles.icon} />
          <Text style={{color:'white', fontSize:toDp(11)}}>Beranda</Text>
        </Pressable>
        <Pressable style={[styles.presable, {backgroundColor: state.content === 'Kategoriproduk' ? '#234D6C' : '#2A334B'}]} onPress={() => setState(state => ({...state, content: 'Kategoriproduk' }))}>
          <Image source={allLogo.iccategory} style={styles.icon} />
          <Text style={{color:'white', fontSize:toDp(11)}}>Kategori</Text>
        </Pressable>
        <Pressable style={[styles.presable, {backgroundColor: state.content === 'Notification' ? '#234D6C' : '#2A334B'}]} onPress={() => NavigatorService.navigate('Notification')}>
          <Image source={allLogo.icnotification} style={styles.icon} />
          <Text style={{color:'white', fontSize:toDp(11)}}>Notifikasi</Text>
        </Pressable>
        <Pressable style={[styles.presable, {backgroundColor: state.content === 'Profilone' ? '#234D6C' : '#2A334B'}]}  onPress={()=> NavigatorService.navigate('Profilone')}>
          <Image source={allLogo.icprofil} style={styles.icon} />
          <Text style={{color:'white', fontSize:toDp(11)}}>Profil</Text>
        </Pressable>
      </View>

    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',

  },
  header: {
    top: toDp(20),
    right: toDp(30),
    height: toDp(35),
    width: toDp(250),
    backgroundColor: '#2A334B',
    borderRadius: toDp(10),
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  search: {
    padding: toDp(1),
    tintColor: 'white',
    top: toDp(7),
    left: toDp(15),
    transform: [{ rotate: '10deg' }],
  },
  cart: {
    padding: toDp(1),
    bottom: toDp(45),
    left: toDp(260) 
  },
  nav: {
    padding: toDp(1),
    bottom: toDp(66),
    left: toDp(290) 
  },
  content: {
    flex: 1
  },
  footer: {
    width: toDp(340),
    height: toDp(52),
    bottom: toDp(10),
    flexDirection: 'row',
    backgroundColor: '#2A334B',
    borderRadius: toDp(10)
  },
  presable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: toDp(10), 
  },
  icon: {
    width: toDp(28),
    height: toDp(26),
    resizeMode: 'contain',
    tintColor: 'white'
  }

});

export default Homepage;
