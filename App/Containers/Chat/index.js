import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ImageBackground,
  Pressable
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import  BackHeader  from '@BackHeader'
import { Card } from "react-native-paper";
import NavigatorService from '@NavigatorService'
import { TextInput } from "react-native-gesture-handler";

const Chat = (props) => {
  const [src, setSrc]=useState(null);

  const data = [
    {
      id: '1',
      namaTB: 'Jaya Abadi',
    },
  ]

  const [state, setState] = useState({
    loading: false,
    secureTextEntry: true,
    username: '',
    password: ''
})

  return (
    <View style={styles.container}>

        <BackHeader
          title={data[0].namaTB}
          onPress={() => props.navigation.goBack()}
        />
  
        <View style={styles.BodyChat}>
            <View style={styles.content}>
                 <TextInput autoCapitalize={'none'}
                            style={[styles.textInput, {marginTop: toDp(-11)}]}
                            placeholder={'Password'}
                            placeholderTextColor={'whitesjdhsjdhjsd'}
                            secureTextEntry={state.secureTextEntry}
                            value={state.password}
                            onChangeText={(text) => setState(state => ({...state, password: text})) }
                 />
                 <Pressable style={styles.presableShow}>
                     <Image source={allLogo.icfolder} style={styles.icfolder} />
                 </Pressable>
            </View>
            <Pressable style={styles.btnKirim}>
              <Image source={allLogo.icvector} />
            </Pressable>
        </View>

    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    justifyContent:'center',
    top:toDp(50),
  },
  BodyChat: {
    top:toDp(485),
    flexDirection:'row',
    alignItems:'center'
  },
  icfolder: {
    marginRight:toDp(10),
    width:toDp(28),
    height:toDp(22),
    tintColor:'white'
  },
  content: {
    top:toDp(35),
  },
  textInput: {
    width:toDp(270),
    height:toDp(40),
    backgroundColor: '#2A334B',
    paddingHorizontal: toDp(8),
    borderRadius: toDp(15),
    marginHorizontal:toDp(10)
  },
  presableShow: {
    padding: toDp(4),
    position: 'absolute',
    // backgroundColor:'cyan',
    bottom: Platform.OS === 'ios' ? toDp(5) : toDp(5),
    left: Platform.OS === 'ios' ? toDp(235) : toDp(235),
  },
  btnKirim: {
    backgroundColor:'#2A334B',
    top:toDp(30),
    width:toDp(58),
    height:toDp(40),
    borderRadius: toDp(15),
    justifyContent:'center',
    alignItems:'center'
  }
});

export default Chat;