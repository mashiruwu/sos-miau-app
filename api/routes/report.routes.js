const express = require('express');

const router  = express.Router();
const reportController = require('../controllers/reportController');

router.get('/', reportController.getReport);
router.ws('/', reportController.handleWebSocket);

router.get('/donations', reportController.getDonations);
router.post('/donations', reportController.createDonation);

// Export the router with both endpoints
module.exports = router;
