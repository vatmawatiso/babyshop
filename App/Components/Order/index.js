import React, { Component } from 'react'
import {BackHandler, 
        Dimensions, 
        StyleSheet, 
        Text, 
        View, 
        Image, 
        TextInput,
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
import { color } from 'react-native-reanimated'
import { parseZone } from 'moment'

let { width, height } = Dimensions.get('window')
const title = (text) => {
  let newText = text.substr(0,12);

  return(
    <Text style={{fontSize:toDp(16)}}>{newText}</Text>
  )
}

class Order extends Component {

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
              <Text style={[styles.title, {fontSize: this.props.title.length >= 28 ? toDp(14) : toDp(20), width: toDp(105) }]}>{title(this.props.title)}</Text>
              
              <View style={styles.icheader}>
              <Image source={allLogo.icsearch} style={styles.search} />
                <TextInput
                    style={styles.input}
                    placeholder="Pencarian.."
                    underlineColorAndroid="transparent"
                    placeholderTextColor="#FFF"
                    onChangeText={(text)=>this.props.onFilter}
                />
                <TouchableOpacity style={styles.touchHeader} onPress={this.props.onPress}>
                  <Image source={allLogo.icchat} style={styles.chat} />
                </TouchableOpacity>
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
    flex: 1,
    bottom: toDp(50),
  },
  icheader: {
    flexDirection: 'row'
  },
  input: {
    // paddingTop: 5,
    // paddingRight: 5,
    // paddingBottom: 5,
    backgroundColor: '#2A334B',
    borderRadius: toDp(25),
    paddingLeft:toDp(35),
    width:toDp(130),
    height:toDp(40),
    right:toDp(20),
    color:'#FFF',
    fontSize:toDp(12)
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
  search: {
    left: toDp(10),
    top:toDp(10),
    width: toDp(21),
    height: toDp(22),
    tintColor:'white',
    position:'relative',
    zIndex:1,
  },
  chat: {
    right: toDp(10),
    top:toDp(8),
    width: toDp(22),
    height: toDp(22),
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


export default Order
