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
    adr_id: '',
    mb_id: '',
    mb_name: '',
    cty_name: '',
    adr_address: '',
    adr_name:''
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

    AsyncStorage.getItem('member').then(response => {
      // console.log('Profil----------->'+ JSON.stringify(response));
 
      let data    =  JSON.parse(response);
      // const val = JSON.stringify(data);
 
      //console.log('Jadikan Alamat Utama----------->'+ JSON.stringify(data));
 
      setState(state => ({...state,
        adr_mb_id: data.adr_mb_id,
        adr_id: data.adr_id,
        // mb_name:data.value.mb_name,
        // mb_phone:data.value.mb_phone,
      }))
 
 
    }).catch(err => {
      console.log('err', err)
    })
 
    getAlamatClient()
 
    props.navigation.addListener(
         'didFocus',
         payload => {
 
             getAlamatClient()
         }
   );
 
  }, [])

  const getAlamatClient = () => {
    let mb_id = props.navigation.state.params.adr_mb_id;
    console.log('Let mb_id ===> ', mb_id)
    axios.get('https://market.pondok-huda.com/dev/react/addres/?mb_id=' + mb_id)
      .then(result => {
        //hendle success
        if (result.data.status == 200) {
          setState(state => ({ ...state, datas: result.data.data }))
          console.log('Toko Bangunan FIKS ===> ', result.data.data)
        }

      }).catch(err => {
        alert('Gagal menerima data dari server!' + err)
        setState(state => ({ ...state, loading: false }))
      })
  }

  //=======> POST Alamat Utama <=======//



  const alamatUtama = async (idm, adr_address, adr_cty_id, adr_mb_name, adr_mb_phone, adr_name) => {
    const body = {
      adr_mb_id: state.mb_id,
    }
    console.log('Body Alamat====> ' + JSON.stringify(body));

    setState(state => ({ ...state, loading: true }))
    let id = idm;
    axios.post('https://market.pondok-huda.com/dev/react/addres/?adr_id=' + idm, body)
      .then(response => {

        console.log('-----ALAMAT UTAMA=====>', response.data);
        const ALAMAT = {
          id: idm,
          name: adr_mb_name,
          phone: adr_mb_phone,
          address: adr_address,
          city: adr_cty_id,
          nama: adr_name
        }

        if (response.data.status == 200) {
          alert('Berhasil Menambahkan Alamat Utama')

          if (Object.keys(ALAMAT).length === 0) {
            alert('Nama Pengguna atau Kata Sandi Salah!')
          } else {
            //save Async Storage
            console.log('Jadikan Alamat Utama===>' + JSON.stringify(ALAMAT));

            AsyncStorage.setItem('setAlamat', JSON.stringify(ALAMAT))


          }
          NavigatorService.navigate('Profilone', { adr_mb_id: state.adr_id });

          console.log('HASIL ALAMAT UTAMA ==> : ', response.data)
          setState(state => ({ ...state, loading: false }))

        } else {
          alert('Gagal Tambah Alamat Utama!')
          setState(state => ({ ...state, loading: false }))
          console.log('-----COBA=====>' + JSON.stringify(response.data));
        }

      }).catch(err => {
        //console.log(err)
        alert('Gagal menerima data dari server!' + err)
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

  const displayName = (cty_name) =>{
    let count = '';
    let nama  = '';
    count = cty_name.split(' ' || '-');
    nama  = count.slice(0, 2,).join(' ');
    return nama
}

  const selectAlamat = (adr_id,hp, alamat, cty_id, cty_name, adr_name) => {
    NavigatorService.navigate('Editalamat', { adr_id: adr_id, phone: hp, adrress: alamat, cty_id : cty_id, cty_name: cty_name, adr_name : adr_name })
  }

  const ListAlamatClient = (item, index, onPress, onSetutama) => (
    <View style={[styles.body, { marginTop: toDp(5), marginHorizontal: toDp(12) }]}>
      <TouchableOpacity style={{ width: toDp(330) }} onPress={() => onPress()}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: toDp(10) }}>
          <Image source={allLogo.location} style={styles.icLocation} />
          <Text style={styles.txtAddress}>Alamat Pengiriman</Text>
        </View>
        <View style={{ flexDirection: 'row', left: toDp(60), top: toDp(15) }}>
          <View style={styles.isiAddress}>
            <Text>{item.adr_name} {item.adr_hp}</Text>
            <Text>{item.adr_address} {displayName(item.cty_name)}</Text>
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
        <FlatList style={{ width: '100%', marginTop: toDp(30) }}
          data={state.datas}
          renderItem={({ item, index }) => {
            return (
              ListAlamatClient(item, index, () => selectAlamat(item.adr_id, item.adr_hp, item.adr_address, item.cty_id, item.cty_name, item.adr_name), () => alamatUtama(item.adr_id, item.adr_address, item.cty_name, item.mb_name, item.adr_hp))
            )
          }}
          ListFooterComponent={() => <View style={{ height: toDp(120) }} />}
        />
      </View>

      <Pressable style={styles.btnAlamat} onPress={() => NavigatorService.navigate('TambahAlamat')}>
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
    backgroundColor:'#fff'
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  btnAlamat: {
    bottom: toDp(610), 
    width: toDp(335), 
    left: toDp(12),
    backgroundColor:'#2A334B'
  },
  body: {
    backgroundColor: '#F9F8F8',
    width: toDp(335),
    height: toDp(130),
    borderRadius: toDp(10),
    marginBottom: toDp(10),
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
    marginLeft: toDp(10),
    top: toDp(5)
  },
  isiAddress: {
    bottom: toDp(10),
  },
  icLocation: {
    width: toDp(38), 
    height: toDp(38), 
    top:toDp(5)
  },
  btnAddress: {
    backgroundColor: '#F9F8F8',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: toDp(10),
    width: toDp(335),
    height: toDp(32),
    borderRadius: toDp(10),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    
    elevation: 3,
  },
  icplus: {
    width: toDp(12),
    height: toDp(12),
    top: toDp(10),
    right: toDp(10)
  },
  txtBtnAddress: {
    top: toDp(5),
    left: toDp(10),
    fontWeight: 'bold'
  },
  flatcontent: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnAlamatUtama: {
    top: toDp(8),
    height: toDp(30)
  },
  txtAlamatUtama: {
    fontWeight: 'bold',
    color: '#F83308'
  }
});

export default Alamat;
