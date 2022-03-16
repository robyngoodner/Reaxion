const router = require('express').Router();
const { post } = require ('../controllers');

router.post('/', post.create);
router.post('/:id', post.showOne);
router.post('/:id', post.update);
router.delete('/:id', post.destroy);

module.exports = router;