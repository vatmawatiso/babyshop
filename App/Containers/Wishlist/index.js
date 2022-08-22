import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  ScrollView,
  Dimensions,
  ImageBackground,
  Pressable,
  FlatList,
  AsyncStorage,
  LogBox,
  TouchableOpacity
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import Header from '@Header'
import Axios from "axios";
import NavigatorService from '@NavigatorService'
import NumberFormat from 'react-number-format';
import { svr } from "../../Configs/apikey";

const { width, height } = Dimensions.get('window')

const Wishlist = (props) => {
  const [state, setState] = useState({
    dataWish: [],
    mb_id: '',
    ws_mb_id: '',
    ws_prd_id: '',
    ws_rtl_id: '',
    nullData: false
  })
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"])


    // get id pengguna
    AsyncStorage.getItem('uid').then(uids => {
      let ids = uids;
      setState(state => ({
        ...state,
        mb_id: ids
      }))
    }).catch(err => {
      console.log('err', err)
    })

    getWish()


  }, [state.mb_id])

  const getWish = () => {
    Axios.get(svr.url+'wishlist/member/'+state.mb_id+'/'+svr.api)
    // Axios.get('https://market.pondok-huda.com/dev/react/wishlist/?mb_id=' + state.mb_id)
      .then(result => {
        console.log('get Wishlist', result.data);
        // getCurrentWsh()
        if (result.data.data == null || result.data.data == 'null') {
          setState(state => ({ ...state, nullData: false }))
        } else {
          setState(state => ({ ...state, dataWish: result.data.data, nullData: true }))
        }
        //console.log('result2 =>', result.data.data)
      }).catch(error => {
        console.log(error)
      })
  }

  // memasukan produk ke wishlist
  const selectItems = (id, retail, index) => {
    if ((selectedItems.ws_prd_id != state.dataWish[index]?.mb_id) && (selectedItems.ws_mb_id != state.mb_id)) {
      const body = {
        ws_mb_id: state.mb_id,
        ws_rtl_id: retail,
        ws_prd_id: id
      }
      console.log('data -----=>', body);
      Axios.post(svr.url+'wishlist/'+svr.api,body)
      // Axios.post('https://market.pondok-huda.com/dev/react/wishlist/', body)
        .then(response => {
          console.log('wishlist -----=>' + JSON.stringify(response.data));

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
    }

  };

  // unlike produk
  const deSelectItems = (wsid) => {
    // if(selectItems.length>0){
    //     if (selectedItems.some(i => i.ws_prd_id === id) && selectedItems.some(i => i.ws_mb_id == ws_mb_id)) {
    console.log('response-unlike => ' + wsid)
    Axios.delete(svr.url+'wishlist/delwishlist/'+wsid+'/'+svr.api)
    // Axios.delete('https://market.pondok-huda.com/dev/react/wishlist/delwishlist/' + wsid)
      .then(response => {
        console.log('response-unlike =>', response.data)
        if (response.data.status == 200) {
          setState(state => ({ ...state, dataWish: [] }))
          getWish()

        } else {
          console.log('response =>', response)
        }
      }).catch(error => {
        console.log('error =>', error)
      })
    //   }
    // }
  }

  const selectProduk = (value, id) => {
    NavigatorService.navigate('Produk', { value, id: id })
  }

  const RenderItem = ({ item, index, unLike, onPressProduk }) => (
    <View style={styles.card}>
      <Pressable onPress={() => onPressProduk()}>
        <View style={styles.txtProduct}>
          <Image source={{ uri: item.thumbnail }} style={styles.imgProduct} />
          <Text style={styles.textproduct}>{item.prd_name.substr(0, 5)}</Text>
          <View>

            {/* <TouchableOpacity onPress={() => onPress()} key={index}>
                        <Image source={allLogo.icwishlist} style={{width:toDp(25), height:toDp(25)}} />
                      </TouchableOpacity> */}

            <TouchableOpacity onPress={() => unLike()} key={index}>
              <Image source={allLogo.hati} style={{ width: toDp(20), height: toDp(18), left: toDp(90) }} />
            </TouchableOpacity>

          </View>
          {/* <Text style={styles.harga}>Harga: {item.prd_price}</Text> */}
          <NumberFormat
            value={item.prd_price}
            displayType={'text'}
            thousandSeparator={'.'}
            decimalSeparator={','}
            prefix={'Rp. '}
            renderText={formattedValue => <Text style={{ color: '#F83308', fontWeight: '800', bottom:toDp(10)}}>{formattedValue}</Text>} // <--- Don't forget this!
          />
          <Image source={allLogo.icaddress} style={styles.address} />
          <Text style={styles.dariKota}>{item.rtl_name}</Text>
          {/* <Image source={allLogo.icstar} style={styles.star} />
          <Text style={styles.bintang}>{item.bintang}</Text>
          <Text style={styles.terjual}>{item.terjual}</Text> */}
        </ View>
      </Pressable>
    </ View>

  );

  const CardProduct = () => {
    return (
      <FlatList style={{ minHeight: toDp(400), width: width }}
        columnWrapperStyle={{ justifyContent: 'space-between', marginHorizontal: 15 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: toDp(5),
          paddingBottom: toDp(0),

        }}

        numColumns={2}
        data={state.dataWish}
        renderItem={({ item, index }) => (
          <RenderItem
            item={item}
            index={index}
            unLike={() => deSelectItems(item.id)}
            onPressProduk={() => selectProduk(item.id)}
          />

          // return (
          //   RenderItem(item, index, ()=> deSelectItems(item.id, item.retail, state.mb_id), ()=> selectProduk(item.id))
          // )
        )}
        ListFooterComponent={() => <View style={{ height: toDp(100) }} />}
      />
    )
  }

  return (
    <View style={styles.container}>
      <Header
        title={'Wishlist'}
        onPress={() => props.navigation.goBack()}
      />

      {state.nullData == true ?
        <CardProduct />
        :
        <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20, marginTop: toDp(-90) }}>Anda Belum Memiliki Wishlist Barang</Text>
        </View>
      }


    </View>
  )

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: 'white',
    padding: toDp(25),
    marginVertical: toDp(5),
    // marginHorizontal: toDp(3),
    borderRadius: toDp(10),
    height: toDp(221),
    width: '48%',
    // right: toDp(5),
    // left: toDp(5),
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
    bottom: toDp(25),
    left: toDp(15)
  },
  terjual: {
    bottom: toDp(45),
    left: toDp(28)
  },
  address: {
    bottom: toDp(3)
  },
  star: {
    bottom: toDp(11),
    right: toDp(0)
  },
  dariKota: {
    bottom: toDp(18),
    left: toDp(15)
  },
  textproduct: {
    fontWeight: 'bold',
    fontSize: toDp(12),
    top: toDp(10)
  },
  txtProduct: {
    width: '100%',
    height: toDp(210),
    backgroundColor: 'white',
    marginTop: toDp(-16),
    marginBottom: toDp(50),
  },
  imgProduct: {
    width: toDp(100),
    height: toDp(100),
    left:toDp(5)
  },
  Wishlist: {
    backgroundColor: 'cyan',
    width: toDp(28),
    left: toDp(80),
    bottom: toDp(10)
  },
  icwishlist: {
    width: toDp(25),
    height: toDp(25)
  },
  harga: {
    bottom: toDp(10)
  }
});

export default Wishlist;