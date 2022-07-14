import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Pressable,
  AsyncStorage
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import BackHeader from '@BackHeader'
import NavigatorService from '@NavigatorService'
import { ScrollView, TextInput } from "react-native-gesture-handler";
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import axios from 'axios';

const Ubahtoko = (props) => {
  const [src, setSrc] = useState(null);

  const DATA = [
    {
      id: '2938492',
      image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    },
  ]

  const [state, setState] = useState({
    loading: false,
    cityname: [],
    tmp_cty_name: '',
    tmp_cty_id: '',
    cty_id: '',
    cty_name: '',
    datas: [],
    mb_id: '',
    mb_name:'',
    rtl_name: '',
    rtl_mb_id: '',
    rtl_phone: '',
    rtl_addres: '',
    rtl_city: '',
    rtl_status: '',
    rtl_long: '',
    rtl_lat: '',
    rtl_id: '',
    retail_id: '',
    bo_rtlid: false
  })

  //GET CITY

  useEffect(() => {
    setState(state => ({ ...state,
      tmp_cty_name: props.navigation.state.params.cty_name,
      tmp_cty_id: props.navigation.state.params.rtl_city,

    }))
    console.log("CITY ---> "+ props.navigation.state.params.rtl_city);
    console.log("NAMA ---> "+ props.navigation.state.params.cty_name);

    city()
  }, [])

  const city = () => {
    // setState(state => ({...state, loading: true }))
    axios.get('https://market.pondok-huda.com/dev/react/city/')
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
        // console.log('-----kotaaa=====>'+ JSON.stringify(data));
        // alert(JSON.stringify(response.data));

      }).catch(err => {
        //console.log(err)
        alert('Gagal menerima data dari server!' + err)
        setState(state => ({ ...state, loading: false }))
      })
  }

  // ===> GET nama member di profil seller <== //

  useEffect(() => {
    AsyncStorage.getItem('uid').then(uids => {
      let ids = uids;
      setState(state => ({
        ...state,
        mb_id: ids
      }))
    }).catch(err => {
      console.log('err', err)
    })

    AsyncStorage.getItem('member').then(response => {
      //console.log('CEK nama member ===>'+ JSON.stringify(response));
      let data = JSON.parse(response);
      console.log('HASIL  ===>' + JSON.stringify(data));
      setState(state => ({
        ...state,
        rtl_mb_id: data.rtl_mb_id,
        id_retail: data.retail_id,
        mb_name: data.value.mb_name,
      }))
      getProfilseller(data.rtl_id)
      console.log('DATA ID RETAIL ====> ' + JSON.stringify(data.retail_id));
      console.log('STATE ID RETAIL ====> ' + JSON.stringify(state.id_retail));

    }).catch(err => {
      console.log('err', err)
    })



    return (() => {
      console.log('===========================>' + state.id_retail);
      //getProfilseller()
    })
  }, [state.id_retail])

  const getProfilseller = (rtid) => {

    setState(state => ({ ...state, loading: true }))
    // let id = rtl_id;
    axios.get('https://market.pondok-huda.com/dev/react/retail/' + state.id_retail)
      .then(result => {

        console.log('CEK RETAIL UBAH TOKO====> ' + JSON.stringify(result));

        if (result.data.status == 200) {
          const the_data = result.data.data.map(doc => {
            return {
              rtl_id: doc.rtl_id,
              rtl_name: doc.rtl_name,
              mb_name: doc.mb_name,
              rtl_phone: doc.rtl_phone,
              rtl_addres: doc.rtl_addres,
              cty_name: doc.cty_name,
              rtl_city: doc.rtl_city,
              rtl_long: doc.rtl_long,
              rtl_lat: doc.rtl_lat,
              rtl_status: doc.rtl_status,
            }
          })
          console.log('CEK Retail Seller =>'+ JSON.stringify(the_data))

          setState(state => ({
            ...state,
            // mb_name: the_data[0].mb_name,
            rtl_name: the_data[0].rtl_name,
            rtl_phone: the_data[0]?.rtl_phone,
            rtl_addres: the_data[0]?.rtl_addres,
            rtl_city: the_data[0]?.rtl_city,
            cty_name: the_data[0]?.cty_name,
            rtl_status: the_data[0]?.rtl_status,
            rtl_long: the_data[0]?.rtl_long,
            rtl_lat: the_data[0]?.rtl_lat,
            rtl_id: the_data[0]?.rtl_id
          }))
          // alert('CEK Profil Seller =>'+ JSON.stringify(the_data))
              // console.log('CEK Retail Seller =>'+ JSON.stringify(state.cty_id))
              // console.log('CEK Retail Seller =>'+ JSON.stringify(state.cty_id))


        } else if (result.data.status == 500) {
          console.log('error')

        }
      }).catch(error => {
        alert('error Profil Seller => ', error)

      })
  }

  // ===> POST Ubah Toko Seller atau Retail <=== //

  const inputUbahtoko = async () => {
    const body = {
      rtl_mb_id: state.mb_id,
      rtl_id: state.rtl_id,
      rtl_name: state.rtl_name,
      mb_name: state.mb_name,
      rtl_phone: state.rtl_phone,
      rtl_status: state.rtl_status,
      rtl_addres: state.rtl_addres,
      rtl_city: state.tmp_cty_id,
      rtl_long: state.rtl_long,
      rtl_lat: state.rtl_lat,
    }
    console.log('CEK BODY ===> ' + JSON.stringify(body));

    setState(state => ({ ...state, loading: true }))
    axios.post('https://market.pondok-huda.com/dev/react/retail/'+ state.id_retail, body)
      .then(response => {

        console.log('CEK URL ===>' + JSON.stringify(response));

        if (response.data.status === 200) {
          alert('Berhasil ubah toko!')

          NavigatorService.navigate('Informasitoko')

          // console.log('CEK Hasil Tambah Toko ===>' + JSON.stringify(response.data));

          setState(state => ({ ...state, loading: false }))

        } else {
          alert('Gagal ubah toko!')
          setState(state => ({ ...state, loading: false }))

          console.log('CEK ERROR ===>' + JSON.stringify(response.data));
        }

      }).catch(err => {
        // console.log(err)
        alert('Gagal menerima data dari server!' + err)
        setState(state => ({ ...state, loading: false }))
      })
  }



  return (
    <View style={styles.container}>

      <BackHeader
        title={'Ubah Toko'}
        onPress={() => props.navigation.goBack()}
      />

      <View style={styles.profilToko}>
        <ScrollView>
          <Image source={{ uri: DATA[0].image }} style={styles.imgProfil} />
          <View style={{ marginLeft: toDp(80), bottom: toDp(30) }}>
            <Text style={{ fontWeight: 'bold' }}>Gambar Profil</Text>
            <Text style={{ fontSize: toDp(11) }}>Besar file maks. 2MB dengan format .JPG, JPEG atau PNG.</Text>
            <Pressable style={styles.btnGanti}>
              <Text style={{ color: '#0960A1' }}>Ganti Gambar</Text>
            </Pressable>
          </View>

          <View style={{ margin: toDp(8), bottom: toDp(30) }}>

            <Text style={styles.txtToko}>Nama Pengguna</Text>
            <TextInput autoCapitalize={'none'}
              style={styles.textInput}
              placeholderTextColor={'grey'}
              value={state.mb_name}
              onChangeText={(text) => setState(state => ({ ...state, mb_name: text }))}
            />

            <Text style={styles.txtToko}>Nama Toko</Text>
            <TextInput autoCapitalize={'none'}
              style={styles.textInput}
              placeholderTextColor={'grey'}
              value={state.rtl_name}
              onChangeText={(text) => setState(state => ({ ...state, rtl_name: text }))}
            />

            <Text style={styles.txtDeskripsi}>Telepon</Text>
            <TextInput autoCapitalize={'none'}
              style={styles.textInput1}
              placeholderTextColor={'grey'}
              value={state.rtl_phone}
              onChangeText={(text) => setState(state => ({ ...state, rtl_phone: text }))}
            />
            <Text style={styles.txtDeskripsi}>Jalan</Text>
            <TextInput autoCapitalize={'none'}
              style={styles.textInput1}
              placeholderTextColor={'grey'}
              value={state.rtl_addres}
              onChangeText={(text) => setState(state => ({ ...state, rtl_addres: text }))}
            />
            <Text style={styles.txtDeskripsi}>Kota</Text>
            <SelectDropdown
              buttonStyle={styles.dropdown}
              buttonTextStyle={{ fontSize: toDp(12), color: 'grey' }}
              rowTextStyle={{ fontSize: toDp(12) }}
              dropdownStyle={{ borderRadius: toDp(7) }}
              rowStyle={{ height: toDp(35), padding: toDp(5) }}
              defaultButtonText={'Pilih Kota atau Kabupaten'}
              defaultValue={{
                cty_id: state.tmp_cty_id,
                cty_name: state.tmp_cty_name
              }}
              data={state.cityname}
              onSelect={(selectedItem, index) => {
                // console.log(selectedItem.cty_id, index)
                // setState(state => ({ ...state, rtl_city: selectedItem.cty_id })) 
                console.log(selectedItem.cty_name+selectedItem.cty_id)
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
            <Text style={styles.txtDeskripsi}>Latitude</Text>
            <TextInput autoCapitalize={'none'}
              style={styles.textInput1}
              placeholderTextColor={'grey'}
              value={state.rtl_lat}
              onChangeText={(text) => setState(state => ({ ...state, rtl_lat: text }))}
            />
            <Text style={styles.txtDeskripsi}>Longtitude</Text>
            <TextInput autoCapitalize={'none'}
              style={styles.textInput1}
              placeholderTextColor={'grey'}
              value={state.rtl_long}
              onChangeText={(text) => setState(state => ({ ...state, rtl_long: text }))}
            />
          </View>
        </ScrollView>
      </View>
      {state.bo_rtlid == true &&
        <Text>{state.retail_id}</Text>
      }
      <Pressable style={styles.btnSimpan} onPress={() => inputUbahtoko()}>
        <Text style={styles.txtSimpan}>Simpan</Text>
      </Pressable>

    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  imgProfil: {
    height: toDp(50),
    width: toDp(50),
    top: toDp(20),
    left: toDp(15),
    borderRadius: toDp(25)
  },
  profilToko: {
    backgroundColor: '#F9F8F8',
    borderRadius: toDp(10),
    top: toDp(10),
    width: toDp(335),
    height: toDp(490),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 3,
  },
  btnGanti: {
    width: toDp(90),
    top: toDp(5),
  },
  textInput: {
    width: toDp(320),
    height: toDp(39),
    backgroundColor: '#F2F3F3',
    paddingHorizontal: toDp(15),
    borderRadius: toDp(10),
    top: toDp(3),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 1,
  },
  textInput1: {
    width: toDp(320),
    height: toDp(39),
    backgroundColor: '#F2F3F3',
    paddingHorizontal: toDp(15),
    borderRadius: toDp(10),
    top: toDp(5),
    marginTop: toDp(5),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 1,
  },
  txtDeskripsi: {
    top: toDp(8),
    fontSize: toDp(13),
    color: '#2A334B',
    marginTop: toDp(0)
  },
  txtToko: {
    fontSize: toDp(13),
    color: '#2A334B',
    marginTop: toDp(5)
  },
  btnSimpan: {
    backgroundColor: '#2A334B',
    width: toDp(335),
    height: toDp(50),
    borderRadius: toDp(10),
    top: toDp(20),
    justifyContent: 'center'
  },
  txtSimpan: {
    textAlign: 'center',
    color: 'white',
    fontSize: toDp(14)
  },
  dropdown: {
    width: toDp(320),
    height: toDp(39),
    borderRadius: toDp(10),
    top: toDp(10),
    backgroundColor: '#F2F3F3',
    marginBottom: toDp(5),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 1,
  },

});

export default Ubahtoko;