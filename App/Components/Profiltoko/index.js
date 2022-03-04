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


class Profiltoko extends Component {


  render() {
    return (
      <View style={styles.container}>
         <View style={styles.bodyProfil}>
            <View style={styles.profil1}>
                <Image source={{uri: DATA[0].image}} style={styles.imgProfil} />
                <Text style={styles.txtProfil1}>{DATA[0].nama}</Text>
            </View>

            <Text style={styles.txtMember}>{DATA[0].memberUser}</Text>

            <View style={styles.profil2}>
                <Text style={styles.txtPengikut}>{DATA[0].pengikutUser}</Text>
                <Text style={styles.txtMengikuti}>{DATA[0].mengikutiUser}</Text>
            </View>

            <View style={styles.profil3}>
              <Pressable style={styles.btnPembayaran}>
                <Image source={allLogo.icwallet} style={styles.icwallet}/>
                <Text style={styles.txtPembayaran}>Pembayaran</Text>
              </Pressable>

              <Pressable style={styles.btnPengiriman} onPress={() =>NavigatorService.navigate('Pengiriman')} >
                <Image source={allLogo.icstore} style={styles.icstore}/>
                <Text style={styles.txtPengiriman}>Pengiriman</Text>
              </Pressable>
              
            </View>
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
  bodyProfil: {
    backgroundColor:'#2A334B',
    width:toDp(335),
    height:toDp(116),
    borderRadius:toDp(8),
    bottom:toDp(90),
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.20,
      shadowRadius: 1.41,
      
      elevation: 2,
  },
  imgProfil: {
    height: toDp(50),
    width: toDp(50),
    top: toDp(25),
    left: toDp(25),
    borderRadius: toDp(25)
  },
  profil1: {
    flexDirection:'row',
    right:20
    
  },
  profil2: {
    flexDirection:'row',
    justifyContent:'center',
    right:toDp(40),
  },
  txtProfil1: {
    marginLeft:toDp(25),
    marginTop:toDp(20),
    fontSize:toDp(13),
    color:'white'
  }, 
  txtMember: {
    textAlign:'center',
    right:toDp(45),
    fontSize:toDp(12),
    color:'white'
  },
  txtMengikuti: {
    left:toDp(10),
    fontSize:toDp(12),
    color:'white'
  },
  txtPengikut: {
    fontSize:toDp(12),
    color:'white'
  },
  profil3: {
    alignItems:'flex-end',
  },
  btnPembayaran: {
    bottom:toDp(60),
    width:toDp(120),
    height:toDp(25)
  },
  btnPengiriman: {
    bottom:toDp(40),
    width:toDp(120),
    height:toDp(25),
  },
  txtPembayaran: {
    bottom:toDp(20),
    left:toDp(30),
    color:'white'
  },
  txtPengiriman: {
    bottom:toDp(20),
    left:toDp(30),
    color:'white'
  },
})



export default Profiltoko
