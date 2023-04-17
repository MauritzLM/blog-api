const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true }
});

// hash password (from digital ocean tutorial)
AdminSchema.pre('save', async function (next) {
    const admin = this;
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
    next();
});

module.exports = mongoose.model('Admin', AdminSchema);