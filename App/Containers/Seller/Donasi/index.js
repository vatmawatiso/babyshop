import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    Alert,
    TextInput,
    SafeAreaView,
    Pressable,
    ScrollView,
    TouchableOpacity,
    AsyncStorage
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import BackHeader from '@BackHeader'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import NavigatorService from '@NavigatorService'
import axios from "axios";
import { svr } from "../../../Configs/apikey";

const Donasi = (props) => {

    const countries = ["Jakarta", "Cirebon", "Bandung", "Kuningan"]

    const createThreeButtonAlert = () =>
        Alert.alert(
            "Donasikan Bahan Bangunan!",
            "Apakah anda yakin ingin di donasikan?",
            [
                // {
                //   text: "Ask me later",
                //   onPress: () => console.log("Ask me later pressed")
                // },
                {
                    text: "Tidak",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Donasikan", onPress: () => console.log("OK Pressed") }
            ]
        );

    const kerjaSama = ["kita_bisa.com", "bedah_rumah"];
    const penerimaDonasi = ["yatim", "dhuafa", "rumahibadah"];
    const Jasa = ["jasa_tukang", "konsultan_arsitek"];

    const [state, setState] = useState({
        partner: '',
        penerima: '',
        product_name: '',
        unit: '',
        jasa: '',
        ctg_name: '',
        jumlah: '',
        dataShip: [],
        dataPro: [],
        dataCat: [],
        ctg_name: [],
        loading: false
    })

    useEffect(() => {
        getProduk()
        category()
        shipping()
    }, [])


    const getProduk = () => {
        axios.get(svr.url+'product/'+svr.api)
        // axios.get('https://market.pondok-huda.com/dev/react/product/')
            .then(result => {
                console.log('result', result);
                // getCurrentWsh()
                setState(state => ({ ...state, dataPro: result.data.data }))

                // console.log('result2 =>', result.data.data)
            }).catch(error => {
                console.log(error)
            })
    }

    const category = () => {
        // setState(state => ({...state, loading: true }))
        axios.get(svr.url+'category/'+svr.api)
        // axios.get('https://market.pondok-huda.com/dev/react/category/')
            .then(result => {
                // handle success
                setState(state => ({ ...state, dataCat: result.data.data }))
                console.log('----Katagori=====>', result);
                // alert(JSON.stringify(result.data));

            }).catch(err => {
                //console.log(err)
                alert('Gagal menerima data dari server!' + err)
                setState(state => ({ ...state, loading: false }))
            })
    }

    const shipping = () => {
        // setState(state => ({...state, loading: true }))
        axios.get(svr.url+'shipping/'+svr.api)
        // axios.get('https://market.pondok-huda.com/dev/react/shipping/')
            .then(result => {
                // handle success
                setState(state => ({ ...state, dataShip: result.data.data }))
                console.log('----Shipping=====>'+ JSON.stringify (result));
                // alert(JSON.stringify(result.data));

            }).catch(err => {
                //console.log(err)
                alert('Gagal menerima data dari server!' + err)
                setState(state => ({ ...state, loading: false }))
            })
    }

    const postDonasi = () => {
        const body = {
            partner: state.partner,
            penerima: state.penerima,
            barang: state.product_name,
            pengiriman: state.shp_name,
            category: state.ctg_name,
            unit: state.jumlah,
            jasa: state.jasa
        }
        console.log('body donasi', body)
        setState(state => ({ ...state, loading: true }))
        axios.post(svr.url+'donasi/'+svr.api, body)
        // axios.post('https://market.pondok-huda.com/dev/react/donasi/', body)
            .then(response => {
                console.log('response donasi', response)
                if (response.data.status == 201) {
                    alert('Berhasil Donasi Silahkan melakukan pembayaran')
                    NavigatorService.reset('Homepage')
                } else if (response.data.status == 500) {
                    alert('Gagal Guys')
                }
            }).catch(error => {
                console.log('error guys', error)
            })
    }


    return (
        <View style={styles.container}>
            <BackHeader
                title={'Form Donasi'}
                onPress={() => props.navigation.goBack()}
            />

            <ScrollView>
                <View style={styles.body}>

                    <View style={{ flexDirection: 'column', }}>
                        <View>
                            <SafeAreaView>
                                <Text style={[styles.txtDonasi, { marginTop: toDp(-5) }]}>Kerjasama Dengan</Text>
                                <SelectDropdown
                                    buttonStyle={styles.dropdown}
                                    buttonTextStyle={{ fontSize: toDp(12), color: '#4E5A64' }}
                                    rowTextStyle={{ fontSize: toDp(12) }}
                                    dropdownStyle={{ borderRadius: toDp(10) }}
                                    rowStyle={{ height: toDp(48), padding: toDp(5), }}
                                    defaultButtonText={'Pilih Kerjasama'}
                                    data={kerjaSama}
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
                                <Text style={styles.txtDonasi}>Penerima</Text>
                                <SelectDropdown
                                    buttonStyle={styles.dropdown}
                                    buttonTextStyle={{ fontSize: toDp(12), color: '#4E5A64' }}
                                    rowTextStyle={{ fontSize: toDp(12) }}
                                    dropdownStyle={{ borderRadius: toDp(10) }}
                                    rowStyle={{ height: toDp(48), padding: toDp(5) }}
                                    defaultButtonText={'Pilih Penerima'}
                                    data={penerimaDonasi}
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
                                <Text style={styles.txtDonasi}>Bentuk Bangunan</Text>
                                <SelectDropdown
                                    buttonStyle={styles.dropdown}
                                    buttonTextStyle={{ fontSize: toDp(12), color: '#4E5A64' }}
                                    rowTextStyle={{ fontSize: toDp(12) }}
                                    dropdownStyle={{ borderRadius: toDp(10) }}
                                    rowStyle={{ height: toDp(48), padding: toDp(5) }}
                                    defaultButtonText={'Bentuk Bangunan Yang Didonasikan'}
                                    data={state.dataCat}
                                    onSelect={(selectedItem, index) => {
                                        console.log(selectedItem.ctg_id, index)
                                        setState(state => ({...state, ctg_name: selectedItem.ctg_id}))
                                    }}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        return selectedItem.ctg_name
                                    }}
                                    rowTextForSelection={(item, index) => {
                                        return item.ctg_name
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
                                <View style={{ flexDirection: 'row', marginTop: toDp(10) }}>
                                    <View>
                                        <Text style={{ fontWeight: 'bold' }}>Barang Yang Didonasikan</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', right: toDp(157), marginTop: toDp(20) }}>
                                        <View>
                                            <SelectDropdown
                                                buttonStyle={styles.dropdown1}
                                                buttonTextStyle={{ fontSize: toDp(12), color: '#4E5A64' }}
                                                rowTextStyle={{ fontSize: toDp(12) }}
                                                dropdownStyle={{ borderRadius: toDp(10) }}
                                                rowStyle={{ height: toDp(48), padding: toDp(5) }}
                                                defaultButtonText={'Bentuk Bangunan Yang Didonasikan'}
                                                data={state.dataPro}
                                                onSelect={(selectedItem, index) => {
                                                    console.log(selectedItem.prd_id, index)
                                                    setState(state => ({...state, product_name: selectedItem.prd_id }))
                                                }}
                                                buttonTextAfterSelection={(selectedItem, index) => {
                                                    return selectedItem.product_name
                                                }}
                                                rowTextForSelection={(item, index) => {
                                                    return item.product_name
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
                                            {/* <SelectDropdown
                                                buttonStyle={styles.dropdown1}
                                                buttonTextStyle={{ fontSize: toDp(12), color: '#4E5A64' }}
                                                rowTextStyle={{ fontSize: toDp(12) }}
                                                dropdownStyle={{ borderRadius: toDp(10) }}
                                                rowStyle={{ height: toDp(48), padding: toDp(5) }}
                                                defaultButtonText={'Bentuk Bangunan Yang Didonasikan'}
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
                                            /> */}
                                        </View>
                                        <View style={{ left: toDp(113) }}>
                                            <TextInput
                                                top={toDp(6)}
                                                width={toDp(335)}
                                                height={toDp(48)}
                                                borderRadius={toDp(10)}
                                                backgroundColor={'white'}
                                                autoCapitalize={'none'}
                                                style={styles.textInput}
                                                placeholder={'Jumlah'}
                                                placeholderTextColor={'#4E5A64'}
                                                value={state.jumlah}
                                                onChangeText={(text) => setState(state => ({ ...state, jumlah: text }))}
                                            />
                                            {/* <TextInput
                                                top={toDp(6)}
                                                width={toDp(335)}
                                                height={toDp(48)}
                                                borderRadius={toDp(10)}
                                                backgroundColor={'white'}
                                                autoCapitalize={'none'}
                                                style={styles.textInput}
                                                placeholder={'Jumlah'}
                                                placeholderTextColor={'#4E5A64'}
                                            // value={state.adr_address}
                                            // onChangeText={(text) => setState(state => ({ ...state, adr_address: text }))}
                                            /> */}
                                        </View>
                                    </View>
                                </View>
                                <Text style={styles.txtDonasi}>Jasa Pengiriman</Text>
                                <SelectDropdown
                                    buttonStyle={styles.dropdown}
                                    buttonTextStyle={{ fontSize: toDp(12), color: '#4E5A64' }}
                                    rowTextStyle={{ fontSize: toDp(12) }}
                                    dropdownStyle={{ borderRadius: toDp(10) }}
                                    rowStyle={{ height: toDp(48), padding: toDp(5) }}
                                    defaultButtonText={'Pilih Jasa Pengiriman'}
                                    data={state.dataShip}
                                    onSelect={(selectedItem, index) => {
                                        console.log(selectedItem.shp_id, index)
                                        setState(state => ({...state, shp_name: selectedItem.shp_id}))
                                    }}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        return selectedItem.shp_name
                                    }}
                                    rowTextForSelection={(item, index) => {
                                        return item.shp_name
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
                                <Text style={styles.txtDonasi}>Jasa yang didonasikan/jumlah hari kerja</Text>
                                <SelectDropdown
                                    buttonStyle={styles.dropdown}
                                    buttonTextStyle={{ fontSize: toDp(12), color: '#4E5A64' }}
                                    rowTextStyle={{ fontSize: toDp(12) }}
                                    dropdownStyle={{ borderRadius: toDp(10) }}
                                    rowStyle={{ height: toDp(48), padding: toDp(5) }}
                                    defaultButtonText={'Pilih Jasa'}
                                    data={Jasa}
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
                            </SafeAreaView>
                        </View>
                        <View style={{ bottom: 0, width: '100%', position: 'relative', marginTop: toDp(30) }}>
                            <Pressable style={styles.btnDonasi}  onPress={() => postDonasi()}>
                                <Text style={styles.txtDonasikan}>Donasikan</Text>
                            </Pressable>
                        </View>
                    </View>
                    {/* </ScrollView> */}

                </View>
            </ScrollView>



        </View>

    );

}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#fFF'
    },
    // contentContainerStyle: {

    // },
    contain: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    body: {
        flexDirection: 'row',
        width: toDp(335),
        height: '100%',
        borderRadius: toDp(10),
        marginBottom: toDp(2),
        alignItems: 'center',
        marginHorizontal: toDp(12),
        backgroundColor: '#FFF',
        marginBottom: toDp(20)
    },
    textInput: {
        marginTop: toDp(5),
        width: toDp(70),
        height: toDp(48),
        fontSize: toDp(12),
        textAlign: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 2,
    },
    txtDonasi: {
        marginTop: toDp(10),
        fontWeight: 'bold'
    },
    dropdown: {
        height: toDp(48),
        borderRadius: toDp(10),
        width: toDp(335),
        top: toDp(4),
        backgroundColor: 'white',
        marginTop: toDp(5),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 2,
    },
    dropdown1: {
        height: toDp(48),
        borderRadius: toDp(10),
        width: toDp(150),
        top: toDp(4),
        backgroundColor: 'white',
        marginTop: toDp(5),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 2,
    },
    btnDonasi: {
        backgroundColor: '#2A334B',
        borderRadius: toDp(10),
        width: toDp(335),
        height: toDp(48),
        justifyContent: 'center',
        bottom: toDp(5)
    },
    txtDonasikan: {
        textAlign: 'center',
        color: 'white'
    }

});

export default Donasi;