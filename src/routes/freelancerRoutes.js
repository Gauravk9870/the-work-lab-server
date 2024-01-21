const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUsers, getUserById } = require("../controllers/userController");

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/register", registerUser);
router.post('/login', loginUser);

module.exports = router;
