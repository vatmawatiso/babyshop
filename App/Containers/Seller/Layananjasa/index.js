import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Switch,
  TouchableOpacity,
  FlatList,
  Alert,
  ImageBackground,
  Pressable,
  ScrollView
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import  BackHeader  from '@BackHeader'
import { Card } from "react-native-paper";
import NavigatorService from '@NavigatorService'
import { TextInput } from "react-native-gesture-handler";
import axios from "axios";

const Layananjasa = (props) => {
  const [src, setSrc]=useState(null);



  const DATA = [
    {
      id: '1',
      nama: 'Chou Tzuyu',
      kontak: '083120203876',
      alamat:'Desa meguclik blok pengadangan RT/RW:02/02',
      kecamatan: 'Kec. Weru',
      kotakab: 'Kab. Cirebon',
      provinsi: 'Jawa Barat',
    },
  ]


  // const [state,setState] = useState({
    
  //   jasper:[
  //     {
  //       'id':1,
  //       'name':'Antar',
  //       'status' : true
  //     },
  //     {
  //       'id':2,
  //       'name':'Jemput',
  //       'status' : false
  //     },
  //   ] 
  // })
  // const [isSwitchOn,setSwitch] = useState(false)
  // const [val,setval] = useState(false)
  
  const [state, setState] = useState({
    datas: [],
    isLoading: true,
    isError: false,
  })
  
  useEffect(() => {
    getJasa()

  }, [])

  // const countries = ["Jakarta", "Cirebon", "Bandung", "Kuningan"]

  const getJasa = () => {
    // setState(state => ({...state, loading: true }))
    axios.get('https://market.pondok-huda.com/dev/react/shipping/')
      .then(result => {
        // handle success
        setState(state => ({ ...state, datas: result.data.data }))
        console.log('----JASA=====>' + JSON.stringify(result.data.data));
        // alert(JSON.stringify(result.data));

      }).catch(err => {
        //console.log(err)
        alert('Gagal menerima data dari server!' + err)
        setState(state => ({ ...state, loading: false }))
      })
  }

  const setSwitchValue = (val, ind, id) => {
    const tempData = JSON.parse(JSON.stringify(state.datas));
    tempData[ind].status = val;
    setState({ datas: tempData });
    //langsung push data terbaru ke server
    //tulis kode disini

  }


  const ListJasa = ({item, index}) => {
  return (
    <View style={{width:toDp(316), left:toDp(20), borderRadius:toDp(15)}}>
        <View style={{flexDirection:'row', 
                        justifyContent:'space-between',
                        alignItems:'center',
                        width:'100%',
                        borderRadius:toDp(20),
                        width:toDp(335),
                        height:toDp(340),
                        padding:toDp(12), 
                        height:toDp(50), 
                        right:toDp(8),
                        backgroundColor:'#C4C4C4'}}>

                <Text>{item.shp_name}</Text>
                
                <Switch  
                  thumbColor={'#f4f3f4'}
                  trackColor={{false:'grey', true:'#6495ED'}}
                  ios_backgroundColor='grey'
                 
                  onValueChange={(value) => setSwitchValue(value, index,item.datas)} 
                  value={item.status}
                  
                />  
        
        </View>
        <View style={{borderWidth:toDp(1), borderColor:'white'}} />
    </View>
    )
  } 
   
    
     return (
      <View style={styles.container}>
         <BackHeader
          title={'Jasa Kirim'}
          onPress={() => props.navigation.goBack()}
        />
{/* 
        <ScrollView> */}
         <View style={styles.content}>
            <View style={styles.address}>
                <Image source={allLogo.icaddress1} style={styles.icAddress} />
                <Text style={styles.titleAddress}>Alamat Pengiriman</Text>
                    <Pressable style={styles.buttonAddress}>
                        <Text style={styles.txtAddress}>{DATA[0].nama} {DATA[0].kontak}</Text>
                        <Text style={styles.txtAddress}>{DATA[0].alamat}</Text>
                        <Text style={styles.txtAddress}>{DATA[0].kecamatan} {DATA[0].kotakab} {DATA[0].provinsi}</Text>
                    </Pressable>
            </View>
        </View>
      <View style={{bottom:toDp(65)}}>
        <FlatList
          data={state.datas}
          renderItem={ListJasa}
          keyExtractor={item => item.id}
          ListFooterComponent={() => <View style={{height: toDp(50)}} />}
        />
      </View>
      {/* </ScrollView> */}
      </View>
    );
  
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    // justifyContent:'center',
    // alignItems: 'center',
    // backgroundColor:'red'
  },
  content: {
      marginTop:toDp(70),
      bottom:toDp(60),
      width:toDp(360),
      height:toDp(120),
      // backgroundColor:'cyan'
  },
  address: {
      backgroundColor:'#C4C4C4',
      width:toDp(335),
      height:toDp(105),
      marginLeft:toDp(20),
      borderRadius:toDp(20),
      position:'relative',
      right:toDp(8)
  },
  icAddress: {
      left:toDp(10),
      top:toDp(10)
  },
  titleAddress: {
      left:toDp(40),
      bottom:toDp(6)
  },
  txtAddress: {
      left:toDp(38),
      fontSize:toDp(12),
  },
  body: {
    backgroundColor:'yellow',
    width:toDp(360),
    height:toDp(360),
  },
  courier: {
    backgroundColor:'#C4C4C4',
    width:toDp(335),
    height:toDp(330),
    left:toDp(20),
    borderRadius:toDp(20),
    alignItems:'flex-start',
    justifyContent:'space-between',
  },
  txtCourier: {
    marginTop:toDp(10),
    left:toDp(10)
  }
});

export default Layananjasa;