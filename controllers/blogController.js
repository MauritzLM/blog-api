
const Post = require('../models/post');

// GET all posts(published)
exports.getAllPosts = async function (req, res, next) {
    try {
        // find posts in DB that are published
        const posts = await Post.find({ published: true });
        res.json(posts);
    }
    catch (err) {
        return next(err)
    }
};

// GET one post
exports.getOnePost = async function (req, res, next) {
    try {
        // find one post
        const post = await Post.findById(req.params.postid);

        if (!post) {
            res.send('post not found');
        }

        res.json(post);
    }
    catch (err) {
        return next(err)
    }
};

// COMMENTS
// create new comment
exports.createNewComment = async function (req, res, next) {
    try {
        // validate and sanitize*

        // create new comment

        // errors

        // const result = await Post.findOneAndUpdate({ _id: req.params.postid }, { $push: { comments: comment } })
        res.send('comment added');
    }
    catch (err) {
        return next(err)
    }
};

// GET a comment
exports.getComment = async function (req, res, next) {
    try {
        // get comment
        const post = await Post.findById(req.params.postid);

        // send correct comment*
        res.json(post.comments);
    }
    catch (err) {
        return next(err)
    }
};

// update comment
exports.updateComment = async function (req, res, next) {
    try {
        // get get post*
        // find comment 
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
        // get post*
        // find comment
        // delete comment
        res.send('delete comment not implemented yet');
    }
    catch (err) {
        return next(err)
    }
};