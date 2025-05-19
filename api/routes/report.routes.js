const express = require('express');

const router  = express.Router();
const reportController = require('../controllers/reportController');

router.get('/', reportController.getReport);
router.post('/', reportController.updateReport);
router.ws('/', reportController.handleWebSocket);

// Export the router with both endpoints
module.exports = router;
