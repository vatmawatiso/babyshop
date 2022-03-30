import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TextInput,
  SafeAreaView,
  Pressable,
  ScrollView,FlatList
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import  Back  from '@Back'
import CheckBox from '@react-native-community/checkbox';
import NavigatorService from '@NavigatorService'
import { typeParameterDeclaration } from "@babel/types";
 
const Pembayaran = (props) => {
 
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
 
    const Address = [
        {
          id: '1',
          nama: 'Vatmawati',
          telepon: '083141520987',
          alamat: 'Jl KiSulaiman Kota Cirebon Jawa Barat '
        },
      ]
    const DATA = [
      {
        id: '1',
        img: 'https://www.freepnglogos.com/uploads/logo-bca-png/bank-central-asia-logo-bank-central-asia-bca-format-cdr-png-gudril-1.png',
        pesan:'Transaksi Pembayaran\nHanya menerima dari Bank BCA\nMetode pembayaran lebih mudah',
      },  {
          id: '2',
          img: 'https://www.freepnglogos.com/uploads/logo-bca-png/bank-central-asia-logo-bank-central-asia-bca-format-cdr-png-gudril-1.png',
          pesan:'Transaksi Pembayaran\nHanya menerima dari Bank BCA\nMetode pembayaran lebih mudah',
        },  {
            id: '3',
            img: 'https://www.freepnglogos.com/uploads/logo-bca-png/bank-central-asia-logo-bank-central-asia-bca-format-cdr-png-gudril-1.png',
            pesan:'Transaksi Pembayaran\nHanya menerima dari Bank BCA\nMetode pembayaran lebih mudah',
          },  {
              id: '4',
              img: 'https://www.freepnglogos.com/uploads/logo-bca-png/bank-central-asia-logo-bank-central-asia-bca-format-cdr-png-gudril-1.png',
              pesan:'Transaksi Pembayaran\nHanya menerima dari Bank BCA\nMetode pembayaran lebih mudah',
            },  {
                id: '5',
                img: 'https://www.freepnglogos.com/uploads/logo-bca-png/bank-central-asia-logo-bank-central-asia-bca-format-cdr-png-gudril-1.png',
                pesan:'Transaksi Pembayaran\nHanya menerima dari Bank BCA\nMetode pembayaran lebih mudah',
              },
    ]
    const ListBank = (item, index) =>{
      return(
        <View style={{marginTop:toDp(0), width:'100%'}}>
            <View style={{flexDirection:'row', marginHorizontal:toDp(5),height:80,alignItems:'center', justifyContent:'space-around'}}>
                <CheckBox style={{marginLeft:-20}}
                    disabled={false}
                    value={toggleCheckBox}
                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
                />
                <Image source={{uri:item.img}} style={{width:70,height:40,left:-5}} />
                <Text style={{fontSize:toDp(12),left:toDp(0)}}>{item.pesan}</Text>
            </View>
            <View style={{borderWidth:toDp(0.5), borderColor:'grey', bottom:toDp(0), width:toDp(335)}} />
        </View>
      )
    }
 
 
     return (
        <View style={styles.container}>
            <Back
            title={'Metode Pembayaran'}
            onPress={() => props.navigation.goBack()}
            />
            <View style={{top:toDp(10), justifyContent:'center', alignItems:'center'}}>
 
                  <View style={{
                    width:'100%',
                    paddingHorizontal:toDp(30),
                    flexDirection:'row',
                    justifyContent:'flex-start',
                    marginTop:toDp(40)
                  }}>
                      <Image source={allLogo.ictransfer} style={styles.ictransfer} />
                      <Text style={styles.txtTransfer}>Transaksi Pembayaran</Text>
                  </View>
 
                  <View style={{marginTop:toDp(5)}}>
                      {/*Pake Flatlist*/}
                      {/*<View>
                          <View style={{flexDirection:'row', marginHorizontal:toDp(14)}}>
                              <CheckBox style={{right:5, bottom:toDp(13)}}
                                  disabled={false}
                                  value={toggleCheckBox}
                                  onValueChange={(newValue) => setToggleCheckBox(newValue)}
                              />
                              <Image source={allLogo.icBCA} style={styles.icBCA} />
                              <Text style={styles.txtBCA}>Transaksi Pembayaran{"\n"}Hanya menerima dari Bank BCA{"\n"}Metode pembayaran lebih mudah</Text>
                          </View>
                          <View style={{borderWidth:toDp(0.5), borderColor:'grey', bottom:toDp(20), left:toDp(15), width:toDp(330)}} />
 
                          <View style={{flexDirection:'row', marginHorizontal:toDp(14)}}>
                              <CheckBox style={{right:toDp(5)}}
                                  disabled={false}
                                  value={toggleCheckBox}
                                  onValueChange={(newValue) => setToggleCheckBox(newValue)}
                              />
                              <Image source={allLogo.icMANDIRI} style={styles.icMANDIRI} />
                              <Text style={styles.txtMANDIRI}>Transaksi Pembayaran{"\n"}Menerima dari semua Bank termasuk{"\n"}Bank Syariah Metode pembayaran{"\n"}lebih mudah</Text>
                          </View>
                          <View style={{borderWidth:toDp(0.5), borderColor:'grey', bottom:toDp(5), left:toDp(15), width:toDp(330)}} />
 
                          <View style={{flexDirection:'row', marginHorizontal:toDp(14)}}>
                              <CheckBox style={{right:toDp(5), top:toDp(7)}}
                                  disabled={false}
                                  value={toggleCheckBox}
                                  onValueChange={(newValue) => setToggleCheckBox(newValue)}
                              />
                              <Image source={allLogo.icBNI} style={styles.icBNI} />
                              <Text style={styles.txtBNI}>Transaksi Pembayaran{"\n"}Hanya Menerima dari Bank BNI{"\n"}Metode pembayaran lebih mudah</Text>
                          </View>
                          <View style={{borderWidth:toDp(0.5), borderColor:'grey', top:toDp(5), left:toDp(15), width:toDp(330)}} />
 
                          <View style={{flexDirection:'row', marginHorizontal:toDp(14)}}>
                              <CheckBox style={{right:5, top:toDp(20)}}
                                  disabled={false}
                                  value={toggleCheckBox}
                                  onValueChange={(newValue) => setToggleCheckBox(newValue)}
                              />
                              <Image source={allLogo.icBRI} style={styles.icBRI} />
                              <Text style={styles.txtBRI}>Transaksi Pembayaran{"\n"}Hanya Menerima dari Bank BRI{"\n"}Metode pembayaran lebih mudah</Text>
                          </View>
                          <View style={{borderWidth:toDp(0.5), borderColor:'grey', top:toDp(18), left:toDp(15), width:toDp(330)}} />
 
                          <View style={{flexDirection:'row', marginHorizontal:toDp(14)}}>
                              <CheckBox style={{right:5, top:toDp(33)}}
                                  disabled={false}
                                  value={toggleCheckBox}
                                  onValueChange={(newValue) => setToggleCheckBox(newValue)}
                              />
                              <Image source={allLogo.icBSI} style={styles.icBSI} />
                              <Text style={styles.txtBSI}>Transaksi Pembayaran{"\n"}Hanya Menerima dari Bank Syariah{"\n"}Indonesia Metode pembayaran{"\n"}lebih mudah</Text>
                          </View>
                          <View style={{borderWidth:toDp(0.5), borderColor:'grey', top:toDp(27), left:toDp(15), width:toDp(330)}} />
 
                          <View style={{flexDirection:'row', marginHorizontal:toDp(14)}}>
                              <CheckBox style={{right:toDp(5), top:toDp(40)}}
                                  disabled={false}
                                  value={toggleCheckBox}
                                  onValueChange={(newValue) => setToggleCheckBox(newValue)}
                              />
                              <Image source={allLogo.icPERMATA} style={styles.icPERMATA} />
                              <Text style={styles.txtPERMATA}>Transaksi Pembayaran{"\n"}Hanya Menerima dari Bank Permata{"\n"}Metode pembayaran lebih mudah</Text>
                          </View>
                          <View style={{borderWidth:toDp(0.5), borderColor:'grey', top:toDp(34), left:toDp(15), width:toDp(330)}} />
                          </View>*/}
                      <FlatList
                          numColumns={1}
                          data={DATA}
                            renderItem={({item, index}) => {
                              return (
                                ListBank(item, index)
                              )
                            }}
                          ListFooterComponent={() => <View style={{height: toDp(100), width:toDp(335)}} />}
                      />
                  </View>
            </View>

            <View style={{position:'absolute', bottom:0, alignItems:'center', justifyContent:'center', width:'100%'}}>
              <Pressable style={[styles.btnKonfirm,{ width:toDp(335)}]} onPress={() => NavigatorService.navigate('Infopembayaran')}>
                      <Text style={styles.txtKonfirm}>Konfirmasi</Text>
              </Pressable>
            </View>
 
        </View>
    );
 
}
 
const styles = StyleSheet.create({
  container: {
    // top:toDp(50),
    flex:1,
 
  },

  txtTransfer: {
      fontWeight:'bold',
      left:toDp(10),
      bottom:toDp(3)
  },
  ictransfer: {
 
    left:toDp(0)
  },
  icBCA: {
     bottom:toDp(10)
  },
  txtBCA: {
      bottom:toDp(24),
      left:toDp(30)
  },
  icMANDIRI: {
    top:toDp(10)
  },
  txtMANDIRI: {
    left:toDp(17),
    bottom:toDp(10)
  },
  icBNI: {
    top:toDp(10)
  },
  txtBNI: {
    left:toDp(30),
  },
  icBRI: {
    top:toDp(25)
  },
  txtBRI: {
    left:toDp(30),
    top:toDp(13)
  },
  icBSI: {
    top:toDp(30),
    right:toDp(8)
  },
  txtBSI: {
    left:toDp(11),
    top:toDp(23)
  },
  icPERMATA: {
    top:toDp(40),
    right:toDp(1)
  },
  txtPERMATA: {
    left:toDp(22),
    top:toDp(30)
  },
  btnKonfirm: {
      backgroundColor:'#2A334B',
      borderRadius:toDp(15),
      width:toDp(335),
      height:toDp(40),
      justifyContent:'center',
      bottom:toDp(5)
  },
  txtKonfirm: {
      textAlign:'center',
      color:'white'
  }
});
 
export default Pembayaran;