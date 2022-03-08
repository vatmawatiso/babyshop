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

const Lupapassword = (props) => {

     return (
      <View style={styles.container}>
         <Back
            title={'Kembali'}
            onPress={() => props.navigation.goBack()}
         />  

        <View style={{margin:toDp(10), left:toDp(5)}}>
            <Text style={styles.txtForget}>Lupa Password</Text>
            <Text style={styles.titleForget}>Silahkan masukkan email anda untuk memulihkan kata sandi</Text>
        </View> 

        <View>
            <Text style={styles.txtEmail}>Masukkan Email</Text>
            <TextInput 
                     
                      top={4}
                      width={316}
                      height={40}
                      borderRadius={15}
                      backgroundColor={'white'}
                      autoCapitalize={'none'}
                      style={styles.textInput}
                      placeholder={'Email'}
                      placeholderTextColor={'grey'}
                      // value={state.username}
                      // onChangeText={(text) => setState(state => ({...state, username: text })) }
            />
            <Pressable style={styles.btnKirim} onPress={()=> NavigatorService.navigate('Konfiremail')}>
                <Text style={styles.txtKirim}>Kirim</Text>
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
  txtForget: {
      fontWeight:'bold',
      fontSize:toDp(20),
      bottom:toDp(20),
  },
  titleForget: {
      fontSize:toDp(14),
      bottom:toDp(10)
  },
  txtKirim: {
      textAlign:'center',
      top:toDp(10),
      color:'white'
  },
  btnKirim: {
      backgroundColor:'#2A334B',
      top:toDp(20),
      width:toDp(316),
      height:toDp(40),
      borderRadius:toDp(15)
  },
  txtEmail: {
      bottom:toDp(8)
  },
  textInput: {
    borderWidth:0.5
  }
});

export default Lupapassword;