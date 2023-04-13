const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    body: { type: String, required: true },
    date: { type: Date, required: true },
    published: { type: Boolean, required: true },
    comments: [{ _id: Number, author: String, body: String, timestamp: Date }]
});

module.exports = mongoose.model('Post', postSchema);