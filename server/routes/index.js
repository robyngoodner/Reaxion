const router = require("express").Router();
const { posts } = require("../controllers");

router.get("/", posts.create);

module.exports = router;