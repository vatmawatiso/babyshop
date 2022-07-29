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
  AsyncStorage,
  TextInput
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
import NumberFormat from 'react-number-format';
import Axios from "axios";
import { svr } from "../../Configs/apikey";

const Keranjang = (props) => {
  //// NOTE:
  //Kasih batas maksimal QTY sesuai stok produknya
  //Ketika tambah data ke keranjang, QTY langsung 1.

  const [state, setState] = useState({
    dataCart: [],
    totalCart: [],
    qty2: [],
    stock: '',
    stock2: '',
    id: '',
    mb_id: '',
    crt_id: '',
    id_cart: ''
  })

  useEffect(() => {
    // get id pengguna
    AsyncStorage.getItem('uid').then(uids => {
      let ids = uids;
      setState(state => ({ ...state, id: ids }))
      console.log('id', state.id)
    }).catch(error => {
      console.log('error', error)
    })

    getCart()
    // getTotalCart()

  }, [])



  // get data produk di keranjang
  const getCart = () => {
    let mid = props.navigation.state.params.id
    Axios.get(svr.url+'cart/member/'+mid+'/'+svr.api)
    // Axios.get('https://market.pondok-huda.com/dev/react/cart/?mb_id=' + mid)
      .then(response => {
        console.log('response get cart' + JSON.stringify(response))
        if (response.data.status == 200) {
          const dataCartProduk = {
            id_crt: response.data.data.id,
            value: response.data
          }
          console.log('id cart ini', JSON.stringify(dataCartProduk))
          AsyncStorage.setItem('idCartProduk', dataCartProduk.id_crt)
          AsyncStorage.setItem('cartProduk', JSON.stringify(dataCartProduk))
          setState(state => ({ ...state, dataCart: response.data.data, stock: parseInt(response.data.data[0]?.stock) }))
          setState(state => ({ ...state, totalCart: response.data }))
          //getCartRefresh
          // let stok1 = parseInt(state.stock);
          console.log('stok1', state.stock)
          // setState(state => ({ ...state, stock2: stok1}))

          let qtys = response.data.data.map((doc, i) => {
            return doc.items.map((docs, ix) => {
              return parseInt(docs.qty)
            })
          })
          var arrayOfNumbers = qtys; //qtys.map(Number);
          setState(state => ({
            ...state,
            qty2: arrayOfNumbers
          }));
          console.log('QTYS ===>', arrayOfNumbers);

        } else if (response.data.status == 404) {
          NavigatorService.navigate('emptyCart')
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

  const getCartrRefresh = () => {
    //setState(state => ({ ...state, dataCart: []}))
    let mid = props.navigation.state.params.id
    Axios.get(svr.url+'cart/member/'+mid+'/'+svr.api)
    // Axios.get('https://market.pondok-huda.com/dev/react/cart/?mb_id=' + mid)
      .then(response => {
        console.log('response get cart', JSON.stringify(response))
        if (response.data.status == 200) {
          const dataCartProduk = {
            id_crt: response.data.id,
            value: response.data
          }
          console.log('id cart ini', JSON.stringify(dataCartProduk))
          AsyncStorage.setItem('idCartProduk', dataCartProduk.id_crt)
          AsyncStorage.setItem('cartProduk', JSON.stringify(dataCartProduk))
          setState(state => ({ ...state, dataCart: response.data.data }))
          setState(state => ({ ...state, totalCart: response.data }))

          let qtys = response.data.data.map((doc, i) => {
            return doc.items.map((docs, ix) => {
              return parseInt(docs.qty)
            })
          })
          var arrayOfNumbers = qtys;
          setState(state => ({
            ...state,
            qty2: arrayOfNumbers
          }));
          console.log('QTYS ===>', arrayOfNumbers);

        } else if (response.data.status == 404) {
          NavigatorService.navigate('underConstruction')
          console.log('response', response)
        } else {
          alert('Gagal Mengambil Data')
          console.log('response =>', response)
        }
      }).catch(error => {
        console.log('error', error)
      })
  }

  // refresh total price barang2 yg ada di keranjang
  const refreshTotalPrice = () => {
    let mid = props.navigation.state.params.id
    Axios.get(svr.url+'cart/member/'+mid+'/'+svr.api)
    // Axios.get('https://market.pondok-huda.com/dev/react/cart/?mb_id=' + mid)
      .then(response => {
        console.log('total', response.data)
        if (response.data.status == 200) {
          setState(state => ({ ...state, totalCart: response.data }))
          getCartrRefresh()
        } else {
          alert('gagal merefresh total produk')
        }
      }).catch(error => {
        console.log('error 1 =>', error)
      })
  }

  // deleete keranjang
  const delCart = (cid, pid) => {
    console.log('Cart Id =>', cid + pid)
    Axios.delete(svr.url+'cart/delete/'+cid+'/'+pid+'/'+svr.api)
    // Axios.delete('https://market.pondok-huda.com/dev/react/cart/delete/' + cid + '/' + pid)
      .then(response => {
        console.log('response =>', response);
        if (response.data.status == 200) {
          alert('Berhasil Menghapus Produk dari Keranjang')
          props.navigation.goBack();
          setState(state => ({ ...state, dataCart: response.data.data }))
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
    Axios.delete(svr.url+'cart/delall/'+id+'/'+svr.api)
    // Axios.delete('https://market.pondok-huda.com/dev/react/cart/delall/' + id)
      .then(response => {
        console.log('response =>', response);
        if (response.data.status == 200) {
          console.log('response hapus => ', response)
          alert('Berhasil Menghapus Produk dari Keranjang')
          props.navigation.goBack();
          //setState(state => ({ ...state, dataCart: response.data.data }))
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

  // fungsi numericInput +-
  const CartQty = (crd_id, crd_qty, prd_id, crt_id, value, i) => {
    //console.log('crd id', value)
    let { qty2 } = state;
    qty2[i] = value;
    setState(state => ({
      ...state,
      qty2
    }))
    console.log('qty2', state.qty2)

    const datas = {
      crd_qty: state.qty2[i],
      prd_id: prd_id,
      crt_id: crt_id
    }
    console.log('------>>', crd_id + '  |  ' + crd_qty + '  |  ' + prd_id + '  |  ' + crt_id + '  |  ' + value + '  |  ' + i)
    Axios.post(svr.url+'cart/'+crd_id+'/'+svr.api,datas)
    // Axios.post('https://market.pondok-huda.com/dev/react/cart/' + crd_id + '/', datas)
      .then(response => {
        console.log('response data=>', datas)

        if (response.data.status == 200) {
          console.log('Response 200 => ', response.data)
          // refresh()
          refreshTotalPrice()
          //alert('Berhasil Menambah QTY')
        } else {
          console.log('response =>', response.data)
          alert('gagal')
        }
      }).catch(error => {
        console.log('error =>', error)
      })
  }

  const perProduk = (item, index, idcart, inc) => {
    return (
      <>
        <View style={{ flexDirection: 'row', marginTop: toDp(10), marginBottom: toDp(4), backgroundColor: '#fff', borderRadius: 10, padding: toDp(12), width: toDp(315) }}>
          <View style={{ marginLeft: toDp(12) }}>
            <Image source={{ uri: item.thumbnail }} style={styles.imgProduk} />
          </View>

          <View style={{ marginLeft: toDp(12) }}>
            <Text style={{ fontSize: toDp(12), fontWeight: 'bold', marginBottom: toDp(5) }}>{item.prd_name.substr(0, 25)}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: toDp(12), marginTop: toDp(10) }}>{item.qty}</Text>

              <Text style={{ fontSize: toDp(14), marginTop: toDp(10), marginHorizontal: toDp(5) }}>x</Text>
              <NumberFormat value={item.price} displayType={'text'} thousandSeparator={true} prefix={'Rp '}
                renderText={(value, props) => <Text style={{ fontSize: toDp(12), marginTop: toDp(10), marginHorizontal: toDp(5) }}>{value}</Text>}
              />

              <Text style={{ fontSize: toDp(14), marginTop: toDp(10), marginHorizontal: toDp(5) }}>=</Text>
              <NumberFormat value={item.price * item.qty} displayType={'text'} thousandSeparator={true} prefix={'Rp '}
                renderText={(value, props) =>
                  <Text style={{ fontSize: toDp(12), marginTop: toDp(10), marginHorizontal: toDp(5) }}>{value}</Text>}
              />
            </View>


            <View style={{ flexDirection: 'row', marginTop: toDp(25), justifyContent: 'flex-start', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => delCart(idcart, item.prd_id)}>
                <Image source={allLogo.ictrash} style={{ width: toDp(20), height: toDp(25), resizeMode: 'cover', marginRight: toDp(12) }} />
              </TouchableOpacity>
              <NumericInput
                key={index}
                initValue={item.qty == 0 ? 1 : state.qty2[inc]?.[index]}
                value={state.qty2[inc]?.[index]}
                onChange={value => CartQty(item.crd_id, item.qty, item.prd_id, idcart, value, index)}
                onLimitReached={(isMax, msg) => alert('Stok Terbatas')}
                maxValue={state.stock}
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

              <Text>{JSON.stringify(state.qty2[inc]?.data)}</Text>
            </View>

          </View>
        </View>
      </>
    )
  }


  const RenderItem = (itm, i) => {
    return (
      <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.orderCart}>

          {/*produk dari setiap toko*/}
          <View style={styles.orderCartone}>
            {/*Identitas produk*/}
            <View style={{ width: '100%', height: toDp(20) }}>
              <View style={{ flexDirection: 'row' }}>

                <Text style={{ fontWeight: 'bold', marginLeft: toDp(15), top: toDp(6) }}>{itm.retail_name}</Text>
              </View>

            </View>
            {/*Identitas produk*/}


            {/*Per produk*/}

            <FlatList style={{ width: toDp(335), top: toDp(10), marginBottom: toDp(70) }}
              data={itm.items}
              renderItem={({ item, index }) => {
                return (
                  perProduk(item, index, itm.id, i)
                )
              }}
              ListFooterComponent={() => <View style={{ height: toDp(0) }} />}
            />

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
        {/* <Text style={{marginTop:20}}>{JSON.stringify(state.qty2)}</Text> */}
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
          <Text style={{ fontWeight: 'bold', color:'#fff' }}>Hapus</Text>
        </Pressable>
      </View>
    )
  }

  const renderButtonCheckOut = (item, index) => {
    return (
      <View style={{ zIndex: 9, position: 'absolute', bottom: toDp(95) }}>
        <View style={styles.checkout}>
          <Pressable style={styles.buttonTotal}>
            <NumberFormat value={item.total} displayType={'text'} thousandSeparator={true} prefix={'Rp '}
              renderText={(value, props) => <Text style={{ color: 'white', fontSize: toDp(18), textAlign: 'center' }}>{value}</Text>}
            />


            {/* {console.log('total price =', item[0].crd_prd_id)} */}
          </Pressable>

          <View style={{ borderWidth: toDp(0.3), borderColor: 'white', marginRight: toDp(-7) }} />

          <Pressable style={styles.buttonPay} onPress={() => NavigatorService.navigate('cartCheckout', { id: state.id })}>
            <Text style={styles.txtPay}>Beli Sekarang</Text>
          </Pressable>
        </View>
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
        {renderButtonCheckOut(state.totalCart)}


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
    borderRadius: toDp(10),
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
    backgroundColor: '#2A334B',
    width: toDp(335),
    height: toDp(48),
    borderRadius: toDp(10),
    top: toDp(10),
    position: 'absolute',
    zIndex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,

  },
  notProcessed: {
    marginBottom: toDp(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f9f9',
    width: toDp(335),
    height: toDp(41),
    borderRadius: toDp(10)
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
    borderRadius: toDp(10),
    width: toDp(335),
    paddingBottom: toDp(10),
    backgroundColor: '#ccc'
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
    borderRadius: toDp(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    // top: toDp(20),
    width: toDp(335),
  },
  buttonTotal: {
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: toDp(10),
    width: toDp(160),
    height: toDp(50),
    // right:toDp(12)
  },
  buttonPay: {
    // backgroundColor: 'red',
    backgroundColor: '#f83308',
    borderTopRightRadius: toDp(10),
    borderBottomRightRadius: toDp(10),
    width: '50%',
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
    width: toDp(70),
    height: toDp(70),
    borderRadius: toDp(10)
  },
  delete: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: toDp(48)
  }
});

export default Keranjang;