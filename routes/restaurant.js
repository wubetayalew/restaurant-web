const express = require('express')
const { storage, ref } = require('../storage.js')

const route = express.Router()
const restaurantService = require('./restaurantService')
    // const { db } = require('../firebase.js')


route.get('/', async function(req, res) {
    // restaurantService.createRestaurant("Mikas Burger", "Have a nice time", "Gerji")
    // restaurantService.saveMenu("Mikas Burger", "Burger", 220.0, "Cheese burger");
    // restaurantService.saveMenu("Mikas Burger", "qqqqqqqqqq", 220.0, "Cheese burger");
    // restaurantService.deleteMenu("Mikas Burger", "qqqqqqqqqq")


    // restaurantService.saveMenu("Mikas Burger", "aaaaaaaaaa", 220.0, "Cheese burger");
    // restaurantService.saveMenu("Mikas Burger", "bbbbbbbbbb", 220.0, "Cheese burger");
    // restaurantService.saveMenu("Mikas Burger", "cccccccccc", 220.0, "Cheese burger");
    // restaurantService.getMenu("Mikas Burger", "bbbbbbbbbb")
    res.send('ypu are on restaurant page')
        // const mountainsRef = ref(storage, 'food6.jpg');
        // console.log('you are okay')

})
route.get('/addFood', function(req, res) {
    res.render('addFood')
})
route.get('/index', function(req, res) {
    var foods = restaurantService.getAllMenu()
    res.render('index', {
        foods: foods
    })
})
route.post('/addFood', async function(req, res) {
    var foodMenu = req.body.food;
    var price = parseInt(req.body.price);
    var description = req.body.description;
    var restaurant = req.body.restaurant;
    restaurantService.saveMenu(restaurant, foodMenu, price, description)
    res.redirect('index')
})
route.get('/abc', async function(req, res) {
    var foods = restaurantService.getMenu("Mikas Burger", "pasta")
    console.log("************************************************")
    console.log((await foods).length)
})

module.exports = route