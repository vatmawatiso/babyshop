import React, { useEffect, useState } from 'react' 
import {
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar,
    TextInput,
    Pressable,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import NavigatorService from '@NavigatorService'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Loader from '@Loader'
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

const Cari = (props) => {

    const [filterdData, setfilterdData] = useState([]);
    // const [masterData, setmasterData] = useState([]);
    const [masterData, setmasterData] = useState({
      loading: false,
      product_name:[]
    })
    const [search, setsearch] = useState('');

    useEffect(() => {
        fetcPosts();
        return () => {

    }
    }, [])

    const fetcPosts =() => {
    // const apiURL = 'https://jsonplaceholder.typicode.com/posts';
    const apiURL = 'https://market.pondok-huda.com/dev/react/product/';
    fetch(apiURL)
    .then((response) => response.json())
    .then((responseJson) => {
      
      console.log('CEK DATAS =>'+ JSON.stringify(responseJson));
      
        setfilterdData(responseJson);
        setmasterData(responseJson);
    }).catch((error) => {
        console.error(error);
    })
    }

    const searchFilter = (text) => {
        if (text) {
            const newData = masterData.filter((item) => {
                const itemData = item.product_name ? item.product_name.toUpperCase()
                        : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setfilterdData(newData);
            setsearch(text);
        } else {
            setfilterdData(masterData);
            setsearch(text);
        }
    }

    const ItemView = ({item}) => {
    return (
        <Text style={styles.itemStyle}>
        {item.id}{'. '}{item.product_name.toUpperCase()}
        </Text>
    )
    }

    const ItemSeparatorView = () => {
    return (
        <View
        style={{height:0.5, width:'100%', backgroundColor:'black'}}
        />
    )
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
            <View style={{flexDirection:'row'}}>
              <TouchableOpacity style={styles.touchHeader} onPress={() => props.navigation.goBack()} >
                  <Image source={allLogo.icarrow} style={styles.icBack} />
              </TouchableOpacity>
                <TextInput 
                    style={styles.textInputStyle}
                    value={search}
                    placeholder="Cari Bahan Bangunan Sekarang"
                    placeholderTextColor="white"
                    underlineColorAndroid="transparent"
                    onChangeText={(text) => searchFilter(text)}
                />
            </View>
            <FlatList
                data={filterdData}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={ItemSeparatorView}
                renderItem={ItemView}
            />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  itemStyle: {
    padding:toDp(15),
    // backgroundColor: 'red',
  },
  textInputStyle: {
    height:toDp(50),
    width:toDp(300),
    borderWidth:toDp(1),
    margin:toDp(5),
    right:toDp(5),
    borderColor: 'black',
    backgroundColor:'#2A334B',
    paddingTop: toDp(10),
    paddingRight: toDp(10),
    paddingBottom: toDp(10),
    paddingLeft: toDp(0),
    borderRadius: toDp(20),
    paddingLeft: toDp(20),
    color:'white',
  },
  header: {
    width:'100%',
    height: '100%',
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    
    elevation: 10,
  },

  touchHeader: {
    padding: toDp(4),
    // width:'100%',
    // backgroundColor: 'green',
  },
  icBack: {
    marginHorizontal: toDp(8),
    marginTop:toDp(13),
    width: toDp(30),
    height: toDp(30),
    resizeMode: 'contain',
    tintColor: 'black',
    rotation: toDp(180)
  },
searchIcon: {
    resizeMode: 'contain',
    tintColor: 'white',
    width: toDp(25),
    height: toDp(25),
    zIndex:3,
    padding: toDp(8),
    position: 'absolute',
    left: toDp(17),
    top: Platform.OS === 'ios' ? toDp(14) : toDp(14),

},
btnIcon: {
  marginTop:toDp(13),
  right:toDp(15)
}

});

export default Cari;