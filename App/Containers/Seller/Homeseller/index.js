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
import  Profiltoko  from '@Profiltoko'
import  MenuToko  from '@MenuToko'
import  BackHeader  from '@BackHeader'
import NavigatorService from '@NavigatorService'
import { TextInput } from "react-native-gesture-handler";

const Homeseller = (props) => {
  const [src, setSrc]=useState(null);

//   const DATA = [
//     {
//       id: '2938492',
//       nama: 'TB Jaya Abadi Bandung',
//       memberUser: 'Member Classic',
//       pengikutUser: 'Pengikut (100)',
//       mengikutiUser : 'Mengikuti (4)',
//       type: 'Pembeli',
//       image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
//     },
//   ]

  return (
    <View style={styles.container}>
        <BackHeader
          title={'Home'}
          onPress={() => props.navigation.goBack()}
        />

        <Profiltoko/>
        <MenuToko/>

        <View style={styles.Penjualan}>
              <Pressable style={{marginVertical:5, bottom:toDp(5), height:toDp(30), justifyContent:'center'}} onPress={() => NavigatorService.navigate('Ulasan')}>
                <View style={styles.BodySaldo}>
                    <Text style={styles.txtSkor}>Skor Toko</Text>
                    <Image source={allLogo.iclineright} style={styles.iclineright} />
                </View>
              </Pressable>
              <Pressable style={{bottom:toDp(10), height:toDp(30), justifyContent:'center', marginVertical:5}} onPress={() => NavigatorService.navigate('Saldopenjual')} >
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{marginLeft:toDp(10)}}>Saldo</Text>
                    <Text style={{marginRight:toDp(10)}}>Rp 5.000.000</Text>
                </View>
              </Pressable>
              <View style={{borderWidth:0.5, borderColor:'grey', bottom:toDp(10)}} />

              <Pressable style={{flexDirection:'row', justifyContent:'space-between', bottom:toDp(10)}} onPress={() => alert('Coming Soon')}>
                  <Text style={styles.txtPenjualan}>Penjualan</Text>
                  <Image source={allLogo. iclineright} style={styles.iclineright1} />
              </Pressable>
              <View style={{borderWidth:0.5, borderColor:'grey', bottom:toDp(10)}} />
              
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <Pressable style={{ height:30}} onPress={() => NavigatorService.navigate('Pengiriman', {content:'Belumbayar'})} >
                    <View style={{flexDirection:'row', margin:toDp(10)}}>
                        <Image source={allLogo.icorders} style={{bottom:toDp(10)}}/>
                        <Text style={{padding:toDp(5), bottom:toDp(10)}}>Pesanan Baru</Text>
                    </View>
                  </Pressable>
                  <Pressable style={{ height:30}} onPress={() => NavigatorService.navigate('Pengiriman', {content:'Perludikirim'})}>
                    <View style={{flexDirection:'row', margin:toDp(10)}}>
                          <Image source={allLogo.iconly} style={{bottom:toDp(10)}} />
                          <Text style={{padding:toDp(5), bottom:toDp(10)}}>Siap dikirim</Text>
                    </View>
                  </Pressable>        
              </View>
              <Text style={{margin:toDp(10)}}>Kata Pembeli</Text> 
              <View style={{borderWidth:0.5, borderColor:'grey'}} />

              <View style={styles.bodyJual}>
                  <Pressable style={{width:toDp(335), height:toDp(30), bottom:toDp(5)}} onPress={() => NavigatorService.navigate('Ulasan')} >
                    <View style={{flexDirection:'row', margin:toDp(10), top:toDp(10)}}>
                      <Image source={allLogo.iculasan} style={{bottom:toDp(20)}} />
                      <Text style={{padding:toDp(5), bottom:toDp(20)}}>ulasan</Text>
                    </View>
                  </Pressable>
                  <Pressable  style={{width:toDp(335), height:toDp(30), top:toDp(10)}} onPress={() => alert('Coming Soon')}>
                    <View style={{flexDirection:'row', margin:toDp(10)}}>
                      <Image source={allLogo.icchatbox} style={{bottom:toDp(10)}} />
                      <Text style={{padding:toDp(5), bottom:toDp(10)}}>Diskusi</Text>
                    </View>
                  </Pressable>
                  <Pressable style={{width:toDp(335), height:toDp(35), top:toDp(20)}} onPress={() => alert('Coming Soon')}>
                    <View style={{flexDirection:'row', margin:toDp(10)}}>
                      <Image source={allLogo.icdiscussion} style={{bottom:toDp(10)}} />
                      <Text style={{padding:toDp(5), bottom:toDp(6)}}>Pesanan Komplain</Text>
                    </View>
                  </Pressable>
              </View>
          </View>
        
        <View style={[styles.bodyMenu, {justifyContent:'space-between', alignItems:'center'} ]}>
            <Pressable style={styles.btnHome} onPress={() => NavigatorService.navigate('Homeseller')} >
                <Image source={allLogo.ichome} style={styles.ichome} />
            </Pressable>
            <Pressable style={styles.btnPlus} onPress={() => NavigatorService.navigate('Tambahproduk')} >
                <Image source={allLogo.icplusround} style={styles.icplus}/>
            </Pressable> 
            <Pressable style={styles.btnChat} onPress={() => NavigatorService.navigate('Chat')} >
                <Image source={allLogo.icchat} style={styles.icchat}/>
            </Pressable> 
        </View>


    
        
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    top:toDp(50),
  },
iclineright: {
  width:toDp(10),
  height:toDp(15)
},
Body: {
  backgroundColor:'#C4C4C4',
  width:toDp(335),
  height:toDp(80),
  borderRadius:toDp(8),
  top:toDp(30),
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
},
BodySaldo: {
    flexDirection:'row',
    justifyContent:'space-between',
    marginLeft:toDp(10),
    marginRight:toDp(10)
},
Penjualan: {
  backgroundColor:'#E7E7E7',
  width:toDp(335),
  height:toDp(320),
  bottom:toDp(20),
  borderRadius:toDp(8),
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
},
txtPenjualan: {
  margin:toDp(10),
},
iclineright1: {
  margin:toDp(10),
  width:toDp(10),
  height:toDp(15),
},
  bodyMenu: {
      flexDirection:'row',
      alignItems:'baseline',
      backgroundColor:'#2A334B',
      bottom:toDp(10),
      width:toDp(335),
      height:toDp(45),
      borderRadius:toDp(8),
  },
  btnHome: {
    marginHorizontal:toDp(20),

  },
  icchat: {
    width:toDp(26),
    height:toDp(26),
    tintColor:'white'
  },
  icplus: {
    // tintColor:'black'
  },
  ichome: {
    tintColor:'white'
  },
  btnChat: {
    marginHorizontal:toDp(20),

  },
  btnPlus: {

  },
  bodyJual: {
    marginTop:toDp(15)
  }
});

export default Homeseller;