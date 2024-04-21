import firebase from 'firebase/compat/app'
import {getDatabase} from 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyCVu6OtQSlnJzRI6gcDnlnj3QbWX6BY01U",
    authDomain: "strawhatcoders-c1028.firebaseapp.com",
    databaseURL: "https://strawhatcoders-c1028-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "strawhatcoders-c1028",
    storageBucket: "strawhatcoders-c1028.appspot.com",
    messagingSenderId: "1073430107906",
    appId: "1:1073430107906:web:9b732ca20a0b1ad436941b",
    measurementId: "G-G4VK11KMN2"
};

if (firebase.apps.length === 0)
{
    firebase.initializeApp(firebaseConfig);
}

const db = getDatabase();
export {db};