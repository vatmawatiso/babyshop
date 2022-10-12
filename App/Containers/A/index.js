import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar,
    ScrollView,
    Dimensions,
    ImageBackground,
    Pressable,
    FlatList,
    AsyncStorage,
    LogBox,
    TouchableOpacity,
    ToastAndroid,
    PermissionsAndroid
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import LinearGradient from 'react-native-linear-gradient'
import Search from '@Search'
import NavigatorService from '@NavigatorService'
import Axios from "axios";
import { svr } from "../../Configs/apikey";
// import { TouchableOpacity } from "react-native-gesture-handler";
const { width, height } = Dimensions.get('window')

const A = (props) => {

    const [state, setState] = useState({
        lat: '',
        long: '',
    })

    useEffect(() => {
        setKordinat()

    }, [])

    const setKordinat = () => {

        AsyncStorage.getItem('kordinat').then(response => {
            let data = JSON.parse(response);
            console.log('cek lat = ', data);
            setState(state => ({
                ...state,
                lat: data.latitude,
                long: data.longitude
            }))


            console.log('cek kordinat bener apa gak : ' + state.lat + ' | ' + state.long);

        }).catch(err => {
            console.log('err', err)
        })

    }

    return (
        <View style={styles.container}>
            <View style={{ width: '100%', padding: 10, backgroundColor: 'white', width: toDp(340), height: toDp(48), }}>
                <Pressable onPress={() => NavigatorService.navigate('Map')}>
                    <View style={{ flexDirection: 'column', }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Your Location</Text>
                        <Text style={{ fontSize: 12 }}>Change Here</Text>
                    </View>
                </Pressable>
            </View>

            <View style={{ backgroundColor: 'white', width: toDp(340), height: toDp(48), borderRadius: toDp(10), marginTop: toDp(20) }}>
                <Pressable onPress={() => NavigatorService.navigate('Beranda', {lat: state.lat, long: state.long})}>
                    <Text>Kembali</Text>
                </Pressable>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f3f3f3',
        padding: 10
    },


});

export default A;
