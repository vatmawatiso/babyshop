import React, { Picker, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Button,
  Modal,
  StatusBar,
  Pressable,
  ScrollView
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import  Header  from '@Header'
import Carousel, { Pagination } from "react-native-snap-carousel";
import LinearGradient from 'react-native-linear-gradient'
import { TextInput } from "react-native-gesture-handler";

const { width, height } = Dimensions.get('window')

const Produk = (props) => {

    const [state, setState] = useState({
        arrayFriends: [
          {
            value:{
            picture: 'https://sc04.alicdn.com/kf/Hecf7550c5eda410e83757893019d57a7Z.jpg',
            name: 'TB Abadi jaya',
            harga: 'Rp 500.000',
            rating: '5.8',
            terjual: '27'}
          }, {
            value:{
            picture: 'https://sc04.alicdn.com/kf/Hfa2817ad10804b7dbb847a43def8a3ce9.jpg',
            name: 'TB Tembang Pantura',
            harga: 'Rp 500.000',
            rating: '5.8',
            terjual: '27'}
          }, {
            value:{
            picture: 'https://sc04.alicdn.com/kf/H6d5cf1f618734ee9a04dbd57383ad546l.jpg',
            name: 'TB Maju Jaya',
            harga: 'Rp 500.000',
            rating: '5.8',
            terjual: '27'}
          }, {
            value:{
            picture: 'https://sc04.alicdn.com/kf/H054ec1fc8ba04bc9add21665e8f5ab92a.jpg',
            name: 'TB Sumber Jaya',
            harga: 'Rp 500.000',
            rating: '5.8',
            terjual: '27'}
          }, {
            value:{
            picture: 'https://sc04.alicdn.com/kf/Hf4bf3ce3f6c244c7822a5f633ba080feB.jpg',
            name: 'TB Sumber Kasih FM',
            harga: 'Rp 500.000',
            rating: '5.8',
            terjual: '27'}
          }
        ],
        arrayUsers: [],
        arrayData:[],
        loading: false
      })

      const DATA = [
        {
          id: '1',
          name: 'TB Sumber Kasih FM',
          harga: 'Rp 500.000 - 700.000',
          rating: '5.8',
          terjual: '27',
          stok: '5',
          warna: 'Hijau, Merah, Kuning, Biru',
          beban: '100kg',
          kapasitas: '4CBF',
          dikirimdari: 'Indonesia Kota bandung'
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
         
          </View>
        )
      }

return (
  <View style={styles.container}>
    <Header
      title={'Produk'}
      onPress={() => props.navigation.goBack()}
    />
        <View style={{width:'100%', height: toDp(230), bottom:toDp(50), backgroundColor: 'white'}}>
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
            {RenderItem(DATA,0)}
        </View>
  </View>
)};

const RenderItem = (item, index) => {
  return (

    <View style={styles.detailProduk}>
        <View>
            <Text style={{marginBottom:10}}>{item[index].name}</Text>
            <Text style={{marginBottom:5}}>{item[index].harga}</Text>
            <Text>{item[index].rating}      {item[index].terjual} Terjual</Text>
        </View>

          <Text style={{fontWeight:'bold', top:toDp(10)}}>Rincian Produk</Text>
          <View style={{top:toDp(20)}}>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text>Stok</Text>
                <Text style={{left:toDp(100)}}>{item[index].stok}</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text>Beban Kapasitas</Text>
                <Text style={{left:toDp(100)}}>{item[index].beban}</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text>Warna</Text>
                <Text>{item[index].warna}</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text>Kapasitas</Text>
                <Text>{item[index].kapasitas}</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text>Dikirim Dari </Text>
                <Text>{item[index].dikirimdari}</Text>
            </View>
          </View>
        
    </View>

  )

};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'white',
    alignItems: 'center',
    top: toDp(50),
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
  touchSilangExplore: {
    padding: toDp(4),
    position: 'absolute',
    right: toDp(16),
    top: toDp(16),
  },
  detailProduk: {
    bottom:toDp(50),
    right:toDp(50),
    
  }
});

export default Produk;
