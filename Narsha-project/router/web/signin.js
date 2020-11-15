const express = require('express');
const router = express.Router();

router.get('/web/signin', (req, res) => {
    res.render('signin');
});

module.exports = router;