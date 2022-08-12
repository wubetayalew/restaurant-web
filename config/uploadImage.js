var admin = require('firebase-admin');
const { app } = require('../config/initalizeApp')
const BUCKET = "restaurants-a2605.appspot.com"
const bucket = admin.storage().bucket()
const uploadImage = (req, res, next) => {
    if (!req.file) return next();
    const image = req.file;
    const imageName = Date.now() + "." + image.originalname.split('.').pop();

    const file = bucket.file(imageName);
    const stream = file.createWriteStream({
        metadata: {
            contentType: image.mimetype,
        }
    });

    stream.on("error", (e) => {
        console.error(e);
    });

    stream.on("finish", async() => {
        try {
            await file.makePublic();

            req.file.firebaseUrl = `https://storage.googleapis.com/${BUCKET}/${imageName}`;
            next();
        } catch (error) {
            console.error(error);
        }


    });

    stream.end(image.buffer)
}
module.exports = { uploadImage }