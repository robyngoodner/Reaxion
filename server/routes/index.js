const router = require('express').Router();

router.use('/community', require('./community'));
router.use('/post', require("./post"));

module.exports = router;