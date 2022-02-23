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

  return (
    <View style={styles.container}>
       <Header
          title={'Wishlist'}
          onPress={() => props.navigation.goBack()}
        />
      
        
    </View>
  )
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top:toDp(50)
  },
});

export default Wishlist;
