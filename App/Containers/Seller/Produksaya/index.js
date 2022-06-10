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
import  BackHeader  from '@BackHeader'
import Carousel, { Pagination } from "react-native-snap-carousel";
import LinearGradient from 'react-native-linear-gradient'
import NavigatorService from '@NavigatorService'
import { TextInput } from "react-native-gesture-handler";
import { BottomNavigation } from "react-native-paper";
import axios from "axios";

const { width, height } = Dimensions.get('window')

const Produksaya = (props) => {
  const [src, setSrc]=useState(null);

  const [state, setState] = useState({
    datas: [],
  })

  useEffect(() => {
    Produkbangunan()
  }, [])

  const Produkbangunan = () => {
    axios.get('https://market.pondok-huda.com/dev/react/product/')
      .then(result => {
        //hendle success
        setState(state => ({ ...state, datas: result.data.data }))
        console.log('Produk Bangunan ===> ' + JSON.stringify(result.data.data));

      }).catch(err => {
        alert('Gagal menerima data dari server!' + err)
        setState(state => ({ ...state, loading: false }))
      })
  }

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba1',
      title: 'Semen',
      harga: 'Rp. 100.000',
      dariKota: 'Kab. Cirebon',
      bintang : '4',
      terjual: '| Terjual 50',
      image: 'https://static.bmdstatic.com/pk/product/large/609a573e90d3d.jpg'
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f632',
      title: 'Batu Bata',
      harga: 'Rp. 50.000',
      dariKota: 'Kab. Cirebon',
      bintang : '4',
      terjual: '| Terjual 50',
      image: 'https://static-siplah.blibli.com/data/images/SNUI-0001-00041/b7e0b435-8780-4c32-87f2-75c7e760e823.jpg'
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d723',
      title: 'Paku',
      harga: 'Rp. 10.000',
      dariKota: 'Kab. Cirebon',
      bintang : '4',
      terjual: '| Terjual 50',
      image: 'https://static-siplah.blibli.com/data/images/SALW-0003-00023/d01cbe3d-4827-473b-98db-8812a08066b3.jpg'
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d724',
      title: 'Paku',
      harga: 'Rp. 10.000',
      dariKota: 'Kab. Cirebon',
      bintang : '4',
      terjual: '| Terjual 50',
      image: 'https://static-siplah.blibli.com/data/images/SALW-0003-00023/d01cbe3d-4827-473b-98db-8812a08066b3.jpg'
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba5',
      title: 'Semen',
      harga: 'Rp. 80.000',
      dariKota: 'Kab. Cirebon',
      bintang : '4',
      terjual: '| Terjual 50',
      image: 'https://static.bmdstatic.com/pk/product/large/609a573e90d3d.jpg'
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f636',
      title: 'Batu Bata',
      harga: 'Rp. 100.000',
      dariKota: 'Kab. Cirebon',
      bintang : '4',
      terjual: '| Terjual 50',
      image: 'https://static-siplah.blibli.com/data/images/SNUI-0001-00041/b7e0b435-8780-4c32-87f2-75c7e760e823.jpg'
    },
  ]

  const renderItem = (item, index) => (
    <Pressable onPress={()=> alert('Produk : '+index)}>
      <View style={styles.card}>
          <View style={styles.txtProduct}>
             <Image source={{uri: item.thumbnail}} style={styles.imgProduct} />
             <Text style={styles.textproduct}>{item.product_name.substr(0,15)}</Text>
             <Text style={styles.harga}>Rp {item.price}</Text>

             <Image source={allLogo.icaddress} style={styles.address} />
             <Text style={styles.dariKota}>{item.retailaddres.substr(0,12)}</Text>
             <Image source={allLogo.icstar} style={styles.star}/>
             <Text style={styles.bintang}>{DATA[0].bintang}</Text>
             <Text style={styles.terjual}>{DATA[0].terjual}</Text>
          </ View>
      </ View>
    </Pressable>
  );

  const CardProduct = () =>{
    return(
      <FlatList style={{ minHeight:toDp(400), width:width, marginTop:toDp(60), marginBottom:toDp(45)}}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: toDp(3),
            paddingBottom: toDp(3),
          }}

          numColumns={2}
          data={state.datas}
            renderItem={({item, index}) => {
              return (
                renderItem(item, index)
              )
            }}
          ListFooterComponent={() => <View style={{height: toDp(100)}} />}
        />
    )
  }

  return (
    <View style={styles.container}>

        <BackHeader
          title={'Produk Saya'}
          onPress={() => props.navigation.goBack()}
        />

        <View style={{bottom:toDp(60)}}>
            <CardProduct/>
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
    backgroundColor:'white',
  },
  bodyMenu: {
    flexDirection:'row',
    alignItems:'baseline',
    backgroundColor:'#2A334B',
    bottom:toDp(150),
    width:toDp(335),
    height:toDp(45),
    borderRadius:toDp(10),
},
btnHome: {
  marginHorizontal:toDp(20)
},
icchat: {
  width:toDp(26),
  height:toDp(26),
  tintColor:'white'
},
icplus: {
  // tintColor:'black'
},
ichome: {
  tintColor:'white'
},
btnChat: {
  marginHorizontal:toDp(20),
},
card: {
  backgroundColor: '#f8f9f9',
  padding: toDp(25),
  marginVertical: toDp(5),
  marginHorizontal: toDp(16),
  borderRadius:toDp(10),
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
  bottom: toDp(5),
  left: toDp(15)
},
terjual: {
  bottom: toDp(25),
  left: toDp(28)
},
address: {
  top:toDp(23)
},
star: {
  top: toDp(10),
  right: toDp(0)
},
dariKota: {
  top:toDp(8),
  left: toDp(15)
},
textproduct: {
  fontWeight: 'bold',
  fontSize: toDp(12),
  top:toDp(20)
},
txtProduct:{
  width:'100%',
  // backgroundColor:'red',
  bottom:toDp(20)
},
imgProduct:{
  width: toDp(100),
  height:toDp(100)
},
harga: {
  top:toDp(20)
}
});

export default Produksaya;