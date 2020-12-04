const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../secret/jwt.json').secret;

const authMiddleware = (req, res, next) => {

    // read the token from header or url

    const token = req.headers['authorization']// || req.query.token
    if (!token) {
        return res.status(403).json({
            error: 'No Token'
        })
    }

    // create a promise that decodes the token
    const checkToken = new Promise(
        (resolve, reject) => {
            jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
                if (err) reject(err)
                resolve(decodedToken)
            })
        }
    )

    const checkSubjectAndPurpose = (decodedToken) => {
        const userId = decodedToken.sub;

        console.log(userId);
        return decodedToken;
    }

    // if it has failed to verify, it will return an error message
    const onError = (error) => {
        res.status(403).json({
            error: error.message
        })
    }

    // process the promise
    checkToken
        .then(checkSubjectAndPurpose)
        .then((decodedToken) => {
            req.decodedToken = decodedToken
            //console.log(req.decodedToken)
            next()
        })
        .catch(onError)
}

module.exports = authMiddleware
