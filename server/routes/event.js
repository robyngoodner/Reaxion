const router = require('express').Router();
const { event } = require('../controllers');
const authRequired = require ('../middleware/auth.required')

router.put('/:id', event.show);
router.post("/",  authRequired, event.create);

module.exports = router;