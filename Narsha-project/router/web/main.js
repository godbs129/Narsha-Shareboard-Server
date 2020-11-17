const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const client = require('../../dbcon/dbcon');

router.get('/main', (req, res, next) => {
    res.render('main');
});

module.exports = router;