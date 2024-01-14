const express = require('express')
const router = express.Router();
const { registerOrganization, loginOrganization, getOrganizations } = require('../controllers/organizationController');

router.get('/', getOrganizations);
router.post('/register', registerOrganization)
router.post('/login', loginOrganization)

module.exports = router;