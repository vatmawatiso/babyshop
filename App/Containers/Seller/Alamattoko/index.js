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
  ScrollView,
  AsyncStorage
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import BackHeader from '@BackHeader'
import NavigatorService from '@NavigatorService'
import axios from "axios";

const Alamattoko = (props) => {

  const [state, setState] = useState({
    datas: [],
    adr_mb_id: '',
    mb_id: ''
  })


  useEffect(() => {
    getAlamat()
  }, [])

  const getAlamat = () => {
    let mb_id = props.navigation.state.params.adr_mb_id;
    axios.get('https://market.pondok-huda.com/dev/react/addres/member/' + mb_id)
      .then(result => {
        //hendle success
        if (result.data.status == 200) {
          setState(state => ({ ...state, datas: result.data.data }))
          console.log('Toko Bangunan FIKS ===> ', result)
        }
        console.log(result);
      }).catch(err => {
        //alert('Gagal menerima data dari server!' + err)
        console.log(err);
        setState(state => ({ ...state, loading: false }))
      })
  }


  const Address = [
    {
      id: '1',
      nama: 'Vatmawati',
      telepon: '083141520987',
      alamat: 'Jl KiSulaiman Kota Cirebon Jawa Barat '
    },
  ]

  const ListAlamat = (item, index, onPress) => (
    <View style={[styles.body, { marginTop: toDp(5), marginHorizontal: toDp(12) }]}>
      <TouchableOpacity style={{ width: toDp(330) }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: toDp(10) }}>
          <Image source={allLogo.icaddress1} style={styles.icaddress1} />
          <Text style={styles.txtAddress}>Alamat Pengiriman</Text>
        </View>
        <View style={{ flexDirection: 'row', left: toDp(60), top: toDp(15) }}>
          <TouchableOpacity  onPress={() => NavigatorService.navigate('EditAlamattoko', { adr_id: adr_id })}>
          <View>
            <Text>{item.mb_name} {item.mb_phone}</Text>
            <Text>{item.adr_address} {item.cty_name}</Text>
          </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  )

  return (
    <View style={styles.container}>
      <BackHeader
        title={'Alamat'}
        onPress={() => props.navigation.goBack()}

      />

      <View style={styles.flatcontent}>
        <FlatList style={{ width: '100%', top: toDp(40) }}
          data={state.datas}
          renderItem={({ item, index }) => {
            return (
              ListAlamat(item, index, () => alamatUtama(item.adr_id))
            )
          }}
          ListFooterComponent={() => <View style={{ height: toDp(120) }} />}
        />
      </View>

      <View style={{ position: 'absolute', bottom: toDp(0), top: toDp(65), alignItems: 'center', justifyContent: 'flex-start', width: '100%' }}>
        <Pressable onPress={() => NavigatorService.navigate('Tambahalamat')}>
          <View style={styles.btnAddress}>
            <Text style={styles.txtBtnAddress}>Tambah Alamat Baru</Text>
            <Image source={allLogo.icplus} style={styles.icplus} />
          </View>
        </Pressable>
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent:'center',
    alignItems: 'center',
  },
  body: {
    backgroundColor: '#e7e7e7',
    width: toDp(335),
    height: toDp(105),
    borderRadius: toDp(20),
    flexDirection: 'row',
    top: toDp(10),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  icaddress1: {
    marginLeft: toDp(10),
    top: toDp(10)
  },
  txtAddress: {
    marginLeft: toDp(20),
    top: toDp(10)
  },
  isiAddress: {
    bottom: toDp(60),
    //   backgroundColor:'cyan',
    width: toDp(270), marginLeft: toDp(45)
  },
  icaddress: {
    width: toDp(15),
    height: toDp(15),
    left: toDp(248),
    bottom: toDp(25)
  },
  btnAddress: {
    backgroundColor: '#2A334B',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: toDp(335),
    height: toDp(32),
    borderRadius: toDp(20),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  icplus: {
    width: toDp(12),
    height: toDp(12),
    top: toDp(10),
    right: toDp(10),
    tintColor: '#fff'
  },
  txtBtnAddress: {
    top: toDp(5),
    left: toDp(10),
    color: '#fff'
  },
  flatcontent: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: toDp(45)
  },
});

export default Alamattoko;
