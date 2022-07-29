const express = require('express')
const { db } = require('./firebase.js')
const { storage } = require('./storage.js')
var bodyParser = require("body-parser");
const restaurantRouter = require('./routes/restaurant')
const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(8500, function() {
    console.log('server started')
})
app.set('view engine', 'ejs')
app.use('/public', express.static('public'));



app.use('/restaurant', restaurantRouter)