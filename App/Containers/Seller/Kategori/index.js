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
  AsyncStorage,
  ToastAndroid
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import BackHeader from '@BackHeader'
import Profiltoko from '@Profiltoko'
import NavigatorService from '@NavigatorService'
import axios from 'axios';
import { svr } from "../../../Configs/apikey";
import { ScrollView } from "react-native-gesture-handler";

const Kategori = (props) => {
  const [src, setSrc] = useState(null);

  const [state, setState] = useState({
    mb_id: '',
    picture: '../../../Assets/img/tzuyu.jpg',
    mb_name: '',
    mb_type: '',
    mb_phone: '',
    mb_email: '',
    datas: [],
    isLoading: true,
    isError: false,
    modalVisible: false,
    option: {
      width: 750,
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
        picture: data.value.pictures,
        retail_id: data.retail_id,
      }))
      console.log('RTL_ID ' + JSON.stringify(state.retail_id));

    }).catch(err => {
      console.log('err', err)
    })

  }, [])

  const DATA = [
    {
      id: '2938492',
      nama: 'TB Jaya Abadi Bandung',
      memberUser: 'Member Classic',
      pengikutUser: 'Pengikut (100)',
      mengikutiUser: 'Mengikuti (4)',
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
    axios.get(svr.url + 'category/' + svr.api)
      // axios.get('https://market.pondok-huda.com/dev/react/category/')
      .then(result => {
        // handle success
        setState(state => ({ ...state, datas: result.data.data }))
        console.log('----Katagori=====>' + JSON.stringify(result.data.data));
        // alert(JSON.stringify(result.data));

      }).catch(err => {
        //console.log(err)
        // alert('Gagal menerima data dari server!' + err)
        ToastAndroid.show("Gagal menerima data dari server!" + err, ToastAndroid.SHORT)
        setState(state => ({ ...state, loading: false }))
      })
  }

  const getKategori = (value, ctg_id, ctg_name) => {
    console.log('cekcok = ', ctg_id);
    console.log('cekcok = ', ctg_name);
    NavigatorService.navigate('Detailkategori', { value, ctg_id: ctg_id, ctg_name: ctg_name })
  }


  const ListKategori = (item, index, onPress) => {
    return (

        <View style={styles.viewKategori}>

          <View style={styles.viewKate}>
            <Text style={{ fontSize: toDp(13), marginLeft: toDp(20), }}>{item.ctg_name}</Text>
          </View>
          <TouchableOpacity style={styles.btnKategori} onPress={() => onPress()}>
            <View style={styles.viewBuka}>
              <Image source={allLogo.iclineblack} style={styles.iclineright} />
            </View>
          </TouchableOpacity>
        </View>
    )
  }


  return (
    <View style={styles.container}>

      <BackHeader
        title={'Kategori'}
        onPress={() => props.navigation.goBack()}
      />


          <View style={{width:toDp(340)}}>
            <FlatList
              numColumns={1}
              data={state.datas}
              renderItem={({ item, index, value }) => {
                return (
                  ListKategori(item, index, () => getKategori(value, item.ctg_id, item.ctg_name))
                )
              }}
              ListFooterComponent={() => <View style={{ height: toDp(180) }} />}
            />
          </View>

      <View style={{ position: 'absolute', bottom: 0, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <Pressable style={styles.btnKonfirm} onPress={() => NavigatorService.navigate('Tambahkategori')}>
          <Text style={styles.txtKonfirm}>Tambah Kategori</Text>
        </Pressable>
      </View>

    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white'
  },
  viewKate: {
    width: toDp(310),
    height: toDp(48),
    justifyContent: 'center',
    borderRadius: toDp(10),
    marginLeft:toDp(0)
  },
  viewKategori: {
    flexDirection: 'row',
    marginHorizontal: toDp(0),
    height: toDp(50),
    alignItems: 'center',
    marginTop:toDp(10),
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: toDp(10),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2
  },
  viewBuka: {
    backgroundColor: '#F8f9f9',
    width: toDp(20),
    height: toDp(20),
    alignItems: 'center',
    backgroundColor: '#fcd4c7',
    justifyContent: 'center',
    borderRadius: toDp(20),
  },
  bodyProfil: {
    backgroundColor: '#2A334B',
    width: toDp(340),
    height: toDp(116),
    borderRadius: toDp(10),
    top: toDp(10),
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
    borderRadius: toDp(10)
  },
  profil1: {
    flexDirection: 'row',
    right: 20

  },
  profil2: {
    flexDirection: 'row',
    justifyContent: 'center',
    right: toDp(40),
  },
  txtProfil1: {
    // marginLeft:toDp(25),
    marginTop: toDp(20),
    fontSize: toDp(13),
    color: 'white'
  },
  txtMember: {
    textAlign: 'center',
    right: toDp(45),
    fontSize: toDp(12),
    color: 'white'
  },
  txtMengikuti: {
    left: toDp(10),
    fontSize: toDp(12),
    color: 'white'
  },
  txtPengikut: {
    fontSize: toDp(12),
    color: 'white'
  },
  profil3: {
    alignItems: 'flex-end',
  },
  btnPembayaran: {
    bottom: toDp(60),
    width: toDp(120),
    height: toDp(25)
  },
  btnPengiriman: {
    bottom: toDp(40),
    width: toDp(120),
    height: toDp(25),
  },
  txtPembayaran: {
    bottom: toDp(20),
    left: toDp(30),
    color: 'white'
  },
  txtPengiriman: {
    bottom: toDp(20),
    left: toDp(30),
    color: 'white'
  },
  title: {
    color: 'black',
    fontSize: toDp(14),
    marginLeft: toDp(8),

  },
  BodyKategori: {
    width: toDp(340),
    height: toDp(470),
    borderRadius: toDp(10),
    backgroundColor:'red',
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
    borderRadius: toDp(10),
    justifyContent: 'center',
    right:toDp(15),
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,

    // elevation: 2,
    // backgroundColor:'yellow'
  },
  iclineright: {
    width: toDp(13),
    height: toDp(13),
    tintColor: '#F83308',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnKonfirm: {
    backgroundColor: '#2A334B',
    borderRadius: toDp(10),
    width: toDp(340),
    height: toDp(48),
    justifyContent: 'center',
    bottom: toDp(5)
  },
  txtKonfirm: {
    textAlign: 'center',
    color: 'white'
  },
  store: {
    width: toDp(24),
    height: toDp(24),
    resizeMode: 'contain',
    tintColor: '#f83308'
  },
  wallet: {
    width: toDp(24),
    height: toDp(24),
    resizeMode: 'contain',
    tintColor: '#f83308'
  }
});

export default Kategori;