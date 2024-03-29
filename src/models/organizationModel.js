const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, "Company name is required"],
  },
  password: String,
  tradeName: String,
  GSTIN: String,
  yearOfIncorporation: String,
  relationshipToCompany: String,
  contactPersonPhoneNumber: {
    type: String,
    validate: {
      validator: function (v) {
        return /^\d{10}$/g.test(v);
      },
      message: "Invalid phone number format",
    },
  },
  contactPersonEmail: {
    type: String,
    required: [true, "Email of contact person is required"],
    unique: true,
    validate: {
      validator: function (v) {
        return /^\S+@\S+\.\S+$/g.test(v);
      },
      message: "Invalid email format",
    },
  },
  numberOfEmployees: Number,
  typeOfCompany: {
    type: String,
    // enum: ["Sole", "LLP", "Private", "Public"],
  },
  companyDirectorEmail: String,
  companyDirectorPhoneNumber: String,
  industry: String,
  sector: String,
  companyWebsite: String,
  aboutCompany: String,
  annualTurnover: Number,
  servicesToExplore: String,
  termsAndConditionsAgreement: {
    type: Boolean,
  },
  futureHiringPlans: String,
  softwareUsed: {
    sourcing: String,
    accounting: String,
    hiring: String,
    employeeDataManagement: String,
  },
  exploreAutomationSolutions: String,
  hasAccountingSoftware: Boolean,
  hasHRManagementSoftware: Boolean,
  hasCRMSoftware: Boolean,
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Ogranization = mongoose.model("Organization", OrganizationSchema);

module.exports = Ogranization;
