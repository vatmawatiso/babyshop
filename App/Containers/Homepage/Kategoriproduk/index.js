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
  FlatList
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import Carousel, { Pagination } from "react-native-snap-carousel";
import LinearGradient from 'react-native-linear-gradient'
import SelectableChips from 'react-native-chip/SelectableChips'
import Search from '@Search'

const { width, height } = Dimensions.get('window')

const Kategoriproduk = () => {
  const [src, setSrc] = useState(null);
  const [sChip, setChip] = useState(['Dapur', 'Kamar Mandi', 'Atap Rumah', 'Jendela', 'Cat Tembok', 'Peralatan Bangunan', 'Ruang Tamu'])
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba1',
      title: 'Semen',
      harga: 'Rp. 100.000',
      dariKota: 'Kab. Cirebon',
      bintang: '4',
      terjual: '| Terjual 50',
      image: 'https://static.bmdstatic.com/pk/product/large/609a573e90d3d.jpg'
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f632',
      title: 'Batu Bata',
      harga: 'Rp. 50.000',
      dariKota: 'Kab. Cirebon',
      bintang: '4',
      terjual: '| Terjual 50',
      image: 'https://static-siplah.blibli.com/data/images/SNUI-0001-00041/b7e0b435-8780-4c32-87f2-75c7e760e823.jpg'
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d723',
      title: 'Paku',
      harga: 'Rp. 10.000',
      dariKota: 'Kab. Cirebon',
      bintang: '4',
      terjual: '| Terjual 50',
      image: 'https://static-siplah.blibli.com/data/images/SALW-0003-00023/d01cbe3d-4827-473b-98db-8812a08066b3.jpg'
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d724',
      title: 'Paku',
      harga: 'Rp. 10.000',
      dariKota: 'Kab. Cirebon',
      bintang: '4',
      terjual: '| Terjual 50',
      image: 'https://static-siplah.blibli.com/data/images/SALW-0003-00023/d01cbe3d-4827-473b-98db-8812a08066b3.jpg'
    }, {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba5',
      title: 'Semen',
      harga: 'Rp. 80.000',
      dariKota: 'Kab. Cirebon',
      bintang: '4',
      terjual: '| Terjual 50',
      image: 'https://static.bmdstatic.com/pk/product/large/609a573e90d3d.jpg'
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f636',
      title: 'Batu Bata',
      harga: 'Rp. 100.000',
      dariKota: 'Kab. Cirebon',
      bintang: '4',
      terjual: '| Terjual 50',
      image: 'https://static-siplah.blibli.com/data/images/SNUI-0001-00041/b7e0b435-8780-4c32-87f2-75c7e760e823.jpg'
    },
  ]

  const RenderItem = (item, index) => (
    <Pressable>
      <View style={styles.card}>
        <View style={[styles.txtProduct, { height: toDp(30) }]}>
          <Image source={{ uri: item.image }} style={styles.imgProduct} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.textproduct}>{item.title}</Text>
            <Image source={allLogo.icwishlist} style={{ width: toDp(25), height: toDp(25) }} />
          </View>
          <Text style={styles.harga}>{item.harga}</Text>
          <Image source={allLogo.icaddress} style={styles.address} />
          <Text style={styles.dariKota}>{item.dariKota}</Text>
          <Image source={allLogo.icstar} style={styles.star} />
          <Text style={styles.bintang}>{item.bintang}</Text>
          <Text style={styles.terjual}>{item.terjual}</Text>
        </ View>
      </ View>
    </Pressable>
  );

  const CardProduct = () => {
    return (
      <FlatList style={{ backgroundColor: 'white', minHeight: toDp(400), width: width, marginTop: toDp(-10), }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          bottom: toDp(13),
          paddingBottom: toDp(3),

        }}

        numColumns={2}
        data={DATA}
        renderItem={({ item, index }) => {
          return (
            RenderItem(item, index)
          )
        }}
        ListFooterComponent={() => <View style={{ height: toDp(100) }} />}
      />
    )
  }




  return (
    <View style={styles.container}>
      <ScrollView style={styles.ScrollView}>
        {/* <Search onChangeText={(text)=> setSrc(text)} /> */}
        <View style={{ width: '100%', marginTop: toDp(1), flexDirection: 'column', height: toDp(100) }}>
          <View style={{ width: '100%' }}>
            <Text style={{ fontSize: toDp(10), fontWeight: 'bold', fontSize: toDp(13), marginLeft: toDp(14) }}>Kategori</Text>
          </View>
          <View style={{ width: '100%' }}>
            <SelectableChips
              initialChips={sChip}
              onChangeChips={(chips) => console.log(chips)}
              alertRequired={false}
              chipStyle={{
                fontSize: toDp(10),
                backgroundColor: '#2A334B',
                left: toDp(10),
                top: toDp(6),
              }}
              valueStyle={{
                fontSize: toDp(8),
                color: 'white'
              }}

              onPress={() => this.selectChip(item)}

            />
          </View>
        </View>

        <View style={styles.content}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <Pressable onPress={() => alert('coba')}>
              <View style={styles.product}>
                <Image source={allLogo.palu} style={styles.imgProduk} />
                <Text style={styles.text}>Palu</Text>
              </View>
            </Pressable>

            <Pressable onPress={() => alert('coba')}>
              <View style={styles.product}>
                <Text style={styles.text}>Batu Bata</Text>
                <Image source={allLogo.palu} style={styles.imgProduk} />
              </View>
            </Pressable>

            <Pressable onPress={() => alert('coba')} >
              <View style={styles.product}>
                <Text style={styles.text}>Semen</Text>
                <Image source={allLogo.palu} style={styles.imgProduk} />
              </View>
            </Pressable>

            <Pressable onPress={() => alert('coba')} >
              <View style={styles.product}>
                <Image source={allLogo.cat} style={styles.imgProduk} />
                <Text style={styles.text}>Cat Tembok</Text>
              </View>
            </Pressable>

            <Pressable onPress={() => alert('coba')} >
              <View style={styles.product}>
                <Text style={styles.text}>Peralatan Dapur</Text>
                <Image source={allLogo.palu} style={styles.imgProduk} />
              </View>
            </Pressable>

            <Pressable onPress={() => alert('coba')} >
              <View style={styles.product}>
                <Text style={styles.text}>Atap Rumah</Text>
                <Image source={allLogo.cat} style={styles.imgProduk} />
              </View>
            </Pressable>

            <Pressable onPress={() => alert('coba')} >
              <View style={styles.product}>
                <Text style={styles.text}>Batu Bata</Text>
                <Image source={allLogo.cat} style={styles.imgProduk} />
              </View>
            </Pressable>

            <Pressable onPress={() => alert('coba')} >
              <View style={styles.product}>
                <Text style={styles.text}>Semen</Text>
                <Image source={allLogo.cat} style={styles.imgProduk} />
              </View>
            </Pressable>

            <Pressable onPress={() => alert('coba')} >
              <View style={styles.product}>
                <Text style={styles.text}>Cat Tembok</Text>
                <Image source={allLogo.cat} style={styles.imgProduk} />
              </View>
            </Pressable>

            <Pressable onPress={() => alert('coba')} >
              <View style={styles.product}>
                <Text style={styles.text}>Batu Bata</Text>
                <Image source={allLogo.cat} style={styles.imgProduk} />
              </View>
            </Pressable>

            <Pressable onPress={() => alert('coba')} >
              <View style={styles.product}>
                <Text style={styles.text}>Semen</Text>
                <Image source={allLogo.cat} style={styles.imgProduk} />
              </View>
            </Pressable>

          </ScrollView>
        </View>

        <View style={styles.textVocher}>
          <View style={styles.judul1}>
            <Text style={[styles.textVocher, { fontWeight: 'bold' }]}>Promo dan Vocher T.B Global Energy</Text>
          </View>
        </View>
        <View style={styles.contentVocher}>
          <Pressable style={{ left: toDp(65), top: toDp(15) }} onPress={() => alert('coba')}>
            <View style={[styles.vocher, { height: toDp(103) }]}>
              <Image source={allLogo.diskon} style={styles.imgVocher} />
              <Text style={styles.titleVocher}>Diskon</Text>
            </View>
          </Pressable>

          <Pressable style={{ left: toDp(65), top: toDp(15) }} onPress={() => alert('coba')}>
            <View style={styles.vocher}>
              <Image source={allLogo.cashback} style={styles.imgVocher} />
              <Text style={styles.titleVocher}>Casback</Text>
            </View>
          </Pressable>

          <Pressable style={{ left: toDp(65), top: toDp(15) }} onPress={() => alert('coba')}>
            <View style={styles.vocher}>
              <Image source={allLogo.gratisongkir} style={styles.imgVocher} />
              <Text style={styles.titleVocher}>Gratis Ongkir</Text>
            </View>
          </Pressable>
        </View>
        <View style={styles.titleContent}>
          <Text style={styles.textContent}>Bahan Bangunan Berkualitas</Text>
        </View>

        <CardProduct />
      </ScrollView>
    </View>
  )

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: toDp(13),
    color: 'black',
    top: toDp(25),
    right: toDp(75)
  },
  content: {
    top: toDp(-5),
    backgroundColor: 'white',
    height: toDp(75)
  },
  presable: {
    justifyContent: 'center',
    top: toDp(30)
  },
  textButton1: {
    right: toDp(130),
    backgroundColor: '#C4C4C4',
    height: toDp(11),
    width: toDp(50),
    borderRadius: toDp(20),
    textAlign: 'center'
  },
  textButton2: {
    top: toDp(-11),
    right: toDp(58),
    backgroundColor: '#C4C4C4',
    height: toDp(11),
    width: toDp(80),
    borderRadius: toDp(20),
    textAlign: 'center'
  },
  textButton3: {
    top: toDp(-22),
    right: toDp(-29),
    backgroundColor: '#C4C4C4',
    height: toDp(11),
    width: toDp(80),
    borderRadius: toDp(20),
    textAlign: 'center'
  },
  textButton4: {
    top: toDp(-33),
    right: toDp(-116),
    backgroundColor: '#C4C4C4',
    height: toDp(11),
    width: toDp(80),
    borderRadius: toDp(20),
    textAlign: 'center'
  },
  textButton5: {
    top: toDp(-28),
    right: toDp(130),
    backgroundColor: '#C4C4C4',
    height: toDp(11),
    width: toDp(50),
    borderRadius: toDp(20),
    textAlign: 'center'
  },
  textButton6: {
    top: toDp(-39),
    right: toDp(49),
    backgroundColor: '#C4C4C4',
    height: toDp(13),
    width: toDp(100),
    borderRadius: toDp(20),
    textAlign: 'center'
  },
  textButton7: {
    top: toDp(-51),
    right: toDp(-48),
    backgroundColor: '#C4C4C4',
    height: toDp(11),
    width: toDp(80),
    borderRadius: toDp(8),
    textAlign: 'center'
  },
  product: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    backgroundColor: '#C4C4C4',
    textAlign: 'center',
    borderRadius: toDp(20),
    width: toDp(70),
    height: toDp(70),
    fontSize: toDp(10),
    margin: toDp(10),
    paddingTop: toDp(53)
  },
  imgProduk: {
    position: 'absolute',
    zIndex: 1,
    marginLeft: toDp(20),
    top: toDp(10)
  },
  text2: {
    backgroundColor: 'red',
    textAlign: 'center',
    borderRadius: toDp(20),
    width: toDp(64),
    height: toDp(64),
    margin: toDp(5),
    color: 'white',
    paddingTop: toDp(35)
  },
  textVocher: {
    right: toDp(32),
    top: toDp(3),
    fontSize: toDp(13)
  },
  judul: {
    left: toDp(89)
  },
  judul1: {
    left: toDp(79)
  },
  contentVocher: {
    flexDirection: 'row',
    right: toDp(59),
    bottom: toDp(5)
  },
  vocher: {
    // top: toDp(10),
    backgroundColor: '#C4C4C4',
    margin: toDp(5),
    paddingRight: toDp(20),
    // left: toDp(65),
    borderRadius: toDp(20)
  },
  titleVocher: {
    textAlign: 'center',
    left: toDp(10),
    bottom: toDp(8)
  },
  imgVocher: {
    left: toDp(10)
  },
  textContent: {
    bottom: toDp(12),
    right: toDp(83),
    fontSize: toDp(13),
    fontWeight: 'bold',
  },
  titleContent: {
    left: toDp(97),
    paddingBottom: toDp(5),
    marginTop: toDp(20)
  },
  card: {
    backgroundColor: 'white',
    bottom: toDp(-15),
    padding: toDp(25),
    marginVertical: toDp(5),
    marginHorizontal: toDp(16),
    borderRadius: toDp(20),
    height: toDp(221),
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
  bintang: {
    bottom: toDp(17),
    left: toDp(15)
  },
  terjual: {
    bottom: toDp(37),
    left: toDp(28)
  },
  address: {
    bottom: toDp(-4)
  },
  star: {
    bottom: toDp(3),
    right: toDp(0)
  },
  dariKota: {
    bottom: toDp(6),
    left: toDp(15)
  },
  textproduct: {
    fontWeight: 'bold',
    fontSize: toDp(12)
  },
  txtProduct: {
    width: '100%',
    backgroundColor: 'white',
    marginTop: toDp(-16),
    marginBottom: toDp(50)
  },
  imgProduct: {
    width: toDp(100),
    height: toDp(100)
  }
});

export default Kategoriproduk;
