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
  ScrollView, AsyncStorage
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import BackHeader from '@BackHeader'
import { Card } from "react-native-paper";
import NavigatorService from '@NavigatorService'
import { TextInput } from "react-native-gesture-handler";
import axios from "axios";
import NumberFormat from 'react-number-format';
import { svr } from "../../../Configs/apikey";

const Layananjasa = (props) => {
  const [src, setSrc] = useState(null);
  const [stSwitch, setWch] = useState(false);
  const [state, setState] = useState({
    textInputs: [],
    idform: [],
    datas: [],
    id_retail: '',
    shr_rtl_id: '',
    shr_shp_id: '',
    shr_status: '',
    shr_jasa: '',
    isLoading: true,
    isError: false,
    isSwitch: [false, false, false],
    swDis: [true, true, true]
  })

  //getJasa
  useEffect(() => {
    AsyncStorage.getItem('member').then(response => {
      // console.log('Profil----------->'+ JSON.stringify(response));

      let data = JSON.parse(response);
      // const val = JSON.stringify(data);

      console.log('Member ----------->' + JSON.stringify(data));

      setState(state => ({
        ...state,
        mb_id: data.mb_id,
        mb_name: data.value.mb_name,
        mb_phone: data.value.mb_phone,
        id_retail: data.retail_id,
        shr_rtl_id: data.retail_id,
      }))
      console.log('cek state ----------->' + JSON.stringify(state.id_retail));


    }).catch(err => {
      console.log('err', err)
    })

    getMyJasa()

  }, [])

  //post Jasa

  const InputpayJasa = async (body) => {
    setState(state => ({ ...state, loading: true }))
    axios.post(svr.url+'ship-retail/'+svr.api,body)
    // axios.post('https://market.pondok-huda.com/dev/react/ship-retail/', body)
      .then(result => {
        if (result.data.status == 200) {
          setState(state => ({ ...state, loading: false }))
          console.log('Response : ' + JSON.stringify(result.data));
        } else {
          alert('Gagal tambah harga jasa!')
          console.log(result.data)
          setState(state => ({ ...state, loading: false }))
          //console.log('-----COBA=====>'+ JSON.stringify(body));
        }

      }).catch(err => {
        console.log(result.data)
        alert('Gagal menerima data dari server!' + err)
        setState(state => ({ ...state, loading: false }))
      })

  }

  const getJasa = () => {
    // setState(state => ({...state, loading: true }))
    axios.get(svr.url+'shipping/'+svr.api)
    // axios.get('https://market.pondok-huda.com/dev/react/shipping/')
      .then(result => {
        // handle success
        // console.log('get jasa');
        console.log('Get Jasa ==>' + JSON.stringify(result.data.data));
        setState(state => ({ ...state, datas: result.data.data }))

        // alert(JSON.stringify(result.data));

      }).catch(err => {
        //console.log(err)
        alert('Gagal menerima data dari server!' + err)
        setState(state => ({ ...state, loading: false }))
      })
  }

  const getMyJasa = () => {
    let rtl_id = props.navigation.state.params.id_retail;
    console.log('cek rtl_id' + rtl_id);
    axios.get(svr.url+'ship-retail/retail/'+rtl_id+'/'+svr.api)
    // axios.get('https://market.pondok-huda.com/dev/react/ship-retail/retail/' + rtl_id)
      .then(result => {
        if (result.data.status == 200) {
          // handle success
          console.log('getMyJasa' + JSON.stringify(result.data.data));
          setState(state => ({ ...state, datas: result.data.data }))

          let data = result.data.data.map((doc, i) => {
            let isSwitch = '';
            if (doc.shr_status != '') {
              if (doc.shr_status == 1) {
                isSwitch = true;
              } else {
                isSwitch = false;
              }
            }
            return isSwitch


          })
          setState(state => ({
            ...state,
            isSwitch: data
          }));

          let input = result.data.data.map((doc, i) => {

            return doc.shr_jasa


          })
          setState(state => ({
            ...state,
            textInputs: input
          }));

          console.log('----JASA=====>' + JSON.stringify(state.isSwitch));
        } else if (result.data.status == 404) {
          console.log('404 = ' + rtl_id);
          getJasa()
        }

      }).catch(err => {
        //console.log(err)
        alert('Gagal menerima data dari server!' + err)
        setState(state => ({ ...state, loading: false }))
      })
  }

  const setSwitchValue = (input, name, i, id) => {
    let status = 0;

    let { isSwitch } = state;
    isSwitch[i] = !state.isSwitch[i];
    if (isSwitch[i] === false) {
      status = 0
    } else {
      status = 1
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

    console.log('cekk---->' + JSON.stringify(data));
    //langsung push data terbaru ke server
    //tulis kode disini

  }


  const ListJasa = (item, index) => {
    return (
      <View style={{ width: toDp(316), left: toDp(20), borderRadius: toDp(10), marginBottom: toDp(20) }}>
        <View style={styles.viewBody}>
          <View>
            <Text>{item.shp_name}</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              placeholder={'Masukan harga'}
              placeholderTextColor={'#4E5A64'}
              multiline={false}
              value={

                state.textInputs[index]

              }
              onChangeText={text => {
                let { textInputs } = state;
                textInputs[index] = text;
                setState(state => ({
                  ...state,
                  textInputs
                }));


                //Tolong di fix
                if ((state.textInputs[index] === 0) || (state.textInputs[index] === '')) {
                  let swDis = state;
                  swDis[index] = true;
                  setState(state => ({
                    ...state,
                    swDis
                  }));
                  console.log('cek switch ' + JSON.stringify(state.swDis));

                } else {
                  let swDis = state;
                  swDis[index] = !state.swDis[index];
                  setState(state => ({
                    ...state,
                    swDis
                  }));
                }

              }}
              
            />
          </View>

          <Switch
            thumbColor={'#f4f3f4'}
            trackColor={{ false: 'grey', true: '#6495ED' }}
            ios_backgroundColor='grey'
            //disable jika teks input 0 atau kosong
            disabled={false}
            onValueChange={(value) => setSwitchValue(state.textInputs[index], item.shp_name, index, item.shp_id)}
            value={
              state.isSwitch[index]
            }

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
        <View style={{ flexDirection: 'row', borderWidth: 0.5, height: toDp(48), marginBottom: toDp(10), bottom: toDp(5), borderColor: 'grey' }}>
          <Text style={styles.txtJasa}>Pilih jasa pengiriman</Text>
          <Image source={allLogo.siapkirim} style={{ margin: toDp(10), width: toDp(28), height: toDp(28), resizeMode: 'contain' }} />
        </View>
        <FlatList
          data={state.datas}
          renderItem=
          {({ item, index }) => {
            return (
              ListJasa(item, index)
            )
          }}
          keyExtractor={item => item.id}
          ListFooterComponent={() => <View style={{ height: toDp(50) }} />}
        />
      </View>
      {/* <Text> {JSON.stringify(state.textInputs)}</Text>
      <Text> {state.textInputs[0] != 0 ? 'yes' : 'no'}</Text>
      <Pressable style={styles.btnJasa} onPress={() => InputpayJasa()}>
        <Text style={styles.txtSimpan}>Simpan Harga</Text>
      </Pressable> */}
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
    marginBottom: toDp(5),
    marginTop: toDp(5)
  },
  textInput: {
    height: toDp(48),
    width: toDp(130),
    borderRadius: toDp(10),
    backgroundColor: '#FFFFFF',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
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
    padding: toDp(5),
    height: toDp(80),
    right: toDp(8),
    backgroundColor: '#f8f9f9',
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,

    // elevation: 3,
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