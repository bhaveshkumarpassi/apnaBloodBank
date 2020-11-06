import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
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