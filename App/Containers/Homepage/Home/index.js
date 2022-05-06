import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Pressable,
  FlatList, ScrollView
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import NavigatorService from '@NavigatorService'
import Carousel, { Pagination } from "react-native-snap-carousel";
import LinearGradient from 'react-native-linear-gradient'


const { width, height } = Dimensions.get('window')

const Home = (props) => {
  const [src, setSrc]=useState(null);

  const [state, setState] = useState({
    arrayFriends: [
      {
        value:{
        picture: 'https://grahadalungresidence.com/wp-content/uploads/2021/03/Ilustrasi-Jenis-Bahan-Bangunan.jpg',
        name: 'TB Abadi jaya',
        message: 'Kab. Cirebon Plered',
        distance: 'Buka dari jam 09:40 AM'}
      }, {
        value:{
        picture: 'https://padiumkm.id/public/products/24890/218087/bahan-bangunan-.1621300654.jpg',
        name: 'TB Tembang Pantura',
        message: 'Kab. Cirebon Plered',
        distance: 'Buka dari jam 09:40 AM'}
      }, {
        value:{
        picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0s5-Ql6tMckd0pFrjpFpKjucwTfrzQIHu9-J0sA23JjhHhTFrRQnSWuXEWWZJRaJfAFI&usqp=CAU',
        name: 'TB Maju Jaya',
        message: 'Kab. Cirebon Plered',
        distance: 'Buka dari jam 09:40 AM'}
      }, {
        value:{
        picture: 'https://i2.wp.com/dekoruma.blog/wp-content/uploads/2018/06/arsitag-d.jpg?resize=750%2C459&ssl=1',
        name: 'TB Sumber Jaya',
        message: 'Kab. Cirebon Plered',
        distance: 'Buka dari jam 09:40 AM'}
      }, {
        value:{
        picture: 'https://padiumkm.id/public/products/24890/218087/bahan-bangunan-.1621300654.jpg',
        name: 'TB Sumber Kasih FM',
        message: 'Kab. Cirebon Plered',
        distance: 'Buka dari jam 09:40 AM'}
      }
    ],
    arrayUsers: [],
    arrayData:[],
    loading: false
  })

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
      title: 'Gerobak',
      harga: 'Rp. 500.000',
      dariKota: 'Kab. Cirebon',
      bintang : '4',
      terjual: '| Terjual 50',
      image: 'https://sc04.alicdn.com/kf/Hecf7550c5eda410e83757893019d57a7Z.jpg'
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

  const renderItemExpore = (item, index) => {
    //console.log('item', item);
    return (
      <View style={styles.viewRenderExplore}>
        <View style={styles.viewImage}>
          <LinearGradient colors={['#C4C4C4', 'transparent']} style={styles.gradientTop} />
          <Image source={{uri: item.item.value.picture}} style={styles.imageProfile} />
          <LinearGradient colors={['transparent', '#3A3A3ACC']} style={styles.gradientBottom} />
        </View>
        <View style={styles.viewImageContent}>
          <TouchableOpacity style={styles.touchSilangExplore} onPress={() => alert('In Progress')}>
            <Image source={allLogo.icResidentSilang} style={styles.icResidentSilang} />
          </TouchableOpacity>
          <View style={styles.viewDetail}>
            <Text style={styles.textNameExplore}>{item.item.value.name}</Text>
            <Text style={styles.textWork}>{item.item.value.message}</Text>
            <Text style={styles.textDistance}>{item.item.value.distance}</Text>
          </View>
        </View>
      </View>
    )
  }

  const RenderItem = (item, index) => (
    // <Pressable onPress={()=> alert('Produk : '+index)}>
      <View style={styles.card}>
      <Pressable style={{backgroundColor:'red'}} onPress={() => NavigatorService.navigate('Produk')}>
          <View style={styles.txtProduct}>
             <Image source={{uri: item.image}} style={styles.imgProduct} />
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={styles.textproduct}>{item.title}</Text>
                <Image source={allLogo.icwishlist} style={{width:toDp(25), height:toDp(25)}} />
              </View>
             <Text style={styles.harga}>{item.harga}</Text>
             <Image source={allLogo.icaddress} style={styles.address} />
             <Text style={styles.dariKota}>{item.dariKota}</Text>
             <Image source={allLogo.icstar} style={styles.star} />
             <Text style={styles.bintang}>{item.bintang}</Text>
             <Text style={styles.terjual}>{item.terjual}</Text>
          </ View>
          </Pressable>
      </ View>
  );

  const CardProduct = () =>{
      return(
        <FlatList style={{backgroundColor:'white', minHeight:toDp(400), width:width, marginTop:toDp(-10),}}
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
      <ScrollView style={styles.ScrollView}>
        <View style={{width:'100%', height: toDp(230),marginTop: toDp(-5), backgroundColor: 'white'}}>
          <Carousel
            layout={"default"}
            data={state.arrayFriends}
            sliderWidth={width}
            itemWidth={toDp(350)}
            renderItem={(item, index) => renderItemExpore(item, index)}
            onSnapToItem = { index => setState(state => ({...state, activeIndex: index})) }
          />
        </View>

        <View style={styles.content}>
            <Pressable style={styles.presable} onPress={() => NavigatorService.navigate('Tokobangunan')}>
                <Image source={allLogo.ichouse} style={styles.icon} />
                <Text style={styles.textIcon, {textAlign: 'center', fontSize:toDp(12)}}>Toko{'\n'}Bangunan</Text>
            </Pressable>
            <Pressable style={styles.presable} onPress={() => NavigatorService.navigate('Jasatukang')}>
                <Image source={allLogo.icworkers} style={styles.icon} />
                <Text style={styles.textIcon, {textAlign: 'center', fontSize:toDp(12)}}>Jasa{'\n'}Tukang</Text>
            </Pressable>
            <Pressable style={styles.presable} onPress={() => NavigatorService.navigate('Konsultan')}>
                <Image source={allLogo.icbuilder} style={styles.icon} />
                <Text style={styles.textIcon, {textAlign: 'center', fontSize:toDp(12)}}>Konsultan{'\n'}Arsitek</Text>
            </Pressable>
            <Pressable style={styles.presable} onPress={() => NavigatorService.navigate('Donasi')}>
                <Image source={allLogo.icdonation} style={styles.icon} />
                <Text style={styles.textIcon, {textAlign: 'center', fontSize:toDp(12)}}>Donasi{'\n'}Bangunan</Text>
            </Pressable>
            <Pressable style={styles.presable} onPress={() => NavigatorService.navigate('Alatbahan')}>
                <Image source={allLogo.ichomerenovation} style={styles.icon} />
                <Text style={styles.textIcon, {textAlign: 'center', fontSize:toDp(12)}}>Alat dan{'\n'}Bahan</Text>
            </Pressable>
        </View>



        <CardProduct/>

        </ScrollView>



    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    // bottom:toDp(140)
  },
  textIcon: {
    fontSize:toDp(10)
  },
  card: {
    backgroundColor: 'white',
    padding: toDp(25),
    marginVertical: toDp(5),
    marginHorizontal: toDp(16),
    borderRadius:toDp(10),
    height: toDp(251),
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
    bottom: toDp(10),
    left: toDp(15)
  },
  textproduct: {
    fontWeight: 'bold',
    fontSize: toDp(12)
  },
  txtProduct:{
    width:'100%',
    backgroundColor:'white'
  },
  imgProduct:{
    width: toDp(100),
    height:toDp(100)
  },
  imgProfile: {
    width: toDp(80),
    height: toDp(80),
    borderRadius: toDp(40),
  },
  viewRenderExplore: {
    backgroundColor:'white',
    width: '100%',
    height: toDp(200),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: toDp(16),
    marginTop: toDp(0),
    padding: toDp(10),
    top: toDp(10)
  },
  viewImage: {
    width: '100%',
    height: toDp(200),
    resizeMode: 'contain',
    position:'absolute',
  },
  viewImageContent: {
    width: '100%',
    height: toDp(200),
    zIndex: 2
  },
  imageProfile: {
    width: '100%',
    height: '100%',
    borderRadius: toDp(16),
    position: 'absolute',
    resizeMode: 'contain',
    justifyContent:'center',
    alignItems:'center',
  },
  gradientTop: {
    width: '100%',
    height: toDp(130),
    top: toDp(0),
    borderTopLeftRadius: toDp(16),
    borderTopRightRadius: toDp(16),
    zIndex: 1,
  },
  gradientBottom: {
    width: '100%',
    height: toDp(130),
    borderBottomLeftRadius: toDp(16),
    borderBottomRightRadius: toDp(16),
    position: 'absolute',
    bottom: toDp(0),
  },
  icResidentSilang: {
    width: toDp(28),
    height: toDp(28),
  },
  touchSilangExplore: {
    padding: toDp(4),
    position: 'absolute',
    right: toDp(16),
    top: toDp(16),
  },
  viewDetail: {
    position: 'absolute',
    bottom: toDp(16),
    left: toDp(16),
    zIndex: 2
  },
  textNameExplore: {
    fontSize: toDp(24),
    color: '#FFFFFF',
  },
  textWork: {
    marginTop: toDp(4),
    fontSize: toDp(14),
    color: '#FFFFFF',
  },
  textDistance: {
    marginTop: toDp(4),
    fontSize: toDp(14),
    color: '#FFFFFF',
  },
  content: {
    width: toDp(350),
    height: toDp(70),
    bottom: toDp(10),
    top: toDp(-10),
    flexDirection: 'row',
    left:toDp(5),
    backgroundColor: 'white'
  },
  presable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: toDp(8),
    marginHorizontal:toDp(5),
  },
  icon: {
    width: toDp(48),
    height: toDp(36),
    resizeMode: 'contain'
  }
});

export default Home;
