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

      // console.log('Profilefiks----------->'+ JSON.stringify(data));

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

      <View style={{ bottom: toDp(20) }}>
        <TouchableOpacity style={styles.btnUbah} onPress={() => NavigatorService.navigate('Ubahtoko')} >
          <Text style={styles.txtUbah}>Ubah</Text>
        </TouchableOpacity>
      </View>

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
    borderBottomRightRadius:toDp(10),
    borderBottomLeftRadius:toDp(10),
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