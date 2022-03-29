import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  ImageBackground,
  Pressable
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';

import NavigatorService from '@NavigatorService'
import Order from '@Order'

import Belumbayar from './Belumbayar'
import Perludikirim from './Perludikirim'
import Dikirim from './Dikirim'
import Dibatalkan from "./Dibatalkan";
import Selesai from './Selesai'

const Pengiriman = (props) => {

  const [con, setCon] = useState();

  return (
    <View style={styles.container}>
      <Order
        title={'Pesanan Saya'}
        onPress={() => props.navigation.goBack(props.navigation.state.params.content)}
      />
      <View style={styles.content}>
        {
          con == 'Belumbayar' ?
            <Belumbayar />
            : con == 'Perludikirim' ?
              <Perludikirim />
              : con == 'Dikirim' ?
                <Dikirim />
                : con == 'Selesai' ?
                  <Selesai />
                  :
                  <Dibatalkan />
        }
      </View>
      <View style={{ flex: 85 }}>
        <View style={styles.body}>
          <Pressable style={[styles.presable]} onPress={() => setCon('Belumbayar')}>
            <Text style={[styles.txtOrder, { color: con === 'Belumbayar' ? '#6495ED' : 'black' }]}>Belum Bayar</Text>
          </Pressable>
          <Pressable style={[styles.presable]} onPress={() => setCon('Perludikirim')}>
            <Text style={[styles.txtOrder, { color: con === 'Perludikirim' ? '#6495ED' : 'black', left:toDp(2) }]}>Perlu Dikirim</Text>
          </Pressable>
          <Pressable style={[styles.presable]} onPress={() => setCon('Dikirim')}>
            <Text style={[styles.txtOrder, { color: con === 'Dikirim' ? '#6495ED' : 'black', left:toDp(5) }]}>Dikirim</Text>
          </Pressable>
          <Pressable style={[styles.presable]} onPress={() => setCon('Selesai')}>
            <Text style={[styles.txtOrder, { color: con === 'Selesai' ? '#6495ED' : 'black', left:toDp(6) }]}>Selesai</Text>
          </Pressable>
          <Pressable style={[styles.presable]} onPress={() => setCon('Dibatalkan')}>
            <Text style={[styles.txtOrder, { color: con === 'Dibatalkan' ? '#6495ED' : 'black', left:toDp(7) }]}>Dibatalkan</Text>
          </Pressable>
        </View>
        <View style={{ alignItems: 'center' }}>
          <View style={{ borderWidth: toDp(0.5), width: toDp(360), borderColor: 'grey', bottom: toDp(8), alignItems: 'center', justifyContent: 'center' }} />
        </View>
      </View>

    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    // top:toDp(50)
  },
  header: {
    width: '100%',
    height: toDp(184),
    backgroundColor: '#52B788',
    borderBottomLeftRadius: toDp(26),
    borderBottomRightRadius: toDp(26),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  content: {
    flex: 1,
    width: '100%'
  },
  body: {
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  presable: {
    flex: 0,
    justifyContent: 'space-between',
    margin: toDp(7),
    height: toDp(19)
  },
  icon: {
    width: toDp(31),
    height: toDp(31),
    resizeMode: 'contain'
  },
  title: {
    fontWeight: '800',
    fontSize: toDp(20),
    color: 'white',
    marginTop: toDp(80),
    marginLeft: toDp(16)
  },
  txtOrder: {
    bottom: 5
  }
});

export default Pengiriman;
