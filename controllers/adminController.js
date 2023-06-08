const mongoose = require('mongoose');
const Admin = require('../models/admin');
const Post = require('../models/post');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../auth/auth');
const { body, validationResult } = require('express-validator');
const multer = require('multer');


require('dotenv').config()

// ### Sign up, Login, Logout ###

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
        catch (err) {
            return next(err);
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
        catch (err) {
            res.json(err);
            return next(err);
        }
    }];

// Logout GET 
exports.getAdminLogout = async function (req, res, next) {
    try {
        // Get logout page    
    }
    catch (err) {
        return next(err);
    }
};

// Logout POST
exports.adminLogoutPost = async function (req, res, next) {
    try {
        // Logout admin    
        // forget / remove token?
    }
    catch (err) {
        return next(err);
    }
};

// ### Blog posts ###

// GET all posts
exports.getAllPosts = [
    auth.verifyToken,
    multer().none(),

    async function (req, res, next) {
        try {
            const posts = await Post.find({});

            res.json(posts);

        } catch (error) {
            res.json('connection error')
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
            // create post and save*
            const post = new Post({
                title: title,
                author: author,
                body: postContent,
                date: Date.now(),
                published: false,
                comments: []
            });

            // save post to db
            const result = await post.save();
            res.json('post created');
        }
        catch (err) {
            return next(err)
        }
    }];

// Update blog post
exports.updatePost = async function (req, res, next) {
    try {
        // validate / sanitize ?
        // update post
        res.send('update post not implemented');
    }
    catch (err) {
        return next(err)
    }
};

// Delete blog post
exports.deletePost = async function (req, res, next) {
    try {
        // find post and remove*
        res.send('delete post not implemented');
    }
    catch (err) {
        return next(err)
    }
};
