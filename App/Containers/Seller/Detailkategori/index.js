import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ImageBackground,
  Pressable,
  FlatList,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import BackHeader from '@BackHeader'
import Profiltoko from '@Profiltoko'
import NavigatorService from '@NavigatorService'
import axios from 'axios';

const Kategori = (props) => {
  const [src, setSrc] = useState(null);

  const [state, setState] = useState({
    mb_id:'',
    picture: '../../../Assets/img/tzuyu.jpg',
    mb_name: '',
    mb_type:'',
    mb_phone: '',
    mb_email: '',
    datas: [],
    isLoading: true,
    isError: false,
    modalVisible: false,
    option: {
      width:750,
      height: 750,
      cropping: true,
    }
  })

  useEffect(() => {
    AsyncStorage.getItem('member').then(response => {
      //console.log('Profilseller=======>'+ JSON.stringify(responponse));

      let data = JSON.parse(response);
      //const val = JSON.stringify(data);

      //console.log('Profilseller ------->'+ JSON.stringify(response));

      setState(state => ({
        ...state,
        id: data.mb_id,
        mb_name: data.value.mb_name,
        mb_email: data.value.mb_email,
        mb_phone: data.value.mb_phone,
        mb_type: data.value.mb_type,
        picture: data.value.picture
      }))

    }).catch(err => {
      console.log('err', err)
    })

  }, [])

  const refresh = () => {
    setState(state => ({ ...state, loading: true }))
    axios.get('https://market.pondok-huda.com/dev/react/registrasi-member/' + state.mb_id)
      .then(result => {
        if (result.data.status == 200) {
          const datas = {
            id: result.data.value[0].mb_id,
            value: result.data.data[0]
          }
          if (datas.value.length === 0) {
            alert('Tidak ada data!')
          } else {
            //save Asyn Storage
            try {
              AsyncStorage.setItem('member', JSON.stringify(datas))
            } catch (e) {
              alert('Error' + e)
            }
            getData()
            console.log('===>>' + JSON.stringify(datas.value));
          }
          setState(state => ({ ...state, loading: false }))
        } else if (result.data.status == 400) {
          alert('Data tidak ditemukan!')
          setState(state => ({ ...state, loading: false }))
        }
      })

      .catch(err => {
        console.log(err)
        alert('Gagal menerima data dari server!')
        setState(state => ({ ...state, loading: false }))
      })
  }

  const DATA = [
    {
      id: '2938492',
      nama: 'TB Jaya Abadi Bandung',
      memberUser: 'Member Classic',
      pengikutUser: 'Pengikut (100)',
      mengikutiUser : 'Mengikuti (4)',
      type: 'Pembeli',
      image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    },
  ]

  useEffect(() => {
    category()

  }, [])

  // const countries = ["Jakarta", "Cirebon", "Bandung", "Kuningan"]

  const category = () => {
    // setState(state => ({...state, loading: true }))
    axios.get('https://market.pondok-huda.com/dev/react/category/')
      .then(result => {
        // handle success
        setState(state => ({ ...state, datas: result.data.data }))
        console.log('----Katagori=====>' + JSON.stringify(result.data.data));
        // alert(JSON.stringify(result.data));

      }).catch(err => {
        //console.log(err)
        alert('Gagal menerima data dari server!' + err)
        setState(state => ({ ...state, loading: false }))
      })
  }

  const ListKategori = (item, index) => {
    return (
      <View style={{ marginTop: toDp(0), width: '100%' }}>
        <View style={{ flexDirection: 'row', marginHorizontal: toDp(0), height: toDp(50), alignItems: 'center', justifyContent: 'space-between' }}>
          <TouchableOpacity style={styles.btnKategori} onPress={() => NavigatorService.navigate('Produksaya')}>
            <View style={{ right: toDp(0) }}>
              <Text style={{ fontSize: toDp(13), left: toDp(0) }}>{item.ctg_name}</Text>
            </View>
          </TouchableOpacity>
          <Image source={allLogo.iclineright} style={styles.iclineright} />
        </View>
        <View style={{ borderWidth: toDp(0.5), borderColor: 'grey', bottom: toDp(0), width: toDp(330), left: toDp(2.5) }} />
      </View>
    )
  }


  return (
    <View style={styles.container}>

      <BackHeader
        title={'Kategori'}
        onPress={() => props.navigation.goBack()}
      />

      <View style={styles.bodyProfil}>
        <View style={styles.profil1}>
          <Image source={state.picture ? { uri: state.picture } :
            require('../../../Assets/img/tzuyu.jpg')}
            style={styles.imgProfil} />
          <View style={{ marginLeft: toDp(80) }}>
            <Text style={styles.txtProfil1}>{state.mb_name}</Text>
          </View>
        </View>

        <Text style={styles.txtMember}>{DATA[0].memberUser}</Text>

        <View style={styles.profil2}>
          <Text style={styles.txtPengikut}>{DATA[0].pengikutUser}</Text>
          <Text style={styles.txtMengikuti}>{DATA[0].mengikutiUser}</Text>
        </View>

        <View style={styles.profil3}>
          <Pressable style={styles.btnPembayaran}>
            <Image source={allLogo.icwallet} style={styles.icwallet} />
            <Text style={styles.txtPembayaran}>Pembayaran</Text>
          </Pressable>

          <Pressable style={styles.btnPengiriman} onPress={() => NavigatorService.navigate('Pengiriman')} >
            <Image source={allLogo.icstore} style={styles.icstore} />
            <Text style={styles.txtPengiriman}>Pengiriman</Text>
          </Pressable>

        </View>
      </View>

      <View style={styles.BodyKategori}>
        <View style={{ top: toDp(10), justifyContent: 'center', alignItems: 'center' }}>

          <View style={{ marginTop: toDp(0) }}>
            <FlatList
              numColumns={1}
              data={state.datas}
              renderItem={({ item, index }) => {
                return (
                  ListKategori(item, index)
                )
              }}
              ListFooterComponent={() => <View style={{ height: toDp(60), width: toDp(335) }} />}
            />
          </View>
        </View>
      </View>

      <View style={{ position: 'absolute', bottom: 0, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <Pressable style={[styles.btnKonfirm, { width: toDp(335) }]} onPress={() => NavigatorService.navigate('Tambahkategori')}>
          <Text style={styles.txtKonfirm}>Tambah Kategori</Text>
        </Pressable>
      </View>

    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1
  },
  bodyProfil: {
    backgroundColor:'#2A334B',
    width:toDp(335),
    height:toDp(116),
    borderRadius:toDp(20),
    top:toDp(10),
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.20,
      shadowRadius: 1.41,
      
      elevation: 2,
  },
  imgProfil: {
    height: toDp(50),
    width: toDp(50),
    top: toDp(25),
    left: toDp(25),
    borderRadius: toDp(25)
  },
  profil1: {
    flexDirection:'row',
    right:20
    
  },
  profil2: {
    flexDirection:'row',
    justifyContent:'center',
    right:toDp(40),
  },
  txtProfil1: {
    // marginLeft:toDp(25),
    marginTop:toDp(20),
    fontSize:toDp(13),
    color:'white'
  }, 
  txtMember: {
    textAlign:'center',
    right:toDp(45),
    fontSize:toDp(12),
    color:'white'
  },
  txtMengikuti: {
    left:toDp(10),
    fontSize:toDp(12),
    color:'white'
  },
  txtPengikut: {
    fontSize:toDp(12),
    color:'white'
  },
  profil3: {
    alignItems:'flex-end',
  },
  btnPembayaran: {
    bottom:toDp(60),
    width:toDp(120),
    height:toDp(25)
  },
  btnPengiriman: {
    bottom:toDp(40),
    width:toDp(120),
    height:toDp(25),
  },
  txtPembayaran: {
    bottom:toDp(20),
    left:toDp(30),
    color:'white'
  },
  txtPengiriman: {
    bottom:toDp(20),
    left:toDp(30),
    color:'white'
  },
  title: {
    color: 'black',
    fontSize: toDp(14),
    marginLeft: toDp(8),

  },
  BodyKategori: {
    width: toDp(335),
    height: toDp(378),
    borderRadius: toDp(20),
    top: toDp(20),
    flexDirection: 'column',
    justifyContent: 'space-between',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
  btnKategori: {
    left: toDp(15),
    width: toDp(310),
    height: toDp(40),
    justifyContent: 'center'
  },
  iclineright: {
    width: toDp(10),
    height: toDp(15),
    right: toDp(10)
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnKonfirm: {
    backgroundColor: '#2A334B',
    borderRadius: toDp(15),
    width: toDp(335),
    height: toDp(40),
    justifyContent: 'center',
    bottom: toDp(5)
  },
  txtKonfirm: {
    textAlign: 'center',
    color: 'white'
  }
});

export default Kategori;