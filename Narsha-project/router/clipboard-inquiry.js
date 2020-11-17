const express = require('express');
const { resolve } = require('path');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret = "share board"
const pool = require('../dbcon/dbcon');
const auth = require('../middleware/auth');

router.get('/clipboard', auth, (req, res) => {
    pool.getConnection((err, connection) => {


        const select_clipboard = (userId) => {
            const p = new Promise((resolve, reject) => {
                connection.query(`select c.boardId,c.board, c.deviceId, c.date, d.deviceName, d.userId, t.typeName` +
                    ` from clipboard as c join device as d on c.deviceId = d.deviceId join deviceType as t  on d.typeId = t.typeId where d.userId = ? order by(c.boardId) DESC`,
                    [userId], (err, result) => {
                        if (err) reject(err);
                        //if (result.length == 0) reject(new Error("값이 없습니다"));
                        console.log(result);
                        resolve(result);
                    })
            })
            return p
        }

        /*const select_deviceType = (clipboard) => {
            const p = new Promise((resolve, reject) => {
                for (let i = 0; i < clipboard.length; i++) {
                    connection.query(`select deviceName from deviceType where typeId = ?`, [clipboard[i].typeId], (err, result) => {
                        if (err) reject(err);
                        clipboard[i].typeName = result[0].typeName;
                    })
                }
                resolve(clipboard);
            })
            connection.release()
            return p;
        }*/

        const respond = (result) => {
            return res.status(200).json({
                result
            })
        }

        const onError = (err) => {
            return res.status(400).json({
                error: err.message
            })
        }

        cheakToken
            .then(cheaksubject)
            .then(select_clipboard)
            .then(respond)
            .catch(onError)
    })
})

module.exports = router;