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
  Alert,
  TouchableOpacity,
  ToastAndroid,
  BackHandler
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import LinearGradient from 'react-native-linear-gradient'
import Header from '@Header'
import NavigatorService from '@NavigatorService'
import Axios from "axios";
import { svr } from "../../Configs/apikey";
// import { TouchableOpacity } from "react-native-gesture-handler";
const { width, height } = Dimensions.get('window')
import MapView, { Marker, LocalTile } from 'react-native-maps'; //setting lokasi
const latitudeDelta = 0.025  //setting lokasi
const longitudeDelta = 0.025 //setting lokasi

const Peta = (props) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [state, setState] = useState({
    lat: '',
    long: '',
    region: {
      latitudeDelta,
      longitudeDelta,
      latitude: -6.9032739,  //setting ke lokasi bandung
      longitude: 107.5731164 //setting ke lokasi bandung
    },
  })

  //setting lokasi
  const changeValue = region => {
    setState({ region })
    console.log('Kordinate:' + JSON.stringify(region));

    AsyncStorage.setItem('kordinat', JSON.stringify(region))
    console.log('cek kordinat = ', JSON.stringify(region))
    //log gunakan region.latitude dan region.longitude
  }


  const backActions = () => {
    let asal = props.navigation.state.params.asalProps;
    if (asal == 'ubahToko') {
      Alert.alert('Konfirmasi', 'Simpan Perubahan Lokasi?', [
        {
          text: 'Tidak',
          onPress: () => null,
          style: "cancel"
        },
        { text: 'Ya Simpan', onPress: () => NavigatorService.navigate('Ubahtoko') }
      ]);
      return true;
    } else {
      Alert.alert('Konfirmasi', 'Simpan Lokasi?', [
        {
          text: 'Tidak',
          onPress: () => null,
          style: "cancel"
        },
        { text: 'Ya Simpan', onPress: () => NavigatorService.navigate('Pengajuan') }
      ]);
      return true;
    }

  };

  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    backActions

  );


  return (

    <View style={styles.container}>

      <View style={{ width: '100%' }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Your Location</Text>
        <Text style={{ fontSize: 12 }}>Change Here</Text>
      </View>


      {/**/}
      <MapView style={styles.map}
        showsMyLocationButton={true}
        zoomControlEnabled={true}
        rotateEnabled={true}
        userLocationPriority='high'
        showsUserLocation={true}
        initialRegion={state.region}
        onRegionChangeComplete={changeValue}
      >
      </MapView>
      <View style={styles.markerFixed}>
        <Image style={{
          height: 70,
          width: 107
        }} source={allLogo.markerIcon} />
      </View>
      <Pressable onPress={() => backActions()} style={{ backgroundColor: '#06BA0D', paddingTop: 10, paddingBottom: 10, paddingLeft: 18, paddingRight: 18, borderRadius: 6, bottom: 0 }}>
        <Text style={{ color: 'white' }}>Set Location</Text>
      </Pressable>

      {/* {state.asalHal == 'ubahToko' ?
        <>
          <Pressable onPress={() => NavigatorService.navigate('Ubahtoko')} style={{ backgroundColor: '#06BA0D', paddingTop: 10, paddingBottom: 10, paddingLeft: 18, paddingRight: 18, borderRadius: 6, bottom: 0 }}>
            <Text style={{ color: 'white' }}>Set Perubahan Location</Text>
          </Pressable>
        </>
        :
        <>
          <Pressable onPress={() => backActions()} style={{ backgroundColor: '#06BA0D', paddingTop: 10, paddingBottom: 10, paddingLeft: 18, paddingRight: 18, borderRadius: 6, bottom: 0 }}>
            <Text style={{ color: 'white' }}>Set Location</Text>
          </Pressable>
        </>
      } */}

    </View>
  )

  // onPress={()=> alert(state.region.longitude+' | '+state.region.latitude)}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  wrapper: {
    ...StyleSheet.absoluteFillObject
  },
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject
  },
  markerFixed: {
    left: '50%',
    marginLeft: -52,
    marginTop: -70,
    position: 'absolute',
    top: '50%'
  },
  marker: {
    height: 48,
    width: 48
  },
});

export default Peta;
