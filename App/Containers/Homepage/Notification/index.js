import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  StatusBar,
  ImageBackground,
  Pressable
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
  ]

   {
  
    const render = () => (
      <View>
       { DATA.map((item, index) =>(
            <Pressable style={styles.Notification}>
              <Text style={styles.title}>{item.jenis}</Text>
              <Text style={styles.isi}>{item.pesan}</Text>
            </Pressable>
       ))
      }
      </View>
    )
  return (
    <View style={styles.container}>
        <Header
          title={'Notification'}
          onPress={() => props.navigation.goBack()}
        />
      {render()}
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
    top:toDp(50)
  },
  Notification: {
    backgroundColor: '#C4C4C4',
    top: toDp(-35),
    width: toDp(316),
    height: toDp(58),
    margin: toDp(1),
    marginLeft: toDp(22),
    borderRadius: toDp(15)
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
