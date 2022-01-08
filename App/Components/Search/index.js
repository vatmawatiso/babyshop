import React, { Component } from 'react'
import {BackHandler, Dimensions, StyleSheet, Text, View, Image, Alert, TextInput,Platform, TouchableOpacity, AsyncStorage, ScrollView} from 'react-native'

// import LinearGradient from 'react-native-linear-gradient'
import { allLogo } from '@Assets'
import { toDp } from '@percentageToDP'
import NavigatorService from '@NavigatorService'

let { width, height } = Dimensions.get('window')

class Search extends Component {
//serach input with icon seacrh react native


  render() {

    return (
      <View style={styles.container}>
        <View style={styles.header}>

        <View style={styles.searchSection}>
          <Image style={styles.searchIcon} source={allLogo.icsearch} />
          <TextInput
              style={styles.input}
              placeholder="Pencarian......."
              underlineColorAndroid="transparent"
              placeholderTextColor="#FFF"
              onChangeText={(text)=>this.props.onFilter}
          />
          <TouchableOpacity onPress={() => NavigatorService.navigate('Keranjang')}>
            <Image source={allLogo.iccart} style={styles.cart}  />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={allLogo.icnav} style={styles.nav} />
          </TouchableOpacity>
        </View>


        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'cyan',
    marginBottom:toDp(-60)
  },
  header: {
    width:'100%',
    height: 60,
    backgroundColor: '#52B788',
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.0,
    elevation: 4,
  },

  touchHeader: {
    padding: toDp(4),
  },
  icBack: {
    marginHorizontal: toDp(8),
    width: toDp(24),
    height: toDp(24),
    resizeMode: 'contain',
    tintColor: 'white'
  },
  title: {
    color: 'white',
    fontSize: toDp(20),
    marginLeft: toDp(8),

  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    width:'100%',
    paddingHorizontal:toDp(10)
},
cart: {
  padding: toDp(0),
  marginLeft: toDp(12),
  width: toDp(28),
  height: toDp(28),
  resizeMode: 'contain',
},
nav: {
  padding: toDp(0),
  marginLeft: toDp(12),
  width: toDp(28),
  height: toDp(28),
  resizeMode: 'contain',
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
    top: Platform.OS === 'ios' ? toDp(18) : toDp(18)

},
input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#2A334B',
    borderRadius: toDp(25),
    paddingLeft: toDp(45),
    color:'#FFF'
},
})


export default Search
