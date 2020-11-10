const express = require('express');
const router = express.Router();

router.get('/information', (req, res, next) => {
    res.render('information');
});

module.exports = router;