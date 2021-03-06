const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const pool = require('../dbcon/dbcon');
const secret = "share board"
const auth = require('../middleware/auth');

router.get('/device', auth, (req, res, next) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            res.json({
                result: "0"
            })
        } else {

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
                    connection.query('select d.*, t.typeName from device as d inner join deviecType as t where userId = ?', [userId], (err, result) => {
                        if (err) reject(err);
                        console.log(result);
                        if (result.length != 0) {
                            resolve(result);
                        } else {
                            reject('값을 찾을 수 없습니다');
                        }
                    })
                })
                connection.release()
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
                return res.statuse(200).json({
                    device
                });
            }

            const onError = (err) => {
                return res.status(403).json({
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