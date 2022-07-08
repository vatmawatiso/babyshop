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

  const deleteAlamat = (adr_id) => {
    // const adr = props.navigation.state.params.adr_id
    axios.delete('https://market.pondok-huda.com/dev/react/addres/'+adr_id)
    .then(response => {
      console.log('Alamat '+ JSON.stringify(response));
      if(response.data.status === 200 ){
        console.log(response);
        alert('Berhasil menghapus alamat')
        refresh()
        setState(state => ({...state, datas: response.data.data}))
      } else if (response.data.status === 500) {
        alert('gagal')
        console.log(response)
      }
    }).catch(error => {
      console.log(error)
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
    <View style={styles.body}>
      <TouchableOpacity style={{ width: toDp(330) }} onPress={() => onPress()}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: toDp(10) }}>
          <Image source={allLogo.location} style={styles.icaddress1} />
          <Text style={styles.txtAddress}>Alamat Pengiriman</Text>
        </View>
        <View style={{ flexDirection: 'row', left: toDp(60), top: toDp(15) }}>
          <View style={styles.viewAlamat}>
            <Text>{item.adr_name} {item.adr_hp}</Text>
            <Text>{item.adr_address} {displayName(item.cty_name)}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btndelete} onPress={() => deleteAlamat(item.adr_id)}>
        <Image source={allLogo.delete} style={styles.imgdelete} />
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

      <Pressable style={{ bottom: toDp(610), width: toDp(335), left: toDp(12) }} onPress={() => NavigatorService.navigate('TambahAlamat')}>
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
  imgdelete: {
    width:toDp(20), 
    height:toDp(22), 
    tintColor:'#F83308'
  },
  btndelete:{
    right:toDp(30), 
    height:toDp(25),
    alignSelf:'flex-end', 
    bottom:toDp(10)
  },
  body: {
    backgroundColor: '#F9F8F8',
    width: toDp(335),
    height: toDp(110),
    borderRadius: toDp(10),
    marginBottom: toDp(10),
    marginTop: toDp(5), 
    marginHorizontal: toDp(12),
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
    width: toDp(38),
    height: toDp(38),
    right: toDp(8),
    marginLeft: toDp(10),
    top: toDp(10)
  },
  txtAddress: {
    marginLeft: toDp(2),
    top: toDp(10),
    fontWeight:'bold'
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
  },
  viewAlamat: {
    bottom:toDp(5)
  }
});

export default Alamattoko;
