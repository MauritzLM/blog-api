const mongoose = require('mongoose');
const Admin = require('../models/admin');
const Post = require('../models/post');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../auth/auth');
const { body, validationResult } = require('express-validator');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

require('dotenv').config()

// ### SIGN UP, LOGIN, LOGOUT ###

// Sign up POST
exports.adminSignupPost = [
    multer().none(),
    // validate and sanitize
    body('username', 'Please enter a username')
        .trim()
        .isLength({ min: 2 })
        .escape(),
    body('password', 'password must be at least 8 characters')
        .trim()
        .isLength({ min: 8 })
        .escape(),
    body('email', 'please enter a valid email')
        .trim()
        .isEmail(),
    body('admincode', 'enter correct code')
        .custom(value => {
            if (value !== process.env.admin_code) {
                throw new Error('Wrong Code!');
            }
            return true;
        })
        .trim()
        .escape(),
    async function (req, res, next) {
        try {
            const errors = validationResult(req);
            // errors
            if (!errors.isEmpty()) {
                res.json({ errors: errors.array() });
                return;
            }

            // take info and create admin
            const { username, password, email } = req.body;

            const admin = new Admin({
                username: username,
                password: password,
                email: email
            });

            // check if admin already exists*
            const usernameFound = await Admin.findOne({ username: username });

            const emailFound = await Admin.findOne({ email: email });

            if (usernameFound) {
                res.json("username already in use");
                return;

            } else if (emailFound) {
                res.json("email already in use");
                return;

            } else {
                // const result = await admin.save();
                res.json('admin created');
            }
        }
        catch (error) {
            return next(error);
        }
    }];


// Login POST
exports.adminLoginPost = [
    multer().none(),
    // validate / sanitize
    body('username').trim(),
    body('password').trim(),
    async function (req, res, next) {
        try {
            // login admin
            // authenticate using username and password
            const { username, password } = req.body;
            const admin = await Admin.findOne({ username: username });

            if (!admin) {
                res.json({ authenticated: false, msg: 'admin not found' });
                return;
            }

            // validate password
            const validate = await bcrypt.compare(password, admin.password);

            if (!validate) {
                res.json({ authenticated: false, msg: 'incorrect password' });
                return;
            }

            // sign jwt and return it
            const jwtToken = await auth.generateToken(res, admin._id, admin.username);

            res.json({ authenticated: true, msg: 'logged in!' });


        }
        catch (error) {
            res.json(error);
            return next(error);
        }
    }];

// Logout GET 
exports.getAdminLogout = async function (req, res, next) {
    try {
        // Get logout page    
    }
    catch (error) {
        return next(error);
    }
};

// Logout POST
exports.adminLogoutPost = async function (req, res, next) {
    try {
        // Logout admin    
        // forget / remove token?
    }
    catch (error) {
        return next(error);
    }
};

// ### BLOG POSTS ###

// get post to edit
exports.getOnePost = [
    auth.verifyToken,
    multer().none(),
    async function (req, res, next) {
        try {
            // find one post
            const post = await Post.findById(req.params.postid);

            if (!post) {
                res.json({ error: 'post not found' });
            }

            res.json(post);
        }
        catch (error) {
            return next(error)
        }
    }];

// GET all posts
exports.getAllPosts = [
    auth.verifyToken,
    multer().none(),

    async function (req, res, next) {
        try {
            const posts = await Post.find({});

            res.json(posts);

        } catch (error) {
            res.json('connection error');
        }
    }];

// Create new blog post
exports.createNewPost = [
    // verify credentials
    auth.verifyToken,
    multer().none(),

    // validate and sanitize
    body("title", "please add a title").notEmpty().trim(),
    body("author", "please add an author").notEmpty().trim(),
    body("postContent", "gonna need some content").notEmpty().trim(),

    async function (req, res, next) {
        try {

            const errors = validationResult(req);
            // errors
            if (!errors.isEmpty()) {
                res.json({ errors: errors.array() });
                return;
            }

            const { title, author, postContent } = req.body;
            // create post and save
            const post = new Post({
                title: title,
                author: author,
                body: postContent,
                date: new Date(),
                published: false,
                comments: []
            });

            // save post to db
            const result = await post.save();
            res.json('post created');
        }
        catch (error) {
            return next(error)
        }
    }];

// Update blog post
exports.updatePost = [
    // verify credentials
    auth.verifyToken,
    multer().none(),

    // validate and sanitize
    body("title", "please add a title").notEmpty().trim(),
    body("author", "please add an author").notEmpty().trim(),
    body("postContent", "gonna need some content").notEmpty().trim(),
    async function (req, res, next) {
        try {
            // errors
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.json({ errors: errors.array() });
                return;
            }

            // destructure variables
            const { title, author, postContent, publish } = req.body;

            // get old post
            const oldPost = await Post.findById(req.params.postid);


            // create new post with same id
            const updatedPost = new Post({
                ...oldPost,
                title: title,
                author: author,
                body: postContent,
                published: publish === 'on' ? true : false,
                _id: req.params.postid // same id
            });

            // find by id and update post
            const result = await Post.findByIdAndUpdate(req.params.postid, updatedPost, {});

            res.json(result);
        }
        catch (error) {
            return next(error)
        }
    }];

// Delete blog post*
exports.deletePost = [
    // verify credentials
    auth.verifyToken,
    multer().none(),
    body("admincode", "incorrect code").custom(value => {
        if (value !== process.env.admin_code) {
            throw new Error('Wrong Code!');
        }
        return true;
    })
        .trim()
        .escape(),
    async function (req, res, next) {
        try {
            // errors
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.json({ errors: errors.array() });
                return;
            };
            // find post and remove
            const result = await Post.findByIdAndRemove(req.params.postid);
            res.json(result);
        }
        catch (error) {
            return next(error);
        }
    }];

// ### POST COMMENT ###

// GET all comments for post
exports.getAllComments = [
    auth.verifyToken,
    multer().none(),

    async function (req, res, next) {
        try {
            // find post by id
            const post = await Post.findById(req.params.postid, "title author comments");

            if (!post) {
                res.json("post not found!")
            };

            // send comments array
            res.json(post.comments);

        }
        catch (error) {
            return next(err);
        }
    }
];

// POST new comment
exports.createNewComment = [
    // verify credentials
    auth.verifyToken,
    multer().none(),
    body("commentAuthor", "please add an author").notEmpty().trim(),
    body("commentBody", "please add a valid comment").isLength({ min: 2 }).trim(),

    async function (req, res, next) {
        try {
            // errors
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.json({ errors: errors.array() });
                return;
            }

            const { commentAuthor, commentBody } = req.body;

            // create new comment object
            const newComment = {
                _id: uuidv4(),
                author: commentAuthor + ' ' + 'ADMIN',
                body: commentBody,
                timestamp: new Date(),
            };

            //find post and update(add comment to comments array)
            const result = await Post.findByIdAndUpdate(req.params.postid, { $push: { comments: newComment } }, {});
            res.send(result);
        }
        catch (error) {
            return next(error);
        }
    }
];

// Update comment
exports.updateComment = [
    // verify credentials
    auth.verifyToken,
    multer().none(),
    body("commentAuthor", "please add an author").notEmpty().trim(),
    body("commentBody", "please add a valid comment").isLength({ min: 2 }).trim(),

    async function (req, res, next) {
        try {
            // errors
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.json({ errors: errors.array() });
                return;
            }

            const { commentAuthor, commentBody } = req.body;

            // find comment of post and update comment fields
            const result = await Post.updateOne(
                { _id: req.params.postid, "comments._id": req.params.commentid },
                { $set: { "comments.$.author": commentAuthor, "comments.$.body": commentBody } }
            );

            res.json(result);
        }
        catch (error) {
            return next(error);
        }
    }
];


// Delete comment
exports.removeComment = [
    // verify credentials
    auth.verifyToken,
    multer().none(),
    body("admincode", "incorrect code").custom(value => {
        if (value !== process.env.admin_code) {
            throw new Error('Wrong Code!');
        }
        return true;
    })
        .trim()
        .escape(),
    async function (req, res, next) {
        try {
            const errors = validationResult(req);
            // validation errors
            if (!errors.isEmpty()) {
                res.json({ errors: errors.array() });
                return;
            };

            // find comment of post and remove from array
            const result = await Post.updateOne(
                { _id: req.params.postid }, { $pull: { comments: { _id: req.params.commentid } } }
            );

            res.json(result);
        }
        catch (error) {
            return next(error);
        }
    }
];
