const { initializeApp, cert } = require('firebase-admin/app')
const serviceAccount = require('../config/creds.json')
const BUCKET = "restaurants-a2605.appspot.com"
const app = initializeApp({
    credential: cert(serviceAccount),
    apiKey: "AIzaSyALvNrW9kx8sk4u5bAnlkWeTxT4Ki1cIh0",
    authDomain: "restaurants-a2605.firebaseapp.com",
    projectId: "restaurants-a2605",
    storageBucket: BUCKET,
    messagingSenderId: "667458098836",
    appId: "1:667458098836:web:993ab696ea903790150681",
    measurementId: "G-KCQBNGZEJ6"

})

module.exports = { app }