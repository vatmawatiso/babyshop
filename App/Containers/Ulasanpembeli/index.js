import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ImageBackground,
  Pressable,
  SafeAreaView,
  Dimensions,
  FlatList,
  Modal,
  TouchableOpacity
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import  NonCart  from '@NonCart'
import { Card } from "react-native-paper";
import NavigatorService from '@NavigatorService'
import { TextInput } from "react-native-gesture-handler";

const { width, height } = Dimensions.get('window')

const Ulasanpembeli = (props) => {
  const [src, setSrc]=useState(null);

  const [modalVisible, setModalVisible] = useState(false);

  const DATA = [
    {
      id: '1',
      nama: 'Vatmawati',
      bintang: 'bintang5',
      like: '5',
      komentar: 'Pengiriman sangat cepat, produk masih aman, pembukusan sangat rapih',
      image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    },
    {
      id: '2',
      nama: 'Tiefani Permata',
      bintang: 'bintang5',
      like: '15',
      komentar: 'Pengiriman sangat cepat, produk masih aman, pembukusan sangat rapih',
      image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    },
    {
      id: '3',
      nama: 'Aay Humairoh',
      bintang: 'bintang5',
      like: '20',
      komentar: 'Pengiriman sangat cepat, produk masih aman, pembukusan sangat rapih',
      image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
    },
    {
        id: '4',
        nama: 'Hayya Athiyah',
        bintang: 'bintang5',
        like: '5',
        komentar: 'Pengiriman sangat cepat, produk masih aman, pembukusan sangat rapih',
        image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
      },
      {
        id: '5',
        nama: 'Budi Setiawan',
        bintang: 'bintang5',
        like: '15',
        komentar: 'Pengiriman sangat cepat, produk masih aman, pembukusan sangat rapih',
        image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
      },
      {
        id: '6',
        nama: 'Lili Rahayu',
        bintang: 'bintang5',
        like: '20',
        komentar: 'Pengiriman sangat cepat, produk masih aman, pembukusan sangat rapih',
        image: 'https://img-9gag-fun.9cache.com/photo/a4QjKv6_700bwp.webp'
      },
  ];

  const title = (text) => {
    let newText = text.substr(0,11);
  
    return(
      <Text>{newText}</Text>
    )
  }

  const RenderItem = (item, index) => (
    <Pressable onPress={()=> alert('Produk : '+index)}>
      <View style={styles.card}>
          <View style={styles.Ulasan}>
             <Image source={{uri: item.image}} style={styles.image} />
             <Text style={styles.nama}>{title(item.nama)}</Text>
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Hello World!</Text>
                            <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                            >
                            <Text style={styles.textStyle}>Hide Modal</Text>
                            </Pressable>
                        </View>
                        </View>
                    </Modal>
                    <Pressable
                        style={[styles.button, styles.buttonOpen]}
                        onPress={() => setModalVisible(true)}>
                        <Image source={allLogo.icmore} style={styles.icmore1} />
                    </Pressable>
                </View>
          </ View>
          <View style={{flexDirection:'row', margin:toDp(5), bottom:toDp(8), marginLeft:toDp(39)}}>
             <Image source={allLogo.icstar} style={styles.icstar} />
             <Image source={allLogo.icstar} style={styles.icstar} />
             <Image source={allLogo.icstar} style={styles.icstar} />
             <Image source={allLogo.icstar} style={styles.icstar} />
             <Image source={allLogo.icstar} style={styles.icstar} />
          </View>
          <Text style={styles.txtKomen}>Pipa sesuai dengan foto, kualitas pipa sangat bagus, tapi pengiriman barang sangat lama, pesan tgl 1  dan barang sampai tgl 8 . .</Text>
      </ View>
    </Pressable>
  );

  const CardProduct = () =>{
    return(
      <FlatList style={{ minHeight:400, width:width, marginTop:10, marginBottom:toDp(45)}}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{
            marginTop: toDp(3),
            paddingBottom: toDp(3),

          }}

          numColumns={1}
          data={DATA}
            renderItem={({item, index}) => {
              return (
                RenderItem(item, index)
              )
            }}
          ListFooterComponent={() => <View style={{height: toDp(100)}} />}
        />
    )
  }

   
  return (
    <View style={styles.container}>

        <NonCart
          title={'Ulasan'}
          onPress={() => props.navigation.goBack()}
        />

        <View style={{bottom:0}}>
            <CardProduct/>
        </View>

       
  

    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    justifyContent:'center',
    top:toDp(50),
  },
  card: {
    backgroundColor: 'white',
    padding: toDp(15),
    marginVertical: toDp(5),
    marginHorizontal: toDp(16),
    borderRadius:toDp(10),
    height: toDp(150),
    right: toDp(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  
    elevation: 5,
  },
  Ulasan: {
    // backgroundColor:'cyan',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  image:{
    width: toDp(30),
    height:toDp(30),
    borderRadius:toDp(10)
  },
  iclike: {
    width: toDp(24),
    height:toDp(20),
  },
  icmore: {
    width: toDp(24),
    height:toDp(24),
  },
  icmore1: {
    width: toDp(24),
    height:toDp(24),
    bottom:9,
    right:10
  },
  nama: {
      marginRight:toDp(160)
  },
  txtKomen: {
    marginLeft:toDp(39),
    bottom:toDp(5)
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    top:toDp(5)
  },
  buttonOpen: {
    // backgroundColor: "#F194FF",
    width:toDp(25),
    height:toDp(25)
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }

});

export default Ulasanpembeli;