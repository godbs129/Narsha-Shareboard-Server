const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

router.get('/main', auth, (req, res, next) => {
    res.render('main');
});

module.exports = router;