import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ImageBackground,
  Pressable,
  AsyncStorage,
  ToastAndroid,
  ScrollView
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import Header from '@Header'
import { Card } from "react-native-paper";
import NavigatorService from '@NavigatorService'
import { TextInput } from "react-native-gesture-handler";
import axios from "axios";
import { svr } from "../../Configs/apikey";

const Chat = (props) => {
  const [src, setSrc] = useState(null);

  const [chat, setChat] = useState([])
  const [isiChat, setIsiChat] = useState('');
  const scrollViewRef = useRef();

  const data = [
    {
      // id: '1',
      // nama: 'Michael Dude',
      id: props.navigation.state.params.chat_id,
      nama: props.navigation.state.params.sender,
      waktu: '10',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
    },
  ]



  const [state, setState] = useState({
    uid: '',
    listChat: '',
    mb_id: '',
    chat_text: '',
    prd_id: '',
    retail_name:'',
  });

  useEffect(() => {

    // get data user dari async
    AsyncStorage.getItem('member').then(response => {
      let data = JSON.parse(response);
      setState(state => ({
        ...state,
        mb_id: data.value.mb_id,
        mb_name: data.value.mb_name,
        mb_email: data.value.mb_email,
        mb_phone: data.value.mb_phone,
        mb_type: data.value.mb_type,
        picture: data.value.picture,
      }))
      console.log('mb_id ---->' + JSON.stringify(state.mb_id));

    }).catch(err => {
      console.log('err', err)
    })


    AsyncStorage.getItem('uid').then(uids => {
      let ids = uids;
      setState(state => ({
        ...state,
        uid: ids
      }))
      console.log('uid = ', state.uid);
    });

    //chat_id

    AsyncStorage.getItem('chatid').then(chatid => {
      let idc = chatid;
      setState(state => ({
        ...state,
        chat_id: idc
      }))
      console.log('chatid = ', state.chat_id);
    });


    getChat()

    setInterval(() => {
      getChat()
    }, 1000);
  }, [])


  useEffect(() => {
    //getProdukbyId()
    // get id pengguna
    AsyncStorage.getItem('setProduk').then(response => {
      let data = JSON.parse(response);
      // const val = JSON.stringify(data);

      // console.log('Jadikan Produk----------->' + JSON.stringify(data));

      setState(state => ({
        ...state,
        product_name: data.data[0].product_name,
        thumbnail: data.data[0].thumbnail,
        price: data.data[0].price,
        retail_name: data.data[0].retail_name,
        retail: data.data[0].retail,
        prd_id: data.data[0].id,
        berat: data.data[0].berat

      }))

      // console.log('CEK STATE ASYNC STORAGE nama retail ---->' + JSON.stringify(state.retail_name));
      // console.log('nama produk --->' + JSON.stringify(state.product_name));
      // console.log('harga produk ---->' + JSON.stringify(state.price));
      // // console.log('CEK STATE ASYNC STORAGE thumbnail ---->' + JSON.stringify(state.thumbnail));
      // console.log('ID RETAIL ---->' + JSON.stringify(state.retail));
      // console.log('ID PRODUK ---->' + JSON.stringify(state.prd_id));
      // console.log('BERAT PRODUK ---->' + JSON.stringify(state.berat));


    }).catch(err => {
      console.log('err', err)
    })

    // totalPro()
  }, [])

  const getChat = () => {
    let chat_id = props.navigation.state.params.id;
    // https://market.pondok-huda.com/publish/react/chat/content/CH00003/Q4Z96LIFSXUJBK9U6ZACCB2CJDQAR0XH4R6O6ARVG
    axios.get(svr.url + 'chat/content/' + chat_id + '/' + svr.api)
      .then(result => {
        // console.log('cek chat isi = ' + JSON.stringify(result));
        setChat(result.data.data)
      })
      .catch(err => {
        ToastAndroid.show(err.message, ToastAndroid.SHORT)
      })
  }


  const sendChat = () => {
    // if (isiChat.trim().length === 0) {
    //   ToastAndroid.show("Tidak dapat mengirimkan pesan kosong.", ToastAndroid.SHORT)
    // } else {
    //   const sendData = {
    //     mb_id : state.uid,
    //     chat_text : isiChat,
    //     prd_id : 'PRD0001',
    //   };
    const body = {
      mb_id: state.uid,
      chat_text: state.chat_text,
      prd_id: 'PRD0001',
    }
    console.log('cek body = ', body);

    // https://market.pondok-huda.com/publish/react/chat/Q4Z96LIFSXUJBK9U6ZACCB2CJDQAR0XH4R6O6ARVG
    axios.post(svr.url + 'chat/' + svr.api, body)
      .then(result => {
        // setIsiChat('')
        // console.log('cekkk err =', result.data)
        if (result.data.status === 201) {
          alert('Berhasil kirim chat!')
          console.log('CEK Hasil chat ===>' + JSON.stringify(result.data));
          setState(state => ({ ...state, loading: false }))

        } else {
          alert('Gagal kirim chat!')
          setState(state => ({ ...state, loading: false }))

          console.log('CEK ERROR ===>' + JSON.stringify(result.data));
          return false;
        }
      })
      .catch(err => {
        console.log(err)
        ToastAndroid.show("Terjadi masalah saat mengirimkan pesan, Silahkan coba lagi!", ToastAndroid.SHORT)
      })
    // }
  }

  return (
    <View style={styles.container}>

      <Header
        title={'Chat'}
        onPress={() => props.navigation.goBack()}
      />

      <ScrollView ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
        <View style={styles.BodyChat}>

          <View>
            <Text>{state.retail_name}</Text>
          </View>

          {chat.map((data, index) => {
            return (
              <View style={[styles.cardchat, { backgroundColor: data.stat == 'open' ? 'white' : '#7C9B97', right: data.stat == 'open' ? '0%' : '-30%' }]}>
                {/* <View>
                <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 4, color: data.stat == 'open' ? '#787878' : 'white' }}>{data.pesan}</Text>
              </View> */}
                <View style={{ minHeight: toDp(30), }}>
                  <Text style={{ fontSize: 12, color: data.stat == 'open' ? '#787878' : 'white' }}>{data.pesan}</Text>
                </View>
                <View style={{ backgroundColor: 'red', marginBottom: 12 }}>
                  <Text style={{ fontSize: 10, color: data.stat == 'open' ? '#B3B3B3' : 'white', position: 'absolute', right: 0 }}>{data.waktu}</Text>
                </View>
              </View>
            )
          })}


        </View>
      </ScrollView>

      <View style={{ backgroundColor: '#F0F2FF', marginTop: toDp(0), flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={styles.content}>
          <TextInput
            style={[styles.textInput]}
            placeholder={'Tulis pesan'}
            placeholderTextColor={'#000'}
            value={state.chat_text}
            multiline={true}
            onChangeText={(text) => setState(state => ({ ...state, chat_text: text }))}
          />
          <Pressable style={styles.presableShow}>
            <Image source={allLogo.icfolder} style={styles.icfolder} />
          </Pressable>
        </View>
        <Pressable style={styles.btnKirim} onPress={() => sendChat()}>
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
    color: 'grey',
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
    marginRight: toDp(10),
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