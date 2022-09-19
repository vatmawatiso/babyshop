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
  ScrollView,
  FlatList
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import BackHeader from '@BackHeader'
import NavigatorService from '@NavigatorService'
import { TextInput } from "react-native-gesture-handler";
import axios from "axios";
import { svr } from "../../../Configs/apikey";
import NumberFormat from 'react-number-format';


const RiwayatTransaksi = (props) => {

  const [src, setSrc] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [state, setState] = useState({
    riwayat: []
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

    getRiwayat()

  }, [])


  const getRiwayat = () => {
    let rtlid = props.navigation.state.params.retail_id;
    // https://market.pondok-huda.com/publish/react/transaksi/riwayat/RTL00000001/Q4Z96LIFSXUJBK9U6ZACCB2CJDQAR0XH4R6O6ARVG
    axios.get(svr.url + 'transaksi/riwayat/' + rtlid + '/' + svr.api)
      .then(response => {
        console.log('cek response = ' + JSON.stringify(response.data));

        setState(state => ({
          ...state,
          riwayat: response.data.data,
          // jenis: response.data.data[0].jenis_transaksi
        }))
        //  AsyncStorage.setItem('setTrans', JSON.stringify(state.jenis))

      }).catch(error => {
        console.log('error response ==> ', error.response.data);
      });
  }


  const ListRiwayat = (item, index) => (
    <View style={styles.bodyTengah}>
      <View>
        <Text style={{ fontWeight: 'bold' }}>{item.tanggal}</Text>
        <Text>Jenis Transaksi</Text>
        <Text>Tabungan</Text>
        <Text>Oleh/Dari</Text>
      </View>
      <View style={{ alignItems: 'flex-end', width: '50%' }}>

        {item.jenis_transaksi == 'Saldo Masuk' ?
          (
           
              <NumberFormat
                value={item.saldo}
                displayType={'text'}
                thousandSeparator={'.'}
                decimalSeparator={','}
                prefix={'-Rp '}
                renderText={formattedValue => <Text style={{ color: '#f83308', fontWeight: 'bold' }}>{formattedValue}</Text>} // <--- Don't forget this!
              />
           
          ) : null
        }

        {item.jenis_transaksi == 'Penarikan Saldo' ?
          (
           
              <NumberFormat
                value={item.saldo}
                displayType={'text'}
                thousandSeparator={'.'}
                decimalSeparator={','}
                prefix={'+Rp '}
                renderText={formattedValue => <Text style={{ color: '#209849', fontWeight: 'bold' }}>{formattedValue}</Text>} // <--- Don't forget this!
              />
           
          ) : null
        }

        <Text>{item.jenis_transaksi}</Text>
        <Text>{item.bukutabungan}</Text>
        <Text>{item.dikirim_oleh}</Text>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>

      <BackHeader
        title={'Saldo Penjual'}
        onPress={() => props.navigation.goBack()}
      />

      <View style={styles.bodyAtas}>
        <View>
          <Text style={{ color: '#FFF' }}>Nama</Text>
          <Text style={{ color: '#FFF', marginTop: toDp(5) }}>Jenis Transaksi</Text>
        </View>
        <View style={{ alignItems: 'flex-end', width: '60%' }}>
          <Text style={{ color: '#FFF' }}>{state.mb_name}</Text>
          <Text style={{ color: '#FFF', marginTop: toDp(5) }}>Semua</Text>
        </View>
      </View>

      <View style={styles.flatcontent}>
        <FlatList style={{ width: '100%', height:'100%', paddingBottom:toDp(50) }}
          data={state.riwayat}
          renderItem={({ item, index }) => {
            return (
              ListRiwayat(item, index)
            )
          }}
          ListFooterComponent={() => <View style={{ height:300 }} />}
        />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height:'100%'
    // height: 900,
    // backgroundColor: 'cyan'
  },
  flatcontent: {
    alignItems: 'center',
    justifyContent: 'center'
},
  bodyAtas: {
    backgroundColor: '#2A334B',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: toDp(340),
    marginTop: toDp(15),
    height: toDp(65),
    padding: toDp(10),
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
  bodyTengah: {
    backgroundColor: '#FFF',
    marginTop: toDp(10),
    width: toDp(340),
    height: toDp(100),
    borderRadius: toDp(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: toDp(10),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
  },
  body: {
    backgroundColor: '#FFF',
    marginTop: toDp(20),
    width: toDp(340),
    height: toDp(100),
    borderRadius: toDp(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: toDp(10),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
  }

});

export default RiwayatTransaksi;