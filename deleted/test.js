const express = require('express')
const route = express.Router()
const { db, uploadImage } = require('../config/firebase')
const multer = require('multer');

const Multer = multer({
    storage: multer.memoryStorage(),
    limits: 1024 * 1024,
});

route.post('/', Multer.single('image'), uploadImage, async function(req, res) {
    var s = req.file
    console.log(s);
    res.send('you are on the test page');
    console.log('you are on the test page');
})



module.exports = route