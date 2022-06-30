import firebase from '@firebase/app'
// Add the Firebase services that you want to use
import '@firebase/auth'
import '@firebase/database'
import '@firebase/firestore'
import '@firebase/storage'



// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDt1D7cHAcv9Yk9SiVXne_jNBTSzH4q6So",
    authDomain: "bina-app-354203.firebaseapp.com",
    projectId: "bina-app-354203",
    storageBucket: "bina-app-354203.appspot.com",
    messagingSenderId: "645952857359",
    appId: "1:645952857359:web:a5d029f92e8b95a2ccca7a",
    measurementId: "G-D8E89KHJVY"
  };
//
if (!firebase.apps.length) {
     firebase.initializeApp(firebaseConfig);
}


export { firebase };