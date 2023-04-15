const Admin = require('../models/admin');

//GET admin page


//Sign up POST


//Login POST


// Create new post
exports.createNewPost = async function (req, res, next) {
    try {
        // create post and save
        res.send('create new post not implemented');
    }
    catch (err) {
        return next(err)
    }
};

// Update post
exports.updatePost = async function (req, res, next) {
    try {
        // update post
        res.send('update post not implemented');
    }
    catch (err) {
        return next(err)
    }
};

// Delete post
exports.deletePost = async function (req, res, next) {
    try {
        // delete post
        res.send('delete post not implemented');
    }
    catch (err) {
        return next(err)
    }
};
