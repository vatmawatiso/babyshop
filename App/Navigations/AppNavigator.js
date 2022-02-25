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
import Wishlist from '../Containers/Wishlist'
import Kategoriproduk from '../Containers/Homepage/Kategoriproduk'
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
import TambahAlamat from '../Containers/TambahAlamat'
import Checkout from '../Containers/Checkout'
import Pembayaran from '../Containers/Pembayaran'
import Jasatukang from '../Containers/Jasatukang'
import Tokobangunan from '../Containers/Tokobangunan'
import Konsultan from '../Containers/Konsultan'
import Alatbahan from '../Containers/Alatbahan'
import Lupapassword from '../Containers/Lupapassword'
import Konfiremail from '../Containers/Konfiremail'
import Buatpassword from '../Containers/Buatpassword'
import Produk from '../Containers/Produk'
import Successorder from '../Containers/Successorder'
import Nilaiorder from '../Containers/Nilaiorder'
import Settingtoko from '../Containers/Seller/Settingtoko'
import Alamattoko from '../Containers/Seller/Alamattoko'
import Layananjasa from '../Containers/Seller/Layananjasa'
import Informasitoko from '../Containers/Seller/Informasitoko'
import Ubahtoko from '../Containers/Seller/Ubahtoko'
import Catatantoko from '../Containers/Seller/Catatantoko'
import Tambahcatatan from '../Containers/Seller/Tambahcatatan'
import Pengiriman from '../Containers/Seller/Pengiriman'
import Tambahproduk from '../Containers/Seller/Tambahproduk'
import Homeseller from '../Containers/Seller/Homeseller'
import Kategori from '../Containers/Seller/Kategori'
import Detailkategori from '../Containers/Seller/Detailkategori'
import Produksaya from '../Containers/Seller/Produksaya'
import Tambahalamat from '../Containers/Seller/Tambahalamat'
import Saldopenjual from '../Containers/Seller/Saldopenjual'
import Ulasan from '../Containers/Seller/Ulasan'


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
    Wishlist: { screen: Wishlist },
    Kategoriproduk: { screen: Kategoriproduk },
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
    TambahAlamat: { screen: TambahAlamat },
    Checkout: { screen: Checkout },
    Pembayaran: { screen: Pembayaran },
    Jasatukang: { screen: Jasatukang },
    Tokobangunan: { screen: Tokobangunan },
    Konsultan: { screen: Konsultan },
    Alatbahan: { screen: Alatbahan },
    Lupapassword: { screen: Lupapassword },
    Konfiremail: { screen: Konfiremail },
    Buatpassword: { screen: Buatpassword },
    Produk: { screen: Produk },
    Successorder: { screen: Successorder },
    Nilaiorder: { screen: Nilaiorder },
    Settingtoko: { screen: Settingtoko },
    Alamattoko: { screen: Alamattoko },
    Layananjasa: { screen: Layananjasa },
    Informasitoko: { screen: Informasitoko },
    Ubahtoko: { screen: Ubahtoko },
    Catatantoko: { screen: Catatantoko },
    Tambahcatatan: { screen: Tambahcatatan },
    Pengiriman: { screen: Pengiriman },
    Tambahproduk: { screen: Tambahproduk },
    Homeseller: { screen: Homeseller },
    Kategori: { screen: Kategori },
    Detailkategori: { screen: Detailkategori },
    Produksaya: { screen: Produksaya },
    Tambahalamat: { screen: Tambahalamat },
    Saldopenjual: { screen: Saldopenjual },
    Ulasan: { screen: Ulasan },
    
  },
  {
    headerMode: 'none',
    initialRouteName: 'Homeseller',
  
  }
);

export default createAppContainer(AppNavigator)