const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const secret = "share board"
const auth = require('../middleware/auth');

router.post('/autologin', auth, (req, res, next) => {

    const onError = (err) => {
        return res.status(403).json({
            error: err.message
        })
    }

    cheakToken
        .then(cheakSubjectAndPurpose)
        .then((decodedToken) => {
            req.decodedToken = decodedToken;
            return res.status(200).json({
                result: 1,
                userId: req.decodedToken.sub
            })
        })
        .catch(onError)
})

module.exports = router;