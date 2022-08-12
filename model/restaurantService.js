const { db } = require('../config/database')
async function createRestaurant(restaurant_name, owner_id) {
    const restaurantRef = db.collection(restaurant_name).doc('menu');
    await restaurantRef.set({
        ['owner_id']: owner_id,
    }, { merge: true })
}
async function createRestaurantAdmin(restaurant_Admin_id, restaurant_Admin_name, restaurant_name) {
    const adminRef = db.collection("user").doc(restaurant_Admin_id)
    await adminRef.set({
        ['restaurant']: restaurant_name,
        ['name']: restaurant_Admin_name,
        ['role']: "restaurant_owner",
    }, { merge: true })
}
async function createAdmin(admin_id, admin_name, admin_phone_number) {
    const adminRef = db.collection("user").doc(admin_id)
    await adminRef.set({
        ['name']: admin_name,
        ['admin_phone_number']: admin_phone_number,
        ['role']: "admin",
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
async function getMenu(restaurant_name) {
    const docRef = db.collection(restaurant_name).doc('menu').collection('foods').where('item_record_status', "!=", false);
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
async function getRestaurants() {
    const list = await db.listCollections();
    var records = [];
    list.forEach(record => {
        records.push(record["_queryOptions"].collectionId);
    })
    return records;
}

async function getRestaurantNameFromUid(uid) {
    const docRef = db.collection('user').doc(uid);
    const list = await docRef.get();
    return list.data().restaurant;
}
async function getUidFromRestaurantName(restaurant_name) {
    const docRef = db.collection(restaurant_name).doc("menu");
    const list = await docRef.get();
    return list.data().owner_id;
}
async function getRoleFromUid(uid) {
    const docRef = db.collection('user').doc(uid);
    const list = await docRef.get();
    return list.data().role;
}


module.exports = {
    saveMenu,
    saveDrink,
    createRestaurant,
    deleteMenu,
    getMenu,
    changeStatus,
    changeRecordStatus,
    getFoodByFoodName,
    getRestaurants,
    createRestaurantAdmin,
    getRestaurantNameFromUid,
    getUidFromRestaurantName,
    createAdmin,
    getRoleFromUid
}