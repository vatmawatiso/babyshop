import React, { useEffect, useState } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
} from 'react-native';
import Axios from 'axios';

export default function SearchDropDown(props) {
    
    const [state, setState] = useState({
        dataSearch: []
      }) 
      useEffect(() => {
        getProduk()
      }, [])
    // ambil adata produknya
    const getProduk = () => {
        Axios.get('https://market.pondok-huda.com/dev/react/product/')
        .then(result => {
            console.log('result', result);
            // getCurrentWsh()
            // setState(state => ({...state, dataSearch: result.data.data}))
            convert(result.data)
            console.log('result2 =>', result.data.data)
        }).catch(error => {
            console.log(error)
        })
    }
    const convert = (datas) => {
        let final = [];
        datas.data.map((v, i) => {
          final.push(v.product_name)
        })
        setState(state => ({...state, dataSearch: final}))
      }
    

    const { dataSearch } = props
        
    return (
        
        <TouchableOpacity
            onPress={props.onPress}
            style={styles.container}>

            <View style={styles.subContainer}>
                {
                    state.dataSearch.length ?

                        state.dataSearch.map(item => {
                            return (
                                <View style={styles.itemView}>
                                    <Text style={styles.itemText}>{item}</Text>
                                </View>
                            )
                        })

                        :
                        <View
                            style={styles.noResultView}>
                            <Text style={styles.noResultText}>No search items matched</Text>
                        </View>
                }

            </View>
        </TouchableOpacity>

    )
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: '6.2%',
        left: 0, right: 0, bottom: 0,

    },
    subContainer: {

        backgroundColor: '#84DCC6',
        paddingTop: 10,
        marginHorizontal: 20,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        flexWrap: 'wrap',

        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    itemView: {
        // marginHorizontal: '10%',
        backgroundColor: 'white',
        height: 30,
        width: '90%',
        marginBottom: 10,
        justifyContent: 'center',
        borderRadius: 4,
    },
    itemText: {
        color: 'black',
        paddingHorizontal: 10,
    },
    noResultView: {
        alignSelf: 'center',
        // margin: 20,
        height: 100,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    noResultText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },

});