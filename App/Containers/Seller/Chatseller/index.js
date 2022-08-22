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
import { svr } from "../../../Configs/apikey";

const Chatseller = (props) => {
  const [src, setSrc] = useState(null);

  const [chat, setChat] = useState([])
  const [isiChat, setIsiChat] = useState('');
  const scrollViewRef = useRef();


  const [state, setState] = useState({
    uid: '',
    listChat: '',
    mb_id: '',
    chat_text: '',
    prd_id: '',
    sender_id: '',
    sender: '',
    isi_text: '',
    rtl_id:''
  });

  useEffect(() => {

    // AsyncStorage.getItem('member').then(response => {
    //   //console.log('Profilseller=======>'+ JSON.stringify(responponse));

    //   let data = JSON.parse(response);
    //   //const val = JSON.stringify(data);

    //   console.log('Homeseller ==> ',(data));

    //   setState(state => ({
    //     ...state,
    //     id: data.mb_id,
    //     mb_name: data.value.mb_name,
    //     mb_email: data.value.mb_email,
    //     mb_phone: data.value.mb_phone,
    //     mb_type: data.value.mb_type,
    //     picture: data.value.picture,
    //     retail_id: data.retail_id,
    //   }))
    //    console.log('RTL ID '+ JSON.stringify(state.retail_id));

    // }).catch(err => {
    //   console.log('err', err)
    // })


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
      let idc = JSON.parse(chatid);
      setState(state => ({
        ...state,
        chat_id: idc
      }))
      console.log('chatid = ', state.chat_id);
    });


    //chat

    AsyncStorage.getItem('chat').then(chat => {
      let chattxt = JSON.parse(chat);
      setState(state => ({
        ...state,
        chat_text: chattxt,
        sender: chattxt,
        sender_id: chattxt,

      }))
    });

    AsyncStorage.getItem('senderid').then(send => {
      let pengirim = JSON.parse(send);
      setState(state => ({
        ...state,
        sender_id: pengirim
      }))
      console.log('sender id = ', state.sender_id);
    });

        
    AsyncStorage.getItem('rtlid').then(rtlid => {
      let rtl = rtlid;
      setState(state => ({
        ...state,
        rtl_id: rtl
      }))
      console.log('cek rtl id = ', state.rtl_id)
    }).catch(err => {
      console.log('err', err)
    })


    getChat()

    setInterval(() => {
      getChat()
    }, 1000);
  }, [])

  const getChat = () => {
    let chat_id = props.navigation.state.params.id;
    // https://market.pondok-huda.com/publish/react/chat/content/CH00003/Q4Z96LIFSXUJBK9U6ZACCB2CJDQAR0XH4R6O6ARVG
    axios.get(svr.url + 'chat/content/' + chat_id + '/' + svr.api)
      .then(result => {
        console.log('cek chat isi = ' + JSON.stringify(result));
        setChat(result.data.data)
      })
      .catch(err => {
        ToastAndroid.show(err.message, ToastAndroid.SHORT)
      })
  }


  const sendChat = () => {
    if (isiChat.trim().length === 0) {
      ToastAndroid.show("Tidak dapat mengirimkan pesan kosong.", ToastAndroid.SHORT)
    } else {
      const body = {
        "pengirim_id": state.sender_id,
        "penerima": state.rtl_id,
        "pesan": isiChat,
        "current_uid": state.uid
      };
      console.log('cek body = ' ,(state.sender_id));

      // https://market.pondok-huda.com/publish/react/chat/Q4Z96LIFSXUJBK9U6ZACCB2CJDQAR0XH4R6O6ARVG
      axios.post(svr.url + 'chat/' + svr.api, body)
        .then(result => {
          setIsiChat('')
          console.log('Hasil =', result.data)
        })
        .catch(err => {
          console.log(err)
          ToastAndroid.show("Terjadi masalah saat mengirimkan pesan, Silahkan coba lagi!", ToastAndroid.SHORT)
        })
      }
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

            {chat.map((data, index) => {
              return (
                <View style={[styles.cardchat, { backgroundColor: data.stat == 'open' ? 'white' : 'grey', right: data.stat == 'open' ? '0%' : '-30%' }]}>
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

        <View style={{ backgroundColor: '#f8f9f9', marginTop: toDp(0), flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={styles.content}>
            <TextInput
              style={[styles.textInput]}
              placeholder={'Tulis pesan'}
              placeholderTextColor={'#000'}
              value={isiChat}
              multiline={true}
              onChangeText={(value) => setIsiChat(value)}
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
      backgroundColor: '#F8f9f9',

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
      height: toDp(48),
      color: 'grey',
      backgroundColor: '#f8f9f9',
      paddingHorizontal: toDp(8),
      borderRadius: toDp(10),
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
      height: toDp(48),
      marginRight: toDp(10),
      borderRadius: toDp(10),
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

  export default Chatseller;