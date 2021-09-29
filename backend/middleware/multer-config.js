console.log('--> active file : multer-config.js with multer in the middleware');
console.log('--- --- --- --- ---');

// Import
const multer = require('multer')

// Set the accepted files
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif'
};

// Create an object for receiving the media on the disk storage
const storage = multer.diskStorage({
    // Set the destination for file images media
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    // Set the name for the file received
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_').split('.')[0];
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
})

// Export
module.exports = multer({storage : storage}).single('file');