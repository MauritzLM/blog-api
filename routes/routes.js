const express = require('express');
const router = express.Router();

// controllers
const indexController = require('../controllers/indexController');
const blogController = require('../controllers/blogController');
const adminController = require('../controllers/adminController');

// ### VIEW ###

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


// ### ADMIN ###

// GET admin page
router.get('/admin', adminController.getAdmin);

// Admin sign up
router.get('/admin/signup', adminController.getAdminSignup);

router.post('/admin/signup', adminController.adminSignupPost);

// Admin login
router.get('/admin/login', adminController.getAdminLogin);

router.post('/admin/login', adminController.adminLoginPost);

// Admin logout
router.get('/admin/logout', adminController.getAdminLogout);

router.post('admin/logout', adminController.adminLogoutPost);

// Secure routes
// Create blog post
router.get('/admin/posts', adminController.getNewPost);

router.post('/admin/posts', adminController.createNewPost);

// GET blog post
router.get('/admin/posts/:postid', postController.getOnePost);

// Update blog post
router.put('/admin/posts/:postid', adminController.updatePost);

// Delete blog post
router.delete('/admin/posts/:postid', adminController.deletePost);

// export router
module.exports = router;
