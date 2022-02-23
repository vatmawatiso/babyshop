import React, { Picker, useState, useEffect, Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Button,
  Modal,
  StatusBar,
  Pressable,
  ScrollView
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import  Header  from '@Header'
import NavigatorService from '@NavigatorService'
import Carousel, { Pagination } from "react-native-snap-carousel";
import LinearGradient from 'react-native-linear-gradient'
import CollapsibleView from "@eliav2/react-native-collapsible-view";
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { Thumbnail, List, ListItem, Separator } from 'native-base';


const { width, height } = Dimensions.get('window')

const Produk = (props) => {


    const [state, setState] = useState({
        arrayFriends: [
          {
            value:{
            picture: 'https://sc04.alicdn.com/kf/Hecf7550c5eda410e83757893019d57a7Z.jpg',
            name: 'TB Abadi jaya',
            harga: 'Rp 500.000',
            rating: '5.8',
            terjual: '27'}
          }, {
            value:{
            picture: 'https://sc04.alicdn.com/kf/Hfa2817ad10804b7dbb847a43def8a3ce9.jpg',
            name: 'TB Tembang Pantura',
            harga: 'Rp 500.000',
            rating: '5.8',
            terjual: '27'}
          }, {
            value:{
            picture: 'https://sc04.alicdn.com/kf/H6d5cf1f618734ee9a04dbd57383ad546l.jpg',
            name: 'TB Maju Jaya',
            harga: 'Rp 500.000',
            rating: '5.8',
            terjual: '27'}
          }, {
            value:{
            picture: 'https://sc04.alicdn.com/kf/H054ec1fc8ba04bc9add21665e8f5ab92a.jpg',
            name: 'TB Sumber Jaya',
            harga: 'Rp 500.000',
            rating: '5.8',
            terjual: '27'}
          }, {
            value:{
            picture: 'https://sc04.alicdn.com/kf/Hf4bf3ce3f6c244c7822a5f633ba080feB.jpg',
            name: 'TB Sumber Kasih FM',
            harga: 'Rp 500.000',
            rating: '5.8',
            terjual: '27'}
          }
        ],
        arrayUsers: [],
        arrayData:[],
        loading: false
      })


      const DATA = [
        {
          id: '1',
          name: 'TB Sumber Kasih FM',
          harga: 'Rp 500.000 - 700.000',
          rating: '5.8',
          terjual: '27',
          stok: '5',
          warna: 'Hijau, Merah, Kuning, Biru',
          beban: '100kg',
          kapasitas: '4CBF',
          dikirimdari: 'Indonesia Kota bandung'
        },
      ]

     
    
      const renderItemExpore = (item, index) => {
        //console.log('item', item);
        return (
          <View style={styles.viewRenderExplore}>
            <View style={styles.viewImage}>
              <LinearGradient colors={['#C4C4C4', 'transparent']} style={styles.gradientTop} />
              <Image source={{uri: item.item.value.picture}} style={styles.imageProfile} />
              <LinearGradient colors={['transparent', '#3A3A3ACC']} style={styles.gradientBottom} />
            </View>
         
          </View>
        )
      }

      return (
        <View style={styles.container}>
          <Header
            title={'Produk'}
            onPress={() => props.navigation.goBack()}
          />

              <View style={{width:'100%', height: toDp(230), bottom:toDp(55), backgroundColor: 'white'}}>
                <Carousel
                  layout={"default"}
                  data={state.arrayFriends}
                  sliderWidth={width}
                  itemWidth={toDp(350)}
                  renderItem={(item, index) => renderItemExpore(item, index)}
                  onSnapToItem = { index => setState(state => ({...state, activeIndex: index})) }
                />
              </View> 

              <View style={styles.content}>
                  {RenderItem(DATA,0)}
              </View>
            
              <View style={styles.Ulasan}>
                  <Text style={styles.txtUlasan}>Ulasan Pembeli</Text>
                    <CollapsibleView 
                      title={<Text style={styles.txtLihat}>Lihat Lainnya</Text>}
                      arrowStyling={{ rounded: true, thickness: 1, color: "black" }}
                      collapsibleContainerStyle={{position: "absolute", top: "100%", right:toDp(70)}}
                      style={{ borderWidth: 0,
                              left:toDp(60),

                      }}>
                        <Text>hey there!</Text>
                        <Text>hey there!</Text>
                        <Text>hey there!</Text>
                        <Text>hey there!</Text>
                    </CollapsibleView>
                 
              </View>
              <View style={styles.btnMenu}>
                  <Pressable style={{ left:toDp(25)}} onPress={() => NavigatorService.navigate('Chat')}>
                      <Image source={allLogo.icchatWhite} style={styles.icchatWhite}/>
                  </Pressable>
                  <Pressable style={{ left:toDp(30)}} onPress={() => NavigatorService.navigate('Keranjang')}>
                      <Image source={allLogo.iccartWhite} style={styles.iccartWhite}/>
                  </Pressable>
            
                  <View style={{borderWidth:0.5, borderColor:'white', width:50, rotation:90 }} />
                  <Pressable style={{ right:toDp(30)}} onPress= {() => NavigatorService.navigate('Checkout')} >
                      <Text style={styles.txtBeli}>Beli Sekarang</Text>
                  </Pressable>
              </View>
                
        </View>
      )};

      const RenderItem = (item, index) => {
        return (

          <View style={styles.detailProduk}>
              <View>
                  <Text style={{marginBottom:10}}>{item[index].name}</Text>
                  <Text style={{marginBottom:5}}>{item[index].harga}</Text>
                  <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                      <Text>{item[index].rating}      {item[index].terjual} Terjual</Text>
                      <Image source={allLogo.icwishlist} style={{left:toDp(100), bottom:toDp(5)}}/>
                  </View>
              </View>

                <Text style={{fontWeight:'bold', top:toDp(2)}}>Rincian Produk</Text>
                <View style={{top:toDp(10)}}>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text>Stok</Text>
                        <Text style={{right:toDp(80)}}>{item[index].stok}</Text>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text>Beban Kapasitas</Text>
                        <Text style={{right:toDp(50)}}>{item[index].beban}</Text>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text>Warna</Text>
                        <Text style={{left:toDp(69)}}>{item[index].warna}</Text>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text>Kapasitas</Text>
                        <Text style={{right:toDp(55)}}>{item[index].kapasitas}</Text>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text>Dikirim Dari </Text>
                        <Text style={{left:toDp(63)}}>{item[index].dikirimdari}</Text>
                    </View>
                </View>

                <View>
                <Collapse style={{top:toDp(15), left:toDp(50)}}>
                  <CollapseHeader>
                    <View style={{alignItems:'center'}}>
                      <Text style={{color:'grey'}}>Lihat Selengkapnya</Text>
                    </View>
                  </CollapseHeader>
                  <CollapseBody>
                  <View style={{top:toDp(5), right:50}}>
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                            <Text>Stok</Text>
                            <Text style={{right:toDp(80)}}>{item[index].stok}</Text>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                            <Text>Beban Kapasitas</Text>
                            <Text style={{right:toDp(50)}}>{item[index].beban}</Text>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                            <Text>Warna</Text>
                            <Text style={{left:toDp(69)}}>{item[index].warna}</Text>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                            <Text>Kapasitas</Text>
                            <Text style={{right:toDp(55)}}>{item[index].kapasitas}</Text>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                            <Text>Dikirim Dari </Text>
                            <Text style={{left:toDp(63)}}>{item[index].dikirimdari}</Text>
                        </View>
                    </View>
                  </CollapseBody>
                </Collapse>

                </View>
                
                
          </View>

        )

      };

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    top: toDp(50),
  },
  contentContainer: {
    paddingVertical: 20
  },
  dropdown:{
    height:25,
    borderRadius:40,
    width:100,
  },
  viewRenderExplore: {
    backgroundColor:'white',
    width: '100%',
    height: toDp(200),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: toDp(16),
    marginTop: toDp(0),
    padding: toDp(10),
    top: toDp(10)
  },
  viewImage: {
    width: '100%',
    height: toDp(200),
    resizeMode: 'contain',
    position:'absolute',
  },
  imageProfile: {
    width: '100%',
    height: '100%',
    borderRadius: toDp(16),
    position: 'absolute',
    resizeMode: 'contain',
    justifyContent:'center',
    alignItems:'center',
  },
  gradientTop: {
    width: '100%',
    height: toDp(130),
    top: toDp(0),
    borderTopLeftRadius: toDp(16),
    borderTopRightRadius: toDp(16),
    zIndex: 1,
  },
  gradientBottom: {
    width: '100%',
    height: toDp(130),
    borderBottomLeftRadius: toDp(16),
    borderBottomRightRadius: toDp(16),
    position: 'absolute',
    bottom: toDp(0),
  },
  touchSilangExplore: {
    padding: toDp(4),
    position: 'absolute',
    right: toDp(16),
    top: toDp(16),
  },
  detailProduk: {
    bottom:toDp(65),
    right:toDp(50),
    
  },
  Ulasan: {
    backgroundColor:'#C4C4C4',
    width:toDp(335),
    height:toDp(47),
    bottom:toDp(45),
    borderRadius:toDp(15),
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  txtUlasan: {
    marginLeft:toDp(15)
  },
  txtLihat: {
    marginRight:toDp(60)
  },
  btnMenu: {
    flexDirection:'row', 
    bottom:toDp(38), 
    backgroundColor:'#2A334B', 
    width:toDp(335), 
    height:toDp(52), 
    borderRadius:toDp(15), 
    justifyContent:'space-between', 
    alignItems:'center'
  },
  txtBeli: {
    color:'white',
  }
});

export default Produk;
