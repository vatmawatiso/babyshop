import React, { useEffect, useState } from "react";
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
import Search from '@Search';
import NavigatorService from '@NavigatorService';

import Home from './Home'
import Wishlist from './Wishlist'
import Notification from './Notification'
import Profilone from '../Profilone'

const Homepage = () => {

  const [state, setState] = useState({
    content: 'home', // home, user, setting
  })
    const [scr, setScr] = useState(null);

  return (
    <View style={styles.container}>
      <Search onChangeText={(text) => setScr(text)}/>

      <View style={styles.content}>
        {
          state.content == 'home' ?
            <Home />
          : state.content == 'wishlist' ?
            <Wishlist />
          :
            <Notification />

        }
      </View>

      <View style={styles.footer}>
        <Pressable style={[styles.presable, {backgroundColor: state.content === 'home' ? '#234D6C' : '#2A334B'}]} onPress={() => setState(state => ({...state, content: 'home' }))}>
          <Image source={allLogo.ichome} style={styles.icon} />
        </Pressable>
        <Pressable style={[styles.presable, {backgroundColor: state.content === 'wishlist' ? '#234D6C' : '#2A334B'}]} onPress={() => setState(state => ({...state, content: 'wishlist' }))}>
          <Image source={allLogo.icwishlist} style={styles.icon} />
        </Pressable>
        <Pressable style={[styles.presable, {backgroundColor: state.content === 'notification' ? '#234D6C' : '#2A334B'}]} onPress={() => setState(state => ({...state, content: 'notification' }))}>
          <Image source={allLogo.icnotification} style={styles.icon} />
        </Pressable>
        <Pressable style={[styles.presable, {backgroundColor: state.content === 'Profilone' ? '#234D6C' : '#2A334B'}]} onPress={() => NavigatorService.navigate('Profilone')}>
          <Image source={allLogo.icprofil} style={styles.icon} />
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
    top: toDp(40),
    right: toDp(30),
    height: toDp(45),
    width: toDp(250),
    marginBottom: toDp(20),
    backgroundColor: '#2A334B',
    borderRadius: toDp(25),
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
    width: toDp(30),
    height: toDp(30),
    top: toDp(7),
    left: toDp(15),
    transform: [{ rotate: '10deg' }],

  },
  cart: {
    padding: toDp(1),
    top: toDp(-20),
    left: toDp(260)
  },
  nav: {
    padding: toDp(1),
    top: toDp(-41),
    left: toDp(290)
  },
  content: {
    flex: 1
  },
  footer: {
    width: toDp(319),
    height: toDp(52),
    bottom: toDp(10),
    flexDirection: 'row',
    backgroundColor: '#2A334B',
    borderRadius: toDp(25),
  },
  presable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: toDp(25),
  },
  icon: {
    width: toDp(28),
    height: toDp(26),
    resizeMode: 'contain',
    tintColor: 'white'
  },
  title: {
    fontWeight: '300',
    fontSize: toDp(12),
    color: 'white',
    marginTop: toDp(-15),
    marginLeft: toDp(55)
  },

});

export default Homepage;
