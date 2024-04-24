const express = require("express");
const router = express.Router();
const {
  findUser,
  findUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.route("/").get(findUsers).post(createUser);
router.route("/:id").get(findUser).put(updateUser).delete(deleteUser);
router.put("/:id",updateUser)

module.exports = router;
