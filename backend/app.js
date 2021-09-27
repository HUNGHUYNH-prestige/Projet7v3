console.log('--> active file : app.js');
console.log('--- --- --- --- ---');

// Import
const express    = require('express');
const db         = require("./models");
const helmet     = require('helmet');
const path       = require('path');
const fs         = require('fs');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

// MySQL connexion : sync all models into tables in the database named : socialnetwork
// MySQL user : root
db.sequelize.sync()
.then(() => {
    console.log('--- --- --- --- ---');
    console.log('MySQL connexion established !')
    console.log('--- --- --- --- ---');
})
.catch((err) => {
    console.log('Error : ' + err)
})

// Set express application for use
const app = express();

// Helmet protection activated
app.use(helmet());

// CORS management : header protection
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Use json format
app.use(express.json());

// Settings routes for :

// 1. Images and diskstorage : multer
app.use('/images', express.static(path.join(__dirname, 'images')));

// 2. API routes for : user and post
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Export
module.exports = app;