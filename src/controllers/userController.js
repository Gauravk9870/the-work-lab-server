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
    !gender ||
    !email ||
    !password ||
    !yearsOfExperience
  ) {
    res.status(400);
    throw new Error("Please fill all required fields");
  }

  // Check if user exists
  const userExists = await Freelancer.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
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
    res.status(201).json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// Login USER
const loginUser = asyncHanlder(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Please fill all fields')
  }

  // Check for the user email
  const user = await Freelancer.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      token: generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error('Invalid Credentials')
  }
})

// Get Freelancers
const getUsers = asyncHanlder(async (req, res) => {
  try {
    const freelancers = await Freelancer.find();
    res.json(freelancers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

})

module.exports = {
  registerUser, loginUser, getUsers
};
