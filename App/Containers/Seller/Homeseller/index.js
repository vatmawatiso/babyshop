import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ImageBackground,
  Pressable,
  AsyncStorage,
  ScrollView,
  RefreshControl
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import Profiltoko from '@Profiltoko'
import MenuToko from '@MenuToko'
import Logout from '@Logout'
import NavigatorService from '@NavigatorService'
import { TextInput } from "react-native-gesture-handler";
import { createIconSetFromFontello } from "react-native-vector-icons";
import Axios from "axios";
import { getActiveChildNavigationOptions } from "react-navigation";
import NumberFormat from 'react-number-format';

const Homeseller = (props) => {
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
       <Logout
        title={'Home'}
        onPress={() => props.navigation.goBack()}
        onFilter={()=> logout()}
      />
      <ScrollView vertical={true} style={{ width: '100%', height: '100%' }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
          />}
      >
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

          <View style={styles.viewBtnEdit}>
            <Pressable style={styles.btnProfile} onPress={() => NavigatorService.navigate('Editprofil')}>
              <View style={{ flexDirection: 'row', top: toDp(2) }}>
                <Text style={{ bottom: toDp(2), color: 'white' }}>Edit Profil</Text>
                <Image source={allLogo.iclineright} style={[styles.iclineright, { left: toDp(5), tintColor: 'white' }]} />
              </View>
            </Pressable>
          </View>

          <View style={styles.profil3}>
            <Pressable style={styles.btnPembayaran}>
              <Image source={allLogo.wallet} style={styles.wallet} />
              <Text style={styles.txtPembayaran}>Pembayaran</Text>
            </Pressable>

            <Pressable style={styles.btnPengiriman} onPress={() => NavigatorService.navigate('Pengiriman')} >
              <Image source={allLogo.store} style={styles.store} />
              <Text style={styles.txtPengiriman}>Pengiriman</Text>
            </Pressable>
          </View>

        </View>

       
        <View style={{flexDirection: 'row', width: toDp(350),height: toDp(70), top: toDp(15)}}>
            <Pressable style={styles.presable2} onPress={() => NavigatorService.navigate('Informasitoko')}>
              <View style={{borderWidth: toDp(0.5), borderRadius: toDp(10), padding: toDp(8), borderColor: '#E6E6E6'}}>
              <Image source={allLogo.store2} style={{height: toDp(28),width: toDp(28),resizeMode: 'contain'}} />
              </View>
                <Text style={[styles.textIcon, {textAlign: 'center', fontSize:toDp(12)}]}>Toko Saya</Text>
            </Pressable>
            <Pressable style={styles.presable2} onPress={() => NavigatorService.navigate('Produksaya')}>
              <View style={{borderWidth: toDp(0.5), borderRadius: toDp(10), padding: toDp(8), borderColor: '#E6E6E6'}}>
                <Image source={allLogo.product} style={{height: toDp(28),width: toDp(28), resizeMode: 'contain'}} />
              </View>
                <Text style={[styles.textIcon, {textAlign: 'center', fontSize:toDp(12)}]}>Produk Saya</Text>
            </Pressable>
            <Pressable style={styles.presable2} onPress={() => NavigatorService.navigate('Kategori')}>
              <View style={{borderWidth: toDp(0.5), borderRadius: toDp(10), padding: toDp(3), borderColor: '#E6E6E6'}}>
                <Image source={allLogo.kategori} style={{height: toDp(38), width: toDp(38), resizeMode: 'contain'}} />
              </View>
                <Text style={[styles.textIcon, {textAlign: 'center', fontSize:toDp(12)}]}>Kategori</Text>
            </Pressable>
            
        </View>

        <View style={{ height: toDp(400) }}>
          <View style={styles.Penjualan}>
            <Pressable style={{ marginVertical: toDp(5), bottom: toDp(5), height: toDp(30), justifyContent: 'center' }} onPress={() => NavigatorService.navigate('Ulasan')}>
              <View style={styles.BodySaldo}>
                <Text style={styles.txtSkor}>Skor Toko</Text>
                <Image source={allLogo.iclineright} style={styles.iclineright} />
              </View>
            </Pressable>
            <Pressable style={{ bottom: toDp(10), height: toDp(30), justifyContent: 'center', marginVertical: toDp(5) }} onPress={() => NavigatorService.navigate('Saldopenjual')} >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ marginLeft: toDp(10) }}>Saldo</Text>
                <NumberFormat
                  value={5000000}
                  displayType={'text'}
                  thousandSeparator={'.'}
                  decimalSeparator={','}
                  prefix={'Rp. '}
                  renderText={formattedValue => <Text style={{color: '#F83308', fontWeight: '800', marginRight: toDp(5)}}>{formattedValue}</Text>} // <--- Don't forget this!
                />
              </View>
            </Pressable>
            <View style={{ borderWidth: toDp(0.5), borderColor: 'grey', bottom: toDp(10) }} />

            <Pressable style={{ flexDirection: 'row', justifyContent: 'space-between', bottom: toDp(10) }} onPress={() => alert('Coming Soon')}>
              <Text style={styles.txtPenjualan}>Penjualan</Text>
              <Image source={allLogo.iclineright} style={styles.iclineright1} />
            </Pressable>
            <View style={{ borderWidth: toDp(0.5), borderColor: 'grey', bottom: toDp(10) }} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Pressable style={{ height: toDp(30) }} onPress={() => NavigatorService.navigate('Pengiriman', { content: 'Belumbayar' })} >
                <View style={{ flexDirection: 'row', margin: toDp(10) }}>
                <Image source={allLogo.bag} style={{ bottom: toDp(10), width: toDp(28), height: toDp(28)}} />
                  <Text style={{ padding: toDp(5), bottom: toDp(10) }}>Pesanan Baru</Text>
                </View>
              </Pressable>
              <Pressable style={{ height: toDp(30) }} onPress={() => NavigatorService.navigate('Pengiriman', { content: 'Perludikirim' })}>
                <View style={{ flexDirection: 'row', margin: toDp(10) }}>
                <Image source={allLogo.siapkirim} style={{ bottom: toDp(10),width: toDp(28), height: toDp(28), resizeMode: 'contain' }} />
                  <Text style={{ padding: toDp(5), bottom: toDp(10) }}>Siap dikirim</Text>
                </View>
              </Pressable>
            </View>
            <Text style={{ margin: toDp(10) }}>Kata Pembeli</Text>
            <View style={{ borderWidth: toDp(0.5), borderColor: 'grey' }} />

            <View style={styles.bodyJual}>
              <Pressable style={{ width: toDp(335), height: toDp(30), bottom: toDp(5) }} onPress={() => NavigatorService.navigate('Ulasan')} >
                <View style={{ flexDirection: 'row', margin: toDp(10), top: toDp(10) }}>
                <Image source={allLogo.star} style={{ bottom: toDp(20),width: toDp(28), height: toDp(28) }} />
                  <Text style={{ padding: toDp(5), bottom: toDp(20) }}>ulasan</Text>
                </View>
              </Pressable>
              <Pressable style={{ width: toDp(335), height: toDp(30), top: toDp(10) }} onPress={() => alert('Coming Soon')}>
                <View style={{ flexDirection: 'row', margin: toDp(10) }}>
                <Image source={allLogo.chat} style={{ bottom: toDp(10),width: toDp(28), height: toDp(28), resizeMode: 'contain' }} />
                  <Text style={{ padding: toDp(5), bottom: toDp(10) }}>Diskusi</Text>
                </View>
              </Pressable>
              <Pressable style={{ width: toDp(335), height: toDp(35), top: toDp(15) }} onPress={() => alert('Coming Soon')}>
                <View style={{ flexDirection: 'row', margin: toDp(10) }}>
                <Image source={allLogo.support} style={{ bottom: toDp(5),width: toDp(28), height: toDp(28), resizeMode: 'contain' }} />
                  <Text style={{ padding: toDp(5), bottom: toDp(6) }}>Pesanan Komplain</Text>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={{ position: 'absolute', bottom: 0, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <View style={styles.footer}>
          <Pressable style={[styles.presable, {backgroundColor: state.content === 'home' ? '#234D6C' : '#2A334B'}]} onPress={() => setState(state => ({...state, content: 'Homeseller' }))}>
            <Image source={allLogo.Home1} style={styles.ichome} />
            <Text style={{ color: 'white', fontSize: toDp(13), marginHorizontal: toDp(8), bottom:toDp(8) }}>Beranda</Text>
          </Pressable>
          <Pressable style={[styles.presable, {backgroundColor: state.content === 'tambah' ? '#234D6C' : '#2A334B'}]} onPress={() => NavigatorService.navigate('Tambahproduk')} >
            <Image source={allLogo.Plus} style={styles.icplus} />
            <Text style={{ color: 'white', fontSize: toDp(13), marginHorizontal: toDp(8), bottom:toDp(8)  }}>Tambah</Text>
          </Pressable>
          <Pressable style={[styles.presable, {backgroundColor: state.content === 'chat' ? '#234D6C' : '#2A334B'}]} onPress={() => NavigatorService.navigate('DaftarChat')} >
            <Image source={allLogo.Chat1} style={styles.icchat} />
            <Text style={{ color: 'white', fontSize: toDp(13), right: toDp(3), marginHorizontal: toDp(10), left: toDp(4), bottom:toDp(8)  }}>Chat</Text>
          </Pressable>
        </View>
      </View>


    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    flex: 1,
    backgroundColor: 'white'
  },
  iclineright: {
    width: toDp(10),
    height: toDp(15)
  },
  bodyProfil: {
    backgroundColor: '#2A334B',
    width: toDp(335),
    height: toDp(116),
    borderRadius: toDp(10),
    left: toDp(12),
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
    borderRadius: toDp(25)
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
    bottom: toDp(110),
    width: toDp(120),
    height: toDp(25)
  },
  btnPengiriman: {
    bottom: toDp(100),
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
  btnProfile: {
    // backgroundColor:'yellow',
    left: toDp(170),
    bottom: toDp(10),
    width: toDp(75)
  },
  Body: {
    backgroundColor: '#F9F8F8',
    width: toDp(335),
    height: toDp(80),
    borderRadius: toDp(10),
    top: toDp(30),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  BodySaldo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: toDp(10),
    marginRight: toDp(10)
  },
  Penjualan: {
    backgroundColor: '#F9F8F8',
    width: toDp(335),
    height: toDp(330),
    top: toDp(25),
    left: toDp(12),
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
  txtPenjualan: {
    margin: toDp(10),
  },
  iclineright1: {
    margin: toDp(10),
    width: toDp(10),
    height: toDp(15),
  },
  icchat: {
    width: toDp(35),
    height: toDp(35),
    resizeMode: 'contain',
    tintColor: 'white',
    marginLeft:toDp(12),
    marginBottom:toDp(5)
  },
  icplus: {
    width: toDp(35),
    height: toDp(35),
    resizeMode: 'contain',
    tintColor: 'white',
    marginLeft:toDp(17),
    marginBottom:toDp(5)
  },
  ichome: {
    width: toDp(35),
    height: toDp(35),
    resizeMode: 'contain',
    tintColor: 'white',
    marginLeft:toDp(17),
    marginBottom:toDp(5)
  },
  bodyJual: {
    marginTop: toDp(15)
  },
  footer: {
    width: toDp(340),
    height: toDp(60),
    bottom: toDp(10),
    flexDirection: 'row',
    backgroundColor: '#2A334B',
    borderRadius: toDp(15)
  },
  presable: {
    // backgroundColor:'red',
    borderRadius: toDp(10),
    marginHorizontal: toDp(23),
    width: toDp(70),
    height: toDp(60),
    justifyContent: 'center',
  },
  presable2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: toDp(8),
    marginHorizontal:toDp(5),
  },
  viewBtnEdit: {
    // backgroundColor: 'cyan',
    width: toDp(150),
    height: toDp(48),
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  store: {
    width: toDp(24), 
    height: toDp(24), 
    resizeMode: 'contain',
    tintColor:'#f83308'
  },
  wallet: {
    width: toDp(24), 
    height: toDp(24), 
    resizeMode: 'contain',
    tintColor:'#f83308'
  }
});

export default Homeseller;