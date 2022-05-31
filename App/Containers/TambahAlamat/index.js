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
  ScrollView,AsyncStorage
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import  BackHeader  from '@BackHeader'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MapView, { Marker } from 'react-native-maps';
import NavigatorService from '@NavigatorService'
import axios from 'axios';

const TambahAlamat = (props) => {

  const countries = ["Jakarta", "Cirebon", "Bandung", "Kuningan"]

  const [state, setState] = useState({
    cityname: [],
    mb_id: '',
    mb_name: '',
    mb_phone: '',
    loading: false,
    adr_mb_id: '',
    adr_address: '',
    adr_cty_id: '',
  })

  useEffect(() => {
    city()

  }, [])

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

      }))


    }).catch(err => {
      console.log('err', err)
    })

  }, [])

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

  //=======> GET Form Data Tambah Alamat Nama dan Nomer <=======//

  const refresh = () => {
    setState(state => ({ ...state, loading: true }))
    axios.get('https://market.pondok-huda.com/dev/react/registrasi-member/MB000000033/' + state.mb_id)
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
            console.log('COBA===>> ' + JSON.stringify(datas.value));
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

  const InputAlamat = async (adr_mb_id) => {
    const body = {
      adr_mb_id: state.adr_mb_id,
      adr_address: state.adr_address,
      adr_cty_id: state.adr_cty_id,
      adr_hp: state.mb_phone
    }
    // console.log('Body Alamat====> '+ JSON.stringify(body));

    setState(state => ({ ...state, loading: true }))
    axios.post('https://market.pondok-huda.com/dev/react/addres/', body)
      .then(response => {

        //console.log('-----ALAMAT=====>' + JSON.stringify(response.data.status));
        //console.log('-----data=====>' + JSON.stringify(body));

        if (response.data.status == 201) {
          alert('Sukses tambah alamat!')
          //NavigatorService.navigate('Alamattoko', {adr_mb_id : adr_mb_id})
          props.navigation.goBack()
          console.log('HASIL ALAMAT ==> : ' + JSON.stringify(response.data))
          setState(state => ({ ...state, loading: false }))
          //NavigatorService.navigation('Alamattoko');

        } else {
          //alert('Tambah Alamat Gagal!')
          setState(state => ({ ...state, loading: false }))
          //console.log('-----COBA=====>'+ JSON.stringify(body));
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
          title={'Tambah Alamat'}
          onPress={() => props.navigation.goBack()}
        />
      <ScrollView style={{height:'100%',}}>
      <View style={{hei:'100%',  alignItems:'center'}}>
        <Text style={styles.txtContact}>Kontak</Text>
          <View style={styles.content}>
              <SafeAreaView>
                  <TextInput
                      right={toDp(9)}
                      top={toDp(4)}
                      width={toDp(335)}
                      height={toDp(40)}
                      borderRadius={toDp(20)}
                      backgroundColor={'white'}
                      autoCapitalize={'none'}
                      style={styles.textInput}
                      placeholder={'Nama'}
                      placeholderTextColor={'grey'}
                      // value={state.username}
                      onChangeText={(text) => setState(state => ({...state, adr_mb_name: text })) }
                  />
                  <TextInput
                      right={toDp(9)}
                      top={toDp(16)}
                      width={toDp(335)}
                      height={toDp(40)}
                      borderRadius={toDp(20)}
                      backgroundColor={'white'}
                      autoCapitalize={'none'}
                      style={styles.textInput}
                      placeholder={'Nomer HP'}
                      placeholderTextColor={'grey'}
                      // value={state.username}
                      onChangeText={(text) => setState(state => ({...state, mb_phone: text })) }
                  />
              </SafeAreaView>
          </View>

        <Text style={[styles.txtAlamat,{top:toDp(35)}]}>Alamat</Text>
          <View style={[styles.inputAlamat,{top:toDp(45)}]}>
                <SafeAreaView>
                  <SelectDropdown
                    buttonStyle={styles.dropdown}
                    buttonTextStyle={{ fontSize: toDp(12), color: 'grey' }}
                    rowTextStyle={{ fontSize: toDp(12) }}
                    dropdownStyle={{ borderRadius: toDp(7) }}
                    rowStyle={{ height: toDp(35), padding: toDp(5) }}
                    defaultButtonText={'Pilih Kota atau Kabupaten'}
                    data={state.cityname}
                    onSelect={(selectedItem, index) => {
                      console.log(selectedItem.cty_id, index)
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
                        right={toDp(9)}
                        top={toDp(16)}
                        width={toDp(335)}
                        height={toDp(40)}
                        borderRadius={toDp(20)}
                        backgroundColor={'white'}
                        autoCapitalize={'none'}
                        style={styles.textInput}
                        placeholder={'Tuliskan Detail Jalan'}
                        placeholderTextColor={'grey'}
                        // value={state.username}
                        onChangeText={(text) => setState(state => ({...state, adr_address: text })) }
                    />

                </SafeAreaView>
            </View>

            <Pressable>
                <View style={styles.searchSection}>
                    <Image style={styles.searchIcon} source={allLogo.icsearch} />
                    <TextInput
                        style={styles.input}
                        placeholder="Cari Lokasi"
                        underlineColorAndroid="transparent"
                        placeholderTextColor="white"
                        onChangeText={(text)=>this.props.onFilter}
                    />
                </View>
            </Pressable>

            <View style={[styles.contentMap, {marginTop:toDp(40)}]}>
              <View style={[styles.wrapper, {margin:toDp(10)}]}>
                  <MapView style={styles.map} initialRegion={{
                    latitude:-7.7926359,
                    longitude:110.3636856,
                    latitudeDelta:0.009,
                    longitudeDelta:0.009
                    }}>
                      <Marker coordinate={{
                        latitude:-7.792396730376516,
                        longitude:110.36580990952797
                      }}/>
                  </MapView>
              </View>
            </View>

            <Pressable style={styles.searchSection} onPress={() => InputAlamat()}>
                <Text style={{ color: 'white' }}>Simpan</Text>
            </Pressable>
            <View style={{marginBottom:toDp(80)}}></View>
      </View>
      </ScrollView>
    </View>
    );

}

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  searchSection: {
    top:toDp(40),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2A334B',
    width:toDp(335),
    height:toDp(40),
    borderRadius:toDp(20),
    marginBottom:toDp(10)
},
searchIcon: {
  resizeMode: 'contain',
  tintColor: 'white',
  width: toDp(20),
  height: toDp(20),
  zIndex:3,
  padding: toDp(8),
  position: 'absolute',
  left: toDp(15),
  top: Platform.OS === 'ios' ? toDp(11) : toDp(11)
},
input: {
  flex: 1,
  paddingTop: toDp(10),
  paddingRight: toDp(10),
  paddingBottom: toDp(10),
  paddingLeft: toDp(0),
  borderRadius: toDp(25),
  paddingLeft: toDp(45),
  color:'#FFF'
},
  wrapper: {
    ...StyleSheet.absoluteFillObject
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  content: {
      top:toDp(15),
      // backgroundColor:'#C4C4C4',
      width:toDp(316),
      height:toDp(90),
      borderRadius:toDp(20)
  },
  txtContact: {
    fontWeight: 'bold',
    right:toDp(145),
    top:toDp(10)
  },
  txtAlamat: {
    fontWeight:'bold',
    right:toDp(145),
    top:toDp(20)
  },
  inputAlamat: {
    top:toDp(30),
    // backgroundColor:'#C4C4C4',
    width:toDp(316),
    height:toDp(130),
    borderRadius:toDp(20)
},
dropdown:{
  height:toDp(38),
  borderRadius:toDp(20),
  width:toDp(335),
  top:toDp(4),
  right:toDp(9),
  backgroundColor:'white',
  borderWidth:toDp(0.5)
},
contentMap: {
  backgroundColor:'white',
  width:toDp(335),
  height:toDp(200),
  borderRadius:toDp(20),
  bottom:toDp(5)
},
textInput: {
  borderWidth:toDp(0.5),
  right:toDp(9),
  paddingHorizontal: toDp(18),

}
});

export default TambahAlamat;
