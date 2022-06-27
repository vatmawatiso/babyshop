import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Switch,
  TouchableOpacity,
  FlatList,
  Alert,
  ImageBackground,
  Pressable,
  ScrollView,AsyncStorage
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import BackHeader from '@BackHeader'
import { Card } from "react-native-paper";
import NavigatorService from '@NavigatorService'
import { TextInput } from "react-native-gesture-handler";
import axios from "axios";
import NumberFormat from 'react-number-format';

const Layananjasa = (props) => {
  const [src, setSrc] = useState(null);

  const [state, setState] = useState({
    textInputs:[],
    idform:[],
    datas: [],
    shipretail:[],
    shr_rtl_id: '',
    shr_shp_id: '',
    shr_status: '',
    shr_jasa: '',
    isLoading: true,
    isError: false,
    isSwitch: [false,false,false]
  })

  //getJasa
  useEffect(() => {
    AsyncStorage.getItem('member').then(response => {
      // console.log('Profil----------->'+ JSON.stringify(response));

      let data = JSON.parse(response);
      // const val = JSON.stringify(data);

      console.log('Member ----------->'+ JSON.stringify(data));

      setState(state => ({
        ...state,
        shr_rtl_id: data.retail_id,
      }))
      console.log('cek state member----------->' + JSON.stringify(state.shr_rtl_id));


    }).catch(err => {
      console.log('err', err)
    })
    getJasa()
    getHarga()

  }, [])

  //post Jasa

  const InputpayJasa = async (body) => {
      setState(state => ({ ...state, loading: true }))
      axios.post('https://market.pondok-huda.com/dev/react/ship-retail/', body)
        .then(result => {
          if (result.data.status == 200) {
            setState(state => ({ ...state, loading: false }))
            console.log('Response : '+ JSON.stringify(result.data));
          } else {
            alert('Gagal tambah harga jasa!')
            setState(state => ({ ...state, loading: false }))
            //console.log('-----COBA=====>'+ JSON.stringify(body));
          }

        }).catch(err => {
          //console.log(err)
          alert('Gagal menerima data dari server!' + err)
          setState(state => ({ ...state, loading: false }))
        })

  }

  const getJasa = () => {
    // setState(state => ({...state, loading: true }))
    axios.get('https://market.pondok-huda.com/dev/react/shipping/')
      .then(result => {
        // handle success
        console.log(result.data.data);
        setState(state => ({ ...state, datas: result.data.data }))
        // console.log('----JASA=====>' + JSON.stringify(result.data.data));
        // alert(JSON.stringify(result.data));

      }).catch(err => {
        //console.log(err)
        alert('Gagal menerima data dari server!' + err)
        setState(state => ({ ...state, loading: false }))
      })
  }

  // useEffect(() => {
  //   getHarga()

  // }, [])


  const getHarga = () => {
    // setState(state => ({...state, loading: true }))
    axios.get('https://market.pondok-huda.com/dev/react/ship-retail/retail/'+ state.shr_rtl_id)
      .then(result => {
        // handle success
        console.log('SHIPP'+ JSON.stringify(result.data.data));
        setState(state => ({ ...state, shipretail: result.data.data }))
        // console.log('----JASA=====>' + JSON.stringify(result.data.data));
        // alert(JSON.stringify(result.data));

      }).catch(err => {
        //console.log(err)
        alert('Gagal menerima data dari server!' + err)
        setState(state => ({ ...state, loading: false }))
      })
  }

    // //get harga 
    // const getHarga = () => {
    //   // setState(state => ({...state, loading: true }))
    //   axios.get('https://market.pondok-huda.com/dev/react/ship-retail/retail/'+ state.shr_rtl_id)
    //     .then(result => {
    //       // handle success
    //       //alert(JSON.stringify(result))
    //        console.log('SHIPP =====>' + JSON.stringify(result.data));
    //        // console.log('CEK COK =====>' + JSON.stringify(result.data.data[0].cty_name));
    //       let data = result.data.data[0];
    //       // console.log('CEK COK =====>' + JSON.stringify(data.cty_name));
  
    //       //setState(state => ({ ...state, cityname: result.data.data }))
    //       setState(state => ({ ...state, shipretail: data}))
    //       console.log('Shipping Harga=====>' + JSON.stringify(data.shr_jasa));
  
    //     }).catch(err => {
    //       //console.log(err)
    //       alert('Gagal menerima data dari server!ss' + err)
    //       setState(state => ({ ...state, loading: false }))
    //     })
    // }

  const setSwitchValue = (input, name, i, id) => {
    let status = 0;

    let { isSwitch } = state;
    isSwitch[i] = !state.isSwitch[i];
    if(isSwitch[i]===false){
      status=0
    }else{
      status=1
    }
    setState(state => ({
      ...state,
      isSwitch
    }))

    let data = {
      price: input,
      shp_name: name,
      shp_id: id,
      rtl_id: state.shr_rtl_id,
      status: status
    }

    InputpayJasa(data)

    console.log('---->'+JSON.stringify(data));
    //langsung push data terbaru ke server
    //tulis kode disini

  }


  const ListJasa = (item, index) => {
    return (
      <View style={{ width: toDp(316), left: toDp(20), borderRadius: toDp(10), marginBottom:toDp(20) }}>
        <View style={styles.viewBody}>
          <View>
            <Text>{item.shp_name}</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              placeholder={'Masukan harga'}
              placeholderTextColor={'#6e736f'}
              multiline={false}
              onChangeText={text => {let { shr_jasa } = state ; shr_jasa[index] = text ; setState(state => ({...state, shr_jasa}));
                }}
              value={state.shr_jasa[index]}
            />
          </View>

          <Switch
            thumbColor={'#f4f3f4'}
            trackColor={{ false: 'grey', true: '#6495ED' }}
            ios_backgroundColor='grey'

            onValueChange={(value) => setSwitchValue(state.textInputs[index], item.shp_name, index, item.shp_id)}
            value={state.isSwitch[index]}

          />

        </View>
        <View style={{ borderWidth: toDp(1), borderColor: 'white' }} />
      </View>
    )
  }


  return (
    <View style={styles.container}>
      <BackHeader
        title={'Jasa Kirim'}
        onPress={() => props.navigation.goBack()}
      />
      {/*
        <ScrollView> */}
      <View style={{ top: toDp(0) }}>
        <View style={{ flexDirection: 'row', borderWidth: 0.5, height: toDp(40), marginBottom: toDp(10), bottom: toDp(5), borderColor: 'grey' }}>
          <Text style={styles.txtJasa}>Pilih jasa pengiriman</Text>
          <Image source={allLogo.siapkirim} style={{ margin: toDp(10), width: toDp(28), height: toDp(28), resizeMode: 'contain' }} />
        </View>
        <FlatList
          data={state.shipretail}
          renderItem=
          {({item, index}) => {
              return (
                ListJasa(item, index)
              )
            }}
          keyExtractor={item => item.id}
          ListFooterComponent={() => <View style={{ height: toDp(50) }} />}
        />
      </View>
      <Text>{JSON.stringify(state.textInputs)}</Text>
      <Pressable style={styles.btnJasa} onPress={() => InputpayJasa()}>
        <Text style={styles.txtSimpan}>Simpan Harga</Text>
      </Pressable>
      {/* </ScrollView> */}
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent:'center',
    // alignItems: 'center',
    // backgroundColor:'red'
  },
  btnJasa: {
    backgroundColor: '#2A334B',
    width: toDp(335),
    height: toDp(42),
    borderRadius: toDp(10),
    top: toDp(210),
    left: toDp(12),
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
  txtSimpan: {
    color: 'white',
    textAlign: 'center'
  },
  txtJasap: {
    marginBottom:toDp(5),
    marginTop:toDp(5)
  },
  textInput: {
    height: toDp(35),
    width: toDp(130),
    borderWidth: toDp(0.5),
    borderRadius: toDp(10)
  },
  txtJasa: {
    margin: toDp(10),
    top: toDp(5),
    // right:toDp(5),
    left: toDp(5),
    fontWeight: 'bold'
  },
  body: {
    backgroundColor: 'yellow',
    width: toDp(360),
    height: toDp(360),
  },
  viewBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderRadius: toDp(10),
    width: toDp(335),
    padding: toDp(12),
    height: toDp(65),
    right: toDp(8),
    backgroundColor: '#f8f9f9',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 3,
  },
  courier: {
    backgroundColor: '#C4C4C4',
    width: toDp(335),
    height: toDp(330),
    left: toDp(20),
    borderRadius: toDp(20),
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  txtCourier: {
    marginTop: toDp(10),
    left: toDp(10)
  }
});

export default Layananjasa;
