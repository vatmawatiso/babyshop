import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ImageBackground,
  Pressable,
  ScrollView,
  Modal,
  AsyncStorage,
  ToastAndroid
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import BackHeader from '@BackHeader'
import NavigatorService from '@NavigatorService'
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ImagePicker from 'react-native-image-crop-picker'
import { Linking } from "react-native";
import axios from 'axios';
import { svr } from "../../../Configs/apikey";
// import { Modal } from "react-native-paper";

const EditProduk = (props) => {
  const [src, setSrc] = useState(null);

  // const Katagori = ["Baja", "Beton", "Kayu", "Logam", "Material Komposit", "Pasir", "Pengikat", "Pintu", "Plastik", "Semen"]

  // const Kondisi = ["Baru", "Bekas"]

  const [state, setState] = useState({
    kategori: '',
    kondisi: '',
    pdd_prd_id: '',
    prd_kd_id: '',
    prd_name: '',
    prd_stock: 0,
    prd_price: 0,
    prd_thumbnail: '',
    prd_ctg_id: '',
    prd_rtl_id: '',
    prd_berat: 0,
    nama_kondisi: '',
    ctg_name: '',
    mb_name: '',
    retail_id: '',
    loading: false,
    picture: '../../Assets/img/tzuyu.jpg',
    options: {
      width: 750,
      height: 750,
      cropping: true,
      multiple: true,
      sortOrder: 'desc',
      includeExif: true,
      forceJpg: true,
    },
    fileUri: '',
    images: [],
    tmb_image: false

  })

  const [modalVisible, setModalVisible] = useState(false);

  //====> GET Kategori Barang pada Tambah Produk Seller <====//

  useEffect(() => {
    AsyncStorage.getItem('member').then(response => {
      // console.log('Profil----------->'+ JSON.stringify(response));

      let data = JSON.parse(response);
      // const val = JSON.stringify(data);

      console.log('Member ----------->' + JSON.stringify(data));

      setState(state => ({
        ...state,
        mb_id: data.mb_id,
        mb_name: data.value.mb_name,
        mb_phone: data.value.mb_phone,
        id_retail: data.retail_id,
      }))
      console.log('cek state ----------->' + JSON.stringify(state.id_retail));
      console.log('cek state ----------->' + JSON.stringify(state.mb_name));


    }).catch(err => {
      console.log('err', err)
    })

    category()
    getProdukDetailbyId()

  }, [])

  // useEffect(() => {
  //   category()

  // },[])

  // const countries = ["Jakarta", "Cirebon", "Bandung", "Kuningan"]

  const category = () => {
    // setState(state => ({...state, loading: true }))
    axios.get(svr.url + 'category/' + svr.api)
      // axios.get('https://market.pondok-huda.com/dev/react/category/')
      .then(result => {
        // handle success
        setState(state => ({ ...state, kategori: result.data.data }))
        console.log('----Katagori=====>' + JSON.stringify(result.data.data));
        // alert(JSON.stringify(result.data));

      }).catch(err => {
        //console.log(err)
        // alert('Gagal menerima data dari server!' + err)
        ToastAndroid.show("Gagal menerima data dari server!" + err, ToastAndroid.SHORT)
        setState(state => ({ ...state, loading: false }))
      })
  }

  //====> GET Kondisi Barang pada Tambah Produk Seller <====//

  useEffect(() => {
    getKondisi()

  }, [])

  const getKondisi = () => {
    // setState(state => ({...state, loading: true }))
    axios.get(svr.url + 'kondisi/' + svr.api)
      // axios.get('https://market.pondok-huda.com/dev/react/kondisi/')
      .then(result => {
        // handle success
        setState(state => ({ ...state, kondisi: result.data.data }))
        console.log('----Kondisi=====>' + JSON.stringify(result.data.data));
        // alert(JSON.stringify(result.data));

      }).catch(err => {
        //console.log(err)
        // alert('Gagal menerima data dari server!' + err)
        ToastAndroid.show("Gagal menerima data dari server!" + err, ToastAndroid.SHORT)
        setState(state => ({ ...state, loading: false }))
      })
  }

  const getProdukDetailbyId = () => {
    let pid = props.navigation.state.params.id;
    axios.get(svr.url + 'product/' + pid + '/' + svr.api)
      // Axios.get('https://market.pondok-huda.com/dev/react/product/' + pid)
      .then(response => {
        console.log('PRODUK =====>', (response));
        if (response.data.status == 200) {
          // //save Async Storage
          AsyncStorage.setItem('setProduk', JSON.stringify(response.data))
          AsyncStorage.setItem('idProduk', JSON.stringify(response.data.data[0].id))
          setState(state => ({ ...state, loading: false }))

          let thumbnail = [{
            thum: response.data.data[0]?.thumbnail
          }]

          let images_det = response.data.detail;
          console.log('response 1 =>', (response.data.data))
          if (images_det.length > 0) {

          } else {

          }
          setState(state => ({
            ...state, produk: response.data.data, detail: response.data.detail,
            fotoProduk: images_det.images, thumbnails: thumbnail,
            prd_name: response.data.data[0]?.product_name,
            pdd_prd_id: response.data.data[0]?.id,
            prd_stock: response.data.data[0]?.stock,
            prd_price: response.data.data[0]?.price,
            prd_thumbnail: response.data.data[0]?.thumbnail,
            prd_rtl_id: response.data.data[0]?.retail,
            prd_berat: response.data.data[0]?.berat,
            ctg_name: response.data.data[0]?.category,
          }))
          console.log('stock', state.stoks)
        } else {
          console.log('response 2 =>', response)
        }
      }).catch(error => {
        console.log('error => ', error)
      })
  }


  // ====> POST Tambah Produk Seller <====//
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
  const EditProduk = async () => {
    let pid = props.navigation.state.params.id;
    const body = {
      prd_name: state.prd_name,
      // pdd_prd_id: state.pdd_prd_id,
      prd_stock: state.prd_stock,
      prd_price: state.prd_price,
      prd_thumbnail: state.prd_thumbnail,
      prd_ctg_id: state.prd_ctg_id,
      prd_rtl_id: state.id_retail,
      prd_berat: state.prd_berat,
      // prd_kd_id: state.prd_kd_id,
      // nama_kondisi: state.nama_kondisi,
      // ctg_name: state.ctg_name,
    }
    console.log('BODY == Produk===>', body);

    setState(state => ({ ...state, loading: true }))
    const formData = new FormData();
    formData.append('prd_name', state.prd_name);
    // formData.append('pdd_prd_id', state.pdd_prd_id);
    formData.append('prd_stock', state.prd_stock);
    formData.append('prd_price', state.prd_price);
    formData.append('prd_ctg_id', state.prd_ctg_id);
    formData.append('prd_rtl_id', state.id_retail);
    formData.append('prd_berat', state.prd_berat);
    // formData.append('prd_kd_id', state.prd_kd_id);
    // formData.append('nama_kondisi', state.nama_kondisi);
    // formData.append('ctg_name', state.ctg_name);
    //formData.append("prd_thumbnail",state.fileUri);
    formData.append("prd_thumbnail", {
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
    console.log('---INI----->' + JSON.stringify(formData));
    await axios({
      url: svr.url + 'product/' + pid + '/' + svr.api,
      // https://market.pondok-huda.com/publish/react/product/PRD0002/Q4Z96LIFSXUJBK9U6ZACCB2CJDQAR0XH4R6O6ARVG
      method: 'POST',
      data: formData,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      }
    }).then(function (response) {
      if (response.data.status == 200) {
        // alert('berhasil tambah produk')
        ToastAndroid.show("Berhasil ubah produk", ToastAndroid.SHORT)
        console.log("response :", response);
        setState(state => ({ ...state, tmb_image: false }))
        NavigatorService.navigate('Produksaya')
      } else if (response.data.status == 500) {
        // alert('gagal')
        ToastAndroid.show("Gagal ubah produk", ToastAndroid.SHORT)
        console.log("response :", response);
        setState(state => ({ ...state, tmb_image: false }))
      }
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

  const upImageToServer = (imagePath) => {
    const imageDta = new FormData();
    imageDta.append("prd_thumbnail", {
      uri: imagePath.path,
      name: 'image.jpg',
      type: 'image/jpg'
    })
    console.log('THIS => ', imageDta);
    fetch(svr.url + 'product/' + svr.api,
      // fetch('https://market.pondok-huda.com/dev/react/product',
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data'
        },
        method: 'POST',
        body: imageDta
      }
    ).then(response => response.json())
      .then(response => {
        console.log(response)
        if (response.status == 200) {
          console.log('response =>', response)
        }
      }).catch(err => {
        // console.log(response)
        console.log(err)
        alert('Gagal menerima data dari server!')
        setState(state => ({ ...state, loading: false }))
      })
  }

  const camera = () => {
    ImagePicker.openCamera(state.options).then(response => {
      if (response.size > 154557) {
        alert('Ukuran foto melebihi 1,5 mb')
      } else {
        //InputProduk(response)
        let jum = state.images.length;
        let { images } = state;
        images[jum] = {
          uri: response.path,
          width: response.width,
          height: response.height,
          mime: response.mime,
        };
        setState(state => ({
          ...state,
          images
        }))
      }

      if (state.fileUri == '') {
        setState(state => ({ ...state, fileUri: response, tmb_image: true }))
      }

      console.log('cekcok', (response.size))
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

  const gallery = () => {
    ImagePicker.openPicker(state.options).then(response => {
      //  processUpload(response)
      //setState(state => ({ ...state, fileUri: response.path }))
      if (state.tmb_image == false) {
        setState(state => ({ ...state, fileUri: response[0], tmb_image: true }))
        console.log('path -- >' + JSON.stringify(response[0].path));

        setState(state => ({
          ...state,
          images: response.map((i) => {
            console.log('received image', i);
            return {
              uri: i.path,
              width: i.width,
              height: i.height,
              mime: i.mime,
            };
          }),
        }));
      } else {
        setState(state => ({
          ...state,
          images: response.map((i) => {
            console.log('received image', i);
            return {
              uri: i.path,
              width: i.width,
              height: i.height,
              mime: i.mime,
            };
          }),
        }));
      }
    }).catch(err => {
      console.log(err)
      if (err == 'Error: Required permission missing' || err == 'Error: Cannot access images. Please allow access if you want to be able to select images.') {
        Alert.alert(
          'Pengaturan',
          'Akses pilih foto belum diaktifkan.\nBerikan akses untuk memulai mengambil gambar. Aktifkan akses pilih foto dari Pengaturan.',
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

  const renderFileUri = () => {
    if (state.fileUri != '') {
      console.log('images -- >' + JSON.stringify(state.images.length));
      console.log('this images -- >' + JSON.stringify(state.images));
      return (
        <>
          {state.images.map(v => {

            return (
              <Image
                source={{ uri: v.uri }}
                style={styles.images}
              />
            )
          })}

        </>
      )
    } else {
      return <Image
        source={allLogo.iccamera}
        style={styles.images}
      />
    }
  }

  return (
    <View style={styles.container}>
      <BackHeader
        title={'Edit Produk'}
        onPress={() => props.navigation.goBack()}
      />
      {/* <View style={{flex:1}}>

      </View> */}
      <ScrollView>
        <View style={styles.bodyInputProduk}>

          <View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <TouchableOpacity style={[styles.btnFoto, { left: 0 }]} onPress={() => setModalVisible(true)}>
                  <Text style={styles.txtFoto}>Tambah Foto</Text>
                </TouchableOpacity>
                {renderFileUri()}
              </View>
            </ScrollView>
            <View style={{ marginTop: toDp(20) }}>
              <Text style={styles.txtFormInput}>Nama Product</Text>
              <TextInput autoCapitalize={'none'}
                style={styles.textInput}
                placeholderTextColor={'#4E5A64'}
                placeholder={"Nama product"}
                value={state.prd_name}
                onChangeText={(text) => setState(state => ({ ...state, prd_name: text }))}
              />
            </View>

            <View>
              <Text style={[styles.txtFormInput, { bottom: toDp(30) }]}>Berat Barang</Text>
              <TextInput autoCapitalize={'none'}
                style={[styles.textInput, { bottom: toDp(40) }]}
                placeholderTextColor={'#4E5A64'}
                placeholder={"Berat product"}
                value={state.prd_berat}
                onChangeText={(text) => setState(state => ({ ...state, prd_berat: text }))}
              />
            </View>

            <View>
              <Text style={[styles.txtFormInput, { bottom: toDp(50) }]}>Harga Barang</Text>
              <TextInput autoCapitalize={'none'}
                style={[styles.textInput, { bottom: toDp(60) }]}
                placeholderTextColor={'#4E5A64'}
                placeholder={"Harga product"}
                value={state.prd_price}
                onChangeText={(text) => setState(state => ({ ...state, prd_price: text }))}
              />
            </View>

            <View>
              <Text style={[styles.txtFormInput, { bottom: toDp(70) }]}>Stok Barang</Text>
              <TextInput autoCapitalize={'none'}
                style={[styles.textInput, { bottom: toDp(80) }]}
                placeholderTextColor={'#4E5A64'}
                placeholder={"Stock product"}
                value={state.prd_stock}
                onChangeText={(text) => setState(state => ({ ...state, prd_stock: text }))}
              />
            </View>

            <View>
              <Text style={styles.txtKategori}>Kategori</Text>
              <SelectDropdown
                buttonStyle={styles.dropdown}
                buttonTextStyle={{ fontSize: toDp(12), color: '#4E5A64' }}
                rowTextStyle={{ fontSize: toDp(12) }}
                dropdownStyle={{ borderRadius: toDp(10) }}
                rowStyle={{ height: toDp(48), padding: toDp(5) }}
                defaultButtonText={'Pilih Kategori'}
                data={state.kategori}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem.ctg_id, index)
                  setState(state => ({ ...state, prd_ctg_id: selectedItem.ctg_id }))
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem.ctg_name;
                }}
                rowTextForSelection={(item, index) => {
                  return item.ctg_name;
                }}
                renderDropdownIcon={(isOpened) => {
                  return (
                    <FontAwesome
                      name={isOpened ? "chevron-up" : "chevron-down"}
                      color={"#444"}
                      size={toDp(12)}
                    />
                  );
                }}
              />
            </View>

            <View>
              <Text style={styles.txtKondisi}>Kondisi</Text>
              <SelectDropdown
                buttonStyle={styles.dropdown1}
                buttonTextStyle={{ fontSize: toDp(12), color: '#4E5A64' }}
                rowTextStyle={{ fontSize: toDp(12) }}
                dropdownStyle={{ borderRadius: toDp(10) }}
                rowStyle={{ height: toDp(48), padding: toDp(5) }}
                defaultButtonText={'Pilih Kondisi'}
                data={state.kondisi}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem.kd_id, index)
                  setState(state => ({ ...state, prd_kd_id: selectedItem.kd_id }))
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem.nama_kondisi;
                }} s
                rowTextForSelection={(item, index) => {
                  return item.nama_kondisi;
                }}
                renderDropdownIcon={(isOpened) => {
                  return (
                    <FontAwesome
                      name={isOpened ? "chevron-up" : "chevron-down"}
                      color={"#444"}
                      size={toDp(12)}
                    />
                  );
                }}
              />

            </View>

          </View>


        </View>
      </ScrollView>

      <View style={{ marginBottom: 20, alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: toDp(26), backgroundColor: 'white', paddingVertical: 20,height:toDp(0) }}>
        <Text style={{ marginBottom: 0, }}>{JSON.stringify(state.tmb_image)}</Text>
        <View style={styles.bodySimpan}>
          <Pressable style={styles.btnSimpan} onPress={() => EditProduk()}>
            <Text style={styles.txtSimpan}>Simpan</Text>
          </Pressable>
        </View>
      </View>
      

      {/* Modal */}
      <View style={styles.modalBuka}>
        <Modal style={styles.modal} visible={modalVisible} transparent={true} animationType="fade">
          <View style={styles.viewModal}>
            <Pressable style={styles.modalClose} onPress={() => setModalVisible(!modalVisible)}>
              <Image source={allLogo.iccross} style={{ height: toDp(20), width: toDp(20), right: toDp(10) }} />
            </Pressable>
            <View style={styles.viewJudul}>
              <Text style={styles.txtJudul}>Tambah Foto Produk</Text>
            </View>
            {/* <View style={{height: 1, width: '100%', backgroundColor: 'green', marginTop: 10}}/>    */}
            <View style={styles.viewBtn}>
              <Pressable style={[styles.btnImage, { backgroundColor: '#2A334B' }]} onPress={() => camera()}>
                <Text style={styles.txtButon}>Kamera</Text>
              </Pressable>
              <Pressable style={[styles.btnImage, { backgroundColor: '#2A334B' }]} onPress={() => gallery()}>
                <Text style={styles.txtButon}>Galeri</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>

      {/* end modal */}



    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    flex: 1,
    backgroundColor: 'white'
  },
  contentContainer: {
    paddingVertical: toDp(20)
  },
  bodyInputProduk: {
    backgroundColor: 'white',
    width: toDp(340),
    height: toDp(560),
    borderRadius: toDp(10),
    // top: toDp(10),
    marginBottom: 40,
    // backgroundColor:'green',
    marginLeft: toDp(3)
  },
  bodySimpan: {
    width: toDp(335),
    height: toDp(48),
    marginRight:toDp(6),
    // backgroundColor:'red'
  },
  btnSimpan: {
    backgroundColor: '#2A334B',
    width: toDp(340),
    height: toDp(48),
    justifyContent: 'center',
    borderRadius: toDp(10),
    // bottom: toDp(10),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
  txtSimpan: {
    textAlign: 'center',
    color: 'white'
  },
  textInput: {
    width: toDp(340),
    height: toDp(48),
    backgroundColor: '#FFFFFF',
    paddingHorizontal: toDp(8),
    borderRadius: toDp(10),
    bottom: toDp(20),
    margin: toDp(7),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
  },
  btnFoto: {
    backgroundColor: 'white',
    marginTop: toDp(20),
    margin: toDp(8),
    height: toDp(53),
    width: toDp(59),
    borderRadius: toDp(10),
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
  },
  txtFoto: {
    textAlign: 'center',
    color: 'grey'
  },
  txtFormInput: {
    margin: toDp(8),
    bottom: toDp(10)
  },
  txtKategori: {
    bottom: toDp(90),
    margin: toDp(8),
  },
  dropdown: {
    height: toDp(48),
    borderRadius: toDp(10),
    width: toDp(325),
    left: toDp(8),
    backgroundColor: '#FFFFFF',
    bottom: toDp(93),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
  },
  txtVariasi: {
    margin: toDp(3),
    bottom: toDp(30)
  },
  btnVariasi: {
    backgroundColor: '#FFFFFF',
    width: toDp(320),
    height: toDp(48),
    justifyContent: 'center',
    borderRadius: toDp(10),
    bottom: toDp(65),
    left: toDp(8),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
  },
  iclineright: {
    width: toDp(8),
    height: toDp(12.8),
    left: toDp(300),
    bottom: toDp(13)
  },
  dropdown: {
    height: toDp(48),
    borderRadius: toDp(10),
    width: toDp(340),
    left: toDp(8),
    backgroundColor: 'white',
    bottom: toDp(93),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
  },
  txtKondisi: {
    bottom: toDp(98),
    margin: toDp(8)
  },
  dropdown1: {
    height: toDp(48),
    borderRadius: toDp(10),
    width: toDp(340),
    left: toDp(8),
    backgroundColor: 'white',
    bottom: toDp(100),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
  },
  // modalBuka: {
  //   justifyContent: 'center',
  //   alignItems: 'center'
  // },
  viewModal: {
    // flex: 1,
    marginTop: '50%',
    marginLeft: toDp(17),
    width: '90%',
    backgroundColor: '#fff',
    height: toDp(200),
    borderRadius: toDp(10),
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalClose: {
    height: toDp(20),
    width: toDp(20),
    position: 'absolute',
    right: toDp(10), marginTop: toDp(10),
    zIndex: 2,
  },
  viewJudul: {
    marginTop: toDp(10),
    justifyContent: 'center',
    // color: '#4E5A64',
    alignItems: 'center'
  },
  txtJudul: {
    fontSize: toDp(20),
    color: '#4E5A64',
    fontWeight: 'bold'
  },
  viewBtn: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: toDp(60),
  },
  btnImage: {
    justifyContent: 'center',
    alignItems: 'center',
    height: toDp(48),
    width: toDp(80),
    borderRadius: toDp(10)
  },
  txtButon: {
    fontSize: toDp(14),
    fontWeight: 'bold',
    color: 'white'
  },
  images: {
    backgroundColor: 'white',
    marginTop: toDp(20),
    margin: toDp(8),
    height: toDp(53),
    width: toDp(58),
    borderRadius: toDp(10),
    resizeMode: 'cover',
    justifyContent: 'center',
    borderWidth: 0.5,
  }
});

export default EditProduk;
