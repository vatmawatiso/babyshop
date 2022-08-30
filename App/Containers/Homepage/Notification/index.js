import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  StatusBar,
  ImageBackground,
  Pressable,
  FlatList,
  AsyncStorage
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import  Header  from '@Header'
import { Card } from "react-native-paper";
import Axios from "axios";
import { svr } from "../../../Configs/apikey";
 
const Notification = (props) => {

  const [state, setState] = useState({
    loading: false,
    arrayNotif: []
  })

  useEffect(() => {
    AsyncStorage.getItem('uid').then(uids => {
      let ids = uids;
      setState(state => ({
        ...state,
        mb_id: ids
      }))
    }).catch(err => {
      console.log('err', err)
    })


    getNotif()
  }, [])


  const getNotif = () => {
    let mbid = props.navigation.state.params.id;
    console.log('mbid = ', mbid)
    setState(state => ({...state, loading: true}));
    Axios.get(svr.url+'notifikasi/member/'+mbid+'/'+svr.api)
    // https://market.pondok-huda.com/publish/react/notifikasi/member/MB000000001/Q4Z96LIFSXUJBK9U6ZACCB2CJDQAR0XH4R6O6ARVG
    .then(result => {
      console.log('result notif =>', result)
      if(result.data.status == 200){
        setState(state => ({...state, arrayNotif: result.data.data}))
        setState(state => ({...state, loading: false}))
      } else if(result.status.data == 500){
        console.log('result notif 2 =>', result)
        setState(state => ({...state, loading: false}))
      }
    }).catch(error => {
      console.log('error notif =>', error)
    })
  }
 
   {
 
    const render = (item,index) => (
      <View style={{marginTop:toDp(10), justifyContent:'center', alignItems:'center'}}>
            <Pressable style={styles.Notification}>
              <Text style={styles.title}>{item.jenisnotif}</Text>
              <Text style={styles.isi}>{item.pesan}</Text>
            </Pressable>
      </View>
    )
  return (
    <View style={styles.container}>
        <Header
          title={'Notification'}
          onPress={() => props.navigation.goBack()}
        />
 
        <View style={styles.content}>
              <FlatList style={{width:'100%'}}
                data={state.arrayNotif}
                renderItem={({item, index}) => {
                  return (
                    render(item, index)
                  )
                }}
                ListFooterComponent={() => <View style={{height: toDp(24)}} />}
              />
        </View>
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
    backgroundColor:'white',
  },
  content: {
    width: '100%',
    alignItems: 'center',
    justifyContent:'center',
    marginBottom: toDp(45)
  },
  Notification: {
    backgroundColor: '#F9F8F8',
    width: toDp(335),
    height: toDp(70),
    margin: toDp(1),
    padding: toDp(5),
    borderRadius: toDp(10),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
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