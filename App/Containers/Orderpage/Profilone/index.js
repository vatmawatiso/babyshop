import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  Alert,
  ImageBackground,
  Pressable
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import  Header  from '@Header'
import { Card } from "react-native-paper";
import NavigatorService from '@NavigatorService'

// import Belumbayar from './Belumbayar'
// import Dikemas from './Dikemas'
// import Dikirim from './Dikirim'
// import Selesai from './Selesai'
// import Dibatalkan from './Dibatalkan'

const Profilone = (props) => {
  const [src, setSrc]=useState(null);

  const DATA = [
    {
      id: '2938492',
      nama: 'Cinthya Dewi CP',
      memberUser: 'Member',
      pengikutUser: 'Pengikut (100)',
      mengikutiUser : 'Mengikuti (4)',
      type: 'Pembeli',
      image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    },
  ]

  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("Edit Profil");
  const klik = () => {
    if(loading == false) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }

  // render() {
  return (
    <View style={styles.container}>
        <Header
          title={'Profil'}
          onPress={() => props.navigation.goBack()}
        />

        <View style={{marginTop:toDp(-45)}}>
            <View style={{backgroundColor: '#2A334B', flexDirection:'row', justifyContent:'space-around', height: toDp(116), width: toDp(316), marginTop:toDp(25), top: toDp(-10), borderRadius: toDp(25)}}>
                <View >
                    <Image source={{uri: DATA[0].image}} style={styles.imgProfil} />
                    <Text style={styles.typeUser}>{DATA[0].type}</Text>
                </View>

                <View style={{alignItems:'center',marginTop:toDp(10), justifyContent:'center',}}>
                    <Text style={styles.nmProfil}>{DATA[0].nama}</Text>
                    <Text style={styles.member}>{DATA[0].memberUser}</Text>

                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={styles.pengikut}>{DATA[0].pengikutUser}</Text>
                        <Text style={styles.mengikuti}>{DATA[0].mengikutiUser}</Text>
                    </View>
                </View>

                <View style={{zIndex:5, justifyContent:'center', marginTop:toDp(15),marginLeft:toDp(-10)}}>
                    <Pressable style={styles.presable}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Image source={allLogo.icwallet} style={styles.icwallet} />
                            <Text style={{marginLeft:toDp(10),color: 'white', fontSize:toDp(10)}}>Pembayaran</Text>
                        </View>
                    </Pressable>
                    <Pressable style={styles.presable}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Image source={allLogo.icstore} style={styles.icstore} />
                            <Text style={{marginLeft:toDp(10),color: 'white', fontSize:toDp(10)}}>Pengiriman</Text>
                        </View>
                    </Pressable>
                    <Pressable style={[styles.presable,{right:toDp(-29),width:toDp(60), height:toDp(20), justifyContent:'center'}]} onPress={() => NavigatorService.navigate('Editprofil')}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Text style={{marginRight:toDp(5),color: 'white', fontSize:toDp(10)}}>{text}</Text>
                            <Image source={allLogo.icline} style={styles.icline} />
                        </View>
                    </Pressable>
                </View>

            </View>
            <View style={{zIndex:0}}>
                <View style={{
                      backgroundColor: '#C4C4C4',
                      width: toDp(316),
                      height: toDp(35),
                      borderRadius: toDp(15),

                      }}>
                    <Text style={{marginVertical: toDp(6), left: toDp(130),}}>Mulai Jual</Text>
                </View>

              <View style={{zIndex:5, justifyContent:'center', marginTop: toDp(10),backgroundColor: '#C4C4C4', width: toDp(316), height: toDp(218), borderRadius: toDp(15)}}>
                  <View style={{bottom:toDp(10)}}>
                      <View style={{flexDirection:'row', alignItems:'center'}}>
                          <Image source={allLogo.icorders} style={styles.icorders} />
                          <Text style={{marginTop:toDp(1), marginLeft:toDp(10),fontSize: toDp(11)}}>Pesanan Saya</Text>
                      </View>

                      <Pressable style={styles.presable}>
                          <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
                              <Image source={allLogo.iclineright} style={{bottom: toDp(17), left:toDp(120), width: toDp(5), height: toDp(12)}} />
                              <Text style={{bottom:toDp(20), marginRight:toDp(25), fontSize: toDp(11)}}>Lihat Riwayat Pesanan</Text>
                          </View>
                      </Pressable>

                      <Text style={{color: 'grey', bottom: toDp(35), left:toDp(2)}}>
                          ________________________________________________
                      </Text>
                  </View>

                <View style={{flexDirection: 'row', justifyContent: 'space-between', bottom:toDp(15)}}> 
                    <Pressable style={{bottom:toDp(33), width:toDp(60), height:toDp(70)}} onPress={()=> NavigatorService.navigate('Orderpage', {content:'Belumbayar'})}>
                      <Image source={allLogo.icbuyer} style={{left: toDp(25), top: toDp(2), width: toDp(23), height: toDp(31)}} />
                      <Text style={{top: toDp(5), left: toDp(18), fontSize: toDp(11)}}>Belum Bayar</Text>
                    </Pressable>
                    <Pressable style={{bottom:toDp(33), marginLeft:toDp(15), width:toDp(60), height:toDp(70)}} onPress={()=> NavigatorService.navigate('Orderpage', {content:'Dikemas'})}>
                      <Image source={allLogo.icpacking} style={{left: toDp(15), top: toDp(8), width: toDp(28), height: toDp(30)}} />
                      <Text style={{top: toDp(8), left: toDp(10), fontSize: toDp(11)}}>Dikemas</Text>
                    </Pressable>
                    <Pressable style={{bottom:toDp(33), marginLeft: toDp(30), width:toDp(60), height:toDp(70)}} onPress={()=> NavigatorService.navigate('Orderpage', {content:'Dikirim'})}>
                      <Image source={allLogo.ictruck} style={{left: toDp(15), top: toDp(8), width: toDp(30), height: toDp(24)}} />
                      <Text style={{top: toDp(15), left: toDp(15), fontSize: toDp(11)}}>Dikirim</Text>
                    </Pressable>
                    <Pressable style={{bottom:toDp(33), marginLeft: toDp(20), width:toDp(60), height:toDp(70)}} onPress={()=> NavigatorService.navigate('Orderpage', {content:'Selesai'})}>
                      <Image source={allLogo.icstars} style={{left: toDp(18), top: toDp(5), width: toDp(26), height: toDp(33)}} />
                      <Text style={{top: toDp(7), left: toDp(11), fontSize: toDp(11)}}>Beri Nilai</Text>
                    </Pressable>
                    
                    <Text style={{color: 'grey', top: toDp(20), right: toDp(303)}}>
                    ________________________________________________
                    </Text>

                  <View style={{backgroundColor: 'white'}}>
                      <Pressable style={{flexDirection:'column', marginLeft: toDp(50)}}>
                          <View style={{alignItems:'flex-start', zIndex:5}}>
                              <Image source={allLogo.icaddress1} style={{right: toDp(640), top: toDp(45)}} />
                              <Text style={{top: toDp(25), right:toDp(610), fontSize: toDp(11)}}>Alamat Pengiriman</Text>
                              <Text style={{right: toDp(610),top: toDp(25), fontSize: toDp(11)}}>
                                Vatmawati (+62) 83120141302 {'\n'}
                                blok pengadangan RT 02 Rw 02 Desa Megu Cilik {'\n'}
                                Kec. Weru Kab. Cirebon {'\n'}
                                KAB. CIREBON - WERU, JAWA BARAT, ID 45154
                              </Text>
                              <Image source={allLogo.iclineright} style={{right: toDp(364), top: toDp(5), width: toDp(5), height: toDp(12)}} />
                          </View>
                      </Pressable>
                  </View>
                </View>
              </View>
            </View>
        </View>

        <View style={{top:toDp(250), position:'absolute'}}>
            <ActivityIndicator 
                animating={loading}
                size="large" 
                color="#6495ED"
            />
        </View>

    </View>
  )
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    top:toDp(50)
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
    fontSize:toDp(10)
  },
  imgProfil: {
    height: toDp(50),
    width: toDp(50),
    top: toDp(25),
    left: toDp(15),
    borderRadius: toDp(25)
  },
  nmProfil: {
    top:toDp(-20),
    fontWeight: 'bold',
    fontSize: toDp(12),
    color: 'white'
  },
  member: {
    fontSize: toDp(10),
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
    marginLeft:toDp(8)
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
    bottom: toDp(1),
    marginLeft:toDp(20)
  },
  presable:{
    zIndex:3,
    marginBottom:toDp(15),
  }
});

export default Profilone;