const firebase = require('firebase/auth')
const { initializeAuth } = require('firebase/auth')
const app = require('../config/initalizeApp')
const { config } = require('../config/config')
const { initializeApp } = require('firebase-admin')

const auth = 5
    // const auth = firebase.getAuth(app)
    // const auth = initializeAuth(app)

module.exports = { auth }