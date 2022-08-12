// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA74Jlm92E8NaFE9TE-qzNeD_cobeG9Kbo",
    authDomain: "la-raids.firebaseapp.com",
    projectId: "la-raids",
    storageBucket: "la-raids.appspot.com",
    messagingSenderId: "1002979806610",
    appId: "1:1002979806610:web:c36eb8aef379e1a098c54b",
    measurementId: "G-VHRQPNSLC4"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);