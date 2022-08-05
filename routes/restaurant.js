const express = require('express')

const route = express.Router()
const restaurantService = require('../model/restaurantService')
const { db, uploadImage } = require('../config/firebase')
const multer = require('multer');

const Multer = multer({
    storage: multer.memoryStorage(),
    limits: 1024 * 1024,
});


route.get('/', async function(req, res) {
    res.send('you can do this')

})
route.get('/addFood', function(req, res) {
    res.render('addmenu')
})
route.get('/orders', function(req, res) {
    res.render('orders')
})
route.get('/reserve', function(req, res) {
    res.render('reserve')
})

route.get('/index', function(req, res) {
    res.render('index')
})
route.post('/addFood', Multer.single('image'), uploadImage, async function(req, res) {
    var foodMenu = req.body.foodname;
    var price = req.body.price;
    var description = req.body.description;
    var restaurant_name = req.body.restaurant_name;
    var type = req.body.selectSm;
    console.log(restaurant_name);
    if (type == 'Drinks') {
        restaurantService.saveDrink(restaurant_name, foodMenu, price, description, req.file.firebaseUrl)
    } else {
        restaurantService.saveMenu(restaurant_name, foodMenu, price, description, req.file.firebaseUrl, type)
    }


    res.redirect('menu')
})
route.get('/menu', async function(req, res) {
    var foods = await restaurantService.getMenu()
    res.render('menu', {
        foods: foods
    })
})

route.post('/changeStatus', function(req, res) {

    if (req.body.foodStatus) {
        restaurantService.changeStatus('wubet', req.body.foodName, 'foods', false);
    } else {
        restaurantService.changeStatus('wubet', req.body.foodName, 'foods', true);
    }
    res.redirect('/menu')

})

route.post('/changeRecordStatus', function(req, res) {
    restaurantService.changeRecordStatus('wubet', req.body.foodName, 'foods', false)
    res.redirect('/menu')

})

route.post('/updateFood', async function(req, res) {
    var food = await restaurantService.getFoodByFoodName(req.body.foodName)
    console.log(food)

    res.render('updateMenu.pug', {
        food: food
    })
})


module.exports = route