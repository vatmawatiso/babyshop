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
  ScrollView
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import  Back  from '@Back'
import NavigatorService from '@NavigatorService'

const Konfiremail = (props) => {

     return (
      <View style={styles.container}>
         <Back
            title={'Kembali'}
            onPress={() => props.navigation.goBack()}
         />  

        <View style={{margin:toDp(10), left:toDp(5)}}>
            <Image source={allLogo.icemail} style={styles.icemail} />
            <Text style={styles.txtForget}>Buka Email Anda</Text>
            <Text style={styles.titleForget}>Kami mengirimkan password baru ke email anda, silahkan ikuti instruksinya.</Text>
        </View> 

        <View>
            <Pressable style={styles.btnKirim}>
                <Text style={styles.txtKirim}>Buka Email</Text>
            </Pressable>
        </View>    

        <View style={{top:toDp(210)}}>
            <Text style={styles.txtHelp}>Tidak menerima email ? cek kembali pesan masuk pada email,</Text>
            <Pressable style={{top:toDp(50)}} onPress={()=> NavigatorService.navigate('Lupapassword')}>
                <Text style={[styles.txtHelp1, {color:'#0960A1', fontWeight:'bold'}] }>atau masukkan kembali email</Text>
            </Pressable>
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
  icemail: {
    left:toDp(125)
  },    
  txtForget: {
      fontWeight:'bold',
      fontSize:toDp(20),
      textAlign:'center',
      top:toDp(20)
  },
  titleForget: {
      fontSize:toDp(14),
      top:toDp(30),
      textAlign:'center'
  },
  txtKirim: {
      textAlign:'center',
      top:toDp(10),
      color:'white'
  },
  btnKirim: {
      backgroundColor:'#2A334B',
      top:toDp(50),
      width:toDp(250),
      height:toDp(40),
      borderRadius:toDp(15)
  },
  txtEmail: {
    top:toDp(20)
  },
  txtHelp: {
      top:toDp(50),
      fontSize:toDp(12),
      textAlign:'center'
  },
  txtHelp1: {
      fontSize:toDp(12),
      textAlign:'center'
  }
});

export default Konfiremail;