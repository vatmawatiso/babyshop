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
  AsyncStorage
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import BackHeader from '@BackHeader'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MapView, { Marker } from 'react-native-maps';
import NavigatorService from '@NavigatorService'
import axios from 'axios';


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
    adr_hp: '',
    tmp_hp:'',
    tmp_address:'',
    tmp_cty_name:''
  })

  useEffect(() => {
    setState(state => ({ ...state,
      tmp_hp: props.navigation.state.params.phone,
      tmp_address:props.navigation.state.params.adrress ,
      tmp_cty_name: props.navigation.state.params.cty_name
    }))
    console.log("ahh--->"+ props.navigation.state.params.phone);

    city()
  }, [])

  // const countries = ["Jakarta", "Cirebon", "Bandung", "Kuningan"]

  const city = () => {
    // setState(state => ({...state, loading: true }))
    axios.get('https://market.pondok-huda.com/dev/react/city/')
      .then(result => {
        // handle success
        //alert(JSON.stringify(result))
        setState(state => ({ ...state, cityname: result.data.data }))
        // console.log('-----kotaaa=====>'+ JSON.stringify(result.data.data));
        // alert(JSON.stringify(response.data));

      }).catch(err => {
        //console.log(err)
        alert('Gagal menerima data dari server!' + err)
        setState(state => ({ ...state, loading: false }))
      })
  }

  //=======> POST Form Data Tambah Alamat Nama dan Nomer <=======//

  useEffect(() => {

    AsyncStorage.getItem('member').then(response => {
      // console.log('Profil----------->'+ JSON.stringify(response));

      let data = JSON.parse(response);
      // const val = JSON.stringify(data);

      console.log('CEK DATA MEMBER----------->' + JSON.stringify(data));

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
    getAlamat()
  }, [])

  const getAlamat = () => {

    setState(state => ({ ...state, loading: true }))
    let adr_id = props.navigation.state.params.adr_id;
    console.log('Let adr_id ===> ', adr_id)
    axios.get('https://market.pondok-huda.com/dev/react/addres/' + adr_id)
      .then(result => {

        console.log('CEK RESULT ALAMAT ====> ' + JSON.stringify(result));

        if (result.data.status == 200) {
          const the_data = result.data.data.map(doc => {
            return {
              adr_id: doc.adr_id,
              adr_mb_id: doc.adr_mb_id,
              mb_name: doc.mb_name,
              adr_hp: doc.adr_hp,
              adr_address: doc.adr_address,
              cty_name: doc.cty_name,

            }
          })
          console.log('CEK The DATA =>' + JSON.stringify(the_data))

          setState(state => ({
            ...state,
            // mb_name: the_data[0].mb_name,
            adr_id: the_data[0].adr_id,
            adr_mb_id: the_data[0].adr_mb_id,
            mb_name: the_data[0].mb_name,
            adr_hp: the_data[0]?.adr_hp,
            adr_address: the_data[0]?.adr_address,
            cty_name: the_data[0]?.cty_name,

          }))
          // alert('CEK State Alamat =>' + JSON.stringify(the_data))


        } else if (result.data.status == 500) {
          console.log('error')

        }
      }).catch(error => {
        alert('error Profil Seller => ', error)

      })
  }

  // ===> POST Porifl Seller atau Retail <=== //

  const InputProfil = async (rtl_mb_id) => {
    const body = {
      rtl_mb_id: state.rtl_mb_id,
      rtl_name: state.rtl_name,
      rtl_phone: state.rtl_phone,
      rtl_addres: state.rtl_addres,
      rtl_lat: state.rtl_lat,
      rtl_long: state.rtl_long,
    }
    console.log('CEK BODY ===> ' + JSON.stringify(body));

    setState(state => ({ ...state, loading: true }))
    axios.get('https://market.pondok-huda.com/dev/react/retail/', body)
      .then(response => {

        console.log('CEK URL ===>' + JSON.stringify(response.data.status));

        if (response.data.status === 201) {
          alert('Berhasil tambah data diri!')

          NavigatorService.navigate('Informasitoko')

          console.log('CEK Hasil Profil Seller ===>' + JSON.stringify(response.data));

          setState(state => ({ ...state, loading: false }))

        } else {
          alert('Gagal Tambah Data Diri!')
          setState(state => ({ ...state, loading: false }))

          console.log('CEK ERROR ===>' + JSON.stringify(response.data));
        }

      }).catch(err => {
        // console.log(err)
        alert('Gagal menerima data dari server!' + err)
        setState(state => ({ ...state, loading: false }))
      })
  }

  //=======> POST Form Data Tambah Alamat Jalan <=======//

  const editAlamat = async () => {
    const body = {
      adr_mb_id: state.adr_mb_id,
      adr_address: state.adr_address,
      adr_cty_id: state.adr_cty_id,
      adr_hp: state.adr_hp
    }
    console.log('Body Alamat====> ' + JSON.stringify(body));

    setState(state => ({ ...state, loading: true }))
    const adr_id = props.navigation.state.params.adr_id
    axios.post('https://market.pondok-huda.com/dev/react/addres/' + adr_id + '/', body)
      .then(response => {

        console.log('-----ALAMAT=====>', response);

        if (response.data.status == 200) {
          alert('Berhasil Mengubah Alamat')
          console.log('HASIL ALAMAT ==> : ', response)
          setState(state => ({ ...state, loading: false }))
          NavigatorService.navigate('Alamat');

        } else {
          alert('Ubah Alamat Gagal!')
          setState(state => ({ ...state, loading: false }))
          console.log('-----COBA=====>' + JSON.stringify(response.data));
        }

      }).catch(err => {
        //console.log(err)
        alert('Gagal menerima data dari server!' + err)
        setState(state => ({ ...state, loading: false }))
      })
  }



  return (
    <View style={styles.container}>
      <BackHeader
        title={'Edit Alamat'}
        onPress={() => props.navigation.goBack()}
      />

      <Text style={styles.txtContact}>Kontak</Text>
      <View style={styles.content}>
        <SafeAreaView>
          <TextInput
            top={toDp(4)}
            width={toDp(335)}
            height={toDp(40)}
            borderRadius={toDp(15)}
            backgroundColor={'white'}
            autoCapitalize={'none'}
            style={styles.textInput}
            placeholder={'Nama'}
            placeholderTextColor={'grey'}
            value={state.mb_name}
            onChangeText={(text) => setState(state => ({ ...state, mb_name: text }))}
          />
          <TextInput
            top={toDp(6)}
            width={toDp(335)}
            height={toDp(40)}
            borderRadius={toDp(15)}
            backgroundColor={'white'}
            autoCapitalize={'none'}
            style={styles.textInput}
            placeholder={'Nomer HP'}
            placeholderTextColor={'grey'}
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
            buttonTextStyle={{ fontSize: toDp(12), color: 'grey' }}
            rowTextStyle={{ fontSize: toDp(12) }}
            dropdownStyle={{ borderRadius: toDp(7) }}
            rowStyle={{ height: toDp(35), padding: toDp(5) }}
            defaultButtonText={'Pilih Kota atau Kabupaten'}
            defaultValue={'Sabang '}
            data={state.cityname}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index)
              setState(state => ({ ...state, adr_cty_id: selectedItem.cty_id }))
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
            height={toDp(40)}
            borderRadius={toDp(15)}
            backgroundColor={'white'}
            autoCapitalize={'none'}
            style={styles.textInput}
            placeholder={'Tuliskan Detail Jalan'}
            placeholderTextColor={'grey'}
            value={state.tmp_address}
            onChangeText={(text) => setState(state => ({ ...state, tmp_address: text }))}
          />
          {/* <TextInput
                        left={toDp(3)}
                        top={toDp(8)}
                        width={toDp(335)}
                        height={toDp(40)}
                        borderRadius={toDp(15)}
                        backgroundColor={'white'}
                        autoCapitalize={'none'}
                        style={styles.textInput}
                        placeholder={'Patokan'}
                        placeholderTextColor={'grey'}
                        // value={state.username}
                        // onChangeText={(text) => setState(state => ({...state, username: text })) }
                    /> */}
        </SafeAreaView>
      </View>

      <Pressable style={{ backgroundColor: 'yellow', borderRadius: toDp(20), height: toDp(40), width: toDp(335) }} onPress={() => editAlamat()}>
        <View style={styles.searchSection}>
          <Text style={{ color: 'white' }}>Simpan</Text>
          {/* <Image style={styles.searchIcon} source={allLogo.icsearch} /> */}
          {/* <TextInput
                        style={styles.input}
                        placeholder="Cari Lokasi"
                        underlineColorAndroid="transparent"
                        placeholderTextColor="white"
                        onChangeText={(text)=>this.props.onFilter}
                    /> */}
        </View>
      </Pressable>

      <View style={[styles.contentMap, { marginTop: toDp(40) }]}>
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
      </View>

    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2A334B',
    width: toDp(335),
    height: toDp(40),
    borderRadius: toDp(20),
    marginBottom: toDp(10)
  },
  searchIcon: {
    resizeMode: 'contain',
    tintColor: 'white',
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
    top: toDp(20)
  },
  inputAlamat: {
    top: toDp(30),
    // backgroundColor:'#C4C4C4',
    width: toDp(335),
    height: toDp(130),
    borderRadius: toDp(20)
  },
  dropdown: {
    height: toDp(38),
    borderRadius: toDp(20),
    width: toDp(335),
    top: toDp(4),
    backgroundColor: 'white',
    borderWidth: toDp(0.5)
  },
  contentMap: {
    backgroundColor: 'white',
    width: toDp(335),
    height: toDp(200),
    borderRadius: toDp(20),
    bottom: toDp(5)
  },
  textInput: {
    borderWidth: toDp(0.5),
  }
});

export default Editalamat;