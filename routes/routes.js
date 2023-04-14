const express = require('express');
const router = express.Router();

// controllers
const indexController = require('../controllers/indexController');
const postController = require('../controllers/postController');

// Homepage
router.get('/', indexController.homepageGet);

// POSTS
//GET all posts
router.get('/posts', postController.getAllPosts);

// GET specific post
router.get('/posts/:postid', postController.getOnePost);

// Create post
router.post('/posts', postController.createNewPost);

// Update post
router.put('/posts/:postid', postController.updatePost);

//Delete post
router.delete('/posts/:postid', postController.deletePost);

// COMMENTS
// GET specific comment
router.get('posts/:postid/comments/:commentid', postController.getComment);

// create new comment
router.post('/posts/:postid', postController.createNewComment);

// edit comment
router.put('posts/:postid/:commentid', postController.updateComment);

// delete comment
router.delete('posts/:postid/:commentid', postController.deleteComment);

// export router
module.exports = router;
