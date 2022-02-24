import React, {  useState, useEffect } from "react";
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
  FlatList
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import  Header  from '@Header'

const { width, height } = Dimensions.get('window')

const Wishlist = () => {

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
                <Pressable style={styles.Wishlist}>
                    <Image source={allLogo.icwishlist} style={styles.icwishlist} />
                </Pressable>
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
      <FlatList style={{ minHeight:400, width:width, bottom:toDp(40)}}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: toDp(3),
            paddingBottom: toDp(0),

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
       <Header
          title={'Wishlist'}
          onPress={() => props.navigation.goBack()}
        />

        <CardProduct/>
      
        
    </View>
  )
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top:toDp(50)
  },
  card: {
    backgroundColor: 'white',
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
    bottom: toDp(25),
    left: toDp(15)
  },
  terjual: {
    bottom: toDp(45),
    left: toDp(28)
  },
  address: {
    bottom:toDp(3)
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
    top:toDp(10)
  },
  txtProduct:{
    width:'100%',
    height:toDp(210),
    backgroundColor:'white',
    marginTop:toDp(-16),
    marginBottom:toDp(50),
  },
  imgProduct:{
    width: toDp(100),
    height:toDp(100)
  },
  Wishlist: {
    // backgroundColor:'cyan',
    width:toDp(28),
    left:toDp(80),
    bottom:toDp(10)
  },
  icwishlist: {
    width:toDp(25),
    height:toDp(25)
  },
  harga: {
    bottom:toDp(10)
  }
});

export default Wishlist;
