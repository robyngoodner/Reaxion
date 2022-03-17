const router = require('express').Router();
const {auth} = require("./auth");

router.use('/community', require('./community'));
router.use('/post', require("./post"));
router.use("/auth", require("./auth"));
router.use("/user", require("./users"));
router.use("/event", require('./event'))
router.use("/comment", require('./comment'))

module.exports = router;