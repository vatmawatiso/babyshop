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
  AsyncStorage
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
    Choosecamera: '',
    fileUri: '',
    options: {
      width: 750,
      height: 750,
      cropping: true
    }
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
      // console.log(ids)
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
      uri: state.fileUri.path,
      name: 'image-thumbnail-' + state.prd_name + '-' + '.jpg',
      type: 'image/jpg'
    })

    state.images.forEach((file, i) => {
      formData.append('images[]', {
        uri: file.uri,
        type: 'image/jpeg',
        name: "product-" + state.prd_name + "-" + makeRandom(21) + "-" + i + "-.jpg",
      });
    });

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
      alert('berhasil tambah komentar')
      console.log("response :", response.data);
      setState(state => ({ ...state, tmb_image: false }))


    }).catch(function (error) {
      console.log("error up", error)
      setState(state => ({ ...state, tmb_image: false }))

      if (error.response) {
        // Request made and server responded
        console.log('1. ', error.response);
        console.log('2. ', error.response.status);
        console.log('3. ', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log('4.', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    })
  }

  // ImageResizer.createResizedImage(
  //   path,
  //   maxWidth,
  //   maxHeight,
  //   compressFormat,
  //   quality,
  //   rotation,
  //   outputPath
  // )
  //   .then((response) => {
  //     // response.uri is the URI of the new image that can now be displayed, uploaded...
  //     // response.path is the path of the new image
  //     // response.name is the name of the new image with the extension
  //     // response.size is the size of the new image
  //   })
  //   .catch((err) => {
  //     // Oops, something went wrong. Check that the filename is correct and
  //     // inspect err to get more details.
  //   });


  const camera = () => {
    ImagePicker.openCamera(state.options).then(response => {
      //   upImageToServer(response)

      if (response.size > 354557) {
        alert('Ukuran foto melebihi 1,5 mb')
      } else {
        //InputProduk(response)
        let jum = state.Choosecamera.length;
        let { Choosecamera } = state;
        Choosecamera[jum] = {
          uri: response.path,
          width: response.width,
          height: response.height,
          mime: response.mime,
        };
        setState(state => ({
          ...state,
          Choosecamera
        }))
      }

      if (state.fileUri == '') {
        setState(state => ({ ...state, fileUri: response, tmb_image: true }))
      }

      console.log('cek camera = ', response)
      // setState(state => ({ ...state, Choosecamera: response }))

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
          {/* <Pressable style={styles.btnCamera} onPress={() => video()}>
            <Image source={allLogo.icvideo} style={styles.icvideo} />
            <Text style={styles.txtCamera}>Video</Text>
          </Pressable> */}
        </View>
      </View>

      <View style={styles.Ulasan}>
        <TextInput autoCapitalize={'none'}
          top={toDp(4)}
          width={toDp(340)}
          height={toDp(140)}
          borderRadius={toDp(10)}
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
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    backgroundColor: '#FFF',
    width: toDp(340),
    height: toDp(170),
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
    width: toDp(110),
    height: toDp(48),
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
    marginTop: toDp(40),
    borderRadius: toDp(10),
    justifyContent: 'center'
  },
  txtKirim: {
    textAlign: 'center',
    color: 'white'
  }
});

export default Nilaiorder;