const mongoose = require('mongoose');
const Admin = require('../models/admin');
const Post = require('../models/post');

//GET admin page
exports.getAdminPage = async function (req, res, next) {
    try {
        // display admin page
    }
    catch (err) {
        return next(err);
    }
};

// ### Sign up, Login, Logout ###

// Sign up GET
exports.getAdminSignup = async function (req, res, next) {
    try {
        // display sign up page
    }
    catch (err) {
        return next(err);
    }
};

// Sign up POST
exports.adminSignupPost = async function (req, res, next) {
    try {
        // create new admin    
    }
    catch (err) {
        return next(err);
    }
};

// Login GET
exports.getAdminLogin = async function (req, res, next) {
    try {
        // display login page
    }
    catch (err) {
        return next(err);
    }
};

// Login POST
exports.adminLoginPost = async function (req, res, next) {
    try {
        // login admin    
    }
    catch (err) {
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
        // display page to create new post
    }
    catch (err) {
        return next(err);
    }
};

// Create new blog post
exports.createNewPost = async function (req, res, next) {
    try {
        // create post and save
        res.send('create new post not implemented');
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
