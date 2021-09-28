console.log('--> active file : user.js in controllers');
console.log('--- --- --- --- ---');

// Import
const db = require('../models')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Get and set the user id
const userID = (req) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const id = decodedToken.userId;
    console.log('--> id the user.js in controllers');
    console.log(userID);
    console.log(id);
    return id;
}

// Regex for email checking
const emailRegex = (email) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

// Connexion : Signup and Login

// Signup
exports.signup = (req, res, next) => {
    // Email must be unique, so let's check if the email already exists in the database of MySQL
    db.User.findOne({
        where: {email: req.body.email}
    })
    .then(user => {
        console.log('---> user.js in controllers --> the user is : ');
        console.log(user);
        // User already exists in the database of MySQL
        if (user) {
            return res.status(401).json({error: "User already existing !"});
        } 
        // Else : new user
        else {
            // Let's check the email with the regex
            if (!emailRegex(req.body.email)) {
                res.status(400).json({message: "Email format not accepted !"})
            } 
            // ELSE : email format accepted, hash the password for safety
            else {
                bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    // Create the new user in the database of MySQL with a default unknown avatar
                    db.User.create({
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: req.body.email,
                        password: hash,
                        profilePicture: 'http://localhost:3000/images/unknown.jpeg'
                    })

                    .then((user)=>{
                        console.log(user)
                        res.status(201).json({
                            message: "New user created and added ! Welcome !"
                        })
                    })
/*
                    .then(() => res.status(201).json(
                        {message: "New user created and added ! Welcome !"}
                    ))
*/
                    .catch(error => res.status(500).json({error}))
                })
                .catch(error => res.status(500).json({error}));
            }
        }
    })
    .catch(error => res.status(500).json({error}));
}

// Login
exports.login = (req, res, next) => {
    // Find one user : with the email from the req body
    db.User.findOne({
        where: {email: req.body.email}
    })
    .then(user => {
        // IF the user does not exist
        if(!user) {
            return res.status(401).json({error: "User not found !"});
        }
        // It's time to compare the password send with the password stored in the database of MySQL
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            // IF wrong password
            if (!valid) {
                return res.status(401).json({error: "Password not correct !"});
            } 
            // ELSE : right password => password hashed
            else {
                console.log('--- --- --- --- ---')
                console.log("This is the user password :")
                console.log(user.password)
                console.log('--- --- --- --- ---')
                console.log(user)
                res.status(200).json({
                    userId: user.id,
                    token: jwt.sign(
                        {userId: user.id},
                        process.env.TOKEN,
                        {expiresIn: '24h'}
                    ),
                    userAdmin: user.isAdmin
                })
            }
        })
        .catch(error => res.status(500).json({error}));
    })
    .catch(error => res.status(500).json({error}));
}


// Management of User profile : Delete and Edit (Update)

// Delete an existing user
exports.deleteUser = (req, res, next) => {
    // Find one user with id the req params
    db.User.findOne({
        where: {id: req.params.id}
    })
    .then(user => {
        // IF the user does exist in the database of MySQL
        if (user) {
            // Who is this user ? Find one user with the id in the req
            db.User.findOne({
                where: {id: userID(req)}
            })
            .then(admin => {
                // The user is the owner or is admin
                if(user.id === admin.id || admin.isAdmin === true) {
                    // Delete user from the database of MySQL
                    db.User.destroy({
                        where: {id: req.params.id}
                    })
                    .then(() => res.status(200).json({message: "User deleted !"}))
                    .catch(error => res.status(400).json({error}));
                }
                // ELSE : someone else 
                else {
                    res.status(403).json({message: "You cannot do delete on this account !"})
                }
            })
            .catch(error => res.status(500).json({error}))
        } 
        // ELSE : user does not exist
        else {
            res.status(404).json({message: "User not found !"})
        }
    })
    .catch(error => res.status(500).json({error}))
}

// Edit an existing user profile
exports.editUser = (req, res, next) => {
    // Find one user id with the id in the req params
    db.User.findOne({
        where: {id: req.params.id}
    })
    .then(user => {
        // IF the user exists
        if (user) {
            // Find one user with the id in the req
            db.User.findOne({
                where: {id: userID(req)}
            })
            .then(admin => {
                // IF the user is the owner or is admin
                if (user.id === userID(req) || admin.isAdmin === true) {
                    let imgUrl;
                    // IF no file
                    if (!req.file) {
                        if(user.profilePicture == null) {
                            imgUrl = 'http://localhost:3000/images/unknown.jpeg'
                        } else {
                            imgUrl = user.profilePicture
                        }
                    } else {
                        imgUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
                    }
                    // Update user data in the database of MySQL
                    db.User.update(
                        {firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        department: req.body.department,
                        profilePicture: imgUrl}, 
                        {where: {id: req.params.id},
    
                    })
                    .then(() => res.status(201).json({message: "User profile updated !"}))
                    .catch(error => res.status(400).json({error}))
                } 
                // ELSE : someone else
                else {
                    res.status(403).json({message: "You cannot do update on this account !"})
                }
            })
            .catch(error => res.status(500).json({error}))
            
        } 
        // ELSE : user not found
        else {
            res.status(404).json({message: "User not found !"})
        }
    })
    .catch(error => res.status(500).json({error}))
}


// Display and get management

// Display and get all users
exports.getAllUsers = (req, res, next) => {
    // select * = findAll
    db.User.findAll({
        attributes: ['id', 'firstname', 'lastname', 'email', 'department', 'profilePicture', 'createdAt']
    })
    .then(user => res.status(200).json({user}))
    .catch(error => { res.status(500).json({error})})
}


// Display and get only one user
exports.getOneUser = (req, res, next) => {
    db.User.findOne({
        where: {id: req.params.id},
        attributes: ['id', 'firstname', 'lastname', 'email', 'department', 'profilePicture', 'createdAt']
    })
    .then(user => res.status(200).json(user))
    .catch(error => { res.status(500).json({error})})
}