import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  Alert,
  Pressable,
  TouchableOpacity,
  AsyncStorage,
  Dimensions,
  ScrollView,
  RefreshControl,
  ToastAndroid
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import Logout from '@Logout'
import ImagePicker from 'react-native-image-crop-picker'
import { Card } from "react-native-paper";
import NavigatorService from '@NavigatorService'
import Loader from '@Loader'
import Axios from "axios";
import { LoginManager } from "react-native-fbsdk";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { svr } from "../../Configs/apikey";

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
    retail_sts:[],
    login: '',
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
    AsyncStorage.getItem('login').then(response => {
      console.log('login :', response)
      setState(state => ({...state, login: response}))
    }).catch(error => {
      console.log('error :', error)
    })

    AsyncStorage.getItem('member').then(response => {
      // console.log('Profil----------->'+ JSON.stringify(response));

      let data = JSON.parse(response);
      // const val = JSON.stringify(data);

      // console.log('Profilefiks----------->' + JSON.stringify(data));

      setState(state => ({
        ...state,
        mb_id: data.mb_id,
        mb_name: data.value.mb_name,
        mb_email: data.value.mb_email,
        mb_phone: data.value.mb_phone,
        mb_type: data.value.mb_type,
        picture: data.value.picture,
        id_retail: data.retail_id,
      }))
      console.log('id retail ' + JSON.stringify(state.picture));
      // console.log('CEK MB_NAME ' + JSON.stringify(state.mb_name));

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
        getRetail()  // untuk reload data terbaru retail
      }
    );
  
  }, [stAlu])

//get retail keseluruhan

  const getRetail = () => {
    AsyncStorage.getItem('uid').then(uids => {
      let idm = uids;
      Axios.get(svr.url+'retail/member/'+idm+'/'+svr.api)
    // Axios.get('https://market.pondok-huda.com/dev/react/retail/?mb_id='+ idm)
      .then(result => {
        console.log('cek result ===> '+ JSON.stringify(result.data.data[0].rtl_status));
          setState(state => ({ ...state, retail_sts : result.data.data[0].rtl_status})) 

      }).catch(err => {
        // alert('Gagal menerima data dari server!' + err)
        ToastAndroid.show("Gagal menerima data dari server!"+ err, ToastAndroid.SHORT)
        setState(state => ({ ...state, loading: false }))
      })
  })
}

//get Status untuk kondisi if dan akan digunakan untuk pressable mulai jual

const getStatus = () => {
  try {

      if (state.retail_sts === 'Validate') {             
        NavigatorService.navigate('Homeseller')

      } else if (state.retail_sts === 'Rejected') {
        // alert('lakukan pengajuan ulang!')
        ToastAndroid.show("lakukan pengajuan ulang!", ToastAndroid.SHORT)
        NavigatorService.navigate('Pengajuan')

      } else if (state.retail_sts === 'Review') {
        // alert('Pengajuan sedang direview!')
        ToastAndroid.show("Pengajuan sedang direview!", ToastAndroid.SHORT)

      } else if (state.retail_sts === 'null') {
        // alert('Buat pengajuan sekarang!')
        ToastAndroid.show("Buat pengajuan sekarang!", ToastAndroid.SHORT)

      }  else {
        setState(state => ({ ...state, loading: false }))
        NavigatorService.navigate('Pengajuan')

      } 
  } catch (err) {
    console.log('err', err)
    setState(state => ({ ...state, loading: false }))
  }
}


  const getAlumember = () => {
    AsyncStorage.getItem('uid').then(uids => {
      let idember = uids;
      Axios.get(svr.url+'addres/alus/'+idember+'/'+svr.api)
      // Axios.get('https://market.pondok-huda.com/dev/react/addres/?alus=' + idember)
        .then(result => {
          // console.log('cek alus ===> '+ JSON.stringify(result));
          let oid = result.data;
          console.log('oid = ' + oid.data.length);

          if (oid.data.length > 0) {
            const ALAMAT = {         
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

  const logoutGoogle = async () => {
    try{
      Alert.alert(
        "Konfirmasi",
        "Apakah Anda Yakin Akan Keluar ?",
        [
          {
            text: "Batal",
            onPress: ()=> console.log('Cancel Pressed'),
            style: "cancel"
          },
          {
            text: "Keluar",
            onPress: () => {
            AsyncStorage.clear()
            GoogleSignin.signOut();
            NavigatorService.reset('Login')
            }
          }
        ]
      )
    } catch (error) {
      console.error('Logout ',error);
    }
  }
  
  const logoutWithFacebook = () => {
    Alert.alert (
      "Konfirmasi",
      "Apakah Anda Yakin Akan Keluar ?",
      [
        {
          text: "Batal",
          onPress: ()=> console.log('Cancel Pressed'),
          style: "cancel"
        },
        {
          text: "Keluar", onPress: () => {
          AsyncStorage.clear()
          LoginManager.logOut();
          NavigatorService.reset('Login')
          }
        }
      ]
    )
  };

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
        onGoogle={() => logoutGoogle()}
        onFacebook={() => logoutWithFacebook()}
      />
      {/* <ScrollView vertical={true} style={{ width: '100%', height: '100%' }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
          />}
      > */}
      

      <View style={{ width: '100%', alignItems: 'center', flex: 1 }}>
        <View style={styles.profil}>
          <View style={{flexDirection:'column', left:toDp(120), bottom:toDp(15)}}>
            <Image source={state.picture ? { uri: state.picture } :
              require('../../Assets/img/tzuyu.jpg')}
              style={styles.imgProfil} />
            <Text style={[styles.typeUser, { width:toDp(80), justifyContent: 'center', alignItems: 'center', textAlign: 'center' }]}>{state.mb_name.substr(0,13)}</Text>
          </View>

          <View>
          <Pressable style={{ width: toDp(60), height: toDp(20), left:toDp(180), top:toDp(10)}} onPress={() => NavigatorService.navigate('Editprofil')}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ marginRight: toDp(5), color: 'white', fontSize: toDp(12), }}>{text}</Text>
                <Image source={allLogo.arrowright} style={styles.icline} />
              </View>
            </Pressable>
          </View>

          <View style={{flexDirection:'row'}}>
            <Pressable style={styles.presable} onPress={() => NavigatorService.navigate('underConstruction')}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={allLogo.wallet} style={styles.icwallet} />
                <Text style={{ marginLeft: toDp(10), color: 'white', fontSize: toDp(12) }}>Pembayaran</Text>
              </View>
            </Pressable>
            <Pressable style={[styles.presable, {right:toDp(15)}]} onPress={() => NavigatorService.navigate('underConstruction')}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={allLogo.store} style={styles.icstore} />
                <Text style={{ marginLeft: toDp(10), color: 'white', fontSize: toDp(12) }}>Pengiriman</Text>
              </View>
            </Pressable>
          </View>

        </View>
        <View style={{ zIndex: 0, marginBottom: 50 }}>
       
          <View style={styles.viewJual}>
          <Loader loading={state.loading}/>
            <Pressable style={styles.btnJual} onPress={() => getStatus()}>
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

              <TouchableOpacity style={{ height: toDp(40), width: toDp(170), top: toDp(5) }} onPress={() => NavigatorService.navigate('Ulasansaya', {mb_id: state.mb_id, mb_name: state.mb_name, picture: state.picture})}>
                <View style={{ flexDirection: 'row', margin: toDp(10) }}>
                  <Text style={styles.txtRiwayat}>Lihat Ulasan Saya</Text>
                  <Image source={allLogo.arrowright} style={styles.iclineright1} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ borderWidth: toDp(0.5), borderColor: 'grey', top: toDp(5) }} />
            {/*Bagian Update*/}
            <View style={{ flexDirection: 'row', margin: toDp(10), justifyContent: 'center' }}>
              <TouchableOpacity style={{ right: toDp(20) }} onPress={() => NavigatorService.navigate('Orderpage', { content: 'Belum Dibayar', mb_id: state.mb_id  })}>
                <Image source={allLogo.bayar} style={{ width: toDp(38), height: toDp(38), left: toDp(18) }} />
                <Text style={{ fontSize: toDp(13), }}>Belum Bayar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ marginHorizontal: toDp(10) }} onPress={() => NavigatorService.navigate('Orderpage', { content: 'Dikemas', mb_id: state.mb_id  })}>
                <Image source={allLogo.kemas} style={styles.icon} />
                <Text style={{ fontSize: toDp(13) }}>Dikemas</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ marginHorizontal: toDp(10), left: toDp(10) }} onPress={() => NavigatorService.navigate('Orderpage', { content: 'Dikirim', mb_id: state.mb_id  })}>
                <Image source={allLogo.kirim} style={{ width: toDp(38), height: toDp(38), left: toDp(2) }} />
                <Text style={{ fontSize: toDp(13) }}>Dikirim</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ marginHorizontal: toDp(10), left: toDp(25) }} onPress={() => NavigatorService.navigate('Orderpage', { content: 'Selesai', mb_id: state.mb_id })}>
                <Image source={allLogo.like} style={styles.icon} />
                <Text style={{ fontSize: toDp(13) }}>Beri Nilai</Text>
              </TouchableOpacity>
            </View>
            <View style={{ borderWidth: toDp(0.5), borderColor: 'grey', bottom: toDp(5) }} />

            <TouchableOpacity style={styles.btnAlamat} onPress={() => NavigatorService.navigate('Alamat', { adr_mb_id: state.mb_id })}>
              <View style={styles.bodyAlamat}>
                <Image source={allLogo.location} style={styles.icLocation} />
                <Text style={styles.txtPengiriman}>Alamat Pengiriman</Text>
              </View>

              <View style={{ flexDirection: 'row', bottom: toDp(10), justifyContent: 'space-between' }}>
                <View style={{ top: toDp(5), marginLeft: toDp(57),}}>
                    {state.alu_stats == true &&
                      <>
                        <Text style={styles.txtAddress}>{state.alu_desk}</Text>

                      </>
                    }
                    <Text style={styles.txtAddress}>{state.alu_name} {state.alu_phone}{"\n"}{state.alu_adress} {state.alu_city}</Text>
                </View>
                <View style={{ justifyContent: 'flex-start', alignItems: 'center', right: toDp(10)}}>
                  <Image source={allLogo.arrowright} style={styles.iclineright} />
                </View>
              </View>
            </TouchableOpacity>

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


      <View style={styles.buttonSubmit}>
        {
          state.login === 'google' ?
            <TouchableOpacity style={{ backgroundColor:'#2A334B',width:toDp(340), alignItems:'center', height:toDp(48), borderRadius:toDp(10), justifyContent:'center'}} onPress={() => logoutGoogle()}>
              <Text style={{textAlign:'center',color:'white', fontSize:toDp(16)}}>Keluar Google</Text>
            </TouchableOpacity>
          : state.login === 'facebook' ?
            <TouchableOpacity style={{backgroundColor:'#2A334B', width:toDp(340), alignItems:'center', height:toDp(48), borderRadius:toDp(10), justifyContent:'center'}} onPress={() => logoutWithFacebook()}>
              <Text style={{textAlign:'center',color:'white', fontSize:toDp(16)}}>Keluar Facebook</Text>
            </TouchableOpacity>
          :
          <TouchableOpacity style={{backgroundColor:'#2A334B', width:toDp(340), alignItems:'center', height:toDp(48), borderRadius:toDp(10), justifyContent:'center'}} onPress={() => logout()}>
            <Text style={{textAlign:'center',color:'white', fontSize:toDp(16)}}>Keluar</Text>
          </TouchableOpacity>
        }
        </View>
      


      {/* </ScrollView> */}

     

    </View>
  )

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  buttonSubmit: {
    width: '100%',
    height: toDp(75),
    flexDirection: 'row',
    shadowColor: "#000",
    justifyContent: 'center',
    alignItems: 'center',
  },
  profil: {
    backgroundColor: '#2A334B', 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    height: toDp(116), 
    width: toDp(340), 
    marginTop: toDp(25), 
    bottom: toDp(10), 
    borderRadius: toDp(10),shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    
    elevation: 2,
  },
  cart: {
    padding: toDp(1),
    top: toDp(-257),
    left: toDp(110)
  },
  icLocation: {
    width: toDp(38), 
    height: toDp(38), 
    right: toDp(5)
  },
  typeUser: {
    color: 'white',
    top: toDp(32),
    left: toDp(0),
    right:toDp(0),
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
    tintColor:'#FFF'
  },
  icorders: {
    width: toDp(23),
    height: toDp(28),
    bottom: toDp(5),
    left: toDp(5)
  },
  presable: {
    top:toDp(85),
    right:toDp(115)
  },
  bodyProfil: {
    backgroundColor: 'white',
    width: toDp(340),
    height: toDp(240),
    borderRadius: toDp(10),
    top: toDp(10),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

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
    width: toDp(8),
    height: toDp(14),
    left: toDp(35),
    bottom: toDp(2),
  },
  iclineright: {
    width: toDp(8),
    height: toDp(14),
    marginLeft: toDp(13),
  },
  txtPengiriman: {
    left: toDp(0),
    top: toDp(10),
    fontSize: toDp(15),
  },
  btnAlamat: {
    height: toDp(94),
    // backgroundColor:'cyan'
  },
  txtRiwayat: {
    top: toDp(5),
    left: toDp(35),
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
    backgroundColor: 'white',
    width: toDp(340),
    height: toDp(48),
    borderRadius: toDp(10),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1, },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
  },
  txtAddress: {
    fontSize: toDp(13),
    bottom: toDp(10),
    width:toDp(250)
  }

});

export default Profilone;

      