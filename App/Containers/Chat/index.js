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
  FlatList
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import Header from '@Header'
import { Card } from "react-native-paper";
import NavigatorService from '@NavigatorService'
import { TextInput } from "react-native-gesture-handler";
import axios from "axios";
import { svr } from "../../Configs/apikey";
import NumberFormat from 'react-number-format';

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
    id: '',
    listChat: '',
    mb_id: '',
    chat_text: '',
    prd_id: '',
    retail_name: '',
    produk: [],
    idpr: [],
    idcat: ''
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

    //chat_id

    // AsyncStorage.getItem('chatid').then(chatid => {
    //   let idc = chatid;
    //   setState(state => ({
    //     ...state,
    //     chat_id: idc
    //   }))
    //   console.log('chatid = ', state.chat_id);
    // });

    // getProduk()
    getChat()

    setInterval(() => {
      getChat()
    }, 1000);
  }, [])

  const getProduk = (idp, i) => {
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
    // ini props dari halaman daftar chat
    let chid = props.navigation.state.params.ciid;
    // 
    axios.get(svr.url + 'chat/content/' + chid + '/' + svr.api)
      .then(response => {
        console.log('cat id', chid)
        console.log('hasil chat', response)
        const datas = {
          idCht: response.data.data.chat_id,
          value: response.data.data
        }
        if (datas.value.length === 0) {
          alert('chat kosong')
        } else {

          console.log('prd id', response.data.data)
          setChat(response.data.data)
        }
        // updatae
        const prdid = response.data.data.map((val, i) => {
          console.log('>>>>', JSON.stringify(val.prd_id));
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
          getProduk(va, i)
        })

      }).catch(error => {
        ToastAndroid.show(error.message, ToastAndroid.SHORT)
        console.log('error', error)
      })
  }

  const sendChat = () => {
    let idp = props.navigation.state.params.id;
    let rid = props.navigation.state.params.rtl_id;
    let chid = props.navigation.state.params.ciid;
    if (isiChat.trim().length === 0) {
      ToastAndroid.show("Tidak dapat mengirimkan pesan kosong.", ToastAndroid.SHORT)
    } else {
      const body = {
        "pengirim_id": state.id,
        "penerima": rid,
        "pesan": isiChat,
        "current_uid": state.id,
        "prd_id": idp,
        "from": "chat",
        "chat_id": chid
      }
      console.log('cek body = ', body);
      axios.post(svr.url + 'chat/' + chid + '/' + svr.api, body)
        .then(result => {
          console.log('result', result)
          if (result.data.status === 201) {
            console.log('cekkk hasil =', result.data)
            setIsiChat('')
            // setState(state => ({ ...state, idcat: result.data.chat_id }))
            // console.log('cek chat id', state.idcat)
            getChat()


          }

        })
        .catch(err => {
          console.log(err)
          ToastAndroid.show("Terjadi masalah saat mengirimkan pesan, Silahkan coba lagi!", ToastAndroid.SHORT)
        })
    }
  }

  const renderProduk = (item) => {
    // update
    return (
      <View style={styles.viewProduk}>
        <View style={styles.card}>
          <Pressable onPress={() => alert('hbd yesung')}>
            <View style={styles.txtProduct}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image source={{ uri: item?.thumbnail }} style={styles.imgProduct} />
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ justifyContent: 'center', width: '70%' }}>
                  <Text style={styles.textproduct}>{item?.product_name}</Text>
                </View>
              </View>
              <NumberFormat
                value={item?.price}
                displayType={'text'}
                thousandSeparator={'.'}
                decimalSeparator={','}
                prefix={'Rp. '}
                renderText={formattedValue => <Text style={{ color: '#F83308', fontWeight: '800' }}>{formattedValue}</Text>} // <--- Don't forget this!
              />
              <Image source={allLogo.address} style={styles.address} />
              <Text style={styles.dariKota}>{item?.retailaddres}</Text>
              {/* <Image source={allLogo.icstar} style={styles.star} /> */}
              {/* <Text style={styles.bintang}>{item[0].lainnya.rating}</Text>
            <Text style={styles.terjual}>| Terjual {item[0].lainnya.terjual}</Text> */}
            </ View>
          </Pressable>
        </ View>
      </View>

    )
  }

  let rnm = props.navigation.state.params.rtl_name
  return (
    <View style={styles.container}>

      <Header
        title={'Chat'}
        onPress={() => props.navigation.goBack()}
      />
      <View style={styles.BodyChat}>

        <View style={{ bottom: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{rnm}</Text>
        </View>
        {/*update*/}
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={1}
          data={chat}
          renderItem={({ item, index }) => {
            return (
              item.from == state.id ? (
                <View>
                  {item.prd_id != '' ?

                    renderProduk(state.produk[index])

                    : <View></View>
                  }
                  <View style={{ alignItems: 'flex-end' }}>
                    <View style={[styles.cardchat, { backgroundColor: item.from != state.id ? 'white' : '#2A334B', }]}>
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

                <View style={{ alignItems: 'flex-start' }}>
                  <View style={[styles.cardchat, { backgroundColor: item.from != state.id ? 'white' : '#2A334B', }]}>
                    <View>
                      <Text style={{ fontSize: 13, color: item.from != state.id ? 'black' : 'white' }}>{item.pesan}</Text>
                    </View>
                    <View style={{ backgroundColor: 'red', marginBottom: 12 }}>
                      <Text style={{ fontSize: 10, color: item.from != state.id ? 'black' : 'white', position: 'absolute', right: 0 }}>{item.waktu}</Text>
                    </View>
                  </View>
                </View>
              )
            )
          }}
          ListFooterComponent={() => <View style={{ height: toDp(100) }} />}
        />


      </View>
      <View style={{ backgroundColor: '#F0F2FF', marginTop: toDp(0), flexDirection: 'row', justifyContent: 'space-between' }}>
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
    backgroundColor: '#F0F2FF',
    height: '100%'

  },
  cardchat: {
    width: '70%',
    padding: toDp(8),
    // height: '10%',
    borderRadius: toDp(8),
    marginBottom: toDp(15)
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
  },
  viewProduk: {
    marginBottom: 15,
    flexDirection: 'row-reverse'
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: toDp(10),
    minHeight: toDp(221),
    height: toDp(221),
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
    padding: toDp(20)
  },
  imgProduct: {
    width: toDp(100),
    height: toDp(100)
  },
  textproduct: {
    fontWeight: 'bold',
    fontSize: toDp(12)
  },
  address: {
    top: toDp(7),
    width: toDp(15),
    height: toDp(15)
  },
  star: {
    bottom: toDp(3),
    left: toDp(2)
  },
  dariKota: {
    bottom: toDp(10),
    left: toDp(20)
  },
  bintang: {
    bottom: toDp(17),
    left: toDp(20)
  },
  terjual: {
    bottom: toDp(37),
    left: toDp(33)
  },
});

export default Chat;