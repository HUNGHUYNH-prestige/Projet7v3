console.log('--> active file : post.js in routes folder');
console.log('route is ok');
console.log('router is ok');
console.log('router for tables : POSTS, COMMENTS, LIKES in MySQL');
console.log('--- --- --- --- ---');


// Import
const express     = require('express');
const router      = express.Router();
const postCtrl    = require('../controllers/post');
const commentCtrl = require('../controllers/comment')
const likeCtrl    = require('../controllers/like');
const auth        = require('../middleware/auth');
const multer      = require('../middleware/multer-config');

// Set the router for :

// 1. Table Posts => posts
console.log('ROUTER posts -> METHODS : POST, PUT, DELETE, GET');
console.log('--- --- --- --- ---');

router.post(  '/',              auth, multer, postCtrl.createPost);
router.put(   '/:id',           auth, multer, postCtrl.editPost);
router.delete('/:id',           auth, multer, postCtrl.deletePost);
router.get(   '/',              auth,         postCtrl.getAllPosts);
router.get(   '/users/:userId', auth,         postCtrl.getPostsByUserId);
router.get(   '/:id',           auth,         postCtrl.getOnePost);

// 2. Table Comments => comments
console.log('ROUTER comments -> METHODS : POST, PUT, DELETE, GET');
console.log('--- --- --- --- ---');

router.post(  '/:id/comments',         auth, commentCtrl.createComment);
router.put(   '/:postId/comments/:id', auth, commentCtrl.editComment)
router.delete('/:postId/comments/:id', auth, commentCtrl.deleteComment);
router.get(   '/:id/comments',         auth, commentCtrl.getAllComments);
router.get(   '/:postId/comments/:id', auth, commentCtrl.getOneComment);

// 3. Table Likes => likes
console.log('ROUTER likes -> METHODS : POST, PUT, DELETE, GET');
console.log('--- --- --- --- ---');

router.post('/:id/likes', auth, likeCtrl.likePost);
router.get( '/:id/likes', auth, likeCtrl.getAllLikes);
router.get( '/:id/like',  auth, likeCtrl.getOneLike);

// Export
module.exports = router;