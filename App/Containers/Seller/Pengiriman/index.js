import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  ImageBackground,
  Pressable,
  Dimensions,
  ScrollView,
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';

import NavigatorService from '@NavigatorService'
import Order from '@Order'

import Sudahdibayar from './Sudahdibayar'
import Diproses from './Diproses'
import Sedangdikirim from './Sedangdikirim'
import Diterima from "./Diterima";
import Sudahdibatalkan from './Sudahdibatalkan'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Pengiriman = (props) => {

  const [con, setCon] = useState(props.navigation.state.params.content);
  const [retail_id, setRetail] = useState(props.navigation.state.params.retail_id);

  return (
    <View style={styles.container}>
      <Order
        title={'Pesanan Saya'}
        onPress={() => props.navigation.goBack()}
      />
      <View style={{ alignItems: 'center'}}>
        <ScrollView horizontal={true} >
          <View style={{ top: toDp(20) }}>
            <View style={styles.body}>
              <Pressable style={[styles.presable]} onPress={() => setCon('Dikemas')}>
                <Text style={[styles.txtOrder, { color: con === 'Dikemas' ? '#6495ED' : 'black' }]}>Terima Pesanan</Text>
              </Pressable>
              <Pressable style={[styles.presable]} onPress={() => setCon('Diproses')}>
                <Text style={[styles.txtOrder, { color: con === 'Diproses' ? '#6495ED' : 'black', left: toDp(2) }]}>Diproses</Text>
              </Pressable>
              <Pressable style={[styles.presable]} onPress={() => setCon('Dikirim')}>
                <Text style={[styles.txtOrder, { color: con === 'Dikirim' ? '#6495ED' : 'black', left: toDp(5) }]}>Dikirim</Text>
              </Pressable>
              <Pressable style={[styles.presable]} onPress={() => setCon('Selesai')}>
                <Text style={[styles.txtOrder, { color: con === 'Selesai' ? '#6495ED' : 'black', left: toDp(6) }]}>Diterima</Text>
              </Pressable>
              <Pressable style={[styles.presable]} onPress={() => setCon('Dibatalkan')}>
                <Text style={[styles.txtOrder, { color: con === 'Dibatalkan' ? '#6495ED' : 'black', left: toDp(7) }]}>Dibatalkan</Text>
              </Pressable>
            </View>
            <View style={{ alignItems: 'center' }}>
              <View style={{ borderWidth: toDp(0.5), width: toDp(380), borderColor: 'grey', bottom: toDp(8), alignItems: 'center', justifyContent: 'center' }} />
            </View>
          </View>
        </ScrollView>
        {/*Bagian Update*/}
        <View style={styles.content}>
          {
            con == 'Dikemas' ?
              <Sudahdibayar retail_id={retail_id} con={con} />
              : con == 'Diproses' ?
                <Diproses retail_id={retail_id} con={con} />
                : con == 'Dikirim' ?
                  <Sedangdikirim retail_id={retail_id} con={con} />
                  : con == 'Selesai' ?
                    <Diterima retail_id={retail_id} con={con} />
                    :
                    <Sudahdibatalkan retail_id={retail_id} con={con} />
          }
        </View>
      </View>

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
    marginHorizontal:toDp(10)
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
