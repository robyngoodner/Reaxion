const router = require("express").Router()
const {users} = require("../controllers")
const authRequired = require("../middleware/auth.required")

//** missing user index route */

router.get("/",  users.index)
router.get("/:id", authRequired, users.show)
router.put("/:id", authRequired, users.updateProfile) 
router.delete("/:id", authRequired, users.destroy)

module.exports = router;