import React, { Component, useState, useEffect, } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TextInput,
  SafeAreaView,
  Pressable,
  ScrollView, 
  FlatList,
  AsyncStorage
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import Back from '@Back'
import NavigatorService from '@NavigatorService'
import axios from "axios";
import { Card } from "react-native-paper";
import CryptoJS from "crypto-js";
import { payment } from "../../Configs/payment";
import NumberFormat from "react-number-format";
import Collapsible from 'react-collapsible';
import CollapsibleView from "@eliav2/react-native-collapsible-view";
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from "accordion-collapse-react-native";

const Pembayaran = (props) => {

  // POST DATA KE PAYMENT IPAYMU

  const [state, setState] = useState({
    datas: [],
    bank:'',
  })

  let i = state.datas;

  const pad2 = (n) => { return n < 10 ? '0' + n : n }

  useEffect(() => {
    getPaymentway()
  }, [])

  const getPaymentway = () => {
    // generate time
    let date = new Date();
    let newDte = date.getFullYear().toString() + pad2(date.getMonth() + 1) + pad2(date.getDate()) + pad2(date.getHours()) + pad2(date.getMinutes()) + pad2(date.getSeconds());

    const data = {
      va: 'cesa'
    }

    //generate signature
    var bodyEncrypt = CryptoJS.SHA256(JSON.stringify(data));
    var stringtosign = "POST:" + payment.va + ":" + bodyEncrypt + ":" + payment.apikey;
    var signature = CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(stringtosign, payment.apikey));
    console.log('date', stringtosign);

    const headers = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'signature': signature,
        'va': payment.va,
        'timestamp': newDte
      }
    }

    axios.post(payment.url + 'payment-method-list', data, headers)
      .then(response => {
        console.log('PYAMENT LIST = ' + JSON.stringify(response.data.Data));
        console.log('BANK = ' + JSON.stringify(response.data.Data[0]?.Channels[0]?.Code));
        console.log('DESKRIPSI = ' + JSON.stringify(response.data.Data[0].Channels[0].Description));
        console.log('PAYMENT INTRUKSI = ' + JSON.stringify(response.data.Data[0].Channels[0].PaymentIntrucionsDoc));

        console.log('Transaksi Fee = ' + JSON.stringify(response.data.Data[0].Channels[0].TransactionFee?.ActualFee));
        console.log('ActualFeeType = ' + JSON.stringify(response.data.Data[0].Channels[0].TransactionFee?.ActualFeeType));
        console.log('AdditionalFee = ' + JSON.stringify(response.data.Data[0].Channels[0].TransactionFee?.AdditionalFee));

        setState(state => ({ ...state, datas: response.data.Data }))


        console.log('List Datas = ' + JSON.stringify(state.datas));
      })
      .catch(error => {

        console.log('----->', error.response);
      });
  }



  const iconBank = (val) =>{
    let logo = '';
    if(val=='bag'){
      logo = allLogo.arta
    }else if(val=='bca'){
      logo = allLogo.bca
    }else if(val=='bni'){
      logo = allLogo.bni
    }else if(val=='cimb'){
      logo = allLogo.cimb
    }else if(val=='mandiri'){
      logo = allLogo.mandiri
    }else if(val=='bmi'){
      logo = allLogo.muamalat
    }else if(val=='bri'){
      logo = allLogo.bri
    }else if(val=='bsi'){
      logo = allLogo.bsi
    }else if(val=='permata'){
      logo = allLogo.permata
    }else if(val=='alfamart'){
      logo = allLogo.alfamart
    }else if(val=='indomaret'){
      logo = allLogo.indomart
    }else if (val=='rpx'){
      logo = allLogo.arta
    }else if(val=='akulaku'){
      logo = allLogo.akulaku
    }else if(val=='qris'){
      logo = allLogo.qris
    }
    return logo;
  }


  const listVa = (item, i) => {
    let name = '';
    if(item.Description=='VA BAG') {
      name = 'VA Bank Artha Graha'
    }else{
      name = item.Description
    }
    return (
      <Pressable  onPress={()=> sendBack(item.Code, item.TransactionFee.ActualFee, name, props.navigation.state.params.from)}>
        <View style={styles.viewlistVa}>
          <View style={{ flexDirection: 'row', marginLeft: toDp(10) }}>
            <View style={{ width: toDp(30), height: toDp(30), marginRight: toDp(12), }}>
              <Image source={iconBank(item.Code)} style={{ width: 70, height: 40, borderColor: '#000', marginTop: toDp(10) }} />
            </View>
            <Text style={{marginLeft:toDp(50), marginTop:toDp(5)}}>
              {
                item.Description == 'VA BAG' ? 'Bank Artha Graha' : name
              }
            </Text>
          </View>
          <NumberFormat
            value={item.TransactionFee.ActualFee}
            displayType={'text'}
            thousandSeparator={'.'}
            decimalSeparator={','}
            prefix={'Rp. '}
            renderText={formattedValue => <Text style={{ marginBottom: toDp(5), color: '#F83308', fontWeight: '800', marginLeft: toDp(102) }}>Biaya {formattedValue}</Text>} // <--- Don't forget this!
          />
        </View>
      </Pressable>
    )
  }

  const listPayment = (item, i) => {
    let name = '';
    if(item.Description=='Alfamart/Alfamidi') {
      name = 'Alfamart/Alfamidi'
    }else{
      name = item.Description
    }
    return (
      <Pressable  onPress={()=> sendBack(item.Code, item.TransactionFee.ActualFee, name, props.navigation.state.params.from)}>
        <View style={styles.viewlistVa}>

          <View style={{ flexDirection: 'row', marginLeft: toDp(10) }}>
            <View style={{ width: toDp(30), height: toDp(30), marginRight: toDp(12) }}>
              <Image source={iconBank(item.Code)} style={{ width: 70, height: 40, borderColor: '#000', marginTop: toDp(10) }} />
            </View>
            <Text  style={{marginLeft:toDp(50), marginTop:toDp(5)}}>
              {
                item.Description == 'qris' ? 'QRIS' : name
              }
            </Text>
          </View>
          <NumberFormat
            value={item.TransactionFee.ActualFee}
            displayType={'text'}
            thousandSeparator={'.'}
            decimalSeparator={','}
            prefix={'Rp. '}
            renderText={formattedValue => <Text style={{ marginBottom: toDp(5), color: '#F83308', fontWeight: '800', marginLeft: toDp(102) }}>Biaya {formattedValue}</Text>} // <--- Don't forget this!
          />
        </View>
      </Pressable>
    )
  }

  const ListBank = (i, index) => {
    return (
      <View style={{ backgroundColor: '#fff', top:toDp(0) }}>
        <Text style={{ fontSize: 18, marginBottom: 0, marginTop: toDp(2), marginLeft: toDp(0) }}>{i.Description}</Text>

        {i.Code == 'va' ?
          <View>
            <Collapse style={{ backgroundColor: '#fff', top: 5 }}>
              <CollapseHeader>
                <View style={{
                  backgroundColor: '#fff', marginBottom: toDp(10), height: toDp(60), width: toDp(325), marginLeft: toDp(2), borderRadius: toDp(10), alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,

                  elevation: 2
                }}>
                  <Text style={{ color: 'grey', marginLeft: 10, }}>Lihat Selengkapnya</Text>
                  <Image source={allLogo.iclineblack} style={styles.iclineright} />
                </View>
              </CollapseHeader>
              <CollapseBody>
                <FlatList
                  data={i.Channels}
                  renderItem={({ item, i }) => {

                    return (
                      listVa(item, i, () => selectPayment(item.Code),)
                    )

                  }}
                  ListFooterComponent={() => <View style={{ height: 1, width: 1 }} />}
                />
              </CollapseBody>
            </Collapse>
          </View>

          :
          <View>
            <Collapse style={{ backgroundColor: '#fff', top: 5 }}>
              <CollapseHeader>
                <View style={{
                  backgroundColor: '#fff', marginBottom: toDp(10), height: toDp(60), width: toDp(325), marginLeft: toDp(2), borderRadius: toDp(10), alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,

                  elevation: 2
                }}>
                  <Text style={{ color: 'grey', marginLeft: 10, }}>Lihat Selengkapnya</Text>
                  <Image source={allLogo.iclineblack} style={styles.iclineright} />
                </View>
              </CollapseHeader>
              <CollapseBody>
                <FlatList
                  data={i.PaymentMethod}
                  renderItem={({ item, i }) => {

                    return (
                      listPayment(item, i)
                    )

                  }}
                  ListFooterComponent={() => <View style={{ height: 1, width: 1 }} />}
                />
              </CollapseBody>
            </Collapse>
          </View>

        }

      </View>

    )
  }

  const sendBack = (code, fee, name, to) => {
    if(to=='belilangsung'){
      let data = {
         code_payment : code,
         name : name,
         fee : fee
      }
       AsyncStorage.setItem('paymentMethode', JSON.stringify(data))
       NavigatorService.navigate('Checkout');
       console.log('Pembayaran : '+ code+' | '+ fee + ' | '+ name);
    }else{
 
    }
  }

  return (
    <View style={styles.container}>
      <Back
        title={'Metode Pembayaran'}
        onPress={() => props.navigation.goBack()}
      />

      <Card style={styles.paragraph}>
        <View style={{ flexDirection: 'row', }}>
          <Image source={allLogo.wallet} style={{ width: toDp(25), height: toDp(20), tintColor: '#F83308', top: toDp(3), marginBottom: toDp(0) }} />
          <Text style={{ fontSize: 16, marginLeft: 10, marginTop: 5, }}>Pilih Metode Pembayaran</Text>
        </View>
        <FlatList
          data={state.datas}
          renderItem={({ item, index }) => (
            ListBank(item, index)
          )
          }
          keyExtractor={(item) => item.Code}
          ListFooterComponent={() => <View style={{ height: 100, width: 100, }} />}
        />
      </Card>

      <View style={{ position: 'relative', bottom: 0, alignItems: 'center', justifyContent: 'center', width: '100%', backgroundColor:'cyan' }}>
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
  iclineright: {
    width: toDp(18),
    height: toDp(18),
    tintColor: '#F83308',
    marginRight: 10
  },
  viewlistVa: {
    width: toDp(325),
    padding: toDp(7),
    borderRadius: toDp(5),
    backgroundColor: '#FFF',
    marginBottom: toDp(7),
    margin: 5,
    right: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
  },
  paragraph: {
    padding: 15,
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#FFF',
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
    borderRadius: toDp(10),
    width: toDp(335),
    height: toDp(48),
    justifyContent: 'center',
    bottom: toDp(5)
  },
  txtKonfirm: {
    textAlign: 'center',
    color: 'white'
  }
});

export default Pembayaran;