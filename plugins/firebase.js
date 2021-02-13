import firebase from 'firebase'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDPmv1Nr6a_24QFhhWXXtvIGGN8_QeUo5I',
  authDomain: 'hamusa-c1fd6.firebaseapp.com',
  projectId: 'hamusa-c1fd6',
  storageBucket: 'hamusa-c1fd6.appspot.com',
  messagingSenderId: '1029394351767',
  appId: '1:1029394351767:web:9190fb4523b78196f04bd2',
  measurementId: 'G-DHC5JQKQGY',
}
// Initialize Firebase
// Initialize Firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}
firebase.analytics()

export default firebase
