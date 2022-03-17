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


const Login = (props) => {

    const [state, setState] = useState({
        loading: false,
        secureTextEntry: true,
        username: '',
        password: ''
    })

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'}/>
            <Image source={allLogo.icbina} style={styles.icbina}/>
            <Text style={styles.title}>Login</Text>
            <Text style={styles.desc}>silahkan masuk untuk melanjutkan</Text>
            <Text style={[styles.textName, {right:toDp(40)}]}>Username atau Email</Text>
                <TextInput  autoCapitalize={'none'}
                            style={styles.textInput}
                            placeholder={'Username'}
                            placeholderTextColor={'grey'}
                            value={state.username}
                            onChangeText={(text) => setState(state => ({...state, username: text })) }
                />
              <View style={{marginTop: toDp(-10)}}>
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
              <Pressable style={{left:toDp(120)}} onPress={()=> NavigatorService.navigate('Lupapassword')}>
                      <Text style={styles.textForgot}>Forgot Password</Text>
                  </Pressable>

              <View style={styles.viewRow}>
                  <Pressable 
                      style={styles.pressableLogin} onPress={() => Login()}>
                      <Text style={styles.textLogin}>Login</Text>
                  </Pressable>
                  <Pressable 
                      onPress={() => NavigatorService.navigate('Register')}
                      style={styles.pressableSignup}>
                      <Text style={styles.textSignup}>Sign Up</Text>
                  </Pressable>
              </View>

              {/* <Text style={styles.textDont}>Or Login With</Text> */}
              <View style={styles.rowFooter}>
                  <Pressable style={[styles.pressableClick, {padding: toDp(2),width:toDp(180), height:toDp(40), backgroundColor:'white', width:toDp(170), borderRadius:toDp(10), marginBottom:toDp(5)}]}>
                    <View style={{flexDirection:'row'}}>
                      <Image source={allLogo.icGoogle} style={styles.icon} />
                      <Text style={{fontSize:toDp(12.5), top:toDp(10), fontWeight:'bold'}}>Login With Google</Text>
                    </View>
                  </Pressable>

                  <Pressable style={[styles.pressableClick, {padding: toDp(2),width:toDp(170), height:toDp(40), backgroundColor:'#3B5998', borderRadius:toDp(10)}]}>
                    <View style={{flexDirection:'row'}}>
                        <Image source={allLogo.icFacebook} style={styles.icon} />
                        <Text style={{fontSize:toDp(12.5), top:toDp(10), fontWeight:'bold', color:'white'}}>Login With Facebook</Text>
                     </View>
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
    paddingTop: toDp(174),
  },
  icbina: {
    width: toDp(200),
    height: toDp(80),
    position: 'absolute',
    margin: toDp(80), //X
    padding: toDp(27), //Y
  },
  title: {
      color: 'white',
      fontWeight: 'bold',
      paddingTop: toDp(15),
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
    width: toDp(335),
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
    marginTop: toDp(-10),
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
    fontSize: toDp(12),
    paddingTop: toDp(5),
    bottom:toDp(2)
  }, 
  pressableLogin: {
    width: toDp(75),
    height: toDp(70),
    paddingTop: toDp(20),
    left:toDp(40)
  },
  textLogin: {
    color: 'white',
    fontSize: toDp(14),
    textAlignVertical: 'center',
    width: toDp(80),
    height: toDp(35),
    paddingLeft: toDp(23),
    backgroundColor: '#698498',
    borderRadius: toDp(10)
  },
  pressableSignup: {
    right: toDp(210),
    bottom: toDp(50)
  },
  textSignup: {
    color: 'white',
    fontSize: toDp(14),
    backgroundColor: '#698498',
    borderRadius: toDp(10),
    width: toDp(80),
    height: toDp(35),
    paddingLeft: toDp(18),
    textAlignVertical: 'center'
  },
  icVisibility: {
    width: toDp(24),
    height: toDp(24),
    tintColor: 'grey'
  },
  rowFooter: {
    flexDirection: 'column',
    bottom:toDp(10)
  },
  icon: {
    width: toDp(25),
    height: toDp(25),
    marginHorizontal: toDp(5),
    top:toDp(7)
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

export default Login;
