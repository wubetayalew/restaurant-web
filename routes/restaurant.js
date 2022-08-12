const express = require('express')
const firebase = require('firebase/auth')
const auth = require('../config/auth')
const route = express.Router()
const restaurantService = require('../model/restaurantService')
const { db } = require('../config/database')
const { uploadImage } = require('../config/uploadImage')

const multer = require('multer');

const Multer = multer({
    storage: multer.memoryStorage(),
    limits: 1024 * 1024,
});

function isLoggedIn(req, res, next) {
    if ('uid' in req.cookies) {
        next();
    } else {
        res.render('404.pug')
    }
}

function isAdmin(req, res, next) {
    if ('uid' in req.cookies && req.cookies.role === "admin") {
        next();
    } else {
        res.render('404.pug')
    }
}



route.get('/signIn', function(req, res) {
    res.render('signIn.ejs')
})
route.get('/signUp', function(req, res) {
    res.render('signUp.ejs')
})
route.get('/signout', function(req, res) {
    if (req.cookies.role === "admin") {
        res.clearCookie('uid');
        res.redirect('/restaurant')
    } else {
        res.clearCookie('uid');
        res.redirect('/signIn')
    }

})
route.get('/signoutAdimin', function(req, res) {
    res.clearCookie('role');
    res.redirect('/signIn')

})
route.get('/signUpAdimin', function(req, res) {
    res.render('signUpAdmin.ejs')

})
route.get('/', async function(req, res) {
    res.render('index')

})
route.get('/addFood', isLoggedIn, function(req, res) {
    res.render('addmenu')
})
route.get('/orders', function(req, res) {
    res.render('orders')
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

route.get('/restaurant', isAdmin, async function(req, res) {
    var restaurants = await restaurantService.getRestaurants();
    res.render('restaurant', {
        restaurants: restaurants
    })
})
route.post('/addFood', isLoggedIn, Multer.single('image'), uploadImage, async function(req, res) {
    var foodMenu = req.body.foodname;
    var price = req.body.price;
    var description = req.body.description;
    var restaurant_name = await restaurantService.getRestaurantNameFromUid(req.cookies.uid)
    var type = req.body.selectSm;
    console.log(restaurant_name);
    if (type == 'Drinks') {
        restaurantService.saveDrink(restaurant_name, foodMenu, price, description, req.file.firebaseUrl)
    } else {
        restaurantService.saveMenu(restaurant_name, foodMenu, price, description, req.file.firebaseUrl, type)
    }


    res.redirect('menu')
})
route.get('/menu', isLoggedIn, async function(req, res) {
    var foods = await restaurantService.getMenu(await restaurantService.getRestaurantNameFromUid(req.cookies.uid));
    var restuarant_name = await restaurantService.getRestaurantNameFromUid(req.cookies.uid)
    res.render('menu', {
        foods: foods,
        restuarant_name: restuarant_name
    })
})

route.post('/changeStatus', isLoggedIn, async function(req, res) {

    if (req.body.foodStatus) {
        restaurantService.changeStatus(await restaurantService.getRestaurantNameFromUid(req.cookies.uid), req.body.foodName, 'foods', false);
    } else {
        restaurantService.changeStatus(await restaurantService.getRestaurantNameFromUid(req.cookies.uid), req.body.foodName, 'foods', true);
    }
    res.redirect('/menu')

})

route.post('/changeRecordStatus', isLoggedIn, async function(req, res) {
    restaurantService.changeRecordStatus(await restaurantService.getRestaurantNameFromUid(req.cookies.uid), req.body.foodName, 'foods', false)
    res.redirect('/menu')

})

route.post('/updateFood', isLoggedIn, async function(req, res) {
    var food = await restaurantService.getFoodByFoodName(req.body.foodName)
    console.log(food)

    res.render('updateMenu.pug', {
        food: food
    })
})
route.get('/about', isLoggedIn, async function(req, res) {
    const aboutus = await db.collection('birhan').get()
    const { docs } = aboutus
    const about = docs.map(review => (review.id, review.data()))
    console.log(about);


    res.render('about', {
        about: about,
        title: "Restaurant Orders"
    })

})

route.get('/orders', async(req, res) => {
    const totOrders = await db.collection('birhan').doc("orders").collection('orders').get()
    const { docs } = totOrders
    const order = docs.map(orders => (orders.id, orders.data()))
    console.log(order);


    res.render('orders', {
        order: order,
        title: "Restaurant Orders"
    })


})

route.get('/acceptUidAndRedirectToFillMoreInformation', async function(req, res) {
    var uid = req.query.uid
    res.render('registerRestaurant.ejs', {
        uid: uid
    })

});
route.get('/acceptUidAndRedirectToFillMoreInformationAdmin', async function(req, res) {
    var uid = req.query.uid
    res.render('registerAdmin.ejs', {
        uid: uid
    })

});
route.get('/getUidAndSaveToCookie', async function(req, res) {
    var uid = req.query.uid;
    console.log(await restaurantService.getRoleFromUid(req.query.uid))
    if (await restaurantService.getRoleFromUid(req.query.uid) === "admin") {
        res.cookie('uid', uid)
        res.cookie('role', 'admin')
        res.redirect('/restaurant');
    } else {
        res.cookie('uid', uid)
        res.redirect('/menu');
    }
})
route.get('/getUidAndSaveToCookie2', async function(req, res) {

    // var uid = req.query.uid;
    // console.log("redirected to 2")

    // if ('uid' in req.cookies) {
    //     console.log(req.cookies.uid);
    // }
    // res.clearCookie('uid');
    // res.redirect('/getUidAndSaveToCookie3')
    //     // res.render('404.pug');
})
route.get('/getUidAndSaveToCookie3', async function(req, res) {

    // var uid = req.query.uid;
    // var uid = "cookienew"
    // res.cookie('uid', uid)

    // console.log(await restaurantService.getRestaurantNameFromUid(req.cookies.uid))
    // res.send('hello');

})

route.post('/saveRestaurant', async function(req, res) {
    var restaurant = req.body.restaurant_name;
    var uid = req.body.uid;
    restaurantService.createRestaurantAdmin(uid, "ababe", restaurant);
    restaurantService.createRestaurant(restaurant, uid)
    res.redirect('/menu');
})
route.post('/saveAdmin', async function(req, res) {
    var admin_name = req.body.admin_name;
    var admin_phone_number = req.body.admin_phone_number;
    var uid = req.body.uid;
    restaurantService.createAdmin(uid, admin_name, admin_phone_number)
    res.redirect('/restaurant');
})

route.post('/manageRestaurant', async function(req, res) {
    var restaurant = req.body.restaurant_name;
    var uid = await restaurantService.getUidFromRestaurantName(restaurant)
    res.cookie('uid', uid)
    res.cookie('role', "admin")
    console.log(uid)
    res.redirect('/menu');
    // res.redirect('/menu');
})

module.exports = route