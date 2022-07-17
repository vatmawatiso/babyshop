import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    TextInput,
    FlatList,
    Pressable,
    ScrollView,
    AsyncStorage,
    TouchableOpacity
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import NavigatorService from '@NavigatorService'
 
const emptyCart = (props) => {
    return (
        <View style={styles.container}>
            <Image source={allLogo.ic_underConst} style={styles.imgUnderConst}/>
                <View style={styles.viewTxtImg}>
                    <Text style={styles.txt1}>Your Cart Is Empty</Text>
                {/* <Text style={styles.txt2}>We Are Working On It!</Text> */}
            </View>
                <Pressable style={styles.btnBack} onPress={() => NavigatorService.reset('Homepage')}>
                    <Text style={styles.txtBack}>Back</Text>
                </Pressable>
            </View>
        );
    }
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        flex: 1,

    },
    viewTxtImg: {
        justifyContent: 'center',
        alignItems: 'center',
        top: toDp(15),
    },
    imgUnderConst: {
        width: toDp(150),
        height: toDp(150)
    },
    txt1: {
        fontSize: toDp(20),
        fontWeight: 'bold'
    },
    imgUnderConst: {
        width: toDp(250),
        height: toDp(250)
    },
    btnBack: {
        width: toDp(50),
        height: toDp(50),
        top: toDp(20)
    },
    txtBack: {
        fontSize: toDp(18),
        color: 'blue'
    }
});

export default emptyCart;