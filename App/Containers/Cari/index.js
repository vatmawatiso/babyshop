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
  LogBox
} from 'react-native';
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import NavigatorService from '@NavigatorService';
import Axios from 'axios';
import NumberFormat from 'react-number-format';
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
    dataSearch: []
  })

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
      // if (state.key != '') {
      getProduk()
      // }

    })
    console.log('loooo');
    props.navigation.addListener(
      'didFocus',
      payload => {
        alert('load')
      }
    );

  }, [state.id_member])

  // ambil adata produknya
  const getProduk = () => {
    Axios.get('https://market.pondok-huda.com/dev/react/product/')
      .then(result => {
        console.log('result', result);
        // setState(state => ({...state, dataSearch: result.data.data}))
        getCurrentWsh()
        setFiltered(result.data.data);
        setmasterData(result.data.data);


      }).catch(error => {
        console.log(error)
      })
  }

  // const refresh = () => {
  //   setState(state => ({...state, loading: false,}))
  // }
  //get current wishlist datas
  const getCurrentWsh = () => {
    AsyncStorage.getItem('uid').then(uids => {
      let idmb = uids;

      Axios.get('https://market.pondok-huda.com/dev/react/wishlist/oid/' + idmb)
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
      Axios.post('https://market.pondok-huda.com/dev/react/wishlist/', body)
        .then(response => {
          console.log('wishlist -----=>', response.data);

          if (response.data.status == 201) {
            //alert('Produk telah masuk ke wishlist anda!')
            //console.log('wishlist2 =>', response)
            setSelectedItems([...selectedItems, body])
          } else {
            alert('Gagal menambahkan ke wishlist anda!')
            console.log('Wishlish gagal =>', response)
          }
        }).catch(error => {
          console.log('error wishlist =>', error)
        })
    } else {
      console.log('err');
    }

  };

  // unlike produk
  const deSelectItems = (id, retail, ws_mb_id) => {
    if (selectItems.length > 0) {
      if (selectedItems.some(i => i.ws_prd_id === id) && selectedItems.some(i => i.ws_mb_id == ws_mb_id)) {
        console.log('unloved');
        Axios.delete('https://market.pondok-huda.com/dev/react/wishlist/delete/' + ws_mb_id + '/' + id)
          .then(response => {
            console.log('response =>', response)
            if (response.data.status == 200) {
              const arraylst = d => d.ws_prd_id != id && d.ws_mb_id == ws_mb_id;
              const arr3 = selectedItems.filter(arraylst);
              return setSelectedItems(arr3);
            } else {
              console.log('response =>', response)
            }
          }).catch(error => {
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



  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = `${item.product_name} ${item.category}` ?
          `${item.product_name.toLowerCase()} ${item.category.toLowerCase()}`
          : ''.toLowerCase();
        const textData = text.toLowerCase();
        return itemData.indexOf(textData) > -1;
      });
      setFiltered(newData);
      setSearch(text);
      // setState(state => ({ ...state, key: text }))
    } else {
      setFiltered(masterData)
      setSearch(text);
      // setState(state => ({ ...state, key: text }))
    }
  }

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
          <Text style={styles.harga}>{item.retail_name}</Text>
          <Image source={allLogo.icaddress} style={styles.address} />
          <Text style={styles.dariKota}>{item.retailaddres}</Text>
          <Image source={allLogo.icstar} style={styles.star} />
          <Text style={styles.bintang}>{item.lainnya.rating}</Text>
          <View style={{ flexDirection: 'row', top: 25, right: 30 }}>
            <Text style={styles.terjual}>Terjual</Text>
            <Text style={styles.terjual}>{item.lainnya.terjual}</Text>
          </View>
        </ View>
      </Pressable>
    </ View>

  );

  return (
    <View style={styles.container}>
      <Image style={styles.icSearch} source={require('../../Assets/img/ic_search.png')} />
      <TextInput
        style={styles.textInput}
        placeholder="Pencarian..."
        value={search}
        placeholderTextColor='white'
        onChangeText={(text) => searchFilter(text)}

      />
      <TouchableOpacity style={styles.icBack} onPress={() => props.navigation.goBack()}>
        <Image source={allLogo.Left} style={{width:toDp(38), height:toDp(38)}} />
      </TouchableOpacity>
      <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
        {/* <Text style={{ fontSize: 20, marginTop: 20, marginBottom: 20, }}> List of data</Text> */}

        <FlatList style={{ backgroundColor: 'white', width: width, marginTop: toDp(10), }}
          columnWrapperStyle={{ justifyContent: 'space-between', marginHorizontal: toDp(15) }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            bottom: toDp(13),
            paddingBottom: toDp(3),
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
          ListFooterComponent={() => <View style={{ height: toDp(100) }} />}
        />



      </View>

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    width: width,
    flex: 1
  },
  icSearch: {
    width: toDp(25),
    height: toDp(25),
    position: 'absolute',
    zIndex: toDp(2),
    marginTop: toDp(18),
    right: toDp(270),
    tintColor: '#fff'
  },
  icBack: {
    width: toDp(38),
    height: toDp(38),
    resizeMode: 'contain',
    tintColor: 'black',
    marginHorizontal: toDp(8),
    // position: 'absolute',
    // zIndex: 3,
    right: toDp(150),
    bottom: 44
  },
  textInput: {
    backgroundColor: '#2A334B',
    left: 18,
    width: '82%',
    paddingLeft: toDp(50),
    marginTop: toDp(5),
    borderRadius: toDp(15),
    height: 50,
    fontSize: 15,
    // fontWeight: 'bold',
    paddingHorizontal: 10,
    color: 'white'
    // position: 'absolute',
  },
  card: {
    backgroundColor: '#FFF',
    top: toDp(10),
    padding: toDp(0),
    marginVertical: toDp(5),
    // marginHorizontal: toDp(16),
    borderRadius: toDp(20),
    minHeight: toDp(220),
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
    bottom: toDp(-4)
  },
  star: {
    bottom: toDp(3),
    right: toDp(0)
  },
  dariKota: {
    bottom: toDp(6),
    left: toDp(15)
  },
  textproduct: {
    fontWeight: 'bold',
    fontSize: toDp(12)
  },
  txtProduct: {

    borderRadius: toDp(20),
    padding: toDp(20)
  },
  imgProduct: {
    width: toDp(100),
    height: toDp(100)
  },
});

export default Cari;
