/*const express = require('express');
const { resolve } = require('path');
const router = express.Router();
const pool = require('../dbcon/dbcon');

router.post('/signup', (req, res) => {
    console.log(req.body)
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                result: "0"
            })
        } else {
            const { userId, password } = req.body;
            console.log(userId, password);
            if (!userId || !password) {
                return res.status(400).json({
                    result: '0'
                });
            }
            const user = {
                userId: userId,
                password: password
            };

            const select = new Promise((resolve, reject) => {
                connection.query('Select * from user where userId = ?', [user.userId], (err, result) => {
                    if (err) reject(err);
                    if (result.length != 0) reject(new Error("2"));
                    resolve(user);
                })
            })
            const insert = (user) => {
                const p = new Promise((resolve, reject) => {
                    connection.query(`INSERT into user (userId, password) values (?,?)`, [user.userId, user.password], (err, result) => {
                        if (err) reject(err);
                        console.log(result);
                        resolve("1");
                    })
                })
                connection.release()
                return p;
            }
            const success = (message) => {
                console.log(userId, '회원가입 성공');
                return res.statuse(200).json({
                    result: "1"
                })
            }
            const onErr = (err) => {
                console.log(userId, '회원가입 실패');
                return res.status(403).json({
                    result: '0'
                })
            }

            select
                .then(insert)
                .then(success)
                .catch(onErr)
        }

    })

});

module.exports = router;*/
const express = require('express');
const router = express.Router();
const pool = require('../dbcon');

router.post('/signup', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
        } else {
            const { userId, password } = req.body;
            console.log(userId, password);
            if (!userId || !password) {
                return res.status(400).json({
                    error: '값을 입력해주세요'
                });
            }
            const user = {
                userId: userId,
                password: password
            };

            const select = new Promise((resolve, reject) => {
                connection.query('Select * from user where userId = ?', [userId], (err, result) => {
                    if (err) reject(err);
                    if (result.length != 0) reject(new Error("2"));
                    resolve(user);

                })
            })
            const insert = (user) => {
                const p = new Promise((resolve, reject) => {
                    connection.query(`INSERT into user (userId, password) values (?,?)`, [user.userId, user.password], (err, result) => {
                        if (err) reject(err);
                        console.log(result);
                        resolve("1");
                    })
                })
                return p;
            }
            const success = (message) => {
                console.log(userId, '회원가입 성공');
                res.json({
                    result: "1"
                })
            }
            const onErr = (err) => {
                console.log(userId, '회원가입 실패');
                res.status(403).json({
                    error: err.message
                })
            }

            select
                .then(insert)
                .then(success)
                .catch(onErr)
        }

    })

});

module.exports = router;