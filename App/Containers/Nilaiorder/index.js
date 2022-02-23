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
  Dimensions,
  ScrollView
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import  Back  from '@Back'
import NavigatorService from '@NavigatorService'
import ImagePicker from 'react-native-image-crop-picker'
import { Linking } from "react-native";
import StarRating from 'react-native-star-rating-widget';

const { width, height } = Dimensions.get('window')

const Nilaiorder = (props) => {

    
    const DATA = [
        {
          id: '1',
          produk: 'Gerobak Pasir',
          varian: 'Hijau',
          image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
        },
      ]

    const [state, setState] = useState({
        loading: false,
        valName: false,
        secureTextEntry: true,
        nama: '',
        username: '',
        email: '',
        jenkel: '',
        nomer: '',
        password: '',
        options: {
            width: 750,
            height: 750,
            cropping: true
          }
    })
    const [rating, setRating] = useState(0);


    const camera = () => {
        ImagePicker.openCamera(state.options).then(response => {
        //   upImageToServer(response)
        console.log(response)
        }).catch(err => {
          console.log(err)
          if(err == 'Error: Required permission missing' || err == 'User did not grant camera permission.') {
            Alert.alert(
              'Pengaturan',
              'Akses ambil foto belum diaktifkan.\nBerikan akses untuk memulai mengambil gambar. Aktifkan akses ambil foto dari Pengaturan.',
              [
                {text: 'Nanti Saja', onPress: () => console.log('Cancel')},
                {text: 'Aktifkan', onPress: () => {
                  Linking.openSettings();
                }},
              ],
              {cancelable: false},
            );
          }
        })
      }

      
      const video = () => {
        ImagePicker.openCamera({
            mediaType: 'video',
          }).then(response => {
            //   upImageToServer(response)
            console.log(response)
            }).catch(err => {
              console.log(err)
              if(err == 'Error: Required permission missing' || err == 'User did not grant camera permission.') {
                Alert.alert(
                  'Pengaturan',
                  'Akses ambil foto belum diaktifkan.\nBerikan akses untuk memulai mengambil gambar. Aktifkan akses ambil foto dari Pengaturan.',
                  [
                    {text: 'Nanti Saja', onPress: () => console.log('Cancel')},
                    {text: 'Aktifkan', onPress: () => {
                      Linking.openSettings();
                    }},
                  ],
                  {cancelable: false},
                );
              }
            })
    }


     return (
      <View style={styles.container}>
         <Back
            title={'Sukses Produk'}
            onPress={() => props.navigation.goBack()}
         />  

        <View style={{flexDirection:'row', right:toDp(100), bottom:toDp(40)}}>
            <Image source={{uri: DATA[0].image}} style={styles.imgProduk} />
            <View style={{flexDirection:'column'}}>
                <Text style={styles.txtProduk}>{DATA[0].produk}</Text>
                <Text style={styles.txtVarian}>Varian {DATA[0].varian}</Text>
            </View>
        </View>  
        <View style={{borderWidth:0.5, borderColor:'grey', width:toDp(360), bottom:toDp(30) }} />

        <View>
            <View style={{flexDirection:'row', bottom:toDp(10), justifyContent:'center'}}>
                <StarRating
                    rating={rating}
                    starSize={50}
                    enableHalfStar={false}
                    onChange={setRating}
                />
            </View>
            <Text style={styles.txtRating}>Tambahkan 50 karakter dengan foto dan video untuk{"\n"}memberikan komentar tentang produk yang anda beli</Text>
            
            <View style={{flexDirection:'row', justifyContent:'space-between', top:toDp(20)}}>
                <Pressable style={styles.btnCamera} onPress={()=> camera()}>
                    <Image source={allLogo.iccamera} style={styles.iccamera}/>
                    <Text style={styles.txtCamera}>Kamera</Text>
                </Pressable>
                <Pressable style={styles.btnCamera} onPress={()=> alert('Coming soon')}>
                    <Image source={allLogo.icvideo} style={styles.icvideo}/>
                    <Text style={styles.txtCamera}>Video</Text>
                </Pressable>
            </View>

            <View style={styles.Ulasan}>
                <TextInput  autoCapitalize={'none'}
                    style={styles.textInput}
                    placeholder={'Sesuai Gambar'}                                 
                    placeholderTextColor={'grey'}
                    value={state.nama}
                    onChangeText={(text) => setState(state => ({...state, nama: text })) }
                />
                <View style={{borderWidth:0.5, borderColor:'grey' }} />

                <TextInput  autoCapitalize={'none'}
                    style={styles.textInput}
                    placeholder={'Bahan'}                                 
                    placeholderTextColor={'grey'}
                    value={state.nama}
                    onChangeText={(text) => setState(state => ({...state, nama: text })) }
                />
                <View style={{borderWidth:0.5, borderColor:'grey' }} />

                <TextInput  autoCapitalize={'none'}
                    style={styles.textInput}
                    placeholder={'Harga'}                                 
                    placeholderTextColor={'grey'}
                    value={state.nama}
                    onChangeText={(text) => setState(state => ({...state, nama: text })) }
                />
                <View style={{borderWidth:0.5, borderColor:'grey' }} />

                <TextInput  autoCapitalize={'none'}
                    style={styles.textInput1}
                    placeholder={'Berikan ulasan tentang produk ini'}                                 
                    placeholderTextColor={'grey'}
                    value={state.nama}
                    onChangeText={(text) => setState(state => ({...state, nama: text })) }
                />
            </View>

            <View style={styles.btnUlasan}>
                <Pressable style={styles.btnKirim}>
                    <Text style={styles.txtKirim}>Kirim Ulasan</Text>
                </Pressable>
            </View>
        </View>
     </View>
    );
  
}

const styles = StyleSheet.create({
  container: {
    top:toDp(50),
    justifyContent:'center',
    alignItems: 'center',
  },
  imgProduk: {
    height: toDp(50),
    width: toDp(50),
  },
  txtProduk: {
      left:toDp(10),
      top:toDp(5)
  },
  txtVarian: {
      left:toDp(10),
      top:toDp(10),
      color:'grey'
  },
  txtRating: {
      fontSize:toDp(12),
      textAlign:'center',
      color:'grey'
  },
  btnCamera: {
      borderColor:'#2A334B',
      borderWidth:toDp(1),
      width:toDp(126),
      height:toDp(40),
      borderRadius:toDp(8),
      justifyContent:'flex-end',
      alignItems:'center'
  },
  txtCamera: {
      textAlign:'center'
  },
  iccamera: {
      width:toDp(21),
      height:toDp(16),
      justifyContent:'center',
  },
  icvideo: {
    width:toDp(21),
    height:toDp(16)
  },
  Ulasan: {
      backgroundColor:'white',
      top:toDp(35),
      width:toDp(316),
      height:toDp(150),
      borderRadius:toDp(15),
  },
  txtGambar: {
    marginHorizontal:toDp(10),
    fontSize:toDp(12),
    fontWeight:'bold'
  },
  textInput: {
    backgroundColor: 'white',
    width:toDp(316),
    height:toDp(35),
    borderTopLeftRadius:toDp(15),
    borderTopRightRadius:toDp(15),
    top:toDp(8)
  },
  textInput1: {
    backgroundColor: 'white',
    width:toDp(316),
    height:toDp(55),
    borderBottomLeftRadius:toDp(15),
    borderBottomRightRadius:toDp(15)
  },
  btnUlasan: {
      top:toDp(70),
      alignItems:'center'
  },
  btnKirim: {
      backgroundColor:'#2A334B',
      width:toDp(316),
      height:toDp(40),
      borderRadius:toDp(15),
      justifyContent:'center'
  },
  txtKirim: {
      textAlign:'center',
      color:'white'
  }
});

export default Nilaiorder;