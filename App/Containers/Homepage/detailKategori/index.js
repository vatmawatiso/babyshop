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
  TouchableOpacity
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

const detailKategori = (props) => {
  const [src, setSrc] = useState(null);

  const [state, setState] = useState({
    datas: [],
  })

  useEffect(() => {
    detailKategori()
  }, [])

  const detailKategori = () => {
    const kid = props.navigation.state.params.ctg_id
    axios.get(svr.url+'product/category/'+kid+'/'+svr.api)
    // axios.get('https://market.pondok-huda.com/dev/react/product/?ctg_id=' + kid)
      .then(result => {
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
  
  const displayName = (retail) => {
    let count = '';
    let nama = '';
    count = retail.split(' ' || '-');
    nama = count.slice(0, 2,).join(' ');
    return nama
  }

  const renderItem = (item, index) => (
    <Pressable onPress={() => alert('Produk : ' + index)}>
      <View style={styles.card}>
        <View style={styles.txtProduct}>
          <Image source={{ uri: item.thumbnail }} style={styles.imgProduct} />
          <Text style={styles.textproduct}>{item.product_name.substr(0, 5)}</Text>
          <Text style={{ fontSize:toDp(12), right:toDp(1), fontWeight:'bold' }}>{displayName(item.retail)}</Text>
          <NumberFormat
            value={item.price}
            displayType={'text'}
            thousandSeparator={'.'}
            decimalSeparator={','}
            prefix={'Rp. '}
            renderText={formattedValue => <Text style={{ color: '#F83308', fontWeight: '800' }}>{formattedValue}</Text>} // <--- Don't forget this!
          />

          <View style={{ flexDirection: 'row', marginLeft: toDp(10), marginTop:toDp(7)}}>
            <View>
              <Text style={{ fontSize:toDp(12), right:toDp(9) }}>Stok</Text>
              <Text style={{ fontSize:toDp(12), right:toDp(9) }}>Kondisi</Text>
            </View>
            <View>
              <Text style={{ fontSize:toDp(12), right:toDp(9) }}> : {item.stock}</Text>
              <Text style={{ fontSize:toDp(12), right:toDp(9) }}> : {item.kondisi}</Text>
            </View>
          </View>

        </ View>
      </ View>
    </Pressable>
  );

  const CardProduct = () => {
    return (
      <FlatList style={{ minHeight: toDp(400), width: width, marginTop: toDp(20), marginBottom: toDp(45) }}
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
        title={props.navigation.state.params.ctg_name}
        onPress={() => props.navigation.goBack()}
      />

      <View style={{ bottom: toDp(20) }}>
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
    backgroundColor: 'white',
    padding: toDp(25),
    marginVertical: toDp(5),
    marginHorizontal: toDp(16),
    borderRadius: toDp(10),
    height: toDp(230),
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
    left: toDp(10)
  },
  textproduct: {
    fontWeight: 'bold',
    fontSize: toDp(12)
  },
  txtProduct: {
    width: '100%',
    backgroundColor: 'white',
    marginTop: toDp(-16),
    marginBottom: toDp(50)
  },
  imgProduct: {
    width: toDp(100),
    height: toDp(100)
  }
});

export default detailKategori;