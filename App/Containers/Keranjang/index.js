import React, { Picker, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Button,
  Modal,
  StatusBar,
  ImageBackground,
  Pressable,
  FlatList,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import Header from '@Header'
import BackHeader from '@BackHeader'
import NavigatorService from '@NavigatorService'
import { Card } from "react-native-paper";
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import NumericInput from 'react-native-numeric-input'
import CheckBox from '@react-native-community/checkbox';
import { color } from "react-native-reanimated";
import { ScrollView } from "react-native-gesture-handler";
import Axios from "axios";

const Keranjang = (props) => {

  const [state, setState] = useState({
    dataCart: [],
    id:''
  })

  useEffect(() => {
    // get id pengguna
    AsyncStorage.getItem('uid').then(uids => {
      let ids = uids;
      setState(state => ({...state, id: ids}))
      console.log('id', state.id)
    }).catch(error => {
      console.log('error', error)
    })

    getCart()

  }, [])
  // get data produk di keranjang
  const getCart = () => {
    let mid = props.navigation.state.params.id
    Axios.get('https://market.pondok-huda.com/dev/react/cart/?mb_id='+mid)
    .then(response => {
      if(response.data.status == 200) {
        console.log('response =>', response)
        setState(state => ({...state, dataCart: response.data.data}))
      } else if (response.data.status == 404){
        <>
          <Text style={{alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: toDp(15) }}>
            Anda Belum Memasukan Barang Ke Keranjang
          </Text>
        </>
        console.log('response', response)
      } else {
        alert('Gagal Mengambil Data')
        console.log('response =>', response)
      }
    }).catch(error => {
      console.log('error', error)
    })
  }

  // refresh data cart

  const refresh = () => {
    let mid = props.navigation.state.params.id
    Axios.get('https://market.pondok-huda.com/dev/react/cart/?mb_id='+mid)
    .then(response => {
      if(response.data.status == 200) {
        console.log('response =>', response)
        setState(state => ({...state, dataCart: response.data.data}))
      } else if (response.data.status == 404){
        <>
          <Text style={{alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: toDp(15) }}>
            Anda Belum Memasukan Barang Ke Keranjang
          </Text>
        </>
        console.log('response', response)
      } else {
        alert('Gagal Mengambil Data')
        console.log('response =>', response)
      }
    }).catch(error => {
      console.log('error', error)
    })
  }

  // deleete keranjang
  const delCart = (cid, pid) => {
    console.log('Cart Id =>', cid+pid)
    Axios.delete('https://market.pondok-huda.com/dev/react/cart/delete/'+cid+'/'+pid)
    .then(response => {
      console.log('response =>', response);
        if(response.data.status == 200) {
          alert('Berhasil Menghapus Produk dari Keranjang')
          refresh()
          setState(state => ({...state, dataCart: response.data.data}))
        } else if (response.data.data == 500) {
          alert('Gagal Menghapus Produk dari Keranjang')
        }
    }).catch(error => {
      console.log('error =>', error)
    })
  }

  // delete all data cart
  const delCartAll = (id) => {
    console.log('Cart Id =>', id)
    Axios.delete('https://market.pondok-huda.com/dev/react/cart/delall/'+id)
    .then(response => {
      console.log('response =>', response);
        if(response.data.status == 200) {
          console.log('response hapus => ', response)
          alert('Berhasil Menghapus Produk dari Keranjang')
          refresh()
          setState(state => ({...state, dataCart: response.data.data}))
        } else if (response.data.data == 500) {
          alert('Gagal Menghapus Produk dari Keranjang')
        }
    }).catch(error => {
      console.log('error =>', error)
    })
  }
  const delAlert = (id) => {
    Alert.alert(
      "Hapus Semua Produk Di Keranjang",
      "Yakin Hapus Semua Produk ?",
      [
        {
          text: "Kembali",
          onPress: () => console.log("Kembali Pressed")
        },
        {
          text: "Hapus",
          onPress: () => delCartAll(id)
        }
      ]
    )
  }
  


  const RenderItem = (item, index) => {
    return (
      <View style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.orderCart}>

          {/*produk dari setiap toko*/}
          <View style={styles.orderCartone}>
            {/*Identitas produk*/}
            <View style={{ width: '100%', height: toDp(40) }}>
              <View style={{ flexDirection: 'row' }}>

                <Text style={{ fontWeight: 'bold', marginLeft: toDp(15), top: toDp(6) }}>{item.retail_name}</Text>
              </View>
              <Text style={{ marginTop: toDp(10), marginLeft: toDp(15) }}>{item.crd_prd_name}</Text>
            </View>
            {/*Identitas produk*/}

            {/*Per produk*/}
            <View style={{ flexDirection: 'row', marginTop: toDp(20), marginBottom: toDp(20) }}>
              <View style={{ marginLeft: toDp(12) }}>
                <Image source={{uri: item.thumbnail}} style={styles.imgProduk} />
              </View>

              <View style={{ marginLeft: toDp(12) }}>
                <Text style={{ fontSize: toDp(12), fontWeight: 'bold', marginBottom: toDp(5) }}>{item.crd_prd_name}</Text>
                <Text style={{ fontSize: toDp(14), marginTop: toDp(10) }}>{item.crd_price}</Text>

                <View style={{ flexDirection: 'row', marginTop: toDp(25), justifyContent: 'center', alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => delCart(item.id, item.crd_prd_id)}>
                    <Image source={allLogo.ictrash} style={{ width: toDp(20), height: toDp(25), resizeMode: 'cover', marginRight: toDp(12) }} />
                  </TouchableOpacity>
                <NumericInput
                  value={item.crd_qty}
                  minValue={0}
                  maxValue={10}
                  onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                  totalWidth={90}
                  totalHeight={30}
                  iconSize={toDp(25)}
                  step={1}
                  valueType='real'
                  rounded
                  textColor='black'
                  inputStyle={{ backgroundColor: 'white' }}
                  iconStyle={{ color: 'white' }}
                  rightButtonBackgroundColor='#698498'
                  leftButtonBackgroundColor='#698498'
                />
                </View>

              </View>
            </View>


            {/*Per produk*/}

          </View>
          {/*produk dari setiap toko*/}

        </View>


      </View>

    )

  };

  const CardProduct = () => {
    return (
      <View style={styles.content}>
        <FlatList style={{ width: toDp(335), top: toDp(10), marginBottom: toDp(70) }}
          data={state.dataCart}
          renderItem={({ item, index }) => {
            return (
              RenderItem(item, index)
            )
          }}
          ListFooterComponent={() => <View style={{ height: toDp(0) }} />}
        />
      </View>
    )
  }

  const renderHapus = (item) => {
    return (
      <View style={styles.chooseAll}>
          <Pressable style={styles.delete} onPress={() => delAlert(item[0].id)}>
            <Text style={{ fontWeight: 'bold' }}>Hapus</Text>
          </Pressable>
        </View>
    )
  }

  return (
    <View style={styles.container}>
      <BackHeader
        title={'Keranjang'}
        onPress={() => props.navigation.goBack()}
      />

      <View style={{ bottom: toDp(5) }}>
        
        {renderHapus(state.dataCart)}

        <View style={{ marginTop: toDp(10), marginBottom: toDp(90) }}>
          <CardProduct />
        </View>

        {/*Button Checkout*/}
        <View style={{ zIndex: 9, position: 'absolute', bottom: 95 }}>
          <View style={styles.checkout}>
            <Pressable style={styles.buttonTotal}>
              <Text style={styles.txtTotal}>Total Harga</Text>
              <Text style={{ color: 'white', fontSize: toDp(18), textAlign: 'center' }}>Harga Total</Text>
            </Pressable>

            <View style={{ borderWidth: toDp(0.5), borderColor: 'white' }} />

            <Pressable style={styles.buttonPay} onPress={() => NavigatorService.navigate('Checkout')}>
              <Text style={styles.txtPay}>Beli Sekarang</Text>
            </Pressable>
          </View>
        </View>

      </View>
    </View>

  )
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  dropdown: {
    height: toDp(25),
    borderRadius: toDp(40),
    width: toDp(100),
  },
  content: {
    marginBottom: toDp(30),
    width: toDp(335),
    height: '100%',
    paddingVertical: 25,
  },
  chooseAll: {
    // marginBottom: toDp(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#C4C4C4',
    width: toDp(335),
    height: toDp(40),
    borderRadius: toDp(20),
    top: toDp(10),
    position: 'absolute',
    zIndex: 1,


  },
  notProcessed: {
    marginBottom: toDp(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#C4C4C4',
    width: toDp(335),
    height: toDp(41),
    borderRadius: toDp(20)
  },
  // orderCart: {
  //   paddingBottom:toDp(30),
  //   backgroundColor: 'cyan',
  //   width: '100%',
  //   borderRadius: toDp(8),

  // },
  ickotak: {
    marginTop: toDp(11),
    left: toDp(8)
  },
  detailCart: {
    height: toDp(30),
    width: toDp(60)
  },
  orderCartone: {
    padding: toDp(8),
    borderRadius: toDp(20),
    width: toDp(335),
    paddingBottom: toDp(10),
    backgroundColor: '#C4C4C4'
  },
  txtp: {
    fontSize: toDp(25),
    top: toDp(-7),
    padding: toDp(0),
    marginTop: toDp(-2)
  },
  btnp: {
    width: toDp(35),
    height: toDp(30),
    top: toDp(5),
    marginLeft: toDp(1)
  },
  spin: {
    marginLeft: toDp(-80),
    top: toDp(30),
  },
  inp: {
    width: toDp(30),
    height: toDp(35),
    padding: toDp(5),
    margin: toDp(0)
  },
  checkout: {
    backgroundColor: '#2A334B',
    borderRadius: toDp(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    // top: toDp(20),
    width: toDp(335),
  },
  buttonTotal: {
    // backgroundColor: 'red',
    borderRadius: toDp(20),
    width: toDp(160),
    height: toDp(50),
    // right:toDp(12)
  },
  buttonPay: {
    // backgroundColor: 'red',
    borderRadius: toDp(20),
    width: toDp(150),
    height: toDp(50),
    // left:toDp(8)
  },
  txtTotal: {
    textAlign: 'center',
    color: 'white',
    fontSize: toDp(16),
  },
  txtPay: {
    textAlign: 'center',
    color: 'white',
    fontSize: toDp(16),
    top: toDp(13)
  },
  imgProduk: {
    width: toDp(120),
    height: toDp(120),
    borderRadius: 20
  },
  delete: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: toDp(45)
  }
});

export default Keranjang;