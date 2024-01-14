const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHanlder = require('express-async-handler')
const Organization = require('../models/organizationModel');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const registerOrganization = asyncHanlder(async (req, res) => {
    const {
        companyName,
        password,
        tradeName,
        GSTIN,
        yearOfIncorporation,
        relationshipToCompany,
        contactPerson,
        contactPersonEmail,
        numberOfEmployees,
        typeOfCompany,
        emailDirector,
        phoneNumberDirector,
        industry,
        sector,
        website,
        about,
        annualTurnover,
        servicesToExplore,
    } = req.body;

    // if (!companyName || !tradeName || !GSTIN) {
    //     res.status(400);
    //     throw new Error('Please fill all required fields')
    // }

    // Check if organization exists
    const organizationExits = await Organization.findOne({ GSTIN });
    if (organizationExits) {
        res.status(400);
        throw new Error('Ogranization aleary exits')

    }

    // Create hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create Organization
    const organization = await Organization.create({
        companyName,
        tradeName,
        GSTIN,
        yearOfIncorporation,
        relationshipToCompany,
        contactPerson,
        contactPersonEmail,
        numberOfEmployees,
        typeOfCompany,
        emailDirector,
        phoneNumberDirector,
        industry,
        sector,
        website,
        about,
        annualTurnover,
        servicesToExplore,
        password: hashedPassword
    })

    if (organization) {
        res.status(201).json({
            _id: organization.id,
            companyName: organization.companyName,
            GSTIN: companyName.GSTIN,
            token: generateToken(organization._id)
        });
    } else {
        res.status(400);
        throw new Error("Invalid Organization Data")
    }
})


// Login USER
const loginOrganization = asyncHanlder(async (req, res) => {
    const { GSTIN, password } = req.body;

    if (!GSTIN || !password) {
        res.status(400);
        throw new Error('Please fill all fields')
    }

    // Check for the user email
    const organization = await Organization.findOne({ GSTIN });

    if (user && (await bcrypt.compare(password, organization.password))) {
        res.json({
            _id: organization.id,
            companyName: organization.companyName,
            GSTIN: organization.GSTIN,
            token: generateToken(organization._id)
        });
    } else {
        res.status(400);
        throw new Error('Invalid Credentials')
    }
})


// Get Organizations
const getOrganizations = asyncHanlder(async (req, res) => {
    try {
        const organization = await Organization.find();
        res.json(organization);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

})

module.exports = {
    registerOrganization, loginOrganization, getOrganizations
};
