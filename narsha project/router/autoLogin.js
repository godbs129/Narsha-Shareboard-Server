const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const secret = "share board"
router.post('/autologin', function(req, res, next) {
    const token = req.headers.authorization// || req.query.token
    if(!token) {
        return res.status(403).json({
            error : 'No Token'
        })
    }
    const cheakToken = new Promise((resolve, reject)=>{
        jwt.verify(token, secret, (err, decondedToken)=>{
            if(err) reject(err);
            console.log(decondedToken)
            resolve(decondedToken)
        })
    })
    cheakSubjectAndPurpose = (decodedToken)=>{
        const userId = decodedToken.sub;
        const password = decodedToken.pwd;
        console.log(userId, password);
        return decodedToken
    }
    const onError = (err)=>{
        res.status(403).json({
            error:err.message
        })
    }

    cheakToken
        .then(cheakSubjectAndPurpose)
        .then((decodedToken)=>{
            req.decodedToken = decodedToken;
            res.json({
                userName:req.decodedToken.sub
            })
        })
        .catch(onError)
})

module.exports = router;