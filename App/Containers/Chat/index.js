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
import  NonCart  from '@NonCart'
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
  return (
    <View style={styles.container}>

        <NonCart
          title={data[0].namaTB}
          onPress={() => props.navigation.goBack()}
        />

        <View style={styles.content}>
            <Text>Chat</Text>
        </View>

        <View style={styles.chat}>
            <TextInput style={styles.txtChat}>Masukkan Pesan</TextInput>
                <Pressable style={styles.buttonChat}>
                    {/* <Image source={allLogo.icvector} style={styles.icvector} /> */}
                </Pressable>
        </View>

    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    top:toDp(50)
  },
  chat: {
      top:toDp(430)
  },
  txtChat: {
      justifyContent:'space-between',
      backgroundColor:'cyan',
      borderRadius:toDp(15),
      width:toDp(260),
      height:toDp(34)
  }
});

export default Chat;