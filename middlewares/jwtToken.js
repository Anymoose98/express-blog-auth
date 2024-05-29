const jwt = require('jsonwebtoken');
require("dotenv").config();
const users = require('../db/users.json');


function generateToken(user) {
    const payload = {
        id: user.id,
        username: user.username
    }
    return jwt.sign(payload, process.env.jwt_secret, { expiresIn: "2h" });
}

const authenticateWithJWT = (req, res, next) => {
    const autorization = req.headers.authorization;
    console.log(autorization)

    if (!autorization) {
        return res.status(401).send('Non sei autentificato');
    }

    const token = autorization.split(" ")[1];

    jwt.verify(token, process.env.jwt_secret, (err, user) => {
        if(err) {
            return res.status(403).send(err);
        }
        req.user = user;
        next();
    });
}

module.exports = {
    generateToken,
    authenticateWithJWT
}
