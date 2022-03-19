const router = require("express").Router()
const {users} = require("../controllers")
const authRequired = require("../middleware/auth.required")

//** missing user controller logic */

// router.get("/", users.index)
router.get("/", authRequired, users.show)
router.put("/:id", users.updateProfile) 
router.delete("/:id", authRequired, users.destroy)

module.exports = router;