import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  StatusBar,
  ImageBackground,
  Pressable
} from "react-native";
import { allLogo } from '@Assets';
import NavigatorService from '@NavigatorService'
import { toDp } from '@percentageToDP';
import NumberFormat from 'react-number-format';

const Diproses = () => {
  const DATA = [
    {
      id: '2938492',
      tb: 'Jaya Abadi Bandung',
      diproses: 'Perlu Dikirim',
      produk: 'Gerobak Pasir',
      harga: 'Rp 500.000',
      jumlah: '2',
      total: 'Rp 800.0000',
      bataswaktu: '13 Januari 2022',
      metodePembayaran: 'Bank Mandiri',
      konfirmasi: 'Dibatalkan Pembeli',
      image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    },
  ]

  return (
    <View style={styles.container}>

      <View style={styles.information}>
        <Text style={styles.txtInformation1}>{DATA[0].tb}</Text>
        <Text style={{ color: '#6495ED', right: toDp(5) }}>{DATA[0].diproses}</Text>
      </View>

      <View style={{ borderWidth: toDp(0.5), borderColor: 'grey', left: toDp(12), width: toDp(335), top: toDp(30) }} />

      <View style={styles.OrderDetail}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Image source={allLogo.icgerobak} style={styles.icAddress} />
          <Text style={{ top: toDp(20), right: toDp(40) }}>{DATA[0].produk}</Text>
          <Text style={{ top: toDp(80), right: toDp(10) }}>{DATA[0].jumlah}x</Text>
        </View>
        <NumberFormat
          value={DATA[0].harga}
          displayType={'text'}
          thousandSeparator={'.'}
          decimalSeparator={','}
          prefix={'Rp. '}
          renderText={formattedValue => <Text style={{ color: '#F83308', fontWeight: '800', marginRight: toDp(5), bottom: toDp(50), left: toDp(128) }}>{formattedValue}</Text>} // <--- Don't forget this!
        />
        {/* <Text style={{bottom:toDp(50), left:toDp(128)}}>{DATA[0].harga}</Text> */}
        <View style={{ borderWidth: toDp(0.5), borderColor: 'grey', bottom: toDp(20) }} />

        <Pressable style={{ bottom: toDp(18) }} onPress={() => NavigatorService.navigate('Orderdetail')}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: toDp(5) }}>
            <Text style={styles.txtCard}>{DATA[0].jumlah} Produk</Text>
            <NumberFormat
              value={DATA[0].total}
              displayType={'text'}
              thousandSeparator={'.'}
              decimalSeparator={','}
              prefix={'Rp. '}
              renderText={formattedValue => <Text style={{ color: '#F83308', fontWeight: '800', left: toDp(65) }}>{formattedValue}</Text>} // <--- Don't forget this!
            />
            {/* <Text style={{ left: toDp(65) }}>{DATA[0].total}</Text> */}
            <Image source={allLogo.iclineblack} style={{ width: toDp(10), height: toDp(12), top: toDp(5), right: toDp(5) }} />
          </View>
        </Pressable>
        <View style={{ borderWidth: toDp(0.5), borderColor: 'grey', bottom: toDp(15) }} />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: toDp(5), bottom: toDp(5) }}>
          <Text style={{ fontSize: toDp(12), bottom: toDp(8) }}>Kirim sebelum {DATA[0].bataswaktu}{"\n"}</Text>
        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexDirection: 'row',
  },
  txtOrder: {
    margin: toDp(7),
    bottom: toDp(40),
  },
  information: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: toDp(50),
    padding: toDp(10),
    top: toDp(40)
  },
  txtInformation1: {
    fontWeight: 'bold',
    marginHorizontal: toDp(5)
  },
  OrderDetail: {
    backgroundColor: '#F9F8F8',
    borderRadius: toDp(10),
    width: toDp(335),
    height: toDp(190),
    left: toDp(12),
    top: toDp(40),
    padding: toDp(10),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  buttonPay: {
    backgroundColor: '#2A334B',
    borderRadius: toDp(10),
    width: toDp(97),
    height: toDp(34),
    fontSize: toDp(11),
    justifyContent: 'center',
    bottom: toDp(8),
  },
  txtButtonPay: {
    color: 'white',
    fontSize: toDp(12),
    textAlign: 'center'
  }
});

export default Diproses;
