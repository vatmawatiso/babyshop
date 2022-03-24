import React, { Component } from 'react'
import {BackHandler, 
        Dimensions, 
        StyleSheet, 
        Text, 
        View, 
        Image, 
        Alert, 
        TextInput, 
        Platform, 
        TouchableOpacity, 
        AsyncStorage, 
        ScrollView
      } from 'react-native'

// import LinearGradient from 'react-native-linear-gradient'
import { allLogo } from '@Assets'
import { toDp } from '@percentageToDP'
import NavigatorService from '@NavigatorService'
import LinearGradient from 'react-native-linear-gradient'

let { width, height } = Dimensions.get('window')

class BackDetailKate extends Component {
//serach input with icon seacrh react native


  render() {

    return (
      <View style={styles.container}>
        <View style={styles.header}>
        <LinearGradient
            colors={['white', 'white']}
            //colors={['white', 'white']}
            style={[styles.linearHeader, {justifyContent: 'space-between'}]}
          >

        <View style={styles.searchSection}>
          <TouchableOpacity style={styles.touchHeader} onPress={this.props.onPress}>
              <Image source={allLogo.icarrow} style={styles.icBack} />
          </TouchableOpacity>
          <Image style={styles.searchIcon} source={allLogo.icsearch} />
          <TextInput
              style={styles.input}
              placeholder="Pencarian......."
              underlineColorAndroid="transparent"
              placeholderTextColor="#FFF"
              onChangeText={(text)=>this.props.onFilter}
          />
          <TouchableOpacity>
            <Image source={allLogo.icnav} style={styles.nav} />
          </TouchableOpacity>
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
  },
    linearHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: toDp(8),
    height: (height / 12) + (Platform.OS === 'android' ? toDp(0) : toDp(20)) ,
    paddingTop: Platform.OS === 'android' ? toDp(0) : toDp(20)
  },
  header: {
    width:toDp(360),
    height: toDp(20),
    backgroundColor: '#52B788',
    bottom:toDp(50),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    
    elevation: 2,
  },

  touchHeader: {
    padding: toDp(10),
    marginHorizontal:toDp(30),
  },
  icBack: {
    width: toDp(24),
    height: toDp(24),
    resizeMode: 'contain',
    tintColor: 'black',
    rotation:toDp(180),
    right:toDp(45)
  },
  title: {
    color: 'white',
    fontSize: toDp(20),
    marginLeft: toDp(8),

  },
  searchSection: {
    flex: toDp(1),
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
    zIndex:toDp(3),
    padding: toDp(8),
    position: 'absolute',
    left: toDp(55),
    top: Platform.OS === 'ios' ? toDp(10) : toDp(10)

},
input: {
    flex: toDp(1),
    paddingTop: toDp(5),
    paddingRight: toDp(5),
    paddingBottom: toDp(5),
    backgroundColor: '#2A334B',
    borderRadius: toDp(25),
    paddingLeft: toDp(45),
    color:'#FFF',
    right:toDp(70)
},
})


export default BackDetailKate
