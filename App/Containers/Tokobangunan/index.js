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

const Tokobangunan = (props) => {

    const DATA = [
        {
          id: '1',
          nama: 'TB Jaya Abadi',
          telepon: '083141520987',
          alamat: 'Bandung',
          image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
        },
        {
          id: '2',
          nama: 'TB Jaya Abadi',
          telepon: '083141520987',
          alamat: 'Bandung',
          image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
        },
        {
          id: '3',
          nama: 'TB Jaya Abadi',
          telepon: '083141520987',
          alamat: 'Bandung',
          image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
        },
        {
          id: '4',
          nama: 'TB Jaya Abadi',
          telepon: '083141520987',
          alamat: 'Bandung',
          image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
        },
        {
          id: '5',
          nama: 'TB Jaya Abadi',
          telepon: '083141520987',
          alamat: 'Bandung',
          image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
        },
        {
          id: '6',
          nama: 'TB Jaya Abadi',
          telepon: '083141520987',
          alamat: 'Bandung',
          image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
        },
        {
          id: '7',
          nama: 'TB Jaya Abadi',
          telepon: '083141520987',
          alamat: 'Bandung',
          image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
        },
        {
          id: '8',
          nama: 'TB Jaya Abadi',
          telepon: '083141520987',
          alamat: 'Bandung',
          image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
        },
        {
          id: '9',
          nama: 'TB Jaya Abadi',
          telepon: '083141520987',
          alamat: 'Bandung',
          image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
        },
        {
          id: '10',
          nama: 'TB Jaya Abadi',
          telepon: '083141520987',
          alamat: 'Bandung',
          image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
        },  {
          id: '11',
          nama: 'TB Jaya Abadi',
          telepon: '083141520987',
          alamat: 'Bandung',
          image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
        },
        {
          id: '12',
          nama: 'TB Jaya Abadi',
          telepon: '083141520987',
          alamat: 'Bandung',
          image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
        },
        {
          id: '13',
          nama: 'TB Jaya Abadi',
          telepon: '083141520987',
          alamat: 'Bandung',
          image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
        },
        {
          id: '14',
          nama: 'TB Jaya Abadi',
          telepon: '083141520987',
          alamat: 'Bandung',
          image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
        },
      ]


      const renderswitch = ({item, index}) => {
        return (
          <View style={{width:toDp(316), borderRadius:toDp(15)}}>
      
            <View style={styles.body}>
                <Image source={{uri: DATA[0].image}} style={styles.imgKontak} />
                      
                <View style={styles.content}>
                    <View style={{flexDirection:'row'}}> 
                        <Text>Nama</Text>  
                        <Text style={styles.txtNama}>{DATA[0].nama}</Text>
                    </View>

                    <View style={{flexDirection:'row'}}>
                        <Text>Telepon</Text>
                        <Text style={styles.txtHP}>{DATA[0].telepon}</Text>
                    </View>

                    <View style={{flexDirection:'row'}}>
                        <Text>Harga</Text>
                        <Text style={styles.txtHarga}>{DATA[0].alamat}</Text>
                    </View>
                </View>

                <Pressable style={styles.btnKontak}>
                    <Text style={styles.txtKontak}>Kontak</Text>
                </Pressable>
            </View>
            {/* <View style={{margin:1}}></View> */}
          
          </View>
    
          )
        } 
      
    

     return (
      <View style={styles.container}>
         <NonCart
          title={'Toko Bangunan'}
          onPress={() => props.navigation.goBack()}
        />

        <View style={{marginBottom:toDp(30), width:toDp(335)}}>
        <FlatList
          data={DATA}
          renderItem={renderswitch}
          keyExtractor={item => item.id}
          ListFooterComponent={() => <View style={{height: toDp(50)}} />}
        />
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
  body: {
    flexDirection:'row', 
    backgroundColor:'#C4C4C4', 
    width:toDp(335), 
    height:toDp(80), 
    borderRadius:toDp(8), 
    top:toDp(20),
    justifyContent:'space-between',
    marginBottom:toDp(2),
    // right:toDp(10)
  },
  content: {
      right:toDp(10),
      top:toDp(10)
  },
  imgKontak: {
    height: toDp(50),
    width: toDp(50),
    borderRadius: toDp(25),
    top:toDp(10),
    left:toDp(5)
  },
  txtKontak: {
      top:toDp(30),
      right:toDp(10),
      backgroundColor:'#2A334B',
      width:toDp(52),
      height:toDp(20),
      borderRadius:toDp(15),
      textAlign:'center',
      fontSize:toDp(12),
      color:'white'
  },
  txtNama: {
    left:toDp(22)
  },
  txtHP: {
    left:toDp(10)
  },
  txtHarga: {
    left:toDp(22)
  }
});

export default Tokobangunan;