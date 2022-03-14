const router = require('express').Router();
const { post } = require ('../controllers');

router.post('/', post.create);

module.exports = router;