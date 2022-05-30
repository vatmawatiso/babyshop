import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ImageBackground,
  Pressable,
  AsyncStorage
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import BackHeader from '@BackHeader'
import NavigatorService from '@NavigatorService'
import { TextInput } from "react-native-gesture-handler";
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
    nama: '',
    deskripsi: '',
    datas: [],
    mb_id: '',
    rtl_name: '',
    rtl_mb_id: '',
    rtl_phone: '',
    rtl_addres: '',
    rtl_city: '',
    rtl_status: '',
    rtl_long: '',
    rtl_lat: '',
    rtl_id: '',
    id_retail: '',
    bo_rtlid: false
  })

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
      getProfilseller(data.retail_id)
      console.log('ID RETAIL ====> ' + JSON.stringify(data.retail_id));

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
    axios.get('https://market.pondok-huda.com/dev/react/retail/' + rtid)
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
              rtl_long: doc.rtl_long,
              rtl_lat: doc.rtl_lat,
              rtl_status: doc.rtl_status,
            }
          })
          // console.log('CEK Profil Seller =>'+ JSON.stringify(the_data))

          setState(state => ({
            ...state,
            // mb_name: the_data[0].mb_name,
            rtl_name: the_data[0].rtl_name,
            rtl_phone: the_data[0]?.rtl_phone,
            rtl_addres: the_data[0]?.rtl_addres,
            rtl_city: the_data[0]?.cty_name,
            rtl_status: the_data[0]?.rtl_status,
            rtl_long: the_data[0]?.rtl_long,
            rtl_lat: the_data[0]?.rtl_lat,
            rtl_id: the_data[0]?.rtl_id
          }))
          // alert('CEK Profil Seller =>'+ JSON.stringify(the_data))


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



  return (
    <View style={styles.container}>

      <BackHeader
        title={'Ubah Toko'}
        onPress={() => props.navigation.goBack()}
      />

      <View style={styles.profilToko}>
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
          <Text style={styles.txtDeskripsi}>Alamat</Text>
          <TextInput autoCapitalize={'none'}
            style={styles.textInput1}
            placeholderTextColor={'grey'}
            value={state.rtl_addres}
            onChangeText={(text) => setState(state => ({ ...state, rtl_addres: text }))}
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
      </View>
      {state.bo_rtlid == true &&
        <Text>{state.id_retail}</Text>
      }
      <Pressable style={styles.btnSimpan}>
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
    backgroundColor: '#e7e7e7',
    borderRadius: toDp(25),
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

    elevation: 2,
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
    borderRadius: toDp(20),
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
    borderRadius: toDp(20),
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
    borderRadius: toDp(20),
    top: toDp(20),
    justifyContent: 'center'
  },
  txtSimpan: {
    textAlign: 'center',
    color: 'white',
    fontSize:toDp(14)
  }

});

export default Ubahtoko;


  // const body = {
  //   rtl_mb_id: state.rtl_mb_id,
  //   mb_name: state.mb_name,
  //   rtl_id: state.rtl_id,
  //   rtl_name: state.rtl_name,
  //   rtl_mb_id:state.rtl_mb_id,
  //   rtl_phone:state.rtl_phone,
  //   rtl_addres:state.rtl_addres,
  //   rtl_city:state.rtl_city,
  //   rtl_status:state.rtl_status,
  //   rtl_long:state.rtl_long,
  //   rtl_lat:state.rtl_lat,
  // }
  // console.log('BODY RETAIL UBAH TOKO====> '+ JSON.stringify(body));
