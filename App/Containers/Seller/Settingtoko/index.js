import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ImageBackground,
  Pressable
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import  HeaderToko  from '@HeaderToko'
import NavigatorService from '@NavigatorService'
import { TextInput } from "react-native-gesture-handler";

const Settingtoko = (props) => {
  const [src, setSrc]=useState(null);

  return (
    <View style={styles.container}>

        <HeaderToko
          title={'Pengaturan Toko'}
          onPress={() => props.navigation.goBack()}
        />

        <View style={styles.content}>
            <View style={{flexDirection:'row', margin:toDp(10)}}>
                <Image source={allLogo.icgroup} />
                <Text style={{padding:toDp(5), bottom:toDp(2), left:toDp(5), fontWeight:'bold'}}>Profil Toko</Text>
            </View>
            <View style={{marginLeft:toDp(40), bottom:toDp(10)}}>
                <Pressable>
                    <Text style={styles.txtInfo}>Informasi Toko</Text>
                </Pressable>
                <Pressable>
                    <Text style={styles.txtCatatan}>Catatan Toko</Text>
                </Pressable>
            </View>
            <View style={{borderWidth:0.5, borderColor:'grey'}} />

            <View style={{flexDirection:'row', margin:toDp(10)}}>
                <Image source={allLogo.icaddress1} />
                <Text style={{padding:toDp(5), bottom:toDp(2), left:toDp(5), fontWeight:'bold'}}>Alamat dan Pengiriman</Text>
            </View>
            <View style={{marginLeft:toDp(40), bottom:toDp(10)}}>
                <Pressable>
                    <Text style={styles.txtAlamat}>Alamat Toko</Text>
                </Pressable>
                <Pressable>
                    <Text style={styles.txtLayanan}>Layanan Pengiriman Toko</Text>
                </Pressable>
            </View>
         
        </View>
        
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    top:toDp(50)
  },
  content: {
    backgroundColor:'#C4C4C4',
    top:toDp(20),
    width:toDp(335),
    height:toDp(185),
    borderRadius:toDp(10),

  },
  txtInfo: {
      fontSize:toDp(12),
      marginBottom:toDp(8)
  },
  txtCatatan: {
      fontSize:toDp(12)
  },
  txtAlamat: {
    fontSize:toDp(12),
    marginBottom:toDp(8)
},
txtLayanan: {
    fontSize:toDp(12)
},
});

export default Settingtoko;