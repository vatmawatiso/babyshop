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
import Header from '@Header';
import { toDp } from '@percentageToDP';
import NavigatorService from '@NavigatorService';
 
const underConstruction = (props) => {
    return (
        <View style={styles.container}>
            <Image source={allLogo.ic_underConst2} style={styles.imgUnderConst2}/>
                <View style={styles.viewTxtImg}>
                    <Text style={styles.txt1}>Sorry This Page Under Constraction</Text>
                <Text style={styles.txt2}>We Are Working On It!</Text>
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
        flex: 1,
        backgroundColor: 'white'

    },
    viewTxtImg: {
        justifyContent: 'center',
        alignItems: 'center',
        top: toDp(15)
    },
    imgUnderConst: {
        width: toDp(150),
        height: toDp(150)
    },
    txt1: {
        fontSize: toDp(20),
        fontWeight: 'bold',
        padding: toDp(5)
    },
    txt2: {
        fontSize: toDp(20)
    },
    imgUnderConst2: {
        width: toDp(180),
        height: toDp(180)
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

export default underConstruction;