const mongoose = require('mongoose');
const Admin = require('../models/admin');
const Post = require('../models/post');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config()

//GET admin page
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

// Sign up GET
exports.getAdminSignup = async function (req, res, next) {
    try {
        res.send('admin sign up page')
    }
    catch (err) {
        return next(err);
    }
};

// Sign up POST
exports.adminSignupPost = async function (req, res, next) {
    try {

        // validate and sanitize*

        // take info and create admin

        // errors

        // const result = await admin.save();
        res.send('admin created');
    }
    catch (err) {
        return next(err);
    }
};

// Login GET
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
exports.adminLoginPost = async function (req, res, next) {
    try {
        // login admin
        // authenticate using username and password
        const { username, password } = req.body;
        const admin = await Admin.findOne({ username: username })

        if (!admin) {
            res.json('admin not found');

        }

        // validate password
        const validate = await bcrypt.compare('password', admin.password);

        if (!validate) {
            res.json('incorrect password');
        }
        // sign jwt and return it*
        const payload = {
            admin: {
                id: admin._id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        )
    }
    catch (err) {
        res.json(err);
        return next(err);
    }
};

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
    }
    catch (err) {
        return next(err);
    }
};

// ### Blog posts ###

// GET new blog post page
exports.getNewPost = async function (req, res, next) {
    try {
        // send info to create new post
        res.send('create post info');
    }
    catch (err) {
        return next(err);
    }
};

// Create new blog post
exports.createNewPost = async function (req, res, next) {
    try {

        // create post and save*

        // const result = await post.save();
        res.send('post created');
    }
    catch (err) {
        return next(err)
    }
};

// Update blog post
exports.updatePost = async function (req, res, next) {
    try {
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
        // delete post
        res.send('delete post not implemented');
    }
    catch (err) {
        return next(err)
    }
};
