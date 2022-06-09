import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ImageBackground,
  Pressable
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import Header from '@Header'
import { Card } from "react-native-paper";
import NavigatorService from '@NavigatorService'
import { TextInput } from "react-native-gesture-handler";

const Chat = (props) => {
  const [src, setSrc] = useState(null);

  const data = [
    {
      id: '1',
      namaTB: 'Jaya Abadi',
    },
  ]

  const CHAT = [
    {
      id: '1',
      psn: 'Hallo',
      nama: 'Rudy',
      jam: '10:30',
      stat: 'open'
    },
    {
      id: '2',
      psn: 'Hallo juga ka, ada yang bisa kami bantu',
      nama: 'Admin-Riki',
      jam: '10:30',
      stat: 'reply'
    },
    {
      id: '3',
      psn: 'Ada ka, sebentar...',
      nama: 'Rudy',
      jam: '10:30',
      stat: 'open'
    },
    {
      id: '4',
      psn: 'Baik kami tunggu',
      nama: 'Admin-Riki',
      jam: '10:30',
      stat: 'reply'
    },
  ]

  const [state, setState] = useState({
    loading: false,
    secureTextEntry: true,
    username: '',
    password: ''
  })

  return (
    <View style={styles.container}>

      <Header
        title={'Chat'}
        onPress={() => props.navigation.goBack()}
      />

      <View style={styles.BodyChat}>

        {CHAT.map((data, index) => {
          return (
            <View style={[styles.cardchat, { backgroundColor: data.stat == 'open' ? 'white' : '#7C9B97', right: data.stat == 'open' ? '0%' : '-30%' }]}>
              <View>
                <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 4, color: data.stat == 'open' ? '#787878' : 'white' }}>{data.nama}</Text>
              </View>
              <View style={{ minHeight: toDp(30), }}>
                <Text style={{ fontSize: 12, color: data.stat == 'open' ? '#787878' : 'white' }}>{data.psn}</Text>
              </View>
              <View style={{ backgroundColor: 'red', marginBottom: 12 }}>
                <Text style={{ fontSize: 10, color: data.stat == 'open' ? '#B3B3B3' : 'white', position: 'absolute', right: 0 }}>{data.jam}</Text>
              </View>
            </View>
          )
        })}


      </View>
      <View style={{ backgroundColor:'#F0F2FF', marginTop: toDp(0), flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={styles.content}>
          <TextInput
            style={[styles.textInput, { marginTop: toDp(0) }]}
            placeholder={'Tulis pesan'}
            value={state.password}
            onChangeText={(text) => setState(state => ({ ...state, password: text }))}
          />
          <Pressable style={styles.presableShow}>
            <Image source={allLogo.icfolder} style={styles.icfolder} />
          </Pressable>
        </View>
        <Pressable style={styles.btnKirim}>
          <Image source={allLogo.icvector} />
        </Pressable>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {

    flex: 1,
  },
  BodyChat: {
    flex: 1,
    top: toDp(0),
    padding: toDp(15),
    backgroundColor: '#F0F2FF',

  },
  cardchat: {
    width: '70%', padding: toDp(8), borderRadius: toDp(8), marginBottom: toDp(15)
  },
  icfolder: {
    marginRight: toDp(10),
    width: toDp(28),
    height: toDp(22),
    tintColor: 'white',
    bottom: toDp(5)
  },
  content: {
    top: toDp(0),
  },
  textInput: {
    width: toDp(270),
    height: toDp(40),
    color: 'white',
    backgroundColor: '#f8f9f9',
    paddingHorizontal: toDp(8),
    borderRadius: toDp(20),
    marginHorizontal: toDp(10),
    bottom: toDp(5),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 3,
  },
  presableShow: {
    padding: toDp(4),
    position: 'absolute',
    // backgroundColor:'cyan',
    bottom: Platform.OS === 'ios' ? toDp(5) : toDp(5),
    left: Platform.OS === 'ios' ? toDp(235) : toDp(235),
  },
  btnKirim: {
    backgroundColor: '#2A334B',
    bottom: toDp(5),
    width: toDp(58),
    height: toDp(40),
    marginRight:toDp(10),
    borderRadius: toDp(20),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 3,
  }
});

export default Chat;