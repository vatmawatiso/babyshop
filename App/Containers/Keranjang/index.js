import React, { Picker, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Button,
  Modal,
  StatusBar,
  ImageBackground,
  Pressable,
  FlatList
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import Header from '@Header'
import NavigatorService from '@NavigatorService'
import { Card } from "react-native-paper";
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import NumericInput from 'react-native-numeric-input'
import CheckBox from '@react-native-community/checkbox';
import { color } from "react-native-reanimated";
import { ScrollView } from "react-native-gesture-handler";
import NumberFormat from 'react-number-format';
 
const Keranjang = (props) => {
  // const countries = ["Besar", "Sedang", "Kecil", "Mini"]
 
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
 
  const DATA = [
    {
      id: '2938492',
      tb: 'Jaya Abadi Bandung',
      kota: 'Bandung',
      produk: 'Gerobak',
      harga: '500000',
      image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp',
      total: '800.000'
    },
    {
      id: '2938492',
      tb: 'Jaya Abadi Bandung',
      kota: 'Bandung',
      produk: 'Gerobak',
      harga: '500000',
      image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    },
    {
      id: '2938492',
      tb: 'Jaya Abadi Bandung',
      kota: 'Bandung',
      produk: 'Gerobak',
      harga: '500000',
      image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    },
  ]
 
  const RenderItem = (item, index) => {
    return (
      <View style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.orderCart}>
 
          {/*produk dari setiap toko*/}
          <View style={styles.orderCartone}>
            {/*Identitas produk*/}
            <View style={{ width: '100%', height: toDp(40) }}>
                <Text style={{ fontWeight: 'bold', marginLeft: toDp(1), top: toDp(6) }}>{item.tb}</Text>
              <Text style={{marginTop: toDp(5)}}>{item.kota}</Text>
            </View>
            {/*Identitas produk*/}
 
            {/*Per produk*/}
            <View style={{ flexDirection: 'row', marginTop: toDp(20), marginBottom: toDp(20) }}>
 
 
              <View style={{ marginLeft: toDp(12) }}>
                <Image source={allLogo.icgerobak} />
              </View>
 
              <View style={{ marginLeft: toDp(12) }}>
                <Text style={{ fontSize: toDp(20), fontWeight: 'bold', marginBottom: toDp(5) }}>{item.produk}</Text>
                {/* <Text style={{ fontSize: toDp(14), marginTop: toDp(10) }}>{item.harga}</Text> */}
                <NumberFormat
                value={item.harga}
                displayType={'text'}
                thousandSeparator={'.'}
                decimalSeparator={','}
                prefix={'Rp. '}
                renderText={formattedValue => <Text style={{color: '#F83308', fontWeight: '800'}}>{formattedValue}</Text>} // <--- Don't forget this!
              />
 
                <View style={{ flexDirection: 'row', marginTop: toDp(25), justifyContent: 'center', alignItems: 'center' }}>
                  <Pressable onPress={() => alert('Yakin ingin hapus produk?')}>
                  <Image source={allLogo.ictrash} style={{ width: toDp(20), height: toDp(25), resizeMode: 'cover', marginRight: toDp(12) }} />
                  </Pressable>
                  
                  <NumericInput
                    minValue={1}
                    maxValue={10}
                    onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                    totalWidth={toDp(90)}
                    totalHeight={toDp(20)}
                    iconSize={toDp(25)}
                    step={1}
                    valueType='real'
                    rounded
                    textColor='black'
                    inputStyle={{ backgroundColor: 'white' }}
                    iconStyle={{ color: 'white' }}
                    rightButtonBackgroundColor='#698498'
                    leftButtonBackgroundColor='#698498'
                  />
                </View>
 
              </View>
            </View>
 
 
            {/*Per produk*/}
 
          </View>
          {/*produk dari setiap toko*/}
 
        </View>
 
 
      </View>
 
    )
 
  };
 
  const CardProduct = () => {
    return (
      <View style={styles.content}>
        <FlatList style={{ width: toDp(335), top:toDp(10),marginBottom: toDp(70)  }}
          data={DATA}
          renderItem={({ item, index }) => {
            return (
              RenderItem(item, index)
            )
          }}
          ListFooterComponent={() => <View style={{ height: toDp(10) }} />}
        />
      </View>
    )
  }
 
  return (
    <View style={styles.container}>
      <Header
        title={'Keranjang'}
        onPress={() => props.navigation.goBack()}
      />
 
      <View style={{bottom:toDp(5)}}>
 
        <View style={styles.chooseAll}>
 
          <Pressable style={styles.delete} onPress={() => alert('Yakin ingin hapus semua produk?')}>
            <Text style={{marginLeft: toDp(10) ,fontWeight: 'bold' }}>Hapus Semua</Text>
          </Pressable>
        </View>
 
        <View style={{marginTop:toDp(10), marginBottom: toDp(90)}}>
            <CardProduct />
        </View>
 
      {/*Button Checkout*/}
        <View style={{ zIndex: 9,  position:'absolute', bottom:95}}>
          <View style={styles.checkout}>
            <Pressable style={styles.buttonTotal}>
              <Text style={styles.txtTotal}>Total Harga</Text>
              <Text style={{ color: 'white', fontSize: toDp(18), textAlign: 'center' }}>{DATA[0].total}</Text>
            </Pressable>
 
            <View style={{ borderWidth: toDp(0.5), borderColor: 'white' }} />
 
            <Pressable style={styles.buttonPay} onPress={() => NavigatorService.navigate('Checkout')}>
              <Text style={styles.txtPay}>Beli Sekarang</Text>
            </Pressable>
          </View>
        </View>
 
      </View>
    </View>
 
  )
};
 
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  dropdown: {
    height: toDp(25),
    borderRadius: toDp(10),
    width: toDp(100),
  },
  content: {
    marginBottom: toDp(30),
    width: toDp(335),
    height: '100%',
    paddingVertical: 25,
  },
  chooseAll: {
    // marginBottom: toDp(5),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    width: toDp(320),
    height: toDp(40),
    borderRadius: toDp(10),
    top: toDp(10),
    position: 'absolute',
    zIndex: 1,
    padding: toDp(10),
    left: toDp(7),
    bottom: toDp(5),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
 
 
  },
  notProcessed: {
    marginBottom: toDp(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    width: toDp(335),
    height: toDp(41),
    borderRadius: toDp(20)
  },
  // orderCart: {
  //   paddingBottom:toDp(30),
  //   backgroundColor: 'cyan',
  //   width: '100%',
  //   borderRadius: toDp(8),
 
  // },
  ickotak: {
    marginTop: toDp(11),
    left: toDp(8)
  },
  detailCart: {
    height: toDp(30),
    width: toDp(60)
  },
  orderCartone: {
    padding: toDp(15),
    marginTop: toDp(5),
    borderRadius: toDp(10),
    width: toDp(320),
    paddingBottom: toDp(10),
    backgroundColor: '#F7F7F7',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  txtp: {
    fontSize: toDp(25),
    top: toDp(-7),
    padding: toDp(0),
    marginTop: toDp(-2)
  },
  btnp: {
    width: toDp(35),
    height: toDp(30),
    top: toDp(5),
    marginLeft: toDp(1)
  },
  spin: {
    marginLeft: toDp(-80),
    top: toDp(30),
  },
  inp: {
    width: toDp(30),
    height: toDp(35),
    padding: toDp(5),
    margin: toDp(0)
  },
  checkout: {
    backgroundColor: '#2A334B',
    borderRadius: toDp(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    // top: toDp(20),
    width: toDp(335),
  },
  buttonTotal: {
    // backgroundColor: 'red',
    borderRadius: toDp(20),
    width: toDp(160),
    height: toDp(50),
    // right:toDp(12)
  },
  buttonPay: {
    // backgroundColor: 'red',
    borderRadius: toDp(20),
    width: toDp(150),
    height: toDp(50),
    // left:toDp(8)
  },
  txtTotal: {
    textAlign: 'center',
    color: 'white',
    fontSize: toDp(16),
  },
  txtPay: {
    textAlign: 'center',
    color: 'white',
    fontSize: toDp(16),
    top: toDp(13)
  }
});
 
export default Keranjang;