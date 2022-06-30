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

import LinearGradient from 'react-native-linear-gradient';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { NavigationContainer } from '@react-navigation/native';
import Profilone from '../../Containers/Profilone';
import Editprofil from '../../Containers/Editprofil';
import { allLogo } from '@Assets'
import { toDp } from '@percentageToDP'
import NavigatorService from '@NavigatorService'

let { width, height } = Dimensions.get('window')
const title = (text) => {
  let newText = text.substr(0,12);
  // const Drawer = createDrawerNavigator();
  // const sidebar = () => {
  //   return(
  //     <NavigationContainer>
  //       <Drawer.Navigator initialRouteName="Profilone">
  //         <Drawer.Screen name="Profilone" component={Profilone}/>
  //         <Drawer.Screen name="Profil" component={Editprofil}/>
  //       </Drawer.Navigator>
  //     </NavigationContainer>
  //   );
  // }
  return( 
    <Text>{newText}</Text>
  )
}

class Header extends Component {

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
                <TouchableOpacity style={styles.touchHeader} onPress={this.props.onPress}>
                  <Image source={allLogo.iccart} style={styles.cart} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchHeader} onPress={this.props.onPress}>
                  <Image source={allLogo.icwishlist} style={styles.nav} />
                </TouchableOpacity>
              </View>

            </View>
{/* 
            {
              this.props.onFilter &&
              <TouchableOpacity
                style={[styles.touchHeader, {marginRight: toDp(8)}]}
                onPress={this.props.onFilter}>
                <Image source={allLogo.icFilter} style={styles.icBack} />
              </TouchableOpacity>
            } */}

          </LinearGradient>
        </View>
      </View>
    )

  }
  
}



const styles = StyleSheet.create({
  container: {
    // flex: -1,
    // bottom: toDp(55)
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
    width: toDp(28),
    height: toDp(28)
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


export default Header
