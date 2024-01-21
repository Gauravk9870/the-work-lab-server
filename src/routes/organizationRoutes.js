const express = require('express')
const router = express.Router();
const { registerOrganization, loginOrganization, getOrganizations, getOrganizationByGSTIN } = require('../controllers/organizationController');

router.get('/', getOrganizations);
router.get('/:gstin', getOrganizationByGSTIN)
router.post('/register', registerOrganization)
router.post('/login', loginOrganization)

module.exports = router;