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
import  HeaderToko  from '@HeaderToko'
import  BackDetailKate  from '@BackDetailKate'
import Carousel, { Pagination } from "react-native-snap-carousel";
import LinearGradient from 'react-native-linear-gradient'
import NavigatorService from '@NavigatorService'
import { TextInput } from "react-native-gesture-handler";
import { BottomNavigation } from "react-native-paper";

const { width, height } = Dimensions.get('window')

const Kategori = (props) => {
  const [src, setSrc]=useState(null);

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
    },{
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

  const RenderItem = (item, index) => (
    <Pressable onPress={()=> alert('Produk : '+index)}>
      <View style={styles.card}>
          <View style={styles.txtProduct}>
             <Image source={{uri: item.image}} style={styles.imgProduct} />
             <Text style={styles.textproduct}>{item.title}</Text>
             <Text style={styles.harga}>{item.harga}</Text>
             <Image source={allLogo.icaddress} style={styles.address} />
             <Text style={styles.dariKota}>{item.dariKota}</Text>
             <Image source={allLogo.icstar} style={styles.star}/>
             <Text style={styles.bintang}>{item.bintang}</Text>
             <Text style={styles.terjual}>{item.terjual}</Text>
          </ View>
      </ View>
    </Pressable>
  );

  const CardProduct = () =>{
    return(
      <FlatList style={{ minHeight:400, width:width, marginTop:10,}}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: toDp(3),
            paddingBottom: toDp(3),

          }}

          numColumns={2}
          data={DATA}
            renderItem={({item, index}) => {
              return (
                RenderItem(item, index)
              )
            }}
          ListFooterComponent={() => <View style={{height: toDp(100)}} />}
        />
    )
  }


  return (
    <View style={styles.container}>

        <BackDetailKate/>

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
        <CardProduct/>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    top:toDp(50)
  },
  button: {
    backgroundColor:'#E7E7E7',
    width:toDp(112),
    height:toDp(40),
    padding: toDp(10),
    // top:toDp(10),
    justifyContent:'center',
    borderTopLeftRadius:toDp(8),
    borderBottomLeftRadius:toDp(8),
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
    backgroundColor:'#E7E7E7',
    width:toDp(111),
    height:toDp(40),
    padding: toDp(10),
    // top:toDp(10),
    justifyContent:'center',
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
    backgroundColor:'#E7E7E7',
    width:toDp(111),
    height:toDp(40),
    padding: toDp(10),
    // top:toDp(10),
    justifyContent:'center',
    borderTopRightRadius:toDp(8),
    borderBottomRightRadius:toDp(8),
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
    backgroundColor:'#E7E7E7',
    width:toDp(335),
    height:toDp(36),
    borderRadius:toDp(8),
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
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
    marginLeft:toDp(5),
    textAlign:'center'
  },
  txtTerlaris: {
    textAlign:'center'
  },
  txtHarga: {
    marginRight:toDp(5),
    textAlign:'center'
  },
  card: {
    backgroundColor: 'white',
    bottom:toDp(-15),
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
  txtProduct:{
    width:'100%',
    backgroundColor:'white',
    marginTop:toDp(-16),
    marginBottom:toDp(50)
  },
  imgProduct:{
    width: toDp(100),
    height:toDp(100)
  }
});

export default Kategori;