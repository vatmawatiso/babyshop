import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  FlatList,
  Pressable,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import BackHeader from '@BackHeader'
import NavigatorService from '@NavigatorService'
import { TextInput } from "react-native-gesture-handler";
import StarRating from 'react-native-star-rating-widget';

const { width, height } = Dimensions.get('window')

const Bintangdua = (props) => {
  const [src, setSrc] = useState(null);

  const Ratingtoko = [
    {
      semua: '1',
      rating: '4.7',
    },
  ]

  const Ratingproduk = [
    {
      id: '1',
      nama: 'Tiefani',
      produk: 'Gerobak Pasir',
      rating: '5',
      deskripsi: 'Gerobak pasir warna hijau',
      image: 'https://www.glistagen.com/988-home_default/gerobak-pasir-gerobak-sorong-double-thunders.jpg'
    },
  ]

  const Ratingsemua = [
    {
      id: '1',
      rating: '15',
    },
    {
      id: '2',
      rating: '5',
    },
    {
      id: '3',
      rating: '5',
    },
    {
      id: '4',
      rating: '3',
    },
    {
      id: '5',
      rating: '1',
    },
    {
      id: '6',
      rating: '1',
    },
  ]

  const [rating, setRating] = useState(0);


  const ListToko = (item, index) => (
    <View style={[styles.body, { marginTop: toDp(5), alignItems: 'center', marginHorizontal: toDp(12) }]}>
      <TouchableOpacity style={{ width: toDp(330) }} onPress={() => NavigatorService.navigate('Profilseller')}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: toDp(10) }}>
          <View style={{ flexDirection: 'row', marginLeft: toDp(10) }}>
            <View>
              <Text>Nama</Text>
              <Text>Produk</Text>
              <Text>Rating</Text>
              <Text>Deskripsi</Text>
              <Text>Foto</Text>
            </View>
            <View>
              <Text> : {item.nama}</Text>
              <Text> : {item.produk}</Text>
              <Text> : {item.rating}</Text>
              <Text> : {item.deskripsi}</Text>
              <Text> : {item.image}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )


  return (
    <View style={styles.container}>

      {/* <BackHeader
          title={'Bintang dua'}
          onPress={() => props.navigation.goBack()}
        /> */}

      <View style={styles.bodyUlasan}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: toDp(10) }}>
          <Image style={styles.icuser} source={allLogo.icuser} />
          <Text style={styles.txtNama}>Tiefani Permata Sari</Text>
          <Pressable style={{ borderColor: '#303565', borderWidth: 1, width: toDp(85), height: toDp(35), justifyContent: 'center', borderRadius: toDp(10) }} onPress={() => NavigatorService.navigate('Chat')}>
            <Text style={styles.txtBalas}>Balas</Text>
          </Pressable>
        </View>
        <View style={styles.flatcontent}>
          <FlatList style={{ width: '100%' }}
            data={Ratingproduk}
            renderItem={({ item, index }) => {
              return (
                ListToko(item, index)
              )
            }}
            ListFooterComponent={() => <View style={{ height: toDp(120) }} />}
          />
        </View>
        <View>
          <StarRating
            style={{ left: toDp(55), bottom: toDp(15) }}
            starStyle={{ marginRight: 5 }}
            rating={rating}
            starSize={toDp(15)}
            enableHalfStar={false}
            onChange={setRating}
          />
          <Image source={{ uri: Ratingproduk[0].image }} style={styles.imgProduk} />
          <Text style={styles.txtDeskripsi}>{Ratingproduk[0].deskripsi}</Text>
        </View>

      </View>


    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    bottom: toDp(50)
  },
  bodyUlasan: {
    backgroundColor: '#f8f9f9',
    width: toDp(335),
    height: toDp(180),
    top: toDp(260),
    borderRadius: toDp(10),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
  txtNama: {
    right: toDp(28),
    top: toDp(5)
  },
  txtBalas: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#2A334B'
  },
  imgProduk: {
    height: toDp(80),
    width: toDp(80),
    right: toDp(153),
    bottom: toDp(10)
  },
  txtDeskripsi: {
    left: toDp(53)
  }

});

export default Bintangdua;