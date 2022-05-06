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
    TouchableOpacity
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import BackHeader from '@BackHeader'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import NavigatorService from '@NavigatorService'
import axios from "axios";

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


    return (
        <View style={styles.container}>
            <BackHeader
                title={'Form Donasi'}
                onPress={() => props.navigation.goBack()}
            />
            <View style={[styles.body, { marginTop: toDp(50), alignItems: 'center', marginHorizontal: toDp(12) }]}>
                <View style={{ flexDirection: 'column' }}>
                    <View>
                        <SafeAreaView>
                            <Text style={styles.txtDonasi}>Kerjasama Dengan</Text>
                            <SelectDropdown
                                buttonStyle={styles.dropdown}
                                buttonTextStyle={{ fontSize: toDp(12), color: 'grey' }}
                                rowTextStyle={{ fontSize: toDp(12) }}
                                dropdownStyle={{ borderRadius: toDp(7) }}
                                rowStyle={{ height: toDp(35), padding: toDp(5) }}
                                defaultButtonText={'Pilih Kerjasama'}
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
                            <Text style={styles.txtDonasi}>Penerima</Text>
                            <SelectDropdown
                                buttonStyle={styles.dropdown}
                                buttonTextStyle={{ fontSize: toDp(12), color: 'grey' }}
                                rowTextStyle={{ fontSize: toDp(12) }}
                                dropdownStyle={{ borderRadius: toDp(7) }}
                                rowStyle={{ height: toDp(35), padding: toDp(5) }}
                                defaultButtonText={'Pilih Penerima'}
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
                            <Text style={styles.txtDonasi}>Bentuk Bangunan</Text>
                            <SelectDropdown
                                buttonStyle={styles.dropdown}
                                buttonTextStyle={{ fontSize: toDp(12), color: 'grey' }}
                                rowTextStyle={{ fontSize: toDp(12) }}
                                dropdownStyle={{ borderRadius: toDp(7) }}
                                rowStyle={{ height: toDp(35), padding: toDp(5) }}
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
                            />
                            <View style={{ flexDirection: 'row', marginTop: toDp(10) }}>
                                <View>
                                    <Text style={{ fontWeight: 'bold' }}>Barang Yang Didonasikan</Text>
                                </View>
                                <View style={{ flexDirection: 'row', right: toDp(157), marginTop: toDp(20) }}>
                                    <View>
                                        <SelectDropdown
                                            buttonStyle={styles.dropdown1}
                                            buttonTextStyle={{ fontSize: toDp(12), color: 'grey' }}
                                            rowTextStyle={{ fontSize: toDp(12) }}
                                            dropdownStyle={{ borderRadius: toDp(7) }}
                                            rowStyle={{ height: toDp(35), padding: toDp(5) }}
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
                                        />
                                        <SelectDropdown
                                            buttonStyle={styles.dropdown1}
                                            buttonTextStyle={{ fontSize: toDp(12), color: 'grey' }}
                                            rowTextStyle={{ fontSize: toDp(12) }}
                                            dropdownStyle={{ borderRadius: toDp(7) }}
                                            rowStyle={{ height: toDp(35), padding: toDp(5) }}
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
                                        />
                                    </View>
                                    <View style={{ left: toDp(113) }}>
                                        <TextInput
                                            top={toDp(6)}
                                            width={toDp(335)}
                                            height={toDp(40)}
                                            borderRadius={toDp(15)}
                                            backgroundColor={'white'}
                                            autoCapitalize={'none'}
                                            style={styles.textInput}
                                            placeholder={'Jumlah'}
                                            placeholderTextColor={'grey'}
                                        // value={state.adr_address}
                                        // onChangeText={(text) => setState(state => ({ ...state, adr_address: text }))}
                                        />
                                        <TextInput
                                            top={toDp(6)}
                                            width={toDp(335)}
                                            height={toDp(40)}
                                            borderRadius={toDp(15)}
                                            backgroundColor={'white'}
                                            autoCapitalize={'none'}
                                            style={styles.textInput}
                                            placeholder={'Jumlah'}
                                            placeholderTextColor={'grey'}
                                        // value={state.adr_address}
                                        // onChangeText={(text) => setState(state => ({ ...state, adr_address: text }))}
                                        />
                                    </View>
                                </View>
                            </View>
                            <Text style={styles.txtDonasi}>Jasa Pengiriman</Text>
                            <SelectDropdown
                                buttonStyle={styles.dropdown}
                                buttonTextStyle={{ fontSize: toDp(12), color: 'grey' }}
                                rowTextStyle={{ fontSize: toDp(12) }}
                                dropdownStyle={{ borderRadius: toDp(7) }}
                                rowStyle={{ height: toDp(35), padding: toDp(5) }}
                                defaultButtonText={'Pilih Jasa Pengiriman'}
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
                            <Text style={styles.txtDonasi}>Jasa yang didonasikan/jumlah hari kerja</Text>
                            <SelectDropdown
                                buttonStyle={styles.dropdown}
                                buttonTextStyle={{ fontSize: toDp(12), color: 'grey' }}
                                rowTextStyle={{ fontSize: toDp(12) }}
                                dropdownStyle={{ borderRadius: toDp(7) }}
                                rowStyle={{ height: toDp(35), padding: toDp(5) }}
                                defaultButtonText={'Pilih Jasa'}
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
                        </SafeAreaView>
                    </View>
                </View>
            </View>

            <View style={{ position: 'absolute', bottom: 0, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <Pressable style={[styles.btnDonasi, { width: toDp(335) }]} onPress={createThreeButtonAlert}>
                    <Text style={styles.txtDonasikan}>Donasikan</Text>
                </Pressable>
            </View>

        </View>

    );

}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: 'white',
        flex: 1,
        // backgroundColor: 'cyan'
    },
    contain: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    body: {
        flexDirection: 'row',
        width: toDp(335),
        height: toDp(80),
        borderRadius: toDp(20),
        top: toDp(150),
        justifyContent: 'space-between',
        marginBottom: toDp(2),
        alignItems: 'center',
        marginHorizontal: toDp(12)
    },
    textInput: {
        marginTop: toDp(5),
        width: toDp(70),
        height: toDp(37),
        borderWidth: toDp(0.5),
        fontSize: toDp(12),
        textAlign: 'center'
    },
    txtDonasi: {
        marginTop: toDp(10),
        fontWeight: 'bold'
    },
    dropdown: {
        height: toDp(38),
        borderRadius: toDp(20),
        width: toDp(335),
        top: toDp(4),
        backgroundColor: 'white',
        borderWidth: toDp(0.5),
        marginTop: toDp(5)
    },
    dropdown1: {
        height: toDp(38),
        borderRadius: toDp(20),
        width: toDp(150),
        top: toDp(4),
        backgroundColor: 'white',
        borderWidth: toDp(0.5),
        marginTop: toDp(5)
    },
    btnDonasi: {
        backgroundColor: '#2A334B',
        borderRadius: toDp(15),
        width: toDp(335),
        height: toDp(40),
        justifyContent: 'center',
        bottom: toDp(5)
    },
    txtDonasikan: {
        textAlign: 'center',
        color: 'white'
    }

});

export default Donasi;