import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  Alert,
  ImageBackground,
  Pressable,
  TouchableOpacity,
  AsyncStorage,
  Dimensions,
  ScrollView,
  RefreshControl
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import Header from '@Header'
import ImagePicker from 'react-native-image-crop-picker'
import { Card } from "react-native-paper";
import NavigatorService from '@NavigatorService'
import axios from 'axios';

const { width, height } = Dimensions.get('window')

const Profilone = (props) => {
  const [src, setSrc] = useState(null);

  const [refreshing, setRefreshing] = useState(false);
  const [state, setState] = useState({
    mb_id: '',
    picture: '../../Assets/img/tzuyu.jpg',
    mb_name: '',
    mb_type: '',
    mb_phone: '',
    mb_email: '',
    adr_mb_id: '',
    loading: false,
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
        adr_mb_id: data.id,
        mb_name: data.value.mb_name,
        mb_email: data.value.mb_email,
        mb_phone: data.value.mb_phone,
        mb_type: data.value.mb_type,
        picture: data.value.picture
      }))


    }).catch(err => {
      console.log('err', err)
    })

    AsyncStorage.getItem('uid').then(uids => {
      let ids = uids;
      setState(state => ({
        ...state,
        id: ids
      }))
    }).catch(err => {
      console.log('err', err)
    })
  }, [])

  const refresh = async () => {
    try {
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
    } catch (e) {
      console.log('e', e)
    }
  }


  const DATA = [
    {
      id: '1',
      memberUser: 'Member classic',
      pengikutUser: 'Pengikut 1',
      mengikutiUser: 'Mengikuti'
    },
  ]

  const Address = [
    {
      id: '1',
      nama: 'Vatmawati',
      telepon: '083141520987',
      alamat: 'Jl KiSulaiman Kota Cirebon Jawa Barat '
    },
  ]

  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("Edit Profil");

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

  // render() {
  return (
    <View style={styles.container}>
      <Header
        title={'Profil'}
        onPress={() => props.navigation.goBack()}
      />
      <ScrollView vertical={true} style={{ width: '100%', height: '100%' }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
          />}
      >

        <View style={{ width: '100%', height: 740, alignItems: 'center' }}>
          <View style={{ backgroundColor: '#2A334B', flexDirection: 'row', justifyContent: 'space-around', height: toDp(116), width: toDp(335), marginTop: toDp(25), top: toDp(-10), borderRadius: toDp(20) }}>
            <View >
              <Image source={state.picture ? { uri: state.picture } :
                require('../../Assets/img/tzuyu.jpg')}
                style={styles.imgProfil} />
              <Text style={styles.typeUser}>{state.mb_type}</Text>
            </View>

            <View style={{ alignItems: 'center', marginTop: toDp(10), justifyContent: 'center', }}>
              <Text style={styles.nmProfil}>{state.mb_name}</Text>
              <Text style={styles.member}>{DATA[0].memberUser}</Text>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.pengikut}>{DATA[0].pengikutUser}</Text>
                <Text style={styles.mengikuti}>{DATA[0].mengikutiUser}</Text>
              </View>
            </View>

            <View style={{ zIndex: 5, justifyContent: 'center', marginTop: toDp(15), marginLeft: toDp(-10) }}>
              <Pressable style={styles.presable}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={allLogo.icwallet} style={styles.icwallet} />
                  <Text style={{ marginLeft: toDp(10), color: 'white', fontSize: toDp(12) }}>Pembayaran</Text>
                </View>
              </Pressable>
              <Pressable style={styles.presable}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={allLogo.icstore} style={styles.icstore} />
                  <Text style={{ marginLeft: toDp(10), color: 'white', fontSize: toDp(12) }}>Pengiriman</Text>
                </View>
              </Pressable>
              <Pressable style={[styles.presable, { right: toDp(-29), width: toDp(60), height: toDp(20), justifyContent: 'center' }]} onPress={() => NavigatorService.navigate('Editprofil')}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ marginRight: toDp(5), color: 'white', fontSize: toDp(12) }}>{text}</Text>
                  <Image source={allLogo.icline} style={styles.icline} />
                </View>
              </Pressable>
            </View>

          </View>
          <View style={{ zIndex: 0, marginBottom: 50 }}>
            <View style={{
              backgroundColor: '#C4C4C4',
              width: toDp(335),
              height: toDp(35),
              borderRadius: toDp(20),

            }}>
              <Pressable onPress={() => NavigatorService.navigate('Homeseller')}>
                <Text style={{ marginVertical: toDp(6), left: toDp(130), }}>Mulai Jual</Text>
              </Pressable>
            </View>

            <View style={styles.bodyProfil}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Pressable style={{ height: toDp(40), top: toDp(5), left: toDp(5) }} >
                  <View style={{ flexDirection: 'row', margin: toDp(10) }}>
                    <Image source={allLogo.icorders} style={styles.icorders} />
                    <Text style={styles.txtPesanan}>Pesanan Saya</Text>
                  </View>
                </Pressable>

                <Pressable style={{ height: toDp(40), width: toDp(170), top: toDp(5) }} onPress={() => NavigatorService.navigate('Orderpage', { content: 'Belumbayar' })}>
                  <View style={{ flexDirection: 'row', margin: toDp(10) }}>
                    <Text style={styles.txtRiwayat}>Lihat Riwayat Pesanan</Text>
                    <Image source={allLogo.iclineright} style={styles.iclineright1} />
                  </View>
                </Pressable>
              </View>
              <View style={{ borderWidth: toDp(0.5), borderColor: 'grey', top: toDp(5) }} />

              <View style={{ flexDirection: 'row', margin: toDp(10), justifyContent: 'center' }}>
                <Pressable style={{ right: toDp(20) }} onPress={() => NavigatorService.navigate('Orderpage', { content: 'Belumbayar' })}>
                  <Image source={allLogo.icbuyer} style={{ left: toDp(13) }} />
                  <Text style={{ fontSize: toDp(13) }}>Belum{"\n"} Bayar</Text>
                </Pressable>

                <Pressable style={{ marginHorizontal: toDp(10) }} onPress={() => NavigatorService.navigate('Orderpage', { content: 'Dikemas' })}>
                  <Image source={allLogo.icpacking} style={{ left: toDp(13) }} />
                  <Text style={{ fontSize: toDp(13) }}>Dikemas</Text>
                </Pressable>

                <Pressable style={{ marginHorizontal: toDp(10), left: toDp(10) }} onPress={() => NavigatorService.navigate('Orderpage', { content: 'Dikirim' })}>
                  <Image source={allLogo.ictruck} style={{ left: toDp(5) }} />
                  <Text style={{ fontSize: toDp(13) }}>Dikirim</Text>
                </Pressable>

                <Pressable style={{ marginHorizontal: toDp(10), left: toDp(25) }} onPress={() => NavigatorService.navigate('Orderpage', { content: 'Selesai' })}>
                  <Image source={allLogo.icstars} style={{ left: toDp(15) }} />
                  <Text style={{ fontSize: toDp(13) }}>Beri Nilai</Text>
                </Pressable>
              </View>
              <View style={{ borderWidth: toDp(0.5), borderColor: 'grey', bottom: toDp(5) }} />

              <Pressable style={styles.btnAlamat} onPress={() => NavigatorService.navigate('Alamat', {adr_mb_id : state.adr_mb_id})}>
                <View style={styles.bodyAlamat}>
                  <Image source={allLogo.icaddress1} style={styles.icaddress1} />
                  <Text style={styles.txtPengiriman}>Alamat Pengiriman</Text>
                </View>

                <View style={{ flexDirection: 'row', left: toDp(49), bottom: toDp(10) }}>
                  <Text style={{ fontSize: toDp(13) }}>{Address[0].nama} {Address[0].telepon}{"\n"}{Address[0].alamat}</Text>
                  <Image source={allLogo.iclineright} style={styles.iclineright} />
                </View>
              </Pressable>

            </View>

          </View>



          <View style={{ top: toDp(250), position: 'absolute' }}>
            <ActivityIndicator
              animating={loading}
              size="large"
              color="#FFFFFF"
            />
          </View>
        </View>

      </ScrollView>

      <View style={{ position: 'absolute', bottom: toDp(0), top: toDp(200), alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <TouchableOpacity style={{ backgroundColor: '#2A334B', width: toDp(335), alignItems: 'center', height: toDp(40), borderRadius: toDp(20), justifyContent: 'center', top: toDp(180) }} onPress={() => logout()}>
          <Text style={{ textAlign: 'center', color: 'white', fontSize: toDp(16) }}>Keluar</Text>
        </TouchableOpacity>
      </View>

      {/* <View style={{alignItems: 'center', width: '100%'}}>
        <TouchableOpacity style={{backgroundColor:'#2A334B', width:toDp(335), alignItems:'center', height:toDp(40), borderRadius:toDp(20), justifyContent:'center', top: toDp(180)}} onPress={() => logout()}>
          <Text style={{textAlign:'center',color:'white', fontSize:toDp(16)}}>Keluar</Text>
        </TouchableOpacity>
      </View> */}
      {/* </View> */}


    </View>
  )

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  cart: {
    padding: toDp(1),
    top: toDp(-257),
    left: toDp(110)
  },
  typeUser: {
    color: 'white',
    top: toDp(32),
    left: toDp(19),
    fontSize: toDp(12)
  },
  imgProfil: {
    height: toDp(50),
    width: toDp(50),
    top: toDp(25),
    left: toDp(15),
    borderRadius: toDp(20)
  },
  nmProfil: {
    top: toDp(-20),
    fontWeight: 'bold',
    fontSize: toDp(13),
    color: 'white'
  },
  member: {
    fontSize: toDp(11),
    color: 'white',

  },
  pengikut: {
    fontSize: toDp(10),
    color: 'white',
    fontSize: toDp(9)
  },
  mengikuti: {
    fontSize: toDp(10),
    color: 'white',
    marginLeft: toDp(8)
  },
  icwallet: {

    height: toDp(22),
    width: toDp(25),

  },
  icstore: {

    height: toDp(22),
    width: toDp(25),

  },
  icline: {

    height: toDp(12),
    width: toDp(8),

  },
  icorders: {
    width: toDp(23),
    height: toDp(28),
    bottom: toDp(5),
    right: toDp(5)
  },
  presable: {
    zIndex: 3,
    marginBottom: toDp(15),
  },
  bodyProfil: {
    backgroundColor: '#C4C4C4',
    width: toDp(335),
    height: toDp(210),
    borderRadius: toDp(20),
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
  bodyAlamat: {
    // backgroundColor: 'green',
    flexDirection: 'row',
    margin: toDp(10),
    left: toDp(10),
    bottom: toDp(8)
  },
  iclineright1: {
    margin: toDp(10),
    width: toDp(10),
    height: toDp(14.8),
    right: toDp(5),
    bottom: toDp(2)
  },
  iclineright: {
    margin: toDp(10),
    width: toDp(10),
    height: toDp(14.8),
    bottom: toDp(10)
  },
  txtPengiriman: {
    left: toDp(10),
    top: toDp(5),
    fontSize: toDp(13),
  },
  btnAlamat: {
    height: toDp(94)
  },
  txtRiwayat: {
    top: toDp(5),
  },
  txtPesanan: {
    top: toDp(3),
    left: toDp(5)
  }

});

export default Profilone;