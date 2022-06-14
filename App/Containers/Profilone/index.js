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
import Logout from '@Logout'
import ImagePicker from 'react-native-image-crop-picker'
import { Card } from "react-native-paper";
import NavigatorService from '@NavigatorService'
import Axios from "axios";

const { width, height } = Dimensions.get('window')

const Profilone = (props) => {
  const [src, setSrc] = useState(null);
  const [stAlu, setAllu] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [state, setState] = useState({
    mb_id: '',
    picture: '../../Assets/img/tzuyu.jpg',
    mb_name: '',
    mb_type: '',
    mb_phone: '',
    mb_email: '',
    cty_name: '',
    alu_name: '',
    alu_id: '',
    alu_city: '',
    alu_adress: '',
    alu_phone: '',
    alu_desk: '',
    rtl_id:'',
    rtl_status: '',
    alu_stats: false,
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

      console.log('Profilefiks----------->' + JSON.stringify(data));

      setState(state => ({
        ...state,
        mb_id: data.mb_id,
        mb_name: data.value.mb_name,
        mb_email: data.value.mb_email,
        mb_phone: data.value.mb_phone,
        mb_type: data.value.mb_type,
        picture: data.value.picture,
        retail_id: data.value.rtl_id,
      }))

    }).catch(err => {
      console.log('err', err)
    })

    AsyncStorage.getItem('uid').then(uids => {
      let ids = uids;
      setState(state => ({
        ...state,
        mb_id: ids
      }))
    }).catch(err => {
      console.log('err', err)
    })

    getAlumember()

    props.navigation.addListener(
      'didFocus',
      payload => {
        loatAlamatU()
        getRetail()
      }
    );
  
  }, [stAlu])

//get retail 

  const getRetail = () => {
    AsyncStorage.getItem('uid').then(uids => {
      let idm = uids;
    Axios.get('https://market.pondok-huda.com/dev/react/retail/?mb_id='+ idm)
      .then(result => {
        // handle success
          console.log('RETAIL ID=====>'+ JSON.stringify(result));
        setState(state => ({ ...state, cityname: result.data.data }))
        // console.log('-----kotaaa=====>'+ JSON.stringify(result.data.data));

        if (result.data.data[0].rtl_status === 'Validate') { 
          alert('Pengajuan retail sudah berhasil di validasi!')              
          NavigatorService.navigate('Homeseller')
  
        } else if (result.data.data[0].rtl_status == 'Rejected') {
          alert('lakukan pengajuan ulang!')
          NavigatorService.navigate('Pengajuan')
  
        } else if (result.data.data[0].rtl_status == 'Review') {
          alert('Pengajuan sedang direview!')
  
        } else if (result.data.data[0].rtl_id == 'null') {
          alert('Buat pengajuan sekarang!')
  
        }  else {
          NavigatorService.navigate('Pengajuan')
        } 
  

      }).catch(err => {
        //console.log(err)
        alert('Gagal menerima data dari server!' + err)
        setState(state => ({ ...state, loading: false }))
      })
  })
}

//get Status BELUM KELAR

const getStatus = () => {
  try {

    AsyncStorage.getItem('setAlamat').then(response => {
      let data = JSON.parse(response);
      console.log('---data--->' + data);
      setState(state => ({
        ...state,
        alu_id: data?.id,
        alu_city: data?.city,
        alu_phone: data?.phone,
        alu_name: data?.name,
        alu_adress: data?.address,
      }))
      if (data == null) {
        setState(state => ({
          ...state,
          alu_stats: true
        }))
      } else {
        setState(state => ({
          ...state,
          alu_stats: false
        }))
      }
    }).catch(err => {
      console.log('err', err)
    })
  } catch (e) {
    console.log('e', e)
  }
}


  const getAlumember = () => {
    AsyncStorage.getItem('uid').then(uids => {
      let idember = uids;
      Axios.get('https://market.pondok-huda.com/dev/react/addres/?alus=' + idember)
        .then(result => {
          let oid = result.data;
          console.log('oid = ' + oid.data.length);

          if (oid.data.length > 0) {
            const ALAMAT = {            //belum select data database
              id: oid.data[0]?.adr_id,
              name: oid.data[0]?.adr_name,
              phone: oid.data[0]?.adr_hp,
              address: oid.data[0]?.adr_address,
              city: oid.data[0]?.cty_name
            }
            console.log('length--------> ' + JSON.stringify(oid.data[0].adr_id));
            AsyncStorage.setItem('setAlamat', JSON.stringify(ALAMAT))
            setAllu(1)
            //loatAlamatU()
          } else {
            console.log('null--------> ' + oid.data.length);
            setState(state => ({
              ...state,
              alu_desk: 'Atur alamat dulu',
              alu_stats: true
            }))
          }
        }).catch(error => {
          console.log(error)
        })
    }).catch(err => {
      console.log('err', err)
    })
  }

  const loatAlamatU = async () => {
    try {

      AsyncStorage.getItem('setAlamat').then(response => {
        let data = JSON.parse(response);
        console.log('---data--->' + data);
        setState(state => ({
          ...state,
          alu_id: data?.id,
          alu_city: data?.city,
          alu_phone: data?.phone,
          alu_name: data?.name,
          alu_adress: data?.address,
        }))
        if (data == null) {
          setState(state => ({
            ...state,
            alu_stats: true
          }))
        } else {
          setState(state => ({
            ...state,
            alu_stats: false
          }))
        }
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

  // const Seller = () => {

  //   AsyncStorage.getItem('member').then(response => {
  //     // console.log('Profil----------->'+ JSON.stringify(response));

  //     let data = JSON.parse(response);
  //     // const val = JSON.stringify(data);

  //     console.log('CEK RTL----------->' + JSON.stringify(data));

  //     setState(state => ({
  //       ...state,
  //       mb_id: data.mb_id,
  //       mb_name: data.value.mb_name,
  //       mb_email: data.value.mb_email,
  //       mb_phone: data.value.mb_phone,
  //       mb_type: data.value.mb_type,
  //       picture: data.value.picture,
  //       retail_id: data.value.rtl_id,
  //       rtl_status: data.value.rtl_status
  //     }))

      
  //     if (data.rtl_status === 'Validate') { 
  //       alert('Pengajuan retail sudah berhasil di validasi!')              
  //       NavigatorService.navigate('Homeseller')

  //     } else if (data.rtl_status == 'Rejected') {
  //       alert('lakukan pengajuan ulang!')
  //       NavigatorService.navigate('Pengajuan')

  //     } else if (data.rtl_status == 'Review') {
  //       alert('Pengajuan sedang direview!')

  //     } else if (data.rtl_id == 'null') {
  //       alert('Buat pengajuan sekarang!')

  //     }  else {
  //       NavigatorService.navigate('Pengajuan')
  //     } 

  //   })
  //   .catch(err => {
  //     console.log(err)
  //     alert('Gagal menerima data dari server!')
  //     setState(state => ({ ...state, loading: false }))
  //   })

  //   AsyncStorage.getItem('uid').then(uids => {
  //     let ids = uids;
  //     setState(state => ({
  //       ...state,
  //       mb_id: ids
  //     }))
  //   }).catch(err => {
  //     console.log('err', err)
  //   })

  // }

  //REFRESH PROFIL

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
         picture: data.value.picture,
         retail_id: data.value.rtl_id,
         rtl_status: data.value.rtl_status
       }))
 
     }).catch(err => {
       console.log('err', err)
     })

    } catch(e) {
      console.log('e', e)
    }
   }

  // render() {
  return (
    <View style={styles.container}>
      <Logout
        title={'Profil'}
        onPress={() => props.navigation.goBack()}
        onFilter={() => logout()}
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
                <Image source={allLogo.wallet} style={styles.icwallet} />
                <Text style={{ marginLeft: toDp(10), color: 'white', fontSize: toDp(12) }}>Pembayaran</Text>
              </View>
            </Pressable>
            <Pressable style={styles.presable}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={allLogo.store} style={styles.icstore} />
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
          <View style={styles.viewJual}>
            <Pressable style={styles.btnJual} onPress={() => getRetail()}>
              <Text style={styles.txtJual}>Mulai Jual</Text>
            </Pressable>
          </View>

          <View style={styles.bodyProfil}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Pressable style={{ height: toDp(40), top: toDp(5), left: toDp(5) }} >
                <View style={{ flexDirection: 'row', margin: toDp(10) }}>
                  <Image source={allLogo.bag} style={styles.icorders} />
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
                <Image source={allLogo.bayar} style={{ width: toDp(38), height: toDp(38), left: toDp(18) }} />
                <Text style={{ fontSize: toDp(13), }}>Belum Bayar</Text>
              </Pressable>

              <Pressable style={{ marginHorizontal: toDp(10) }} onPress={() => NavigatorService.navigate('Orderpage', { content: 'Dikemas' })}>
                <Image source={allLogo.kemas} style={styles.icon} />
                <Text style={{ fontSize: toDp(13) }}>Dikemas</Text>
              </Pressable>

              <Pressable style={{ marginHorizontal: toDp(10), left: toDp(10) }} onPress={() => NavigatorService.navigate('Orderpage', { content: 'Dikirim' })}>
                <Image source={allLogo.kirim} style={{ width: toDp(38), height: toDp(38), left: toDp(2) }} />
                <Text style={{ fontSize: toDp(13) }}>Dikirim</Text>
              </Pressable>

              <Pressable style={{ marginHorizontal: toDp(10), left: toDp(25) }} onPress={() => NavigatorService.navigate('Orderpage', { content: 'Selesai' })}>
                <Image source={allLogo.like} style={styles.icon} />
                <Text style={{ fontSize: toDp(13) }}>Beri Nilai</Text>
              </Pressable>
            </View>
            <View style={{ borderWidth: toDp(0.5), borderColor: 'grey', bottom: toDp(5) }} />

            <Pressable style={styles.btnAlamat} onPress={() => NavigatorService.navigate('Alamat', { adr_mb_id: state.mb_id })}>
              <View style={styles.bodyAlamat}>
                <Image source={allLogo.location} style={{ width: toDp(38), height: toDp(38), right: toDp(5) }} />
                <Text style={styles.txtPengiriman}>Alamat Pengiriman</Text>
              </View>

              <View style={{ flexDirection: 'row', left: toDp(60), bottom: toDp(10) }}>
                {state.alu_stats == true &&
                  <>
                    <Text style={styles.txtAddress}>{state.alu_desk}</Text>

                  </>
                }
                <Text style={styles.txtAddress}>{state.alu_name} {state.alu_phone}{"\n"}{state.alu_adress} {state.alu_city}</Text>
                <View style={{ left: toDp(125) }}>
                  <Image source={allLogo.iclineright} style={styles.iclineright} />
                </View>
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

    </View>
  )

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
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
  icon: {
    width: toDp(38),
    height: toDp(38),
    left: toDp(6)
  },
  icwallet: {
    height: toDp(22),
    width: toDp(25),
    tintColor: '#f83308'
  },
  icstore: {
    height: toDp(22),
    width: toDp(25),
    tintColor: '#f83308'
  },
  icline: {
    height: toDp(12),
    width: toDp(8),
  },
  icorders: {
    width: toDp(23),
    height: toDp(28),
    bottom: toDp(5),
    left: toDp(5)
  },
  presable: {
    zIndex: 3,
    marginBottom: toDp(15),
  },
  bodyProfil: {
    backgroundColor: '#F9F8F8',
    width: toDp(330),
    height: toDp(210),
    borderRadius: toDp(10),
    top: toDp(10),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
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
    right: toDp(-10),
    bottom: toDp(2)
  },
  iclineright: {
    margin: toDp(10),
    width: toDp(10),
    height: toDp(14.8),
    bottom: toDp(10),
    right: toDp(90)
  },
  txtPengiriman: {
    left: toDp(0),
    top: toDp(10),
    fontSize: toDp(15),
  },
  btnAlamat: {
    height: toDp(94)
  },
  txtRiwayat: {
    top: toDp(5),
    left: toDp(15),
    color: '#F83308',
    fontSize: toDp(12)
  },
  txtPesanan: {
    top: toDp(3),
    left: toDp(10),
  },
  txtJual: {
    color: '#2A334B',
    fontSize: toDp(15),
    fontWeight: '700',
    textAlign: 'center',
  },
  viewJual: {
    backgroundColor: '#F9F8F8',
    width: toDp(330),
    height: toDp(35),
    borderRadius: toDp(10),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1, },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  txtAddress: {
    fontSize: toDp(13),
    bottom: toDp(10)
  }

});

export default Profilone;


        // const datas = {                                 
        //   id: result.data.data[0].mb_id,                 
        //   value: result.data.data[0],
        //   tipe: result.data.data[0].mb_type,
        //   retail_idtl_srtl_status.data.rtl_id                      

        // }
        // console.log('DATAS' + JSON.stringify(datas));

        // if (datas.retail_idtl_srtl_status_id) {
        //   // alert('Nama Pengguna atau Kata Sandi Salah!')
        //      NavigatorService.navigate('Homeseller')
        // } else {
        //   console.log(JSON.stringify(datas));

        //   NavigatorService.reset('Ubahtoko')
        // }

        // NavigatorService.reset('Homepage')
        // setState(state => ({ ...state, loading: false }))
