const express = require("express");
const { registerUser } = require("./controllers/userController");
const app = express();
const cors = require("cors");
const dotenv = require('dotenv').config()

const port = process.env.PORT || 3000;
const userRoutes = require("./routes/userRoutes");
require("./db/conn");

app.use(cors());
app.use(express.json())



app.get("/", (req, res) => {
  res.json({ message: "HOME" });
});

app.use("/api/freelancer", userRoutes);


app.listen(port, () => {
  console.log(`${port} : App is running... `);
});
