import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ImageBackground,
  Pressable,
  Systrace,
  ToastAndroid,
  AsyncStorage,
  BackHandler
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import Back from '@Back'
import { Card } from "react-native-paper";
import NavigatorService from '@NavigatorService'
import NumberFormat from 'react-number-format';
import Clipboard from '@react-native-clipboard/clipboard';
import QRCode from 'react-native-qrcode-svg';
import { svr } from "../../Configs/apikey";
import { payment } from "../../Configs/payment";
import axios from "axios";

const Infopembayaran = (props) => {
  const [src, setSrc] = useState(null);

  const DATA = {
    "SessionId": "1",
    "TransactionId": 71451,
    "ReferenceId": "1",
    "Via": "VA",
    "Channel": "BSI", //ALFAMART INDOMART
    "PaymentNo": "165993396242",
    "PaymentName": "IPaymu - PT GMJ GLOBAL ENERGY",
    "SubTotal": 224500,
    "Total": 224500,
    "Fee": 3500,
    "Expired": "2022-08-08 14:46:00",
    "Note": "", //terdapat note jika pembayaran via alfamart ,indomart
    //terdapat params berikiut jika pembayaran via QRIS
    "QrString": "00020101021226670016COM.NOBUBANK.WWW01189360050300000488870214041800000314060303UMI51440014ID.CO.QRIS.WWW0215ID20200814001730303UMI52045499530336054063385005802ID5920PT GMJ GLOBAL ENERGY6008Denpasar610515811627101140809000002181005192022080909330215053061920220809093302150530703A01630462DC",
    "QrImage": "https://sandbox.ipaymu.com/qr/71541",
    "QrTemplate": "https://sandbox.ipaymu.com/qr/template/71541"
  }

  const [state, setState] = useState({
    infoPembayaran: '',
    mb_id:''
  })


  //AMBIL DATA YANG DILEMPAT HALAMAN CHECKOUT
  useEffect(() => {

    let data = props.navigation.state.params.data;
    let from = props.navigation.state.params.from;
    setState(state => ({ ...state, infoPembayaran: data}))
    console.log('CALBAKK--->', JSON.stringify(from));

    console.log('set Checkout ----------->' + JSON.stringify(data));


    AsyncStorage.getItem('uid').then(uids => {
      let ids = uids;
      setState(state => ({
        ...state,
        mb_id: ids
      }))
    }).catch(err => {
      console.log('err', err)
    })

    const backAction = () => {
      BackGo(from)
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();


  }, [])

  const BackGo = (val) => {
    if (val == 'Orderpage') {
      NavigatorService.navigate('Orderpage', { content: 'Belum Dibayar', mb_id: state.mb_id })
    } else {
      NavigatorService.reset('Homepage')
    }

  }


  //GET LOGO BANK
  const iconBank = (v) => {
    let val = '';
    if (v){ v = v.toLowerCase();
        val=v;
    }else {console.log("string doesn't exist, look into it")}


    let logo = '';
    if (val == 'bag') {
      logo = allLogo.arta
    } else if (val == 'bca') {
      logo = allLogo.bca
    } else if (val == 'bni') {
      logo = allLogo.bni
    } else if (val == 'cimb') {
      logo = allLogo.cimb
    } else if (val == 'mandiri') {
      logo = allLogo.mandiri
    } else if (val == 'bmi') {
      logo = allLogo.muamalat
    } else if (val == 'bri') {
      logo = allLogo.bri
    } else if (val == 'bsi') {
      logo = allLogo.bsi
    } else if (val == 'permata') {
      logo = allLogo.permata
    } else if (val == 'alfamart') {
      logo = allLogo.alfamart
    } else if (val == 'indomaret') {
      logo = allLogo.indomart
    } else if (val == 'rpx') {
      logo = allLogo.arta
    } else if (val == 'akulaku') {
      logo = allLogo.akulaku
    } else if (val == 'qris') {
      logo = allLogo.qris
    }
    return logo;
  }


  const copy = (val) => {
    let data = '';
    let textFinal = val.replace(/\s/g, '');
    data = Clipboard.setString(textFinal)
    getcopy()
  }
  const getcopy = async () => {
    let text = await Clipboard.getString();
    let textFinal = text.replace(/\s/g, '');
    showToast()
  }



  const showToast = () => {
    ToastAndroid.show("Berhasil disalin", ToastAndroid.SHORT);
  };

  const QRcode = (val) => {
    return (
      <View style={{ padding: toDp(8), alignItems: 'center', marginVertical: toDp(12), backgroundColor: '#f3f3f3', borderRadius: toDp(5) }}>
        <QRCode
          size={150}
          value={val}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Back
        title={'Info Pembayaran'}
        onPress={() => BackGo(props.navigation.state.params.from)}
      />
      <View style={{ marginTop: toDp(10) }}>
        <View style={styles.bodyBayar}>
          <Text style={styles.txtTotal}>Total Pembayaran</Text>
          {/* <Text style={styles.txtHarga}>Rp {DATA[0].total}</Text> */}

          <NumberFormat
            value={state.infoPembayaran.Total}
            displayType={'text'}
            thousandSeparator={'.'}
            decimalSeparator={','}
            prefix={'Rp. '}
            renderText={formattedValue => <Text style={{
              color: '#F83308', fontWeight: '600', marginBottom: toDp(15),
              fontSize: toDp(20)
            }}>{formattedValue}</Text>} // <--- Don't forget this!
          />
          <Text style={styles.txtKet}>Bayaran Pesanan Sesuai Jumlah di atas</Text>
        </View>
        <View style={styles.bodyBank}>
          <View style={{ flexDirection: 'row', margin: toDp(10), padding: toDp(4), height: 30, justifyContent: 'space-between', alignItems: 'center' }}>
            {/*Image nya di sesuaikan*/}
            <Image source={iconBank(state.infoPembayaran.Channel)} style={{ width: 60, height: 18 }} />
            <Text style={styles.txtBank}>Bank {state.infoPembayaran.Channel} (Dicek Otomatis)</Text>

          </View>
          <View style={{ padding: toDp(10) }}>
            {state.infoPembayaran.Channel == 'QRIS' ?
              <View style={{ alignItems: 'center' }}>
                {QRcode(state.infoPembayaran.QrString)}
                <Text style={styles.txtNokers}>{state.infoPembayaran.PaymentName}</Text>
                <Text style={styles.txtKetNoker}>Lakukan pembayaran sebelum : </Text>
                <Text style={{ fontSize: toDp(17), fontWeight: 'bold', color: '#FF3939' }}>{state.Expired}</Text>
              </View>
              :
              <View>
                <Text style={styles.txtRekening}>Penerima</Text>
                <Text style={styles.txtNokers}>{state.infoPembayaran.PaymentName}</Text>
                <Text style={styles.txtRekening}>No Virtual Account</Text>
                <Pressable onPress={() => copy(state.infoPembayaran.PaymentNo)}>
                  <Text style={styles.txtNoker}>{state.infoPembayaran.PaymentNo}</Text>
                </Pressable>
                <Text style={styles.txtKetNoker}>Salin No. Rekening diatas untuk melakukan pembayaran</Text>
                <Text style={styles.txtKetNoker}>Lakukan pembayaran sebelum : </Text>
                <Text style={{ fontSize: toDp(17), fontWeight: 'bold', color: '#FF3939' }}>{state.Expired}</Text>
                {state.infoPembayaran.Channel == 'ALFAMART' || state.infoPembayaran.Channel == 'INDOMART' ?
                  <>
                    <Text style={styles.txtKetNoker}>{state.infoPembayaran.Note}</Text>
                  </>
                  :
                  <></>
                }
              </View>
            }




          </View>
        </View>
      </View>
      <View style={{ position: 'absolute', bottom: 0, alignItems: 'center', justifyContent: 'center', width: '100%', }}>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <Pressable style={styles.btnBayar} onPress={() => NavigatorService.navigate('Orderpage', { content: 'Belum Dibayar', mb_id: state.mb_id })}>
            <Text style={styles.txtBayar}>Cek Status</Text>
          </Pressable>
        </View>
      </View>

    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9'
  },
  bodyBayar: {
    backgroundColor: '#FFF',
    padding: toDp(20),
    width: toDp(335),
    marginBottom: toDp(10),
    left: toDp(12),
    borderRadius: toDp(10),
    shadowColor: "#B8B8B8",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 15,
  },
  txtTotal: {
    marginBottom: toDp(5),
    fontSize: toDp(15),
  },
  txtHarga: {
    margin: toDp(10),
    bottom: toDp(15),
    fontSize: toDp(24)
  },
  txtKet: {
    bottom: toDp(10),
    fontSize: toDp(13),
    color: '#0960A1'
  },
  bodyBank: {
    backgroundColor: '#FFF',
    width: toDp(335),
    left: toDp(12),
    top: toDp(10),
    padding: toDp(15),
    borderRadius: toDp(10),
    shadowColor: "#B8B8B8",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.0,
    shadowRadius: 1,
    elevation: 15,
  },
  txtBank: {
    color: '#44474E'
  },
  txtRekening: {
    fontSize: toDp(14),
    bottom: toDp(5),
    color: '#44474E',
    fontWeight: '600'
  },
  txtNoker: {
    fontSize: toDp(24),
    color: '#0960A1'
  },
  txtNokers: {
    fontSize: toDp(15),
    color: '#FF8716',
    marginBottom: toDp(15)
  },
  txtKetNoker: {
    marginTop: toDp(8),
    fontSize: toDp(12),
    color: '#44474E'
  },
  btnBayar: {
    backgroundColor: '#2A334B',
    borderRadius: toDp(10),
    width: toDp(335),
    height: toDp(48),
    justifyContent: 'center',
    bottom: toDp(15),
    marginHorizontal: toDp(5),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
  txtBayar: {
    color: 'white',
    textAlign: 'center'
  }


});

export default Infopembayaran;
