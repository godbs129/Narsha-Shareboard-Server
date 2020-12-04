const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const secret = require('../secret/jwt.json').secret;

router.post('/autologin', (req, res, next) => {

    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).json({
            error: 'No Token'
        })
    }

    const checkToken = new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) reject(err);
            console.log(decodedToken);
            resolve(decodedToken);
        })
    })

    const checkSub = (decodedToken) => {
        const userId = decodedToken.sub;
        console.log(userId);
        return decodedToken;
    }

    const onErr = (err) => {
        return res.status(403).json({
            error: err.message
        })
    }

    checkToken
        .then(checkSub)
        .then((decodedToken) => {
            req.decodedToken = decodedToken;
            return res.status(200).json({
                result: "1",
                userId: req.decodedToken.sub
            })
        })
        .catch(onErr)
})

module.exports = router;