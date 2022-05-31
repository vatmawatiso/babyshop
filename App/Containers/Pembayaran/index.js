import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TextInput,
  SafeAreaView,
  Pressable,
  ScrollView, FlatList
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import Back from '@Back'
import CheckBox from '@react-native-community/checkbox';
import NavigatorService from '@NavigatorService'
import axios from "axios";
import { RadioButton } from 'react-native-paper';
import { typeParameterDeclaration } from "@babel/types";

const Pembayaran = (props) => {

  const [state, setState] = useState({
    datas: [],
  })

  useEffect(() => {
    getPayment()
  }, [])

  const getPayment = () => {
    axios.get('https://market.pondok-huda.com/dev/react/payment/')
      .then(result => {
        //hendle success
        setState(state => ({ ...state, datas: result.data.data }))
        console.log('Toko Bangunan ===> ' + JSON.stringify(result.data.data));

      }).catch(err => {
        alert('Gagal menerima data dari server!' + err)
        setState(state => ({ ...state, loading: false }))
      })
  }

  const [toggleCheckBox, setToggleCheckBox] = useState(false)

  const Address = [
    {
      id: '1',
      nama: 'Vatmawati',
      telepon: '083141520987',
      alamat: 'Jl KiSulaiman Kota Cirebon Jawa Barat '
    },
  ]
  const DATA = [
    {
      id: '1',
      img: 'https://www.freepnglogos.com/uploads/logo-bca-png/bank-central-asia-logo-bank-central-asia-bca-format-cdr-png-gudril-1.png',
      pesan: 'Transaksi Pembayaran\nHanya menerima dari Bank BCA\nMetode pembayaran lebih mudah',
    }, {
      id: '2',
      img: 'https://www.freepnglogos.com/uploads/logo-bca-png/bank-central-asia-logo-bank-central-asia-bca-format-cdr-png-gudril-1.png',
      pesan: 'Transaksi Pembayaran\nHanya menerima dari Bank BCA\nMetode pembayaran lebih mudah',
    }, {
      id: '3',
      img: 'https://www.freepnglogos.com/uploads/logo-bca-png/bank-central-asia-logo-bank-central-asia-bca-format-cdr-png-gudril-1.png',
      pesan: 'Transaksi Pembayaran\nHanya menerima dari Bank BCA\nMetode pembayaran lebih mudah',
    }, {
      id: '4',
      img: 'https://www.freepnglogos.com/uploads/logo-bca-png/bank-central-asia-logo-bank-central-asia-bca-format-cdr-png-gudril-1.png',
      pesan: 'Transaksi Pembayaran\nHanya menerima dari Bank BCA\nMetode pembayaran lebih mudah',
    }, {
      id: '5',
      img: 'https://www.freepnglogos.com/uploads/logo-bca-png/bank-central-asia-logo-bank-central-asia-bca-format-cdr-png-gudril-1.png',
      pesan: 'Transaksi Pembayaran\nHanya menerima dari Bank BCA\nMetode pembayaran lebih mudah',
    },
  ]

  const [checked, setChecked] = React.useState('first');

  const ListBank = (item, index) => {
    return (
      <View style={{ marginTop: toDp(0), width: '100%' }}>
        <View style={{ flexDirection: 'row', marginHorizontal: toDp(15), height: toDp(80), alignItems: 'center', }}>
          {/* <CheckBox style={{ marginLeft: -20 }}
            disabled={false}
            value={toggleCheckBox}
            onValueChange={(newValue) => setToggleCheckBox(newValue)}
          /> */}
    
            <RadioButton
              value="first"
              status={checked === 'first' ? 'checked' : 'unchecked'}
              onPress={() => BayarPake()}
            />

          <Image source={{ uri: DATA[0].img }} style={{ width: toDp(70), height: toDp(40), left: toDp(0) }} />
          <Text style={{ fontSize: toDp(12), left: toDp(20) }}>{item.pay_name}</Text>
        </View>
        {/* <Text style={{ fontSize: toDp(12), left: toDp(0) }}>{DATA[0].pesan}</Text> */}
        <View style={{ borderWidth: toDp(0.5), borderColor: 'grey', bottom: toDp(0), width: toDp(335) }} />
      </View>
    )
  }


  return (
    <View style={styles.container}>
      <Back
        title={'Metode Pembayaran'}
        onPress={() => props.navigation.goBack()}
      />
      <View style={{ top: toDp(10), justifyContent: 'center', alignItems: 'center' }}>

        <View style={{
          width: '100%',
          paddingHorizontal: toDp(30),
          flexDirection: 'row',
          justifyContent: 'flex-start',
          marginTop: toDp(40)
        }}>
          <Image source={allLogo.ictransfer} style={styles.ictransfer} />
          <Text style={styles.txtTransfer}>Transaksi Pembayaran</Text>
        </View>

        <View style={{ marginTop: toDp(5) }}>
          <FlatList
            numColumns={1}
            data={state.datas}
            renderItem={({ item, index }) => {
              return (
                ListBank(item, index)
              )
            }}
            ListFooterComponent={() => <View style={{ height: toDp(100), width: toDp(335) }} />}
          />
        </View>
      </View>

      <View style={{ position: 'absolute', bottom: 0, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <Pressable style={[styles.btnKonfirm, { width: toDp(335) }]} onPress={() => NavigatorService.navigate('Infopembayaran')}>
          <Text style={styles.txtKonfirm}>Konfirmasi</Text>
        </Pressable>
      </View>

    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    // top:toDp(50),
    flex: 1,

  },

  txtTransfer: {
    fontWeight: 'bold',
    left: toDp(10),
    bottom: toDp(3)
  },
  ictransfer: {

    left: toDp(0)
  },
  icBCA: {
    bottom: toDp(10)
  },
  txtBCA: {
    bottom: toDp(24),
    left: toDp(30)
  },
  icMANDIRI: {
    top: toDp(10)
  },
  txtMANDIRI: {
    left: toDp(17),
    bottom: toDp(10)
  },
  icBNI: {
    top: toDp(10)
  },
  txtBNI: {
    left: toDp(30),
  },
  icBRI: {
    top: toDp(25)
  },
  txtBRI: {
    left: toDp(30),
    top: toDp(13)
  },
  icBSI: {
    top: toDp(30),
    right: toDp(8)
  },
  txtBSI: {
    left: toDp(11),
    top: toDp(23)
  },
  icPERMATA: {
    top: toDp(40),
    right: toDp(1)
  },
  txtPERMATA: {
    left: toDp(22),
    top: toDp(30)
  },
  btnKonfirm: {
    backgroundColor: '#2A334B',
    borderRadius: toDp(15),
    width: toDp(335),
    height: toDp(40),
    justifyContent: 'center',
    bottom: toDp(5)
  },
  txtKonfirm: {
    textAlign: 'center',
    color: 'white'
  }
});

export default Pembayaran;