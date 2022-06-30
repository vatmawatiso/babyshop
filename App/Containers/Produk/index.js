import React, { Picker, useState, useEffect, Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Button,
  Modal,
  StatusBar,
  Pressable,
  ScrollView,
  AsyncStorage,
  TextInput
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import Header from '@Header'
import NavigatorService from '@NavigatorService'
import Carousel, { Pagination } from "react-native-snap-carousel";
import LinearGradient from 'react-native-linear-gradient'
import CollapsibleView from "@eliav2/react-native-collapsible-view";
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { Thumbnail, List, ListItem, Separator } from 'native-base';
import Axios from "axios";


const { width, height } = Dimensions.get('window')

const Produk = (props) => {

  const [selectedItems, setSelectedItems] = useState([]);
  const [state, setState] = useState({
    arrayUsers: [],
    arrayData: [],
    fotoProduk: [],
    produk: [],
    detail: [],
    thumbnails: '',
    id: '',
    jumlah: '1',
    loading: false,
    selected: false,
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

    return (() => {
      getProdukDetailbyId()
    })

  }, [state.id])


  const getProdukDetailbyId = () => {
    let pid = props.navigation.state.params.value
    Axios.get('https://market.pondok-huda.com/dev/react/product/' + pid)
      .then(response => {
        if (response.data.status == 200) {
          const datas ={
            id: response.data.data[0].id,
            value: response.data.data[0]
          }
          AsyncStorage.setItem('produk', JSON.stringify(datas));
          console.log('hasil async =>', datas)
          getCurrentWsh()

          let thumbnail = [{
            thum: response.data.data[0]?.thumbnail
          }]

          let images_det = response.data.detail;
          console.log('response =>', JSON.stringify(response.data.data))
          if (images_det.length > 0) {

          } else {

          }
          setState(state => ({ ...state, produk: response.data.data, detail: response.data.detail, fotoProduk: images_det.images, thumbnails: thumbnail }))
        } else {
          console.log('response =>', response)
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
      Axios.get('https://market.pondok-huda.com/dev/react/wishlist/get/' + idmb + '/' + pid)
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

    Axios.post('https://market.pondok-huda.com/dev/react/wishlist/', body)
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
    Axios.delete('https://market.pondok-huda.com/dev/react/wishlist/delete/' + state.id + '/' + idprd)
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
  const putCart = ( retail, berat, id, product_name, price ) => {
    const body = {
      crt_mb_id: state.id,
      crt_rtl_id: retail,
      crt_ongkir: berat,
      crt_berattotal: berat,
      prd_id: id,
      prd_name: product_name,
      prc_price: price,
      qty: state.jumlah
    }
    Axios.post('https://market.pondok-huda.com/dev/react/cart/', body)
      .then(response => {
        if (response.data.status == 201) {
          console.log('response =>', response)
          alert('Berhasil Memasukan Barang Ke Keranjang')
          NavigatorService.navigate('Keranjang', {id: state.id })
        } else if (response.data.status == 200) {
          console.log('body', body)
          alert('Berhasil Mengupdate Data')
        } else {
          console.log('response =>', response)
          alert('Gagal Menambahkan Barang Ke Keranjang')
        }
      }).catch(error => {
        console.log('error =>', error)
      })
  }

  const renderItemExpore = (item, i) => {

    return (
      <View style={styles.viewRenderExplore}>
        <View style={styles.viewImage}>
          <LinearGradient colors={['#C4C4C4', 'transparent']} style={styles.gradientTop} />
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

        <View style={{ width: toDp(335) }}>

          <Text style={{ marginBottom: toDp(10), fontSize: 20, fontWeight: 'bold' }}>{item[0]?.product_name}</Text>
          <Text style={{ marginBottom: toDp(10) }}>{item[0]?.retail_name}</Text>
          <Text style={{ marginBottom: toDp(5) }}>{item[0]?.price}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 25 }}>
            <View style={{ width: '50%', justifyContent: 'center' }}>
              <Text>Rating || Terjual</Text>
            </View>
            <View style={{ width: '50%', alignItems: 'flex-end' }}>
              {state.selected == false ?
                <TouchableOpacity style={{ right: toDp(20), }} onPress={() => selectItems(item[0].id, item[0].retail)}>
                  <Image source={allLogo.icwishlist} style={{ width: toDp(25), height: toDp(25), zIndex: 10, resizeMode: 'contain' }} />
                </TouchableOpacity>
                :
                <TouchableOpacity style={{ right: toDp(20), }} onPress={() => deSelectItems(item[0].id)}>
                  <Image source={allLogo.ic_heart} style={{ width: toDp(25), height: toDp(25), zIndex: 999, resizeMode: 'contain' }} />
                </TouchableOpacity>
              }


            </View>
          </View>

          <View>
            <View style={{ top: toDp(10) }}>
              <Text style={{ fontWeight: 'bold', top: toDp(0) }}>Rincian Produk</Text>
              <View style={{ flexDirection: 'row', marginTop: 7, justifyContent: 'space-between' }}>
                <Text>Stok</Text>
                <Text style={{ right: toDp(162) }}>{item[0]?.stock}</Text>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 7, justifyContent: 'space-between' }}>
                <Text>Beban Kapasitas</Text>
                <Text style={{ right: toDp(131) }}>{item[0]?.berat}</Text>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 7, justifyContent: 'space-between' }}>
                <Text>Warna</Text>
                <Text style={{ right: toDp(13) }}>-</Text>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 7, justifyContent: 'space-between' }}>
                <Text>Kapasitas</Text>
                <Text style={{ right: toDp(135) }}>-</Text>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 7, justifyContent: 'space-between' }}>
                <Text>Dikirim Dari </Text>
                <Text style={{ right: toDp(17) }}>{item[0]?.retailaddres}</Text>
              </View>

              <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between' }}>
                <Text>Jumlah </Text>
                  <TextInput 
                    keyboardType="numeric"
                    autoCapitalize={'none'}
                    style={styles.textInput}
                    placeholder={'Jumlah'}
                    placeholderTextColor={'grey'}
                    value={state.jumlah}
                    onChangeText={(jumlah) => setState(state => ({ ...state, jumlah}))}
                  />
              </View>
            </View>


            <Collapse style={{ top: toDp(15), left: toDp(50) }}>
              <CollapseHeader>
                <View style={{ alignItems: 'center', right: toDp(55) }}>
                  <Text style={{ color: 'grey' }}>Lihat Selengkapnya</Text>
                </View>
              </CollapseHeader>
              <CollapseBody>
                <View style={{ top: toDp(5), right: 50 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>Stok</Text>
                    <Text style={{ right: toDp(162) }}>{item.stok}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>Beban Kapasitas</Text>
                    <Text style={{ right: toDp(131) }}>{item.beban}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>Warna</Text>
                    <Text style={{ right: toDp(13) }}>{item.warna}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>Kapasitas</Text>
                    <Text style={{ right: toDp(135) }}>{item.kapasitas}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>Dikirim Dari </Text>
                    <Text style={{ right: toDp(17) }}>{item.dikirimdari}</Text>
                  </View>
                </View>
              </CollapseBody>
            </Collapse>
          </View>

          <View style={styles.Ulasan}>
            <Text style={styles.txtUlasan}>Ulasan Pembeli</Text>
            <Pressable style={{ right: toDp(15) }} onPress={() => NavigatorService.navigate('Ulasanpembeli', { value, id: id })}>
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

  const renderFooter = (item) => {
    return (

      <View style={styles.footer}>
        <View style={styles.btnMenu}>
          <Pressable style={{ left: toDp(25) }} onPress={() => NavigatorService.navigate('Chat')}>
            <Image source={allLogo.icchat} style={styles.icchat} />
          </Pressable>
          <Pressable style={{ left: toDp(30) }} onPress={() => putCart(item[0].retail, item[0].berat, item[0].id, item[0].product_name, item[0].price )}>
            <Image source={allLogo.iccartWhite} style={styles.iccartWhite} />
          </Pressable>

          <View style={{ borderWidth: toDp(0.5), borderColor: 'white', width: toDp(55), rotation: toDp(90) }} />
          <Pressable style={{ right: toDp(30) }} onPress={() => NavigatorService.navigate('Checkout')} >
            <Text style={styles.txtBeli}>Beli Sekarang</Text>
          </Pressable>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Header
        title={'Produk'}
        onPress={() => alert('dfhfg')}
      />

      <ScrollView style={{ backgroundColor: 'white', paddingVertical: toDp(20), bottom: toDp(70) }}>
        <View style={{ width: '100%', height: toDp(230), backgroundColor: 'white', top: toDp(50) }}>
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

          {/* <RenderItem
                      item={state.produk}
                      unLike={() => deSelectItems(item.id)}
                    /> */}
          {RenderItem(state.produk)}
        </View>
      </ScrollView>

      {renderFooter(state.produk)}

      {/* <View style={styles.footer}>
        <View style={styles.btnMenu}>
          <Pressable style={{ left: toDp(25) }} onPress={() => NavigatorService.navigate('Chat')}>
            <Image source={allLogo.icchat} style={styles.icchat} />
          </Pressable>
          <Pressable style={{ left: toDp(30) }} onPress={() => putCart(item[0].retail)}>
            <Image source={allLogo.iccartWhite} style={styles.iccartWhite} />
          </Pressable>

          <View style={{ borderWidth: toDp(0.5), borderColor: 'white', width: toDp(55), rotation: toDp(90) }} />
          <Pressable style={{ right: toDp(30) }} onPress={() => NavigatorService.navigate('Checkout')} >
            <Text style={styles.txtBeli}>Beli Sekarang</Text>
          </Pressable>
        </View>
      </View> */}

    </View>
  )
};



const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    // backgroundColor:'cyan',
    // top:toDp(50)
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
    top: toDp(10)
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
    borderTopLeftRadius: toDp(16),
    borderTopRightRadius: toDp(16),
    zIndex: 1,
  },
  gradientBottom: {
    width: '100%',
    height: toDp(130),
    borderBottomLeftRadius: toDp(16),
    borderBottomRightRadius: toDp(16),
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
    top: toDp(15),
  },
  Ulasan: {
    backgroundColor: '#C4C4C4',
    width: toDp(335),
    height: toDp(47),
    // left:toDp(50),
    borderRadius: toDp(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: toDp(30),
    marginBottom: toDp(70),
    right: toDp(8)
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
    height: toDp(60),
    borderRadius: toDp(20),
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
    tintColor: 'white'
  },
  textInput: {
    backgroundColor: 'white',
    width: toDp(100),
    height: toDp(30),
    borderRadius: toDp(20),
    bottom: toDp(15),
    marginBottom: toDp(-8),
    right: toDp(8),
    borderWidth: toDp(0.5),
    padding: toDp(10),
    fontSize: 12
  },

});

export default Produk;