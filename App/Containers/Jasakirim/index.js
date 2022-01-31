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
import  NonCart  from '@NonCart'
import { Card } from "react-native-paper";
import NavigatorService from '@NavigatorService'
import { TextInput } from "react-native-gesture-handler";

const Jasakirim = (props) => {
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

  const [isSwitchOn,setSwitch] = useState(false)
  const [val,setval] = useState(false)
  const [state,setState] = useState({
    
    jasper:[
      {
        'id':1,
        'name':'JNE',
        'status' : true
      },
      {
        'id':2,
        'name':'TIKI',
        'status' : false
      },
      {
        'id':3,
        'name':'Anteraja',
        'status' : false
      },
      {
        'id':4,
        'name':'Kargo',
        'status' : false
      },
      {'id':5,
      'name':'Lion Parcel',
      'status' : false
      },
      {'id':6,
      'name':'J&T Express',
      'status' : false
      },
      {
        'id':7,
      'name':'Si Cepat',
      'status' : false
      },
      {
        'id':8,
      'name':'Pos Kilat',
      'status' : false
      },
      {
        'id':9,
      'name':'J&T Express',
      'status' : false
      },
      {
        'id':10,
      'name':'Si Cepat',
      'status' : false
      },
      {
        'id':11,
      'name':'Pos Kilat',
      'status' : false
      },
      {
        'id':12,
      'name':'J&T Express',
      'status' : false
      },
      {
        'id':13,
      'name':'Si Cepat',
      'status' : false
      },
    ] 
  })

  const setSwitchValue = (val, ind, id) => {
    const tempData = JSON.parse(JSON.stringify(state.jasper));
    tempData[ind].status = val;
    setState({ jasper: tempData });
    //langsung push data terbaru ke server
    //tulis kode disini
}

  const renderswitch = ({item, index}) => {
  return (
    <View style={{width:toDp(316), left:toDp(20), borderRadius:toDp(15)}}>
        <View style={{flexDirection:'row', 
                        justifyContent:'space-between',
                        alignItems:'center',
                        width:'100%',
                        borderRadius:toDp(15),
                        width:toDp(316),
                        height:toDp(340),
                        padding:12, 
                        height:50, 
                        backgroundColor:'#C4C4C4'}}>

                <Text>{item.name}</Text>
                
                <Switch  
                  thumbColor={'#f4f3f4'}
                  trackColor={{false:'grey', true:'#6495ED'}}
                  ios_backgroundColor='grey'
                 
                  onValueChange={(value) => setSwitchValue(value, index,item.id)} 
                  value={item.status}
                  
                />  
        
        </View>
        <View style={{borderWidth:1, borderColor:'white'}} />
    </View>
    )
  } 
   
    
     return (
      <View style={styles.container}>
         <NonCart
          title={'Jasa Kirim'}
          onPress={() => props.navigation.goBack()}
        />
        <ScrollView>
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
      <View style={{bottom:toDp(35)}}>
        <FlatList
          data={state.jasper}
          renderItem={renderswitch}
          keyExtractor={item => item.id}
          ListFooterComponent={() => <View style={{height: toDp(50)}} />}
        />
      </View>
      </ScrollView>
      </View>
    );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top:toDp(50),
    // backgroundColor:'red'
  },
  content: {
      marginTop:toDp(70),
      bottom:toDp(50),
      width:toDp(360),
      height:toDp(120),
      // backgroundColor:'cyan'
  },
  address: {
      backgroundColor:'#C4C4C4',
      width:toDp(316),
      height:toDp(105),
      top:toDp(-5),
      marginLeft:toDp(20),
      borderRadius:toDp(15),
      position:'relative'
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
    bottom:toDp(30),
    width:toDp(360),
    height:toDp(360),
  },
  courier: {
    backgroundColor:'#C4C4C4',
    width:toDp(316),
    height:toDp(330),
    left:toDp(20),
    borderRadius:toDp(15),
    alignItems:'flex-start',
    justifyContent:'space-between',
  },
  txtCourier: {
    marginTop:toDp(10),
    left:toDp(10)
  }
});

export default Jasakirim;