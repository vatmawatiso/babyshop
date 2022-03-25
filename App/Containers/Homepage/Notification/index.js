import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  StatusBar,
  ImageBackground,
  Pressable,
  FlatList
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import  Header  from '@Header'
import { Card } from "react-native-paper";
 
const Notification = (props) => {
 
  const DATA = [
    {
      id: '27361',
      jenis: 'Promo mingguan di TB Abadi Jaya',
      pesan: 'Kamu dapat cashback 50%',
    },
    {
      id: '27362',
      jenis: 'Vochermu akan hangus',
      pesan: 'Hallo Dandi segera gunakan vocher gratis ongkirmu!',
    },
    {
      id: '27363',
      jenis: 'Kamu dapat cashback 50%',
      pesan: 'Ayo belanja dan pakai vocher cashback hinggal 50%',
    },
    {
      id: '27364',
      jenis: 'Kamu dapat cashback 50%',
      pesan: 'Ayo belanja dan pakai vocher cashback hinggal 50%',
    },
    {
      id: '27365',
      jenis: 'Kamu dapat cashback 50%',
      pesan: 'Ayo belanja dan pakai vocher cashback hinggal 50%',
    },
    {
      id: '27366',
      jenis: 'Kamu dapat cashback 50%',
      pesan: 'Ayo belanja dan pakai vocher cashback hinggal 50%',
    },
    {
      id: '27367',
      jenis: 'Kamu dapat cashback 50%',
      pesan: 'Ayo belanja dan pakai vocher cashback hinggal 50%',
    },
    {
      id: '27368',
      jenis: 'Kamu dapat cashback 50%',
      pesan: 'Ayo belanja dan pakai vocher cashback hinggal 50%',
    },
    {
      id: '27369',
      jenis: 'Kamu dapat cashback 50%',
      pesan: 'Ayo belanja dan pakai vocher cashback hinggal 50%',
    },
    {
      id: '27310',
      jenis: 'Kamu dapat cashback 50%',
      pesan: 'Ayo belanja dan pakai vocher cashback hinggal 50%',
    },
    {
      id: '27311',
      jenis: 'Kamu dapat cashback 50%',
      pesan: 'Ayo belanja dan pakai vocher cashback hinggal 50%',
    },
    {
      id: '27312',
      jenis: 'Kamu dapat cashback 50%',
      pesan: 'Ayo belanja dan pakai vocher cashback hinggal 50%',
    },
    {
      id: '27313',
      jenis: 'Kamu dapat cashback 50%',
      pesan: 'Ayo belanja dan pakai vocher cashback hinggal 80%',
    },
  ]
 
   {
 
    const render = (item,index) => (
      <View style={{marginTop:toDp(10), justifyContent:'center', alignItems:'center'}}>
            <Pressable style={styles.Notification}>
              <Text style={styles.title}>{item.jenis}</Text>
              <Text style={styles.isi}>{item.pesan}</Text>
            </Pressable>
      </View>
    )
  return (
    <View style={styles.container}>
        <Header
          title={'Notification'}
          onPress={() => props.navigation.goBack()}
        />
 
        <View style={styles.content}>
              <FlatList style={{width:'100%'}}
                data={DATA}
                renderItem={({item, index}) => {
                  return (
                    render(item, index)
                  )
                }}
                ListFooterComponent={() => <View style={{height: toDp(24)}} />}
              />
        </View>
    </View>
 
  )
};
 
return (
  <View style={styles.header}>
    <Card>
      {RenderItem(DATA,0)}
    </Card>
  </View>
)};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
  },
  content: {
    width: '100%',
    alignItems: 'center',
    justifyContent:'center',
    marginBottom: toDp(45)
  },
  Notification: {
    backgroundColor: '#C4C4C4',
    width: toDp(316),
    height: toDp(58),
    margin: toDp(1),
    borderRadius: toDp(8)
  },
  title: {
    fontSize: toDp(12),
    fontWeight: 'bold',
    left: toDp(10),
    top: toDp(5)
  },
  isi: {
    left: toDp(10),
    top: toDp(4)
  }
});
 
export default Notification;