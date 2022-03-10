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

const Buatpassword = (props) => {

    const [state, setState] = useState({
        loading: false,
        secureTextEntry: true,
        password: '',
        password1: ''
    })

     return (
      <View style={styles.container}>
         <Back
            title={'Kembali'}
            onPress={() => props.navigation.goBack()}
         />  

        <View style={{margin:toDp(10), left:toDp(7)}}>
            <Text style={styles.txtForget}>Buat Password Baru</Text>
            <Text style={styles.titleForget}>kata sandi baru anda harus berbeda dari kata sandi yang digunakan sebelumnya</Text>
        </View> 

        <View>
            <Text style={styles.txtPassword}>Masukkan Password</Text>
            <TextInput 
                     
                      top={4}
                      width={316}
                      height={40}
                      borderRadius={10}
                      backgroundColor={'white'}
                      autoCapitalize={'none'}
                      style={styles.textInput}
                      placeholder={'Password'}
                      placeholderTextColor={'grey'}
                      value={state.password}
                      onChangeText={(text) => setState(state => ({...state, password: text})) }
            />

            <Text style={styles.txtKonfirPass}>Konfirmasi Password</Text>
            <TextInput 
                     
                      top={4}
                      width={316}
                      height={40}
                      borderRadius={10}
                      backgroundColor={'white'}
                      autoCapitalize={'none'}
                      style={styles.textInput1}
                      secureTextEntry={state.secureTextEntry}
                      placeholder={'Konfirmasi Password'}
                      placeholderTextColor={'grey'}
                      value={state.password1}
                      onChangeText={(text) => setState(state => ({...state, password1: text})) }
            />
            <Pressable style={styles.presableShow} onPress={() => setState(state => ({...state, secureTextEntry: !state.secureTextEntry }))}>
                     <Image source={styles.secureTextEntry ? allLogo.icVisibilityOff : allLogo.icVisibilityOn} style={styles.icVisibility} />
                 </Pressable>
            <Pressable style={styles.btnKirim}>
                <Text style={styles.txtKirim}>Ubah Password</Text>
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
      top:toDp(40),
      width:toDp(316),
      height:toDp(40),
      borderRadius:toDp(10)
  },
  txtPassword: {
      bottom:toDp(5)
  },
  txtKonfirPass: {
      top:toDp(8)
  },
  textInput1: {
      top:toDp(15),
      borderWidth:0.5
  },
  presableShow: {
    padding: toDp(4),
    position: 'absolute',
    right: toDp(8),
    top: Platform.OS === 'ios' ? toDp(35) : toDp(98)
  },
  icVisibility: {
    width: toDp(24),
    height: toDp(24),
    tintColor: 'grey'
  },
  textInput: {
      borderWidth:toDp(0.5)
  }
});

export default Buatpassword;