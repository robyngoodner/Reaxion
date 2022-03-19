const router = require('express').Router();
const { event } = require('../controllers');
const authRequired = require ('../middleware/auth.required')

router.get('/', authRequired, event.index)
router.get('/:id', event.show);
router.post("/",  authRequired, event.create);

module.exports = router;