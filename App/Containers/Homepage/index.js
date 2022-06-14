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

  // useEffect(() => {

  //   AsyncStorage.getItem('member').then(response => {
  //     // console.log('Profil----------->'+ JSON.stringify(response));

  //     let data = JSON.parse(response);
  //     // const val = JSON.stringify(data);

  //     console.log('Profilefiks----------->' + JSON.stringify(data));

  //     setState(state => ({
  //       ...state,
  //       mb_id: data.mb_id,
  //       mb_name: data.value.mb_name,
  //       mb_email: data.value.mb_email,
  //       mb_phone: data.value.mb_phone,
  //       mb_type: data.value.mb_type,
  //       picture: data.value.picture,
  //       retail_id: data.value.rtl_id,
  //       rtl_status: data.value.rtl_status
  //     }))
  //     console.log('cek state  ===> ', data.mb_id)


  //   }).catch(err => {
  //     console.log('err', err)
  //   })

  //   AsyncStorage.getItem('uid').then(uids => {
  //     let ids = uids;
  //     setState(state => ({
  //       ...state,
  //       mb_id: ids
  //     }))
  //   }).catch(err => {
  //     console.log('err', err)
  //   })

  //   getStatus()

  // }, [])


  //  //get status
  //  const getStatus = () => {
  //   AsyncStorage.getItem('member').then(response => {
  //     let idmb = response;
  //     console.log('Let rtl_id ===> ', idmb)

  //     axios.get('https://market.pondok-huda.com/dev/react/retail/?rtl_id=' + idmb)
  //       .then(result => {
  //         console.log('STATUS RETAIL ---->' + JSON.stringify(result));

  //         if (result.data.status == 200) {
  //           setState(state => ({ ...state, datas: result.data.data }))
  //           console.log('result ===> ', result.data.data)
  //         }
  
  //       }).catch(error => {
  //         console.log(error)
  //       })

  //   }).catch(err => {
  //     console.log(err);
  //   })
  // }

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
