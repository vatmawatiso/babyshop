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
import BackHeader from '@BackHeader'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import NavigatorService from '@NavigatorService'
 
const Checkout = (props) => {
 
    const DATA = [
        {
            id: '2938492',
            tb: 'Jaya Abadi Bandung',
            diproses: 'Dikemas',
            produk: 'Gerobak Pasir',
            harga: 'Rp 500.000',
            jumlah: '2',
            total: 'Rp 800.0000',
            bataswaktu: '13 Januari 2022',
            diterima: '15-18 januari 2022',
            metodePembayaran: 'Bank Mandiri',
            konfirmasi: 'Dibatalkan Pembeli',
            image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
        },
    ]
 
    const Address = [
        {
            id: '1',
            nama: 'Vatmawati',
            telepon: '083141520987',
            alamat: 'Jl KiSulaiman Kota Cirebon Jawa Barat '
        },
    ]
 
    return (
        <View style={styles.container}>
            <BackHeader
                title={'Checkout'}
                onPress={() => props.navigation.goBack()}
            />
            <View style={{flex:1}}>
                <View>
                    <View>
                        <View style={styles.Address}>
                            <Image source={allLogo.icaddress1} style={styles.icaddress1} />
                            <Text style={styles.txtAddress}>Alamat Pengiriman</Text>
                        </View>
 
                        <Pressable style={{ bottom: toDp(60), }} onPress={() => NavigatorService.navigate('Alamat')}>
                            <View style={styles.isiAddress}>
                                <Text style={{ fontSize: toDp(12), }}>{Address[0].nama} {Address[0].telepon}</Text>
                                <Text style={{ fontSize: toDp(12), }}>{Address[0].alamat}</Text>
                                <Image source={allLogo.iclineblack} style={[styles.icaddress, { marginLeft: toDp(30) }]} />
                            </View>
                        </Pressable>
                    </View>
 
                    <View>
                        <Text style={styles.txtTB}>Jaya Abadi Bandung</Text>
 
                        <View style={styles.OrderDetail}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Image source={allLogo.icgerobak} style={styles.icgerobak} />
                                <Text style={{ top: toDp(20), right: toDp(40), fontSize: toDp(12) }}>{DATA[0].produk}</Text>
                                <Text style={{ top: toDp(80), right: toDp(10), fontSize: toDp(12) }}>{DATA[0].jumlah}x</Text>
                            </View>
                            <Text style={{ bottom: toDp(60), left: toDp(135), fontSize: toDp(12) }}>{DATA[0].harga}</Text>
                        </View>
                    </View>
 
                    <View>
                        <View style={styles.Shipping}>
                            <Text style={styles.txtOption}>Opsi Pengiriman</Text>
                            <View style={{ borderWidth: toDp(0.5), borderColor: 'grey' }} />
                            <Pressable onPress={() => alert('Coba Ajalah')}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Image source={allLogo.icvoucher} style={styles.icvoucher} />
                                    <Text style={styles.voucher}>Klaim Voucher</Text>
                                    <Image source={allLogo.iclineblack} style={styles.iclineblack} />
                                </View>
                            </Pressable>
                            <View style={{ borderWidth: toDp(0.5), borderColor: 'grey' }} />
                            <Pressable onPress={() => NavigatorService.navigate('Jasakirim')}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={styles.delivery}>Reguler</Text>
                                    <Text style={styles.price}>Rp 50.000</Text>
                                </View>
                            </Pressable>
                            <Text style={styles.estimasi}>Akan DIterima Pada {DATA[0].diterima}</Text>
                            <Image source={allLogo.iclineblack} style={styles.iclineblack1} />
                        </View>
                    </View>
 
                    <View>
                        <View style={styles.bodyPayment}>
                            <Pressable onPress={() => NavigatorService.navigate('Pembayaran')}>
                                <View style={styles.payment}>
                                    <Text style={styles.txtPayment}>Metode Pembayaran</Text>
                                    <Text style={styles.txtTransfer}>Transfer Bank</Text>
                                    <Image source={allLogo.iclineblack} style={styles.iclineblack2} />
                                </View>
                            </Pressable>
                            <View style={{ borderWidth: toDp(0.5), borderColor: 'grey' }} />
 
                            <View style={{ flexDirection: 'row', margin: toDp(4), justifyContent: 'space-between' }}>
                                <Text style={styles.txtSubTot}>Subtotal Untuk Produk</Text>
                                <Text style={styles.txtSubTot}>Rp 700.000</Text>
                            </View>
                            <View style={{ flexDirection: 'row', margin: toDp(4), justifyContent: 'space-between' }}>
                                <Text style={styles.txtSubPeng}>Subtotal Pengiriman</Text>
                                <Text style={styles.txtSubPeng}>Rp 50.000</Text>
                            </View>
                            <View style={{ flexDirection: 'row', margin: toDp(4), justifyContent: 'space-between' }}>
                                <Text style={styles.txtBiayaPen}>Biaya Penanganan</Text>
                                <Text style={styles.txtBiayaPen}>Rp 50.000</Text>
                            </View>
                            <View style={{ flexDirection: 'row', margin: toDp(4), justifyContent: 'space-between' }}>
                                <Text style={styles.txtTotPem}>Total Pembayaran</Text>
                                <Text style={styles.txtTotPem1}>Rp 800.000</Text>
                            </View>
                        </View>
                    </View>
                </View>
 
                <View style={{marginTop:toDp(10), bottom:10, position:'absolute'}}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: toDp(335), height: toDp(40),}}>
                      <View style={{ flexDirection: 'column', width: toDp(140), height: toDp(40), backgroundColor: '#2A334B', borderRadius: toDp(10) }}>
                          <Text style={{ textAlign: 'center', color: 'white', backgroundColor: '#2A334B', borderRadius: toDp(10), }}>Total Pembayaran</Text>
                          <Text style={{ textAlign: 'center', color: 'white', }}>{DATA[0].total}</Text>
                      </View>
                      <Pressable style={{ backgroundColor: '#2A334B', borderRadius: toDp(10), width: toDp(120), height: toDp(40) }} onPress={() => NavigatorService.navigate('Successorder')}>
                          <Text style={{ textAlign: 'center', top: toDp(10), color: 'white' }}>Buat Pesanan</Text>
                      </Pressable>
                  </View>
                </View>
            </View>
        </View>
    );
 
}
 
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        // backgroundColor: 'red',
        flex: 1
    },
    Address: {
        backgroundColor: '#C4C4C4',
        width: toDp(335),
        height: toDp(105),
        borderRadius: toDp(8),
        top: toDp(15),
        flexDirection: 'row',
    },
    isiAddress: {
        top: toDp(10),
        marginLeft: toDp(50)
    },
    icaddress1: {
        marginLeft: toDp(10),
        top: toDp(10),
    },
    txtAddress: {
        marginLeft: toDp(20),
        top: toDp(15),
        fontSize: toDp(12)
    },
    icaddress: {
        width: toDp(12),
        height: toDp(12),
        left: toDp(233),
        bottom: toDp(25)
    },
    txtTB: {
        fontWeight: 'bold',
        bottom: toDp(20)
    },
    OrderDetail: {
        backgroundColor: '#C4C4C4',
        borderRadius: toDp(8),
        width: toDp(335),
        height: toDp(110),
        bottom: toDp(15),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
 
        elevation: 2,
    },
    Shipping: {
        backgroundColor: '#C4C4C4',
        borderRadius: toDp(8),
        width: toDp(335),
        height: toDp(95),
        bottom: toDp(5),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
 
        elevation: 2,
    },
    txtOption: {
        color: '#6495ED',
        margin: toDp(4),
        fontSize: toDp(12),
    },
    delivery: {
        fontWeight: 'bold',
        fontSize: toDp(12),
        margin: toDp(4)
    },
    estimasi: {
        fontSize: toDp(12),
        margin: toDp(4),
        bottom: toDp(5)
    },
    icvoucher: {
        margin: toDp(4),
        width: toDp(22),
        height: toDp(12)
    },
    voucher: {
        fontSize: toDp(12),
        margin: toDp(2),
        left: toDp(90)
    },
    iclineblack: {
        width: toDp(10),
        height: toDp(10),
        margin: toDp(4),
        top: toDp(2)
    },
    iclineblack1: {
        width: toDp(10),
        height: toDp(10),
        margin: toDp(4),
        bottom: toDp(45),
        left: toDp(317)
    },
    price: {
        margin: toDp(4),
        right: toDp(53),
        fontSize: toDp(12),
    },
    payment: {
        backgroundColor: '#C4C4C4',
        width: toDp(316),
        height: toDp(105),
        borderRadius: toDp(15),
        top: toDp(10)
    },
    bodyPayment: {
        backgroundColor: '#C4C4C4',
        top: toDp(5),
        borderRadius: toDp(8),
        width: toDp(335),
        height: toDp(130),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
 
        elevation: 2,
    },
    payment: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    txtPayment: {
        margin: toDp(4),
        fontSize: toDp(12)
    },
    txtTransfer: {
        margin: toDp(4),
        fontSize: toDp(12),
        left: toDp(50)
    },
    iclineblack2: {
        width: toDp(10),
        height: toDp(10),
        top: toDp(5),
        margin: toDp(4)
    },
    txtSubTot: {
        fontSize: toDp(12)
    },
    txtSubPeng: {
        fontSize: toDp(12)
    },
    txtBiayaPen: {
        fontSize: toDp(12),
    },
    txtTotPem: {
        fontSize: toDp(13),
        fontWeight: 'bold'
    },
    txtTotPem1: {
        fontSize: toDp(13),
        color: '#6495ED',
        fontWeight: 'bold'
    },
    btnCheckout: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
 
    },
});
 
export default Checkout;