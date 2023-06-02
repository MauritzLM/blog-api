const mongoose = require('mongoose');
const Admin = require('../models/admin');
const Post = require('../models/post');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../auth/auth');
const { body, validationResult } = require('express-validator');
const multer = require('multer');


require('dotenv').config()

// GET admin page ?
exports.getAdminPage = async function (req, res, next) {
    try {
        // display admin page
        res.send('admin page')
    }
    catch (err) {
        return next(err);
    }
};

// ### Sign up, Login, Logout ###

// Sign up GET ?
exports.getAdminSignup = async function (req, res, next) {
    try {
        res.send('admin sign up page')
    }
    catch (err) {
        return next(err);
    }
};

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
            // take info and create admin

            const admin = new Admin({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email
            });

            // check if admin already exists*

            // errors
            if (!errors.isEmpty()) {
                res.json({ errors: errors.array() });
                return;
            }

            // const result = await admin.save();
            res.json('admin created');
        }
        catch (err) {
            return next(err);
        }
    }];

// Login GET ?
exports.getAdminLogin = async function (req, res, next) {
    try {
        // send login page info
        res.json('admin login')
    }
    catch (err) {
        return next(err);
    }
};

// Login POST
exports.adminLoginPost = [
    // validate / sanitize
    body('username').trim(),
    body('password').trim(),
    async function (req, res, next) {
        try {
            // login admin
            // authenticate using username and password
            const { username, password } = req.body;
            const admin = await Admin.findOne({ username: username })

            if (!admin) {
                res.json({ msg: 'admin not found' });
                return;
            }

            // validate password
            const validate = await bcrypt.compare(password, admin.password);

            if (!validate) {
                res.json({ msg: 'incorrect password' });
                return;
            }

            // sign jwt and return it
            const token = await auth.generateToken(res, admin._id, admin.username)

            res.json({ msg: 'login successful' })


        }
        catch (err) {
            res.json(err);
            return next(err);
        }
    }];

// Logout GET ?
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

// GET new blog post page
exports.getNewPost = [auth.verifyToken,
async function (req, res, next) {
    try {
        // send info to create new post
        res.json({ msg: 'create post info' });
    }
    catch (err) {
        return next(err);
    }
}];

// Create new blog post
exports.createNewPost = [auth.verifyToken,
async function (req, res, next) {
    try {

        // create post and save*
        const post = new Post({
            title: req.body.title,
            author: req.body.author,
            body: req.body.content,
            date: Date.now(),
            published: req.body.published,
            comments: []
        });

        // const result = await post.save();
        res.send('post created');
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
