const router = require('express').Router();
const {comment} = require("../controllers");

router.post("/", comment.create);
router.get('/:id', comment.show);


module.exports = router;