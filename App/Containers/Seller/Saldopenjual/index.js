import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ImageBackground,
  Pressable,
  AsyncStorage,
  RefreshControl,
  ScrollView
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import BackHeader from '@BackHeader'
import NavigatorService from '@NavigatorService'
import { TextInput } from "react-native-gesture-handler";
import axios from "axios";
import { svr } from "../../../Configs/apikey";
import NumberFormat from 'react-number-format';


const Saldopenjual = (props) => {

  const [src, setSrc] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [state, setState] = useState({
    mb_id: '',
    retail_id: '',
    saldo: '',
    rekening: []
  });


  useEffect(() => {
    AsyncStorage.getItem('member').then(response => {
      //console.log('Profilseller=======>'+ JSON.stringify(responponse));

      let data = JSON.parse(response);
      //const val = JSON.stringify(data);

      console.log('Homeseller ==> ' + JSON.stringify(data));

      setState(state => ({
        ...state,
        mb_id: data.value.mb_id,
        mb_name: data.value.mb_name,
        mb_email: data.value.mb_email,
        mb_phone: data.value.mb_phone,
        mb_type: data.value.mb_type,
        picture: data.value.picture,
        retail_id: data.retail_id,
      }))
      // console.log('RTL ID ' + JSON.stringify(state.retail_id));

    }).catch(err => {
      console.log('err', err)
    })

    // //untuk ambil retail name dilempar ke button
    // AsyncStorage.getItem('setTrans').then(response => {
    //   //console.log('Profilseller=======>'+ JSON.stringify(responponse));

    //   let data = JSON.parse(response);
    //   //const val = JSON.stringify(data);

    //   console.log('Transaksi ==> ' + JSON.stringify(data));

    //   setState(state => ({
    //     ...state,
    //     rtl_name: data.data.rtl_name,
    //   }))
    //   console.log('RTL name ' + JSON.stringify(state.rtl_name));

    // }).catch(err => {
    //   console.log('err', err)
    // })

    getSaldo()
    getRekening()

  }, [])


  const getRekening = () => {
    let mbid = props.navigation.state.params.mb_id;
    // https://market.pondok-huda.com/publish/react/rekening/member/MB000000002/Q4Z96LIFSXUJBK9U6ZACCB2CJDQAR0XH4R6O6ARVG
    axios.get(svr.url + 'rekening/member/' + mbid + '/' + svr.api)
      .then(response => {
        console.log('cek response = ' + JSON.stringify(response));

        setState(state => ({
          ...state,
          rekening: response.data.data,
        }))
        //  AsyncStorage.setItem('setTrans', JSON.stringify(state.rekening))
        //  console.log('cekk = ', state.rtl_name)


      }).catch(error => {
        console.log('error response ==> ', error.response.data);
      });
  }


  const getSaldo = () => {
    let rtlid = props.navigation.state.params.retail_id;
    axios.get(svr.url + 'transaksi/getsaldo/' + rtlid + '/' + svr.api)
      .then(response => {
        console.log('cek response = ' + JSON.stringify(response));
        if (response.data.status === 200) {

          console.log('RESPONSE GET SALDO = ' + JSON.stringify(response.data));
          AsyncStorage.setItem('setTrans', JSON.stringify(response.data))
          setState(state => ({
            ...state,
            si_id: response.data.data,
            saldo: response.data.data[0].saldo,
            rtl_name: response.data.data[0].rtl_name
          }))
          console.log('cekk = ', state.rtl_name)

        } else {
          alert('Saldo anda belum ada!')
          console.log('Ipaymu status = ', response.data);
        }
      }).catch(error => {
        console.log('error response ==> ', error.response.data);
      });
  }


  //FUNGSI REFRESH DATA TERBARU GET ORDER DENGAN MENGOSONGKAN DATA SEBELUMNYA
  const refresh = async () => {
    let rtlid = props.navigation.state.params.retail_id;
    axios.get(svr.url + 'transaksi/getsaldo/' + rtlid + '/' + svr.api)
      .then(response => {
        console.log('cek response = ' + JSON.stringify(response));
        if (response.data.status === 200) {
          console.log('RESPONSE GET SALDO = ' + JSON.stringify(response.data));
          setState(state => ({
            ...state,
            si_id: response.data.data,
            saldo: response.data.data[0].saldo,
            rtl_name: response.data.data[0].rtl_name
          }))
          console.log('cekk = ', state.rtl_name)

        } else {
          console.log('Ipaymu status = ', response.data);
        }
      }).catch(error => {
        console.log('error response ==> ', error.response.data);
      });
  }

  return (
    <View style={styles.container}>

      <BackHeader
        title={'Saldo Penjual'}
        onPress={() => props.navigation.goBack()}
      />

      <ScrollView vertical={true} style={{ height: 500 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
          />}
      >

        <View style={{ height:500}}>
          <View style={styles.bodySaldo}>
            <Text style={styles.txtSaldo}>Saldo Anda</Text>
            <NumberFormat
              value={state.saldo}
              displayType={'text'}
              thousandSeparator={'.'}
              decimalSeparator={','}
              prefix={'Rp. '}
              renderText={formattedValue => <Text style={styles.txtHarga}>{formattedValue}</Text>} // <--- Don't forget this!
            />
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Pressable style={styles.btnSaldo} onPress={() => NavigatorService.navigate('PenarikanSaldo', { mb_id: state.mb_id, retail_id: state.retail_id, rtl_name: state.rtl_name })} >
              <Image source={allLogo.icatm} style={styles.icatm} />
              <Text style={{ bottom: toDp(5), }}>Penarikan Uang</Text>
            </Pressable>
            <Pressable style={styles.btnHarga} onPress={() => NavigatorService.navigate('RiwayatTransaksi', {retail_id: state.retail_id})}>
              <Image source={allLogo.ictransaksi} style={styles.ictransaksi} />
              <Text style={{ bottom: toDp(5), }}>Riwayat Transaksi</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 900,
    // backgroundColor: 'cyan'
  },
  bodySaldo: {
    backgroundColor: '#2A334B',
    width: toDp(335),
    height: toDp(100),
    top: toDp(10),
    borderRadius: toDp(8),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
  txtSaldo: {
    fontSize: toDp(15),
    bottom: toDp(8),
    color: 'white'
  },
  txtHarga: {
    fontSize: toDp(25),
    color: '#F83308'
  },
  btnSaldo: {
    backgroundColor: '#f8f9f9',
    marginHorizontal: toDp(5),
    width: toDp(160),
    right: toDp(5),
    top: toDp(20),
    borderRadius: toDp(8),
    height: toDp(55),
    justifyContent: 'flex-end',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,

  },
  btnHarga: {
    backgroundColor: '#f8f9f9',
    width: toDp(160),
    top: toDp(20),
    borderRadius: toDp(8),
    height: toDp(55),
    justifyContent: 'flex-end',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icatm: {
    width: toDp(19),
    height: toDp(20.58),
    bottom: toDp(8),
    tintColor: '#F83308'
  },
  ictransaksi: {
    width: toDp(19),
    height: toDp(20),
    bottom: toDp(8),
    tintColor: '#F83308'
  }
});

export default Saldopenjual;