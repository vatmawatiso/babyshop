import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ImageBackground,
  Pressable,
  FlatList
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import BackHeader from '@BackHeader'
import Profiltoko from '@Profiltoko'
import NavigatorService from '@NavigatorService'
import axios from 'axios';
import CheckBox from '@react-native-community/checkbox';
import { TextInput } from "react-native-gesture-handler";
import { BottomNavigation } from "react-native-paper";

const Kategori = (props) => {
  const [src, setSrc] = useState(null);

  const [state, setState] = useState({
    // kategori: [],
    datas: [],
    isLoading: true,
    isError: false
  })

  useEffect(() => {
    category()

  }, [])

  // const countries = ["Jakarta", "Cirebon", "Bandung", "Kuningan"]

  const category = () => {
    // setState(state => ({...state, loading: true }))
    axios.get('https://market.pondok-huda.com/dev/react/category/')
      .then(result => {
        // handle success
        setState(state => ({ ...state, datas: result.data.data }))
        console.log('----Katagori=====>' + JSON.stringify(result.data.data));
        // alert(JSON.stringify(result.data));

      }).catch(err => {
        //console.log(err)
        alert('Gagal menerima data dari server!' + err)
        setState(state => ({ ...state, loading: false }))
      })
  }

  const ListKategori = (item, index) => {
    return (
      <View style={{ marginTop: toDp(0), width: '100%' }}>
        <View style={{ flexDirection: 'row', marginHorizontal: toDp(0), height: toDp(50), alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{right:toDp(0)}}>
            <Text style={{fontSize:toDp(13), left:toDp(10)}}>{item.ctg_name}</Text>
          </View>
          <Image source={allLogo.iclineright} style={styles.iclineright} />
        </View>
        <View style={{ borderWidth: toDp(0.5), borderColor: 'grey', bottom: toDp(0), width: toDp(330), left:toDp(2.5)}} />
      </View>
    )
  }


  return (
    <View style={styles.container}>

      <BackHeader
        title={'Kategori'}
        onPress={() => props.navigation.goBack()}
      />

      <Profiltoko />

      <View style={styles.BodyKategori}>
        <View style={{ top: toDp(10), justifyContent: 'center', alignItems: 'center' }}>

          <View style={{ marginTop: toDp(0) }}>
            <FlatList
              numColumns={1}
              data={state.datas}
              renderItem={({ item, index }) => {
                return (
                  ListKategori(item, index)
                )
              }}
              ListFooterComponent={() => <View style={{ height: toDp(60), width: toDp(335) }} />}
            />
          </View>
        </View>
      </View>

      <View style={{ position: 'absolute', bottom: 0, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <Pressable style={[styles.btnKonfirm, { width: toDp(335) }]} onPress={() => NavigatorService.navigate('Tambahkategori')}>
          <Text style={styles.txtKonfirm}>Tambah Kategori</Text>
        </Pressable>
      </View>

    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex:1
  },
  title: {
    color: 'black',
    fontSize: toDp(14),
    marginLeft: toDp(8),

  },
  BodyKategori: {
    width: toDp(335),
    height: toDp(378),
    borderRadius: toDp(20),
    top: toDp(20),
    flexDirection: 'column',
    justifyContent: 'space-between',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
  btnKategori: {
    margin: toDp(10),
    marginBottom: toDp(3),
    bottom: toDp(4),
    borderRadius: toDp(8)
  },
  iclineright: {
    width: toDp(10),
    height: toDp(15),
    right:toDp(10)
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnKonfirm: {
    backgroundColor: '#2A334B',
    borderRadius: toDp(15),
    width: toDp(335),
    height: toDp(40),
    justifyContent: 'center',
    bottom: toDp(5)
  },
  txtKonfirm: {
    textAlign: 'center',
    color: 'white'
  }
});

export default Kategori;