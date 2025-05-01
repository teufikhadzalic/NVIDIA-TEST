const express = require("express");
const userController = require("../controllers/user.controller");

const router = express.Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/:email", userController.getUserByEmail);
router.put("/", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.put("/topUp", userController.topUpUser);

module.exports = router;
