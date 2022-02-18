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
import  BackDetailKate  from '@BackDetailKate'
import Carousel, { Pagination } from "react-native-snap-carousel";
import LinearGradient from 'react-native-linear-gradient'
import NavigatorService from '@NavigatorService'
import { TextInput } from "react-native-gesture-handler";
import { BottomNavigation } from "react-native-paper";

const { width, height } = Dimensions.get('window')

const Kategori = (props) => {
  const [src, setSrc]=useState(null);

  return (
    <View style={styles.container}>

        <BackDetailKate
          title={'Produk Saya'}
          onPress={() => props.navigation.goBack()}
        />

    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    top:toDp(50)
  },
});

export default Kategori;