const express = require('express')
const router = express.Router()

router.get('/manual', (req, res, next) => {
    res.render('manual');
});

module.exports = router;