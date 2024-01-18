
const asyncHanlder = require("express-async-handler");

// Login USER
const loginAdmin = asyncHanlder(async (req, res) => {
  const { userName, password } = req.body;

  if ((userName=="admin")&&(password=="admin")) {
   return res.status(200).json({});

  } else {
   return res.status(201).json({error:"you are not registered"});
  }
})


module.exports = {
    loginAdmin
};
