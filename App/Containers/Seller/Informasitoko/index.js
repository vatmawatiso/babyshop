import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ImageBackground,
  Pressable,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import BackHeader from '@BackHeader'
import NavigatorService from '@NavigatorService'
import axios from "axios";
import { TextInput } from "react-native-gesture-handler";

const Informasitoko = (props) => {
  const [src, setSrc] = useState(null);

  const [refreshing, setRefreshing] = useState(false);
  const [state, setState] = useState({
    mb_id: '',
    picture: '../../../Assets/img/tzuyu.jpg',
    mb_name: '',
    mb_type: '',
    mb_phone: '',
    mb_email: '',
    rtl_city: '',
    cty_name: '',
    cityname: [],
    retail_id:'',
    modalVisible: false,
    option: {
      width: 750,
      height: 750,
      cropping: true,
    }
  })


  useEffect(() => {

    AsyncStorage.getItem('member').then(response => {
      // console.log('Profil----------->'+ JSON.stringify(response));

      let data = JSON.parse(response);
      // const val = JSON.stringify(data);

      console.log('Member ----------->'+ JSON.stringify(data));

      setState(state => ({
        ...state,
        id: data.mb_id,
        mb_name: data.value.mb_name,
        mb_email: data.value.mb_email,
        mb_phone: data.value.mb_phone,
        mb_type: data.value.mb_type,
        picture: data.value.picture,
        id_retail: data.retail_id,
      }))
      console.log('cek state member----------->' + JSON.stringify(state.id_retail));


    }).catch(err => {
      console.log('err', err)
    })

    city()

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

  const logout = () => {
    Alert.alert(
      "Konfirmasi",
      "Apakah anda ingin keluar ?",
      [
        {
          text: "Batal",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Keluar", onPress: () => {
            AsyncStorage.clear()
            NavigatorService.reset('Login')
          }
        }
      ]
    )
  }


  const city = () => {
    // setState(state => ({...state, loading: true }))
    axios.get('https://market.pondok-huda.com/dev/react/retail/'+ state.id_retail)
      .then(result => {
        // handle success
        //alert(JSON.stringify(result))
         console.log('CEK COK =====>' + JSON.stringify(result.data.data[0].rtl_city));
         // console.log('CEK COK =====>' + JSON.stringify(result.data.data[0].cty_name));
        let data = result.data.data.map(doc => {
          return {
            rtl_city: doc.rtl_city,
            cty_name: doc.cty_name,
            rtl_id: doc.rtl_id
          }
        })
        // console.log('CEK COK =====>' + JSON.stringify(data.cty_name));

        //setState(state => ({ ...state, cityname: result.data.data }))
        setState(state => ({ ...state, cityname: result.data.data }))
        console.log('-----kotaaa=====>' + JSON.stringify(data[0].cty_name));
        console.log('-----retail=====>' + JSON.stringify(data[0].rtl_id));
        console.log('-----id kota=====>' + JSON.stringify(data[0].rtl_city));
        // alert(JSON.stringify(response.data));

      }).catch(err => {
        //console.log(err)
        alert('Gagal menerima data dari server!' + err)
        setState(state => ({ ...state, loading: false }))
      })
  }

  const selectToko = ( rtl_city, cty_name) => {
    console.log('DATA KOTA=====>' + JSON.stringify(cty_name));
    console.log('DATA ID KOTA=====>' + JSON.stringify(rtl_city));
    NavigatorService.navigate('Ubahtoko', { rtl_city: rtl_city, cty_name: cty_name })

  }

  const render = (item) => {
    return (
      <View style={{ bottom: toDp(20) }}>
        <TouchableOpacity style={styles.btnUbah} onPress={() => selectToko( item[0]?.rtl_city, item[0]?.cty_name)} >
          <Text style={styles.txtUbah}>Ubah Toko</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>

      <BackHeader
        title={'Informasi Toko'}
        onPress={() => props.navigation.goBack()}
      />

      <View>
        <View style={[styles.Tokosaya, { flexDirection: 'row' }]}>
          <Image source={state.picture ? { uri: state.picture } :
            require('../../../Assets/img/tzuyu.jpg')} style={styles.imgProfil} />
          <View style={{ alignItems: 'center', flex: 0.8 }}>
            <Text style={styles.txtToko}>{state.mb_name}</Text>
          </View>
        </View>
        <View style={{ bottom: toDp(50), left: toDp(20) }}>
          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.txtMember}>{DATA[0].memberUser}</Text>
            <Text style={styles.txtPengikut}>{DATA[0].pengikutUser} {DATA[0].mengikutiUser}</Text>
          </View>
          <View style={{ right: toDp(20) }}>
            <TouchableOpacity style={styles.btnSetting} onPress={() => NavigatorService.navigate('Settingtoko')}>
              <Text style={{ textAlign: 'center', }}>Pengaturan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {render(state.cityname)}

    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1
  },
  imgProfil: {
    height: toDp(50),
    width: toDp(50),
    top: toDp(20),
    left: toDp(15),
    borderRadius: toDp(25)
  },
  Tokosaya: {
    flexDirection: 'row',
    backgroundColor: '#2A334B',
    width: toDp(335),
    height: toDp(130),
    borderRadius: toDp(10),
    top: toDp(20)
  },
  txtToko: {
    top: toDp(15),
    color: 'white'
  },
  txtMember: {
    left: toDp(105),
    fontSize: toDp(12),
    color: 'white',
    bottom: toDp(20)
  },
  txtPengikut: {
    fontSize: toDp(12),
    color: 'white',
    left: toDp(80),
    bottom: toDp(15)
  },
  txtMengikuti: {
    fontSize: toDp(12),
    color: 'white'
  },
  btnUbah: {
    backgroundColor: '#f9f8f8',
    width: toDp(335),
    height: toDp(45),
    borderRadius: toDp(10),
    bottom: toDp(10),
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
  txtUbah: {
    textAlign: 'center',
    color: 'black'
  },
  btnSetting: {
    backgroundColor: '#f8f9f9',
    width: toDp(335),
    height: toDp(38),
    // borderRadius: toDp(10), 
    borderBottomRightRadius: toDp(10),
    borderBottomLeftRadius: toDp(10),
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  }
});

export default Informasitoko;