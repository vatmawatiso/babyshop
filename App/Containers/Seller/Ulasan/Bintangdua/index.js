import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ImageBackground,
  Pressable,
  Dimensions,
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import  BackHeader  from '@BackHeader'
import NavigatorService from '@NavigatorService'
import { TextInput } from "react-native-gesture-handler";
import StarRating from 'react-native-star-rating-widget';

const { width, height } = Dimensions.get('window')

const Bintangdua = (props) => {
  const [src, setSrc]=useState(null);

  const Ratingtoko = [
    {
      semua: '1',
      rating: '4.7',
    },
  ]

  const Ratingproduk = [
    {
      id: '1',
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


  return (
    <View style={styles.container}>

        {/* <BackHeader
          title={'Bintang dua'}
          onPress={() => props.navigation.goBack()}
        /> */}

        <View style={styles.bodyUlasan}>
            <View style={{flexDirection:'row', justifyContent:'space-between', margin:toDp(10)}}>
                <Image style={styles.icuser} source={allLogo.icuser} />
                <Text style={styles.txtNama}>Tiefani Permata Sari</Text>
                <Pressable style={{borderColor:'#303565', borderWidth:1, width:toDp(85), height:toDp(35), justifyContent:'center', borderRadius:toDp(10) }} onPress={() => NavigatorService.navigate('Chat')}>
                    <Text style={styles.txtBalas}>Balas</Text>
                </Pressable>
            </View>
            <View>
                <StarRating
                    style={{left:toDp(55), bottom:toDp(15)}}
                    starStyle={{marginLeft:-5}}
                    rating={rating}
                    starSize={toDp(15)}
                    enableHalfStar={false}
                    onChange={setRating}
                />  
                <Image source={{uri: Ratingproduk[0].image}} style={styles.imgProduk} />
                <Text style={styles.txtDeskripsi}>{Ratingproduk[0].deskripsi}</Text>
            </View>
            
        </View>


    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    bottom:toDp(50)
  },
bodyUlasan: {
  backgroundColor:'#E7E7E7',
  width:toDp(335),
  height:toDp(180),
  top:toDp(260),
  borderRadius:toDp(8),
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
  right:toDp(25),
  top:toDp(5)
},
txtBalas: {
  textAlign:'center',
  fontWeight:'bold',
  color:'#2A334B'
},
imgProduk: {
  height: toDp(80),
  width: toDp(80),
  left:toDp(53),
  bottom:toDp(10)
},
txtDeskripsi: {
  left:toDp(53)
}

});

export default Bintangdua;