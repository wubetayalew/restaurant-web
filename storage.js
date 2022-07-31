const { initializeApp } = require('firebase/app')
const { getStorage, ref } = require('firebase/storage')

const firebaseConfig = {
    apiKey: "AIzaSyALvNrW9kx8sk4u5bAnlkWeTxT4Ki1cIh0",
    authDomain: "restaurants-a2605.firebaseapp.com",
    projectId: "restaurants-a2605",
    storageBucket: "restaurants-a2605.appspot.com",
    messagingSenderId: "667458098836",
    appId: "1:667458098836:web:993ab696ea903790150681",
    measurementId: "G-KCQBNGZEJ6"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const storageRef = ref(storage);


module.exports = { storage, ref }