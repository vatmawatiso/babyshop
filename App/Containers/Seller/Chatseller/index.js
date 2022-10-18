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
  ScrollView,
  FlatList,
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import Header from '@Header'
import { Card } from "react-native-paper";
import NavigatorService from '@NavigatorService'
import { TextInput } from "react-native-gesture-handler";
import axios from "axios";
import { svr } from "../../../Configs/apikey";
import NumberFormat from "react-number-format";

const Chatseller = (props) => {
  const [src, setSrc] = useState(null);

  const [chat, setChat] = useState([])
  const [isiChat, setIsiChat] = useState('');
  const scrollViewRef = useRef();


  const [state, setState] = useState({
    id: '',
    listChat: '',
    mb_id: '',
    chat_text: '',
    prd_id: '',
    sender_id: '',
    sender: '',
    isi_text: '',
    rtl_id: '',
    produk: [],
    idpr: [],
  });

  useEffect(() => {

    // get id pengguna
    AsyncStorage.getItem('uid').then(uids => {
      let ids = uids;
      setState(state => ({
        ...state,
        id: ids
      }))
      console.log('uid', state.id)
    }).catch(err => {
      console.log('err', err)
    })

    AsyncStorage.getItem('member').then(response => {
      //console.log('Profilseller=======>'+ JSON.stringify(responponse));

      let data = JSON.parse(response);
      //const val = JSON.stringify(data);

      console.log('Homeseller ==> ', (data));

      setState(state => ({
        ...state,
        mb_id: data.mb_id,
        mb_name: data.value.mb_name,
        mb_email: data.value.mb_email,
        mb_phone: data.value.mb_phone,
        mb_type: data.value.mb_type,
        picture: data.value.picture,
        retail_id: data.retail_id,
      }))
      console.log('RTL ID ' + JSON.stringify(state.retail_id));

    }).catch(err => {
      console.log('err', err)
    })

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

  const getProdukChat = (idp, i) => {
    // let idp = props.navigation.state.params.id;
    axios.get(svr.url + 'product/' + idp + '/' + svr.api)
      .then(response => {
        console.log('hasil produk per id', response.data)
        setState(state => ({ ...state, detail: response.data.detail }))
        // update
        let { produk } = state;
        produk[i] = response.data.data[0];
        setState(state => ({
          ...state,
          produk
        }))
      }).catch(error => {
        ToastAndroid.show(error.message, ToastAndroid.SHORT)
        console.log('errorrrrrr', error)
      })
  }


  const getChat = () => {
    let chat_id = props.navigation.state.params.id;
    // https://market.pondok-huda.com/publish/react/chat/content/CH00003/Q4Z96LIFSXUJBK9U6ZACCB2CJDQAR0XH4R6O6ARVG
    axios.get(svr.url + 'chat/content/' + chat_id + '/' + svr.api)
      .then(response => {
        console.log('cek chat isi = ', response);
        const datas = {
          idCht: response.data.data.chat_id,
          value: response.data.data
        }
        if (datas.value.length === 0) {
          alert('chat kosong')
        } else {

          console.log('prd id', response.data.data)
          setChat(response.data.data)


          // update
          const prdid = response.data.data.map((val, i) => {
            console.log('>>>>>', JSON.stringify(val.prd_id));
            if (val.prd_id != '') {
              let { idpr } = state;
              idpr[i] = val.prd_id;
              setState(state => ({
                ...state,
                idpr
              }))
            }
          })
          // update
          state.idpr.map((va, i) => {
            getProdukChat(va, i)
          })
        }
      }).catch(err => {
        ToastAndroid.show(err.message, ToastAndroid.SHORT)
        console.log('errorrrr', err)
      })
  }


  const sendChat = () => {
    let send_id = props.navigation.state.params.sender_id;
    let chat_id = props.navigation.state.params.id;
    if (isiChat.trim().length === 0) {
      ToastAndroid.show("Tidak dapat mengirimkan pesan kosong.", ToastAndroid.SHORT)
    } else {
      const body = {
        "pengirim_id": state.rtl_id,
        "penerima": send_id,
        "pesan": isiChat,
        "current_uid": state.id,
        "prd_id": "",
        "product_name": "",
        "price": "",
        "retailaddres": "",
        "thumbnail": "",
        "from": "chat",
        "chat_id": chat_id
      };
      console.log('cek body sender id = ', (state.id));

      // https://market.pondok-huda.com/publish/react/chat/Q4Z96LIFSXUJBK9U6ZACCB2CJDQAR0XH4R6O6ARVG
      axios.post(svr.url + 'chat/' + chat_id + '/' + svr.api, body)
        .then(result => {
          console.log('Hasil =', result)
          setIsiChat('')
          getChat()

        })
        .catch(err => {
          console.log(err)
          ToastAndroid.show("Terjadi masalah saat mengirimkan pesan, Silahkan coba lagi!", ToastAndroid.SHORT)
        })
    }
  }

  // update 
  const renderProduk = (item) => {
    return (
      <View style={styles.viewProduk}>
        <View style={styles.card}>
          <Pressable onPress={() => alert('hbd yesung')}>
            <View style={styles.txtProduct}>
              <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: toDp(10) }}>
                <Image source={{ uri: item?.thumbnail }} style={styles.imgProduct} />
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: toDp(10) }}>
                <View style={{ justifyContent: 'center', width: '70%' }}>
                  <Text numberOfLines={2} style={styles.textproduct}>{item?.product_name}</Text>
                </View>
              </View>
              <Text style={{ marginTop: toDp(5), fontSize: toDp(10) }}>{item?.retail_name}</Text>
              <NumberFormat
                value={item?.price}
                displayType={'text'}
                thousandSeparator={'.'}
                decimalSeparator={','}
                prefix={'Rp. '}
                renderText={formattedValue => <Text style={{ color: '#F83308', fontWeight: '800', fontSize: toDp(15) }}>{formattedValue}</Text>} // <--- Don't forget this!
              />
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: toDp(10), }}>
                <Image source={allLogo.address} style={styles.address} />
                <Text style={styles.dariKota}>{item?.retailaddres}</Text>
              </ View>
            </ View>
          </Pressable>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Header
        title={'Chat'}
        onPress={() => props.navigation.goBack()}
      />
      {/* update */}

      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={1}
        data={chat}
        renderItem={({ item, index }) => {
          return (
            item.from === state.id ? (
              <View style={{ left: 8 }}>
                {item.prd_id != '' ?
                  renderProduk(state.produk[index])
                  : <View></View>
                }
                <View style={{ alignItems: 'flex-end', right: 14 }}>
                  <View style={[styles.cardchat, { backgroundColor: item.from != state.id ? 'white' : '#2A3348' }]}>
                    <View>
                      <Text style={{ fontSize: 13, color: item.from != state.id ? '#787878' : 'white' }}>{item.pesan}</Text>
                    </View>
                    <View style={{ backgroundColor: 'red', marginBottom: 12 }}>
                      <Text style={{ fontSize: 10, color: item.from != state.id ? '#B3B3B3' : 'white', position: 'absolute', right: 0 }}>{item.waktu}</Text>
                    </View>
                  </View>
                </View>
              </View>
            ) : (
              <View style={{ left: 8 }}>
                {item.prd_id != '' ?
                  renderProduk(state.produk[index])
                  : <View></View>
                }
                <View style={{ alignItems: 'flex-start' }}>
                  <View style={[styles.cardchat, { backgroundColor: item.from != state.id ? 'white' : '#2A334B' }]}>
                    <View>
                      <Text style={{ fontSize: 13, color: item.from != state.id ? 'black' : 'white' }}>{item.pesan}</Text>
                    </View>
                    <View style={{ backgroundColor: 'red', marginBottom: 12 }}>
                      <Text style={{ fontSize: 10, color: item.from != state.id ? 'black' : 'white', position: 'absolute', right: 0 }}>{item.waktu}</Text>
                    </View>
                  </View>
                </View>
              </View>
            )
          )
        }}
        ListFooterComponent={() => <View style={{ height: toDp(100) }} />}
      />

      <View style={{ backgroundColor: '#f8f9f9', marginTop: toDp(0), flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={styles.content}>
          <TextInput
            style={[styles.textInput]}
            placeholder={'Tulis pesan'}
            placeholderTextColor={'#787878'}
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
    width: '70%',
    padding: toDp(8),
    borderRadius: toDp(8),
    marginBottom: toDp(15),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 3,
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
  },
  viewProduk: {
    marginBottom: 15,
    flexDirection: 'row'
  },
  card: {
    backgroundColor: '#FFF',
    top: toDp(10),
    padding: toDp(0),
    marginVertical: toDp(5),
    // marginHorizontal: toDp(16),
    borderRadius: toDp(10),
    minHeight: toDp(240),
    // right: toDp(2),
    width: '48%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  txtProduct: {
    borderRadius: toDp(10),
    padding: toDp(10)
  },
  imgProduct: {
    width: toDp(100),
    height: toDp(100)
  },
  textproduct: {
    textTransform: 'uppercase',
    fontSize: toDp(12),
  },
  address: {
    width: toDp(12),
    height: toDp(12),
    marginBottom:toDp(12)
  },
  star: {
    bottom: toDp(3),
    left: toDp(2)
  },
  dariKota: {
    left: toDp(3),
    fontSize: toDp(12)
  },
});

export default Chatseller;