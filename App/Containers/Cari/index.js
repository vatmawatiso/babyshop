import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Dimensions,
  TextInput,
  Image,
  Pressable,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
  LogBox,
  ToastAndroid,
} from 'react-native';
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import NavigatorService from '@NavigatorService';
import Axios from 'axios';
import NumberFormat from 'react-number-format';
import { svr } from '../../Configs/apikey';


const { width, height } = Dimensions.get('window')
const Cari = (props) => {
  const [filtered, setFiltered] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [state, setState] = useState({
    id_member: '',
    key: '',
    ws_mb_id: '',
    ws_rtl_id: '',
    ws_prd_id: '',
    dataSearch: [],
    lat: [],
    long: [],
    inArea: 'false',
    inMessage: '',
    inload: 'true',
    keyword: ''
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

    //Pemanggilan promise saat terjadi back navigation
    props.navigation.addListener(
      'didFocus',
      payload => {
        setKordinat()
          .then(result => {
            return getProduk(result)
            setState(state => ({
              ...state,
              latitude: result.latitude,
              longitude: result.longitude
            }))
          }, error1 => {
            setState(state => ({ ...state, inMessage: error1, inload: 'false' }))

          })
          .then(result2 => {
            setState(state => ({ ...state, setFiltered: result2, inload: 'false' }))
          },
            error => {
              setState(state => ({ ...state, inMessage: error }))
            })
      }
    );


  }, [])

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"])

    // get id pengguna
    AsyncStorage.getItem('uid').then(uids => {
      let ids = uids;
      setState(state => ({
        ...state,
        id_member: ids
      }))

    }).catch(err => {
      console.log('err', err)
    })

    return (() => {
      //Pemanggilan promise saat buka pertama
      setKordinat()
        .then(result => {
          return getProduk(result)
          return setState(state => ({
            ...state,
            latitude: result.latitude,
            longitude: result.longitude
          }))
        }, error1 => {
          setState(state => ({ ...state, inMessage: error1, inload: 'false' }))

        })
        .then(result2 => {
          setState(state => ({ ...state, setFiltered: result2, inload: 'false' }))

        },
          error => {
            setState(state => ({ ...state, inMessage: error }))
          })

    })


  }, [state.id_member])

  // ambil adata produknya
  const getProduk = (json) => {
    return new Promise((resolve, reject) => {
      console.log('cek produk = ', svr.url + 'product/' + json.latitude + '/' + json.longitude + '/' + svr.api);
      Axios.get(svr.url + 'product/' + json.latitude + '/' + json.longitude + '/' + svr.api)
        .then(result => {
          console.log('result', result);
          // setState(state => ({...state, dataSearch: result.data.data}))

          if (result.data.status == 200) {
            getCurrentWsh()
            // setState(state => ({ ...state, arrayData: result.data.data }))
            //This Modif
            setFiltered(result.data.data);
            setmasterData(result.data.data);
            setState(state => ({ ...state, inArea: 'true' }))
            resolve(result.data.data)


          } else if (result.data.status == 500) {
            //This Modif
            setState(state => ({ ...state, inArea: '500', }))
            setState(state => ({ ...state, inMessage: 'Tidak dapat memuat data' }))
            ToastAndroid.show("Internal server error", ToastAndroid.SHORT)
            reject('Tidak dapat memuat data')
          } else {
            //This Modif
            setState(state => ({ ...state, inArea: 'false', }))
            setState(state => ({ ...state, inMessage: 'Lokasi kamu di luar jangkauan penjual' }))
            //ToastAndroid.show("Data not found", ToastAndroid.SHORT)
            reject('Lokasi kamu di luar jangkauan penjual')
          }


        }).catch(error => {
          //This Modif, pesan inMessage silahkan ganti
          setState(state => ({ ...state, inArea: '500', }))
          setState(state => ({ ...state, inMessage: 'Tidak dapat memuat data' }))
          ToastAndroid.show("Gagal menerima data dari server!" + error, ToastAndroid.SHORT)
          console.log('error produk =>', error)
          reject('Tidak dapat memuat data')
        })
    })
  }


  const setKordinat = () => {
    setState(state => ({ ...state, arrayData: [] }))
    setState(state => ({ ...state, inload: 'true' }))
    //Penggunaan Promise
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('kordinat').then(response => {
        let data = JSON.parse(response);
        if (response !== null) {
          if ((data.latitude == '' && data.latitude == null) || (data.longitude == '' && data.longitude == null)) {
            setState(state => ({
              ...state,
              latlongName: 'Atur Lokasi',
              inMessage: 'Lokasi mu tidak dalam jangkauan',

            }))
            reject('Lokasi mu tidak dalam jangkauan')
          } else {
            setState(state => ({
              ...state,
              latitude: data.latitude,
              longitude: data.longitude,

            }))
            //calback promise
            resolve(data)
          }
        } else {
          //calback promise reject
          reject('Lokasi mu tidak dalam jangkauan')
          setState(state => ({
            ...state,
            latlongName: 'Atur Lokasi',
            inMessage: 'Lokasi mu tidak dalam jangkauan',

          }))
        }

      }).catch(err => {
        console.log('err', err)
        //calback promise reject
        reject('Tidak dapat memuat data')
      })

    })


  }


  //get current wishlist datas
  const getCurrentWsh = () => {
    AsyncStorage.getItem('uid').then(uids => {
      let idmb = uids;
      console.log(svr.url + 'wishlist/oid/' + idmb + '/' + svr.api)
      Axios.get(svr.url + 'wishlist/oid/' + idmb + '/' + svr.api)
        .then(result => {
          console.log('current Wishlish---->' + state.id_member);
          let oid = result.data;
          if (oid.data?.length > 0) {
            console.log('length--------> ' + oid.data.length);
            //setState(state => ({...state, curWishlist: result.data.data}))
            setSelectedItems(result.data.data)
          } else {
            //console.log('null--------> '+oid.data.length);
            setSelectedItems([])
          }

          //console.log('result2 =>', result.data.data)
        }).catch(error => {
          ToastAndroid.show("Gagal menerima data dari server!" + error, ToastAndroid.SHORT)
          console.log(error)
        })

    }).catch(err => {
      console.log(err);
    })
  }

  // memasukan produk ke wishlist
  const selectItems = (id, retail, index) => {

    if ((selectedItems.ws_prd_id != filtered[index]?.prd_id) && (selectedItems.ws_mb_id != state.id_member)) {
      const body = {
        ws_mb_id: state.id_member,
        ws_rtl_id: retail,
        ws_prd_id: id
      }
      console.log('data -----=>', body);
      console.log(svr.url + 'wishlist/' + svr.api, body)
      Axios.post(svr.url + 'wishlist/' + svr.api, body)
        .then(response => {
          console.log('wishlist -----=>', response.data);

          if (response.data.status == 201) {
            //alert('Produk telah masuk ke wishlist anda!')
            ToastAndroid.show("Produk telah masuk ke wishlist anda", ToastAndroid.SHORT)
            //console.log('wishlist2 =>', response)
            setSelectedItems([...selectedItems, body])
          } else {
            // alert('Gagal menambahkan ke wishlist anda!')
            ToastAndroid.show("Gagal menambahkan ke wishlist anda!", ToastAndroid.SHORT)
            console.log('Wishlish gagal =>', response)
          }
        }).catch(error => {
          ToastAndroid.show("Gagal menerima data dari server!" + error, ToastAndroid.SHORT)
          console.log('error wishlist =>', error)
        })
    } else {
      ToastAndroid.show("Gagal!", ToastAndroid.SHORT)
      console.log('err');
    }

  };

  // unlike produk
  const deSelectItems = (id, retail, ws_mb_id) => {
    if (selectItems.length > 0) {
      if (selectedItems.some(i => i.ws_prd_id === id) && selectedItems.some(i => i.ws_mb_id == ws_mb_id)) {
        console.log('unloved');
        console.log(svr.url + 'wishlist/delete/' + ws_mb_id + '/' + id + '/' + svr.api)
        Axios.delete(svr.url + 'wishlist/delete/' + ws_mb_id + '/' + id + '/' + svr.api)
          .then(response => {
            console.log('response =>', response)
            if (response.data.status == 200) {
              ToastAndroid.show("Berhasil unlike produk!", ToastAndroid.SHORT)
              const arraylst = d => d.ws_prd_id != id && d.ws_mb_id == ws_mb_id;
              const arr3 = selectedItems.filter(arraylst);
              return setSelectedItems(arr3);
            } else {
              ToastAndroid.show("Gagal unlike produk!", ToastAndroid.SHORT)
              console.log('response =>', response)
            }
          }).catch(error => {
            ToastAndroid.show("Gagal menerima data dari server!" + error, ToastAndroid.SHORT)
            console.log('error =>', error)
          })
      }
    }
  }

  // filter button
  const getSelected = (id, ws_mb_id) => {
    if (selectItems.length > 0) {
      if (selectedItems.some(i => i.ws_prd_id === id) && selectedItems.some(i => i.ws_mb_id === ws_mb_id)) {
        return true
      } else {
        return false
      }
    }
  }

  const selectProduk = (value, id) => {
    NavigatorService.navigate('Produk', { value, id: id })
    console.log(id);
  }


  // const searchFilter = (text) => {
  //   const newData = masterData.filter(item => {
  //     const itemData = `${item.product_name.toUpperCase()}
  //                       ${item.category.toUpperCase()}`;

  //     const textData = text.toUpperCase();

  //     return itemData.indexOf(textData) > -1;
  //   });

  //   setFiltered(newData);
  //   setSearch(text);
  // }



  // const searchFilter = (text) => {
  //   if (text) {
  //     const newData = masterData.filter((item) => {
  //       const itemData = `${item.product_name} ${item.category}` ?
  //         `${item.product_name.toLowerCase()} ${item.category.toLowerCase()}`
  //         : ''.toLowerCase();
  //       const textData = text.toLowerCase();
  //       return itemData.indexOf(textData) > -1;
  //     });
  //     setFiltered(newData);
  //     setSearch(text);
  //     // setState(state => ({ ...state, key: text }))
  //   } else {
  //     setFiltered(masterData)
  //     setSearch(text);
  //     // setState(state => ({ ...state, key: text }))
  //   }
  // }

  // render untuk data produk
  const RenderItem = ({ item, index, onPress, selected, unLike, onPressProduk }) => (

    <View style={styles.card}>
      <Pressable onPress={() => onPressProduk()}>
        <View style={styles.txtProduct}>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: toDp(10) }}>
            <Image source={{ uri: item.thumbnail }} style={styles.imgProduct} />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: toDp(10) }}>
            <View style={{ justifyContent: 'center', width: '70%' }}>
              <Text style={styles.textproduct}>{item.product_name}</Text>
            </View>
            <View>
              {
                selected == false ?
                  <TouchableOpacity onPress={() => onPress()} key={index}>
                    <Image source={allLogo.icwishlist} style={{ width: toDp(25), height: toDp(25) }} />
                  </TouchableOpacity>
                  :
                  <TouchableOpacity onPress={unLike} key={index}>
                    <Image source={allLogo.heart} style={{ width: toDp(25), height: toDp(24) }} />
                  </TouchableOpacity>
              }
            </View>
          </View>
          {/* <Text style={styles.harga}>{item.price}</Text> */}
          <NumberFormat
            value={item.price}
            displayType={'text'}
            thousandSeparator={'.'}
            decimalSeparator={','}
            prefix={'Rp. '}
            renderText={formattedValue => <Text style={{ color: '#F83308', fontWeight: '800' }}>{formattedValue}</Text>} // <--- Don't forget this!
          />
          <Text style={{ marginTop: toDp(5) }}>{item.retail_name}</Text>
          <Image source={allLogo.address} style={styles.address} />
          <Text style={styles.dariKota}>{item.retailaddres}</Text>
          <Image source={allLogo.icstar} style={styles.star} />
          <Text style={styles.bintang}>{item.lainnya.rating}</Text>
          <Text style={styles.terjual}>|| {item.lainnya.terjual} Terjual</Text>
        </ View>
      </Pressable>
    </ View>

  );

  return (
    <View style={styles.container}>

      <View style={{ flexDirection: 'row', }}>
        <TouchableOpacity style={styles.icBack} onPress={() => props.navigation.goBack()}>
          <Image source={allLogo.Left} style={{ width: toDp(38), height: toDp(38) }} />
        </TouchableOpacity>

        <Image style={styles.icSearch} source={require('../../Assets/img/ic_search.png')} />
        <TextInput
          style={styles.textInput}
          placeholder="Pencarian..."
          value={state.keyword}
          placeholderTextColor='white'
          onChangeText={(text) => setState(state => ({...state, keyword: text }))}

        />
      </View>


      {state.inArea == true ?
        <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginBottom: 20 }}>

          <FlatList
            columnWrapperStyle={{ justifyContent: 'space-between', marginHorizontal: toDp(15) }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              bottom: toDp(50),
              paddingBottom: toDp(70),
            }}

            numColumns={2}
            data={filtered}
            renderItem={({ item, index }) => (
              <RenderItem
                item={item}
                index={index}
                onPress={() => selectItems(item.prd_id, item.retail, index)}
                selected={getSelected(item.prd_id, state.id_member)}
                unLike={() => deSelectItems(item.prd_id, item.retail, state.id_member)}
                onPressProduk={() => selectProduk(item.prd_id)}
              />
            )

              // return(RenderItem (item, index))
            }
            KeyExtractor={(item, index) => index.toString()}
            ListFooterComponent={() => <View style={{ height: toDp(80) }} />}
          />

        </View>
        :
        <View style={styles.vnotfound}>
          <Image source={allLogo.warning} style={{ width: toDp(200), height: toDp(200), marginTop: toDp(-50) }} />
          <View style={{ marginTop: 40, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{fontSize:16, fontWeight:'bold', color:'#909090' }}>Mau Cari Apa ?</Text>
          </View>
        </View>
      }
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    flex: 1
  },
  vnotfound: {
    marginVertical: '40%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  icSearch: {
    width: toDp(25),
    height: toDp(25),
    position: 'absolute',
    zIndex: toDp(2),
    marginTop: toDp(22),
    right: toDp(295),
    tintColor: '#fff'
  },
  icBack: {
    width: toDp(38),
    height: toDp(38),
    resizeMode: 'contain',
    tintColor: 'black',
    marginHorizontal: toDp(10),
    left: 10,
    marginTop: 13
    // position: 'absolute',
    // zIndex: 3,
  },
  textInput: {
    backgroundColor: '#2A334B',
    borderRadius: toDp(15),
    height: 50,
    width: toDp(300),
    fontSize: 15,
    color: 'white',
    paddingLeft: toDp(40),
    paddingHorizontal: toDp(10),
    marginTop: 10,
    marginRight: 30
  },
  card: {
    backgroundColor: '#FFF',
    top: toDp(60),
    padding: toDp(0),
    marginVertical: toDp(5),
    // marginHorizontal: toDp(16),
    borderRadius: toDp(10),
    minHeight: toDp(221),
    // right: toDp(2),
    width: '48%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  bintang: {
    bottom: toDp(17),
    left: toDp(15)
  },
  terjual: {
    bottom: toDp(37),
    left: toDp(28),
    marginRight: 5
  },
  address: {
    top: toDp(10),
    width: toDp(15),
    height: toDp(15)
  },
  star: {
    bottom: toDp(3),
    right: toDp(0)
  },
  dariKota: {
    bottom: toDp(6),
    left: toDp(20)
  },
  textproduct: {
    fontWeight: 'bold',
    fontSize: toDp(12)
  },
  txtProduct: {
    borderRadius: toDp(10),
    padding: toDp(20),

  },
  imgProduct: {
    width: toDp(100),
    height: toDp(100)
  },
});

export default Cari;
