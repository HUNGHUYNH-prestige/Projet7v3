console.log('--> active file : post.js in controllers');
console.log('--- --- --- --- ---');

// Import
const db = require('../models');
const fs = require('fs');
const jwt = require('jsonwebtoken');

// Get and set the user id
const userID = (req) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const id = decodedToken.userId;
    console.log('--> id the post.js in controllers');
    console.log(userID);
    console.log(id);
    return id;
}

// Add a post in the database of MySQL with create
exports.createPost = (req, res, next) => {
    let imgUrl;
    // IF no file
    if (!req.file) {
        return;
    } 
    // ELSE : file exists
    else {
        imgUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }
    // Create the post for the user
    db.Post.create({
        title: req.body.title,
        media: imgUrl,
        userId: req.body.userId
    })
    .then(() => res.status(201).json({message: "Post created !"}))
    .catch(error => res.status(400).json({error}));
}

// Edit a post
exports.editPost = (req, res, next) => {
    // Find one with id the req params
    db.Post.findOne({
        where: {id: req.params.id},
        include: [
            {
                model: db.User,
                attributes: ["id", "firstname", "lastname", "email", "department", "profilePicture", "isAdmin"]
            },
        ]
    })
    .then(post => {
        // IF post exists
        if (post) {
            // Find one : with user id
            db.User.findOne({
                where: {id: userID(req)}
            })
            .then(user => {
                // IF the user is the owner or is admin
                if (post.User.id === userID(req) || user.isAdmin === true ) {
                    let imgUrl;
                    // IF no file
                    if (!req.file) {
                        if (post.media == null) {
                            imgUrl = null;
                        } else {
                            imgUrl = post.media
                        }
                    } 
                    // ELSE : file exists
                    else {
                        imgUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
                    }
                    // Update the post in the database of MySQL with user id
                    db.Post.update(
                        {title: req.body.title,
                        media: imgUrl,
                        userId: req.body.userId},
                        { where: {id: req.params.id}}
                    )
                    .then(() => res.status(201).json({message: "Post updated !"}))
                    .catch(error => res.status(400).json({error}))
                } 
                // ELSE : someone else
                else {
                    res.status(403).json({erreur: "You cannot do update on this post !"})
                }
            })
            .catch(error => res.status(500).json({error}))
        }
        // ELSE : post not found
        else {
            res.status(404).json({erreur: 'Post not found !'})
        }
    })
    .catch(error => res.status(500).json({error}))
}

// Delete a post in the database of MySQL
exports.deletePost = (req, res, next) => {
    // Find one post : with id
    db.Post.findOne({
        where: {id: req.params.id},
        include: [
            {
                model: db.User,
                attributes: ["id", "firstname", "lastname", "email", "department", "profilePicture", "isAdmin"]
            },
        ]
    })
    .then(post => {
        // IF post exists
        if (post) {
            // Find one : with user id
            db.User.findOne({
                where: {id: userID(req)}
            })
            .then(admin => {
                // The user is the owner or is admin
                if (post.userId == userID(req) || admin.isAdmin === true) {
                    const filename = post.media.split('/images/')[1];
                    fs.unlink(`images/${filename}`, () => {
                        // Delete from the database of MySQL with id
                        db.Post.destroy({
                            where: {id: req.params.id}
                        })
                        .then(() => res.status(200).json({message: "Post deleted !"}))
                        .catch(error => res.status(400).json({error}));
                    })
                } 
                // ELSE : someone else
                else {
                    res.status(403).json({message: "You cannot do delete on this post !"})
                }
            })
            .catch(error => res.status(500).json({error}))
        }
        // ELSE : not found
        else {
            res.status(404).json({erreur: "Post not found !"})
        }
    })
    .catch(error => res.status(500).json({error}));
}

// Display and get all posts
exports.getAllPosts = (req, res, next) => {
    db.Post.findAll({
        // select columns from table
        attributes: ['id', 'title', 'media', 'createdAt'],
        // order by
        order: [
            ['createdAt', 'DESC']
        ],
        // join on
        include: [
            {
                model: db.User,
                attributes: ["id", "firstname", "lastname", "email", "department", "profilePicture", "isAdmin"]
            },
            {
                model: db.Like,
                attributes: ["userId"]
            },
            {
                model: db.Comment,
                attributes: ['id', "postId"]
            }
        ]
    })
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({error}));
}

// Display and get all posts for one user id
exports.getPostsByUserId = (req, res, next) => {
    db.Post.findAll({
        where: {userId: req.params.userId},
        attributes: ['id', 'title', 'media', 'createdAt'],
        order: [
            ['createdAt', 'DESC']
        ],
        // joining on : LEFT OUTER JOIN by default BY Sequelize
        include: [
            {
                model: db.User,
                attributes: ["id", "firstname", "lastname", "email", "department", "profilePicture", "isAdmin"]
            },
            {
                model: db.Like,
                attributes: ["userId"]
            },
            {
                model: db.Comment,
                attributes: ['id', "postId"]
            }
        ]
    })
    .then(posts => {
        if (posts.length >= 1) {
            res.status(200).json(posts)
        } else {
            res.status(404).json({message: "Posts not found !"})
        }
    })
    .catch(error => res.status(400).json({error}));
}

// Display and get only one post for one user id
exports.getOnePost = (req, res, next) => {
    db.Post.findOne({
        attributes: ['id', 'title', 'media', 'createdAt'],
        include: [
            {
                model: db.User,
                attributes: ["id", "firstname", "lastname", "email", "department", "profilePicture", "isAdmin"]
            },
            {
                model: db.Like,
                attributes: ["userId"]
            }
        ],
        where: {id: req.params.id}
    })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({error}));
}