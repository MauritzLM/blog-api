const Admin = require('../models/admin');
const jwt = require("jsonwebtoken");

// generate token and save in cookie
const generateToken = (res, id, username) => {
    const expiration = process.env.DB_ENV === 'testing' ? 100 : 604800000;
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
        expiresIn: process.env.DB_ENV === 'testing' ? '1d' : '7d',
    });
    return res.cookie('token', token, {
        expires: new Date(Date.now() + expiration),
        secure: false, // set to true if your using https
        httpOnly: true,
    });
};

const verifyToken = async (req, res, next) => {
    const token = req.cookies.token || '';
    try {
        if (!token) {
            return res.status(401).json({ msg: "401: Unauthorized" })
        }
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            id: decoded.id,
            username: decoded.username,
        };
        next();
    } catch (err) {
        return res.status(500).json(err.toString());
    }
};

module.exports = { generateToken, verifyToken }



