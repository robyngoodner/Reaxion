const router = require('express').Router();
const { community } = require ('../controllers');

router.post('/', community.createCommunity);

module.exports = router;