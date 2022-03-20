const router = require('express').Router();
const { community } = require ('../controllers');
const authRequired = require ('../middleware/auth.required')

router.get('/', authRequired, community.getCommunities)
router.get("/:id", authRequired, community.index)
router.post('/', authRequired, community.createCommunity);
router.put('/:id', authRequired, community.joinCommunity);
router.get('/:id', community.getAll)

module.exports = router;