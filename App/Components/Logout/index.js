import React, { Component } from 'react'
import {BackHandler, 
        Dimensions, 
        StyleSheet, 
        Text, 
        View, 
        Image, 
        Alert, 
        Platform, 
        TouchableOpacity, 
        ScrollView,
        Pressable
      } from 'react-native'

import LinearGradient from 'react-native-linear-gradient'
import { allLogo } from '@Assets'
import { toDp } from '@percentageToDP'
import NavigatorService from '@NavigatorService'

let { width, height } = Dimensions.get('window')
const title = (text) => {
  let newText = text.substr(0,16);

  return(
    <Text>{newText}</Text>
  )
}

const logout = () => {
    Alert.alert(
      "Konfirmasi",
      "Apakah anda ingin keluar ?",
      [
        {
          text: "Batal",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Keluar", onPress: () => {
            AsyncStorage.clear()
            NavigatorService.reset('Login')
          }
        }
      ]
    )
  }

class Logout extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <LinearGradient
            colors={['white', 'white']}
            //colors={['white', 'white']}
            style={[styles.linearHeader, {justifyContent: 'space-between'}]}
          >
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity style={styles.touchHeader} onPress={this.props.onPress}>
                <Image source={allLogo.icarrow} style={styles.icBack} />
              </TouchableOpacity>
              <Text style={[styles.title, {fontSize: this.props.title.length >= 28 ? toDp(14) : toDp(18), width: toDp(145) }]}>{title(this.props.title)}</Text>
              
              <View style={styles.icheader}>
                {/* <TouchableOpacity style={styles.touchHeader} onPress={this.props.onFilter}>
                  <Image source={allLogo.exit} style={styles.cart} />
                  <Text style={{left: toDp(100), fontSize: toDp(10)}}>Keluar</Text>
                </TouchableOpacity> */}
                {/* <TouchableOpacity style={styles.touchHeader} onPress={this.props.onPress}>
                  <Image source={allLogo.icnav} style={styles.nav} />
                </TouchableOpacity> */}
              </View>

            </View>

            {
              this.props.onFilter &&
              <TouchableOpacity
                style={[styles.touchHeader, {marginRight: toDp(8)}]}
                onPress={this.props.onFilter}>
                <Image source={allLogo.icFilter} style={styles.icBack} />
              </TouchableOpacity>
            }

          </LinearGradient>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    bottom:toDp(2)
  },
  icheader: {
    flexDirection: 'row'
  },
  header: {
    width,
    //height: 'auto',
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.0,
    elevation: 4,
  },
  linearHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: toDp(8),
    height: (height / 12) + (Platform.OS === 'android' ? toDp(0) : toDp(20)) ,
    paddingTop: Platform.OS === 'android' ? toDp(0) : toDp(20)
  },
  touchHeader: {
    padding: toDp(4),
  },
  cart: {
    left: toDp(100),
    width: toDp(32),
    height: toDp(32)
  },
  nav: {
    left: toDp(100),
    width: toDp(28),
    height: toDp(28),
  },
  icBack: {
    marginHorizontal: toDp(8),
    width: toDp(24),
    height: toDp(24),
    resizeMode: 'contain',
    tintColor: 'black',
    rotation: toDp(180)
  },
  title: {
    color: 'black',
    fontSize: toDp(20),
    marginLeft: toDp(8),

  },
})


export default Logout
