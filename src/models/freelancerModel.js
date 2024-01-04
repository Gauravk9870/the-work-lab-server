const mongoose = require("mongoose");

const freelancerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
  },
  profileImg: { type: String },
  country: {
    type: String,
    required: [true, "Country is required"],
  },
  city: {
    type: String,
    required: [true, "City is required"],
  },
  gender: {
    type: String,
    enum: ["male", "female", "others"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
  },
  dateOfBirth: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password should be at least 8 characters long"],
    validate: {
      validator: function (value) {
        return /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-z]).{8,}$/.test(value);
      },
      message:
        "Password should contain at least one uppercase letter and one special character.",
    },
  },
  yearsOfExperience: {
    type: String,
    enum: [
      "less than 1 year",
      "1 to 2 years",
      "2 to 3 years",
      "3 to 5 years",
      "5 to 8 years",
      "more than 8 years",
    ],
    required: [true, "Experience is required"],
  },
  expertise: { type: [String], default: [] },
  interestedProducts: [{ type: String }],
  freelancerInterest: { type: String },
  remoteWorkSuccessKey: { type: String },
  resume: { type: String },
  shortBio: { type: String },
});

const Freelancer = mongoose.model("Freelancer", freelancerSchema);

module.exports = Freelancer;
