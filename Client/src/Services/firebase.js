import firebase from 'firebase/app'
import 'firebase/auth'
import dotenv from 'dotenv'
dotenv.config()

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FBASE_API_KEY,
    authDomain: process.env.REACT_APP_FBASE_AUTHDOMAIN,
    projectId: process.env.REACT_APP_FBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FBASE_MESSAGEINGSENDERID,
    appId: process.env.REACT_APP_FBASE_APPID
};
  
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()

export {auth}

