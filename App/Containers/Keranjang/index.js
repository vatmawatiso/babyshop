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
  Pressable
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import  Header  from '@Header'
import  BackHeader  from '@BackHeader'
import NavigatorService from '@NavigatorService'
import { Card } from "react-native-paper";
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import NumericInput from 'react-native-numeric-input'
import CheckBox from '@react-native-community/checkbox';
import { color } from "react-native-reanimated";

const Keranjang = (props) => {
  const countries = ["Besar", "Sedang", "Kecil", "Mini"]
  
  const [toggleCheckBox, setToggleCheckBox] = useState(false)

  const DATA = [
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
    <View >
        <View style={styles.chooseAll}>
            <CheckBox style={{right:-2}}
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
             />
            <Text style={{right: toDp(85), fontSize:toDp(12)}}>Pilih Semua</Text>

            <Pressable style={styles.delete} onPress={() => alert('Yakin ingin dihapus ?')}>
                <Text style={{right: toDp(15), fontWeight: 'bold'}}>Hapus</Text>
            </Pressable>
        </View>

        <View style={styles.notProcessed}>
            <Image source={allLogo.icsilang} style={{left: toDp(8)}} />
            <Text style={{right: toDp(33),marginLeft: toDp(25), fontSize:toDp(12)}}>Ada 7 barang yang tidak bisa diproses</Text>
            
            <Pressable style={styles.look}>
                <Text style={{right: toDp(15), fontWeight: 'bold'}}>Lihat</Text>
            </Pressable>
        </View>

        <View style={styles.orderCart}>

            {/*produk dari setiap toko*/}
            <View style={styles.orderCartone}>
                {/*Identitas produk*/}
                <View style={{width:'100%', height:toDp(40)}}>
                    <View style={{flexDirection:'row'}}>
                    
                          <CheckBox style={{right:7}}
                            disabled={false}
                            value={toggleCheckBox}
                            onValueChange={(newValue) => setToggleCheckBox(newValue)}
                          />
                      
                      <Text style={{fontWeight: 'bold', marginLeft:toDp(1), top:toDp(6)}}>{item[index].tb}</Text>
                    </View>
                      <Text style={{bottom: toDp(10), marginLeft:toDp(33)}}>{item[index].kota}</Text>
                </View>
                {/*Identitas produk*/}

                {/*Per produk*/}
                <View style={{flexDirection:'row', marginTop:toDp(20), marginBottom:toDp(20)}}>

                    <CheckBox style={{right:7}}
                        disabled={false}
                        value={toggleCheckBox}
                        onValueChange={(newValue) => setToggleCheckBox(newValue)}
                    />

                  <View  style={{marginLeft:toDp(12)}}>
                      <Image source={allLogo.icgerobak}/>
                  </View>

                  <View style={{marginLeft:toDp(12)}}>
                      <Text style={{fontSize:toDp(20), fontWeight:'bold', marginBottom:toDp(5)}}>{item[index].produk}</Text>
                      <SelectDropdown
                          buttonStyle={styles.dropdown}
                          buttonTextStyle={{fontSize:10}}
                          rowTextStyle={{fontSize:12}}
                          dropdownStyle={{borderRadius:7}}
                          defaultButtonText={'Varian'}
                          rowStyle={{height:35,padding:5}}
                          data={countries}
                          onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index)
                          }}
                          buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                          }}
                          rowTextForSelection={(item, index) => {
                            return item
                          }}
                          renderDropdownIcon={(isOpened) => {
                            return (
                              <FontAwesome
                                name={isOpened ? "chevron-up" : "chevron-down"}
                                color={"#444"}
                                size={12}
                              />
                            );
                          }}
                        />
                      <Text style={{fontSize:toDp(14), marginTop:toDp(10)}}>{item[index].harga}</Text>

                      <View style={{flexDirection:'row', marginTop:toDp(25), justifyContent:'center', alignItems:'center'}}>
                        <Image source={allLogo.ictrash} style={{width:toDp(20), height:toDp(25), resizeMode:'cover', marginRight:toDp(12)}}/>
                        <NumericInput  
                            minValue={1}
                            maxValue={10}
                            onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                            totalWidth={90} 
                            totalHeight={20} 
                            iconSize={25}
                            step={1}
                            valueType='real'
                            rounded 
                            textColor='black'
                            inputStyle={{backgroundColor:'white'}} 
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

        {/*Button Checkout*/}
        <View style={styles.checkout}>
            <Pressable style={styles.buttonTotal}>
                <Text style={styles.txtTotal}>Total Harga</Text>
            </Pressable>

            <Pressable style={styles.buttonPay} onPress={() => NavigatorService.navigate('Checkout')}>
                <Text style={styles.txtPay}>Beli Sekarang</Text>
            </Pressable>
        </View>
  </View>

  )

};

return (
  <View style={styles.container}>
    <BackHeader
      title={'Keranjang'}
      onPress={() => props.navigation.goBack()}
    />
    <View style={styles.content}>
      {RenderItem(DATA,0)}
    </View>
  </View>
)};


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  dropdown:{
    height:25,
    borderRadius:40,
    width:100,
  },
  content: {
    top: toDp(10)
  },
  chooseAll: {
    marginBottom: toDp(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#C4C4C4',
    width: toDp(335),
    height: toDp(41),
    borderRadius: toDp(8)
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
    padding:toDp(8),
    borderRadius: toDp(10),
    width: '100%',
    paddingBottom:toDp(10),
    backgroundColor:'#C4C4C4'
  },
  txtp:{
    fontSize:toDp(25),
    top:toDp(-7),
    padding:toDp(0),
    marginTop: toDp(-2)
  },
  btnp:{
    width:toDp(35),
    height:toDp(30),
    top:toDp(5),
    marginLeft:toDp(1)
  },
  spin:{
    marginLeft:toDp(-80),
    top:toDp(30),
  },
  inp:{
    width:toDp(30),
    height:toDp(35),
    padding:toDp(5),
    margin:toDp(0)
  },
  checkout: {
    // backgroundColor: 'cyan',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:toDp(165),
  },
  buttonTotal: {
    backgroundColor: '#2A334B',
    borderRadius:toDp(15),
    width:toDp(160),
    height:toDp(50),
  },
  buttonPay: {
    backgroundColor:'#2A334B',
    borderRadius:toDp(15),
    width:toDp(150),
    height:toDp(50),
  },
  txtTotal: {
    textAlign:'center',
    color:'white',
    fontSize:toDp(16),
  },
  txtPay: {
    textAlign:'center',
    color:'white',
    fontSize:toDp(16),
    top:toDp(13)
  }
});

export default Keranjang;
