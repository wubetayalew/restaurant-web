const { db } = require('../firebase.js')
async function createRestaurant(restaurant_name, restaurant_location, restaurant_description) {
    const restaurantRef = db.collection('restaurant').doc(restaurant_name)
    await restaurantRef.set({
        ['restaurant_name']: restaurant_name,
        ['location']: restaurant_description,
        ['description']: restaurant_location,
    }, { merge: true })
}
async function saveMenu(restaurant_name, food_name, food_price, food_description, image_location, food_type) {
    const menuRef = db.collection(restaurant_name).doc('menu').collection('foods').doc(food_name);
    await menuRef.set({
            ['menu_name']: food_name,
            ['price']: food_price,
            ['description']: food_description,
            ['image']: image_location,
            ['type']: food_type

        }, { merge: true })
        // db.collection('restaurant').doc(restaurant_name).collection('menu').doc('Burger').delete();
    console.log('you are okey food!')
}
async function saveDrink(restaurant_name, food_name, food_price, food_description, image_location) {
    const menuRef = db.collection(restaurant_name).doc('menu').collection('drinks').doc(food_name);
    await menuRef.set({
            ['menu_name']: food_name,
            ['price']: food_price,
            ['description']: food_description,
            ['image']: image_location

        }, { merge: true })
        // db.collection('restaurant').doc(restaurant_name).collection('menu').doc('Burger').delete();
    console.log('you are okey drink!')
}
async function deleteMenu(restaurant_name, food_name) {
    db.collection('restaurant').doc(restaurant_name).collection('menu').doc(food_name).delete();
}
async function getMenu(restaurant_name, food_name) {
    const docRef = db.collection('restaurant').doc(restaurant_name).collection('menu');
    const list = await docRef.get();
    var records = [];
    list.forEach(record => {
        records.push(record.data());
    })

    return records;

    // console.log(data.data().description);
    // var foodCollection = [];
    // db.collection('restaurant').doc(restaurant_name).collection('menu')
    //     .get().then((querySnapshot) => {
    //         var foodCollection = [];
    //         querySnapshot.forEach((doc) => {
    //             foodCollection.push(doc.data());
    //         });


    //     })
    // const ref = db.collection('restaurant').doc(restaurant_name).collection('menu')
    // const querySnapshots = ref.get();
    // console.log((await querySnapshots))
    // console.log(foodCollection);;
}
async function getAllMenu() {
    const docRef = db.collection('restaurant').doc('Mikas Burger').collection('menu');
    const list = await docRef.get();
    var records = [];
    list.forEach(record => {
        records.push(record.data());
    })

    return records;
}

module.exports = {
    saveMenu,
    saveDrink,
    createRestaurant,
    deleteMenu,
    getMenu,
    getAllMenu
}