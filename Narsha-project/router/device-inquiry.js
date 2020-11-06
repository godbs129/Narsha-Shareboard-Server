const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const pool = require('../dbcon');
const secret = "share board"

router.get('/device', function (req, res, next) {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            res.json({
                result: "0"
            })
        } else {
            const token = req.headers.authorization// || req.query.token
            if (!token) {
                return res.status(403).json({
                    error: 'No Token'
                })
            }
            const cheakToken = new Promise((resolve, reject) => {
                jwt.verify(token, secret, (err, decondedToken) => {
                    if (err) reject(err);
                    console.log(decondedToken)
                    resolve(decondedToken)
                })
            })
            cheakSubjectAndPurpose = (decodedToken) => {
                const p = new Promise((resolve, reject) => {
                    const userId = decodedToken.sub;
                    console.log(userId);
                    resolve(userId);
                })
                return p;
            }
            const device = (userId) => {
                const p = new Promise((resolve, reject) => {
                    connection.query('select d.* t.typeName from device as d inner join deviecType as t where userId = ?', [userId], (err, result) => {
                        if (err) reject(err);
                        if (result.length != 0) {
                            resolve(result);
                        } else {
                            reject('값을 찾을 수 없습니다');
                        }
                    })
                    
                })
                return p;
            }
            /*const device_Type = (device)=>{
                const p = new Promise((resolve, reject)=>{
                    
                    console.log('length', device.length)
                    let i = -1
                    for(i = 0; i < device.length; i++){
                        connection.query(`select typeName from deviceType where typeId = ?`, [device[i].typeId],(err, result)=>{
                            if(err)reject(err);
                            console.log(result[0].typeName);
                            console.log(i)
                            device[i].typeName += result[0].typeName;
                            console.log(device[i])
                        })
                    }
                    resolve(device)
                })
                
                return p;
            }*/
            const respond = (device) => {   
                res.json({
                    device
                });
            }
            const onError = (err) => {
                res.status(403).json({
                    error: err.message
                })
            }

            cheakToken
                .then(cheakSubjectAndPurpose)
                .then(device)
                //.then(device_Type)
                .then(respond)
                .catch(onError)
        }
    })
})

module.exports = router;