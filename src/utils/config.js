import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDknktHCC_MbdDcEn2Y3RjxKTiaQaRXWg4",
  authDomain: "invoice-app-db9cd.firebaseapp.com",
  projectId: "invoice-app-db9cd",
  storageBucket: "invoice-app-db9cd.appspot.com",
  messagingSenderId: "845853344400",
  appId: "1:845853344400:web:2e1ea6ddb1d6976a16ce15",
  measurementId: "G-D296YH0D5S",
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export {firebase}