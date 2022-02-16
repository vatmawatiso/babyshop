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
import  HeaderToko  from '@HeaderToko'
import NavigatorService from '@NavigatorService'
import { TextInput } from "react-native-gesture-handler";

const Profiltoko = (props) => {
  const [src, setSrc]=useState(null);

  const DATA = [
    {
      id: '2938492',
      nama: 'TB Abadi Jaya Bandung',
      memberUser: 'Member',
      pengikutUser: 'Pengikut (100)',
      mengikutiUser : 'Mengikuti (4)',
      type: 'Pembeli',
      image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    },
  ]

  const total = [
    {
      pesanan: '12',
      penjualan: '50'
    },
  ]


  return (
    <View style={styles.container}>

        <HeaderToko
          title={'Profil Toko'}
          onPress={() => props.navigation.goBack()}
        />

        <View style={styles.bodyProfil}>
            <View style={styles.profil1}>
                <Image source={{uri: DATA[0].image}} style={styles.imgProfil} />
                <Text style={styles.txtProfil1}>{DATA[0].nama}</Text>
            </View>

            <Text style={styles.txtMember}>Member Classic</Text>

            <View style={styles.profil2}>
                <Text style={styles.txtPengikut}>Pengikut</Text>
                <Text style={styles.txtMengikuti}>Mengikuti</Text>
            </View>

            <View style={styles.profil3}>
              <Pressable style={styles.btnPembayaran}>
                <Image source={allLogo.icwallet} style={styles.icwallet}/>
                <Text style={styles.txtPembayaran}>Pembayaran</Text>
              </Pressable>

              <Pressable style={styles.btnPengiriman}>
                <Image source={allLogo.icstore} style={styles.icstore}/>
                <Text style={styles.txtPengiriman}>Pengiriman</Text>
              </Pressable>
            </View>
        </View>

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

        <View style={styles.bodyPenjualan}>
            <Pressable style={styles.btnPesanan}>
                <Text style={styles.txtPesanan}>Total Pesanan</Text>
                <Text style={styles.Totalpesanan}>{total[0].pesanan}</Text>
            </Pressable>
            <Pressable style={styles.btnPenjualan}>
                <Text style={styles.txtPenjualan}>Total Penjualan</Text>
                <Text style={styles.Totalpenjualan}>{total[0].penjualan}</Text>
            </Pressable>

            <View style={styles.tambahProduk}>
                <Image source={allLogo.icbuilding} style={styles.icbuilding}/>
                <Pressable style={styles.btnTambah}>
                    <Text style={styles.txtTambah}>Tambah Produk</Text>
                </Pressable>
            </View>
            
        </View>

    </View>
  )
};

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
    top:toDp(20),
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
    right:toDp(15),
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
    height:toDp(25)
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
  bodyMenu: {
    backgroundColor:'#E7E7E7',
    width:toDp(335),
    height:toDp(36),
    borderRadius:toDp(8),
    top:toDp(30),
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
  bodyPenjualan: {
    backgroundColor:'#E7E7E7',
    width:toDp(335),
    height:toDp(365),
    borderRadius:toDp(8),
    top:toDp(40),
    flexDirection:'row',
    justifyContent:'space-between',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.20,
      shadowRadius: 1.41,
      
      elevation: 2,
  },
  btnPesanan: {
    margin:toDp(10),
    backgroundColor:'#2A334B',
    width:toDp(88),
    height:toDp(60),
    borderRadius:toDp(8),
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.20,
      shadowRadius: 1.41,
      
      elevation: 2,
  },
  btnPenjualan: {
    margin:toDp(10),
    backgroundColor:'#2A334B',
    width:toDp(88),
    height:toDp(60),
    borderRadius:toDp(8),
    left:toDp(118),
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.20,
      shadowRadius: 1.41,
      
      elevation: 2,
  },
  txtPesanan: {
    color:'white',
    textAlign:'center'
  },
  txtPenjualan: {
    color:'white',
    textAlign:'center'
  },
  tambahProduk: {
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    right:toDp(125),
    top:toDp(20),
  },
  icbuilding: {
    width:toDp(153),
    height:toDp(147),
  },
  btnTambah: {
    top:toDp(20),
    backgroundColor:'#2A334B',
    width:toDp(171),
    height:toDp(40),
    justifyContent:'center',
    borderRadius:toDp(8),
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.20,
      shadowRadius: 1.41,
      
      elevation: 2,
  },
  txtTambah: {
    textAlign:'center',
    color:'white'
  },
  Totalpesanan: {
    color:'white',
    textAlign:'center'
  },
  Totalpenjualan: {
    color:'white',
    textAlign:'center'
  }
});

export default Profiltoko;