import firebase from 'firebase/compat/app'
import {getDatabase} from 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyBX0YVoCovCWY8-fWQrOWkceGrUPM3JD2s",
    authDomain: "quickgpa-6ba75.firebaseapp.com",
    databaseURL: "https://quickgpa-6ba75-default-rtdb.firebaseio.com",
    projectId: "quickgpa-6ba75",
    storageBucket: "quickgpa-6ba75.appspot.com",
    messagingSenderId: "500711679623",
    appId: "1:500711679623:web:2f648d91f9f835c410ba22"
};

if (firebase.apps.length === 0)
{
    firebase.initializeApp(firebaseConfig);
}

const db = getDatabase();
export {db};