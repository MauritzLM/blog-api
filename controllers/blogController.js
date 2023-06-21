
const Post = require('../models/post');
const { body, validationResult } = require('express-validator');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

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
            res.json({ error: 'post not found' });
        }

        res.json(post);
    }
    catch (error) {
        return next(error)
    }
};

// GET most recent posts*
exports.getRecentPosts = async function (req, res, next) {
    try {
        const posts = await Post.find({ published: true }).limit(5).sort({ date: -1 });

        // if(!posts) {
        //     res.json("")
        // }

        res.json(posts);

    } catch (error) {
        return next(error)
    }
};

// COMMENTS
// create new comment (add some check)*
exports.createNewComment = [
    multer().none(),
    // validate and sanitize
    body("commentAuthor", "please enter your name")
        .trim()
        .isLength({ min: 2 })
        .escape(),
    body("commentBody", "comment must be at least 10 characters long")
        .trim()
        .isLength({ min: 10 })
        .escape(),
    async function (req, res, next) {
        try {
            // errors
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.json({ errors: errors.array() });
                return;
            }

            const { commentAuthor, commentBody } = req.body;

            const newComment = {
                _id: uuidv4(),
                author: commentAuthor,
                body: commentBody,
                timestamp: new Date()
            }

            // create new comment
            const result = await Post.findByIdAndUpdate(req.params.postid, { $push: { comments: newComment } }, {});

            res.json(result);
        }
        catch (err) {
            return next(err)
        }
    }];

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