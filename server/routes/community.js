const router = require('express').Router();
const { community } = require ('../controllers');

router.post('/', community.createCommunity);
router.put('/:id', community.joinCommunity)

module.exports = router;