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
import detailKategori from "../Containers/Homepage/detailKategori";
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
import Cari from '../Containers/Cari'
import Buatpassword from '../Containers/Buatpassword'
import Produk from '../Containers/Produk'
import Successorder from '../Containers/Successorder'
import Nilaiorder from '../Containers/Nilaiorder'
import Ulasanpembeli from '../Containers/Ulasanpembeli'
import Infopembayaran from '../Containers/Infopembayaran'
import Settingtoko from '../Containers/Seller/Settingtoko'
import Alamattoko from '../Containers/Seller/Alamattoko'
import Layananjasa from '../Containers/Seller/Layananjasa'
import Informasitoko from '../Containers/Seller/Informasitoko'
import Ubahtoko from '../Containers/Seller/Ubahtoko'
import Catatantoko from '../Containers/Seller/Catatantoko'
import Tambahcatatan from '../Containers/Seller/Tambahcatatan'
import Pengiriman from '../Containers/Seller/Pengiriman'
import Sudahdibayar from '../Containers/Seller/Pengiriman/Sudahdibayar'
import Diproses from '../Containers/Seller/Pengiriman/Diproses'
import Diterima from '../Containers/Seller/Pengiriman/Diterima'
import Sedangdikirim from "../Containers/Seller/Pengiriman/Sedangdikirim";
import Detailorderan from "../Containers/Seller/Pengiriman/Detailorderan";
import Tambahproduk from '../Containers/Seller/Tambahproduk'
import Homeseller from '../Containers/Seller/Homeseller'
import Kategori from '../Containers/Seller/Kategori'
import Produksaya from '../Containers/Seller/Produksaya'
import Detailkategori from '../Containers/Seller/Detailkategori'
import EditAlamattoko from '../Containers/Seller/EditAlamattoko'
import Tambahalamatseller from "../Containers/Seller/Tambahalamatseller";
import Saldopenjual from '../Containers/Seller/Saldopenjual'
import Ulasan from '../Containers/Seller/Ulasan'
import Tambahkategori from '../Containers/Seller/Tambahkategori'
import Profilseller from '../Containers/Seller/Profilseller'
import Donasi from '../Containers/Seller/Donasi'
import DaftarChat from '../Containers/Seller/DaftarChat'
import Pengajuan from '../Containers/Seller/Pengajuan'
import underConstruction from '../Containers/underConstruction';
import emptyCart from "../Containers/emptyCart";
import Sudahdibatalkan from "../Containers/Seller/Pengiriman/Sudahdibatalkan";
import cartCheckout from "../Containers/cartCheckout";
import Terms from "../Containers/Terms";
import SuccessorderCart from "../Containers/SuccessorderCart";
import profilToko from "../Containers/profilToko";
import kategoriProDariCilent from "../Containers/kategoriProDariCilen";


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
    Cari: { screen: Cari },
    Buatpassword: { screen: Buatpassword },
    Produk: { screen: Produk },
    Successorder: { screen: Successorder },
    Nilaiorder: { screen: Nilaiorder },
    Ulasanpembeli: { screen: Ulasanpembeli },
    Infopembayaran: { screen: Infopembayaran },
    Settingtoko: { screen: Settingtoko },
    Alamattoko: { screen: Alamattoko },
    Layananjasa: { screen: Layananjasa },
    Informasitoko: { screen: Informasitoko },
    Ubahtoko: { screen: Ubahtoko },
    Catatantoko: { screen: Catatantoko },
    Tambahcatatan: { screen: Tambahcatatan },
    Pengiriman: { screen: Pengiriman },
    Sudahdibayar: { screen: Sudahdibayar },
    Diproses: { screen: Diproses },
    Diterima: { screen: Diterima },
    Tambahproduk: { screen: Tambahproduk },
    Homeseller: { screen: Homeseller },
    Kategori: { screen: Kategori },
    Produksaya: { screen: Produksaya },
    Detailkategori: { screen: Detailkategori },
    EditAlamattoko: { screen: EditAlamattoko },
    Saldopenjual: { screen: Saldopenjual },
    Ulasan: { screen: Ulasan },
    Tambahkategori: { screen: Tambahkategori },
    Profilseller: { screen: Profilseller },
    Donasi: { screen: Donasi },
    DaftarChat: { screen: DaftarChat },
    Pengajuan: { screen: Pengajuan },
    underConstruction: { screen: underConstruction},
    Sudahdibatalkan: { screen: Sudahdibatalkan},
    detailKategori: { screen: detailKategori},
    Sedangdikirim: { screen: Sedangdikirim},
    Detailorderan: { screen: Detailorderan},
    emptyCart: { screen: emptyCart},
    cartCheckout: { screen: cartCheckout},
    Terms : { screen: Terms},
    SuccessorderCart: { screen: SuccessorderCart},
    Tambahalamatseller: { screen: Tambahalamatseller},
    profilToko : { screen: profilToko},
    kategoriProDariCilent: { screen: kategoriProDariCilent},
    
    
  },
  {
    headerMode: 'none',
    initialRouteName: 'SplashScreen'
  
  }
);

export default createAppContainer(AppNavigator)