const router = require('express').Router();
const { post } = require ('../controllers');
const authRequired = require ('../middleware/auth.required')

router.post('/', authRequired, post.create);
// router.get('/:id', authRequired, post.showOne);
router.get("/", authRequired, post.index)
router.put('/:id', authRequired, post.update);
router.delete('/:id', authRequired, post.destroy);

module.exports = router;