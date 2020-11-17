const express = require('express');
const router = express.Router();
const pool = require('../dbcon/dbcon');
const jwt = require('jsonwebtoken');
const secrit = "share board";
const auth = require('../middleware/auth');

router.delete('/clipboard', auth, (req, res) => {
    console.log('클립보드 삭제')
    pool.getConnection((err, connection) => {
        if (err) {
            res.status(400).json({
                error: err.message
            })
        }


        const boardId = req.body.boardId;
        const cheaksubject = (decodedToken) => {
            const clipboard = { userId: decodedToken.sub, boardId: boardId };
            console.log("userId = ", clipboard.userId);
            return clipboard;
        }

        const boardselect = (clipboard) => {
            const p = new Promise((resolve, reject) => {
                connection.query(`select c.boardId from clipboard as c join device as d where c.boardId = ? and d.userId = ?`, [clipboard.boardId, clipboard.userId], (err, result) => {
                    if (err) reject(err);
                    if (result.length == 0) reject(new Error("그런거 없어요"));
                    else {
                        resolve(result[0].boardId);
                    }
                })
            })
            return p;
        }

        const boarddelete = (boardId) => {
            const p = new Promise((resolve, reject) => {
                connection.query(`delete from clipboard where boardId = ?`, [boardId], (err, result) => {
                    if (err) {
                        console.log(err.message);
                        reject(err);
                    } else {
                        resolve(1);
                    }
                })
            })
            return p
            connection.release()
        }

        const resopond = (result) => {
            console.log(result);
            return res.statuse(200).json({
                result: result
            })
        }

        const onError = (err) => {
            console.log(err);
            return res.status(403).json({
                error: err.message
            })
        }

        checktoken
            .then(cheaksubject)
            .then(boardselect)
            .then(boarddelete)
            .then(resopond)
            .catch(onError)
    })
})

module.exports = router;