const router = require('express').Router();
const { comment } = require("../controllers");


router.get('/:id', comment.show);
router.post("/", comment.create);

module.exports = router;