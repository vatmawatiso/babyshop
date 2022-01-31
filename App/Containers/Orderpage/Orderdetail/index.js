import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  StatusBar,
  ImageBackground,
  Pressable
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import  Order  from '@Order'

const Orderdetail = (props) => {
  const DATA = [
    {
      id: '2938492',
      tb: 'Jaya Abadi Bandung',
      diproses: 'Selesai',
      produk: 'Gerobak Pasir',
      harga: 'Rp 500.000',
      jumlah: '2',
      total:'Rp 800.0000',
      konfirmasi: 'Dibatalkan Pembeli',
      pembayaran: 'BCA',
      image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    },
  ]

  const Pengiriman = [
    {
      id: '1',
      kurir: 'Rudi Prakasa',
      NoResi: '8344389479234',
    },
  ]

  const Address = [
    {
      id: '1',
      nama: 'Vatmawati',
      telepon: '083141520987',
      alamat: 'Jl KiSulaiman Kota Cirebon'
    },
  ]

return (
<View style={styles.container}>
    <Order 
        title={'Pesanan Saya'}
        onPress={() => props.navigation.goBack()}
    />
    <ScrollView contentContainerStyle={styles.contentContainer}>
    <View style={styles.information}>
        <Text style={{fontWeight:'bold', left:toDp(13)}}>{DATA[0].diproses}</Text>
    </View>

    <View style={styles.OrderDetail}>
        <Text style={styles.txtOrder}>{DATA[0].tb}</Text>
        <View style={{flexDirection:'row', justifyContent:'space-between', top:toDp(10)}}>
            <Image source={allLogo.icgerobak} style={styles.icAddress} />
            <Text style={{top:toDp(20), right:toDp(40)}}>{DATA[0].produk}</Text>
            <Text style={{top:toDp(80), right:toDp(10)}}>{DATA[0].jumlah}x</Text>
        </View>
        <Text style={{bottom:toDp(50), left:toDp(128)}}>{DATA[0].harga}</Text>
        <View style={{borderWidth:0.5, borderColor:'grey', bottom:toDp(10)}} />    

        <View style={{flexDirection:'row', justifyContent:'space-between', bottom:toDp(10), margin:toDp(5)}}>
            <Text style={styles.txtCard}>{DATA[0].jumlah} Produk</Text>
            <Text style={styles.txtCard}>{DATA[0].total}</Text>
        </View>
    </View>

    <Text style={{fontWeight:'bold', left:toDp(22), bottom:toDp(30)}}>Info Pengiriman</Text>

    <View style={styles.ShippingInfo}>
        <View style={{flexDirection:'row', justifyContent:'space-between', top:toDp(10)}}>
            <Text>Kurir</Text>
            <Text style={{right:toDp(130)}}>{Pengiriman[0].kurir}</Text>
        </View>
        <View style={{borderWidth:0.5, borderColor:'grey', right:toDp(10), width:toDp(314)}} />

        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={{bottom:toDp(10)}}>No Resi</Text>
            <Text style={{right:toDp(107), bottom:toDp(10)}}>{Pengiriman[0].NoResi}</Text>
        </View>
        <View style={{borderWidth:0.5, borderColor:'grey', right:toDp(10), width:toDp(314), bottom:toDp(18)}} />

        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={{bottom:toDp(25)}}>Alamat</Text>
            <Text style={{right:toDp(45), bottom:toDp(35), right:toDp(31), margin:toDp(10)}}>{Address[0].nama} {Address[0].telepon}{"\n"}{Address[0].alamat}</Text>
        </View>    
    </View>

    <Text style={{fontWeight:'bold', left:toDp(22), bottom:toDp(10)}}>Rincian Pembayaran</Text>

    <View style={styles.PaymentDetails}>
        <View style={{flexDirection:'row', justifyContent:'space-between', margin:toDp(10),}}>
            <Text style={{right:toDp(10)}}>Metode Pembayaran</Text>
            <Text>{DATA[0].pembayaran}</Text>
        </View>

        <View style={{flexDirection:'row', justifyContent:'space-between', margin:toDp(10),}}>
            <Text style={{right:toDp(10)}}>Sub Total Produk</Text>
            <Text>Rp 700.000</Text>
        </View>

        <View style={{flexDirection:'row', justifyContent:'space-between', margin:toDp(10),}}>
            <Text style={{right:toDp(10)}}>Sub Total Diskon</Text>
            <Text>Rp 50.000</Text>
        </View>

        <View style={{flexDirection:'row', justifyContent:'space-between', margin:toDp(10),}}>
            <Text style={{right:toDp(10)}}>Biaya Penanganan</Text>
            <Text>Rp 50.000</Text>
        </View>

        <View style={{borderWidth:0.5, borderColor:'grey', right:toDp(10), width:toDp(314), bottom:toDp(0)}} />

        <View style={{flexDirection:'row', justifyContent:'space-between', margin:toDp(10),}}>
            <Text style={{right:toDp(10), fontWeight:'bold'}}>Total Pembayaran</Text>
            <Text style={{fontWeight:'bold'}}>Rp 800.000</Text>
        </View>
    </View>
    </ScrollView>
    
</View>
)}

const styles = StyleSheet.create({
container: {
flex: 1,
top:toDp(50),
},
contentContainer: {
  paddingVertical: 60
},
content: {
  flexDirection:'row',
},
txtOrder: {
  margin:toDp(7),
  bottom:toDp(40),
},
information: {
  flexDirection:'row',
  justifyContent:'space-between',
  marginHorizontal:toDp(10),
  bottom:toDp(50),
},
txtOrder:{
  fontWeight:'bold',
  fontSize:toDp(12),
  left:toDp(8),
  top:toDp(8)
},
OrderDetail: {
  backgroundColor:'#C4C4C4',
  borderRadius:toDp(15),
  width:toDp(314),
  height:toDp(165),
  left: toDp(23),
  bottom:toDp(40)
},
buttonPay: {
  backgroundColor:'#2A334B',
  borderRadius:toDp(15),
  width:toDp(97),
  height:toDp(34),
  fontSize:toDp(11),
  justifyContent:'center',
  bottom:toDp(8),
},
txtButtonPay: {
  color:'white',
  fontSize:toDp(12),
  textAlign:'center'
},
ShippingInfo: {
    backgroundColor:'#C4C4C4',
    borderRadius:toDp(15),
    width:toDp(314),
    height:toDp(165),
    left: toDp(23),
    justifyContent:'space-between',
    paddingLeft:toDp(10),
    bottom:toDp(20)
},
PaymentDetails: {
  backgroundColor:'#C4C4C4',
  borderRadius:toDp(15),
  width:toDp(314),
  height:toDp(195),
  left: toDp(23),
  justifyContent:'space-between',
  paddingLeft:toDp(10),
}
});

export default Orderdetail;
