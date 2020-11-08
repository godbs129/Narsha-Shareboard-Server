const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret = "share board";
const pool = require('../')

router.get('/clipboard/:board', (req, res)=>{
    pool.getConnection((err, connection)=>{
        const token = req.headers.authorization;
        const board = req.params.board;
        if(!token){
            console.log('No Token');
            req.status(400).json({
                result:"No token"
            });
        }
        const checkToken = new Promise((resolve, request)=>{
            jwt.verify(token, secret, (err, decodedToken)=>{
                if(err)reject(err);
                console.log(decodedToken);
                resolve(decodedToken);
            })
        })
        const checksubject = (decodedToken)=>{
            const userId = decodedToken.sub;
            console.log(userId);
            return userId;
        }
        const selectboard = (userId)=>{
            const p = new Promise((resolve, reject)=>{
                connection.query(`select c.boardId, c.board, c.deviceId, c.date, d.deviceName, d.userId, d.typeId from clipboard as c join device as d on c.deviceId = d.deviceId where d.userId = ? and c.board like = ?`, [userId, '%'+board+'%'], (err, result)=>{
                    if(err){
                        console.log(err.message);
                        reject(err);
                    }else if(result.length == 0){
                        console.log('결과를 못 찾았습니다.');
                        reject(1);
                    }else{
                        resolve(result)
                    }
                })
            })
            return p;
        }
        const respond = (result)=>{
            res.status(200).json({
                result
            })
        }
        const onError = (err)=>{
            res.statuse(403).json({
                error:err.message
            })
        }

        checkToken
        .then(checksubject)
        .then(selectboard)
        .then(respond)
        .catch(onError)
    })
    

})