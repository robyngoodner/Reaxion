const router = require('express').Router();
const { comment } = require("../controllers");


router.put('/:id', comment.show);
router.post("/", comment.create);

module.exports = router;