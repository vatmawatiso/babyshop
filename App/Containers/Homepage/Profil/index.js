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
import Search from '@Search'

const [src, setSrc]=useState(null);
const Profil = () => {
  return (
    <View style={styles.container}>
      <Search onChangeText={(text)=> setSrc(text)} />
      {/* <StatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'} /> */}
      <View style={styles.profil}>
        <Text style={styles.title}>Profil</Text>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profil: {
    backgroundColor: '#2A334B',
    top: toDp(-190),
    width: toDp(316),
    height: toDp(116),
    borderRadius: toDp(25)
  },
  title: {
    fontSize: toDp(30),
    color: 'white',
  },
});

export default Profil;
