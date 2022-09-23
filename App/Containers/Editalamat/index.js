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
  AsyncStorage,
  ToastAndroid
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import BackHeader from '@BackHeader'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MapView, { Marker } from 'react-native-maps';
import NavigatorService from '@NavigatorService'
import axios from 'axios';
import { svr } from "../../Configs/apikey";


const Editalamat = (props) => {

  const [state, setState] = useState({
    cityname: [],
    mb_id: '',
    mb_name: '',
    mb_phone: '',
    adr_id: '',
    cty_name: '',
    loading: false,
    adr_mb_id: '',
    adr_address: '',
    adr_cty_id: '',
    tmp_hp: '',
    tmp_address: '',
    tmp_cty_name: '',
    tmp_cty_id: '',
    tmp_name: ''
  })

  useEffect(() => {
    setState(state => ({
      ...state,
      tmp_hp: props.navigation.state.params.phone,
      tmp_address: props.navigation.state.params.adrress,
      tmp_cty_name: props.navigation.state.params.cty_name,
      tmp_cty_id: props.navigation.state.params.cty_id,
      tmp_name: props.navigation.state.params.adr_name,

    }))
    console.log("HP--->" + props.navigation.state.params.phone);
    console.log("NAMA--->" + props.navigation.state.params.adr_name);

    city()
  }, [])

  // const countries = ["Jakarta", "Cirebon", "Bandung", "Kuningan"]

  const city = () => {
    // setState(state => ({...state, loading: true }))
    axios.get(svr.url + 'city/' + svr.api)
      // axios.get('https://market.pondok-huda.com/dev/react/city/')
      .then(result => {
        // handle success
        //alert(JSON.stringify(result))
        let data = result.data.data.map(doc => {
          return {
            cty_id: doc.cty_id,
            cty_name: doc.cty_name
          }
        })

        //setState(state => ({ ...state, cityname: result.data.data }))
        setState(state => ({ ...state, cityname: data }))
        //console.log('-----kotaaa=====>'+ JSON.stringify(data));
        // alert(JSON.stringify(response.data));

      }).catch(err => {
        //console.log(err)
        // alert('Gagal menerima data dari server!' + err)
        ToastAndroid.show("Gagal menerima data dari server!" + err, ToastAndroid.SHORT)
        setState(state => ({ ...state, loading: false }))
      })
  }

  //=======> POST Form Data Tambah Alamat Nama dan Nomer <=======//

  useEffect(() => {

    AsyncStorage.getItem('member').then(response => {
      // console.log('Profil----------->'+ JSON.stringify(response));

      let data = JSON.parse(response);
      // const val = JSON.stringify(data);

      console.log('Profilefiks----------->' + JSON.stringify(data));

      setState(state => ({
        ...state,
        adr_mb_id: data.id,
        mb_name: data.value.mb_name,
        mb_phone: data.value.mb_phone,
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
        id: ids,
      }))
      console.log(ids)
    }).catch(err => {
      console.log('err', err)
    })

  }, [])

  const refresh = () => {
    setState(state => ({ ...state, loading: true }))
    axios.get(svr.url + 'registrasi-member/' + state.mb_id + '/' + svr.api)
      // axios.get('https://market.pondok-huda.com/dev/react/registrasi-member/' + state.mb_id)
      .then(result => {
        if (result.data.status == 200) {
          const datas = {
            id: result.data.value[0].mb_id,
            value: result.data.data[0]
          }
          if (datas.value.length === 0) {
            alert('Tidak ada data!')
          } else {
            //save Async Storage
            try {
              AsyncStorage.setItem('member', JSON.stringify(datas))
            } catch (e) {
              alert('Error ' + e)
            }
            getData()
            console.log('===>> ' + JSON.stringify(datas.value));
          }
          setKontak(kontak => ({ ...kontak, loading: false }))
        } else if (result.data.status == 404) {
          alert('Data tidak ditemukan!')
          setKontak(kontak => ({ ...kontak, loading: false }))
        }
      })

      .catch(err => {
        console.log(err)
        alert('Gagal menerima data dari server!')
        setState(state => ({ ...state, loading: false }))
      })
  }

  //=======> POST Form Data Tambah Alamat Jalan <=======//

  const editAlamat = async () => {
    const body = {
      adr_mb_id: state.adr_mb_id,
      adr_address: state.tmp_address,
      adr_cty_id: state.tmp_cty_id,
      adr_hp: state.tmp_hp,
      adr_name: state.tmp_name
    }
    console.log('Body Alamat====> ' + JSON.stringify(body));

    setState(state => ({ ...state, loading: true }))
    const adr_id = props.navigation.state.params.adr_id
    console.log('Let adr_id ===> ', adr_id)
    axios.post(svr.url + 'addres/' + adr_id + '/' + svr.api, body)
      // axios.post('https://market.pondok-huda.com/dev/react/addres/' + adr_id + '/', body)
      .then(response => {

        console.log('-----ALAMAT=====>', JSON.stringify(body));

        if (response.data.status == 200) {
          // alert('Berhasil Mengubah Alamat')
          ToastAndroid.show("Berhasil mengubah alamat!", ToastAndroid.SHORT)
          console.log('HASIL ALAMAT ==> : ', response)
          setState(state => ({ ...state, loading: false }))
          NavigatorService.navigate('Alamat');

        } else {
          // alert('Ubah Alamat Gagal!')
          ToastAndroid.show("Gagal mengubah alamat!", ToastAndroid.SHORT)
          setState(state => ({ ...state, loading: false }))
          console.log('-----COBA=====>' + JSON.stringify(response.data));
        }

      }).catch(err => {
        //console.log(err)
        // alert('Gagal menerima data dari server!' + err)
        ToastAndroid.show("Gagal menerima data dari server!" + err, ToastAndroid.SHORT)
        setState(state => ({ ...state, loading: false }))
      })
  }



  return (
    <View style={styles.container}>
      <BackHeader
        title={'Edit Alamat'}
        onPress={() => props.navigation.goBack()}
      />
      <View style={{ flex: 1 }}>
        {/* <ScrollView style={{ height: '100%', }}> */}
        <View style={{ hei: '100%', alignItems: 'center' }}>
          <Text style={styles.txtContact}>Kontak</Text>
          <View style={styles.content}>
            <SafeAreaView>
              <TextInput
                top={toDp(4)}
                width={toDp(335)}
                height={toDp(48)}
                borderRadius={toDp(10)}
                backgroundColor={'white'}
                autoCapitalize={'none'}
                style={styles.textInput}
                placeholder={'Nama'}
                placeholderTextColor={'#4E5A64'}
                value={state.tmp_name}
                onChangeText={(text) => setState(state => ({ ...state, tmp_name: text }))}
              />
              <TextInput
                top={toDp(6)}
                width={toDp(335)}
                height={toDp(48)}
                borderRadius={toDp(10)}
                backgroundColor={'white'}
                autoCapitalize={'none'}
                style={styles.textInput}
                placeholder={'Nomer HP'}
                placeholderTextColor={'#4E5A64'}
                value={state.tmp_hp}
                onChangeText={(text) => setState(state => ({ ...state, tmp_hp: text }))}
              />
            </SafeAreaView>
          </View>

          <Text style={styles.txtAlamat}>Alamat</Text>
          <View style={styles.inputAlamat}>
            <SafeAreaView>
              <SelectDropdown
                buttonStyle={styles.dropdown}
                buttonTextStyle={{ fontSize: toDp(12), color: '#4E5A64' }}
                rowTextStyle={{ fontSize: toDp(12) }}
                dropdownStyle={{ borderRadius: toDp(10) }}
                rowStyle={{ height: toDp(48), padding: toDp(5) }}
                defaultButtonText={'Pilih Kota atau Kabupaten'}
                defaultValue={{
                  cty_id: state.tmp_cty_id,
                  cty_name: state.tmp_cty_name
                }}
                data={state.cityname}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem.cty_name + selectedItem.cty_id)
                  setState(state => ({ ...state, tmp_cty_id: selectedItem.cty_id }))
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem.cty_name;
                }}
                rowTextForSelection={(item, index) => {
                  return item.cty_name;
                }}
                renderDropdownIcon={(isOpened) => {
                  return (
                    <FontAwesome
                      name={isOpened ? "chevron-up" : "chevron-down"}
                      color={"#444"}
                      size={12}
                    />
                  );
                }}
              />
              <TextInput
                top={toDp(6)}
                width={toDp(335)}
                height={toDp(48)}
                borderRadius={toDp(10)}
                backgroundColor={'white'}
                autoCapitalize={'none'}
                style={styles.textInput}
                placeholder={'Tuliskan Detail Jalan'}
                placeholderTextColor={'#4E5A64'}
                value={state.tmp_address}
                onChangeText={(text) => setState(state => ({ ...state, tmp_address: text }))}
              />
            </SafeAreaView>
          </View>

          {/* <Pressable style={{ height: toDp(50), top: toDp(22), }}>
            <View style={styles.searchSection}>
              <Image style={styles.searchIcon} source={allLogo.icsearch} />
              <TextInput
                style={styles.input}
                placeholder="Cari Lokasi"
                underlineColorAndroid="transparent"
                placeholderTextColor="#4E5A64"
                onChangeText={(text) => this.props.onFilter}
              />
            </View>
          </Pressable> */}

          {/* <View style={[styles.contentMap, { marginTop: toDp(40) }]}>
            <View style={[styles.wrapper, { margin: toDp(10) }]}>
              <MapView style={styles.map} initialRegion={{
                latitude: -7.7926359,
                longitude: 110.3636856,
                latitudeDelta: 0.009,
                longitudeDelta: 0.009
              }}>
                <Marker coordinate={{
                  latitude: -7.792396730376516,
                  longitude: 110.36580990952797
                }} />
              </MapView>
            </View>
          </View> */}
        </View>
      </View>

      <View style={styles.buttonSubmit}>
        <Pressable style={styles.btnSimpan} onPress={() => editAlamat()}>
          <Text style={{ color: 'white' }}>Simpan</Text>
        </Pressable>
      </View>


      {/* </ScrollView> */}
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white'
  },
  btnSimpan: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2A334B',
    width: toDp(335),
    height: toDp(48),
    borderRadius: toDp(10),
    marginTop: toDp(25),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    width: toDp(335),
    height: toDp(48),
    borderRadius: toDp(10),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
  },
  searchIcon: {
    resizeMode: 'contain',
    tintColor: '#4E5A64',
    width: toDp(20),
    height: toDp(20),
    zIndex: 3,
    padding: toDp(8),
    position: 'absolute',
    left: toDp(15),
    top: Platform.OS === 'ios' ? toDp(11) : toDp(11)
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    borderRadius: toDp(20),
    paddingLeft: toDp(45),
    color: '#FFF'
  },
  wrapper: {
    ...StyleSheet.absoluteFillObject
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  content: {
    top: toDp(15),
    // backgroundColor:'#C4C4C4',
    width: toDp(335),
    height: toDp(90),
    borderRadius: toDp(20)
  },
  txtContact: {
    fontWeight: 'bold',
    right: toDp(145),
    top: toDp(10)
  },
  txtAlamat: {
    fontWeight: 'bold',
    right: toDp(145),
    top: toDp(45),
    marginBottom: toDp(25)
  },
  inputAlamat: {
    top: toDp(30),
    // backgroundColor:'#C4C4C4',
    width: toDp(335),
    height: toDp(130),
    borderRadius: toDp(20)
  },
  dropdown: {
    height: toDp(48),
    borderRadius: toDp(10),
    width: toDp(335),
    marginBottom: toDp(7),
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
  },
  contentMap: {
    backgroundColor: 'white',
    width: toDp(335),
    height: toDp(200),
    borderRadius: toDp(20),
    bottom: toDp(5),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
  },
  textInput: {
    paddingHorizontal: toDp(10),
    marginBottom: toDp(10),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
  },
  buttonSubmit: {
    width: '100%',
    height: toDp(75),
    flexDirection: 'row',
    shadowColor: "#000",
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: toDp(10)
  },
});

export default Editalamat;
