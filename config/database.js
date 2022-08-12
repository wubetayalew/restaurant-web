const { getFirestore } = require('firebase-admin/firestore')
const { app } = require('../config/initalizeApp')
const db = getFirestore(app)
module.exports = { db }