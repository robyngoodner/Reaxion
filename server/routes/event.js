const router = require('express').Router();
const { event } = require('../controllers');

router.put('/:id', event.show);
router.post("/",  event.create);

module.exports = router;