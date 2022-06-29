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
  AsyncStorage
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
// import { Modal } from "react-native-paper";

const Tambahproduk = (props) => {
  const [src, setSrc] = useState(null);

  // const Katagori = ["Baja", "Beton", "Kayu", "Logam", "Material Komposit", "Pasir", "Pengikat", "Pintu", "Plastik", "Semen"]

  // const Kondisi = ["Baru", "Bekas"]

  const [state, setState] = useState({
    kategori:'',
    kondisi:'',
    pdd_prd_id:'',
    prd_kd_id:'',
    prd_name:'',
    prd_stock:0,
    prd_price:0,
    prd_thumbnail:'',
    prd_ctg_id:'',
    prd_rtl_id:'',
    prd_berat:0,
    nama_kondisi: '',
    ctg_name:'',
    mb_name:'',
    retail_id:'',
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
    fileUri:'',
    images:[],
    tmb_image:false

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

  }, [])

  // useEffect(() => {
  //   category()

  // },[])

    // const countries = ["Jakarta", "Cirebon", "Bandung", "Kuningan"]

    const category = () => {
      // setState(state => ({...state, loading: true }))
        axios.get('https://market.pondok-huda.com/dev/react/category/')
          .then(result =>{
            // handle success
            setState(state => ({...state, kategori: result.data.data }))
            console.log('----Katagori=====>'+ JSON.stringify(result.data.data));
            // alert(JSON.stringify(result.data));

          }).catch(err =>{
            //console.log(err)
            alert('Gagal menerima data dari server!'+err)
            setState(state => ({...state, loading: false }))
          })
    }

    //====> GET Kondisi Barang pada Tambah Produk Seller <====//

    useEffect(() => {
      getKondisi()

    },[])

      const getKondisi = () => {
        // setState(state => ({...state, loading: true }))
          axios.get('https://market.pondok-huda.com/dev/react/kondisi/')
            .then(result =>{
              // handle success
              setState(state => ({...state, kondisi: result.data.data }))
              console.log('----Kondisi=====>'+ JSON.stringify(result.data.data));
              // alert(JSON.stringify(result.data));

            }).catch(err =>{
              //console.log(err)
              alert('Gagal menerima data dari server!'+err)
              setState(state => ({...state, loading: false }))
            })
      }

    // ====> POST Tambah Produk Seller <====//
    const makeRandom=(length)=> {
        let result           = '';
        let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() *
     charactersLength));
       }
       return result;
    }
    const InputProduk = async () => {
      const body = {
        prd_name:state.prd_name,
        pdd_prd_id:state.pdd_prd_id,
        prd_stock:state.prd_stock,
        prd_price:state.prd_price,
        prd_thumbnail:state.prd_thumbnail,
        prd_ctg_id:state.prd_ctg_id,
        prd_rtl_id:state.id_retail,
        prd_berat:state.prd_berat,
        prd_kd_id:state.prd_kd_id,
        nama_kondisi:state.nama_kondisi,
        ctg_name:state.ctg_name,
      }
      console.log('BODY == Produk===>'+ JSON.stringify(body));

      setState(state => ({...state, loading: true }))
      const formData = new FormData();
      formData.append('prd_name', state.prd_name);
      formData.append('pdd_prd_id', state.pdd_prd_id);
      formData.append('prd_stock', state.prd_stock);
      formData.append('prd_price', state.prd_price);
      formData.append('prd_ctg_id', state.prd_ctg_id);
      formData.append('prd_rtl_id', state.id_retail);
      formData.append('prd_berat', state.prd_berat);
      formData.append('prd_kd_id', state.prd_kd_id);
      formData.append('nama_kondisi', state.nama_kondisi);
      formData.append('ctg_name', state.ctg_name);
      //formData.append("prd_thumbnail",state.fileUri);
      formData.append("prd_thumbnail", {
        uri: state.fileUri.path,
        name: 'image-thumbnail-'+state.prd_name+'-'+'.jpg',
        type: 'image/jpg'
      })

      state.images.forEach((file,i)=>{
          formData.append('images[]', {
            uri: file.uri,
            type: 'image/jpeg',
            name: "product-"+state.prd_name+"-"+makeRandom(21)+"-"+i+"-.jpg",
          });
      });
      console.log('---INI----->'+ JSON.stringify(state.fileUri.path));
      await axios({
        url: 'https://market.pondok-huda.com/dev/react/product/',
        method: 'POST',
        data: formData,
        headers: {
          'Accept': 'application/json',
                  'Content-Type': 'multipart/form-data',
        }
      })

      .then(function(response) {
        console.log("response :", response.data);
        setState(state => ({ ...state,tmb_image:false}))
      })
      .catch(function(error) {
         console.log("error up", error)
         setState(state => ({ ...state,tmb_image:false}))

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
      fetch('https://market.pondok-huda.com/dev/react/product',
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
      setState(state => ({ ...state, fileUri: response.path }))
      //InputProduk(response)
      console.log(response)
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
      if(state.tmb_image==false){
         setState(state => ({ ...state, fileUri: response[0], tmb_image:true}))
          console.log('path -- >'+ JSON.stringify(response[0].path));
      }else{
        setState(state => ({ ...state,
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
    if (state.fileUri!='') {
      return <Image
        source={{ uri: state.fileUri.path }}
        style={styles.images}
      />
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
        title={'Tambah Produk'}
        onPress={() => props.navigation.goBack()}
      />
      {/* <View style={{flex:1}}>

      </View> */}

      <View style={styles.bodyInputProduk}>
        <ScrollView>
          <View>
            <View style={{flexDirection:'row', justifyContent:'space-around',}}>
              <TouchableOpacity style={[styles.btnFoto,{left:0}]}  onPress={()=> setModalVisible(true)}>
                <Text style={styles.txtFoto}>Tambah Foto</Text>
              </TouchableOpacity>
              {renderFileUri()}
            </View>
            <View>
              <Text style={styles.txtFormInput}>Nama Product</Text>
              <TextInput autoCapitalize={'none'}
                style={styles.textInput}
                placeholderTextColor={'grey'}
                value={state.prd_name}
                onChangeText={(text) => setState(state => ({ ...state, prd_name: text }))}
              />
            </View>

            <View>
              <Text style={[styles.txtFormInput, { bottom: toDp(30) }]}>Berat Barang</Text>
              <TextInput autoCapitalize={'none'}
                style={[styles.textInput, { bottom: toDp(40) }]}
                placeholderTextColor={'grey'}
                value={state.prd_berat}
                onChangeText={(text) => setState(state => ({ ...state, prd_berat: text }))}
              />
            </View>

            <View>
              <Text style={[styles.txtFormInput, { bottom: toDp(50) }]}>Harga Barang</Text>
              <TextInput autoCapitalize={'none'}
                style={[styles.textInput, { bottom: toDp(60) }]}
                placeholderTextColor={'grey'}
                value={state.prd_price}
                onChangeText={(text) => setState(state => ({ ...state, prd_price: text }))}
              />
            </View>

            <View>
              <Text style={[styles.txtFormInput, { bottom: toDp(70) }]}>Stok Barang</Text>
              <TextInput autoCapitalize={'none'}
                style={[styles.textInput, { bottom: toDp(80) }]}
                placeholderTextColor={'grey'}
                value={state.prd_stock}
                onChangeText={(text) => setState(state => ({ ...state, prd_stock: text }))}
              />
            </View>

            <View>
              <Text style={styles.txtKategori}>Kategori</Text>
              <SelectDropdown
                buttonStyle={styles.dropdown}
                buttonTextStyle={{ fontSize: toDp(12), color: 'grey' }}
                rowTextStyle={{ fontSize: toDp(12) }}
                dropdownStyle={{ borderRadius: toDp(7) }}
                rowStyle={{ height: toDp(35), padding: toDp(5) }}
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
                buttonTextStyle={{ fontSize: toDp(12), color: 'grey' }}
                rowTextStyle={{ fontSize: toDp(12) }}
                dropdownStyle={{ borderRadius: toDp(7) }}
                rowStyle={{ height: toDp(35), padding: toDp(5) }}
                defaultButtonText={'Pilih Kondisi'}
                data={state.kondisi}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem.kd_id, index)
                  setState(state => ({ ...state, prd_kd_id: selectedItem.kd_id }))
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem.nama_kondisi;
                }}s
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

        </ScrollView>
      </View>

        <View style={{position:'absolute', bottom:0, alignItems:'center', justifyContent:'center', width:'100%' }}>
          <Text>{JSON.stringify(state.tmb_image)}</Text>
          <View style={styles.bodySimpan}>
            <Pressable style={styles.btnSimpan} onPress={() => InputProduk()}>
              <Text style={styles.txtSimpan}>Simpan</Text>
            </Pressable>
          </View>
        </View>
          {/* Modal */}
          <View style={styles.modalBuka}>
            <Modal style={styles.modal} visible={modalVisible} transparent={true} animationType="fade">
                 <View style={styles.viewModal}>
                     <Pressable style={styles.modalClose} onPress={()=> setModalVisible(!modalVisible)}>
                            <Image source={allLogo.icSilang} style={{height: toDp(20), width: toDp(20)}}/>
                        </Pressable>
                    <View style={styles.viewJudul}>
                        <Text style={styles.txtJudul}>Tambah Foto Produk</Text>
                    </View>
                    {/* <View style={{height: 1, width: '100%', backgroundColor: 'green', marginTop: 10}}/>    */}
                        <View style={styles.viewBtn}>
                            <Pressable style={[styles.btnImage, {backgroundColor: '#2A334B'}]} onPress={() => camera()}>
                                <Text style={styles.txtButon}>Kamera</Text>
                            </Pressable>
                            <Pressable style={[styles.btnImage, {backgroundColor: '#2A334B'}]} onPress={() => gallery()}>
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
    flex:1
  },
  contentContainer: {
    paddingVertical: toDp(20)
  },
  bodyInputProduk: {
    backgroundColor: '#f8f9f9',
    width: toDp(335),
    height: toDp(490),
    borderRadius: toDp(8),
    top: toDp(10),
    left:toDp(12),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 3,
  },
  bodySimpan: {
    width: toDp(335),
    height: toDp(42),
  },
  btnSimpan: {
    backgroundColor: '#2A334B',
    width: toDp(335),
    height: toDp(42),
    justifyContent: 'center',
    borderRadius: toDp(8),
    bottom:toDp(5),
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
    width: toDp(320),
    height: toDp(39),
    backgroundColor: '#F2F3F3',
    paddingHorizontal: toDp(8),
    borderRadius: toDp(5),
    bottom: toDp(20),
    margin: toDp(7),
    borderWidth: 0.5
  },
  btnFoto: {
    backgroundColor: 'white',
    marginTop: toDp(20),
    margin: toDp(8),
    height: toDp(53),
    width: toDp(59),
    borderRadius: toDp(5),
    justifyContent: 'center',
    borderWidth: 0.5,
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
    height: toDp(38),
    borderRadius: toDp(8),
    width: toDp(319),
    left: toDp(8),
    backgroundColor: '#f2f3f3',
    bottom: toDp(93),
    borderWidth: 0.5,
  },
  txtVariasi: {
    margin: toDp(3),
    bottom: toDp(30)
  },
  btnVariasi: {
    backgroundColor: '#FFFFFF',
    width: toDp(320),
    height: toDp(39),
    justifyContent: 'center',
    borderRadius: toDp(8),
    bottom: toDp(65),
    left: toDp(8),
    borderWidth: toDp(0.5),
  },
  iclineright: {
    width: toDp(8),
    height: toDp(12.8),
    left: toDp(300),
    bottom: toDp(13)
  },
  txtOngkir: {
    margin: toDp(3),
    bottom: toDp(30)
  },
  btnOngkir: {
    backgroundColor: '#FFFFFF',
    width: toDp(320),
    height: toDp(39),
    justifyContent: 'center',
    borderRadius: toDp(8),
    bottom: toDp(60),
    left: toDp(8),
    borderWidth: toDp(0.5),
  },
  dropdown: {
    height: toDp(38),
    borderRadius: toDp(8),
    width: toDp(319),
    left: toDp(8),
    backgroundColor: 'white',
    bottom: toDp(93),
    borderWidth: toDp(0.5),
  },
  txtKondisi: {
    bottom: toDp(98),
    margin: toDp(8)
  },
  dropdown1: {
    height: toDp(38),
    borderRadius: toDp(8),
    width: toDp(319),
    left: toDp(8),
    backgroundColor: 'white',
    bottom: toDp(100),
    borderWidth: toDp(0.5),
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
    borderRadius: toDp(20),
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
      alignItems: 'center'
  },
  txtJudul: {
      fontSize: toDp(20),
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
      borderRadius: toDp(20)
  },
  txtButon: {
      fontSize: toDp(14),
      fontWeight: 'bold',
      color: 'white'
  },
  images:{
    backgroundColor: 'white',
    marginTop: toDp(20),
    margin: toDp(8),
    height: toDp(53),
    width: toDp(58),
    borderRadius: toDp(10),
    resizeMode: 'contain',
    justifyContent: 'center',
    borderWidth: 0.5,
  }
});

export default Tambahproduk;
