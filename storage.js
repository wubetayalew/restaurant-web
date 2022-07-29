const { initializeApp } = require('firebase/app')
const { getStorage, ref } = require('firebase/storage')

const firebaseConfig = {
    apiKey: "AIzaSyC4CgnLETAYadjiOapjXL4pnok2lNwSdmQ",
    authDomain: "test-11ac5.firebaseapp.com",
    projectId: "test-11ac5",
    storageBucket: "test-11ac5.appspot.com",
    messagingSenderId: "622703016617",
    appId: "1:622703016617:web:414fcaed60cc847d2d07b8",
    measurementId: "G-JK1H2Y56E3"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const storageRef = ref(storage);


module.exports = { storage, ref }