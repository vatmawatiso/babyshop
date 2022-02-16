import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ImageBackground,
  Pressable
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import  HeaderToko  from '@HeaderToko'
import NavigatorService from '@NavigatorService'
import { TextInput } from "react-native-gesture-handler";
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Tambahproduk = (props) => {
  const [src, setSrc]=useState(null);

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

    const Katagori = ["Baja", "Beton", "Kayu", "Logam", "Material Komposit", "Pasir", "Pengikat", "Pintu","Plastik", "Semen"]
    
    const Variasi = ["Baja", "Beton", "Kayu", "Logam", "Material Komposit", "Pasir", "Pengikat", "Pintu","Plastik", "Semen"]

    const Ongkir = ["Baja", "Beton", "Kayu", "Logam", "Material Komposit", "Pasir", "Pengikat", "Pintu","Plastik", "Semen"]

    const Kondisi = ["Baru", "Bekas"]

  return (
    <View style={styles.container}>

        <HeaderToko
          title={'Tambah Produk'}
          onPress={() => props.navigation.goBack()}
        />

        <View style={styles.bodyInputProduk}>
            <Pressable style={styles.btnFoto}>
                <Text style={styles.txtFoto}>Tambah Foto</Text>
            </Pressable>

            <Text style={styles.txtFormInput}>Nama Barang</Text>
            <TextInput  autoCapitalize={'none'}
                style={styles.textInput}                        
                placeholderTextColor={'grey'}
                value={state.produk}
                onChangeText={(text) => setState(state => ({...state, produk: text })) }
            />

            <Text style={[styles.txtFormInput, {bottom:30} ]}>Deskrispi Barang</Text>
            <TextInput  autoCapitalize={'none'}
                style={[styles.textInput, {bottom:40} ]}                        
                placeholderTextColor={'grey'}
                value={state.deskripsi}
                onChangeText={(text) => setState(state => ({...state, deskripsi: text })) }
            />

            <Text style={[styles.txtFormInput, {bottom:50} ]}>Harga Barang</Text>
            <TextInput  autoCapitalize={'none'}
                style={[styles.textInput, {bottom:60} ]}                         
                placeholderTextColor={'grey'}
                value={state.harga}
                onChangeText={(text) => setState(state => ({...state, harga: text })) }
            />

            <Text style={[styles.txtFormInput, {bottom:70} ]}>Stok Barang</Text>
            <TextInput  autoCapitalize={'none'}
                style={[styles.textInput, {bottom:80} ]}                        
                placeholderTextColor={'grey'}
                value={state.stok}
                onChangeText={(text) => setState(state => ({...state, stok: text })) }
            />

            <Text style={styles.txtKategori}>Kategori</Text>
            <SelectDropdown
                          buttonStyle={styles.dropdown}
                          buttonTextStyle={{fontSize:12, color:'grey'}}
                          rowTextStyle={{fontSize:12}}
                          dropdownStyle={{borderRadius:7}}
                          rowStyle={{height:35,padding:5}}
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
                                size={12}
                              />
                            );
                          }}
                    />
            <Text>Variasi</Text>
            <Text>Ongkos Kirim</Text>
            <Text>Kondisi</Text>
        </View>

        <View style={styles.bodySimpan}>
            <Pressable style={styles.btnSimpan}>
                <Text style={styles.txtSimpan}>Simpan</Text>
            </Pressable>
        </View>

    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    top:toDp(50)
  },
  bodyInputProduk: {
      backgroundColor:'cyan',
      width:toDp(335),
      height:toDp(465),
      borderRadius:toDp(8),
      top:toDp(20)
  },
  bodySimpan: {
      width:toDp(335),
      height:toDp(42),
      top:toDp(50), 
  },
  btnSimpan:{
    backgroundColor:'#E7E7E7',
    width:toDp(335),
    height:toDp(42),
    justifyContent:'center',
    borderRadius:toDp(8),
  },
  txtSimpan: {
      textAlign:'center'
  },
  textInput: {
    width: toDp(320),
    height: toDp(39),
    backgroundColor: '#F2F3F3',
    paddingHorizontal: toDp(8),
    borderRadius: toDp(5),
    bottom:toDp(20),
    margin:toDp(7)
  },
  btnFoto: {
    backgroundColor:'red',
    marginTop:toDp(20),
    margin:toDp(8),
    height:toDp(53),
    borderRadius:toDp(5),
    justifyContent:'center'
  },
  txtFoto: {
    textAlign:'center'
  },
  txtFormInput: {
    margin:toDp(8),
    bottom:toDp(10)
  },
  txtKategori: {
    bottom:toDp(90),
    margin:toDp(8)
  },
  dropdown:{
    height:toDp(38),
    borderRadius:toDp(8),
    width:toDp(319),
    left:toDp(8),
    backgroundColor:'white',
    bottom:toDp(93)
  },
});

export default Tambahproduk;