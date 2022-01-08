import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Alert,
  Pressable
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import  Header  from '@Header'
import NavigatorService from '@NavigatorService'
import { Card } from "react-native-paper";

const Editprofil = (props) => {
    const DATA = [
        {
          id: '1',
          image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp',
          nama: 'Dandi Alvayed'
        },
      ]

      const [state, setState] = useState({
        loading: false,
        valName: false,
        secureTextEntry: true,
        nama: '',
        username: '',
        email: '',
        jenkel: '',
        nomer: '',
        password: ''
    })
    
    // const RenderItem = (item, index) => {
    return (
        <View style={styles.container}>
            <Header 
                title={'Edit Profil'}
                onPress={() => props.navigation.goBack()}
            />
                <View style={styles.content}>
                    <View style={styles.profil}>
                        <Image style={styles.imgProfil} source={{uri: DATA[0].image}} />
                        <Text style={styles.nama}>{DATA[0].nama}</Text>
                        <Text style={styles.edit}>Ubah Profil</Text>
                    </View>
                </View>
                <View style={styles.formInput}>
                        <View style={styles.card}>
                            <TextInput  autoCapitalize={'none'}
                                    style={styles.textInput}
                                    placeholder={'Nama'}                                 
                                    placeholderTextColor={'grey'}
                                    value={state.nama}
                                    onChangeText={(text) => setState(state => ({...state, nama: text })) }
                            />
                         </View>
                         <View style={styles.card}>
                            <TextInput  autoCapitalize={'none'}
                                    style={styles.textInput}
                                    placeholder={'Username'}                           
                                    placeholderTextColor={'grey'}
                                    value={state.username}
                                    onChangeText={(text) => setState(state => ({...state, username: text })) }
                            />
                         </View>
                         <View style={styles.card}>
                            <TextInput  autoCapitalize={'none'}
                                    style={styles.textInput}
                                    placeholder={'Email'}
                                    placeholderTextColor={'grey'}
                                    value={state.email}
                                    onChangeText={(text) => setState(state => ({...state, email: text })) }
                            />
                         </View>
                         <View style={styles.card}>
                            <TextInput  autoCapitalize={'none'}
                                    style={styles.textInput}
                                    placeholder={'Jenis Kelamin'}
                                    placeholderTextColor={'grey'}
                                    value={state.jenkel}
                                    onChangeText={(text) => setState(state => ({...state, jenkel: text })) }
                            />
                         </View>
                         <View style={styles.card}>
                            <TextInput  autoCapitalize={'none'}
                                    style={styles.textInput}
                                    placeholder={'Nomer Telepon'}
                                    placeholderTextColor={'grey'}
                                    value={state.nomer}
                                    onChangeText={(text) => setState(state => ({...state, nomer: text })) }
                            />
                         </View>
                         <View style={styles.card}>
                              <TextInput
                                    autoCapitalize={'none'}
                                    style={{
                                      marginTop: toDp(-15),
                                      width: toDp(316),
                                      height: toDp(40),
                                      backgroundColor: 'white',
                                      borderWidth: toDp(1),
                                      borderRadius: toDp(15),
                                      borderColor: state.valName == false ?
                                        '#F2F3F3'
                                      :
                                        'red'
                                    }}
                                    placeholder={'Password'}
                                    placeholderTextColor={'grey'}
                                    secureTextEntry={state.secureTextEntry}
                                    onChangeText={(text) => setState(state => ({...state, password: text})) }
                              />
                              <Pressable style={styles.presableShow} onPress={() => setState(state => ({...state, secureTextEntry: !state.secureTextEntry }))}>
                                  <Image source={state.secureTextEntry ? allLogo.icVisibilityOff : allLogo.icVisibilityOn} style={styles.icVisibility} />
                              </Pressable>
                         </View>
                         <View style={styles.buttonSave}>
                            <Pressable 
                                    onPress={() => NavigatorService.navigate('Login')}
                                    style={styles.pressableLogin}>
                                    <Text style={styles.save}>Simpan</Text>
                            </Pressable>
                         </View>
                    </View>
        </View>
    )};

    // return (
    //     <View style={styles.header}>
    //       <Card>
    //         {RenderItem(DATA,0)}
    //       </Card>
    //     </View>
    //   )};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top:toDp(50)
  },
  content: {
      backgroundColor: '#2A334B',
      width:toDp(316),
      height:toDp(116),
      borderRadius:toDp(15),
      left:toDp(20),
      bottom:toDp(35)
  },
  imgProfil: {
    height: toDp(50),
    width: toDp(50),
    top: toDp(10),
    left: toDp(135),
    borderRadius: toDp(25)
  },
  nama: {
      color: 'white',
      left:toDp(115),
      top:toDp(16)
  },
  edit: {
      color:'white',
      fontSize:toDp(10),
      left:toDp(133),
      top:toDp(20)
  },
  textInput: {
    width: toDp(250),
    height: toDp(39),
    backgroundColor: '#F2F3F3',
    paddingHorizontal: toDp(8),
    borderRadius: toDp(10),
    marginTop: toDp(-10)
  },
  formInput: {
    bottom:toDp(15),
    left:toDp(18)
  },
  card: {
      margin:toDp(10),
      right:toDp(8)
  },
  buttonSave: {
      backgroundColor: '#2A334B',
      width:toDp(316),
      height:toDp(40),
      borderRadius:toDp(15),
      top:toDp(15)
  },
  save: {
      color:'white',
      left:toDp(130),
      top:toDp(9)
  },
  textInput: {
    backgroundColor: 'white',
    width:toDp(316),
    height:toDp(40),
    borderRadius:toDp(15),
    bottom:toDp(15),
    marginBottom:toDp(-8)
  },
  icVisibility: {
    width: toDp(24),
    height: toDp(24),
    tintColor: 'grey',
    bottom:toDp(-2),
    left:toDp(0)
  },
  presableShow: {
    padding: toDp(4),
    position: 'absolute',
    // backgroundColor:'cyan',
    left: toDp(275),
    top: Platform.OS === 'ios' ? toDp(-11) : toDp(-11)
  },
});

export default Editprofil;
