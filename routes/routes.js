const express = require('express');
const router = express.Router();

// controllers
const indexController = require('../controllers/indexController');
const blogController = require('../controllers/blogController');
const adminController = require('../controllers/adminController');

// ### VIEW ###

// Homepage


// POSTS view
//GET all posts
router.get('/posts', blogController.getAllPosts);

// GET specific post
router.get('/posts/:postid', blogController.getOnePost);


// COMMENTS
// GET specific comment
router.get('/posts/:postid/:commentid/', blogController.getComment);

// create new comment
router.put('/posts/:postid', blogController.createNewComment);

// edit comment
router.put('/posts/:postid/:commentid', blogController.updateComment);

// delete comment
router.delete('/posts/:postid/:commentid', blogController.deleteComment);


// ### ADMIN ###

// GET admin page

// Admin sign up

router.post('/admin/signup', adminController.adminSignupPost);

// Admin login

router.post('/admin/login', adminController.adminLoginPost);

// Admin logout
router.get('/admin/logout', adminController.getAdminLogout);

router.post('admin/logout', adminController.adminLogoutPost);

// Secure routes
// Create blog post

router.post('/admin/posts/new', adminController.createNewPost);

// GET blog post
router.get('/admin/posts/:postid', blogController.getOnePost);

// Update blog post
router.put('/admin/posts/:postid', adminController.updatePost);

// Delete blog post
router.delete('/admin/posts/:postid', adminController.deletePost);

// export router
module.exports = router;
