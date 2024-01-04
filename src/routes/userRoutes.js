const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");

router.get("/", (req, res) => {
  res.json({ message: "FREELANCER ROUTE" });
});

router.post("/register", registerUser);

router.post('/login', loginUser);

module.exports = router;
