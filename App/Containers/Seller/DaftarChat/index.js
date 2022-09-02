import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  ImageBackground,
  Pressable,
  AsyncStorage,
  ScrollView,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import NavigatorService from '@NavigatorService'
import LinearGradient from 'react-native-linear-gradient'
import Carousel, { Pagination } from "react-native-snap-carousel";
import Header from "@Header"
import axios from "axios";
import { svr } from "../../../Configs/apikey";
import { Col, Row, Grid } from "react-native-easy-grid";

const { width, height } = Dimensions.get('window')

const DaftarChat = (props) => {

  // const today = new Date();
  // const yesterday = new Date((new Date()).valueOf() - 1000 * 60 * 60 * 24);

  // const dateToday = today.toJSON().slice(0, 10);
  // const current = dateToday.slice(8, 10) + '-'
  //   + dateToday.slice(5, 7) + '-'
  //   + dateToday.slice(0, 4);

  // const dateYesterday = yesterday.toJSON().slice(0, 10);
  // const before = dateYesterday.slice(8, 10) + '-'
  //   + dateYesterday.slice(5, 7) + '-'
  //   + dateYesterday.slice(0, 4);

  // const [currentDate, setCurrentDate] = useState(current)
  // const [beforeDate, setBeforeDate] = useState(before)

  const [state, setState] = useState({
    uid: '',
    listChat: []
  });

  useEffect(() => {

    AsyncStorage.getItem('member').then(response => {
      //console.log('Profilseller=======>'+ JSON.stringify(responponse));

      let data = JSON.parse(response);
      //const val = JSON.stringify(data);

      console.log('Homeseller ==> ' + JSON.stringify(data));

      setState(state => ({
        ...state,
        id: data.mb_id,
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


    AsyncStorage.getItem('uid').then(uids => {
      let ids = uids;
      setState(state => ({
        ...state,
        uid: ids
      }))
      console.log('uid = ', state.uid);
    });


    AsyncStorage.getItem('chatid').then(chatid => {
      let idc = chatid;
      setState(state => ({
        ...state,
        chat_id: idc
      }))
      console.log('chatid = ', state.chat_id);
    });

    AsyncStorage.getItem('senderid').then(send => {
      let pengirim = send;
      setState(state => ({
        ...state,
        sender_id: pengirim
      }))
      console.log('sender id = ', state.sender_id);
    });

    getChat()
  }, [])

  const getChat = () => {
    let idr = props.navigation.state.params.retail_id;
    console.log('idm = ', idr);
    // http://localhost/publish/react/chat/penjual/RTL00000002/Q4Z96LIFSXUJBK9U6ZACCB2CJDQAR0XH4R6O6ARV
    axios.get(svr.url + 'chat/penjual/' + idr + '/' + svr.api)
      .then(result => {
        console.log('cek chat = ' + JSON.stringify(result));
        // console.log('cek chat id = ' + JSON.stringify(result.data.data[0].chat_id));
        setState(state => ({ ...state, listChat: result.data.data }))
        AsyncStorage.setItem('chat', JSON.stringify(result.data.data[0]))
        AsyncStorage.setItem('chatid', JSON.stringify(result.data.data[0].chat_id))
        AsyncStorage.setItem('senderid', JSON.stringify(result.data.data[0].sender_id))



      })
      .catch(err => {
        ToastAndroid.show(err.message, ToastAndroid.SHORT)
      })
  }


  const RenderItem = (item, index) => (

    <Pressable style={styles.btnChat}
      onPress={() => NavigatorService.navigate('Chatseller', {
        id: item.chat_id,
        sender_id: item.sender_id,
        sender: item.sender,
        rtl: item.id
      })}>
      <View style={styles.product}>
        <Grid>
          <Col>
            <Image source={allLogo.icuser} style={styles.imgProduk} />
          </Col>
          <Col>
            <Row style={{ right: toDp(90), marginBottom: toDp(18) }}>
              <View style={styles.textproduct}>
                <Text style={styles.text}>{item.sender}</Text>
                <Text style={styles.txt}>{item.pesan}</Text>
              </View>
            </Row>
          </Col>
          <Col>
            <Row style={{ marginLeft: toDp(60) }}>
              <View style={{ right: toDp(50), top: toDp(50) }}>
                <Text style={{ fontSize: toDp(10), width: toDp(100), color: 'grey' }}>{item.waktu}</Text>
              </View>
              <View>
                <Text>{item.jumlah}</Text>
              </View>
              {/* <View style={[styles.next, { marginTop: item.jumlah != 0 ? toDp(10) : 0 }]}>
                <Text style={styles.time}>{
                  item.waktu.substring(0, item.waktu.indexOf(' ')) == currentDate ?
                    item.waktu.substring(item.waktu.indexOf(' '))
                    :
                    item.waktu.substring(0, item.waktu.indexOf(' ')) == beforeDate ?
                      'Kemarin'
                      :
                      item.waktu.substring(0, item.waktu.indexOf(' '))
                  // dateNow
                }</Text>
                {item.jumlah != 0 ?
                  <View style={styles.num}>
                    <Text style={styles.number}>{item.jumlah}</Text>
                  </View>
                  :
                  null
                }
              </View> */}
            </Row>
          </Col>
        </Grid>
      </View>
    </Pressable>
  );

  const Chats = () => {
    return (
      <FlatList style={{ backgroundColor: '#FFF', minHeight: toDp(100), width: width, right: 42 }}
        showsVerticalScrollIndicator={false}


        numColumns={1}
        data={state.listChat}
        renderItem={({ item, index }) => {
          return (
            RenderItem(item, index)
          )
        }}
        ListFooterComponent={() => <View style={{ height: toDp(100) }} />}
      />
    )
  }
  return (

    <View style={styles.container}>
      <Header
        title={'Chat'}
        onPress={() => props.navigation.goBack()}
      />

      <View style={styles.menus}>
        <Text style={styles.all}>Semua Pesan</Text>
        <ScrollView style={styles.ScrollView}>
          <Chats />
        </ScrollView>

      </View>
    </View>

  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  btnChat: {
    backgroundColor: '#FFF',
    width: toDp(315),
    borderRadius: toDp(10),
    marginLeft: toDp(40),
    left: toDp(3),
    marginTop: toDp(10),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
  },
  menus: {
    marginLeft: toDp(20),
    marginTop: toDp(-70)
  },
  all: {
    marginTop: toDp(90),
    fontWeight: 'bold',
    fontSize: toDp(14)
  },
  textup: {
    marginLeft: toDp(-10),
    fontSize: toDp(22),
    fontFamily: 'Poppins-Regular',
    marginTop: toDp(-10)
  },
  imgProduk: {
    position: 'absolute',
    zIndex: 1,
    marginTop: toDp(0),
    alignItems: 'center',
    justifyContent: 'center',
    width: toDp(50),
    height: toDp(50),
    top: toDp(10),
    borderRadius: toDp(25),
    marginLeft:toDp(10),
    tintColor: 'black'
  },
  product: {
    marginTop: toDp(0),
    backgroundColor: '#FFF',
    borderRadius: toDp(10),
    width: toDp(315),
    left: toDp(0),
    height: toDp(70),
    flexDirection: 'row',

  },
  text: {
    color: '#005100',
    fontWeight: 'normal',
    textAlign: 'left',
    fontSize: toDp(13),
    fontFamily: 'Poppins-Regular',
    marginRight: toDp(55),
    bottom: toDp(5)
  },
  txt: {
    width: toDp(200),
    fontSize: toDp(12),
    fontFamily: 'Poppins-Light',
    fontWeight: 'normal',
    textAlign: 'left',
    marginLeft: toDp(30),
    color: '#959595'
  },
  time: {
    fontSize: toDp(11),
    marginLeft: toDp(-20)
  },
  num: {
    backgroundColor: 'red',
    width: toDp(20),
    height: toDp(20),
    borderRadius: toDp(10),
    marginTop: toDp(5)
  },
  number: {
    textAlign: 'center',
    color: 'white'
  },
  textproduct: {
    justifyContent: 'center',
    alignItems: 'center',
    left: toDp(10),
    top: toDp(5)
  },
  next: {
    marginTop: toDp(15),
    marginLeft: toDp(20)
  }

});

export default DaftarChat;
