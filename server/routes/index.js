const router = require('express').Router();
const {auth} = require("./auth");
const authRequired = require("../middleware/auth.required");

router.use('/community', require('./community'));
router.use('/post', require("./post"));
router.use("/auth", require("./auth"));
router.use("/user", authRequired, require("./users"));
router.use("/event", require('./event'))
router.use("/comment", require('./comment'))

module.exports = router;