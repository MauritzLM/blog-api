const express = require('express');
const router = express.Router();

// controllers
const indexController = require('../controllers/indexController');
const blogController = require('../controllers/blogController');
const adminController = require('../controllers/adminController');

// Homepage
router.get('/', indexController.homepageGet);

// POSTS view
//GET all posts
router.get('/posts', blogController.getAllPosts);

// GET specific post
router.get('/posts/:postid', blogController.getOnePost);


// COMMENTS
// GET specific comment
router.get('/posts/:postid/:commentid/', postController.getComment);

// create new comment
router.post('/posts/:postid', postController.createNewComment);

// edit comment
router.put('/posts/:postid/:commentid', postController.updateComment);

// delete comment
router.delete('/posts/:postid/:commentid', postController.deleteComment);


//ADMIN
// Create post
router.post('/posts', adminController.createNewPost);

// Update post
router.put('/posts/:postid', adminController.updatePost);

//Delete post
router.delete('/posts/:postid', adminController.deletePost);

// export router
module.exports = router;
