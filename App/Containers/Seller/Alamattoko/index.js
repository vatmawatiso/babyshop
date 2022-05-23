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

    getAlamat()
  }, [])

  const getAlamat = () => {
   let mb_id = props.navigation.state.params.adr_mb_id;
    axios.get('https://market.pondok-huda.com/dev/react/addres/?mb_id='+ mb_id)
      .then(result => {
        //hendle success
        if(result.data.status==200){
          setState(state => ({ ...state, datas: result.data.data}))
          console.log('Toko Bangunan FIKS ===> ', result)
        }
      
      }).catch(err => {
        alert('Gagal menerima data dari server!' + err)
        setState(state => ({ ...state, loading: false }))
      })
  }

  
   //=======> POST Alamat Utama <=======//

   useEffect(() => {
 
    AsyncStorage.getItem('member').then(response => {
      // console.log('Profil----------->'+ JSON.stringify(response));
 
      let data    =  JSON.parse(response);
      // const val = JSON.stringify(data);
 
      console.log('Jadikan Alamat Utama----------->'+ JSON.stringify(data));
 
      setState(state => ({...state,
        adr_mb_id: data.adr_mb_id,
        adr_id: data.adr_id,
      }))
 
 
    }).catch(err => {
      console.log('err', err)
    })
 
  }, [])

  const alamatUtama = async (idm,adr_address,adr_cty_id) => {
    const body = {
      adr_mb_id: state.mb_id,
    }
    console.log('Body Alamat====> '+ JSON.stringify(body));
 
    setState(state => ({...state, loading: true }))
    let id = idm;
    axios.post('https://market.pondok-huda.com/dev/react/addres/?adr_id='+ idm, body)
    .then(response =>{
 
      console.log('-----ALAMAT UTAMA=====>'+JSON.stringify(response.data));
 
      if(response.data.status==200){

        const ALAMAT = {     
          id: idm,  
          address: adr_address,
          city: adr_cty_id                                         
        }

        if (ALAMAT.address.length === 0) {
          alert('Nama Pengguna atau Kata Sandi Salah!')
        } else {
          //save Async Storage
          console.log('Jadikan Alamat Utama===>'+JSON.stringify(ALAMAT));

          AsyncStorage.setItem('setAlamat', JSON.stringify(ALAMAT)) 
        

        }

        alert('Berhasil Menambahkan Alamat Utama')
        NavigatorService.navigate('Settingtoko', { adr_mb_id: state.adr_id });
 
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

  const selectAlamat = (adr_id) => {
    NavigatorService.navigate('Editalamat', {adr_id: adr_id})
  }


  const ListAlamat = (item, index, onPress, onSetutama) => (
    <View style={[styles.body, { marginTop: toDp(5), marginHorizontal: toDp(12), top:toDp(50) }]}>
      <TouchableOpacity style={{ width: toDp(330) }} onPress={() => onPress()}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: toDp(10) }}>
          <Image source={allLogo.icaddress1} style={styles.icaddress1} />
          <Text style={styles.txtAddress}>Alamat Pengiriman</Text>
        </View>
        <View style={{ flexDirection: 'row', left: toDp(60), top: toDp(15) }}>
          <View>
            <Text>{item.mb_name} {item.mb_phone}</Text>
            <Text>{item.adr_address} {item.cty_name}</Text>
            <TouchableOpacity style={styles.btnAlamatUtama} onPress={() => onSetutama()}>
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
        <FlatList style={{ width: '100%' }}
          data={state.datas}
          renderItem={({ item, index }) => {
            return (
              ListAlamat(item, index, () => selectAlamat(item.adr_id), ()=> alamatUtama(item.adr_id,item.adr_address,item.cty_name))
            )
          }}
          ListFooterComponent={() => <View style={{ height: toDp(120) }} />}
        />
      </View>


      <Pressable style={{ bottom:toDp(600), top:toDp(0) }} onPress={() => NavigatorService.navigate('Tambahalamat')}>
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
    // justifyContent:'center',
    alignItems: 'center',
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
    marginBottom: toDp(30)
  },
  txtAlamatUtama: {
    fontWeight: 'bold'
  }
});

export default Alamattoko;