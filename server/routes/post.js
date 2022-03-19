const router = require('express').Router();
const { post } = require ('../controllers');
const authRequired = require ('../middleware/auth.required')

router.post('/', authRequired, post.create);
router.get('/:id', post.showOne);
router.put('/:id', post.update);
router.delete('/:id', post.destroy);

module.exports = router;