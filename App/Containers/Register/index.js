import React, { useEffect, useState } from 'react' 
import {
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar,
    TextInput,
    Pressable,
    Platform,
    AsynStorage
} from "react-native";
import { allLogo } from '@Assets';
import { toDp } from '@percentageToDP';
import NavigatorService from '@NavigatorService'
import Loader from '@Loader'

const Register = (props) => {

    const [state, setState] = useState({
        loading: false,
        secureTextEntry: true,
        username: '',
        password: ''
    })

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'}/>
            <Text style={styles.title}>Sign Up</Text>

            <View style={{marginTop: toDp(-18)}}>
            <Text style={styles.textName}>Name</Text>
                <TextInput  autoCapitalize={'none'}
                            style={styles.textInput}
                            placeholder={'Name'}
                            placeholderTextColor={'grey'}
                            value={state.username}
                            onChangeText={(text) => setState(state => ({...state, username: text })) }
                />
            <Text style={styles.textName}>Email</Text>
                <TextInput  autoCapitalize={'none'}
                            style={styles.textInput}
                            placeholder={'Email'}
                            placeholderTextColor={'grey'}
                            value={state.username}
                            onChangeText={(text) => setState(state => ({...state, username: text })) }
                />
            <Text style={styles.textName}>Phone</Text>
                <TextInput  autoCapitalize={'none'}
                            style={styles.textInput}
                            placeholder={'Phone'}
                            placeholderTextColor={'grey'}
                            value={state.username}
                            onChangeText={(text) => setState(state => ({...state, username: text })) }
                />
            <Text style={styles.textName}>Username</Text>
                <TextInput  autoCapitalize={'none'}
                            style={styles.textInput}
                            placeholder={'Username'}
                            placeholderTextColor={'grey'}
                            value={state.username}
                            onChangeText={(text) => setState(state => ({...state, username: text })) }
                />

                <View style={{marginTop: toDp(-4)}}>
                 <Text style={styles.textName}>Password</Text>
                 <TextInput autoCapitalize={'none'}
                            style={[styles.textInput, {marginTop: toDp(-11)}]}
                            placeholder={'Password'}
                            placeholderTextColor={'grey'}
                            secureTextEntry={state.secureTextEntry}
                            value={state.password}
                            onChangeText={(text) => setState(state => ({...state, password: text})) }
                 />
                 <Pressable style={styles.presableShow} onPress={() => setState(state => ({...state, secureTextEntry: !state.secureTextEntry }))}>
                     <Image source={styles.secureTextEntry ? allLogo.icVisibilityOff : allLogo.icVisibilityOn} style={styles.icVisibility} />
                 </Pressable>
                </View>
              </View>
              

                  <Pressable style={{left:toDp(85)}} onPress={() => NavigatorService.navigate('Lupapassword')}>
                      <Text style={styles.textForgot}>Forgot Password</Text>
                  </Pressable>

              <View style={styles.viewRow}>       
                  <Pressable 
                      style={styles.pressableSignup}>
                      <Text style={styles.textSignup}>Sign Up</Text>
                  </Pressable>
                  <Pressable 
                      onPress={() => NavigatorService.navigate('Login')}
                      style={styles.pressableLogin}>
                      <Text style={styles.textLogin}>Login</Text>
                  </Pressable>
              </View>

              <Text style={styles.textDont}>Or Login With</Text>
              <View style={styles.rowFooter}>
                  <Pressable style={styles.pressableClick, {padding: toDp(2)}}>
                      <Image source={allLogo.icGoogle} style={styles.icon} />
                  </Pressable>
                  <Pressable style={styles.pressableClick, {padding: toDp(2)}}>
                      <Image source={allLogo.icFacebook} style={styles.icon} />
                  </Pressable>
              </View>
        </View>
    )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2A334B',
    paddingTop: toDp(32),
  },
  logo: {
    width: toDp(200),
    height: toDp(148),
    position: 'absolute',
    margin: toDp(80), //X
    padding: toDp(27) //Y
  },
  title: {
      color: 'white',
      fontWeight: 'bold',
      paddingTop: toDp(-10),
      paddingBottom: toDp(13),
      fontSize: toDp(18)
  },
  desc: {
    fontSize: toDp(13),
    color: 'white'
  },
  textName: {
    fontSize: toDp(12),
    color: 'white',
    width: toDp(155),
    height: toDp(55),
    marginRight: toDp(100),
    paddingTop: toDp(20)
  },
  viewContent: {
    zIndex: 2,
    width: '90%',
    height: 'auto',
    backgroundColor: '#52B788',
    borderRadius: toDp(24),
    marginTop: toDp(16),
    padding: toDp(16),
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  textInput: {
    width: toDp(250),
    height: toDp(39),
    backgroundColor: '#F2F3F3',
    paddingHorizontal: toDp(8),
    borderRadius: toDp(10),
    marginTop: toDp(-10)
  },
  positionRight: {
    width: '100%',
    alignItems: 'flex-end',
    marginTop: toDp(8)
  },
  textDont: {
    marginTop: toDp(-35),
    fontSize: toDp(12),
    color: 'white',
  },
  textClick: {
    fontSize: toDp(14),
    fontWeight: 'bold',
    color: '#009EE2',
  },
  presableShow: {
    padding: toDp(4),
    position: 'absolute',
    right: toDp(8),
    top: Platform.OS === 'ios' ? toDp(30) : toDp(48)
  },
  viewRow: {
    paddingLeft: toDp(168),
  },
  textForgot: {
    color: 'white',
    fontSize: toDp(10),
    paddingTop: toDp(5),
    left: toDp(1)
  }, 
  pressableSignup: {
    width: toDp(75),
    height: toDp(70),
    paddingTop: toDp(20),
    alignItems: 'center'
  },
  textSignup: {
    color: 'white',
    fontSize: toDp(14),
    textAlignVertical: 'center',
    width: toDp(80),
    height: toDp(35),
    paddingLeft: toDp(18),
    backgroundColor: '#698498',
    borderRadius: toDp(10)
  },
  pressableLogin: {
    left: toDp(-170),
    bottom: toDp(50)
  },
  textLogin: {
    color: 'white',
    fontSize: toDp(14),
    backgroundColor: '#698498',
    borderRadius: toDp(10),
    width: toDp(80),
    height: toDp(35),
    paddingLeft: toDp(23),
    textAlignVertical: 'center'
  },
  icVisibility: {
    width: toDp(24),
    height: toDp(24),
    tintColor: 'grey'
  },
  rowFooter: {
    marginTop: toDp(8),
    flexDirection: 'row'
  },
  icon: {
    width: toDp(30),
    height: toDp(31),
    marginHorizontal: toDp(15)
  },
  textCreate: {
    textAlign: 'right'
  },
  titleForm: {
    fontSize: toDp(20),
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: toDp(4)
  },
  descForm: {
    fontSize: toDp(12),
    color: '#000000',
    textAlign: 'center',
    marginTop: toDp(14)
  }
});

export default Register;
