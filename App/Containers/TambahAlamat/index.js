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
  ScrollView
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import  BackHeader  from '@BackHeader'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MapView, { Marker } from 'react-native-maps';
import NavigatorService from '@NavigatorService'

const TambahAlamat = (props) => {

  const countries = ["Jakarta", "Cirebon", "Bandung", "Kuningan"]

     return (
      <View style={styles.container}>
         <BackHeader
          title={'Tambah Alamat'}
          onPress={() => props.navigation.goBack()}
        />

        <Text style={styles.txtContact}>Kontak</Text>
          <View style={styles.content}>
              <SafeAreaView>
                  <TextInput 
                      left={toDp(3)}
                      top={toDp(4)}
                      width={toDp(310)}
                      height={toDp(40)}
                      borderRadius={toDp(15)}
                      backgroundColor={'white'}
                      autoCapitalize={'none'}
                      style={styles.textInput}
                      placeholder={'Nama'}
                      placeholderTextColor={'grey'}
                      // value={state.username}
                      // onChangeText={(text) => setState(state => ({...state, username: text })) }
                  />
                  <TextInput 
                      left={toDp(3)}
                      top={toDp(6)}
                      width={toDp(310)}
                      height={toDp(40)}
                      borderRadius={toDp(15)}
                      backgroundColor={'white'}
                      autoCapitalize={'none'}
                      style={styles.textInput}
                      placeholder={'Nomer HP'}
                      placeholderTextColor={'grey'}
                      // value={state.username}
                      // onChangeText={(text) => setState(state => ({...state, username: text })) }
                  />
              </SafeAreaView>
          </View>

        <Text style={styles.txtAlamat}>Alamat</Text>
          <View style={styles.inputAlamat}>
                <SafeAreaView>
                    <SelectDropdown
                          buttonStyle={styles.dropdown}
                          buttonTextStyle={{fontSize:toDp(12), color:'grey'}}
                          rowTextStyle={{fontSize:toDp(12)}}
                          dropdownStyle={{borderRadius:toDp(7)}}
                          rowStyle={{height:toDp(35),padding:toDp(5)}}
                          defaultButtonText={'Pilih Kota atau Kabupaten'}
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
                                size={toDp(12)}
                              />
                            );
                          }}
                    />
                    <TextInput 
                        left={toDp(3)}
                        top={toDp(6)}
                        width={toDp(310)}
                        height={toDp(40)}
                        borderRadius={toDp(15)}
                        backgroundColor={'white'}
                        autoCapitalize={'none'}
                        style={styles.textInput}
                        placeholder={'Tuliskan Detail Jalan'}
                        placeholderTextColor={'grey'}
                        // value={state.username}
                        // onChangeText={(text) => setState(state => ({...state, username: text })) }
                    />
                    <TextInput 
                        left={toDp(3)}
                        top={toDp(8)}
                        width={toDp(310)}
                        height={toDp(40)}
                        borderRadius={toDp(15)}
                        backgroundColor={'white'}
                        autoCapitalize={'none'}
                        style={styles.textInput}
                        placeholder={'Patokan'}
                        placeholderTextColor={'grey'}
                        // value={state.username}
                        // onChangeText={(text) => setState(state => ({...state, username: text })) }
                    />
                </SafeAreaView>
            </View>

            <Pressable>
                <View style={styles.searchSection}>
                    <Image style={styles.searchIcon} source={allLogo.icsearch} />
                    <TextInput
                        style={styles.input}
                        placeholder="Cari Lokasi"
                        underlineColorAndroid="transparent"
                        placeholderTextColor="white"
                        onChangeText={(text)=>this.props.onFilter}
                    />
                </View>
            </Pressable>
            
            <View style={[styles.contentMap, {marginTop:toDp(40)}]}>
              <View style={[styles.wrapper, {margin:toDp(10)}]}>
                  <MapView style={styles.map} initialRegion={{
                    latitude:-7.7926359,
                    longitude:110.3636856,
                    latitudeDelta:0.009,
                    longitudeDelta:0.009
                    }}>
                      <Marker coordinate={{
                        latitude:-7.792396730376516,
                        longitude:110.36580990952797
                      }}/>
                  </MapView>
              </View>
            </View>
            
    </View>
    );
  
}

const styles = StyleSheet.create({
  container: {
    justifyContent:'center',
    alignItems: 'center',
  },
  searchSection: {
    top:toDp(40),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2A334B',
    width:toDp(316),
    height:toDp(40),
    borderRadius:toDp(15),
    marginBottom:toDp(10)
},
searchIcon: {
  resizeMode: 'contain',
  tintColor: 'white',
  width: toDp(20),
  height: toDp(20),
  zIndex:3,
  padding: toDp(8),
  position: 'absolute',
  left: toDp(15),
  top: Platform.OS === 'ios' ? toDp(11) : toDp(11)
},
input: {
  flex: 1,
  paddingTop: toDp(10),
  paddingRight: toDp(10),
  paddingBottom: toDp(10),
  paddingLeft: toDp(0),
  borderRadius: toDp(25),
  paddingLeft: toDp(45),
  color:'#FFF'
},
  wrapper: {
    ...StyleSheet.absoluteFillObject
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  content: {
      top:toDp(15),
      // backgroundColor:'#C4C4C4',
      width:toDp(316),
      height:toDp(90),
      borderRadius:toDp(15)
  },
  txtContact: {
    fontWeight: 'bold',
    right:toDp(135),
    top:toDp(10)
  },
  txtAlamat: {
    fontWeight:'bold',
    right:toDp(135),
    top:toDp(20)
  },
  inputAlamat: {
    top:toDp(30),
    // backgroundColor:'#C4C4C4',
    width:toDp(316),
    height:toDp(130),
    borderRadius:toDp(15)
},
dropdown:{
  height:toDp(38),
  borderRadius:toDp(13),
  width:toDp(310),
  top:toDp(4),
  left:toDp(3),
  backgroundColor:'white'
},
contentMap: {
  backgroundColor:'white',
  width:toDp(316),
  height:toDp(200),
  borderRadius:toDp(15),
  bottom:toDp(5)
}
});

export default TambahAlamat;