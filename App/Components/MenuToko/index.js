import React, { Component } from 'react'
import {BackHandler, 
        Dimensions, 
        StyleSheet, 
        Text, 
        View, 
        Image, 
        Alert, 
        Platform, 
        TouchableOpacity, 
        ScrollView,
        Pressable
      } from 'react-native'

import LinearGradient from 'react-native-linear-gradient'
import { allLogo } from '@Assets'
import { toDp } from '@percentageToDP'
import NavigatorService from '@NavigatorService'

let { width, height } = Dimensions.get('window')



const title = (text) => {
  let newText = text.substr(0,15);

  return(
    <Text>{newText}</Text>
  )
}

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


class MenuToko extends Component {


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.bodyMenu}>
          <Pressable>
            <Text style={styles.txtToko}>Toko Saya</Text>
          </Pressable>
          <Pressable>
            <Text style={styles.txtProduk}>Produk Saya</Text>
          </Pressable>
          <Pressable>
            <Text style={styles.txtKategori}>Kategori</Text>
          </Pressable>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    top:toDp(50)
  },
  bodyMenu: {
    backgroundColor:'#E7E7E7',
    width:toDp(335),
    height:toDp(36),
    borderRadius:toDp(8),
    bottom:toDp(28),
    flexDirection:'row',
    justifyContent:'space-between',
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
  txtToko: {
    marginLeft:toDp(5)
  },
  txtProduk: {
  
  },
  txtKategori: {
    marginRight:toDp(5)
  },
})



export default MenuToko
