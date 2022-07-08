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
  AsyncStorage
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import Carousel, { Pagination } from "react-native-snap-carousel";
import LinearGradient from 'react-native-linear-gradient'
import SelectableChips from 'react-native-chip/SelectableChips'
import Search from '@Search'
import NavigatorService from '@NavigatorService'
import Axios from "axios";
import NumberFormat from 'react-number-format';

const { width, height } = Dimensions.get('window')

const Kategoriproduk = () => {

  const [state, setState] = useState({
    dataProduk: [],
    dataKategori: '',
    loading: false,
    sChip: '',
    dataLain:[],
  })
  const [sChip, setChip] = useState(['Dapur', 'Kamar Mandi', 'Atap Rumah', 'Jendela', 'Cat Tembok', 'Peralatan Bangunan', 'Ruang Tamu'])

  useEffect(() => {

    produk()

    dataCat()
  }, [])

  const produk = () => {
    Axios.get('https://market.pondok-huda.com/dev/react/product/')
      .then(result => {

        console.log('result', result);
        setState(state => ({ ...state, dataProduk: result.data.data }))
        console.log('result2 =>', result.data.data)
      }).catch(error => {
        console.log(error)
      })
  }

  const dataCat = () => {
    setState(state => ({ ...state, loading: true }))
    Axios.get('https://market.pondok-huda.com/dev/react/category/')
      .then(result => {
        if (result.data.status == 200) {
          // console.log('result kategori =>', result)
          setState(state => ({ ...state, dataKategori: result.data.data }));
          // convert(result.data)
          setState(state => ({ ...state, loading: false }))
        } else if (result.data.status == 500) {
          console.log('error')
          setState(state => ({ ...state, loading: false }))
        }
      }).catch(error => {
        console.log('error kategori => ', error)
        setState(state => ({ ...state, loading: false }))
      })
  }
  const convert = (datas) => {
    //this func => convert json to array
    let final = [];
    datas.data.map((v, i) => {
      final.push(v.ctg_name)
    })

    setState(state => ({ ...state, dataKategori: final })) //set result to state 
    //return JSON.stringify(final)
  }

  const RenderItem = (item, index) => (
      <View style={styles.card}>
        <View style={[styles.txtProduct, { height: toDp(30) }]}>
          <Image source={{ uri: item.thumbnail }} style={styles.imgProduct} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.textproduct}>{item.product_name.substr(0, 4)}</Text>
            <Image source={allLogo.icwishlist} style={{ width: toDp(25), height: toDp(25) }} />
          </View>
          <NumberFormat
            value={item.price}
            displayType={'text'}
            thousandSeparator={'.'}
            decimalSeparator={','}
            prefix={'Rp. '}
            renderText={formattedValue => <Text style={{ color: '#F83308', fontWeight: '800' }}>{formattedValue}</Text>} // <--- Don't forget this!
          />
          <Image source={allLogo.icaddress} style={styles.address} />
          <Text style={styles.dariKota}>{item.retailaddres.substr(0, 12)}</Text>
          <Image source={allLogo.icstar} style={styles.star} />
          <Text style={styles.bintang}>{item.lainnya.rating}</Text>
          <Text style={styles.terjual}>| Terjual {item.lainnya.terjual}</Text>
        </ View>
      </ View>
  );

  const CardProduct = () => {
    return (
      <FlatList style={{ backgroundColor: 'white', minHeight: toDp(400), width: width, marginTop: toDp(-10), }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          bottom: toDp(13),
          paddingBottom: toDp(3),

        }}

        numColumns={2}
        data={state.dataProduk}
        renderItem={({ item, index }) => {
          return (
            RenderItem(item, index)
          )
        }}
        ListFooterComponent={() => <View style={{ height: toDp(100) }} />}
      />
    )
  }

  const getKategori = (value, ctg_id, ctg_name) => {
    NavigatorService.navigate('detailKategori', { value, ctg_id: ctg_id, ctg_name: ctg_name })
  }

  const renderKategori = (item, index, onPress) => (
    <Pressable style={styles.presKategori} onPress={() => onPress()}>
      <View style={styles.kategori}>
        <Text style={styles.textKat}>{item.ctg_name}</Text>
      </ View>
    </Pressable>
  );


  return (
    <View style={styles.container}>
      <ScrollView style={styles.ScrollView}>
        {/* <Search onChangeText={(text)=> setSrc(text)} /> */}
        {/* <View style={{width: '100%', marginTop: toDp(1), flexDirection: 'column', height: toDp(100)}}> */}
        <View style={{ width: '100%' }}>
          <Text style={{ fontSize: toDp(10), fontWeight: 'bold', fontSize: toDp(13), marginLeft: toDp(14) }}>Kategori</Text>
        </View>

        <View style={styles.content}>
          <FlatList
            horizontal={true}
            style={styles.viewCat}
            data={state.dataKategori}
            // ItemSeparatorComponent={Separator}
            renderItem={({ item, index, value }) => {
              return (
                renderKategori(item, index, () => getKategori(value, item.ctg_id, item.ctg_name))
              )
            }}
          />
        </View>

        <View style={styles.textVocher}>
          <View style={styles.judul1}>
            <Text style={[styles.textVocher, { fontWeight: 'bold' }]}>Promo dan Vocher T.B Global Energy</Text>
          </View>
        </View>
        <View style={styles.contentVocher}>
          <Pressable style={{ left: toDp(65), top: toDp(15) }} onPress={() => alert('coba')}>
            <View style={[styles.vocher, { height: toDp(103) }]}>
              <Image source={allLogo.diskon} style={styles.imgVocher} />
              <Text style={styles.titleVocher}>Diskon</Text>
            </View>
          </Pressable>

          <Pressable style={{ left: toDp(65), top: toDp(15) }} onPress={() => alert('coba')}>
            <View style={styles.vocher}>
              <Image source={allLogo.cashback} style={styles.imgVocher} />
              <Text style={styles.titleVocher}>Casback</Text>
            </View>
          </Pressable>

          <Pressable style={{ left: toDp(65), top: toDp(15) }} onPress={() => alert('coba')}>
            <View style={styles.vocher}>
              <Image source={allLogo.gratisongkir} style={styles.imgVocher} />
              <Text style={styles.titleVocher}>Gratis Ongkir</Text>
            </View>
          </Pressable>
        </View>
        <View style={styles.titleContent}>
          <Text style={styles.textContent}>Bahan Bangunan Berkualitas</Text>
        </View>

        <CardProduct />
      </ScrollView>
    </View>
  )

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: toDp(13),
    color: 'black',
    top: toDp(25),
    right: toDp(75)
  },
  content: {
    top: toDp(5),
    backgroundColor: 'white',
    height: toDp(75)
  },
  presable: {
    justifyContent: 'center',
    top: toDp(30)
  },
  textButton1: {
    right: toDp(130),
    backgroundColor: '#F9F8F8',
    height: toDp(11),
    width: toDp(50),
    borderRadius: toDp(10),
    textAlign: 'center'
  },
  textButton2: {
    top: toDp(-11),
    right: toDp(58),
    backgroundColor: '#F9F8F8',
    height: toDp(11),
    width: toDp(80),
    borderRadius: toDp(10),
    textAlign: 'center'
  },
  textButton3: {
    top: toDp(-22),
    right: toDp(-29),
    backgroundColor: '#F9F8F8',
    height: toDp(11),
    width: toDp(80),
    borderRadius: toDp(0),
    textAlign: 'center'
  },
  textButton4: {
    top: toDp(-33),
    right: toDp(-116),
    backgroundColor: '#F9F8F8',
    height: toDp(11),
    width: toDp(80),
    borderRadius: toDp(0),
    textAlign: 'center'
  },
  textButton5: {
    top: toDp(-28),
    right: toDp(130),
    backgroundColor: '#F9F8F8',
    height: toDp(11),
    width: toDp(50),
    borderRadius: toDp(0),
    textAlign: 'center'
  },
  textButton6: {
    top: toDp(-39),
    right: toDp(49),
    backgroundColor: '#F9F8F8',
    height: toDp(13),
    width: toDp(100),
    borderRadius: toDp(10),
    textAlign: 'center'
  },
  textButton7: {
    top: toDp(-51),
    right: toDp(-48),
    backgroundColor: '#F9F8F8',
    height: toDp(11),
    width: toDp(80),
    borderRadius: toDp(8),
    textAlign: 'center'
  },
  product: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    backgroundColor: '#F9F8F8',
    textAlign: 'center',
    borderRadius: toDp(10),
    width: toDp(70),
    height: toDp(70),
    fontSize: toDp(10),
    margin: toDp(10),
    paddingTop: toDp(53)
  },
  imgProduk: {
    position: 'absolute',
    zIndex: 1,
    marginLeft: toDp(10),
    top: toDp(10)
  },
  text2: {
    backgroundColor: 'red',
    textAlign: 'center',
    borderRadius: toDp(10),
    width: toDp(64),
    height: toDp(64),
    margin: toDp(5),
    color: 'white',
    paddingTop: toDp(35)
  },
  textVocher: {
    right: toDp(32),
    top: toDp(3),
    fontSize: toDp(13)
  },
  judul: {
    left: toDp(89)
  },
  judul1: {
    left: toDp(79)
  },
  contentVocher: {
    flexDirection: 'row',
    right: toDp(59),
    bottom: toDp(5)
  },
  vocher: {
    // top: toDp(10),
    backgroundColor: '#F9F8F8',
    margin: toDp(5),
    paddingRight: toDp(20),
    // left: toDp(65),
    borderRadius: toDp(10),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  titleVocher: {
    textAlign: 'center',
    left: toDp(10),
    bottom: toDp(8)
  },
  imgVocher: {
    left: toDp(10)
  },
  textContent: {
    bottom: toDp(12),
    right: toDp(83),
    fontSize: toDp(13),
    fontWeight: 'bold',
  },
  titleContent: {
    left: toDp(97),
    paddingBottom: toDp(5),
    marginTop: toDp(20)
  },
  card: {
    backgroundColor: 'white',
    bottom: toDp(-15),
    padding: toDp(25),
    marginVertical: toDp(5),
    marginHorizontal: toDp(16),
    borderRadius: toDp(10),
    height: toDp(221),
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
    bottom: toDp(12),
    left: toDp(15)
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
  },
  presKategori: {
    marginRight: toDp(8),
    marginLeft: toDp(8),
    backgroundColor: '#2B324C',
    height: toDp(45),
    borderRadius: toDp(6),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,

  },
  kategori: {
    width: toDp(100),
    height: toDp(45),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textKat: {
    fontSize: toDp(12),
    fontWeight: 'bold',
    color: 'white'
  }
});

export default Kategoriproduk;
