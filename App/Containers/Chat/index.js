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

        <View>
          <Text>ashajshakj</Text>
        </View>

    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    justifyContent:'center',
    top:toDp(50)
  },
});

export default Chat;