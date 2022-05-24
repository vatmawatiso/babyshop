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
  ScrollView
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import BackHeader from '@BackHeader'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import NavigatorService from '@NavigatorService'
import axios from 'axios';

const Alatbahan = (props) => {

  const [state, setState] = useState({
    datas: [],
  })

  useEffect(() => {
    alatBahan()

  }, [])

  // const countries = ["Jakarta", "Cirebon", "Bandung", "Kuningan"]

  const alatBahan = () => {
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


  const listAlatBahan = (item, index) => {
    return (
      <View style={{ marginTop: toDp(10), width: '100%' }}>
        <View style={styles.listAlat}>
          <Text style={{ fontSize: toDp(14), marginLeft:toDp(10), color:'white' }}>{item.ctg_name}</Text>
        </View>
        <View style={{ borderWidth: toDp(0.5), borderColor: 'grey', bottom: toDp(0), width: toDp(335) }} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <BackHeader
        title={'Alat Bahan'}
        onPress={() => props.navigation.goBack()}
      />
      <View>
        <Text style={styles.txtTools}>Alat dan Bahan Bangunan</Text>
        <View style={{ alignItems: 'center', marginTop:toDp(10) }}>

          <View style={styles.viewList}>
            <FlatList
              numColumns={1}
              data={state.datas}
              renderItem={({ item, index }) => {
                return (
                  listAlatBahan(item, index)
                )
              }}
              ListFooterComponent={() => <View style={{ height: toDp(100), width: toDp(335) }} />}
            />
          </View>
        </View>
      </View>
    </View>

  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent:'center',
    // alignItems: 'center',
  },
  contentContainer: {
    paddingVertical: 1
  },
  txtTools: {
    fontWeight: 'bold',
    marginTop: toDp(10),
    marginLeft: toDp(20),
    fontSize:toDp(15)
  },
  listAlat: {
    flexDirection: 'row', 
    height: toDp(40), 
    alignItems: 'center', 
  },
  viewList: {
    marginTop: toDp(5), 
    height:toDp(480), 
    backgroundColor: '#2A334B',
    borderRadius:toDp(15),
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.20,
      shadowRadius: 1.41,

      elevation: 2,
  }
});

export default Alatbahan;