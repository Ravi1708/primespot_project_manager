// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseApp = firebase.initializeApp( {
    apiKey: "AIzaSyAjZtfKV-rMklSQdWW1KYcKt1rUqiQuoB0",
    authDomain: "project-manager-a78cb.firebaseapp.com",
    databaseURL: "https://project-manager-a78cb.firebaseio.com",
    projectId: "project-manager-a78cb",
    storageBucket: "project-manager-a78cb.appspot.com",
    messagingSenderId: "718296681793",
    appId: "1:718296681793:web:428e2c89f2eaeae9bea5c0",
    measurementId: "G-7BVN93T314"
  });
 
const db = firebaseApp.firestore();
const auth = firebase.auth();


export  {db,auth }; 
