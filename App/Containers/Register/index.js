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
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import NavigatorService from '@NavigatorService'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Loader from '@Loader';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import { sha1 } from 'react-native-sha1';
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
  })

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
    axios.post('https://market.pondok-huda.com/dev/react/registrasi-member', body)
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

  const Shaone = (pass) => {
    sha1(pass).then(hash => {
      setState(state => ({ ...state, mb_password: hash }));
      console.log(hash);
    })
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



  return (
    <View style={styles.container}>
      <ScrollView vertical={true} contentContainerStyle={styles.contentContainer}>
        <StatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'} />
        <Text style={styles.title}>Buat Akun</Text>

        <View style={{ marginTop: toDp(-18) }}>
          <Text style={styles.textName}>Nama</Text>
          <TextInput autoCapitalize={'none'}
            style={styles.textInput}
            placeholder={'Name'}
            placeholderTextColor={'grey'}
            value={state.nama}
            onChangeText={(text) => setState(state => ({ ...state, mb_name: text }))}
          />
          <Text style={[styles.textName, { bottom: toDp(5) }]}>Alamat Email</Text>
          <TextInput autoCapitalize={'none'}
            style={[styles.textInput, { bottom: toDp(15) }]}
            placeholder={'Email'}
            placeholderTextColor={'grey'}
            value={state.email}
            onChangeText={(text) => setState(state => ({ ...state, mb_email: text }))}
          />
          <Text style={[styles.textName, { bottom: toDp(8) }]}>Nomer Telepon</Text>
          <TextInput autoCapitalize={'none'}
            style={[styles.textInput, { bottom: toDp(18) }]}
            placeholder={'Phone'}
            placeholderTextColor={'grey'}
            value={state.hp}
            onChangeText={(text) => setState(state => ({ ...state, mb_phone: text }))}
          />
          <Text style={[styles.textName, { bottom: toDp(13) }]}>Jenis User</Text>
          <TextInput autoCapitalize={'none'}
            style={[styles.textInput, { bottom: toDp(25) }]}
            placeholder={'Phone'}
            placeholderTextColor={'grey'}
            value={state.mb_type}
            onChangeText={(text) => setState(state => ({ ...state, mb_type: text }))}
          />
          {/* <SelectDropdown
            buttonStyle={styles.dropdown}
            buttonTextStyle={{ fontSize: toDp(12), color: 'grey' }}
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
              onChangeText={(text) => Shaone(text)}
            />
            <Pressable style={styles.presableShow} onPress={() => setState(state => ({ ...state, secureTextEntry: !state.secureTextEntry }))}>
              <Image source={styles.secureTextEntry ? allLogo.icVisibilityOff : allLogo.icVisibilityOn} style={styles.icVisibility} />
            </Pressable>
          </View>
        </View>


        <Pressable style={{ left: toDp(260), bottom: toDp(20) }} onPress={() => NavigatorService.navigate('Lupapassword')}>
          <Text style={styles.textForgot}>Lupa Kata Sandi</Text>
        </Pressable>

        <View style={styles.viewRow}>
          <Pressable
            onPress={() => NavigatorService.navigate('Login')}
            style={styles.pressableLogin}>
            <Text style={styles.textLogin}>Masuk</Text>
          </Pressable>
          <Pressable
            style={styles.pressableSignup} onPress={() => validateInput()}>
            <Text style={styles.textSignup}>Daftar</Text>
          </Pressable>
        </View>


        <Text style={styles.textDont}>Atau Masuk Dengan</Text>
        <View style={styles.rowFooter}>
          <Pressable style={[styles.pressableClick, { padding: toDp(2), backgroundColor: 'white', width: toDp(180), height: toDp(40), borderRadius: toDp(10), marginBottom: toDp(5) }]}>
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
    height: toDp(39),
    backgroundColor: '#F2F3F3',
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
    top: Platform.OS === 'ios' ? toDp(19) : toDp(19)
  },
  viewRow: {
    paddingLeft: toDp(168),
    flexDirection: 'row',
  },
  textForgot: {
    color: 'white',
    fontSize: toDp(12),
    paddingTop: toDp(5),
    right: toDp(12)
  },
  pressableSignup: {
    width: toDp(75),
    height: toDp(70),
  },
  pressableLogin: {
    right: toDp(167),
  },
  textSignup: {
    color: 'white',
    fontSize: toDp(14),
    textAlignVertical: 'center',
    width: toDp(80),
    height: toDp(40),
    paddingLeft: toDp(20),
    backgroundColor: '#698498',
    borderRadius: toDp(10)
  },
  textLogin: {
    color: 'white',
    fontSize: toDp(14),
    backgroundColor: '#698498',
    borderRadius: toDp(10),
    width: toDp(80),
    height: toDp(40),
    paddingLeft: toDp(19),
    textAlignVertical: 'center',
  },
  icVisibility: {
    width: toDp(24),
    height: toDp(24),
    tintColor: 'grey'
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