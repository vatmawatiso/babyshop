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
import  BackHeader  from '@BackHeader'
import  Profiltoko  from '@Profiltoko'
import NavigatorService from '@NavigatorService'
import { TextInput } from "react-native-gesture-handler";
import { BottomNavigation } from "react-native-paper";

const Kategori = (props) => {
  const [src, setSrc]=useState(null);

  const DATA = [
    {
      id: '1',
      produk: 'Dapur',
      jumlah: '30',
    },
    {
      id: '2',
      produk: 'Kamar Mandi',
      jumlah: '130',
    },
    {
      id: '3',
      produk: 'Ruang Tamu',
      jumlah: '35',
    },
    {
      id: '4',
      produk: 'Atap Rumah',
      jumlah: '100',
    },
    {
      id: '5',
      produk: 'Semen',
      jumlah: '300',
    },
    {
      id: '6',
      produk: 'Peralatan Rumah',
      jumlah: '320',
    },
    {
      id: '7',
      produk: 'Cat Tembok',
      jumlah: '70',
    },
  ]


  return (
    <View style={styles.container}>

        <BackHeader
          title={'Kategori'}
          onPress={() => props.navigation.goBack()}
        />

        <Profiltoko/>

        <View style={styles.BodyKategori}>
            <Pressable style={styles.btnKategori} onPress={() => NavigatorService.navigate('Detailkategori')} >
              <View style={styles.button}> 
                <Text style={styles.txtKategori}>{DATA[0].produk}</Text>
                <Image source={allLogo.iclineright} style={styles.iclineright} />
              </View>
              <Text style={styles.jmlProduk}>{DATA[0].jumlah} Produk</Text>
            </Pressable>
            <View style={{borderWidth:toDp(0.5), borderColor:'grey'}} />

            <Pressable style={styles.btnKategori} onPress={() => alert('Coba berhasil gak')} >
              <View style={styles.button}>
                <Text style={styles.txtKategori}>{DATA[1].produk}</Text>
                <Image source={allLogo.iclineright} style={styles.iclineright} />
              </View>
              <Text style={styles.jmlProduk}>{DATA[1].jumlah} Produk</Text>
            </Pressable>
            <View style={{borderWidth:toDp(0.5), borderColor:'grey'}} />

            <Pressable style={styles.btnKategori} onPress={() => alert('Coba berhasil gak')} >
              <View style={styles.button}>
                <Text style={styles.txtKategori}>{DATA[2].produk}</Text>
                <Image source={allLogo.iclineright} style={styles.iclineright} />
              </View>
              <Text style={styles.jmlProduk}>{DATA[2].jumlah} Produk</Text>
            </Pressable>
            <View style={{borderWidth:toDp(0.5), borderColor:'grey'}} />

            <Pressable style={styles.btnKategori} onPress={() => alert('Coba berhasil gak')} >
              <View style={styles.button}>
                <Text style={styles.txtKategori}>{DATA[3].produk}</Text>
                <Image source={allLogo.iclineright} style={styles.iclineright} />
              </View>
              <Text style={styles.jmlProduk}>{DATA[3].jumlah} Produk</Text>
            </Pressable>
            <View style={{borderWidth:toDp(0.5), borderColor:'grey'}} />

            <Pressable style={styles.btnKategori} onPress={() => alert('Coba berhasil gak')} >
              <View style={styles.button}>
                <Text style={styles.txtKategori}>{DATA[4].produk}</Text>
                <Image source={allLogo.iclineright} style={styles.iclineright} />
              </View>
              <Text style={styles.jmlProduk}>{DATA[4].jumlah} Produk</Text>
            </Pressable>
            <View style={{borderWidth:toDp(0.5), borderColor:'grey'}} />

            <Pressable style={styles.btnKategori} onPress={() => alert('Coba berhasil gak')} >
              <View style={styles.button}>
                <Text style={styles.txtKategori}>{DATA[5].produk}</Text>
                <Image source={allLogo.iclineright} style={styles.iclineright} />
              </View>
              <Text style={styles.jmlProduk}>{DATA[5].jumlah} Produk</Text>
            </Pressable>
            <View style={{borderWidth:toDp(0.5), borderColor:'grey'}} />

            <Pressable style={styles.btnKategori} onPress={() => alert('Coba berhasil gak')} >
              <View style={styles.button}>
                <Text style={styles.txtKategori}>{DATA[6].produk}</Text>
                <Image source={allLogo.iclineright} style={styles.iclineright} />
              </View>
              <Text style={styles.jmlProduk}>{DATA[6].jumlah} Produk</Text>
            </Pressable>
        </View>

    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  BodyKategori: {
    backgroundColor:'#E7E7E7',
    width:toDp(335),
    height:toDp(360),
    borderRadius:toDp(8),
    top:toDp(20),
    flexDirection:'column',
    justifyContent:'space-between',
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
    margin:toDp(10),
    marginBottom:toDp(3),
    bottom:toDp(4),
    borderRadius:toDp(8)
  },
  iclineright: {
    width:toDp(10),
    height:toDp(15)
  },
  button: {
    flexDirection:'row',
    justifyContent:'space-between',
  },
  jmlProduk: {
  
  }
});

export default Kategori;