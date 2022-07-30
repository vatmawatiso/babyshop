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
  AsynStorage,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import NavigatorService from '@NavigatorService'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Loader from '@Loader';
import axios from 'axios';
import CheckBox from '@react-native-community/checkbox';
import { ScrollView } from 'react-native-gesture-handler';
import { sha1 } from 'react-native-sha1';
import { svr } from '../../Configs/apikey';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager
} from 'react-native-fbsdk';

const Register = (props) => {

  const tipeUser = ["Client", "Seller"]

  const [state, setState] = useState({
    loading: false,
    secureTextEntry: true,
    mb_name: '',
    mb_email: '',
    mb_phone: '',
    mb_username: '',
    mb_password: '',
    mb_type: 'client',
    valName: false,
    valMail: false,
    valPass: false,
    GUser: []
  })
  const [isSelected, setSelection] = useState(false)
  const [isDisable, setDisable] = useState(true)

  useEffect(() => {
    AsyncStorage.setItem('login', '')
    GoogleSignin.configure({
      // offlineAccess: true,
      webClientId: '1074872779717-2qkssa1l8pbq24ki9jikge5869o6tamh.apps.googleusercontent.com',
      // androidClientId: '1074872779717-t4sfanhv7h7uqb0mirs960oa5dqjotkv.apps.googleusercontent.com',
    });
  }, [])

  const RegisterMember = async (value) => {
    const body = {
      mb_name: state.mb_name,
      mb_email: state.mb_email,
      mb_phone: state.mb_phone,
      mb_username: state.mb_username,
      mb_password: state.mb_password,
      mb_type: state.mb_type
    }

    setState(state => ({ ...state, loading: true }))
    axios.post(svr.url + 'registrasi-member/' + svr.api, body)
      // axios.post('https://market.pondok-huda.com/dev/react/registrasi-member', body)
      .then(result => {
        //console.log('hasil --------------> : '+ JSON.stringify(result.data))
        if (result.data.status == 201) {
          console.log('hasil : ' + JSON.stringify(result.data))
          setState(state => ({ ...state, loading: false }))
          NavigatorService.reset('Login');
        } else {
          alert('Registrasi Gagal, Nama Pengguna / Email telah digunakan!')
          setState(state => ({ ...state, loading: false }))
        }
      }).catch(err => {
        alert('Registrasi Gagal, coba lagi nanti')
        setState(state => ({ ...state, loading: false }))
      })
  }

  const passlength = (pass) => {
    const psw = pass;

    if (psw.length >= 6) {
      setState(state => ({ ...state, valPass: false }));
      Shaone(pass);

    } else {
      setState(state => ({ ...state, valPass: true }))

    }
  }

  const validateMail = (text) => {

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      setState(state => ({ ...state, valMail: true }))
      setState(state => ({ ...state, email: text }))

      return false;
    }
    else {
      setState(state => ({ ...state, email: text }))
      setState(state => ({ ...state, valMail: false }))

    }
  }

  const Shaone = (pass) => {
    sha1(pass).then(hash => {
      setState(state => ({ ...state, mb_password: hash }));
      console.log(hash);
    })
  }

  const toggleAgree = (val) => {
    setSelection(val)
    if (isSelected == true) {
      setDisable(true)
    } else {
      setDisable(false)
    }
  }

  const validateInput = () => {
    if (state.mb_name.trim() == '') {
      alert('Nama tidak boleh kosong!')
      return;
    }
    if (state.mb_email.trim() == '') {
      alert('Email tidak boleh kosong!')
      return;
    }
    if (state.mb_phone.trim() == '') {
      alert('Nomor Hp tidak boleh kosong!')
      return;
    }
    if (state.mb_type.trim() == '') {
      alert('Tipe pengguna tidak boleh kosong!')
      return;
    }
    if (state.mb_username.trim() == '') {
      alert('Username tidak boleh kosong!')
      return;
    }
    if (state.mb_password.trim() == '') {
      alert('Password tidak boleh kosong!')
      return;
    }

    RegisterMember()
  }

  // google sign up 
  const googleSignup = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('User Infor =>', userInfo)
      // setUser(userInfo)
      const ugDatas = JSON.stringify(userInfo);
      const newData = JSON.parse(ugDatas);
      state.GUser.push({ userInfo });
      //NavigatorService.navigate('Homepage')

      let body = {
        mb_name: newData.user.name,
        mb_email: newData.user.email,
        mb_phone: '',
        mb_type: 'client',
        mb_password: '',
        mb_username: newData.user.email,
        picture: newData.user.photo
      }

      let datas = [];
      datas.push({
        id: newData.user.id,
        value: {
          mb_name: newData.user.name,
          mb_phone: '',
          mb_type: '',
          password: '',
          mb_username: newData.user.email,
          mb_picture: newData.user.photo,
          mb_email: newData.user.email
        }
      })

      console.log('user log =>', ugDatas);
      //console.log('user body =>', body);

      if (state.GUser.length > 0) {
        // cek login ada ngga
        cekGLogin(newData.user.email, body, datas, newData.user.id, 'google')
      }
    } catch (error) {
      console.log('errorssss =>', error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled login');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign In Proccess');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play service not available');
      } else {
        console.log('Erorr ' + error.code)
      }
    }
  };

  // cek Glogin
  const cekGLogin = (email, body, dataus, id, login) => {
    const data = {
      mb_email: email
    }
    setState(state => ({ ...state, loading: true }))
    axios.post('https://market.pondok-huda.com/dev/react/login-member/sosmed', data)
      .then(response => {
        console.log('response cek login =>', response)
        if (response.data.status == 200) {
          const datas = {
            id: response.data.data[0].mb_id,
            value: response.data.data[0]
          }
          if (datas.value.length === 0) {
            registrasiUser(body, id, dataus, login);
          } else {
            console.log('data regerted =>', datas);
            AsyncStorage.setItem('member', JSON.stringify(datas))
            AsyncStorage.setItem('uid', datas.id);
            if (login == 'google') {
              AsyncStorage.setItem('login', 'google')
              setTimeout(function () {
                NavigatorService.reset('Homepage', { login: 'google' });
              }, 1000);
            } else {
              AsyncStorage.setItem('login', 'facebook')
              setTimeout(function () {
                NavigatorService.reset('Homepage', { login: 'facebook' });
              }, 1000);
            }
          }
          setState(state => ({ ...state, loading: false }))
        } else if (response.data.status == 404) {
          setState(state => ({ ...state, loading: false }))
          registrasiUser(body, id, dataus, login)
        } else if (response.data.status == 500) {
          alert('error server')
          console.log('error server', response)
          setState(state => ({ ...state, loading: false }))
        }
      }).catch(error => {
        console.log('error =>', error)
        setState(state => ({ ...state, loading: false }))
      })
  }

  // kalo data dari g login dan fb login ga ada maka dimasukin ke registrasiUser
  const registrasiUser = (body, id, datas, login) => {
    setState(state => ({ ...state, loading: true }))
    // console.log('body'+ JSON.stringify(body))
    axios.post('https://market.pondok-huda.com/dev/react/registrasi-member/', body)
      .then(response => {
        console.log('response =>', id)
        // console.log('response resgiter =>', datas);
        if (response.data.status == 201) {
          console.log('register =>', response.data)
          AsyncStorage.setItem('member', JSON.stringify(response.data))
          AsyncStorage.setItem('uid', JSON.stringify(response.data.id))
          // AsyncStorage.setItem('member', JSON.stringify(response.value))
          // AsyncStorage.setItem('uid', JSON.stringify(response.value.mb_id))
          if (login == 'google') {
            AsyncStorage.setItem('login', 'google')
            NavigatorService.reset('Homepage', { login: 'google' });
          } else if (login === 'facebook') {
            AsyncStorage.setItem('login', 'facebook')
            NavigatorService.reset('Homepage', { login: 'facebook' });
          }
          setState(state => ({ ...state, loading: false }))
        } else {
          alert('Registrasi Gagal, Nama Pengguna atau Email Telah Digunakan')
          setState(state => ({ ...state, loading: false }))
        }
      }).catch(error => {
        alert('Gagal Coba Lagi Nanti')
        console.log('error register =>', error)
        setState(state => ({ ...state, loading: false }))
      })
  }

  // facebook login
  const fbLogin = (resCallback) => {
    return LoginManager.logInWithPermissions(['email', 'public_profile'])
      .then(
        response => {
          if (response.declinedPermissions && response.declinedPermissions.includes("email")) {
            resCallback({ message: "email is required" })
          }

          if (response.isCancelled) {
            console.log('Cancelled')
          } else {
            const infoRequest = new GraphRequest(
              '/me?fields=email,name,picture',
              null,
              resCallback
            );
            new GraphRequestManager().addRequest(infoRequest).start()
          }
        },
        function (error) {
          console.log('error =>', error)
        }
      )
  }

  // login facebook
  const onFbLogin = async () => {
    setState(state => ({ ...state, linkLogin: '' }))
    try {
      setState(state => ({ ...state, linkLogin: 'facebook' }))
      await fbLogin(_responseInfoCallBack)
    } catch (error) {
      console.log('error onfbLogin =>', error)
    }
  }

  // response info callback dari fb login
  const _responseInfoCallBack = async (error, response) => {
    if (error) {
      console.log('error response =>', error)
      return;
    } else {
      const userData = response
      console.log('response userData =>', userData)

      state.GUser.push({ userData });
      let datas = [];
      datas.push({
        mb_id: response.id,
        value: [{
          mb_name: response.name,
          mb_phone: '',
          picture: response.picture.data.url,
          mb_email: response.email
        }]
      })
      let body = {
        mb_name: response.name,
        mb_email: response.email,
        mb_phone: '',
        mb_username: response.email,
        picture: response.picture.data.url
      }
      if (state.GUser.length > 0) {
        setState(state => ({ ...state, linkLogin: 'facebook' }))
        console.log('guser length: ', state.GUser.length)
        console.log('data fb login', datas)

        cekGLogin(response.email, body, datas, response.id, 'facebook')
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
          throw ('Something wrong obtaining access token')
        }
      }
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView vertical={true} contentContainerStyle={styles.contentContainer}>
        <StatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'} />
        <Text style={styles.title}>Buat Akun</Text>

        <View style={{ marginTop: toDp(-18), marginLeft: toDp(10) }}>
          <Text style={styles.textName}>Nama</Text>
          <TextInput autoCapitalize={'none'}
            style={styles.textInput}
            placeholder={'Name'}
            placeholderTextColor={'#4E5A64'}
            value={state.nama}
            onChangeText={(text) => setState(state => ({ ...state, mb_name: text }))}
          />
          <Text style={[styles.textName, { bottom: toDp(5) }]}>Alamat Email</Text>
          <TextInput autoCapitalize={'none'}
            style={[styles.textInput, { bottom: toDp(15) }]}
            placeholder={'Email'}
            placeholderTextColor={'#4E5A64'}
            value={state.email}
            onChangeText={(text) => setState(state => ({ ...state, mb_email: text }))}
          />
          <Text style={[styles.textName, { bottom: toDp(8) }]}>Nomer Telepon</Text>
          <TextInput autoCapitalize={'none'}
            style={[styles.textInput, { bottom: toDp(18) }]}
            placeholder={'Phone'}
            placeholderTextColor={'#4E5A64'}
            value={state.hp}
            onChangeText={(text) => setState(state => ({ ...state, mb_phone: text }))}
          />
          <Text style={[styles.textName, { bottom: toDp(13) }]}>Jenis User</Text>
          <TextInput autoCapitalize={'none'}
            style={[styles.textInput, { bottom: toDp(25) }]}
            placeholder={'Phone'}
            placeholderTextColor={'#4E5A64'}
            value={state.mb_type}
            onChangeText={(text) => setState(state => ({ ...state, mb_type: text }))}
          />
          {/* <SelectDropdown
            buttonStyle={styles.dropdown}
            buttonTextStyle={{ fontSize: toDp(12), color: '#4E5A64' }}
            rowTextStyle={{ fontSize: toDp(12) }}
            dropdownStyle={{ borderRadius: toDp(7) }}
            rowStyle={{ height: toDp(35), padding: toDp(5) }}
            defaultButtonText={'Type User'}
            data={tipeUser}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index)
              setState(state => ({ ...state, mb_type: selectedItem }))
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem
            }}
            rowTextForSelection={(item, index) => {
              return item
            }}
            renderDropdownIcon={(isOpened) => {
              return (
                <FontAwesome
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  color={"#444"}
                  size={toDp(12)}
                />
              );
            }}
          /> */}
          <Text style={[styles.textName, { bottom: toDp(22) }]}>Nama Pengguna</Text>
          <TextInput autoCapitalize={'none'}
            style={[styles.textInput, { bottom: toDp(35) }]}
            placeholder={'Username'}
            placeholderTextColor={'grey'}
            value={state.username}
            onChangeText={(text) => setState(state => ({ ...state, mb_username: text }))}
          />

          <View style={{ marginTop: toDp(-4) }}>
            <Text style={[styles.textName, { bottom: toDp(28) }]}>Kata Sandi</Text>
            <TextInput autoCapitalize={'none'}
              style={[styles.textInput, { bottom: toDp(40) }]}
              placeholder={'Password'}
              placeholderTextColor={'grey'}
              secureTextEntry={state.secureTextEntry}
              value={state.password}
              onChangeText={(password) => passlength(password)}
            />
            <Pressable style={styles.presableShow} onPress={() => setState(state => ({ ...state, secureTextEntry: !state.secureTextEntry }))}>
              <Image source={state.secureTextEntry ? allLogo.icVisibilityOff : allLogo.icVisibilityOn} style={styles.icVisibility} />
            </Pressable>
            {state.valPass === true ? (
              <Text>
                * Katasandi harus lebih dari 6 karakter
              </Text>
            ) : null
            }
          </View>
        </View>


        {/* <Pressable style={{ left: toDp(260), bottom: toDp(20) }} onPress={() => NavigatorService.navigate('Lupapassword')}>
          <Text style={styles.textForgot}>Lupa Kata Sandi</Text>
        </Pressable> */}

        <View style={styles.viewRow}>
          <Pressable
            onPress={() => NavigatorService.navigate('Login')}
            style={styles.pressableLogin}>
            <Text style={styles.textLogin}>Masuk</Text>
          </Pressable>
          <TouchableOpacity disabled={isDisable} style={[styles.pressableSignup, { backgroundColor: isDisable == true ? '#4E5A64' : '#A7661B' }]}
            onPress={() => validateInput()}>
            <Text style={styles.textLogin}>Daftar</Text>
          </TouchableOpacity>
        </View>


        <Text style={styles.textDont}>Atau Masuk Dengan</Text>
        <View style={styles.rowFooter}>
          <Pressable onPress={() => isDisable==true? alert('Silahkan Setujui S&K') : googleSignup()} style={[styles.pressableClick, { padding: toDp(2), backgroundColor: 'white', width: toDp(180), height: toDp(48), borderRadius: toDp(10), marginBottom: toDp(5) }]}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={allLogo.icGoogle} style={styles.icon} />
              <Text style={{ fontSize: toDp(12.5), top: toDp(10), fontWeight: 'bold' }}>Masuk Dengan Google</Text>
            </View>
          </Pressable>

          <Pressable onPress={()=> isDisable==true? alert('Silahkan Setujui S&K') : onFbLogin()} style={[styles.pressableClick, { padding: toDp(2), width: toDp(180), height: toDp(48), backgroundColor: '#3B5998', borderRadius: toDp(10) }]}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={allLogo.icFacebook} style={styles.icon} />
              <Text style={{ fontSize: toDp(12.5), top: toDp(10), fontWeight: 'bold', color: 'white' }}>Masuk Dengan Facebook</Text>
            </View>
          </Pressable>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
          <CheckBox
            value={isSelected}
            onValueChange={(val) => toggleAgree(val)}
            style={styles.checkbox}
          />
          <Pressable style={{ padding: 5, marginLeft: toDp(-10), height: toDp(48), justifyContent: 'center' }} onPress={() => NavigatorService.navigate('Terms')}>
            <Text style={{ padding: 4, fontSize: 12, color: '#FFFFFF' }}>Saya setuju dengan Syarat & Ketentuan yang berlaku</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2A334B',
    paddingTop: toDp(32),
  },
  contentContainer: {
    paddingVertical: toDp(50),
  },
  errorMessage: {
    // marginTop:toDp(3),
    marginBottom: toDp(15),
    color: '#780000',
    fontSize: toDp(15),
    left: 0,
    position: 'relative',
  },
  logo: {
    width: toDp(200),
    height: toDp(148),
    position: 'absolute',
    margin: toDp(80), //X
    padding: toDp(27) //Y
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    bottom: toDp(30),
    paddingBottom: toDp(13),
    fontSize: toDp(18),
    textAlign: 'center'
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
    width: toDp(335),
    height: toDp(48),
    backgroundColor: '#FFFFFF',
    paddingHorizontal: toDp(8),
    borderRadius: toDp(10),
    marginBottom: toDp(-20),
    bottom: toDp(10)
  },
  positionRight: {
    width: '100%',
    alignItems: 'flex-end',
    marginTop: toDp(8)
  },
  textDont: {
    fontSize: toDp(13),
    color: 'white',
    textAlign: 'center',
    top: toDp(20)
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
    top: Platform.OS === 'ios' ? toDp(19) : toDp(23)
  },
  viewRow: {
    paddingLeft: toDp(168),
    flexDirection: 'row',
    marginLeft: toDp(10)
  },
  textForgot: {
    color: 'white',
    fontSize: toDp(12),
    paddingTop: toDp(5),
    right: toDp(12)
  },
  pressableSignup: {
    borderRadius: toDp(10),
    width: toDp(80),
    height: toDp(48),
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft:toDp(5)
  },
  pressableLogin: {
    borderRadius: toDp(10),
    width: toDp(80),
    height: toDp(48),
    backgroundColor: '#516675',
    right: toDp(167),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSignup: {
    color: 'white',
    fontSize: toDp(14),
    textAlignVertical: 'center',
    width: toDp(80),
    height: toDp(40),
    paddingLeft: toDp(20),
  },
  textLogin: {
    color: 'white',
    fontSize: toDp(14),
    textAlignVertical: 'center',
  },
  icVisibility: {
    width: toDp(24),
    height: toDp(24),
    tintColor: '#4E5A64'
  },
  rowFooter: {
    flexDirection: 'column',
    top: toDp(30),
    alignItems: 'center'
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
  },
  dropdown: {
    // height:toDp(38),
    // borderRadius:toDp(13),
    // width:toDp(310),
    // top:toDp(4),
    // left:toDp(3),
    // backgroundColor:'white'
    width: toDp(335),
    height: toDp(39),
    backgroundColor: '#F2F3F3',
    paddingHorizontal: toDp(8),
    borderRadius: toDp(10),
    bottom: toDp(23)
  },
});

export default Register;