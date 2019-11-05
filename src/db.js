import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN, 
    databaseURL: process.env.VUE_APP_FIREBASE_DB_URL,
    projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID, 
    storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET, 
    messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID 
}

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();