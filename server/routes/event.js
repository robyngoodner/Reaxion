const router = require('express').Router();
const {event} = require('../controllers');

router.get('/:id', event.show);

module.exports = router;