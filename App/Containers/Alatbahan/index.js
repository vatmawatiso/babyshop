import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Alert,
  TextInput,
  SafeAreaView,
  Pressable,
  ScrollView
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import  NonCart  from '@NonCart'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import NavigatorService from '@NavigatorService'

const Alatbahan = (props) => {

    const Tools = [
        {
          id: '1',
          produk: 'Gerobak',
          image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
        },
        {
          id: '2',
          produk: 'Palu',
          image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
        },
        {
          id: '3',
          produk: 'Sendok Semen',
          image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
        },
        {
          id: '4',
          produk: 'Paku',
          image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
        },
    ]

    const Materials = [
        {
          id: '1',
          produk: 'Cat Tembok',
          image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
        },
        {
          id: '2',
          produk: 'Semen',
          image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
        },
        {
          id: '3',
          produk: 'Genteng',
          image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
        },
        {
          id: '4',
          produk: 'Batu Bata',
          image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
        },
    ]

     return (
      <View style={styles.container}>
         <NonCart
          title={'Alat Bahan'}
          onPress={() => props.navigation.goBack()}
        />
          <View style={{marginTop:toDp(10)}}>
            <Text style={styles.txtTools}>Alat Bangunan</Text>
            
            <View style={styles.bodyTools}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:toDp(10)}}>
                    <Image source={{uri: Tools[0].image}} style={styles.imgProduk} />
                    <Text style={styles.produk}>{Tools[0].produk}</Text>
                        <Pressable>
                            <Text style={styles.btnProduk}>Lihat</Text>
                        </Pressable>
                </View>

                <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:toDp(10)}}>
                    <Image source={{uri: Tools[0].image}} style={styles.imgProduk} />
                    <Text style={styles.produk1}>{Tools[1].produk}</Text>
                        <Pressable>
                            <Text style={styles.btnProduk1}>Lihat</Text>
                        </Pressable>
                </View>

                <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:toDp(10)}}>
                    <Image source={{uri: Tools[0].image}} style={styles.imgProduk} />
                    <Text style={styles.produk2}>{Tools[2].produk}</Text>
                        <Pressable>
                            <Text style={styles.btnProduk1}>Lihat</Text>
                        </Pressable>
                </View>

                <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:toDp(10)}}>
                    <Image source={{uri: Tools[0].image}} style={styles.imgProduk} />
                    <Text style={styles.produk3}>{Tools[3].produk}</Text>
                        <Pressable>
                            <Text style={styles.btnProduk3}>Lihat</Text>
                        </Pressable>
                </View>

                <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:toDp(10)}}>
                    <Image source={{uri: Tools[0].image}} style={styles.imgProduk} />
                    <Text style={styles.produk3}>{Tools[3].produk}</Text>
                        <Pressable>
                            <Text style={styles.btnProduk3}>Lihat</Text>
                        </Pressable>
                </View>

                </ScrollView>
            </View>

            <Text style={styles.txtMaterials}>Bahan Bangunan</Text>
            
            <View style={styles.bodyMaterials}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:toDp(10)}}>
                    <Image source={{uri: Materials[0].image}} style={styles.imgProduk} />
                    <Text style={styles.material}>{Materials[0].produk}</Text>
                        <Pressable>
                            <Text style={styles.btnMaterial}>Lihat</Text>
                        </Pressable>
                </View>

                <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:toDp(10)}}>
                    <Image source={{uri: Materials[0].image}} style={styles.imgProduk} />
                    <Text style={styles.material1}>{Materials[1].produk}</Text>
                        <Pressable>
                            <Text style={styles.btnMaterial1}>Lihat</Text>
                        </Pressable>
                </View>

                <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:toDp(10)}}>
                    <Image source={{uri: Materials[0].image}} style={styles.imgProduk} />
                    <Text style={styles.material2}>{Materials[2].produk}</Text>
                        <Pressable>
                            <Text style={styles.btnMaterial1}>Lihat</Text>
                        </Pressable>
                </View>

                <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:toDp(10)}}>
                    <Image source={{uri: Materials[0].image}} style={styles.imgProduk} />
                    <Text style={styles.material3}>{Materials[3].produk}</Text>
                        <Pressable>
                            <Text style={styles.btnMaterial3}>Lihat</Text>
                        </Pressable>
                </View>

                <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:toDp(10)}}>
                    <Image source={{uri: Materials[0].image}} style={styles.imgProduk} />
                    <Text style={styles.material3}>{Materials[3].produk}</Text>
                        <Pressable>
                            <Text style={styles.btnMaterial3}>Lihat</Text>
                        </Pressable>
                </View>

                </ScrollView>
            </View>
            </View>
      </View>
      
    );

}

const styles = StyleSheet.create({
  container: {
    top:toDp(50),
    justifyContent:'center',
    alignItems: 'center',
  },
  contentContainer: {
    paddingVertical: 1
  },
  txtTools: {
    fontWeight:'bold',
    marginRight:toDp(230),
    top:toDp(10)
  },
  bodyTools: {
      backgroundColor:'#C4C4C4',
      top:toDp(20),
      borderRadius:toDp(8),
      width:toDp(335),
      height:toDp(240),
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.20,
          shadowRadius: 1.41,

          elevation: 2,
    },
  imgProduk: {
    height: toDp(50),
    width: toDp(50),
    borderRadius: toDp(25),
    top:toDp(10),
    left:toDp(5)
  },
  produk: {
      top:toDp(25),
      marginRight:toDp(130),
  },
  btnProduk: {
      top:toDp(25),
      backgroundColor:'#2A334B',
      borderRadius:toDp(15),
      right:toDp(10),
      width:toDp(50),
      height:toDp(20),
      textAlign:'center',
      color:'white'
  },
 produk1: {
    top:toDp(25),
    marginRight:toDp(155)
},
btnProduk1: {
    top:toDp(25),
    backgroundColor:'#2A334B',
    borderRadius:toDp(15),
    right:toDp(10),
    width:toDp(50),
    height:toDp(20),
    textAlign:'center',
    color:'white'
},
produk2: {
    top:toDp(25),
    marginRight:toDp(90)
},
btnProduk2: {
    top:toDp(25),
    backgroundColor:'#2A334B',
    borderRadius:toDp(15),
    right:toDp(10),
    width:toDp(50),
    height:toDp(20),
    textAlign:'center',
    color:'white'
},
produk3: {
    top:toDp(25),
    marginRight:toDp(155)
},
btnProduk3: {
    top:toDp(25),
    backgroundColor:'#2A334B',
    borderRadius:toDp(15),
    right:toDp(10),
    width:toDp(50),
    height:toDp(20),
    textAlign:'center',
    color:'white'
},
bodyMaterials: {
    backgroundColor:'#C4C4C4',
    top:toDp(40),
    borderRadius:toDp(8),
    width:toDp(335),
    height:toDp(240),
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.20,
      shadowRadius: 1.41,

      elevation: 2,
},
txtMaterials: {
    fontWeight:'bold',
    marginRight:toDp(210),
    top:toDp(30)
},
material: {
    top:toDp(25),
    marginRight:toDp(110)
},
btnMaterial: {
    top:toDp(25),
    backgroundColor:'#2A334B',
    borderRadius:toDp(15),
    right:toDp(10),
    width:toDp(50),
    height:toDp(20),
    textAlign:'center',
    color:'white'
},
material1: {
  top:toDp(25),
  marginRight:toDp(140)
},
btnMaterial1: {
  top:toDp(25),
  backgroundColor:'#2A334B',
  borderRadius:toDp(15),
  right:toDp(10),
  width:toDp(50),
  height:toDp(20),
  textAlign:'center',
  color:'white'
},
material2: {
  top:toDp(25),
  marginRight:toDp(135)
},
btnMaterial2: {
  top:toDp(25),
  backgroundColor:'#2A334B',
  borderRadius:toDp(15),
  right:toDp(10),
  width:toDp(50),
  height:toDp(20),
  textAlign:'center',
  color:'white'
},
material3: {
  top:toDp(25),
  marginRight:toDp(125)
},
btnMaterial3: {
  top:toDp(25),
  backgroundColor:'#2A334B',
  borderRadius:toDp(15),
  right:toDp(10),
  width:toDp(50),
  height:toDp(20),
  textAlign:'center',
  color:'white'
},
});

export default Alatbahan;