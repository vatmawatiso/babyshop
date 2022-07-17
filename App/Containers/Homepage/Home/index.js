import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Pressable,
  FlatList,
  ScrollView,
  AsyncStorage, LogBox
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import NavigatorService from '@NavigatorService'
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Card } from "react-native-paper";
import LinearGradient from 'react-native-linear-gradient'
import Axios from "axios";
import NumberFormat from 'react-number-format';

const { width, height } = Dimensions.get('window');
const itemWidth = (width - 15) / 2;

const Home = (props) => {
  const [wish, setWish] = useState([])
  const [pid, setPid] = useState('MB000000032')
  const [selectedItems, setSelectedItems] = useState([]);
  const [current, setCurrent] = useState(0)
  const [state, setState] = useState({
    id: '',
    arrayUsers: [],
    arrayData: [],
    lainnya:'',
    arrayRetail: [],
    dataWish: [],
    loading: false,
    ws_mb_id: '',
    ws_rtl_id: '',
    ws_prd_id: '',
    id_retail: 'RTL000001',
    curWishlist: [],
    isHide: ''
  })

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
    listRetail()
 
 
    // get id pengguna
    AsyncStorage.getItem('uid').then(uids => {
      let ids = uids;
      setState(state => ({...state,
       id_member: ids
      }))
    }).catch(err => {
      console.log('err', err)
    })
 
    return(()=>{
      produk()
    })
 
      console.log('loooo');
      props.navigation.addListener(
            'didFocus',
            payload => {
                alert('load')
            }
      );
 
  }, [state.id_member])
 
 
 
  const displayName = (product_name) =>{
    let count = '';
    let nama  = '';
    count = product_name.split(' ' || '-');
    nama  = count.slice(0, 2).join(' ');
    return nama
}
 
  // get produk yg kotak2 besar
  const produk = () => {
    Axios.get('https://market.pondok-huda.com/dev/react/product/')
      .then(result => {
        //console.log('result', result);
        getCurrentWsh()
        setState(state => ({...state, arrayData: result.data.data }))
 
        // console.log('result2 =>', result.data.data)
      }).catch(error => {
        console.log(error)
      })
  }
 
    // get nama toko
    const listRetail = () => {
      Axios.get('https://market.pondok-huda.com/dev/react/retail/')
        .then(result => {
          //console.log('result', result);
          setState(state => ({...state, arrayRetail: result.data.data}))
          // console.log('result2 =>', result.data.data)
 
        }).catch(error => {
          console.log(error)
        })
    }
 
    //get current wishlist datas
    const getCurrentWsh =  () =>{
      AsyncStorage.getItem('uid').then(uids => {
        let idmb = uids;
 
          Axios.get('https://market.pondok-huda.com/dev/react/wishlist/oid/'+idmb)
            .then(result => {
              console.log('current Wishlish---->'+state.id_member);
              let oid = result.data;
              if(oid.data?.length>0){
                //console.log('length--------> '+oid.data?.length);
                //setState(state => ({...state, curWishlist: result.data.data}))
                setSelectedItems(result.data.data)
              }else{
                //console.log('null--------> '+oid.data?.length);
                setSelectedItems([])
              }
 
              //console.log('result2 =>', result.data.data)
            }).catch(error => {
              console.log(error)
            })
 
    }).catch (err => {
       console.log(err);
    })
  }
 
    // memasukan produk ke wishlist
    const selectItems = (id, retail, index) => {
 
      if((selectedItems.ws_prd_id != state.arrayData[index]?.prd_id) && (selectedItems.ws_mb_id != state.id_member)){
        const body = {
          ws_mb_id: state.id_member,
          ws_rtl_id: retail,
          ws_prd_id: id
      }
      console.log('data -----=>', body);
          Axios.post('https://market.pondok-huda.com/dev/react/wishlist/', body)
          .then(response => {
            console.log('wishlist -----=>', response.data);
 
            if(response.data.status == 201) {
              //alert('Produk telah masuk ke wishlist anda!')
              //console.log('wishlist2 =>', response)
              setSelectedItems([...selectedItems, body])
            } else {
              alert('Gagal menambahkan ke wishlist anda!')
              console.log('Wishlish gagal =>', response)
            }
          }).catch(error => {
            console.log('error wishlist =>', error)
        })
      }
 
    };
 
    // unlike produk
    const deSelectItems = (id, retail, ws_mb_id) => {
      if(selectItems.length>0){
          if (selectedItems.some(i => i.ws_prd_id === id) && selectedItems.some(i => i.ws_mb_id == ws_mb_id)) {
          //console.log('unloved'+id+'/'+ws_mb_id);
            Axios.delete('https://market.pondok-huda.com/dev/react/wishlist/delete/'+ws_mb_id+'/'+id)
            .then(response => {
              console.log('response =>', response.data.status)
              if(response.data.status == 200) {
                const arraylst = d => d.ws_prd_id != id && d.ws_mb_id == ws_mb_id;
                const arr3 = selectedItems.filter(arraylst);
                return setSelectedItems(arr3);
              } else {
                console.log('response =>', response)
              }
            }).catch(error => {
              console.log('error =>', error)
            })
          }
        }
    }
 
    // filter button
    const getSelected = ( id , ws_mb_id) => {
      if(selectItems.length>0){
        if(selectedItems.some(i => i.ws_prd_id === id) && selectedItems.some(i=> i.ws_mb_id === ws_mb_id)) {
          return true
        } else {
          return false
        }
      }
    }


  const renderItemExpore = (item, index) => {
    // console.log('item', item);
    return (
      <View style={styles.viewRenderExplore}>
        <View style={styles.viewImage}>
          <LinearGradient colors={['#C4C4C4', 'transparent']} style={styles.gradientTop} />
          <Image source={require('../../../Assets/img/bahan.jpg')} style={styles.imageProfile} />
          <LinearGradient colors={['transparent', '#3A3A3ACC']} style={styles.gradientBottom} />
        </View>
        <View style={styles.viewImageContent}>
          <TouchableOpacity style={styles.touchSilangExplore} onPress={() => alert('In Progress')}>
            <Image source={allLogo.icResidentSilang} style={styles.icResidentSilang} />
          </TouchableOpacity>
          <View style={styles.viewDetail}>
            <Text style={styles.textNameExplore}>{item.item.rtl_name}</Text>
            <Text style={styles.textWork}>{item.item.rtl_addres}</Text>
            <Text style={styles.textDistance}>Buka dari Jam 10.00 AM</Text>
          </View>
        </View>
      </View>
    )
  }

  const selectProduk = (value, id) => {
    NavigatorService.navigate('Produk', { value, id: id })
    console.log(id);
  }

  const RenderItem = ({ item, index, onPress, selected, unLike, onPressProduk }) => (
    // <Pressable onPress={()=> alert('Produk : '+index)}>
    <View style={styles.card}>
      <Pressable style={{ backgroundColor: 'red' }} onPress={() => onPressProduk()}>
        <View style={styles.txtProduct}>
          <Image source={{ uri: item.thumbnail }} style={styles.imgProduct} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.textproduct}>{item.product_name.substr(0, 5)}</Text>
            <View>
              {
                selected == false ?
                  <TouchableOpacity onPress={() => onPress()} key={index}>
                    <Image source={allLogo.icwishlist} style={{ width: toDp(20), height: toDp(20) }} />
                  </TouchableOpacity>
                  :
                  <TouchableOpacity onPress={unLike} key={index}>
                    <Image source={allLogo.heart} style={{ width: toDp(20), height: toDp(20) }} />
                  </TouchableOpacity>
              }
            </View>
          </View>
          <NumberFormat
            value={item.price}
            displayType={'text'}
            thousandSeparator={'.'}
            decimalSeparator={','}
            prefix={'Rp. '}
            renderText={formattedValue => <Text style={{ color: '#F83308', fontWeight: '800' }}>{formattedValue}</Text>} // <--- Don't forget this!
          />
          <Image source={allLogo.icaddress} style={styles.address} />
          <Text style={styles.dariKota}>{item.retailaddres.substr(0, 12)}</Text>
          <Image source={allLogo.icstar} style={styles.star} />
          <Text style={styles.bintang}>{item.lainnya.rating}</Text>
          <Text style={styles.terjual}>| Terjual {item.lainnya.terjual}</Text>
        </ View>
      </Pressable>
    </ View>
  );

  const CardProduct = () => {
    return (
      <FlatList style={{ backgroundColor: 'white', minHeight: toDp(400), width: width, marginTop: toDp(-10) }}
        columnWrapperStyle={{ justifyContent: 'space-between', marginHorizontal: 15 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: toDp(3),
          paddingBottom: toDp(3),

        }}

        numColumns={2}
        data={state.arrayData}
        renderItem={({ item, index }) => (
          <RenderItem
            item={item}
            index={index}
            onPress={() => selectItems(item.prd_id, item.retail, index)}
            selected={getSelected(item.prd_id, state.id_member)}
            unLike={() => deSelectItems(item.prd_id, item.retail, state.id_member)}
            onPressProduk={() => selectProduk(item.prd_id)}
          />

        )}
        KeyExtractor={item => item}
        ListFooterComponent={() => <View style={{ height: toDp(100) }} />}
      />

    )
  }



  return (
    <View style={styles.container}>

      <ScrollView style={styles.ScrollView}>
        <View style={{ width: '100%', height: toDp(230), marginTop: toDp(-5), backgroundColor: 'white' }}>
          <Carousel
            layout={"default"}
            data={state.arrayRetail}
            sliderWidth={width}
            itemWidth={toDp(350)}
            renderItem={(item, index) => renderItemExpore(item, index)}
            onSnapToItem={index => setState(state => ({ ...state, activeIndex: index }))}
          />
        </View>

        <View style={styles.content}>
          <Pressable style={styles.presable} onPress={() => NavigatorService.navigate('underConstruction')}>
            <View style={{ borderWidth: toDp(0.5), borderRadius: toDp(10), padding: toDp(3), borderColor: '#E6E6E6' }}>
              <Image source={allLogo.toko} style={styles.icon} />
            </View>

            <Text style={[styles.textIcon, { textAlign: 'center', fontSize: toDp(12) }]}>Toko{'\n'}Bangunan</Text>
          </Pressable>
          <Pressable style={styles.presable} onPress={() => NavigatorService.navigate('underConstruction')}>
            <View style={{ borderWidth: toDp(0.5), borderRadius: toDp(10), padding: toDp(3), borderColor: '#E6E6E6' }}>
              <Image source={allLogo.worker} style={styles.icon} />
            </View>
            <Text style={[styles.textIcon, { textAlign: 'center', fontSize: toDp(12) }]}>Jasa{'\n'}Tukang</Text>
          </Pressable>
          <Pressable style={styles.presable} onPress={() => NavigatorService.navigate('underConstruction')}>
            <View style={{ borderWidth: toDp(0.5), borderRadius: toDp(10), padding: toDp(3), borderColor: '#E6E6E6' }}>
              <Image source={allLogo.arsitek} style={styles.icon} />
            </View>
            <Text style={[styles.textIcon, { textAlign: 'center', fontSize: toDp(12) }]}>Konsultan{'\n'}Arsitek</Text>
          </Pressable>
          <Pressable style={styles.presable} onPress={() => NavigatorService.navigate('underConstruction')}>
            <View style={{ borderWidth: toDp(0.5), borderRadius: toDp(10), padding: toDp(3), borderColor: '#E6E6E6' }}>
              <Image source={allLogo.donation} style={styles.icon} />
            </View>
            <Text style={[styles.textIcon, { textAlign: 'center', fontSize: toDp(12) }]}>Donasi{'\n'}Bangunan</Text>
          </Pressable>

        </View>
        {state.isHide != '' ?
          <>
            <Text>id: {JSON.stringify(state.id_member)}</Text>
            <Text>Selected: {JSON.stringify(selectedItems)}</Text>
          </>
          : null
        }



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
    // bottom:toDp(140)
  },
  textIcon: {
    fontSize: toDp(10),
  },
  card: {
    backgroundColor: 'white',
    padding: toDp(25),
    marginVertical: toDp(5),
    marginHorizontal: toDp(16),
    borderRadius: toDp(10),
    height: toDp(251),
    right: toDp(17),
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
    bottom: toDp(10),
    left: toDp(15)
  },
  textproduct: {
    fontWeight: 'bold',
    fontSize: toDp(12)
  },
  txtProduct: {
    width: '100%',
    backgroundColor: 'white'
  },
  imgProduct: {
    width: toDp(100),
    height: toDp(100)
  },
  imgProfile: {
    width: toDp(80),
    height: toDp(80),
    borderRadius: toDp(10),
  },
  viewRenderExplore: {
    backgroundColor: 'white',
    width: '100%',
    height: toDp(200),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: toDp(10),
    marginTop: toDp(0),
    padding: toDp(10),
    top: toDp(10)
  },
  viewImage: {
    width: '100%',
    height: toDp(200),
    resizeMode: 'contain',
    position: 'absolute',
  },
  viewImageContent: {
    width: '100%',
    height: toDp(200),
    zIndex: 2
  },
  imageProfile: {
    width: '100%',
    height: '100%',
    borderRadius: toDp(10),
    position: 'absolute',
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientTop: {
    width: '100%',
    height: toDp(130),
    top: toDp(0),
    borderTopLeftRadius: toDp(10),
    borderTopRightRadius: toDp(10),
    zIndex: 1,
  },
  gradientBottom: {
    width: '100%',
    height: toDp(130),
    borderBottomLeftRadius: toDp(10),
    borderBottomRightRadius: toDp(10),
    position: 'absolute',
    bottom: toDp(0),
  },
  icResidentSilang: {
    width: toDp(28),
    height: toDp(28),
  },
  touchSilangExplore: {
    padding: toDp(4),
    position: 'absolute',
    right: toDp(16),
    top: toDp(16),
  },
  viewDetail: {
    position: 'absolute',
    bottom: toDp(16),
    left: toDp(16),
    zIndex: 2
  },
  textNameExplore: {
    fontSize: toDp(24),
    color: '#FFFFFF',
  },
  textWork: {
    marginTop: toDp(4),
    fontSize: toDp(14),
    color: '#FFFFFF',
  },
  textDistance: {
    marginTop: toDp(4),
    fontSize: toDp(14),
    color: '#FFFFFF',
  },
  content: {
    width: toDp(350),
    height: toDp(70),
    bottom: toDp(15),
    flexDirection: 'row',
    left: toDp(5),
    backgroundColor: 'white'
  },
  presable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: toDp(8),
    marginHorizontal: toDp(5),
  },
  icon: {
    height: toDp(38),
    width: toDp(38),
    resizeMode: 'contain',
    tintColor: '#f83308'
  }
});

export default Home;