const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true }
});

// hash password (from digital ocean tutorial)
adminSchema.pre('save', async function (next) {
    const admin = this;
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
    next();
});

// method to compare passwords
UserSchema.methods.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);

    return compare;
}

module.exports = mongoose.model('Admin', adminSchema);