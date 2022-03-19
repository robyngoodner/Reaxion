const router = require('express').Router();
const { event } = require('../controllers');
const authRequired = require ('../middleware/auth.required')

router.get('/', authRequired, event.index)
router.get('/:id', authRequired, event.show);
router.post("/new",  authRequired, event.create);

module.exports = router;