import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';

import SplashScreen from '../Containers/SplashScreen'
import Login from '../Containers/Login'
import Register from '../Containers/Register'
import Homepage from '../Containers/Homepage'
import Profilone from '../Containers/Profilone'

const AppNavigator = createStackNavigator(
  {
    SplashScreen: { screen: SplashScreen },
    Login: { screen: Login },
    Register: { screen: Register },
    Homepage: { screen: Homepage },
    Profilone: { screen: Profilone },
  },
  {
    headerMode: 'none',
    initialRouteName: 'Homepage',
  
  }
);

export default createAppContainer(AppNavigator)