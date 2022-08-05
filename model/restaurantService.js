const { db } = require('../config/firebase')
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
            ['type']: food_type,
            ['item_record_status']: true

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
        ['image']: image_location,
        ['item_record_status']: true,
        ['item_status']: true

    }, { merge: true })
    console.log('you are okey drink!')
}
async function changeStatus(restaurant_name, item_name, foods_or_drinks, item_status) {
    const menuRef = db.collection(restaurant_name).doc('menu').collection(foods_or_drinks).doc(item_name);
    await menuRef.set({
        ['item_status']: item_status

    }, { merge: true })
    console.log('you are okey drink!')
}
async function changeRecordStatus(restaurant_name, item_name, foods_or_drinks, item_status) {
    const menuRef = db.collection(restaurant_name).doc('menu').collection(foods_or_drinks).doc(item_name);
    await menuRef.set({
        ['item_record_status']: item_status

    }, { merge: true })
    console.log('you are okey drink!')
}

async function deleteMenu(restaurant_name, food_name) {
    db.collection('restaurant').doc(restaurant_name).collection('menu').doc(food_name).delete();
}
async function getMenu() {
    const docRef = db.collection('wubet').doc('menu').collection('foods').where('item_record_status', "!=", false);
    const list = await docRef.get();
    var records = [];
    list.forEach(record => {
        records.push(record.data());
    })

    return records;
}
async function getFoodByFoodName(food_name) {
    const docRef = db.collection('wubet').doc('menu').collection('foods').doc(food_name);
    const list = await docRef.get();
    return list.data();
}

module.exports = {
    saveMenu,
    saveDrink,
    createRestaurant,
    deleteMenu,
    getMenu,
    changeStatus,
    changeRecordStatus,
    getFoodByFoodName
}