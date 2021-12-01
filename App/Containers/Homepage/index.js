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

import NavigatorService from '@NavigatorService'

import Home from './Home'
import Wishlist from './Wishlist'
import Notification from './Notification'
import Profil from './Profil'

const Homepage = () => {

  const [state, setState] = useState({
    content: 'home', // home, user, setting
  })

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'} />
      <View style={styles.header}>
      <Image source={allLogo.icsearch} style={styles.search} />
        <Text style={styles.title}>Pencarian . . .</Text>
        <Image source={allLogo.iccart} style={styles.cart} />
        <Image source={allLogo.icnav} style={styles.nav} />
      </View>

      <View style={styles.content}>
        {
          state.content == 'home' ?
            <Home />
          : state.content == 'wishlist' ?
            <Wishlist />
          : state.content == 'notification' ?
            <Notification />
          : 
            <Profil />
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
        <Pressable style={[styles.presable, {backgroundColor: state.content === 'profil' ? '#234D6C' : '#2A334B'}]} onPress={() => setState(state => ({...state, content: 'profil' }))}>
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
    top: toDp(20),
    right: toDp(30),
    height: toDp(35),
    width: toDp(250),
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
    marginTop: toDp(-12),
    marginLeft: toDp(45)
  },

});

export default Homepage;
