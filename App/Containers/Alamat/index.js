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


const Alamat = (props) => {

  const [state, setState] = useState({
    datas: [],
    adr_mb_id: '',
    adr_id:'',
    mb_id: '',
    mb_name: '',
    cty_name: '',
    adr_address: ''
  })

  useEffect(() => {

    AsyncStorage.getItem('uid').then(uids => {
      // console.log('ids', uids)
      let ids = uids;
      setState(state => ({
        ...state,
        mb_id: ids,
      }))
      // console.log(ids)
    }).catch(err => {
      console.log('err', err)
    })

    getAlamatClient()
  }, [])

  const getAlamatClient = () => {
    let mb_id = props.navigation.state.params.adr_mb_id;
    axios.get('https://market.pondok-huda.com/dev/react/addres/?mb_id=' + mb_id)
      .then(result => {
        //hendle success
        if (result.data.status == 200) {
          setState(state => ({ ...state, datas: result.data.data }))
          console.log('Toko Bangunan FIKS ===> ', result)
        }

      }).catch(err => {
        alert('Gagal menerima data dari server!' + err)
        setState(state => ({ ...state, loading: false }))
      })
  }

   //=======> POST Alamat Utama <=======//

   const alamatUtama = async () => {
    const body = {
      // adr_id:state.adr_id,
      adr_mb_id: state.adr_mb_id,
      // adr_address: state.adr_address,
      // adr_cty_id: state.adr_cty_id
    }
    console.log('Body Alamat====> '+ JSON.stringify(body));

    setState(state => ({...state, loading: true }))
    let ids = props.navigation.state.params.adr_id;
    axios.post('https://market.pondok-huda.com/dev/react/addres/?adr_id=', body)
    .then(response =>{

      console.log('-----ALAMAT UTAMA=====>', response.data);

      if(response.data.status==200){
        alert('Berhasil Menambahkan Alamat Utama')
        NavigatorService.navigate('Profilone', { adr_mb_id: state.adr_id });
        
        console.log('HASIL ALAMAT UTAMA ==> : ', response.data)
        setState(state => ({...state, loading: false }))    
        
      }else{
        alert('Gagal Tambah Alamat Utama!')
        setState(state => ({...state, loading: false }))
        console.log('-----COBA=====>'+ JSON.stringify(response.data));
      }

    }).catch(err =>{
      //console.log(err)
      alert('Gagal menerima data dari server!'+err)
      setState(state => ({...state, loading: false }))
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

  const selectAlamat = (value, adr_id,) => {
    NavigatorService.navigate('Editalamat', {value, adr_id: adr_id})
  }

  const ListAlamatClient = (item, value, index) => (
    <View style={[styles.body, { marginTop: toDp(5), marginHorizontal: toDp(12) }]}>
      <TouchableOpacity style={{ width: toDp(330) }} onPress={() => NavigatorService.navigate('Editalamat')}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: toDp(10) }}>
          <Image source={allLogo.icaddress1} style={styles.icaddress1} />
          <Text style={styles.txtAddress}>Alamat Pengiriman</Text>
        </View>
        <View style={{ flexDirection: 'row', left: toDp(60), top: toDp(15) }}>
          <View>
            <Text>{item.mb_name} {item.mb_phone}</Text>
            <Text>{item.adr_address} {item.cty_name}</Text>
            <TouchableOpacity style={styles.btnAlamatUtama} onPress={() => alamatUtama()}>
              <Text style={styles.txtAlamatUtama}>Jadikan Alamat Utama</Text>
            </TouchableOpacity>
          </View>
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
        <FlatList style={{ width: '100%', marginTop: toDp(30) }}
          data={state.datas}
          renderItem={({ item, index }) => {
            return (
              ListAlamatClient(item, index, () => selectAlamat(item.adr_id))
            )
          }}
          ListFooterComponent={() => <View style={{ height: toDp(120) }} />}
        />
      </View>

      <Pressable style={{ bottom: toDp(610), backgroundColor: '#C4C4C4', borderRadius: toDp(20), width: toDp(335), left: toDp(12) }} onPress={() => NavigatorService.navigate('TambahAlamat')}>
        <View style={styles.btnAddress}>
          <Text style={styles.txtBtnAddress}>Tambah Alamat Baru</Text>
          <Image source={allLogo.icplus} style={styles.icplus} />
        </View>
      </Pressable>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  body: {
    backgroundColor: '#C4C4C4',
    width: toDp(335),
    height: toDp(105),
    borderRadius: toDp(20),
    flexDirection: 'row',
    top: toDp(10)
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
    backgroundColor: '#C4C4C4',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: toDp(335),
    height: toDp(32),
    borderRadius: toDp(20),
  },
  icplus: {
    width: toDp(12),
    height: toDp(12),
    top: toDp(10),
    right: toDp(10)
  },
  txtBtnAddress: {
    top: toDp(5),
    left: toDp(10)
  },
  flatcontent: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: toDp(45)
  },
  btnAlamatUtama: {
    top: toDp(8),
    height: toDp(30)
  },
  txtAlamatUtama: {
    fontWeight: 'bold'
  }
});

export default Alamat;