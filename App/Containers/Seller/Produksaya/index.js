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
import BackHeader from '@BackHeader'
import Carousel, { Pagination } from "react-native-snap-carousel";
import LinearGradient from 'react-native-linear-gradient'
import NavigatorService from '@NavigatorService'
import { TextInput } from "react-native-gesture-handler";
import { BottomNavigation } from "react-native-paper";
import axios from "axios";
import NumberFormat from 'react-number-format';
import { svr } from "../../../Configs/apikey";

const { width, height } = Dimensions.get('window')

const Produksaya = (props) => {
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
      // console.log('RTL ID ' + JSON.stringify(state.retail_id));

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

    Produkbangunan()
  }, [])

  const Produkbangunan = () => {
    let retail = props.navigation.state.params.retail_id;
    console.log(retail);
    // axios.get('https://market.pondok-huda.com/dev/react/product/retail/' + retail)
    axios.get(svr.url+'product/retail/'+retail+'/'+svr.api)
      .then(result => {
        //hendle success
        setState(state => ({ ...state, datas: result.data.data }))
        console.log('Produk ===> ' + JSON.stringify(result.data.data));

      }).catch(err => {
        alert('Gagal menerima data dari server!' + err)
        setState(state => ({ ...state, loading: false }))
      })
  }


  const displayName = (product_name) => {
    let count = '';
    let nama = '';
    count = product_name.split(' ' || '-');
    nama = count.slice(0, 0,).join(' ');
    return nama
  }

  const renderItem = (item, index) => (
    <Pressable>
      <View style={styles.card}>
        <View style={styles.txtProduct}>
          <Image source={{ uri: item.thumbnail }} style={styles.imgProduct} />
          <Text style={styles.textproduct}>{displayName(item.product_name)}</Text>
          <NumberFormat
            value={item.price}
            displayType={'text'}
            thousandSeparator={'.'}
            decimalSeparator={','}
            prefix={'Rp. '}
            renderText={formattedValue => <Text style={{color: '#F83308', fontWeight: '800', top:toDp(20)}}>{formattedValue}</Text>} // <--- Don't forget this!
          />

          <Text style={styles.dariKota}>TB    : {item.retail}</Text>
          <Text style={styles.dariKota}>Stok : {item.stock}</Text>
          <Text style={styles.dariKota}>kondisi : {item.kondisi}</Text>
          <Text style={styles.dariKota}>Stok : {item.category}</Text>
          {/* <Image source={allLogo.icstar} style={styles.star} /> */}
          {/* <Text style={styles.bintang}>{item.lainnya.rating}</Text>
          <Text style={styles.terjual}>| Terjual {item.lainnya.terjual}</Text> */}
        </ View>
      </ View>
    </Pressable>
  );

  const CardProduct = () => {
    return (
      <FlatList style={{ minHeight: toDp(400), width: width, marginTop: toDp(60), marginBottom: toDp(45) }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: toDp(3),
          paddingBottom: toDp(3),
        }}

        numColumns={2}
        data={state.datas}
        renderItem={({ item, index }) => {
          return (
            renderItem(item, index)
          )
        }}
        ListFooterComponent={() => <View style={{ height: toDp(100) }} />}
      />
    )
  }

  return (
    <View style={styles.container}>

      <BackHeader
        title={'Produk Saya'}
        onPress={() => props.navigation.goBack()}
      />

      <View style={{ bottom: toDp(60) }}>
        <CardProduct />
      </View>

      {/* <View style={[styles.bodyMenu, {justifyContent:'space-between', alignItems:'center'} ]}>
            <Pressable style={styles.btnHome}>
                <Image source={allLogo.ichome} style={styles.ichome} />
            </Pressable>
            <Pressable style={styles.btnPlus} onPress={() => NavigatorService.navigate('Tambahproduk')}>
                <Image source={allLogo.icplusround} style={styles.icplus}/>
            </Pressable> 
            <Pressable style={styles.btnChat} onPress={() => NavigatorService.navigate('Chat')}>
                <Image source={allLogo.icchat} style={styles.icchat}/>
            </Pressable> 
        </View> */}



    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
  },
  bodyMenu: {
    flexDirection: 'row',
    alignItems: 'baseline',
    backgroundColor: '#2A334B',
    bottom: toDp(150),
    width: toDp(335),
    height: toDp(45),
    borderRadius: toDp(10),
  },
  btnHome: {
    marginHorizontal: toDp(20)
  },
  icchat: {
    width: toDp(26),
    height: toDp(26),
    tintColor: 'white'
  },
  icplus: {
    // tintColor:'black'
  },
  ichome: {
    tintColor: 'white'
  },
  btnChat: {
    marginHorizontal: toDp(20),
  },
  card: {
    backgroundColor: '#f8f9f9',
    padding: toDp(25),
    marginVertical: toDp(5),
    marginHorizontal: toDp(16),
    borderRadius: toDp(10),
    height: toDp(260),
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
    bottom: toDp(5),
    left: toDp(15)
  },
  terjual: {
    bottom: toDp(25),
    left: toDp(28)
  },
  address: {
    top: toDp(23)
  },
  star: {
    top: toDp(10),
    right: toDp(0)
  },
  dariKota: {
    top: toDp(20),
    left: toDp(0),
    width:toDp(100)
  },
  textproduct: {
    fontWeight: 'bold',
    fontSize: toDp(12),
    top: toDp(20)
  },
  txtProduct: {
    width: '100%',
    // backgroundColor:'red',
    bottom: toDp(20)
  },
  imgProduct: {
    width: toDp(100),
    height: toDp(100)
  },
  harga: {
    top: toDp(20)
  }
});

export default Produksaya;