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
import Axios from "axios";

const Jasatukang = (props) => {

  const [state, setState] = useState({
    datas: [],
    loading: false
  })
  useEffect (() => {
    tukang()
  }, [])


  const tukang = () => {
    setState(state => ({...state, loading: true}))
    Axios.get('https://market.pondok-huda.com/dev/react/handyman/')
    .then(result => {
      if(result.data.status == 200) {
        console.log('result tukang =>', result)
        setState(state => ({...state, datas: result.data.data}))
        setState(state => ({...state, loading: false}))
      } else if (result.data.status == 500){
        console.log('error')
        setState(state => ({...state, loading: false}))
      }
    }).catch(error => {
      console.log('error tukang => ', error)
      setState(state => ({...state, loading: false}))
    })
  }

    // const DATA = [
    //     {
    //       id: '1',
    //       nama: 'Vatmawati',
    //       telepon: '083141520987',
    //       harga: 'Rp 500.000',
    //       image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    //     },
    //     {
    //       id: '2',
    //       nama: 'Vatmawati',
    //       telepon: '083141520987',
    //       harga: 'Rp 500.000',
    //       image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    //     },
    //     {
    //       id: '3',
    //       nama: 'Vatmawati',
    //       telepon: '083141520987',
    //       harga: 'Rp 500.000',
    //       image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    //     },
    //     {
    //       id: '4',
    //       nama: 'Vatmawati',
    //       telepon: '083141520987',
    //       harga: 'Rp 500.000',
    //       image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    //     },
    //     {
    //       id: '5',
    //       nama: 'Vatmawati',
    //       telepon: '083141520987',
    //       harga: 'Rp 500.000',
    //       image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    //     },
    //     {
    //       id: '6',
    //       nama: 'Vatmawati',
    //       telepon: '083141520987',
    //       harga: 'Rp 500.000',
    //       image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    //     },
    //     {
    //       id: '7',
    //       nama: 'Vatmawati',
    //       telepon: '083141520987',
    //       harga: 'Rp 500.000',
    //       image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    //     },
    //     {
    //       id: '8',
    //       nama: 'Vatmawati',
    //       telepon: '083141520987',
    //       harga: 'Rp 500.000',
    //       image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    //     },
    //     {
    //       id: '9',
    //       nama: 'Vatmawati',
    //       telepon: '083141520987',
    //       harga: 'Rp 500.000',
    //       image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    //     },
    //     {
    //       id: '10',
    //       nama: 'Vatmawati',
    //       telepon: '083141520987',
    //       harga: 'Rp 500.000',
    //       image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    //     },  {
    //       id: '11',
    //       nama: 'Vatmawati',
    //       telepon: '083141520987',
    //       harga: 'Rp 500.000',
    //       image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    //     },
    //     {
    //       id: '12',
    //       nama: 'Vatmawati',
    //       telepon: '083141520987',
    //       harga: 'Rp 500.000',
    //       image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    //     },
    //     {
    //       id: '13',
    //       nama: 'Vatmawati',
    //       telepon: '083141520987',
    //       harga: 'Rp 500.000',
    //       image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    //     },
    //     {
    //       id: '14',
    //       nama: 'Vatmawati',
    //       telepon: '083141520987',
    //       harga: 'Rp 100.000',
    //       image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    //     },
    //   ]

      const renderTukang = (item, index) => (
          <View style={{width:toDp(335), borderRadius:toDp(8), marginTop: toDp(5), justifyContent: 'center', alignItems: 'center', marginHorizontal: 12}}>
      
            <View style={styles.body}>
                <Image source={require('../../Assets/img/tzuyu.jpg')} style={styles.imgKontak} />
                      
                <View style={styles.content}>
                    <View style={{flexDirection:'row'}}> 
                        <Text>Nama</Text>  
                        <Text style={styles.txtNama}>{item.hs_name}</Text>
                    </View>

                    <View style={{flexDirection:'row'}}>
                        <Text>Telepon</Text>
                        <Text style={styles.txtHP}>{item.hs_phone}</Text>
                    </View>

                    <View style={{flexDirection:'row'}}>
                        <Text>Harga</Text>
                        <Text style={styles.txtHarga}>{item.hs_harga}</Text>
                    </View>
                </View>

                <Pressable style={styles.btnKontak} onPress={() => NavigatorService.navigate('Chat')}>
                    <Text style={styles.txtKontak}>Kontak</Text>
                </Pressable>
            </View>
            {/* <View style={{margin:1}}></View> */}
          
          </View>
    
          )

     return (
      <View style={styles.container}>
         <BackHeader
          title={'Jasa Tukang'}
          onPress={() => props.navigation.goBack()}
        />

      <View style={styles.flatcontent}>
        <FlatList style={{ width: '100%' }}
          data={state.datas}
          renderItem={({ item, index }) => {
            return (
              renderTukang(item, index)
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
    flex:1,
    // justifyContent:'center',
    // alignItems: 'center',
    // top:toDp(30)
  },
  body: {
    flexDirection:'row', 
    backgroundColor:'#C4C4C4', 
    width:toDp(335), 
    height:toDp(80), 
    borderRadius:toDp(20), 
    top:toDp(10),
    justifyContent:'space-between',
    marginBottom:toDp(2)
  },
  content: {
      right:toDp(10),
      top:toDp(10)
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
    borderRadius: toDp(20),
    top:toDp(10),
    left:toDp(5)
  },
  txtKontak: {
      top:toDp(30),
      right:toDp(10),
      backgroundColor:'#2A334B',
      width:toDp(52),
      height:toDp(20),
      borderRadius:toDp(20),
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

export default Jasatukang;