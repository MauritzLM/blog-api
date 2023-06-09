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

// GET recent posts
router.get('/recentposts', blogController.getRecentPosts);


// COMMENTS
// GET specific comment
router.get('/posts/:postid/:commentid/', blogController.getComment);

// create new comment
router.post('/posts/:postid', blogController.createNewComment);

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

// SECURE ROUTES

// Create blog post

router.post('/admin/posts/new', adminController.createNewPost);

// GET all posts
router.get('/admin/posts', adminController.getAllPosts);

// GET blog post
router.get('/admin/posts/:postid', adminController.getOnePost);

// Update blog post
router.post('/admin/posts/:postid', adminController.updatePost);

// Delete blog post
router.post('/admin/posts/:postid/delete', adminController.deletePost);

// COMMENTS

// GET all comments
router.get('/admin/posts/:postid/comments', adminController.getAllComments);

// POST new comment
router.post('/admin/posts/:postid/comments', adminController.createNewComment);

// update comment
router.post('/admin/posts/:postid/comments/:commentid', adminController.updateComment);

// delete comment
router.post('/admin/posts/:postid/comments/:commentid/delete', adminController.removeComment);

// export router
module.exports = router;
