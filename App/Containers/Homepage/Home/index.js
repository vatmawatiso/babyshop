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
  Pressable
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import Carousel, { Pagination } from "react-native-snap-carousel";
import LinearGradient from 'react-native-linear-gradient'

const { width, height } = Dimensions.get('window')
const Home = (props) => {

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
    loading: false
  })

  const renderItemExpore = (item,index) => {
    console.log('item', item);
    return (
      <View style={styles.viewRenderExplore}>
        <View style={styles.viewImage}>
          <LinearGradient colors={['#3A3A3A33', 'transparent']} style={styles.gradientTop} />
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

            <Text style={styles.judul}>    Toko{'\n'}Bangunan</Text>
            <Text style={styles.judul1}>   Jasa{'\n'} Tukang</Text>
            <Text style={styles.judul2}>   Konsultan{'\n'}      Arsitek</Text>
            <Text style={styles.judul3}>    Transaksi{'\n'}     Properti</Text>
            <Text style={styles.judul4}>    Alat{'\n'}  Bahan</Text>

            <View style={styles.product}>
              <Text style={styles.teks}>sjgsagdaksj</Text>
            </View>
            <View style={styles.product1}>
              <Text style={styles.teks}>sjgsagdaksj</Text>
            </View>

        </View>

  

      </View>
    )
  }

  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'} />
        <View style={styles.content}>
            <Pressable style={styles.presable}>
                <Image source={allLogo.ichouse} style={styles.icon} />
            </Pressable>
            <Pressable style={styles.presable}>
                <Image source={allLogo.icworkers} style={styles.icon} />
            </Pressable>
            <Pressable style={styles.presable}>
                <Image source={allLogo.icbuilder} style={styles.icon} />
            </Pressable>
            <Pressable style={styles.presable}>
                <Image source={allLogo.icbrokerage} style={styles.icon} />
            </Pressable>
            <Pressable style={styles.presable}>
                <Image source={allLogo.ichomerenovation} style={styles.icon} />
            </Pressable>
        </View>
        <Carousel
            layout={"default"}
            data={state.arrayFriends}
            sliderWidth={width}
            itemWidth={toDp(350)}
            renderItem={(item, index) => renderItemExpore(item, index)}
            onSnapToItem = { index => setState(state => ({...state, activeIndex: index})) }
        />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  product: {
    backgroundColor: '#C4C4C4',
    top: toDp(180),
    width: toDp(151),
    height: toDp(221),
    left: toDp(8),
    borderRadius: toDp(15),
  },
  product1: {
    backgroundColor: '#C4C4C4',
    top: toDp(-41),
    width: toDp(151),
    height: toDp(221),
    left: toDp(175),
    borderRadius: toDp(15),
  },
  judul: {
    top: toDp(250),
    left: toDp(7),
    fontSize: toDp(8)
  },
  judul1: {
    top: toDp(230),
    left: toDp(80),
    fontSize: toDp(8)
  },
  judul2: {
    top: toDp(210),
    left: toDp(141),
    fontSize: toDp(8)
  },
  judul3: {
    top: toDp(190),
    left: toDp(210),
    fontSize: toDp(8)
  },
  judul4: {
    top: toDp(170),
    left: toDp(289),
    fontSize: toDp(8)
  },
  viewHeader: {
    width: '90%',
    height: toDp(140),
    marginTop: toDp(16),
    backgroundColor: '#52B788',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    flexDirection: 'row',
    borderRadius: toDp(8),
    justifyContent: 'center',
    //alignItems: 'center'
  },
  viewPhotoName: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgProfile: {
    width: toDp(80),
    height: toDp(80),
    borderRadius: toDp(40)
  },
  textName: {
    marginTop: toDp(4),
    color: 'white',
    fontWeight: 'bold',
    fontSize: toDp(14)
  },
  viewValueScore: {
    width: toDp(82),
    height: toDp(42),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CBDFBD',
    borderRadius: toDp(25),
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: toDp(8)
  },
  viewScore: {
    marginTop: toDp(16),
    alignItems: 'center'
  },
  viewRenderExplore: {
    width: '100%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: toDp(16),
    marginTop: toDp(16),
    padding: toDp(10),
    top: toDp(10)
  },
  viewImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  viewImageContent: {
    width: '100%',
    height: '100%',
    zIndex: 2
  },
  imageProfile: {
    width: toDp(330),
    height: '100%',
    borderRadius: toDp(16),
    position: 'absolute',
    resizeMode: 'contain'
  },
  gradientTop: {
    width: '100%',
    height: toDp(141),
    borderTopLeftRadius: toDp(16),
    borderTopRightRadius: toDp(16),
    zIndex: 1,
  },
  gradientBottom: {
    width: '100%',
    height: toDp(141),
    borderBottomLeftRadius: toDp(16),
    borderBottomRightRadius: toDp(16),
    position: 'absolute',
    bottom: 0
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
    height: toDp(0),
    bottom: toDp(10),
    top: toDp(270),
    flexDirection: 'row',
  },
  presable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: toDp(25), 
  },
  icon: {
    width: toDp(48),
    height: toDp(36),
    resizeMode: 'contain'
  }
});

export default Home;