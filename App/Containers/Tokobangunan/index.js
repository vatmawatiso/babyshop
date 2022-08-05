import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Alert,
  TextInput,
  SafeAreaView,
  Pressable,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import Header from '@Header'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import NavigatorService from '@NavigatorService'
import axios from "axios";
import { svr } from "../../Configs/apikey";

const Tokobangunan = (props) => {

  const [state, setState] = useState({
    datas: [],
  })

  useEffect(() => {
    Tokobangunan()
  }, [])

  const Tokobangunan = () => {
    axios.get(svr.url+'retail/'+svr.api)
    // axios.get('https://market.pondok-huda.com/dev/react/retail/')
      .then(result => {
        //hendle success
        setState(state => ({ ...state, datas: result.data.data }))
        console.log('Toko Bangunan ===> ' + JSON.stringify(result.data.data));

      }).catch(err => {
        alert('Gagal menerima data dari server!' + err)
        setState(state => ({ ...state, loading: false }))
      })
  }

  const ListToko = (item, index) => (
    <View style={styles.body}>
      <TouchableOpacity style={{ width: toDp(330) }} >
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: toDp(10) }}>
          <Image source={allLogo.roof} style={styles.imgKontak} />
          <View style={{ flexDirection: 'row', marginLeft: toDp(10) }}>
            <View>
              <Text style={{ fontSize: toDp(12) }}>Nama</Text>
              <Text style={{ fontSize: toDp(12) }}>Telepon</Text>
              <Text style={{ fontSize: toDp(12) }}>Alamat</Text>
              <Text style={{ fontSize: toDp(12) }}>Latitude</Text>
              <Text style={{ fontSize: toDp(12) }}>Longtitude</Text>
            </View>
            <View>
              <Text style={{ fontSize: toDp(12) }}> : {item.rtl_name}</Text>
              <Text style={{ fontSize: toDp(12) }}> : {item.rtl_phone}</Text>
              <Text style={{ fontSize: toDp(12) }}> : {item.rtl_address} {item.cty_name}</Text>
              <Text style={{ fontSize: toDp(12) }}> : {item.rtl_long}</Text>
              <Text style={{ fontSize: toDp(12) }}> : {item.rtl_lat}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnBuka} onPress={() => NavigatorService.navigate('profilToko', {id: item.rtl_id, rtl_name: item.rtl_name, rtl_addres: item.rtl_addres})}>
        <Image source={allLogo.iclineblack} style={styles.iclineright} />
      </TouchableOpacity>
    </View>
  )

  return (
    <View style={styles.container}>
      <Header
        title={'Toko'}
        onPress={() => props.navigation.goBack()}
      />
      <View style={styles.flatcontent}>
        <FlatList style={{ width: '100%' }}
          data={state.datas}
          renderItem={({ item, index }) => {
            return (
              ListToko(item, index)
            )
          }}
          ListFooterComponent={() => <View style={{ height: toDp(120) }} />}
        />
      </View>

    </View>

  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'red'
  },
  iclineright: {
    width:toDp(18),
    height:toDp(18),
    tintColor:'#F83308'
  },
  btnBuka: {
    backgroundColor: '#F8f9f9',
    width: toDp(28),
    height: toDp(28),
    right:toDp(30),
    // borderBottomWidth: 1,
    // borderBottomColor: '#2A334B',
    // borderWidth:0.5,
    alignItems:'center',
    backgroundColor: '#fcd4c7',
    justifyContent: 'center',
    borderRadius: toDp(20),
  },
  body: {
    flexDirection: 'row',
    backgroundColor: '#f8f9f9',
    width: toDp(335),
    height: toDp(110),
    borderRadius: toDp(10),
    borderBottomWidth: 5,
    borderBottomColor: '#2A334B',
    top: toDp(10),
    marginTop: toDp(5),
    alignItems: 'center',
    marginHorizontal: toDp(12),
    justifyContent: 'space-between',
    marginBottom: toDp(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 3,
  },
  content: {
    right: toDp(10),
  },
  flatcontent: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: toDp(45)
  },
  imgKontak: {
    height: toDp(38),
    width: toDp(50),
    borderRadius: toDp(10),
    tintColor:'#F83308',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 3,
  },
});

export default Tokobangunan;