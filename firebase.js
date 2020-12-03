import * as firebase from 'firebase';

import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBfEn3VlECAkpUijLCkxO409CRyBSj5vPY",
    authDomain: "schedulerv2.firebaseapp.com",
    databaseURL: "https://schedulerv2.firebaseio.com",
    projectId: "schedulerv2",
    storageBucket: "schedulerv2.appspot.com",
    messagingSenderId: "408224426819",
    appId: "1:408224426819:web:1093c95803248986a15df6",
    measurementId: "G-25T9HDE9GW"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;