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
import Orderpage from '../Containers/Orderpage'
import Belumbayar from '../Containers/Orderpage/Belumbayar'
import Dikemas from '../Containers/Orderpage/Dikemas'
import Dikirim from '../Containers/Orderpage/Dikirim'
import Selesai from '../Containers/Orderpage/Selesai'
import Dibatalkan from '../Containers/Orderpage/Dibatalkan'
import Orderdetail from '../Containers/Orderpage/Orderdetail'
import Alamat from '../Containers/Alamat'
import Editalamat from '../Containers/Editalamat'
import Checkout from '../Containers/Checkout'
import Pembayaran from '../Containers/Pembayaran'
import Jasatukang from '../Containers/Jasatukang'
import Tokobangunan from '../Containers/Tokobangunan'
import Konsultan from '../Containers/Konsultan'
import Alatbahan from '../Containers/Alatbahan'


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
    Notification: { screen: Notification },
    Jasakirim: { screen: Jasakirim },
    Orderpage: { screen: Orderpage },
    Belumbayar: { screen: Belumbayar },
    Dikemas: { screen: Dikemas },
    Dikirim: { screen: Dikirim },
    Selesai: { screen: Selesai },
    Dibatalkan: { screen: Dibatalkan },
    Orderdetail: { screen: Orderdetail },
    Alamat: { screen: Alamat },
    Editalamat: { screen: Editalamat },
    Checkout: { screen: Checkout },
    Pembayaran: { screen: Pembayaran },
    Jasatukang: { screen: Jasatukang },
    Tokobangunan: { screen: Tokobangunan },
    Alatbahan: { screen: Alatbahan },
    Konsultan: { screen: Konsultan },
    
  },
  {
    headerMode: 'none',
    initialRouteName: 'Alatbahan',
  
  }
);

export default createAppContainer(AppNavigator)