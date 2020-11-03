const express = require('express');
const { resolve } = require('path');
const router = express.Router();
const mysql = require('mysql');
const pool = require('../dbcon');

router.post('/device', (req, res) => {
    console.log(req.body);
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            res.json({
                result: "0"
            })
        } else {
            const { deviceName, deviceToken, userId, typeId } = req.body;
            console.log(deviceName, deviceToken, userId, typeId);
            if (!deviceName || !deviceToken || !userId || !typeId) {
                return res.status(400).json({
                    result: "0"
                })
            }
            const device = {
                deviceName: deviceName,
                deviceToken: deviceToken,
                userId: userId,
                typeId: typeId
            };

            const select = new Promise((resolve, reject) => {
                connection.query(`Select * from device where deviceName = ?`, [deviceName], (err, result) => {
                    console.log(result);
                    if (err) reject(err);
                    if (result.length != 0) reject(new Error("2"));
                    resolve(device);
                })
            })

            const insert = (device) => {
                const p = new Promise((resolve, reject) => {
                    connection.query(`INSERT into device (deviceName, deviceToken, userId, typeId) values (?,?,?,?)`, [device.deviceName, device.deviceToken, device.userId, device.typeId], (err, result) => {
                        console.log(result);
                        if (err) reject(err);
                        console.log(result);
                        resolve("1");
                    });
                    connection.release();
                });
                return p;
            }

            const success = (message) => {
                console.log(deviceName, '장치등록 성공');
                res.json({
                    result: "1"
                });
            }

            const onErr = (err) => {
                console.log(deviceName, '장치등록 실패');
                res.status(403).json({
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

module.exports = router;