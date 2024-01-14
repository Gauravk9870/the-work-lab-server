const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require('dotenv').config()

const port = process.env.PORT || 3000;
const FreelancerRoutes = require("./routes/freelancerRoutes");
const OrganizationRoutes = require('./routes/organizationRoutes')
require("./db/conn");


app.use(cors());
app.use(express.json())

app.get("/", (req, res) => {
  res.json({ message: "HOME" });
});

// FREELANCERS
app.use("/api/freelancer", FreelancerRoutes);

// Organizations 
app.use('/api/organization', OrganizationRoutes)

app.listen(port, () => {
  console.log(`${port} : App is running... `);
});


// {
//   "companyName": "ABC Corporation",
//   "password": "securePassword123",
//   "tradeName": "ABC Corp",
//   "GSTIN": "GST123456789",
//   "yearOfIncorporation": 2005,
//   "relationshipToCompany": "Parent",
//   "contactPersonPhoneNumber": "1234567890",
//   "contactPersonEmail": "contact@abc.com",
//   "numberOfEmployees": 100,
//   "typeOfCompany": "Private",
//   "companyDirectorEmail": "director@abc.com",
//   "companyDirectorPhoneNumber": "9876543210",
//   "industry": "Technology",
//   "sector": "IT",
//   "companyWebsite": "https://www.abc.com",
//   "aboutCompany": "ABC Corp is a leading technology company...",
//   "annualTurnover": 5000000,
//   "servicesToExplore": ["Cloud Computing", "Data Analytics"],
//   "termsAndConditionsAgreement": true,
//   "futureHiringPlans": "Expand the engineering team",
//   "softwareUsed": {
//     "sourcing": "Recruitify",
//     "accounting": "QuickBooks",
//     "hiring": "Greenhouse",
//     "employeeDataManagement": "BambooHR"
//   },
//   "exploreAutomationSolutions": "Implement AI for customer support",
//   "hasAccountingSoftware": true,
//   "hasHRManagementSoftware": true,
//   "hasCRMSoftware": false
// }
