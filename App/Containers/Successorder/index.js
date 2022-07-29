import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TextInput,
  SafeAreaView,
  Pressable,
  ScrollView,
  Dimensions,
  AsyncStorage,
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import  Back  from '@Back'
import NavigatorService from '@NavigatorService'
import ImagePicker from 'react-native-image-crop-picker'
import axios from 'axios';
import { svr } from "../../Configs/apikey";

const { width, height } = Dimensions.get('window')

const Successorder = (props) => {

    
    const Pembayaran = [
        {
          id: '1',
          Konfirmasibayar: 'Rp 800.000'
        },
      ]
    
      const [state, setState] = useState({
        price:'',
        retail_id:'',
        id_retail:'',
        shp_harga:'',
        options: {
          width: 750,
          height: 750,
          cropping: true
        }
    })

    useEffect(() => {

      AsyncStorage.getItem('member').then(response => {
        // console.log('Profil----------->'+ JSON.stringify(response));
  
        let data = JSON.parse(response);
        // const val = JSON.stringify(data);
  
        // console.log('Profilefiks----------->' + JSON.stringify(data));
  
        setState(state => ({
          ...state,
          mb_id: data.mb_id,
          mb_name: data.value.mb_name,
          mb_email: data.value.mb_email,
          mb_phone: data.value.mb_phone,
          mb_type: data.value.mb_type,
          picture: data.value.picture,
          id_retail: data.retail_id,
        }))
        console.log('id retail ' + JSON.stringify(state.id_retail));
        console.log('CEK MB_NAME ' + JSON.stringify(state.mb_name));
  
      }).catch(err => {
        console.log('err', err)
      })
  
      AsyncStorage.getItem('uid').then(uids => {
        let ids = uids;
        setState(state => ({
          ...state,
          mb_id: ids
        }))
      }).catch(err => {
        console.log('err', err)
      })

      getJasa()
    
    }, [])

    const getJasa = () => {
      // setState(state => ({...state, loading: true }))
      axios.get(svr.url+'ship-retail/retail/'+state.retail+'/'+svr.api)
      // axios.get('https://market.pondok-huda.com/dev/react/ship-retail/retail/' + state.retail)
          .then(result => {
              // console.log('jasa kirim  ' + JSON.stringify(result));
              setState(state => ({ ...state, datas: result.data.data }))

          }).catch(err => {
              //console.log(err)
              alert('Gagal menerima data dari server!' + err)
              setState(state => ({ ...state, loading: false }))
          })
  }


     return (
      <View style={styles.container}>
         <Back
            title={'Sukses Order'}
            onPress={() => props.navigation.goBack()}
         /> 

        <View style={styles.content}>
            <Text style={styles.txtKonfirm}>Kamu berhasil membayar</Text>
            <Text style={styles.txtKet}>silahkan cek untuk mengetahui status pesananmu</Text>
                <View style={{flexDirection:'row'}}>
                    <Pressable style={styles.btnBeranda} onPress={()=> NavigatorService.navigate('Homepage', {content:'Home'})}>
                        <Text style={styles.txtBtn}>Beranda</Text>
                    </Pressable>
                    <Pressable style={styles.btnBeranda} onPress={()=> NavigatorService.navigate('Orderpage', {content:'Belum Dibayar', mb_id: state.mb_id})}>
                        <Text style={styles.txtBtn}>Pesanan Saya</Text>
                    </Pressable>
                </View>
        </View>    
     </View>
    );
  
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%'
  },
  content: {
      backgroundColor:'#F9F8F8',
      width:toDp(335),
      height:toDp(139),
      borderRadius:toDp(10),
      marginTop:toDp(10),
      justifyContent:'center',
      alignItems:'center',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,

      elevation: 4,
  },
  txtKonfirm: {
      bottom:toDp(10),
      fontSize:toDp(14)
  },
  txtKet: {
      fontSize:toDp(12)
  },
  btnBeranda: {
      backgroundColor:'#2A334B',
      marginHorizontal:toDp(20),
      top:toDp(20),
      width:toDp(126),
      height:toDp(40),
      borderRadius:toDp(10),
      justifyContent:'center'
  },
  txtBtn: {
      textAlign:'center',
      color:'white'
  }
});

export default Successorder;