const express = require('express');
const { resolve } = require('path');
const router = require('mysql');
const pool = require('../dbcon');
const moment = require('moment');
const { query } = require('express');
const now = moment();

router.post('/clipboard', (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            res.json({
                result: "0"
            })
        } else {
            const { deviceId, board } = req.body;
            console.log(deviceId, board);
            if (!deviceId || !board) {
                return res.status(400).json({
                    result: "0"
                })
            }
            const clipboard = {
                deviceId: deviceId,
                board: board
            };
            console.log(deviceId);

            function formatDate(date) {
                return moment(date).format('YYYY-MM-DD HH:mm:ss');
            }

            const datetime = new Promise((resolve, reject) => {
                connection.query(`select * from clipboard where date = ?`, [clipboard.date], (err, result) => {
                    console.log(clipboard.date);
                    if (err) reject(err);

                    rows = rows.map(function (row) {
                        return Object.assign({}, row, { created_date: formatDate(row.created_date) });
                    });

                    console.log(rows);
                })
            });

            const boardSelect = new Promise((resolve, reject) => {
                connection.query(`select * from clipboard where board= ?`, [clipboard.board], (err, result) => {

                    if (err) reject(err);

                    resolve(board);
                })
            });

            const select = (deviceId) => {
                const p = new Promise((resolve, reject) => {
                    connection.query(`select * from clipboard where deviceId = ?`, [clipboard.deviceId], (err, result) => {
                        if (err) reject(err);
                        if (result.length != 0) reject(new Error("2"));

                        resolve(deviceId);
                    })
                })
                return p;
            };

            const insert = (deviceId) => {
                console.log(deviceId);
                const p = new Promise((resolve, reject) => {
                    connection.query(`insert into clipboard (deviceId, board, date) values (?,?,?)`, [clipboard.deviceId, clipboard.board, clipboard.date], (err, result) => {
                        if (err) reject(err);
                        console.log(result);
                        resolve(result.insertBoard);
                    });
                    connection.release();
                })
            }
        }
    })
})