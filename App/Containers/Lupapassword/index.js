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
    ScrollView,
    AsyncStorage
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import Back from '@Back'
import NavigatorService from '@NavigatorService';
import Loader from '@Loader'
import axios from "axios";
import { sha1 } from "react-native-sha1";

const Lupapassword = (props) => {

    const [state, setState] = useState({
        // loading: false,
        mb_id: '',
        mb_password: '',
        mb_username: '',
        mb_email: 'xxxxx@gmail.com',
        confirmEmail: '',
        loading: false,
        secureTextEntry: true,
        // confirmEmail: false,
        getUsername: true,
        showEmail: false,
        resetPassword: false,
        valInput: false,
        valPass: '',
        btnReset: false
    })

    useEffect(() => {
        AsyncStorage.getItem('uid').then(uids => {
            // console.log('response2 =>', ids)
            let ids = uids;
            setState(state => ({
                ...state,
                mb_id: ids,
            }))
            console.log('response2 =>', ids)
        }).catch(error => {
            console.log('error2 =>', error)
        })
    }, [])

    // masukan username untuk mengambil email yg bersangkutan
    const fetchUser = () => {
        const mb_username = state.mb_username;
        setState(state => ({ ...state, loading: true }))
        const data = {
            mb_username: mb_username
        }
        axios.post('http://market.pondok-huda.com/dev/react/forgot-password/', data)
            .then(result => {
                console.log('result1 =>', result)
                if (result.data.status == 200) {
                    console.log('result2 =>', result)
                    const datas = {
                        id: result.data.data[0].mb_id,
                        value: result.data.data[0],
                        email: result.data.data[0].mb_email
                    }
                    if (datas.value.length === 0) {
                        alert('Nama Pengguna Tidak Ditemukan')
                    } else {
                        console.log('result3 =>', datas);
                        AsyncStorage.setItem('member', JSON.stringify(datas))
                        AsyncStorage.setItem('uid', datas.id)
                        getData()
                    }
                    setState(state => ({ ...state, loading: false }))
                } else if (result.data.status == 404) {
                    alert('Pengguna Tidak Ditemukan')
                    console.log('result3 =>', result)
                    setState(state => ({ ...state, loading: false }))
                }
            }).catch(error => {
                console.log('error1 =>', error)
                alert('Gagal Menerima Data dari Server')
                setState(state => ({...state, loading: false}))
            })
    }

    // mengambil data
    const getData = () => {
        try {
            AsyncStorage.getItem('member').then(response => {
                let data = JSON.parse(response);
                console.log('response1 => ', data);
    
                setState(state => ({
                    ...state,
                    mb_id: data.value.mb_id,
                    password: data.value.password,
                    mb_email: data.value.mb_email
                }))

                setState(state => ({...state, getUsername: false}))
                setState(state => ({...state, showEmail: true}))
    
            }).catch(error => {
                console.log('error1 =>', error)
            })
    
            AsyncStorage.getItem('uid').then(uids => {
                // console.log('response2 =>', ids)
                let ids = uids;
                setState(state => ({
                    ...state,
                    mb_id: ids,
                }))
                console.log('response2 =>', ids)
            }).catch(error => {
                console.log('error2 =>', error)
            })
        } catch(error) {
            alert('Eror', error)
        }
    }

    // sensor email
    const hideEmail= (text)=> {
        let mb_email = text
        let hiddenEmail = "";
        for (let i = 0; i < mb_email.length; i++) {
          if (i > 2 && i< mb_email.indexOf("@") ) {
            hiddenEmail += "*";
          } else {
            hiddenEmail += mb_email[i];
          }
        }
        return hiddenEmail;
     }

    // menyesuaikan email yg dimasukan dengan yang ditampilkan

    const verifyEmail = () => {
        if(state.mb_email === state.confirmEmail) {
            setState(state => ({ ...state, loading: true }))
            setState(state => ({...state, showEmail: false}))
            setState(state => ({...state, resetPassword: true}))
            setState(state => ({ ...state, loading: false }))
        } else {
            setState(state => ({ ...state, loading: false }))
            alert('Email yang Dimasukkan tidak Sesuai')
            
        }
    }

    const updatePass = () => {
        let body = {
            id: state.mb_id,
            mb_password: state.mb_password,
        }
        setState(state => ({ ...state, loading: true }))
        axios.post('http://market.pondok-huda.com/dev/react/forgot-password/', body)
            .then(result => {
                console.log('result ----------->', result);
                if (result.data.status == 200) {
                    console.log('result update', result);
                    alert('Berhasil mengubah password');
                    NavigatorService.reset('Login')
                    setState(state => ({ ...state, loading: false }))
                } else if (result.data.status == 500) {
                    console.log('gagal update', result)
                    setState(state => ({ ...state, loading: false }))
                }
            }).catch(error => {
                console.log('error update:', error)
            })
    }

    const Enc = (pass) => {
        sha1(pass).then(hash => {
            setState(state => ({ ...state, mb_password: hash }))
        })
    }

    const passlength = (pass) =>{
        const psw = pass;
    
        if(psw.length >= 6 ){
          setState(state => ({...state, valPass: false }));
        //   setState(state => ({...state, btnReset: true }));
    
          Enc(pass);
    
        }else{
          setState(state => ({...state, valPass: true }))
        //   setState(state => ({...state, btnReset: false }));
    
        }
      }

    return (
        <View style={styles.container}>
            <Loader loading={state.loading}/>
            <Back
                title={'Kembali'}
                onPress={() => props.navigation.goBack()}
            />

            <View style={{ justifyContent: 'center', marginTop: toDp(30) }}>
                <View>
                    <Text style={styles.txtForget}>Buat Password Baru</Text>
                    <Text style={styles.titleForget}>kata sandi baru anda harus berbeda dari kata sandi{"\n"}yang digunakan sebelumnya</Text>
                </View>
                   
                {state.getUsername == true ? 
                    (
                    <View>
                         <Text style={styles.txtPassword}>Masukkan Username</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder={'Nama Pengguna'}
                                placeholderTextColor={'#4E5A64'}
                                onChangeText={(text) => setState(state => ({...state, mb_username: text}))}
                            />
                    </View>
                ) : null
            }

{/* input email yg sesuai dengan yg ditampilkan */}

                        {state.showEmail == true ? 
                            (
                            <View>
                                <Loader loading={state.loading}/>
                                    <Text style={styles.hideEmail}>{hideEmail(state.mb_email)}</Text>
                                        <TextInput
                                            style={styles.textInput}
                                            placeholder={'Email'}
                                            placeholderTextColor={'#4E5A64'}
                                            value={state.confirmEmail}
                                            onChangeText={(text) => setState(state => ({...state, confirmEmail: text}))}
                                        />
                                </View>
                        ) : null
                    }

         {/* Masukan password baru */}

        
                {state.resetPassword == true ? 
                    (
                    <View>
                        <Loader loading={state.loading}/>
                            <Text style={styles.txtPassword}>Masukkan Password</Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder={'Password Baru'}
                                    placeholderTextColor={'#4E5A64'}
                                    secureTextEntry={state.secureTextEntry}
                                    onChangeText={(text) => passlength(text)}
                                />

                                <Pressable style={styles.presableShow1} onPress={() => setState(state => ({ ...state, secureTextEntry: !state.secureTextEntry }))}>
                                    <Image source={state.secureTextEntry ? allLogo.icVisibilityOff : allLogo.icVisibilityOn} style={styles.icVisibility} />
                                </Pressable>

                                {state.valPass === true ? (
                                    <Text style={styles.msgError}>
                                        *Masukan kata sandi minimal 6 karakter
                                    </Text>
                                ) : null}
                    </View>
                ) : null
            }
                { state.getUsername == true ? (
                    <Pressable style={styles.btnKirim} onPress={() => fetchUser()}>
                        <Text style={styles.txtKirim}>Kirim</Text>
                    </Pressable>
                )
                : state.showEmail == true ? (
                    <Pressable style={styles.btnKirim} onPress={() => verifyEmail()}>
                        <Text style={styles.txtKirim}>Verifikasi</Text>
                    </Pressable>
                )
                : state.resetPassword == true ? (
                    // <>
                    //     {state.btnReset == true ? (
                            <Pressable style={styles.btnKirim} onPress={() => updatePass()}>
                                <Text style={styles.txtKirim}>Ubah Password</Text>
                            </Pressable>
                    //     ) : null
                    // }
                    // </>
                ) :null
            }
                    
                
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        // top:toDp(50),
        // justifyContent:'center',
        alignItems: 'center',
    },
    txtForget: {
        fontWeight: 'bold',
        fontSize: toDp(20),
        bottom: toDp(20),
    },
    titleForget: {
        fontSize: toDp(14),
        bottom: toDp(10)
    },
    txtKirim: {
        textAlign: 'center',
        top: toDp(15),
        color: 'white'
    },
    btnKirim: {
        backgroundColor: '#2A334B',
        top: toDp(40),
        width: toDp(335),
        height: toDp(48),
        borderRadius: toDp(10)
    },
    txtPassword: {
        bottom: toDp(5)
    },
    txtKonfirPass: {
        top: toDp(8)
    },
    textInput1: {
        top: toDp(15),
        borderWidth: 0.5
    },
    presableShow: {
        padding: toDp(4),
        position: 'absolute',
        right: toDp(8),
        top: Platform.OS === 'ios' ? toDp(35) : toDp(95)
    },
    presableShow1: {
        position: 'absolute',
        top: toDp(35),
        left: '90%'
    },
    icVisibility: {
        width: toDp(24),
        height: toDp(24),
        tintColor: '#4E5A64'
    },
    textInput: {
        borderWidth: 0.5,
        height: toDp(48),
        backgroundColor: '#FFFFFF',
        paddingHorizontal: toDp(8),
        borderRadius: toDp(10),
        marginTop: toDp(8)
    },
    msgError: {
        color: 'red',
        fontSize: 12,
        left: 0,
        position: 'relative',
    },
    hideEmail:{
        color:'#000000',
        fontWeight: 'bold',
        fontSize:toDp(17),
        textAlign:'center'
      },
});

export default Lupapassword;