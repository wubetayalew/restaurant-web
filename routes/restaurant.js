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
    res.render('index')

})
route.get('/addFood', function(req, res) {
    res.render('addmenu')
})
route.get('/addFood', function(req, res) {
    res.render('addmenu')
})


route.get('/reserve', function(req, res) {
    res.render('reserve')
})
route.get('/users', function(req, res) {
    res.render('users')
})

route.get('/index', function(req, res) {
    res.render('index')
})

route.get('/restaurant', function(req, res) {
    res.render('restaurant')
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
route.get('/about', async function(req, res) {                                                                                                                                                                                                                                   
    const aboutus= await db.collection('birhan').get()
    const {docs}=aboutus
    const about = docs.map(review=>(review.id , review.data()))
    console.log(about);
    

    res.render('about',{
        about: about,
        title: "Restaurant Orders"
    })
       
})

route.get('/orders', async function (req, res) {   
    const totOrders= await db.collection('birhan').doc("orders").collection('orders').get()
    const {docs}=totOrders
    const order = docs.map(orders=>(orders.id , orders.data()))
    console.log(order);
    

    res.render('orders',{
        order: order,
        title: "Restaurant Orders"
    })

     
})

route.get('/Specialreserve', async function(req, res) {
       const totReserve= await db.collection('birhan').doc('reserve').collection('reserves').get()
       const {docs} =totReserve
       const reserveonly=docs.map(reserveonly=>(reserveonly.id,reserveonly.data()))
       console.log(reserveonly);

       res.render('reserveWithOrder',{
          reserveonly: reserveonly

       })
    })
       


module.exports = route