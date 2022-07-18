import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Image,
  StatusBar,
  ImageBackground,
  Pressable, 
  AsyncStorage
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';

import NavigatorService from '@NavigatorService'

import Home from './Home'
import Kategoriproduk from './Kategoriproduk'
import Notification from './Notification'
import Profilone from '../Profilone'
import Search from '@Search'
import axios from "axios";


const Homepage = () => {

  const [status, setStatus] = useState(false);

  const [state, setState] = useState({
    // mb_id: '',
    // mb_name: '',
    // mb_type: '',
    // mb_phone: '',
    // mb_email: '',
    // rtl_id:'',
    // rtl_status: '',
    content: 'home', // home, user, setting

  })

  const [text, setText] = useState('');
  const [src, setSrc]=useState(null);
  useEffect(() => {
    // get id pengguna
    AsyncStorage.getItem('uid').then(uids => {
      let ids = uids;
      setState(state => ({...state, id: ids}))
      console.log('id', state.id)
    }).catch(error => {
      console.log('error', error)
    })

  }, [])
 
  return (
    <View style={styles.container}>
      <Search onChangeText={(text)=> setSrc(text)}
       onChart={() => NavigatorService.navigate('Keranjang', {id: state.id})}
       onWish={() => NavigatorService.navigate('Wishlist')}
       />
      
      <Image source={allLogo.iccart} style={styles.cart} />
        <Image source={allLogo.icnav} style={styles.nav} />
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
        <Pressable style={[styles.presable, {backgroundColor: state.content === 'Notification' ? '#234D6C' : '#2A334B'}]} onPress={() => NavigatorService.navigate('underConstruction')}>
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
    top: toDp(-45),
    left: toDp(260) 
  },
  nav: {
    padding: toDp(1),
    top: toDp(-66),
    left: toDp(290) 
  },
  content: {
    flex: 1,
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
