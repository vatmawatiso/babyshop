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
  ScrollView
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
    datas: [],
    shr_rtl_id: '',
    shr_shp_id: '',
    shr_status: '',
    shr_jasa: '',
    isLoading: true,
    isError: false,
  })

  //post Jasa

  const InputpayJasa = async () => {
    const body = {
      shr_rtl_id : state.shr_rtl_id,
      shr_shp_id: state.shr_shp_id,
      shr_jasa: state.shr_jasa,
      shr_status: state.shr_status,
    }
    console.log('Body Jasa====> ' + JSON.stringify(body));

    setState(state => ({ ...state, loading: true }))
    axios.post('https://market.pondok-huda.com/dev/react/ship-retail/', body)
      .then(result => {

        console.log('JASA PENGIRIMAN =====>' + JSON.stringify(result.data));

        if (result.data.status == 200) {

          let jum = result.data.length;

          for(let i=0; i < jum; i++){
            state.shr_jasa.push(result.data[i].shr_jasa)
            state.shr_shp_id.push(result.data[i].shr_shp_id)
          }

          // alert('Sukses tambah harga jasa!')
          // NavigatorService.navigate('jasa')
          // console.log('HASIL JASA PENGIRIMAN ==> : ' + JSON.stringify(result.data))
          setState(state => ({ ...state, loading: false }))
          //NavigatorService.navigation('Alamattoko');

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


  //getJasa 
  useEffect(() => {
    getJasa()

  }, [])

  // const countries = ["Jakarta", "Cirebon", "Bandung", "Kuningan"]

  const getJasa = () => {
    // setState(state => ({...state, loading: true }))
    axios.get('https://market.pondok-huda.com/dev/react/shipping/')
      .then(result => {
        // handle success
        setState(state => ({ ...state, datas: result.data.data }))
        console.log('----JASA=====>' + JSON.stringify(result.data.data));
        // alert(JSON.stringify(result.data));

      }).catch(err => {
        //console.log(err)
        alert('Gagal menerima data dari server!' + err)
        setState(state => ({ ...state, loading: false }))
      })
  }

  const setSwitchValue = (val, ind, id) => {
    const tempData = JSON.parse(JSON.stringify(state.datas));
    tempData[ind].status = val;
    setState({ datas: tempData });
    //langsung push data terbaru ke server
    //tulis kode disini

  }


  const ListJasa = ({ item, index }) => {
    return (
      <View style={{ width: toDp(316), left: toDp(20), borderRadius: toDp(10) }}>
        <View style={styles.viewBody}>
          <View>
            <Text>{item.shp_name}</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              placeholder={'Masukan harga'}
              placeholderTextColor={'#6e736f'}
              multiline={false}
              onChangeText={text => {
                let { shr_jasa } = state;
                shr_jasa[index] = text;
                setState(state => ({...state,
                  shr_jasa
                 }));
              }}
              value={state.shr_jasa[index]}
            />
          </View>

          <Switch
            thumbColor={'#f4f3f4'}
            trackColor={{ false: 'grey', true: '#6495ED' }}
            ios_backgroundColor='grey'

            onValueChange={(value) => setSwitchValue(value, index, item.datas)}
            value={item.status}

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
          data={state.datas}
          renderItem={ListJasa}
          keyExtractor={item => item.id}
          ListFooterComponent={() => <View style={{ height: toDp(50) }} />}
        />
      </View>
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