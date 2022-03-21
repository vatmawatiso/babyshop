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
import BackHeader from '@BackHeader'
import NavigatorService from '@NavigatorService'
import { Card } from "react-native-paper";
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import NumericInput from 'react-native-numeric-input'
import CheckBox from '@react-native-community/checkbox';
import { color } from "react-native-reanimated";
import { ScrollView } from "react-native-gesture-handler";

const Keranjang = (props) => {
  // const countries = ["Besar", "Sedang", "Kecil", "Mini"]

  const [toggleCheckBox, setToggleCheckBox] = useState(false)

  const DATA = [
    {
      id: '2938492',
      tb: 'Jaya Abadi Bandung',
      kota: 'Bandung',
      produk: 'Gerobak',
      harga: 'Rp 500.000',
      image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp',
      total: '800.000'
    },
    {
      id: '2938492',
      tb: 'Jaya Abadi Bandung',
      kota: 'Bandung',
      produk: 'Gerobak',
      harga: 'Rp 500.000',
      image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    },
    {
      id: '2938492',
      tb: 'Jaya Abadi Bandung',
      kota: 'Bandung',
      produk: 'Gerobak',
      harga: 'Rp 500.000',
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
              <View style={{ flexDirection: 'row' }}>

                <CheckBox style={{ right: 7 }}
                  disabled={false}
                  value={toggleCheckBox}
                  onValueChange={(newValue) => setToggleCheckBox(newValue)}
                />

                <Text style={{ fontWeight: 'bold', marginLeft: toDp(1), top: toDp(6) }}>{item.tb}</Text>
              </View>
              <Text style={{ bottom: toDp(10), marginLeft: toDp(33) }}>{item.kota}</Text>
            </View>
            {/*Identitas produk*/}

            {/*Per produk*/}
            <View style={{ flexDirection: 'row', marginTop: toDp(20), marginBottom: toDp(20) }}>

              <CheckBox style={{ right: 7 }}
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
              />

              <View style={{ marginLeft: toDp(12) }}>
                <Image source={allLogo.icgerobak} />
              </View>

              <View style={{ marginLeft: toDp(12) }}>
                <Text style={{ fontSize: toDp(20), fontWeight: 'bold', marginBottom: toDp(5) }}>{item.produk}</Text>
                <Text style={{ fontSize: toDp(14), marginTop: toDp(10) }}>{item.harga}</Text>

                <View style={{ flexDirection: 'row', marginTop: toDp(25), justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={allLogo.ictrash} style={{ width: toDp(20), height: toDp(25), resizeMode: 'cover', marginRight: toDp(12) }} />
                  <NumericInput
                    minValue={toDp(1)}
                    maxValue={toDp(10)}
                    onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                    totalWidth={toDp(90)}
                    totalHeight={toDp(20)}
                    iconSize={toDp(25)}
                    step={toDp(1)}
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
        <FlatList style={{ width: '100%', top:toDp(110) }}
          data={DATA}
          renderItem={({ item, index }) => {
            return (
              RenderItem(item, index)
            )
          }}
          ListFooterComponent={() => <View style={{ height: toDp(110) }} />}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <BackHeader
        title={'Keranjang'}
        onPress={() => props.navigation.goBack()}
      />

      <View style={{justifyContent:'flex-end', bottom:toDp(5)}}>

      <View style={styles.chooseAll}>
        <CheckBox style={{ right: -2 }}
          disabled={false}
          value={toggleCheckBox}
          onValueChange={(newValue) => setToggleCheckBox(newValue)}
        />
        <Text style={{ right: toDp(85), fontSize: toDp(12) }}>Pilih Semua</Text>

        <Pressable style={styles.delete} onPress={() => alert('Yakin ingin dihapus ?')}>
          <Text style={{ right: toDp(15), fontWeight: 'bold' }}>Hapus</Text>
        </Pressable>
      </View>

      {/*Button Checkout*/}
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

      <CardProduct />
      </View>
    </View>

  )
};


const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  dropdown: {
    height: toDp(25),
    borderRadius: toDp(40),
    width: toDp(100),
  },
  content: {
    bottom: toDp(30),
    width: toDp(335),
    height: '100%',
    paddingVertical: 25,
  },
  chooseAll: {
    // marginBottom: toDp(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#C4C4C4',
    width: toDp(335),
    height: toDp(40),
    borderRadius: toDp(8),
    top: toDp(71),
    position: 'absolute',
    zIndex: 1

  },
  notProcessed: {
    marginBottom: toDp(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#C4C4C4',
    width: toDp(335),
    height: toDp(41),
    borderRadius: toDp(8)
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
    padding: toDp(8),
    borderRadius: toDp(10),
    width: 335,
    paddingBottom: toDp(10),
    backgroundColor: '#C4C4C4'
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
    borderRadius: toDp(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    // top: toDp(20),
    width: toDp(335),
    position: 'absolute',
    zIndex: 1
  },
  buttonTotal: {
    // backgroundColor: 'red',
    borderRadius: toDp(15),
    width: toDp(160),
    height: toDp(50),
    // right:toDp(12)
  },
  buttonPay: {
    // backgroundColor: 'red',
    borderRadius: toDp(15),
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
