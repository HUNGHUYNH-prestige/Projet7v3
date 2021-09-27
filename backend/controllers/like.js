console.log('--> active file : like.js in controllers');
console.log('--- --- --- --- ---');
// Import
const db = require('../models');
const jwt = require('jsonwebtoken');
const { sequelize } = require('../models');

// Get and set the user id
const userID = (req) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const id = decodedToken.userId;
    console.log('--> id the like.js in controllers');
    console.log(userID);
    console.log(id);
    return id;
}


// Like a post
exports.likePost = (req, res, next) => {
    const postID = req.params.id;
    console.log('--- --- --- --- ---');
    console.log(postID);
    // Find one : with user id and post id
    db.Like.findOne({
        where: { userId: userID(req), postId: postID}
    })
    .then(like => {
        // IF exist
        if (like) {
            console.log('like.js in the contollers in the like a post');
            console.log(like)
            // Delete like : with user id and post id
            db.Like.destroy({
                where: { userId: userID(req), postId: postID }
            })
            .then(() => res.status(200).json({message: "Like deleted !"}))
            .catch((error) => res.status(400).json({error}))
        } 
        // ELSE : not liked yet
        else {
            // Create like in the database of MySQL
            db.Like.create({
                userId: userID(req),
                postId: postID
            })
            .then(() => res.status(201).json({message: "Like added !"}))
            .catch((error) => res.status(400).json({error}))
        }
    })
    .catch((error) => res.status(500).json({error}));
}

// Display and get all the user likes
exports.getAllLikes = (req, res, next) => {
    db.Like.findAll({
        where: {postId: req.params.id},
    })
    .then(likes => res.status(200).json(likes))
    .catch(error => res.status(404).json({error}))
}

// Display and get the user like on the post
exports.getOneLike = (req, res, next) => {
    // Find one like with user id and post id
    db.Like.findOne({
        where: {userId: userID(req), postId: req.params.id}
    })
    .then(like => {
        res.status(200).json(like)
    })
    .catch(error => res.status(404).json({error}))
}