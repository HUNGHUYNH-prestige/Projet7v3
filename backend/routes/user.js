console.log('--> active file : user.js in routes folder');
console.log('route is ok');
console.log('router is ok');
console.log('router for table : USERS in MySQL');
console.log('--- --- --- --- ---');

// Import
const express            = require('express');
const router             = express.Router();
const userCtrl           = require('../controllers/user');
const auth               = require('../middleware/auth');
const multer             = require('../middleware/multer-config');
const passwordValidation = require('../middleware/passwordValidation')

// Set the router for : table USERS => user
// 1. Connexion
console.log('router methods : POST for connexion');
console.log('--- --- --- ---');
router.post(  '/signup', passwordValidation, userCtrl.signup);
router.post(  '/login',                      userCtrl.login);

// 2. Management of User profile
console.log('router methods : DELETE and PUT (update)');
console.log('--- --- --- --- --- ');
router.delete('/:id', auth, multer,          userCtrl.deleteUser);
router.put(   '/:id', auth, multer,          userCtrl.editUser);

// 3. Display and get user informations
console.log('router methods : GET to display user information');
console.log('--- --- --- --- ---');
router.get(   '/',    auth,                  userCtrl.getAllUsers);
router.get(   '/:id', auth,                  userCtrl.getOneUser);

// EXPORTATIONS ----------
module.exports = router;