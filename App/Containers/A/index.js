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

const A = () => {
    return (
        <View style={styles.container}>
            <View style={{width:'100%', padding: 10, backgroundColor:'white'}}>
               <Pressable onPress={()=>NavigatorService.navigate('Map')}>
                  <View style={{flexDirection:'column',}}>
                      <Text style={{fontSize:15, fontWeight:'bold'}}>Your Location</Text>
                      <Text style={{fontSize:12}}>Change Here</Text>
                  </View>
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
