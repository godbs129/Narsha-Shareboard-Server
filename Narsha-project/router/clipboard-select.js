const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret = "share board";
const pool = require('../dbcon/dbcon');
const auth = require('../middleware/auth');

router.get('/clipboard/:board', auth, (req, res) => {
    pool.getConnection((err, connection) => {

        const board = req.params.board;
        const selectboard = (userId) => {
            const p = new Promise((resolve, reject) => {
                connection.query(`select c.boardId, c.board, c.deviceId, c.date, d.deviceName, d.userId, d.typeId ` +
                    `from clipboard as c join device as d on c.deviceId = d.deviceId where d.userId = ? and c.board like ?`, [userId, "%" + board + '%'], (err, result) => {
                        if (err) {
                            console.log(err.message);
                            reject(err);
                        } else if (result.length == 0) {
                            console.log('결과를 못 찾았습니다.');
                            reject(1);
                        } else {
                            resolve(result)
                        }
                    })
            })
            return p;
        }

        const respond = (result) => {
            return res.status(200).json({
                result
            })
        }

        const onError = (err) => {
            return res.status(403).json({
                error: err.message
            })
        }

        selectboard(req.userId)
            .then(respond)
            .catch(onError)
    })
})
module.exports = router;