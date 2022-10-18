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
  ScrollView,
  AsyncStorage,
  ToastAndroid
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import Back from '@Back'
import NavigatorService from '@NavigatorService'
import ImagePicker from 'react-native-image-crop-picker'
import { Linking } from "react-native";
import StarRating from 'react-native-star-rating-widget';
import NumberFormat from 'react-number-format';
import axios from "axios";
import { svr } from "../../Configs/apikey";
import ImageResizer from '@bam.tech/react-native-image-resizer';
import { err } from "react-native-svg/lib/typescript/xml";

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
    id: '',
    retail_id: '',
    retail_name: '',
    prd_name: '',
    thumbnail: '',
    subtotal: '',
    qtyall: '',
    prd_id: '',
    komentar: '',
    mb_id: '',
    Choosecamera: '',
    Chooseimage: '',
    Choosevideo: '',
    komentar: '',
    options: {
      cropping: true,
      freeStyleCropEnabled: true,
      width: 750,
      height: 750,
      compressImageQuality: 0.6,
      compressImageMaxWidth: 720,
      compressImageMaxHeight: 720
    },
    mbid: '',
    ulas: 'sudahDiulas'
  })
  const [rating, setRating] = useState(0);

  useEffect(() => {
    setState(state => ({
      ...state,
      id: props.navigation.state.params.id,
      retail_id: props.navigation.state.params.retail_id,
      retail_name: props.navigation.state.params.retail_name,
      prd_name: props.navigation.state.params.prd_name,
      thumbnail: props.navigation.state.params.thumbnail,
      subtotal: props.navigation.state.params.subtotal,
      qtyall: props.navigation.state.params.qtyall,
      prd_id: props.navigation.state.params.prd_id,
    }))
    console.log("odr id = " + props.navigation.state.params.id);


    AsyncStorage.getItem('uid').then(uids => {
      // console.log('ids', uids)
      let ids = uids;
      setState(state => ({
        ...state,
        mb_id: ids,
      }))
      console.log('cekcok =c', ids)
    }).catch(err => {
      console.log('err', err)
    })

  }, [])


  //POST KOMENTAR
  const postKomen = async () => {
    setState(state => ({ ...state, loading: true }))
    const formData = new FormData();
    formData.append('km_odr_id', state.id);
    formData.append('prd_km_id', state.prd_id);
    // formData.append('foto_km', state.Choosecamera);
    formData.append('komentar', state.komentar);
    formData.append('ratting', rating);
    formData.append('km_mb_id', state.mb_id);
    formData.append("foto_km", {
      uri: state.Chooseimage.path,
      name: 'IMCK-' + state.prd_id + '-' + makeRandom(12) + '.jpg',
      type: 'image/jpg'
    })

    console.log('formData = ' + JSON.stringify(formData));

    await axios({
      url: svr.url + 'komentar/' + svr.api,
      // https://market.pondok-huda.com/publish/react/komentar/Q4Z96LIFSXUJBK9U6ZACCB2CJDQAR0XH4R6O6ARVG
      method: 'POST',
      data: formData,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      }
    }).then(function (response) {
      console.log('Response post ' + JSON.stringify(response.data));

      if (response.data.status == 201) {
        ToastAndroid.show("Berhasil kirim komentar", ToastAndroid.SHORT)
        NavigatorService.navigate('Ulasansaya', {mb_id: state.mb_id})
        // props.navigation.goBack()
        console.log('Response 201 ==> : ' + JSON.stringify(response.data))
        setState(state => ({ ...state, loading: false }))
        //NavigatorService.navigation('Alamattoko');

      } else if (response.data.status == 200) {
        ToastAndroid.show("Order sudah diberi ulasan!", ToastAndroid.SHORT)
        // props.navigation.goBack({ulas: state.ulas})
        NavigatorService.navigate('Orderpage', { content: 'Selesai', mb_id: state.mb_id, ulas: state.ulas})
        console.log('cekkkcokkk = ', state.ulas)
        
      } else if (response.data.status == 500) {
        ToastAndroid.show("Data tidak ditemukan!')!", ToastAndroid.SHORT)
        setState(state => ({ ...state, loading: false }))

      } else if (response.data.status == 404) {
        ToastAndroid.show("Gagal kirim komentar!')!", ToastAndroid.SHORT)
        setState(state => ({ ...state, loading: false }))
        //console.log('-----COBA=====>'+ JSON.stringify(body));
      }


    }).catch(function (error) {
      // alert('Gagal menerima data dari server!' + error)
      ToastAndroid.show("Gagal menerima data dari server!" + error, ToastAndroid.SHORT)
      setState(state => ({ ...state, loading: false }))
    })
  }

  const makeRandom = (length) => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }


  const camera = () => {
    ImagePicker.openCamera(state.options).then(response => {
      setState(state => ({ ...state, Chooseimage: response }))
      console.log('THIS-IMG--->', response)

    }).catch(err => {
      console.log(err)
      if (err == 'Error: Required permission missing' || err == 'User did not grant camera permission.') {
        Alert.alert(
          'Pengaturan',
          'Akses ambil foto belum diaktifkan.\nBerikan akses untuk memulai mengambil gambar. Aktifkan akses ambil foto dari Pengaturan.',
          [
            { text: 'Nanti Saja', onPress: () => console.log('Cancel') },
            {
              text: 'Aktifkan', onPress: () => {
                Linking.openSettings();
              }
            },
          ],
          { cancelable: false },
        );
      }
    })
  }


  // const video = () => {
  //   ImagePicker.openCamera({
  //     mediaType: 'video',
  //   }).then(response => {
  //     //   upImageToServer(response)
  //     console.log('cek video = ', response)
  //     setState(state => ({ ...state, Choosevideo: response }))

  //   }).catch(err => {
  //     console.log(err)
  //     if (err == 'Error: Required permission missing' || err == 'User did not grant camera permission.') {
  //       Alert.alert(
  //         'Pengaturan',
  //         'Akses ambil foto belum diaktifkan.\nBerikan akses untuk memulai mengambil gambar. Aktifkan akses ambil foto dari Pengaturan.',
  //         [
  //           { text: 'Nanti Saja', onPress: () => console.log('Cancel') },
  //           {
  //             text: 'Aktifkan', onPress: () => {
  //               Linking.openSettings();
  //             }
  //           },
  //         ],
  //         { cancelable: false },
  //       );
  //     }
  //   })
  // }


  return (
    <View style={styles.container}>
      <Back
        title={'Nilai Produk'}
        onPress={() => props.navigation.goBack()}
      />
      <ScrollView>

        <View style={styles.header}>
          <Image source={{ uri: state.thumbnail }} style={styles.imgProduk} />
          <View style={{ marginTop: toDp(0), marginLeft: toDp(10) }}>
            <Text style={{ fontWeight: '800' }}>{state.retail_name}</Text>
            <Text style={{ fontWeight: '800', width: toDp(200) }}>{state.prd_name}</Text>
            <Text style={{ top: toDp(10), fontWeight: '800', fontSize: toDp(13), width: toDp(180) }}>Total : {state.qtyall} Produk</Text>
            <NumberFormat
              value={state.subtotal}
              displayType={'text'}
              thousandSeparator={'.'}
              decimalSeparator={','}
              prefix={'Rp. '}
              renderText={formattedValue => <Text style={{ top: toDp(10), color: '#F83308', fontWeight: '800', }}>{formattedValue}</Text>} // <--- Don't forget this!
            />
          </View>
        </View>

        <View style={styles.body}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: toDp(10) }}>
            <StarRating
              rating={rating}
              starSize={toDp(50)}
              enableHalfStar={false}
              onChange={setRating}
            />
          </View>
          <Text style={styles.txtRating}>Tambahkan 50 karakter dengan foto dan video untuk{"\n"}memberikan komentar tentang produk yang anda beli</Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', top: toDp(20) }}>
            <Pressable style={styles.btnCamera} onPress={() => camera()}>
              <Image source={allLogo.iccamera} style={styles.iccamera} />
              <Text style={styles.txtCamera}>Kamera</Text>
            </Pressable>
            <View>
              {state.Chooseimage != '' ?
                <>
                  <Image source={{ uri: state.Chooseimage.path }} style={styles.images} />
                </>
                :
                <>
                  <Image source={allLogo.iccamera} style={styles.images} />
                </>
              }

            </View>
          </View>
        </View>

        <View style={styles.Ulasan}>
          <TextInput autoCapitalize={'none'}
            top={toDp(4)}
            width={toDp(340)}
            height={toDp(140)}
            borderRadius={toDp(10)}
            multiline={true}
            backgroundColor={'white'}
            style={styles.textInput}
            placeholder={'Komentar terkait pesanan anda. . .'}
            placeholderTextColor={'#4E5A64'}
            value={state.komentar}
            onChangeText={(text) => setState(state => ({ ...state, komentar: text }))}
          />
        </View>

        <View style={styles.btnUlasan} >
          <Pressable style={styles.btnKirim} onPress={() => postKomen()}>
            <Text style={styles.txtKirim}>Kirim Ulasan</Text>
          </Pressable>
        </View>

      </ScrollView>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  images: {
    backgroundColor: 'white',
    marginTop: toDp(0),
    margin: toDp(8),
    height: toDp(80),
    width: toDp(90),
    marginRight: toDp(20),
    borderRadius: toDp(10),
    resizeMode: 'cover',
    justifyContent: 'center',
    borderWidth: 0.5,
  },
  body: {
    backgroundColor: '#FFF',
    width: toDp(340),
    height: toDp(220),
    borderRadius: toDp(10),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: toDp(10),
    width: toDp(340),
    height: toDp(130),
    marginTop: toDp(10),
    padding: toDp(10),
    marginBottom: toDp(10),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
  },
  imgProduk: {
    height: toDp(100),
    width: toDp(100),
    // marginTop: toDp(10),
  },
  txtProduk: {
    left: toDp(10),
    top: toDp(5)
  },
  txtVarian: {
    left: toDp(10),
    top: toDp(10),
    color: 'grey'
  },
  txtRating: {
    fontSize: toDp(12),
    textAlign: 'center',
    color: 'grey'
  },
  btnCamera: {
    backgroundColor: '#F83308',
    borderRadius: toDp(10),
    width: toDp(90),
    height: toDp(80),
    marginHorizontal: toDp(20),
    borderRadius: toDp(8),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
  },
  txtCamera: {
    textAlign: 'center',
    color: '#FFF'
  },
  iccamera: {
    width: toDp(21),
    height: toDp(16),
    justifyContent: 'center',
    tintColor: '#FFF'
  },
  icvideo: {
    width: toDp(21),
    height: toDp(16),
    tintColor: '#FFF'
  },
  // Ulasan: {
  //   backgroundColor: 'white',
  //   marginTop: toDp(10),
  //   width: toDp(316),
  //   height: toDp(150),
  //   borderRadius: toDp(15),
  //   justifyContent: 'center',
  //   width: toDp(335),
  //   shadowColor: "#000",
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 3.84,

  //   elevation: 2,
  // },
  txtGambar: {
    marginHorizontal: toDp(10),
    fontSize: toDp(12),
    fontWeight: 'bold'
  },
  textInput: {
    paddingHorizontal: toDp(10),
    backgroundColor: '#FFF',
    marginTop: toDp(10),
    paddingBottom: toDp(100),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
  },
  btnUlasan: {
    position: 'relative',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  btnKirim: {
    backgroundColor: '#2A334B',
    width: toDp(340),
    height: toDp(48),
    marginTop: toDp(10),
    borderRadius: toDp(10),
    justifyContent: 'center'
  },
  txtKirim: {
    textAlign: 'center',
    color: 'white'
  }
});

export default Nilaiorder;