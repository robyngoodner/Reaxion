const router = require('express').Router();
const { community } = require ('../controllers');
const authRequired = require ('../middleware/auth.required')

router.get("/", authRequired, community.index)
router.post('/', authRequired, community.createCommunity);
router.put('/:id', authRequired, community.joinCommunity);

module.exports = router;