const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHanlder = require("express-async-handler");
const Freelancer = require("../models/freelancerModel");

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Register USER
const registerUser = asyncHanlder(async (req, res) => {

  console.log(req.body)
  const {
    firstName,
    lastName,
    profileImg,
    dateOfBirth,
    country,
    city,
    gender,
    email,
    password,
    yearsOfExperience,
    expertise,
    interestedProducts,
    freelancerInterest,
    remoteWorkSuccessKey,
    resume,
    shortBio,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !country ||
    !city ||
    // !gender ||
    !email ||
    !password ||
    !yearsOfExperience
  ) {
    return res.status(201).json({ error: "Fil all the required Fields" });
  }

  // Check if user exists
  const userExists = await Freelancer.findOne({ email });
  if (userExists) {
    return res.status(201).json({ error: "User email Already Exist" });
  }

  // Create hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await Freelancer.create({
    firstName,
    lastName,
    profileImg,
    country,
    city,
    gender,
    email,
    password: hashedPassword,
    yearsOfExperience,
    expertise,
    interestedProducts,
    freelancerInterest,
    remoteWorkSuccessKey,
    resume,
    shortBio,
  });

  if (user) {
    return res.status(200).json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    return res.status(201).json({ error: "Something went wrong, Please Try again" });
  }
});

// Login USER
const loginUser = asyncHanlder(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(201).json({ error: "You are not registered" });
  }

  // Check for the user email
  const user = await Freelancer.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    return res.status(201).json({
      _id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      token: generateToken(user._id)
    });
  } else {
    return res.status(201).json({});
  }
})

// Get Freelancers
const getUsers = asyncHanlder(async (req, res) => {
  try {
    const freelancers = await Freelancer.find();
    return res.status(200).json(freelancers);
  } catch (error) {
    return res.status(201).json({ error: "Something went wrong, Please Try again" });
  }

})

const getUserById = asyncHanlder(async (req, res) => {
  const userId = req.params.id;

  console.log("ID : ", userId);
  try {
    const user = await Freelancer.findById(userId);

    if (user) {
      console.log(user);
      return res.status(200).json(user);
    } else {
      console.log(user);

      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong, Please try again" });
  }
})

module.exports = {
  registerUser, loginUser, getUsers, getUserById
};
