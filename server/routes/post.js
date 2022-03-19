const router = require('express').Router();
const { post } = require ('../controllers');

router.post('/', post.create);
router.get('/:id', post.showOne);
router.put('/:id', post.update);
router.delete('/:id', post.destroy);

module.exports = router;