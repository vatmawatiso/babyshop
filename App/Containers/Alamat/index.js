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
  AsyncStorage,
  RefreshControl
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import  BackHeader  from '@BackHeader'
import NavigatorService from '@NavigatorService'
import axios from "axios";

const Alamat = (props) => {
  const [refreshing, setRefreshing] = useState(false);
    const [state, setState] = useState ({
      datas: [],
      adr_mb_id: '',
      adr_id:'',
      mb_id: '',
      mb_name: '',
      cty_name: '',
      adr_address: ''
    })

    useEffect (() => {
    // // get data pengguna
    AsyncStorage.getItem('member').then(response => {
      //console.log('Editprofil ------->' + JSON.stringify(response));

      let data = JSON.parse(response);
      //const val = JSON.stringify(data);

      console.log('Editprofil ====>', response);

      setState(state => ({
        ...state,
        mb_id: data.value.mb_id,
        mb_name: data.value.mb_name,
        mb_username: data.value.mb_username,
        mb_email: data.value.mb_email,
        mb_phone: data.value.mb_phone,
        mb_type: data.value.mb_type,
        picture: data.value.picture
      }))
    }).catch(err => {
      console.log('err', err)
    })

    // get id pengguna
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
      const ids = props.navigation.state.params.mb_id
      axios.get('https://market.pondok-huda.com/dev/react/addres/member/'+ ids)
      .then (response => {
        if (response.data.status == 200) {
          console.log(response);
          setState(state => ({...state, datas: response.data.data}))
        } else if (response.data.status == 404) {
          console.log('not found', response)
        }
      }).catch(error => {
        console.log(error)
      })
    }

    const deleteAlamat = (adr_id) => {
      // const adr = props.navigation.state.params.adr_id
      axios.delete('https://market.pondok-huda.com/dev/react/addres/'+adr_id)
      .then(response => {
        console.log('Profilefiks----------->'+ JSON.stringify(response));
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

    const refresh = () =>{
      setState(state => ({...state, loading: true }))
      const aid = props.navigation.state.params.mb_id
        axios.get('https://market.pondok-huda.com/dev/react/addres/member/'+aid)
        .then(result =>{
            if(result.data.status==200){
              setState(state => ({...state, datas: result.data.data}))
              console.log('refresh =>', result)
            }else if(result.data.status==404){
              alert('Data tidak ditemukan!')
            }
        })
        .catch(err =>{
          console.log(err)
          alert('Gagal menerima data dari server!')
          setState(state => ({...state, loading: false }))
        })
      }
    const setAlamatUtama = (adr_id, adr_address, adr_cty_id) => {
     const body = {
        adr_id: adr_id
      }
        axios.post('https://market.pondok-huda.com/dev/react/addres/?adr_id='+state.mb_id+'/', body)
          .then(response => {
            console.log('alamat utama =>', response)
            if(response.data.status == 200) {
              const alamatUtama = {
                id: adr_id,
                address: adr_address,
                city: adr_cty_id
              }

              if (alamatUtama.address.length === 0){
                alert('Data tidak ditemukan')
              } else {
                console.log('alamat utama => ', alamatUtama);
                AsyncStorage.setItem('alamatUtama', JSON.stringify(alamatUtama))
              }
              alert('berhasil menambahkan halaman utama')
              NavigatorService.navigate('Profilone', {adr_id: state.adr_id})
            }else{
              alert('gagal')
            }
          }).catch(error => {
            console.log('error', error)
          })
      }

    const selectAlamat = (value, adr_id, cty_name, adr_address) => {
      NavigatorService.navigate('Editalamat', {value, adr_id: adr_id, cty_name: cty_name, adr_address: adr_address })
    }
    const ListAlamat = (item, value, onPress, onPressAlamatUtama) => (
      <TouchableOpacity style={{ width: toDp(330) }} onPress={() => onPress()}>
      <View style={[styles.Address, { marginTop: toDp(5), marginHorizontal: toDp(12) }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: toDp(10) }}>
            <Image source={allLogo.icaddress1} style={styles.icaddress1} />
              <Text style={styles.txtAddress}>Alamat Pengiriman</Text>
                <View style={styles.viewDelete}>
                  <TouchableOpacity onPress={() => deleteAlamat(item.adr_id)}>
                <Image source={allLogo.ic_delete} style={styles.icDelete}/>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flexDirection: 'row', left: toDp(60), top: toDp(15) }}>
            <View>
              <Text>{item.mb_name} {item.mb_phone}</Text>
              <Text>{item.adr_address} {item.cty_name}</Text>
                <TouchableOpacity style={styles.btnAlamatUtama} onPress={() => onPressAlamatUtama()}>
                  <Text style={styles.txtAlamatUtama}>Jadikan Alamat Utama</Text>
                </TouchableOpacity>
            </View>
        </View>
      </View>
      </TouchableOpacity>
    )
     return (
      <View style={styles.container}>
         <BackHeader
          title={'Alamat'}
          onPress={() => props.navigation.goBack()}
        />
          <ScrollView vertical={true} style={{width:'100%', height:'100%'}}
          refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
          />}
        >
        <View style={styles.flatcontent}>
        <Pressable style={{backgroundColor:'#C4C4C4', borderRadius:toDp(20), top: toDp(8)}} onPress={ () => NavigatorService.navigate('TambahAlamat', {mb_id: state.mb_id})}>
            <View style={styles.btnAddress}>
                <Text style={styles.txtBtnAddress}>Tambah Alamat Baru</Text>
                <Image source={allLogo.icplus} style={styles.icplus} />
            </View>
        </Pressable>
          <FlatList style={{ width: '100%' }}
            data={state.datas}
            renderItem={({ item, index, value }) => {
              return (
                ListAlamat(item, index, () => selectAlamat(value, item.adr_id, item.cty_name, item.adr_address), ()=> setAlamatUtama(item.adr_id, item.adr_address, item.cty_name) )
              )
            }}
            ListFooterComponent={() => <View style={{ height: toDp(120) }} />}
          />
      </View>
      </ScrollView>
    </View>
    );
  
}

const styles = StyleSheet.create({
  container: {
    justifyContent:'center',
    alignItems: 'center',
  },
  Address: {
      backgroundColor:'#C4C4C4',
      width:toDp(335),
      height:toDp(105),
      borderRadius:toDp(20),
      top:toDp(10),
      // flexDirection:'column',
  },
  icaddress1: {
    marginLeft:toDp(10),
    top:toDp(10)
  },
  txtAddress: {
      marginLeft:toDp(20),
      top:toDp(10),
      fontSize: toDp(18),
      fontWeight: 'bold'
  },
  btnAlamat: {
    // backgroundColor:'cyan',
    bottom:toDp(55),
    left:toDp(24),
    width:toDp(286),
    height:toDp(70)
  },
  icaddress: {
      width:toDp(15),
      height:toDp(15),
      left:toDp(248),
      bottom:toDp(25)
  },
  btnAddress: {
    //   backgroundColor:'#C4C4C4',
      flexDirection:'row',
      justifyContent:'space-between',
      width:toDp(335),
      height:toDp(32),
      // borderRadius:toDp(20),
  },
  icplus: {
      width:toDp(12),
      height:toDp(12),
      top:toDp(10),
      right:toDp(10)
  },
  txtBtnAddress: {
      top:toDp(5),
      left:toDp(10)
  },
  flatcontent: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: toDp(30)
  },
  btnAlamatUtama: {
    top: toDp(8),
    height: toDp(30)
  },
  txtAlamatUtama: {
    fontWeight: 'bold'
  },
  viewDelete: {
    alignItems: 'flex-end',
    height: toDp(20),
    width: toDp(120),
    top: '3%',
    left: '100%'
  },
  icDelete: {
    width: toDp(18),
    height: toDp(20), 
  }
});

export default Alamat;