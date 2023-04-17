const Admin = require('../models/admin');
const jwt = require("jsonwebtoken");

// verify function
module.exports = function (req, res, next) {
    try {
        const bearer = req.headers["authorization"].split(" ");
        const token = bearer[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: "401: Unauthorized" });
    }
};

// WHEN logging in
// const payload = {
//     user: {
//         id: user._id,
//         isAdmin: user.isAdmin,
//     },
// };

// jwt.sign(
//     payload,
//     process.env.JWT_SECRET,
//     { expiresIn: 360000 },
//     (err, token) => {
//         if (err) throw err;
//         res.json({ token });
//     }



