const Post = require('../models/post');

// GET homepage
exports.homepageGet = async function (req, res, next) {
    try {
        res.send('Hey');
    }
    catch (err) {
        return next(err);
    }
}