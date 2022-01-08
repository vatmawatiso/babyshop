import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';

import SplashScreen from '../Containers/SplashScreen'
import Login from '../Containers/Login'
import Register from '../Containers/Register'
import Homepage from '../Containers/Homepage'
import Profilone from '../Containers/Profilone'
import Keranjang from '../Containers/Keranjang'
import Editprofil from '../Containers/Editprofil'
import Chat from '../Containers/Chat'
import Notification from '../Containers/Homepage/Notification'
import Jasakirim from '../Containers/Jasakirim'

const AppNavigator = createStackNavigator(
  {
    SplashScreen: { screen: SplashScreen },
    Login: { screen: Login },
    Register: { screen: Register },
    Homepage: { screen: Homepage },
    Profilone: { screen: Profilone },
    Keranjang: { screen: Keranjang },
    Editprofil: { screen: Editprofil },
    Chat: { screen: Chat },
    Jasakirim: { screen: Jasakirim },
    Notification: { screen: Notification },
   
    
  },
  {
    headerMode: 'none',
    initialRouteName: 'Jasakirim',
  
  }
);

export default createAppContainer(AppNavigator)