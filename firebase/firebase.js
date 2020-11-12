import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
//import "firebase/messaging";
import {firebaseConfig} from './config';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }

export const firebaseSupport = firebase; 

export const auth = firebase.auth();

export const fireauth = firebase.auth;

export const firestore = firebase.firestore();

export const firebasestore = firebase.firestore;

export const storage = firebase.storage();

/*export const messaging = firebase.messaging();
messaging.requestPermission()
.then(() => {
    console.log('Got permission');
    return messaging.getToken();
})
.then((token) => {
    console.log(token);
})
.catch((error) => {
    console.log('GOt error');
})*/