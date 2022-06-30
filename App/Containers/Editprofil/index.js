import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Alert,
  Pressable,
  AsyncStorage,
  Modal
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import Header from '@Header'
import NavigatorService from '@NavigatorService'
import { Card } from "react-native-paper";
import ImagePicker from 'react-native-image-crop-picker'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Linking } from "react-native";
// import Modal from "react-native-modal";
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
    options: {
      width: 750,
      height: 750,
      cropping: true,
    }
  })

  const [modalVisible, setModalVisible] = useState(false);



  useEffect(() => {
    // get data pengguna
    AsyncStorage.getItem('member').then(response => {
      //console.log('Editprofil ------->' + JSON.stringify(response));

      let data = JSON.parse(response);
      //const val = JSON.stringify(data);

      console.log('Editprofil ====>', response);

      setState(state => ({
        ...state,
        mb_id: data.value.mb_id,
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
      setState(state => ({
        ...state,
        mb_id: ids,
      }))
      // console.log(ids)
    }).catch(err => {
      console.log('err', err)
    })

  }, [])

  const tipeUsers = ["client", "seller"]

  const update = () => {
    let body = {
      mb_name: state.mb_name,
      mb_email: state.mb_email,
      mb_phone: state.mb_phone,
      mb_username: state.mb_username,
      mb_type: state.mb_type,
      // picture: ''
    }
    axios.post('https://market.pondok-huda.com/dev/react/registrasi-member/' + state.mb_id + '/', body)
      .then(result => {
        if (result.data.status == 200) {
          console.log('result update'+ JSON.stringify (result));
          alert('Berhasil mengubah profil');
          refresh()
        } else if (result.data.status == 500) {
          console.log('gagal update', result)
        }
      }).catch(error => {
        console.log('error update:', error)
      })
  }

  const refresh = async () => {
    setState(state => ({ ...state, loading: true }))
    axios.get('https://market.pondok-huda.com/dev/react/registrasi-member/' + state.mb_id + '/')
      .then(result => {
        console.log('mb_id refresh'+ state.mb_id)
          if (result.data.status == 200) {
            console.log('result refresh =>', result.data)
              const datas = {
                id: result.data.data[0].mb_id,
                value: result.data.data[0],
                type: result.data.data[0].mb_type
              }
         if(datas.value.length === 0) {
           alert('not found users')
         } else {
            //save Async Storage
          try {
            AsyncStorage.setItem('member', JSON.stringify(datas))
          } catch (e) {
            alert('Error ' + e)
          }
          getData()
          console.log('===>> ', (datas));
          setState(state => ({ ...state, loading: false }))
         }
          
        } else if (result.data.status == 404) {
          alert('Data tidak ditemukan!')
          setState(state => ({ ...state, loading: false }))
        } else if (result.data.status == 500) {
          alert('terjadi kesalahan');
        }
      }).catch(error => {
        console.log('error refresh =>', error)
      })

      .catch(err => {
        console.log(err)
        alert('Gagal menerima data dari server!')
        setState(state => ({ ...state, loading: false }))
      })
  }

  const getData = () => {
    try {
      AsyncStorage.getItem('member').then(response => {
        console.log('response getData', response);
        let data = JSON.parse(response);
        // const datas = JSON.stringify(data);
        // let member   = JSON.parse(datas)
        console.log('Editprofil ====>', response);

        setState(state => ({
          ...state,
          mb_id: data.value.mb_id,
          mb_name: data.value.mb_name,
          mb_username: data.value.mb_username,
          mb_email: data.value.mb_email,
          mb_phone: data.value.mb_phone,
          mb_type: data.value.mb_type,
          picture: data.value.picture
        }))
      }).catch(error => {
        console.log('error getData1', error)
      })
    } catch (error) {
      console.log('error getData2', error)
    }
  }

  const upImageToServer = (imagePath) => {
    const imageDta = new FormData();
    imageDta.append("picture", {
      uri: imagePath.path,
      name: 'image.jpg',
      type: 'image/jpg'
    })
    console.log('THIS => ', imageDta);
    fetch('https://market.pondok-huda.com/dev/react/registrasi-member/foto/' + state.mb_id + '/',
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data'
        },
        method: 'POST',
        body: imageDta
      }
    ).then(response => response.json())
      .then(response => {
        console.log(response)
        if (response.status == 200) {
          refresh()
        }
      }).catch(err => {
        // console.log(response)
        console.log(err)
        alert('Gagal menerima data dari server!')
        setState(state => ({ ...state, loading: false }))
      })
  }


  const toggleModal = () => {
    setModalVisible(!modalVisible);
}

const camera = () => {
  ImagePicker.openCamera(state.options).then(response => {
    upImageToServer(response)
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

const gallery = () => {
  ImagePicker.openPicker(state.options).then(response => {
    //  processUpload(response)
    upImageToServer(response)
  }).catch(err => {
    console.log(err)
    if (err == 'Error: Required permission missing' || err == 'Error: Cannot access images. Please allow access if you want to be able to select images.') {
      Alert.alert(
        'Pengaturan',
        'Akses pilih foto belum diaktifkan.\nBerikan akses untuk memulai mengambil gambar. Aktifkan akses pilih foto dari Pengaturan.',
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
            <Pressable onPress={()=> setModalVisible(true)}>
              <Image style={styles.icEdit} source={allLogo.icedit}/>
                <Image style={styles.imgProfil} source={state.picture ? { uri: state.picture } :
                  require('../../Assets/img/profile.png')} />
                  {/* <Text style={styles.nama}>{state.mb_name}</Text> */}
            </Pressable>
            {/* Modal */}
            <Modal style={styles.modal} visible={modalVisible} transparent={true} animationType="fade">
                 <View style={styles.viewModal}>
                     <Pressable style={styles.modalClose} onPress={()=> setModalVisible(!modalVisible)}>
                            <Image source={allLogo.icSilang} style={{height: toDp(20), width: toDp(20)}}/>
                        </Pressable>
                    <View style={styles.viewJudul}>
                        <Text style={styles.txtJudul}>Ubah Poto Profil</Text>
                    </View> 
                    {/* <View style={{height: 1, width: '100%', backgroundColor: 'green', marginTop: 10}}/>    */}
                        <View style={styles.viewBtn}>
                            <Pressable style={[styles.btnImage, {backgroundColor: '#2A334B'}]} onPress={() => camera()}>
                                <Text style={styles.txtButon}>Kamera</Text>
                            </Pressable>
                            <Pressable style={[styles.btnImage, {backgroundColor: '#2A334B'}]} onPress={() => gallery()}>
                                <Text style={styles.txtButon}>Galeri</Text>
                            </Pressable>
                        </View>
                    </View>                   
                </Modal>
            {/* end modal */}
          </View>
      </View>
      <View style={styles.formInput}>
        {/* <Pressable onPress={() => update()} style={{width: 60, height: 60, justifyContent: 'center', alignItems: 'center'}}>
          <Text>
          Save
            </Text>
            </Pressable> */}
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
        {/* <View style={styles.card}>
          <TextInput autoCapitalize={'none'}
            style={styles.textInput}
            placeholder={'Tipe User'}
            placeholderTextColor={'grey'}
            value={state.mb_type}
            onChangeText={(text) => setState(state => ({ ...state, mb_type: text }))}
          />
        </View> */}
        <SelectDropdown
          buttonStyle={styles.textInput1}
          buttonTextStyle={{fontSize:toDp(12), color:'grey'}}
          rowTextStyle={{fontSize:toDp(12)}}
          dropdownStyle={{borderRadius:toDp(10)}}
          rowStyle={{height:toDp(50),padding:toDp(5)}}
          defaultButtonText={'Pilih Tipe User'}
          defaultValue={state.mb_type}
          data={tipeUsers}
          // onChangeText={(text) => setState(state => ({ ...state, mb_type: text }))}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
            setState(state => ({...state, mb_type: selectedItem }))
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
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
        />
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

      <View style={{ position: 'absolute', bottom: 0, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <View style={styles.buttonSave}>
          <Pressable onPress={() => update()}>
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
    height: toDp(80),
    width: toDp(80),
    left: toDp(135),
    bottom: toDp(10),
    borderRadius: toDp(40)
  },
  nama: {
    color: 'white',
    bottom: toDp(10),
    textAlign: 'center',
    right: toDp(10)
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
    height: toDp(50),
    borderRadius: toDp(20),
    bottom: toDp(5),
    justifyContent: 'center'
  },
  save: {
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center',
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
    padding: toDp(10)
  },
  textInput1: {
    backgroundColor: 'white',
    width: toDp(335),
    height: toDp(40),
    borderRadius: toDp(20),
    bottom: toDp(15),
    marginBottom: toDp(-8),
    right: toDp(8),
    borderWidth: toDp(0.5),
    marginBottom: 4,
    marginTop: 10
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
  icEdit: {
    width: toDp(30),
    height: toDp(30),
    position: 'absolute',
    zIndex: 5,
    left: '55%',
    top: '55%'
  },
  modal: {
    marginVertical: '50%',
    maxHeight: toDp(200),
  },
  viewModal: {
    marginTop: '50%',
    marginLeft: toDp(17),
    width: '90%',
    backgroundColor: '#fff',
    height: toDp(200),
    borderRadius: toDp(20),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalClose: {
    height: toDp(20),
    width: toDp(20),
    position: 'absolute',
    right: toDp(10), marginTop: toDp(10),
    zIndex: 2,
  },
  viewJudul: {
      marginTop: toDp(10),
      justifyContent: 'center',
      alignItems: 'center'
  },
  txtJudul: {
      fontSize: toDp(20),
      fontWeight: 'bold'
  },
  viewBtn: {
      justifyContent: 'space-around',
      flexDirection: 'row',
      marginTop: toDp(60),
  },
  btnImage: {
      justifyContent: 'center',
      alignItems: 'center',
      height: toDp(48),
      width: toDp(80),
      borderRadius: toDp(20)
  },
  txtButon: {
      fontSize: toDp(14),
      fontWeight: 'bold',
      color: 'white'
  }

});

export default Editprofil;