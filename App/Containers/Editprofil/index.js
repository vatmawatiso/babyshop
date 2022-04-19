import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Alert,
  Pressable,
  AsyncStorage
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import Header from '@Header'
import NavigatorService from '@NavigatorService'
import { Card } from "react-native-paper";
import ImagePicker from 'react-native-image-crop-picker'
import { Linking } from "react-native";
import axios from 'axios';

const Editprofil = (props) => {

  const [state, setState] = useState({
    mb_id: '',
    picture: '../../Assets/img/tzuyu.jpg',
    mb_name: '',
    mb_email: '',
    mb_phone: '',
    mb_type: '',
    mb_username: '',
    modalvisible: false,
    option: {
      width:750,
      height:750,
      cropping: true,
    }
  })

  

  useEffect(() => {
    // get data pengguna
    AsyncStorage.getItem('member').then(response => {
      //console.log('Editprofil ------->' + JSON.stringify(response));

      let data = JSON.parse(response);
      //const val = JSON.stringify(data);

      console.log('Editprofil ====>' + (response));

      setState(state => ({...state,
        id: data.value.mb_id,
        mb_name: data.value.mb_name,
        mb_username: data.value.mb_username,
        mb_email: data.value.mb_email,
        mb_phone: data.value.mb_phone,
        mb_type: data.value.mb_type,
        picture: data.value.picture
    }))


    }).catch(err => {
      console.log('err', err)
    })
    // get id pengguna
    AsyncStorage.getItem('uid').then(uids => {
      // console.log('ids', uids)
      let ids = uids;
      setState(state => ({...state, 
      mb_id: ids
      }))
    }).catch(err => {
      console.log('err', err)
    })

  }, [])

  const update = () => {
    let body = {
      mb_name: state.mb_name,
      mb_email: state.mb_email,
      mb_phone: state.mb_phone,
      mb_username: state.mb_username,
      mb_type: state.mb_type,
    }
    axios.post('https://market.pondok-huda.com/dev/react/registrasi-member/'+state.mb_id+'/', body)
    .then(result => {
      if(result.data.status == 200){
        console.log('result update', result);
      }else if(result.data.status == 500){
        console.log('gagal update', result)
      }
    }).catch(error => {
      console.log('error update:', error)
    })
  }

  // const refresh = () =>{
  //   setState(state => ({...state, loading: true }))
  //     axios.get('https://market.pondok-huda.com/dev/react/registrasi-member/'+state.mb_id)
  //     .then(result =>{
  //         if(result.data.status==200){
  //             const datas = {
  //               id: result.data.value[0].mb_id,
  //               value: result.data.data[0]
  //             }
  //             if(datas.value.length === 0) {
  //               alert('Tidak ada data!')
  //             } else {
  //             //save Async Storage
  //             try {
  //                AsyncStorage.setItem('member', JSON.stringify(datas))
  //             } catch (e) {
  //                alert('Error ' + e)
  //             }
  //             getData()
  //             console.log('===>> ' +JSON.stringify(datas.value));
  //           }
  //           setState(state => ({...state, loading: false }))
  //         }else if(result.data.status==404){
  //           alert('Data tidak ditemukan!')
  //           setState(state => ({...state, loading: false }))
  //         }
  //     })

  //     .catch(err =>{
  //       console.log(err)
  //       alert('Gagal menerima data dari server!')
  //       setState(state => ({...state, loading: false }))
  //     })
  // }


  const camera = () => {
    ImagePicker.openCamera(state.options).then(response => {
      //   upImageToServer(response)
      console.log(response)
    }).catch(err => {
      console.log(err)
      if (err == 'Error: Required permission missing' || err == 'User did not grant camera permission.') {
        Alert.alert(
          'Pengaturan',
          'Akses ambil foto belum diaktifkan.\nBerikan akses untuk memulai mengambil gambar. Aktifkan akses ambil foto dari Pengaturan.',
          [
            { text: 'Nanti Saja', onPress: () => console.log('Cancel') },
            {
              text: 'Aktifkan', onPress: () => {
                Linking.openSettings();
              }
            },
          ],
          { cancelable: false },
        );
      }
    })
  }
  

  // const RenderItem = (item, index) => {
  return (
    <View style={styles.container}>
      <Header
        title={'Edit Profil'}
        onPress={() => props.navigation.goBack()}
      />
      <View style={styles.content}>
        <View style={styles.profil}>
          <Pressable style={{ alignItems: 'flex-end', left: toDp(300), top: toDp(5), width: toDp(30) }} onPress={() => NavigatorService.navigate('Buatpassword')}>
            <Image source={allLogo.icpassword} style={{ width: toDp(30), height: toDp(30) }} />
          </Pressable>
          <Image style={styles.imgProfil} source={ state.picture ? {uri: state.picture} : 
                                                    require('../../Assets/img/tzuyu.jpg')} />
          <Text style={styles.nama}>{state.mb_name}</Text>
          <Pressable style={{ bottom: toDp(6) }} onPress={() => alert('Coba')}>
            <Text style={styles.edit}>Ubah Profil</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.formInput}>
        <View style={styles.card}>
          <TextInput autoCapitalize={'none'}
            style={styles.textInput}
            placeholder={'Nama'}
            placeholderTextColor={'grey'}
            value={state.mb_name}
            onChangeText={(text) => setState(state => ({ ...state, mb_name: text }))}
          />
        </View>
        <View style={styles.card}>
          <TextInput autoCapitalize={'none'}
            style={styles.textInput}
            placeholder={'Username'}
            placeholderTextColor={'grey'}
            value={state.mb_username}
            onChangeText={(text) => setState(state => ({ ...state, mb_username: text }))}
          />
        </View>
        <View style={styles.card}>
          <TextInput autoCapitalize={'none'}
            style={styles.textInput}
            placeholder={'Email'}
            placeholderTextColor={'grey'}
            value={state.mb_email}
            onChangeText={(text) => setState(state => ({ ...state, mb_email: text }))}
          />
        </View>
        <View style={styles.card}>
          <TextInput autoCapitalize={'none'}
            style={styles.textInput}
            placeholder={'Tipe User'}
            placeholderTextColor={'grey'}
            value={state.mb_type}
            onChangeText={(text) => setState(state => ({ ...state, mb_type: text }))}
          />
        </View>
        <View style={styles.card}>
          <TextInput autoCapitalize={'none'}
            style={styles.textInput}
            placeholder={'Nomer Telepon'}
            placeholderTextColor={'grey'}
            value={state.mb_phone}
            onChangeText={(text) => setState(state => ({ ...state, mb_phone: text }))}
          />
        </View>
        {/* <View style={styles.card}>
          <TextInput
            autoCapitalize={'none'}
            style={styles.textInput}
            placeholder={'Password'}
            placeholderTextColor={'grey'}
            secureTextEntry={state.secureTextEntry}
            onChangeText={(text) => setState(state => ({ ...state, password: text }))}
          />
          <Pressable style={styles.presableShow} onPress={() => setState(state => ({ ...state, secureTextEntry: !state.secureTextEntry }))}>
            <Image source={state.secureTextEntry ? allLogo.icVisibilityOff : allLogo.icVisibilityOn} style={styles.icVisibility} />
          </Pressable>
        </View> */}
      </View>

      <View style={{position:'absolute', bottom:0, alignItems:'center', justifyContent:'center', width:'100%'}}>
        <View style={styles.buttonSave}>
          <Pressable onPress={()=> update()}>
            <Text style={styles.save}>Simpan</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
};

// return (
//     <View style={styles.header}>
//       <Card>
//         {RenderItem(DATA,0)}
//       </Card>
//     </View>
//   )};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // top:toDp(50)
  },
  content: {
    backgroundColor: '#2A334B',
    width: toDp(335),
    height: toDp(116),
    borderRadius: toDp(20),
    left: toDp(12),
    top: toDp(10)
  },
  imgProfil: {
    height: toDp(50),
    width: toDp(50),
    left: toDp(135),
    bottom: toDp(15),
    borderRadius: toDp(20)
  },
  nama: {
    color: 'white',
    bottom: toDp(10),
    textAlign:'center',
    right:toDp(10)
  },
  edit: {
    color: 'white',
    fontSize: toDp(10),
    left: toDp(133),
  },
  textInput: {
    width: toDp(250),
    height: toDp(39),
    backgroundColor: '#F2F3F3',
    paddingHorizontal: toDp(8),
    borderRadius: toDp(20),
    marginTop: toDp(-10),
    borderWidth: toDp(0.5),
  },
  formInput: {
    top: toDp(25),
    left: toDp(18)
  },
  card: {
    margin: toDp(10),
    right: toDp(8)
  },
  buttonSave: {
    backgroundColor: '#2A334B',
    width: toDp(335),
    height: toDp(40),
    borderRadius: toDp(20),
    bottom:toDp(5),
    justifyContent:'center'
  },
  save: {
    color: 'white',
    textAlign:'center',
    justifyContent:'center',
    alignItems: 'center'
  },
  textInput: {
    backgroundColor: 'white',
    width: toDp(335),
    height: toDp(40),
    borderRadius: toDp(20),
    bottom: toDp(15),
    marginBottom: toDp(-8),
    right: toDp(8),
    borderWidth: toDp(0.5),
  },
  icVisibility: {
    width: toDp(24),
    height: toDp(24),
    tintColor: 'grey',
    bottom: toDp(-2),
    left: toDp(0)
  },
  presableShow: {
    padding: toDp(4),
    position: 'absolute',
    // backgroundColor:'cyan',
    left: toDp(275),
    top: Platform.OS === 'ios' ? toDp(-11) : toDp(-11)
  },

});

export default Editprofil;