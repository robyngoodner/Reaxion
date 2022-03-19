const router = require('express').Router();
const { comment } = require("../controllers");

const authRequired = require ('../middleware/auth.required');

router.put('/:id', authRequired, comment.show);
router.post("/", authRequired, comment.create);

module.exports = router;