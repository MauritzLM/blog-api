const Post = require('../models/post');

// GET all posts(published)
exports.getAllPosts = async function (req, res, next) {
    try {
        // find posts in DB
        res.send('get all posts not implemented');
    }
    catch (err) {
        return next(err)
    }
};

// GET one post
exports.getOnePost = async function (req, res, next) {
    try {
        // find one post
        res.send(`get post ${req.params.postid}`);
    }
    catch (err) {
        return next(err)
    }
};

// COMMENTS
// create new comment
exports.createNewComment = async function (req, res, next) {
    try {
        // create new comment
        res.send('create new comment not implemented yet');
    }
    catch (err) {
        return next(err)
    }
};

// GET a comment
exports.getComment = async function (req, res, next) {
    try {
        // get comment
        res.send('get comment not implemented yet');
    }
    catch (err) {
        return next(err)
    }
};

// update comment
exports.updateComment = async function (req, res, next) {
    try {
        // update comment
        res.send('update comment not implemented yet');
    }
    catch (err) {
        return next(err)
    }
};

// delete comment
exports.deleteComment = async function (req, res, next) {
    try {
        // delete comment
        res.send('delete comment not implemented yet');
    }
    catch (err) {
        return next(err)
    }
};