import React, { Picker, useState, useEffect, Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  Pressable,
  ScrollView,
  AsyncStorage
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import Header from '@Header'
import NavigatorService from '@NavigatorService'
import Carousel, { Pagination } from "react-native-snap-carousel";
import LinearGradient from 'react-native-linear-gradient'
import Axios from "axios";
import NumberFormat from 'react-number-format';
import { svr } from "../../Configs/apikey";


const { width, height } = Dimensions.get('window')

const Produk = (props) => {

  const [selectedItems, setSelectedItems] = useState([]);
  const [idcat, setIdCat] = useState('');
  const [state, setState] = useState({
    id: '',
    arrayUsers: [],
    arrayData: [],
    fotoProduk: [],
    produk: [],
    detail: [],
    qty: '1',
    stock: '',
    stoks: '',
    thumbnails: '',
    loading: false,
    loading: true,
    selected: false,
    id_produk: ''
  })

  useEffect(() => {
    //getProdukbyId()
    // get id pengguna
    AsyncStorage.getItem('uid').then(uids => {
      let ids = uids;
      setState(state => ({
        ...state,
        id: ids
      }))
    }).catch(err => {
      console.log('err', err)
    })

    AsyncStorage.getItem('idProduk').then(idProduk => {
      let idp = idProduk;
      setState(state => ({
        ...state,
        id_produk: idp
      }))
      console.log('idp = ', state.id_produk)
    }).catch(err => {
      console.log('err', err)
    })

    return (() => {
      getProdukDetailbyId()
    })

  }, [state.id])


  const getProdukDetailbyId = () => {
    let pid = props.navigation.state.params.value;
    Axios.get(svr.url + 'product/' + pid + '/' + svr.api)
      // Axios.get('https://market.pondok-huda.com/dev/react/product/' + pid)
      .then(response => {

        console.log('PRODUK =====>' + JSON.stringify(response));

        if (response.data.status == 200) {
          // //save Async Storage
          console.log('CHECKOUT===>' + JSON.stringify(response.data));

          AsyncStorage.setItem('setProduk', JSON.stringify(response.data))
          AsyncStorage.setItem('idProduk', JSON.stringify(response.data.data[0].id))

          // NavigatorService.navigate('Checkout');s

          console.log('HASIL DETAIL PRODUK ==> : ', response.data)
          setState(state => ({ ...state, loading: false }))


          getCurrentWsh()

          let thumbnail = [{
            thum: response.data.data[0]?.thumbnail
          }]

          let images_det = response.data.detail;
          console.log('response 1 =>', JSON.stringify(response.data.data))
          if (images_det.length > 0) {

          } else {

          }
          setState(state => ({ ...state, produk: response.data.data, detail: response.data.detail, fotoProduk: images_det.images, thumbnails: thumbnail, stock: response.data.data[0]?.stock }))
          console.log('stock', state.stoks)
        } else {
          console.log('response 2 =>', response)
        }
      }).catch(error => {
        console.log('error => ', error)
      })
  }

  //get current wishlist datas
  const getCurrentWsh = () => {
    AsyncStorage.getItem('uid').then(uids => {
      let idmb = uids;
      let pid = props.navigation.state.params.value
      Axios.get(svr.api + 'wishlist/get/' + idmb + '/' + pid + '/' + svr.api)
        // Axios.get('https://market.pondok-huda.com/dev/react/wishlist/get/' + idmb + '/' + pid)
        .then(result => {
          console.log('current Wishlish---->' + JSON.stringify(result.data.data));
          let oid = result.data;
          if (oid.data.length > 0) {
            console.log('length--------> ' + result.data.data.length);
            setState(state => ({ ...state, selected: true }))

          } else {
            console.log('null--------> ' + oid.data.length);
            setState(state => ({ ...state, selected: false }))
            setSelectedItems([])
          }

          //console.log('result2 =>', result.data.data)
        }).catch(error => {
          console.log(error)
        })

    }).catch(err => {
      console.log(err);
    })
  }

  const selectItems = (pid, retail) => {
    const body = {
      ws_mb_id: state.id,
      ws_rtl_id: retail,
      ws_prd_id: pid
    }
    Axios.post(svr.url + 'wishlist/' + svr.api, body)
      // Axios.post('https://market.pondok-huda.com/dev/react/wishlist/', body)
      .then(response => {
        console.log('wishlist -----=>', response.data);

        if (response.data.status == 201) {
          //alert('Produk telah masuk ke wishlist anda!')
          setState(state => ({ ...state, selected: true }))

        } else {
          setState(state => ({ ...state, selected: false }))
          alert('Gagal menambahkan ke wishlist anda!')
          console.log('Wishlish gagal =>', response)
        }
      }).catch(error => {
        console.log('error wishlist =>', error)
      })


  };
  // unlike produk
  const deSelectItems = (idprd) => {
    // if(selectItems.length>0){
    //     if (selectedItems.some(i => i.ws_prd_id === id) && selectedItems.some(i => i.ws_mb_id == ws_mb_id)) {
    console.log('https://market.pondok-huda.com/dev/react/wishlist/delete/' + idprd + '/' + state.id)
    Axios.delete(svr.url + 'wishlist/delete/' + state.id + '/' + idprd + '/' + svr.api)
      // Axios.delete('https://market.pondok-huda.com/dev/react/wishlist/delete/' + state.id + '/' + idprd)
      .then(response => {
        console.log('response-unlike =>', response.data)
        if (response.data.status == 200) {
          setState(state => ({ ...state, dataWish: [] }))
          getCurrentWsh()

        } else {
          console.log('response =>', response)
        }
      }).catch(error => {
        console.log('error =>', error)
      })
    //   }
    // }
  }

  // put produk to cart
  const putCart = (retail, berat, id, product_name, price) => {
    const body = {
      crt_mb_id: state.id,
      crt_rtl_id: retail,
      crt_ongkir: berat,
      crt_berattotal: berat,
      prd_id: id,
      prd_name: product_name,
      prc_price: price,
      crd_qty: state.qty
    }
    console.log('body put cart =>' + JSON.stringify(body))
    setState(state => ({ ...state, loading: true }))

    let stok1 = parseInt(state.stock);
    console.log('stokk ', stok1)
    let crdQ = parseInt(state.qty);
    console.log('crddd ', crdQ)
    if (crdQ > stok1) {
      alert('Melampaui stok!')
      setState(state => ({ ...state, loading: false }))
    } else {
      Axios.post(svr.url + 'cart/' + svr.api, body)
        // Axios.post('https://market.pondok-huda.com/dev/react/cart/', body)
        .then(response => {
          if (response.data.status == 201) {
            // console.log('response =>' + JSON.stringify(response))
            alert('Berhasil Memasukan Barang Ke Keranjang')
            setState(state => ({ ...state, loading: false }))
            NavigatorService.navigate('Keranjang', { id: state.id })

          } else if (response.data.status == 200) {
            console.log('body', body)
            alert('Berhasil Memasukan Barang Ke Keranjang')
            setState(state => ({ ...state, loading: false }))

          } else {
            console.log('response =>', response)
            alert('Gagal Menambahkan Barang Ke Keranjang')
            setState(state => ({ ...state, loading: false }))
          }
        }).catch(error => {
          console.log('error =>', error)
          setState(state => ({ ...state, loading: false }))
        })
    }

  }


  const sendChat = (id_prd, id_rtl, rtl_name, prd_name, prd_price, rtl_addres, thumbnail) => {
    const body = {
      "pengirim_id": state.id,
      "penerima": id_rtl,
      "current_uid": state.id,
      "prd_id": id_prd,
      "product_name": prd_name,
      "price": prd_price,
      "retailaddres": rtl_addres,
      "thumbnail": thumbnail,
      "pesan": "Apakah produk ini ready ?",
      "from": 'produk'
    }
    console.log('cek body = ', body);
    Axios.post(svr.url + 'chat/' + svr.api, body)
      .then(result => {
        console.log('result', result)
        if (result.data.status === 201) {
          console.log('cekkk hasil =', result.data.chat_id)
          setState(state => ({ ...state, idcat: result.data.chat_id }))
          // console.log('cek chat id', state.idcat)
          NavigatorService.navigate('Chat', { id: id_prd, rtl_id: id_rtl, rtl_name: rtl_name, ciid: result.data.chat_id })
        }
      })
      .catch(err => {
        console.log(err)
        ToastAndroid.show("Terjadi masalah saat mengirimkan pesan, Silahkan coba lagi!", ToastAndroid.SHORT)
      })
    // }
  }


  const renderItemExpore = (item, i) => {

    return (
      <View style={styles.viewRenderExplore}>
        <View style={styles.viewImage}>
          <LinearGradient colors={['#f8f9f9', 'transparent']} style={styles.gradientTop} />
          <Image source={{ uri: item.item.images }} style={styles.imageProfile} />
          <LinearGradient colors={['transparent', '#3A3A3ACC']} style={styles.gradientBottom} />
        </View>

      </View>
    )

  }

  const renderItemExporeThum = (item) => {

    return (
      <View style={styles.viewRenderExplore}>
        <View style={styles.viewImage}>
          <LinearGradient colors={['#C4C4C4', 'transparent']} style={styles.gradientTop} />
          <Image source={{ uri: item.item.thum }} style={styles.imageProfile} />
          <LinearGradient colors={['transparent', '#3A3A3ACC']} style={styles.gradientBottom} />
        </View>

      </View>
    )

  }

  const RenderItem = (item) => {
    return (

      <View style={styles.detailProduk}>

        <View style={{ width: toDp(335), bottom: toDp(15), left: toDp(5) }}>

          <Text style={{ marginBottom: toDp(5), fontSize: toDp(15), fontWeight: 'bold' }}>{item[0]?.product_name}</Text>
          <Text style={{ marginBottom: toDp(5) }}>{item[0]?.retail_name}</Text>
          <NumberFormat
            value={item[0]?.price}
            displayType={'text'}
            thousandSeparator={'.'}
            decimalSeparator={','}
            prefix={'Rp. '}
            renderText={formattedValue => <Text style={{ marginBottom: toDp(5), color: '#F83308', fontWeight: '800' }}>{formattedValue}</Text>} // <--- Don't forget this!
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: toDp(25) }}>
            <View style={{ width: '50%', justifyContent: 'center' }}>
              <Text>Rating || Terjual</Text>
            </View>
            <View style={{ width: '50%', alignItems: 'flex-end' }}>
              {state.selected == false ?
                <TouchableOpacity style={{ right: toDp(20), }} onPress={() => selectItems(item[0].id, item[0].retail)}>
                  <Image source={allLogo.love} style={styles.iclove} />
                </TouchableOpacity>
                :
                <TouchableOpacity style={{ right: toDp(20), }} onPress={() => deSelectItems(item[0].id)}>
                  <Image source={allLogo.heart} style={{ width: toDp(25), height: toDp(25), zIndex: 999, resizeMode: 'contain' }} />
                </TouchableOpacity>
              }


            </View>
          </View>

          <View>
            <Text style={{ fontWeight: 'bold', top: toDp(0) }}>Rincian Produk</Text>
            <View style={{ flexDirection: 'row', top: toDp(10) }}>
              <View>
                <Text>Stok</Text>
                <Text>Beban Kapasitas</Text>
                <Text>Kondisi</Text>
                <Text>Warna</Text>
                <Text>Dikirim dari</Text>
                <Text>Jumlah</Text>
              </View>
              <View>
                <Text> : {item[0]?.stock}</Text>
                <Text> : {item[0]?.berat}</Text>
                <Text> : {item[0]?.kondisi}</Text>
                <Text> : -</Text>
                <Text> : {item[0]?.retailaddres}</Text>
                <TextInput
                  keyboardType="numeric"
                  autoCapitalize={'none'}
                  style={styles.textInput}
                  placeholder={'Jumlah'}
                  placeholderTextColor={'grey'}
                  value={state.qty}
                  onChangeText={(qty) => setState(state => ({ ...state, qty }))}
                />
              </View>
            </View>
            {/* 
            <Collapse style={{ top: toDp(15), left: toDp(50), marginBottom: toDp(10) }}>
              <CollapseHeader>
                <View style={{ alignItems: 'center', right: toDp(55) }}>
                  <Text style={{ color: 'grey' }}>Lihat Selengkapnya</Text>
                </View>
              </CollapseHeader>
              <CollapseBody>
                <View style={{ flexDirection: 'row', top: toDp(10), right: toDp(50) }}>
                  <View>
                    <Text>Stok</Text>
                    <Text>Beban Kapasitas</Text>
                    <Text>Warna</Text>
                    <Text>Kapasitas</Text>
                    <Text>Dikirim dari</Text>
                    
                  </View>
                  <View>
                    <Text> : {item[0]?.stock}</Text>
                    <Text> : {item[0]?.berat}</Text>
                    <Text> : -</Text>
                    <Text> : -</Text>
                    <Text> : {item[0]?.retailaddres}</Text>
            
                  </View>
                </View>
              </CollapseBody>
            </Collapse> */}
          </View>

          <View style={styles.Ulasan}>
            <Text style={styles.txtUlasan}>Ulasan Pembeli</Text>
            <Pressable style={{ right: toDp(15) }} onPress={() => NavigatorService.navigate('underConstruction')}>
              <View style={{ flexDirection: 'row' }}>
                <Text>Lihat Ulasan</Text>
                <Image source={allLogo.iclineright} style={styles.iclineright} />
              </View>
            </Pressable>
          </View>

        </View>


      </View>

    )

  };

  // (ketika klik tombol beli sekarang)

  const selectProduk = (value, id) => {
    NavigatorService.navigate('Checkout', { value, id: id })
    console.log('cek', (value));
  }

  // (ketika klik tombol chat)

  const selectChat = (value, id) => {
    NavigatorService.navigate('Chat', { value, id: id })
    console.log('cek chat', (value));
  }


  const renderFooter = (item) => {
    return (

      <View style={styles.footer}>
        <View style={styles.btnMenu}>
          <TouchableOpacity style={{ left: toDp(25) }} onPress={() => sendChat(item[0].id, item[0].retail, item[0].retail_name, item[0].product_name, item[0].price, item[0].retailaddres, item[0].thumbnail )} >
            <Image source={allLogo.Chat1} style={styles.icchat} />
          </TouchableOpacity>
          <TouchableOpacity style={{ left: toDp(30) }} onPress={() => putCart(item[0].retail, item[0].berat, item[0].id, item[0].product_name, item[0].price)}>
            <Image source={allLogo.cart} style={styles.cart} />
          </TouchableOpacity>

          <View style={{ borderWidth: toDp(0.5), }} />
          <TouchableOpacity style={styles.btnCheckout} onPress={() => selectProduk()} >
            <Text style={styles.txtBeli}>Beli Sekarang</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Header
        title={'Produk'}
        onPress={() => props.navigation.goBack()}
      />

      <ScrollView>
        <View style={{ width: '100%', height: toDp(230), backgroundColor: 'white', top: toDp(0) }}>
          {state.fotoProduk.length > 0 ?
            <Carousel
              layout={"default"}
              data={state.fotoProduk}
              sliderWidth={width}
              itemWidth={toDp(350)}
              renderItem={(item, index) => renderItemExpore(item, index)}
              onSnapToItem={index => setState(state => ({ ...state, activeIndex: index }))}
            />
            :
            <>

              <Carousel
                layout={"default"}
                data={state.thumbnails}
                sliderWidth={width}
                itemWidth={toDp(350)}
                renderItem={(item, index) => renderItemExporeThum(item)}
                onSnapToItem={index => setState(state => ({ ...state, activeIndex: index }))}
              />
            </>
          }
        </View>

        <View style={styles.content}>
          {RenderItem(state.produk)}
        </View>
      </ScrollView>

      {renderFooter(state.produk)}

    </View>
  )
};



const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    // top:toDp(50)
  },
  btnCheckout: {
    right: toDp(30),
    left: toDp(0),
    borderColor: 'white',
    width: toDp(150),
    height: toDp(48),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: toDp(10),
    borderTopRightRadius: toDp(10),
    backgroundColor: '#f83308'
  },
  footer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    alignItems: 'center',
  },
  dropdown: {
    height: toDp(25),
    borderRadius: toDp(40),
    width: toDp(100),
  },
  viewRenderExplore: {
    backgroundColor: 'white',
    width: '100%',
    height: toDp(200),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: toDp(16),
    padding: toDp(10),
    top: toDp(10),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
  },
  viewImage: {
    width: '100%',
    height: toDp(200),
    resizeMode: 'contain',
    position: 'absolute',
  },
  imageProfile: {
    width: '100%',
    height: '100%',
    borderRadius: toDp(16),
    position: 'absolute',
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientTop: {
    width: '100%',
    height: toDp(130),
    top: toDp(0),
    borderTopLeftRadius: toDp(10),
    borderTopRightRadius: toDp(10),
    zIndex: 1,
  },
  gradientBottom: {
    width: '100%',
    height: toDp(130),
    borderBottomLeftRadius: toDp(10),
    borderBottomRightRadius: toDp(10),
    position: 'absolute',
    bottom: toDp(0),
  },
  touchSilangExplore: {
    padding: toDp(4),
    position: 'absolute',
    right: toDp(16),
    top: toDp(16),
  },
  detailProduk: {
    padding: toDp(20),
    alignItems: 'center',
    bottom: toDp(10),
    backgroundColor: '#f8f9f9',
    height: toDp(470),
    width: toDp(335),
    borderRadius: toDp(10),
    left: toDp(13),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
  },
  Ulasan: {
    backgroundColor: '#f8f9f9',
    width: toDp(335),
    height: toDp(47),
    borderRadius: toDp(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: toDp(20),
    marginBottom: toDp(70),
    right: toDp(5),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
  txtUlasan: {
    marginLeft: toDp(15)
  },
  txtLihat: {
    marginRight: toDp(60)
  },
  btnMenu: {
    flexDirection: 'row',
    backgroundColor: '#2A334B',
    width: toDp(335),
    height: toDp(48),
    borderRadius: toDp(10),
    justifyContent: 'space-between',
    alignItems: 'center',
    bottom: toDp(10)

    // left:toDp(50)
  },
  txtBeli: {
    color: 'white',
  },
  iclineright: {
    width: toDp(10),
    height: toDp(12),
    marginTop: toDp(5),
    marginLeft: toDp(8)
  },
  icchat: {
    height: toDp(45),
    width: toDp(45)
  },
  cart: {
    width: toDp(30),
    height: toDp(30),
    tintColor: '#fff'
  },
  iclove: {
    bottom: toDp(5),
    right: toDp(0),
    left: toDp(5),
    width: toDp(40),
    height: toDp(40),
    tintColor: 'black',
    zIndex: 10,
    resizeMode: 'contain'
  },
  textInput: {
    width: toDp(50),
    height: toDp(35),
    backgroundColor: '#F2F3F3',
    // borderWidth:0.5,
    marginLeft: toDp(4),
    paddingHorizontal: toDp(8),
    borderRadius: toDp(10),
  },

});

export default Produk;