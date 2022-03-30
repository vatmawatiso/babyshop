import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ImageBackground,
  Pressable,
  ScrollView
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import BackHeader from '@BackHeader'
import NavigatorService from '@NavigatorService'
import { TextInput } from "react-native-gesture-handler";
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ImagePicker from 'react-native-image-crop-picker'
import { Linking } from "react-native";

const Tambahproduk = (props) => {
  const [src, setSrc] = useState(null);

  const [state, setState] = useState({
    loading: false,
    produk: '',
    deskripsi: '',
    kategori: '',
    variasi: '',
    harga: '',
    kategori: '',
    stok: '',
    ongkir: '',
    kondisi: ''
  })

  const Katagori = ["Baja", "Beton", "Kayu", "Logam", "Material Komposit", "Pasir", "Pengikat", "Pintu", "Plastik", "Semen"]

  const Kondisi = ["Baru", "Bekas"]

  const camera = () => {
    ImagePicker.openCamera(state.options).then(response => {
      //   upImageToServer(response)
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
            <View>
              <Pressable style={styles.btnFoto} onPress={() => camera()}>
                <Text style={styles.txtFoto}>Tambah Foto</Text>
              </Pressable>
            </View>

            <View>
              <Text style={styles.txtFormInput}>Nama Barang</Text>
              <TextInput autoCapitalize={'none'}
                style={styles.textInput}
                placeholderTextColor={'grey'}
                value={state.produk}
                onChangeText={(text) => setState(state => ({ ...state, produk: text }))}
              />
            </View>

            <View>
              <Text style={[styles.txtFormInput, { bottom: toDp(30) }]}>Deskrispi Barang</Text>
              <TextInput autoCapitalize={'none'}
                style={[styles.textInput, { bottom: toDp(40) }]}
                placeholderTextColor={'grey'}
                value={state.deskripsi}
                onChangeText={(text) => setState(state => ({ ...state, deskripsi: text }))}
              />
            </View>

            <View>
              <Text style={[styles.txtFormInput, { bottom: toDp(50) }]}>Harga Barang</Text>
              <TextInput autoCapitalize={'none'}
                style={[styles.textInput, { bottom: toDp(60) }]}
                placeholderTextColor={'grey'}
                value={state.harga}
                onChangeText={(text) => setState(state => ({ ...state, harga: text }))}
              />
            </View>

            <View>
              <Text style={[styles.txtFormInput, { bottom: toDp(70) }]}>Stok Barang</Text>
              <TextInput autoCapitalize={'none'}
                style={[styles.textInput, { bottom: toDp(80) }]}
                placeholderTextColor={'grey'}
                value={state.stok}
                onChangeText={(text) => setState(state => ({ ...state, stok: text }))}
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
                data={Katagori}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                  return item
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
              <Pressable style={styles.btnOngkir}>
                <Text style={styles.txtOngkir}>Ongkos Kirim</Text>
                <Image source={allLogo.iclineright} style={styles.iclineright} />
              </Pressable>
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
                data={Kondisi}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                  return item
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
          <View style={styles.bodySimpan}>
            <Pressable style={styles.btnSimpan}>
              <Text style={styles.txtSimpan}>Simpan</Text>
            </Pressable>
          </View>
        </View>



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
    backgroundColor: '#E7E7E7',
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

    elevation: 2,
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
    backgroundColor: 'white',
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
    bottom: toDp(65),
    margin: toDp(8)
  },
  dropdown1: {
    height: toDp(38),
    borderRadius: toDp(8),
    width: toDp(319),
    left: toDp(8),
    backgroundColor: 'white',
    bottom: toDp(70),
    borderWidth: toDp(0.5),
  },
});

export default Tambahproduk;
