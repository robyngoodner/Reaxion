const router = require("express").Router()
const {users} = require("../controllers")
const authRequired = require("../middleware/auth.required")

//** missing user controller logic */

// router.get("/", users.index)
router.get("/profile", authRequired, users.show)
router.get("profile/:id/edit", users.editProfile)
router.post("/profile/update", users.updateProfile) 
router.delete("/:id", users.destroy)

module.exports = router;