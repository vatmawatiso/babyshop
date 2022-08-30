import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  ImageBackground,
  Pressable, Dimensions
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';

import NavigatorService from '@NavigatorService'
import Order from '@Order'

import Belumbayar from './Belumbayar'
import Dikemas from './Dikemas'
import Dikirim from './Dikirim'
import Dibatalkan from "./Dibatalkan";
import Selesai from './Selesai'
import { ScrollView } from "react-native-gesture-handler";
import SedangDiproses from "./SedangDiproses";
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Orderpage = (props) => {

  const [con, setCon] = useState(props.navigation.state.params.content);
  const [mb_id, setMb] = useState(props.navigation.state.params.mb_id);

  return (
    <View style={styles.container}>
      <Order
        title={'Pesanan Saya'}
        onPress={() => props.navigation.goBack()}
        onChat={() => NavigatorService.navigate('underConstruction')}
      />

      {/* <ScrollView  horizontal={true} > */}
      <View style={{ alignItems: 'center' }}>
        <ScrollView horizontal={true} >
          <View style={{ top: toDp(20),}}>
            {/*Bagian Update*/}
            <View style={styles.body}>
              <Pressable style={[styles.presable]} onPress={() => setCon('Belum Dibayar')}>
                <Text style={[styles.txtOrder, { color: con === 'Belum Dibayar' ? '#6495ED' : 'black' }]}>Belum Bayar</Text>
              </Pressable>
              <Pressable style={[styles.presable]} onPress={() => setCon('Diproses')}>
                <Text style={[styles.txtOrder, { color: con === 'Diproses' ? '#6495ED' : 'black' }]}>Diproses</Text>
              </Pressable>
              <Pressable style={[styles.presable]} onPress={() => setCon('Dikemas')}>
                <Text style={[styles.txtOrder, { color: con === 'Dikemas' ? '#6495ED' : 'black' }]}>Dikemas</Text>
              </Pressable>
              <Pressable style={[styles.presable]} onPress={() => setCon('Dikirim')}>
                <Text style={[styles.txtOrder, { color: con === 'Dikirim' ? '#6495ED' : 'black' }]}>Dikirim</Text>
              </Pressable>
              <Pressable style={[styles.presable]} onPress={() => setCon('Selesai')}>
                <Text style={[styles.txtOrder, { color: con === 'Selesai' ? '#6495ED' : 'black' }]}>Selesai</Text>
              </Pressable>
              <Pressable style={[styles.presable]} onPress={() => setCon('Dibatalkan')}>
                <Text style={[styles.txtOrder, { color: con === 'Dibatalkan' ? '#6495ED' : 'black' }]}>Dibatalkan</Text>
              </Pressable>
            </View>
            <View style={{ alignItems: 'center' }}>
              <View style={{ borderWidth: toDp(0.5), width: toDp(395), borderColor: 'grey', bottom: toDp(8), alignItems: 'center', justifyContent: 'center', }} />
            </View>
          </View>
        </ScrollView>
        {/*Bagian Update*/}
        <View style={styles.content}>
          {
            con == 'Belum Dibayar' ?
              <Belumbayar mbid={mb_id} con={con} />
             : con == 'Diproses' ?
              <SedangDiproses mbid={mb_id} con={con} />
                : con == 'Dikemas' ?
                  <Dikemas mbid={mb_id} con={con} />
                  : con == 'Dikirim' ?
                    <Dikirim mbid={mb_id} con={con} />
                    : con == 'Selesai' ?
                      <Selesai mbid={mb_id} con={con} />
                      :
                      <Dibatalkan mbid={mb_id} con={con} />
          }
        </View>

      </View>
      {/* </ScrollView> */}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: 'white',
    alignItems: 'center',
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

    width: '100%',
    height: height
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

export default Orderpage;
