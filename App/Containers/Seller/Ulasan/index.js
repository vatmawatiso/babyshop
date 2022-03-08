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

import Semua from './Semua'
import Bintanglima from './Bintanglima'
import Bintangempat from './Bintangempat'
import Bintangtiga from './Bintangtiga'
import Bintangdua from './Bintangdua'
import Bintangsatu from './Bintangsatu'

const { width, height } = Dimensions.get('window')

const Ulasan = (props) => {
  const [src, setSrc]=useState(null);
  
    const [con, setCon] = useState();

  const Ratingtoko = [
    {
      semua: '1',
      rating: '4.7',
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

        <BackHeader
          title={'Ulasan'}
          onPress={() => props.navigation.goBack(props.navigation.state.params.content)}
        />

      <View style={styles.content}>
        {
          con == 'Semua' ?
            <Semua />
          :con == 'Bintanglima' ?
            <Bintanglima />
          :con == 'Bintangempat' ?
            <Bintangempat />
          :con == 'Bintangtiga' ?
          <Bintangtiga />
          :con == 'Bintangdua' ?
          <Bintangdua />
          :
          <Bintangsatu />
        }
      </View>

        <View style={styles.bodySaldo}>
            <Text style={styles.txtRatingtoko}>Rating Toko</Text>
            <Text style={styles.txtRating}>{Ratingtoko[0].rating}</Text>
        </View>

        <View style={{flexDirection:'row', marginVertical:toDp(10), top:toDp(40)}}>
            <Pressable style={styles.btnSemua}  onPress={() => setCon('Semua')}>
                <Text style={{bottom:toDp(5), color:'#2A334B', fontSize:toDp(12)}}>Semua</Text>
                <Text style={{ bottom:toDp(5),color:'#2A334B', fontSize:toDp(12), color: con === 'Semua' ? '#6495ED' : 'black'}}>({Ratingsemua[0].rating})</Text>
            </Pressable>
            <Pressable style={styles.btnBintang5}  onPress={() => setCon('Bintanglima')}>
                <Text style={{bottom:toDp(5), color:'#2A334B', fontSize:toDp(12)}}>5 Bintang</Text>
                <Text style={{ bottom:toDp(5),color:'#2A334B', fontSize:toDp(12), color: con === 'Bintanglima' ? '#6495ED' : 'black'}}>({Ratingsemua[1].rating})</Text>
            </Pressable>
            <Pressable style={styles.btnBintang4}  onPress={() => setCon('Bintangempat')}>
                <Text style={{bottom:toDp(5), color:'#2A334B', fontSize:toDp(12)}}>4 Bintang</Text>
                <Text style={{ bottom:toDp(5),color:'#2A334B', fontSize:toDp(12), color: con === 'Bintangempat' ? '#6495ED' : 'black'}}>({Ratingsemua[2].rating})</Text>
            </Pressable>
        </View>

        <View style={{flexDirection:'row', marginVertical:toDp(10), top:toDp(30)}}>
            <Pressable style={styles.btnSemua}  onPress={() => setCon('Bintangtiga')}>
                <Text style={{bottom:toDp(5), color:'#2A334B', fontSize:toDp(12)}}>3 Bintang</Text>
                <Text style={{ bottom:toDp(5),color:'#2A334B', fontSize:toDp(12), color: con === 'Bintangtiga' ? '#6495ED' : 'black'}}>({Ratingsemua[3].rating})</Text>
            </Pressable>
            <Pressable style={styles.btnBintang5}  onPress={() => setCon('Bintangdua')}>
                <Text style={{bottom:toDp(5), color:'#2A334B', fontSize:toDp(12)}}>2 Bintang</Text>
                <Text style={{ bottom:toDp(5),color:'#2A334B', fontSize:toDp(12), color: con === 'Bintangdua' ? '#6495ED' : 'black'}}>({Ratingsemua[4].rating})</Text>
            </Pressable>
            <Pressable style={styles.btnBintang4}  onPress={() => setCon('Bintangsatu')}>
                <Text style={{bottom:toDp(5), color:'#2A334B', fontSize:toDp(12)}}>1 Bintang</Text>
                <Text style={{ bottom:toDp(5),color:'#2A334B', fontSize:toDp(12), color: con === 'Bintangsatu' ? '#6495ED' : 'black'}}>({Ratingsemua[5].rating})</Text>
            </Pressable>
        </View>


    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  content: {
    flex: 1,
    width: '100%'
  },
  bodySaldo: {
    backgroundColor:'#2A334B',
    width:toDp(335),
    height:toDp(100),
    top:toDp(10),
    borderRadius:toDp(8),
    justifyContent:'center',
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
  txtRatingtoko: {
      fontSize:toDp(15),
      color:'white'
  },
  txtRating: {
      fontSize:toDp(35),
      color:'#0960A1'
  },
  btnSemua: {
      backgroundColor:'#E7E7E7',
      width:toDp(85),
      bottom:toDp(30),
      borderRadius:toDp(8),
      height:toDp(35),
      justifyContent:'flex-end',
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
  btnBintang5: {
    backgroundColor:'#E7E7E7',
    marginHorizontal:toDp(38),
    width:toDp(85),
    bottom:toDp(30),
    borderRadius:toDp(8),
    height:toDp(35),
    justifyContent:'flex-end',
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
btnBintang4: {
  backgroundColor:'#E7E7E7',
  width:toDp(85),
  bottom:toDp(30),
  borderRadius:toDp(8),
  height:toDp(35),
  justifyContent:'flex-end',
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

});

export default Ulasan;