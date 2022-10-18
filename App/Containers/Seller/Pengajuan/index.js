import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    ImageBackground,
    Pressable,
    AsyncStorage,
    ScrollView, 
    ToastAndroid
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import BackHeader from '@BackHeader'
import NavigatorService from '@NavigatorService'
import { TextInput } from "react-native-gesture-handler";
import axios from 'axios';
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { svr } from "../../../Configs/apikey";

const Pengajuan = (props) => {
    const [src, setSrc] = useState(null);

    const DATA = [
        {
            id: '2938492',
            image: 'https://www.pngfind.com/pngs/m/93-938050_png-file-transparent-white-user-icon-png-download.png'
        },
    ]

    const [state, setState] = useState({
        loading: false,
        datas: [],
        mb_id: '',
        mb_name: '',
        rtl_name: '',
        rtl_mb_id: '',
        rtl_phone: '',
        rtl_addres: '',
        rtl_city: '',
        rtl_status: '',
        rtl_long: '',
        rtl_lat: '',
        rtl_id: '',
        rtl_city: '',
        rtl_status: '',
        retail_id: '',
        cityname: [],
        bo_rtlid: false,
        latitude: '',
        longitude: '',
        asalProps: 'Pengajuan'
    })

    // GET CITY

    useEffect(() => {
        city()

        props.navigation.addListener(
            'didFocus',
            payload => {
                setKordinat()
            }
        );

    }, [])

    const city = () => {
        // setState(state => ({...state, loading: true }))
        axios.get(svr.url + 'city/' + svr.api)
            // axios.get('https://market.pondok-huda.com/dev/react/city/')
            .then(result => {
                // handle success
                //alert(JSON.stringify(result))
                setState(state => ({ ...state, cityname: result.data.data }))
                // console.log('-----kotaaa=====>'+ JSON.stringify(result.data.data));
                // alert(JSON.stringify(response.data));

            }).catch(err => {
                //console.log(err)
                // alert('Gagal menerima data dari server!' + err)
                ToastAndroid.show("Gagal menerima data dari server!" + err, ToastAndroid.SHORT)
                setState(state => ({ ...state, loading: false }))
            })
    }

    //GET NAMA MEMBER

    useEffect(() => {
        AsyncStorage.getItem('uid').then(uids => {
            let ids = uids;
            setState(state => ({
                ...state,
                mb_id: ids
            }))
        }).catch(err => {
            console.log('err', err)
        })

        AsyncStorage.getItem('member').then(response => {
            //console.log('CEK nama member ===>'+ JSON.stringify(response));
            let data = JSON.parse(response);
            console.log('HASIL  ===>' + JSON.stringify(data));
            setState(state => ({
                ...state,
                rtl_mb_id: data.rtl_mb_id,
                mb_name: data.value.mb_name,
            }))
            //   getProfilseller(data.rtl_id)
            //   console.log('ID RETAIL ====> ' + JSON.stringify(data.rtl_id));

        }).catch(err => {
            console.log('err', err)
        })



        // return (() => {
        //   console.log('===========================>' + state.retail_id);
        //   //getProfilseller()
        // })
    }, [])

    //POST PENGAJUAN

    const InputPengajuan = async () => {
        const body = {
            rtl_mb_id: state.mb_id,
            mb_id: state.mb_id,
            rtl_name: state.rtl_name,
            rtl_phone: state.rtl_phone,
            rtl_addres: state.rtl_addres,
            rtl_lat: state.latitude,
            rtl_long: state.longitude,
            rtl_city: state.rtl_city,
            rtl_status: state.rtl_status
        }
        console.log('CEK BODY ===> ' + JSON.stringify(body));

        setState(state => ({ ...state, loading: true }))
        axios.post(svr.url + 'retail/' + svr.api, body)
            // axios.post('https://market.pondok-huda.com/dev/react/retail/', body)
            .then(response => {

                console.log('CEK URL ===>' + JSON.stringify(response.data.status));

                if (response.data.status === 201) {
                    ToastAndroid.show("Pengajuan berhasil dikirim!", ToastAndroid.SHORT)

                    NavigatorService.navigate('Profilone')

                    console.log('CEK Hasil Pengajuan ===>' + JSON.stringify(response.data));

                    setState(state => ({ ...state, loading: false }))

                } else {
                    ToastAndroid.show("Gagal buat pengajuan!", ToastAndroid.SHORT)
                    setState(state => ({ ...state, loading: false }))

                    console.log('CEK ERROR ===>' + JSON.stringify(response.data));
                }

            }).catch(err => {
                ToastAndroid.show("Gagal menerima data dari server!" + err, ToastAndroid.SHORT)
                setState(state => ({ ...state, loading: false }))
            })
    }


    const setKordinat = () => {
        //Penggunaan Promise
        AsyncStorage.getItem('kordinat').then(response => {
            let data = JSON.parse(response);
            if (response !== null) {
                if ((data.latitude == '' && data.latitude == null) || (data.longitude == '' && data.longitude == null)) {
                    setState(state => ({
                        ...state,
                        latlongName: 'Atur Lokasi',
                        inMessage: 'Lokasi mu tidak dalam jangkauan',

                    }))
                } else {
                    setState(state => ({
                        ...state,
                        latitude: data.latitude,
                        longitude: data.longitude,

                    }))
                }
            } else {
                //calback promise reject
                setState(state => ({
                    ...state,
                    latlongName: 'Atur Lokasi',
                    inMessage: 'Lokasi mu tidak dalam jangkauan',

                }))
            }

        }).catch(err => {
            console.log('err', err)
        })

    }


    const validateInput = () => {
        if (state.mb_name.trim() == '') {
            alert('Nama tidak boleh kosong!')
            return;
        }
        if (state.rtl_name.trim() == '') {
            alert('Nama toko tidak boleh kosong!')
            return;
        }
        if (state.rtl_phone.trim() == '') {
            alert('Nomor Hp tidak boleh kosong!')
            return;
        }
        if (state.rtl_addres.trim() == '') {
            alert('Alamat tidak boleh kosong!')
            return;
        }
        if (state.rtl_city.trim() == '') {
            alert('Kota tidak boleh kosong!')
            return;
        }
        // if (state.latitude.trim() && state.longitude.trim() == '') {
        //     alert('Lokasi toko tidak boleh kosong!')
        //     return;
        // }
        // if (state.longitude.trim() == '') {
        //     alert('Lokasi toko tidak boleh kosong!')
        //     return;
        // }

        InputPengajuan()
    }


    return (
        <View style={styles.container}>

            <BackHeader
                title={'Pengajuan'}
                onPress={() => props.navigation.goBack()}
            />


            <ScrollView>
                <View style={styles.profilToko}>

                    <Image source={{ uri: DATA[0].image }} style={styles.imgProfil} />
                    <View style={{ marginLeft: toDp(80), bottom: toDp(30) }}>
                        <Text style={{ fontWeight: 'bold' }}>Gambar Profil</Text>
                        <Text style={{ fontSize: toDp(11) }}>Besar file maks. 2MB dengan format .JPG, JPEG atau PNG.</Text>
                        <Pressable style={styles.btnGanti}>
                            <Text style={{ color: '#0960A1' }}>Ganti Gambar</Text>
                        </Pressable>
                    </View>

                    <View style={{ margin: toDp(8), bottom: toDp(30) }}>

                        <Text style={styles.txtToko}>Nama Pengguna</Text>
                        <TextInput autoCapitalize={'none'}
                            style={styles.textInput}
                            placeholderTextColor={'#4E5A64'}
                            placeholder={'Nama Pengguna'}
                            value={state.mb_name}
                            onChangeText={(text) => setState(state => ({ ...state, mb_name: text }))}
                        />

                        <Text style={styles.txtToko}>Nama Toko</Text>
                        <TextInput autoCapitalize={'none'}
                            style={styles.textInput}
                            placeholderTextColor={'#4E5A64'}
                            placeholder={'Nama toko bangunan'}
                            value={state.rtl_name}
                            onChangeText={(text) => setState(state => ({ ...state, rtl_name: text }))}
                        />

                        <Text style={styles.txtDeskripsi}>Telepon</Text>
                        <TextInput autoCapitalize={'none'}
                            style={styles.textInput1}
                            placeholderTextColor={'#4E5A64'}
                            placeholder={'Nomer telepon'}
                            value={state.rtl_phone}
                            onChangeText={(text) => setState(state => ({ ...state, rtl_phone: text }))}
                        />
                        <Text style={styles.txtDeskripsi}>Alamat</Text>
                        <TextInput autoCapitalize={'none'}
                            style={styles.textInput1}
                            placeholderTextColor={'#4E5A64'}
                            placeholder={'Alamat'}
                            value={state.rtl_addres}
                            onChangeText={(text) => setState(state => ({ ...state, rtl_addres: text }))}
                        />
                        <Text style={styles.txtCity}>Kota</Text>
                        <SelectDropdown
                            buttonStyle={styles.dropdown}
                            buttonTextStyle={{ fontSize: toDp(12), color: '#4E5A64' }}
                            rowTextStyle={{ fontSize: toDp(12) }}
                            dropdownStyle={{ borderRadius: toDp(5) }}
                            rowStyle={{ height: toDp(48), padding: toDp(10) }}
                            defaultButtonText={'Pilih Kota atau Kabupaten'}
                            data={state.cityname}
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem.cty_id, index)
                                setState(state => ({ ...state, rtl_city: selectedItem.cty_id }))
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {

                                return selectedItem.cty_name;
                            }}
                            rowTextForSelection={(item, index) => {
                                return item.cty_name;
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
                        <Text style={styles.txtDeskripsi}>Set Lokasi Toko Anda</Text>
                        {state.latitude != '' || state.longitude != '' ?
                            <>
                                <View style={{
                                    backgroundColor: 'white', width: 340, height: 48, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 15, shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 1,
                                    },
                                    shadowOpacity: 0.20,
                                    shadowRadius: 1.41,

                                    elevation: 2,
                                }}>
                                    <Text style={{ color: '#4E5A64', }}>{state.latitude} dan {state.longitude}</Text>
                                </View>
                            </>
                            :
                            <>
                                <Pressable onPress={() => NavigatorService.navigate('Peta', {asalProps: state.asalProps})} style={{ backgroundColor: '#06BA0D', width: 340, height: 48, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                                    <Text style={{ color: 'white', fontWeight: '800' }}>Cari Titik Lokasi</Text>
                                </Pressable>
                            </>
                        }

                        {/* <Pressable onPress={() => NavigatorService.navigate('Peta')} style={{ backgroundColor: '#06BA0D', width: 340, height: 48, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                            <Text style={{ color: 'white', fontWeight: '800' }}>Cari Titik Lokasi</Text>
                        </Pressable> */}
                        {/* <Text style={styles.txtDeskripsi}>Latitude</Text>
                        <TextInput
                            autoCapitalize={'none'}
                            style={styles.textInput1}
                            placeholderTextColor={'#4E5A64'}
                            // placeholder={'Latitude'}
                            value={state.latitude}
                            onChangeText={(text) => setState(state => ({ ...state, latitude: text }))}
                        />
                        <Text style={styles.txtDeskripsi}>Longtitude</Text>
                        <TextInput
                            autoCapitalize={'none'}
                            style={styles.textInput1}
                            placeholderTextColor={'#4E5A64'}
                            // placeholder={'Longtitude'}
                            value={state.longitude}
                            onChangeText={(text) => setState(state => ({ ...state, longitude: text }))}
                        /> */}
                    </View>

                    {/* <Text>{state.latitude} dan {state.longitude}</Text> */}


                </View>
            </ScrollView>

            <View style={{ bottom: 10, alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: toDp(26) }}>
                <Pressable style={styles.btnSimpan} onPress={() => validateInput()}>
                    <Text style={styles.txtSimpan}>Simpan</Text>
                </Pressable>
            </View>

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: 'white',
        flex: 1
    },
    imgProfil: {
        height: toDp(50),
        width: toDp(50),
        top: toDp(20),
        left: toDp(15),
        borderRadius: toDp(25)
    },
    // profilToko: {
    //     backgroundColor: '#FFF',
    //     borderRadius: toDp(10),
    //     top: toDp(10),
    //     width: toDp(335),
    //     height: toDp(490),
    //     shadowColor: "#000",
    //     shadowOffset: {
    //         width: 0,
    //         height: 1,
    //     },
    //     shadowOpacity: 0.20,
    //     shadowRadius: 1.41,

    //     elevation: 3,
    // },
    btnGanti: {
        width: toDp(90),
        top: toDp(5),
    },
    textInput: {
        width: toDp(340),
        height: toDp(48),
        backgroundColor: '#FFFFFF',
        paddingHorizontal: toDp(15),
        borderRadius: toDp(10),
        top: toDp(3),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    textInput1: {
        width: toDp(340),
        height: toDp(48),
        backgroundColor: '#FFFFFF',
        paddingHorizontal: toDp(15),
        borderRadius: toDp(10),
        top: toDp(5),
        marginTop: toDp(5),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    txtDeskripsi: {
        top: toDp(8),
        fontSize: toDp(13),
        color: '#2A334B',
        marginTop: toDp(0)
    },
    txtToko: {
        fontSize: toDp(13),
        color: '#2A334B',
        marginTop: toDp(5)
    },
    btnSimpan: {
        backgroundColor: '#2A334B',
        width: toDp(340),
        height: toDp(48),
        borderRadius: toDp(10),
        justifyContent: 'center'
    },
    txtSimpan: {
        textAlign: 'center',
        color: 'white',
        fontSize: toDp(14)
    },
    dropdown: {
        width: toDp(340),
        height: toDp(48),
        borderRadius: toDp(10),
        top: toDp(2),
        backgroundColor: '#FFFFFF',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 2,
        // borderWidth: toDp(0.5)
    },
    txtCity: {
        marginTop: toDp(8),
        fontSize: toDp(13),
        color: '#2A334B',
    }

});

export default Pengajuan;
