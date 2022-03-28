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
import  BackHeader  from '@BackHeader'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import NavigatorService from '@NavigatorService'

const Konsultan = (props) => {

    const DATA = [
        {
          id: '1',
          nama: 'Vatmawati',
          email: 'Vatma@gmail.com',
          telepon: '083141520987',
          perusahaan: 'PT. Jaya Citra',
          harga: '1.000.000',
          image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
        },
        {
          id: '2',
          nama: 'Vatmawati',
          email: 'Vatma@gmail.com',
          telepon: '083141520987',
          perusahaan: 'PT. Jaya Citra',
          harga: '1.000.000',
          image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
        },
        {
          id: '3',
          nama: 'Vatmawati',
          email: 'Vatma@gmail.com',
          telepon: '083141520987',
          perusahaan: 'PT. Jaya Citra',
          harga: '1.000.000',
          image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
        },
        {
          id: '4',
          nama: 'Vatmawati',
          email: 'Vatma@gmail.com',
          telepon: '083141520987',
          perusahaan: 'PT. Jaya Citra',
          harga: '1.000.000',
          image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
        },
        {
          id: '5',
          nama: 'Vatmawati',
          email: 'Vatma@gmail.com',
          telepon: '083141520987',
          perusahaan: 'PT. Jaya Citra',
          harga: '1.000.000',
          image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
        },
        {
          id: '6',
          nama: 'Vatmawati',
          telepon: '083141520987',
          perusahaan: 'PT. Jaya Citra',
          harga: '1.000.000',
          image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
        },
        {
          id: '7',
          nama: 'Vatmawati',
          email: 'Vatma@gmail.com',
          telepon: '083141520987',
          perusahaan: 'PT. Jaya Citra',
          harga: '1.000.000',
          image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
        },
        {
          id: '8',
          nama: 'Vatmawati',
          email: 'Vatma@gmail.com',
          telepon: '083141520987',
          perusahaan: 'PT. Jaya Citra',
          harga: '1.000.000',
          image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
        },
        {
          id: '9',
          nama: 'Vatmawati',
          email: 'Vatma@gmail.com',
          telepon: '083141520987',
          perusahaan: 'PT. Jaya Citra',
          harga: '1.000.000',
          image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
        },
        {
          id: '10',
          nama: 'Vatmawati',
          email: 'Vatma@gmail.com',
          telepon: '083141520987',
          perusahaan: 'PT. Jaya Citra',
          harga: '1.000.000',
          image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
        },  {
          id: '11',
          nama: 'Vatmawati',
          email: 'Vatma@gmail.com',
          telepon: '083141520987',
          perusahaan: 'PT. Jaya Citra',
          harga: '1.000.000',
          image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
        },
        {
          id: '12',
          nama: 'Vatmawati',
          email: 'Vatma@gmail.com',
          telepon: '083141520987',
          perusahaan: 'PT. Jaya Citra',
          harga: '1.000.000',
          image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
        },
        {
          id: '13',
          nama: 'Vatmawati',
          email: 'Vatma@gmail.com',
          telepon: '083141520987',
          perusahaan: 'PT. Jaya Citra',
          harga: '1.000.000',
          image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
        },
        {
          id: '14',
          nama: 'Vatmawati',
          email: 'Vatma@gmail.com',
          telepon: '083141520987',
          perusahaan: 'PT. Jaya Citra Abadi',
          harga: '1.000.000',
          image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
        },
      ]


      const renderswitch = (item, index) => (
        <View style={[styles.body, { marginTop: toDp(10), justifyContent: 'center', alignItems: 'center', marginHorizontal: 12 }]}>
      
            <View style={styles.body}>
                <Image source={{uri: DATA[0].image}} style={styles.imgKontak} />
                      
                <View style={styles.content}>
                    <View style={{flexDirection:'row'}}> 
                        <Text style={{fontSize:toDp(12)}}>Nama</Text>  
                        <Text style={styles.txtNama}>{item.nama}</Text>
                    </View>

                    <View style={{flexDirection:'row'}}> 
                        <Text style={{fontSize:toDp(12)}}>Email</Text>  
                        <Text style={styles.txtEmail}>{item.email}</Text>
                    </View>

                    <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:toDp(12)}}>Telepon</Text>
                        <Text style={styles.txtHP}>{item.telepon}</Text>
                    </View>

                    <View style={{flexDirection:'row'}}>
                        <Text  style={{fontSize:toDp(12)}}>PT</Text>
                        <Text style={styles.txtPT}>{item.perusahaan}</Text>
                    </View>

                    <View style={{flexDirection:'row'}}>
                        <Text  style={{fontSize:toDp(12)}}>Harga</Text>
                        <Text style={styles.txtHarga}>{item.harga}</Text>
                    </View>
                </View>

                <Pressable style={styles.btnKontak} onPress={() => NavigatorService.navigate('Chat')}>
                    <Text style={styles.txtKontak}>Kontak</Text>
                </Pressable>
            </View>
          
          </View>
    
          )
      
    

     return (
      <View style={styles.container}>
         <BackHeader
          title={'Konsultan'}
          onPress={() => props.navigation.goBack()}
        />

        <View style={styles.flatcontent}>
          <FlatList style={{ width: '100%' }}
            data={DATA}
            renderItem={({ item, index }) => {
              return (
                renderswitch(item, index)
              )
            }}
            ListFooterComponent={() => <View style={{ height: toDp(120) }} />}
          />
        </View>
     
      </View>
      
    );
  
}

const styles = StyleSheet.create({
  container: {
    justifyContent:'center',
    alignItems: 'center',
    top:toDp(30)
  },
  body: {
    flexDirection:'row', 
    backgroundColor:'#C4C4C4', 
    width:toDp(335), 
    height:toDp(100), 
    borderRadius:toDp(8), 
    justifyContent:'space-between',
    marginBottom:toDp(2)
  },
  content: {
      right:toDp(10),
      top:toDp(10),
  },
  flatcontent: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: toDp(45)
  },
  imgKontak: {
    height: toDp(50),
    width: toDp(50),
    borderRadius: toDp(25),
    top:toDp(23),
    left:toDp(5)
  },
  txtKontak: {
    fontSize:toDp(12),
    color:'white',
    textAlign:'center',
  },
  btnKontak: {
    top:toDp(40),
    right:toDp(10),
    backgroundColor:'#2A334B',
    width:toDp(52),
    height:toDp(20),
    borderRadius:toDp(15),
  },
  txtNama: {
    left:toDp(20),
    fontSize:toDp(12)
  },
  txtHP: {
    left:toDp(10),
    fontSize:toDp(12)
  },
  txtHarga: {
    left:toDp(20),
    fontSize:toDp(12)
  },
  txtPT: {
    left:toDp(38),
    fontSize:toDp(12)
  },
  txtEmail: {
    left:toDp(22),
    fontSize:toDp(12)
  }
});

export default Konsultan;