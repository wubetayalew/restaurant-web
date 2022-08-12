import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js"
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
const analytics = getAnalytics(app);
const auth = getAuth(app);
document.getElementById('signIn').addEventListener('click', function() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 

            const user = userCredential.user;
            alert(user.uid);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
})