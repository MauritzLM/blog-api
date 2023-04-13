const express = require('express');
const router = express.Router();

// controllers

// Homepage
router.get('/')

// POSTS
//GET all posts
router.get('/posts')

//GET specific post
router.get('/posts/:postid')

//Create post
router.post('/posts')

//Update post
router.put('/posts/:postid')

//Delete post
router.delete('/posts/:postid')

//COMMENTS
// GET specific comment
router.get('posts/:postid/:commentid')

// create new comment
router.post('/posts/:postid')

// edit comment
router.put('posts/:postid/:commentid')

// delete comment
router.delete('posts/:postid/:commentid')
