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
  AsyncStorage
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import  Back  from '@Back'
import NavigatorService from '@NavigatorService'
import ImagePicker from 'react-native-image-crop-picker'

const { width, height } = Dimensions.get('window')

const Successorder = (props) => {

    
    const Pembayaran = [
        {
          id: '1',
          Konfirmasibayar: 'Rp 800.000'
        },
      ]
    
      const [state, setState] = useState({
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
        console.log('MB ID ' + JSON.stringify(state.mb_id));
        // console.log('CEK MB_NAME ' + JSON.stringify(state.mb_name));
  
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

    
    }, [])

    const camera = () => {
        ImagePicker.openCamera(state.options).then(response => {
        //   upImageToServer(response)
        console.log(response)
        }).catch(err => {
          console.log(err)
          if(err == 'Error: Required permission missing' || err == 'User did not grant camera permission.') {
            Alert.alert(
              'Pengaturan',
              'Akses ambil foto belum diaktifkan.\nBerikan akses untuk memulai mengambil gambar. Aktifkan akses ambil foto dari Pengaturan.',
              [
                {text: 'Nanti Saja', onPress: () => console.log('Cancel')},
                {text: 'Aktifkan', onPress: () => {
                  Linking.openSettings();
                }},
              ],
              {cancelable: false},
            );
          }
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