console.log('--> active file : comment.js in controllers');
console.log('--- --- --- --- ---');
// Import
const db = require('../models');
const jwt = require('jsonwebtoken');

// Get and set the user id
const userID = (req) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const id = decodedToken.userId;
    console.log('--> id the comment.js in controllers');
    console.log(userID);
    console.log(id);
    return id;
}


// Add comment = create comment in the database of MySQL
exports.createComment = (req, res, next) => {
    db.Comment.create({
        content: req.body.content,
        userId: userID(req),
        postId: req.params.id
    })
    .then(() => res.status(200).json({message: "Comment added !"}))
    .catch((error) => res.status(403).json({error}))
}

// Edit comment = update comment in the database of MySQL
exports.editComment = (req, res, next) => {
    // Find one : with post id in the req params
    db.Comment.findOne({
        where: {id: req.params.id, postId: req.params.postId, 
        }
    })
    .then(comment => {
        // IF exist
        if (comment) {
            // Find the user
            db.User.findOne({
                where: {id: userID(req)},
            })
            .then(user => {
                // IF user is owner or admin
                if (comment.userId === userID(req) || user.isAdmin === true) {
                    // Update
                    db.Comment.update(
                        {content: req.body.content},
                        {where: {id: req.params.id}}
                    )
                    .then(() => res.status(201).json({message: 'Comment updated !'}))
                    .catch(error => res.status(400).json({error}))
                } 
                // ELSE : someone else than the owner
                else {
                    res.status(403).json({erreur: "You cannot do update on this comment !"})
                }
            })
            .catch(error => res.status(500).json({error}))
        } 
        // ELSE = comment does not exist
        else {
            res.status(404).json({erreur: 'Comment not found !'})
        }
    })
    .catch(error => res.status(500).json({error}))
}

// Delete a comment
exports.deleteComment = (req, res, next) => {
    // Find one : with post id in the req params
    db.Comment.findOne({
        where: {id: req.params.id, postId: req.params.postId}
    })
    .then(comment => {
        // IF exist
        if(comment) {
            // Find one user : with user id in the req
            db.User.findOne({
                where: {id: userID(req)}
            })
            .then(user => {
                // IF the user is the owner or is admin
                if (comment.userId === userID(req) || user.isAdmin === true) {
                    db.Comment.destroy({
                        where: {id: req.params.id}
                    })
                    .then(() => res.status(200).json({message: "Comment deleted !"}))
                    .catch((error) => res.status(400).json({error}));
                }
                // ELSE : someone else who cannot do delete action
                else {
                    res.status(403).json({erreur: "You cannot do delete on this comment !"})
                }
            })
            .catch(error => res.status(500).json({error}))

        } 
        // ELSE : the comment does not exists
        else {
            res.status(404).json({erreur: "Comment not found !"})
        }
    })
    .catch(error => res.status(500).json({error}));
}

// Display and get all comments
exports.getAllComments = (req, res, next) => {
    db.Comment.findAll({
        // select * from table
        attributes: ['id', 'content', 'userId', 'postId', 'createdAt'],
        // order by
        order: [
            ['createdAt', 'DESC']
        ],
        // joining other tables
        include: [
            {
                model: db.User,
                attributes: ['id', 'firstname', 'lastname', 'department', 'profilePicture']
            },
            {
                model: db.Post,
                attributes: ['id']
            }
        ],
        where: {postId: req.params.id}
    })
    .then((comments) => {
        res.status(200).json(comments)
    })
    .catch((error) => {
        res.status(400).json({error})
    })
}

// Display and get only one comment
exports.getOneComment = (req, res, next) => {
    db.Comment.findOne({
        where: {id: req.params.id, postId: req.params.postId},
        include: [
            {
                model: db.Post,
            }
        ]
    })
    .then(comment => {
        if (comment) {
            res.status(200).json(comment)
        } else {
            res.status(404).json({erreur: 'Comment not found !'})
        }
    })
    .catch(error => res.status(500).json({error}))
}