import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  ImageBackground,
  Pressable,
  AsyncStorage,
  ScrollView,
  FlatList,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import NavigatorService from '@NavigatorService'
import LinearGradient from 'react-native-linear-gradient'
import Carousel, { Pagination } from "react-native-snap-carousel";
import Header from "@Header"

const { width, height } = Dimensions.get('window')

const DaftarChat = (props) => {

  useEffect(() => {
    AsyncStorage.getItem('uid').then(uids => {
      let ids = uids;
      setState(state => ({
        ...state,
        uid: ids
      }))
    });
  }, [])

  const DATA = [
    {
      image: 'https://images.unsplash.com/photo-1585728748176-455ac5eed962?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aGlqYWJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      name: 'Anggita Shandy',
      message: 'Lorem Ipsum is simply dummy...',
      time: '07.45 PM',
      jml: '1'
    },
    {
      image: 'https://images.unsplash.com/photo-1585728748176-455ac5eed962?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aGlqYWJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      name: 'Anggita Shandy',
      message: 'Lorem Ipsum is simply dummy...',
      time: '07.45 PM',
      jml: '1'
    },
    {
      image: 'https://images.unsplash.com/photo-1585728748176-455ac5eed962?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aGlqYWJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      name: 'Anggita Shandy',
      message: 'Lorem Ipsum is simply dummy...',
      time: '07.45 PM',
      jml: '1'
    },
    {
      image: 'https://images.unsplash.com/photo-1585728748176-455ac5eed962?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aGlqYWJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      name: 'Anggita Shandy',
      message: 'Lorem Ipsum is simply dummy...',
      time: '07.45 PM',
      jml: '1'
    },
    {
      image: 'https://images.unsplash.com/photo-1585728748176-455ac5eed962?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aGlqYWJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      name: 'Anggita Shandy',
      message: 'Lorem Ipsum is simply dummy...',
      time: '07.45 PM',
      jml: '1'
    },
    {
      image: 'https://images.unsplash.com/photo-1585728748176-455ac5eed962?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aGlqYWJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      name: 'Anggita Shandy',
      message: 'Lorem Ipsum is simply dummy...',
      time: '07.45 PM',
      jml: '1'
    },
    {
      image: 'https://images.unsplash.com/photo-1585728748176-455ac5eed962?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aGlqYWJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      name: 'Anggita Shandy',
      message: 'Lorem Ipsum is simply dummy...',
      time: '07.45 PM',
      jml: '1'
    },
    {
      image: 'https://images.unsplash.com/photo-1585728748176-455ac5eed962?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aGlqYWJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      name: 'Michael Dude',
      message: 'Lorem Ipsum is simply dummy...',
      time: '07.45 PM',
      jml: '1'
    },
  ]

  const RenderItem = (item, index) => (
    <Pressable onPress={() => NavigatorService.navigate('Chat')}>
      <View style={styles.product}>
        <Image source={{ uri: item.image }} style={styles.imgProduk} />
        <View style={styles.textproduct}>
          <Text style={styles.text}>{item.name}</Text>
          <Text style={styles.txt}>{item.message}</Text>
        </View>
        <View style={styles.next}>
          <Text style={styles.time}>{item.time}</Text>
          <View style={styles.num}><Text style={styles.number}>{item.jml}</Text></View>
        </View>
      </View>

    </Pressable>
  );

  const Chats = () => {
    return (
      <FlatList style={{ backgroundColor: 'white', minHeight: toDp(100), width: width }}
        showsVerticalScrollIndicator={false}


        numColumns={1}
        data={DATA}
        renderItem={({ item, index }) => {
          return (
            RenderItem(item, index)
          )
        }}
        ListFooterComponent={() => <View style={{ height: toDp(100) }} />}
      />
    )
  }
  return (

    <View style={styles.container}>
      <Header
        title={'Chat'}
        onPress={() => props.navigation.goBack()}
      />

      <View style={styles.menus}>
        <Text style={styles.all}>Semua Pesan</Text>
        <ScrollView style={styles.ScrollView}>
          <Chats />
        </ScrollView>

      </View>
    </View>

  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  menus: {
    marginLeft: toDp(20),
    marginTop: toDp(-70)
  },
  all: {
    marginTop: toDp(90),
    fontWeight: 'bold',
    fontSize: toDp(14)
  },
  textup: {
    marginLeft: toDp(-10),
    fontSize: toDp(22),
    fontFamily: 'Poppins-Regular',
    marginTop: toDp(-10)
  },
  imgProduk: {
    position: 'absolute',
    zIndex: 1,
    marginTop: toDp(5),
    alignItems: 'center',
    justifyContent: 'center',
    width: toDp(50),
    height: toDp(50),
    top: toDp(5),
    left: toDp(5),
    borderRadius: toDp(25)
  },
  product: {
    marginTop: toDp(10),
    backgroundColor: 'white',
    borderRadius: toDp(10),
    width: toDp(320),
    height: toDp(70),
    flexDirection: 'row',

  },
  text: {
    color: '#005100',
    fontWeight: 'normal',
    textAlign: 'left',
    fontSize: toDp(13),
    fontFamily: 'Poppins-Regular',
    marginLeft: toDp(-50),
    bottom: toDp(10)
  },
  txt: {
    width: toDp(200),
    fontSize: toDp(12),
    fontFamily: 'Poppins-Light',
    fontWeight: 'normal',
    textAlign: 'left',
    marginLeft: toDp(60),
    color: '#959595'
  },
  time: {
    fontSize: toDp(11),
    marginLeft: toDp(-20)
  },
  num: {
    backgroundColor: 'red',
    width: toDp(20),
    height: toDp(20),
    borderRadius: toDp(10),
    marginTop: toDp(5)
  },
  number: {
    textAlign: 'center',
    color: 'white'
  },
  textproduct: {
    justifyContent: 'center',
    alignItems: 'center',
    left: toDp(10),
    top: toDp(5)
  },
  next: {
    marginTop: toDp(15),
    marginLeft: toDp(20)
  }

});

export default DaftarChat;
