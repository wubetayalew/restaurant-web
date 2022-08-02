const express = require('express')
const { db } = require('./firebase.js')
const { storage } = require('./storage.js')

var path = require('path');
var bodyParser = require("body-parser");
const restaurantRouter = require('./routes/restaurant')
const testRouter = require('./routes/test')
const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(1234, function() {
    console.log('server started')
})
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, './public')));


app.use('/', restaurantRouter)
app.use('/test', testRouter)

module.exports = app;