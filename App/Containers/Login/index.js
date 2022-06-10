import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TextInput,
  Pressable,
  Platform,
  AsyncStorage
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import NavigatorService from '@NavigatorService'
import Loader from '@Loader'
import { sha1 } from 'react-native-sha1';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { svr } from '../../Configs/apikey';
import axios from 'axios';
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager
} from 'react-native-fbsdk';
 
const Login = (props) => {
 
  const [state, setState] = useState({
    loading: false,
    secureTextEntry: true,
    mb_username: '',
    mb_password: '',
    rtl_id:'',
    encpass: '',
    updatePass: false,
    linkLogin: ''
  })
 
  const [llogin, setLogin] = useState('');
 
  {/*Normal Login*/ }
  const getlogin = async () => {
    setState(state => ({ ...state, linkLogin: 'normal' }))
    const body = {
      mb_password: state.mb_password,
      mb_username: state.mb_username,
      rtl_id: state.rtl_id
    }
    console.log('BODY'+JSON.stringify(body));

    setState(state => ({ ...state, loading: true }))
    axios.post('https://market.pondok-huda.com/dev/react/login-member/', body)
      .then(result => {
        console.log('Cek Result----------->'+JSON.stringify(result));   //untuk cek ke json viewer 
        if (result.data.status == 200) {                      // untuk memfilter dan variable utamanya ada result, 
                                                              //didalam result itu ada nilai data dan didata ada status yang nilanya 200, jika status = 200 maka eksekusinya :
          const datas = {                                     // value akan dimasukkan ke dalam API datas
            id: result.data.data[0].mb_id,                    // untuk mengambil data id kita masuk ke result.data.data[0].mb_id
            value: result.data.data[0],
            tipe: result.data.data[0].mb_type,
            retail_id:result.data.rtl_id                        // untuk mengambil data value kita masuk ke result.data.data.[0]
            
          }
          console.log('DATAS'+JSON.stringify(datas));

          if (datas.value.length === 0) {
            alert('Nama Pengguna atau Kata Sandi Salah!')
          } else {
            //save Async Storage
            console.log(JSON.stringify(datas));

            AsyncStorage.setItem('member', JSON.stringify(datas)) // jika ingin masuk ke asyneStorage harus di stringify kemudian harus di parse
 
            AsyncStorage.setItem('uid', datas.id)
 
            // NavigatorService.reset('Homepage')
          
 
          } 
          // if (datas.tipe === 'seller') {
          //   NavigatorService.reset('Homeseller')
          // } else if (datas.tipe === 'client') {
          //   NavigatorService.reset('Homepage')
          // }

          NavigatorService.reset('Homepage')
          setState(state => ({ ...state, loading: false }))
          
        } else if (result.data.status == 404) {
          alert('Pengguna tidak ditemukan!')
          setState(state => ({ ...state, loading: false }))
        }
      })
 
      .catch(err => {
        console.log(err)
        alert('Gagal menerima data dari server!')
        setState(state => ({ ...state, loading: false }))
      })
  }
 
  const Shaone = (pass) => {
    sha1(pass).then(hash => {
      setState(state => ({ ...state, mb_password: hash }));
    })
  }

  const validateInput = () =>{
    if(state.mb_name.trim()==''){
      alert('Nama tidak boleh kosong!')
      return;
    }
    if(state.mb_email.trim()==''){
      alert('Email tidak boleh kosong!')
      return;
    }
    if(state.mb_phone.trim()==''){
      alert('Nomor Hp tidak boleh kosong!')
      return;
    }
    if(state.mb_type.trim()==''){
      alert('Tipe pengguna tidak boleh kosong!')
      return;
    }
    if(state.mb_username.trim()==''){
      alert('Username tidak boleh kosong!')
      return;
    }
    if(state.mb_password.trim()==''){
      alert('Password tidak boleh kosong!')
      return;
    }

    LoginMember()
}
 
 
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'} />
      <Image source={allLogo.icbina} style={styles.icbina} />
      <Text style={styles.title}>Masuk</Text>
      <Text style={styles.desc}>silahkan masuk untuk melanjutkan</Text>
      <Text style={[styles.textName, { right: toDp(33) }]}>Nama Pengguna</Text>
      <TextInput autoCapitalize={'none'}
        style={styles.textInput}
        placeholder={'Username or Email'}
        placeholderTextColor={'#6e736f'}
        value={state.mb_username}
        onChangeText={(text) => setState(state => ({ ...state, mb_username: text }))}
      />
      <View style={{ marginTop: toDp(-10) }}>
        <Text style={styles.textName}>Kata Sandi</Text>
        <TextInput autoCapitalize={'none'}
          style={[styles.textInput, { marginTop: toDp(-11) }]}
          placeholder={'Password'}
          placeholderTextColor={'#6e736f'}
          secureTextEntry={state.secureTextEntry}
          // value={state.mb_password}
          onChangeText={(text) => Shaone(text)}
        />
        <Pressable style={styles.presableShow} onPress={() => setState(state => ({ ...state, secureTextEntry: !state.secureTextEntry }))}>
          <Image source={state.secureTextEntry ? allLogo.icVisibilityOff : allLogo.icVisibilityOn} style={styles.icVisibility} />
        </Pressable>
      </View>
      <Pressable style={{ left: toDp(120) }} onPress={() => NavigatorService.navigate('Lupapassword')}>
        <Text style={styles.textForgot}>Lupa Kata Sandi ?</Text>
      </Pressable>
 
      <View style={styles.viewRow}>
        <Pressable
          style={styles.pressableLogin} onPress={() => getlogin()}>
          <Text style={styles.textLogin}>Masuk</Text>
        </Pressable>
        <Pressable
          onPress={() => NavigatorService.navigate('Register')}
          style={styles.pressableSignup}>
          <Text style={styles.textSignup}>Daftar</Text>
        </Pressable>

        <View style={[styles.rowFooter, {  position: 'absolute', width: '100%' }]}>
        <Text style={styles.textDont}>Atau Masuk Dengan</Text>
        <Pressable style={[styles.pressableClick, { padding: toDp(2), height: toDp(40), backgroundColor: 'white', width: toDp(180), borderRadius: toDp(10), marginBottom: toDp(5) }]}>
          <View style={{ flexDirection: 'row' }}>
            <Image source={allLogo.icGoogle} style={styles.icon} />
            <Text style={{ fontSize: toDp(12.5), top: toDp(10), fontWeight: 'bold' }}>Masuk Dengan Google</Text>
          </View>
        </Pressable>
 
        <Pressable style={[styles.pressableClick, { padding: toDp(2), width: toDp(180), height: toDp(40), backgroundColor: '#3B5998', borderRadius: toDp(10) }]}>
          <View style={{ flexDirection: 'row' }}>
            <Image source={allLogo.icFacebook} style={styles.icon} />
            <Text style={{ fontSize: toDp(12.5), top: toDp(10), fontWeight: 'bold', color: 'white' }}>Masuk Dengan Facebook</Text>
          </View>
        </Pressable>
      </View>
      </View>
 
    </View>
  )
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2A334B',
    // paddingTop: toDp(174),
  },
  icbina: {
    width: toDp(200),
    height: toDp(80),
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    paddingTop: toDp(15),
    paddingBottom: toDp(13),
    fontSize: toDp(18)
  },
  desc: {
    fontSize: toDp(13),
    color: 'white'
  },
  textName: {
    fontSize: toDp(12),
    color: 'white',
    width: toDp(155),
    height: toDp(55),
    marginRight: toDp(100),
    paddingTop: toDp(20)
  },
  viewContent: {
    zIndex: 2,
    width: '90%',
    height: 'auto',
    backgroundColor: '#52B788',
    borderRadius: toDp(24),
    marginTop: toDp(16),
    padding: toDp(16),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  textInput: {
    width: toDp(320),
    height: toDp(39),
    backgroundColor: '#F2F3F3',
    paddingHorizontal: toDp(8),
    borderRadius: toDp(10),
    marginTop: toDp(-10)
  },
  positionRight: {
    width: '100%',
    alignItems: 'flex-end',
    marginTop: toDp(8)
  },
  textDont: {
    fontSize: toDp(12),
    color: 'white',
    marginBottom: toDp(10)
  },
  textClick: {
    fontSize: toDp(14),
    fontWeight: 'bold',
    color: '#009EE2',
  },
  presableShow: {
    padding: toDp(4),
    position: 'absolute',
    right: toDp(8),
    top: Platform.OS === 'ios' ? toDp(30) : toDp(48)
  },
  viewRow: {
    paddingLeft: toDp(168),
    justifyContent: 'space-around'
  },
  textForgot: {
    color: 'white',
    fontSize: toDp(12),
    paddingTop: toDp(5),
    bottom: toDp(2)
  },
  pressableLogin: {
    width: toDp(75),
    height: toDp(70),
    paddingTop: toDp(20),
    left: toDp(30)
  },
  textLogin: {
    color: 'white',
    fontSize: toDp(14),
    textAlignVertical: 'center',
    width: toDp(80),
    height: toDp(35),
    paddingLeft: toDp(20),
    backgroundColor: '#698498',
    borderRadius: toDp(10)
  },
  pressableSignup: {
    right: toDp(200),
    bottom: toDp(50)
  },
  textSignup: {
    color: 'white',
    fontSize: toDp(14),
    backgroundColor: '#FBA23B',
    borderRadius: toDp(10),
    width: toDp(80),
    height: toDp(35),
    paddingLeft: toDp(20),
    textAlignVertical: 'center'
  },
  icVisibility: {
    width: toDp(24),
    height: toDp(24),
    tintColor: 'grey'
  },
  rowFooter: {
    marginBottom: toDp(10),
    justifyContent: 'center',
    alignItems: 'center',
    top: toDp(110),
    marginLeft:toDp(30)
  },
  icon: {
    width: toDp(25),
    height: toDp(25),
    marginHorizontal: toDp(5),
    top: toDp(7)
  },
  textCreate: {
    textAlign: 'right'
  },
  titleForm: {
    fontSize: toDp(20),
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: toDp(4)
  },
  descForm: {
    fontSize: toDp(12),
    color: '#000000',
    textAlign: 'center',
    marginTop: toDp(14)
  }
});
 
export default Login;