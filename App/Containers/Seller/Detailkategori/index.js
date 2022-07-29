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
  Dimensions,
  FlatList,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import HeaderToko from '@HeaderToko'
import BackHeader from '@BackHeader'
import axios from "axios";
import Carousel, { Pagination } from "react-native-snap-carousel";
import LinearGradient from 'react-native-linear-gradient'
import NavigatorService from '@NavigatorService'
import { TextInput } from "react-native-gesture-handler";
import { BottomNavigation } from "react-native-paper";
import NumberFormat from 'react-number-format';
import { svr } from "../../../Configs/apikey";

const { width, height } = Dimensions.get('window')

const Detailkategori = (props) => {
  const [src, setSrc] = useState(null);

  const [state, setState] = useState({
    datas: [],
  })

  useEffect(() => {
    AsyncStorage.getItem('member').then(response => {
      //console.log('Profilseller=======>'+ JSON.stringify(responponse));

      let data = JSON.parse(response);
      //const val = JSON.stringify(data);

      // console.log('Homeseller ==> '+ JSON.stringify(data));

      setState(state => ({
        ...state,
        id: data.mb_id,
        mb_name: data.value.mb_name,
        mb_email: data.value.mb_email,
        mb_phone: data.value.mb_phone,
        mb_type: data.value.mb_type,
        picture: data.value.picture,
        retail_id: data.retail_id,
      }))
       console.log('RTL ID '+ JSON.stringify(state.retail_id));
       console.log('name '+ JSON.stringify(state.mb_name));

    }).catch(err => {
      console.log('err', err)
    })

    AsyncStorage.getItem('uid').then(uids => {
      let ids = uids;
      setState(state => ({
        ...state,
        mb_id: ids
      }))
    }).catch(err => {
      console.log('err', err)
    })
    detailKategori()
  }, [])

  
  const detailKategori = () => {
    const kid = props.navigation.state.params.ctg_id
    console.log('kid ', (kid))
    axios.get(svr.url+'product/getct/'+state.retail_id+'/'+kid+'/'+svr.api)
    // axios.get('https://market.pondok-huda.com/dev/react/product/getct/'+state.retail_id+'/'+kid)
      .then(result => {
        console.log('Detail Kategori '+ JSON.stringify(result.data));
        if (result.data.status == 200) {
          //hendle success
          console.log('Produk Bangunan ===> ', result);
          setState(state => ({ ...state, datas: result.data.data }))
          setState(state => ({ ...state, loading: false }))
        } else if (result.data.status == 404) {
          alert('Produk Belum Ditambahkan')
          setState(state => ({ ...state, loading: false }))
        }

      }).catch(err => {
        alert('Gagal menerima data dari server!' + err)
        setState(state => ({ ...state, loading: false }))
      })
  }

  const RenderItem = (item, index) => (
    <Pressable onPress={() => alert('Produk : ' + index)}>
      <View style={styles.card}>
        <View style={styles.txtProduct}>
          <Image source={{ uri: item.thumbnail }} style={styles.imgProduct} />
          <Text style={styles.textproduct}>{item.product_name.substr(0, 5)}</Text>
          <NumberFormat
            value={item.price}
            displayType={'text'}
            thousandSeparator={'.'}
            decimalSeparator={','}
            prefix={'Rp. '}
            renderText={formattedValue => <Text style={{ color: '#F83308', fontWeight: '800', marginRight: toDp(5) }}>{formattedValue}</Text>} // <--- Don't forget this!
          />
          {/* <Text style={{width:toDp(200)}}>Harga: {item.price}</Text> */}
          <Text style={{ width: toDp(200) }}>Stock: {item.stock}</Text>
          <Text style={{ width: toDp(200) }}>Berat: {item.berat}</Text>
          <Text style={{ width: toDp(200) }}>Kategori: {item.category.substr(0, 5)}</Text>
          <Text style={{ width: toDp(200) }}>Kondisi: {item.kondisi}</Text>
          {/* <Image source={allLogo.icaddress} style={styles.address} />
             <Text style={styles.dariKota}>{item.dariKota}</Text>
             <Image source={allLogo.icstar} style={styles.star}/>
             <Text style={styles.bintang}>{item.bintang}</Text>
             <Text style={styles.terjual}>{item.terjual}</Text> */}
        </ View>
      </ View>
    </Pressable>
  );

  const CardProduct = () => {
    return (
      <FlatList style={{ minHeight: toDp(400), width: width }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: toDp(3),
          paddingBottom: toDp(30),

        }}

        numColumns={2}
        data={state.datas}
        renderItem={({ item, index }) => {
          return (
            RenderItem(item, index)
          )
        }}
        ListFooterComponent={() => <View style={{ height: toDp(100) }} />}
      />
    )
  }


  return (
    <View style={styles.container}>

      <BackHeader
        title={'Detail Kategori'}
        onPress={() => props.navigation.goBack()}
      />

      <View style={styles.bodyMenu}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.txtTerbaru}>Terbaru</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button1}>
          <Text style={styles.txtTerlaris}>Terlaris</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2}>
          <Text style={styles.txtHarga}>Harga</Text>
        </TouchableOpacity>
      </View>
      <CardProduct />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#E7E7E7',
    width: toDp(112),
    height: toDp(40),
    padding: toDp(10),
    // top:toDp(10),
    justifyContent: 'center',
    borderTopLeftRadius: toDp(8),
    borderBottomLeftRadius: toDp(8),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,

  },
  button1: {
    backgroundColor: '#E7E7E7',
    width: toDp(111),
    height: toDp(40),
    padding: toDp(10),
    // top:toDp(10),
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2
  },
  button2: {
    backgroundColor: '#E7E7E7',
    width: toDp(111),
    height: toDp(40),
    padding: toDp(10),
    // top:toDp(10),
    justifyContent: 'center',
    borderTopRightRadius: toDp(8),
    borderBottomRightRadius: toDp(8),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2
  },
  bodyMenu: {
    backgroundColor: '#E7E7E7',
    width: toDp(335),
    height: toDp(36),
    borderRadius: toDp(10),
    flexDirection: 'row',
    top:toDp(10),
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
  txtTerbaru: {
    marginLeft: toDp(5),
    textAlign: 'center'
  },
  txtTerlaris: {
    textAlign: 'center'
  },
  txtHarga: {
    marginRight: toDp(5),
    textAlign: 'center'
  },
  card: {
    backgroundColor: 'white',
    top: toDp(15),
    padding: toDp(25),
    marginVertical: toDp(5),
    marginHorizontal: toDp(16),
    borderRadius: toDp(10),
    height: toDp(235),
    right: toDp(2),
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
    left: toDp(28)
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
    width: toDp(100),
    height: toDp(225),
    backgroundColor: 'white',
    bottom: toDp(20)
  },
  imgProduct: {
    width: toDp(100),
    height: toDp(100)
  }
});

export default Detailkategori;