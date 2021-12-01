import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  ImageBackground,
  Pressable
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';

const Notification = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notification</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: toDp(30),
    fontWeight: 'bold',
    color: 'black',
  },
});

export default Notification;
